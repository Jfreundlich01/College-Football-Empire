import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import multer from 'multer';
import { getFile } from '@ps/server/cloud-storage/storage';
import { extension } from 'mime-types';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 5 * 1024 * 1024,
  },
});

const ncRouter = createRouter<NextConnectApiRequest, NextApiResponse>();

ncRouter.use(multerMiddleware.array('files'));

ncRouter.post(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json('Unauthorized');
  }

  // We are using the oid as the bucket name for each organization's bucket
  const { bucket } = req.query;

  if (!bucket) {
    return res.status(400).json('Request must include valid bucket name');
  }

  const bucketName = Array.isArray(bucket)
    ? `${bucket[0]}${process.env.GCP_BUCKET_SUFFIX}`
    : `${bucket}${process.env.GCP_BUCKET_SUFFIX}`;

  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send('No files to upload');
  }

  const fileUploads: Promise<string>[] = [];
  for (let i = 0; i < files.length; i++) {
    fileUploads.push(
      new Promise((resolve, reject) => {
        const file = files[i];

        const subDir = req.body.path;
        let fileName: string;
        if (subDir.length > 0) {
          fileName = `${subDir}/${new Date()
            .toISOString()
            .replace(/:/g, '-')}.${extension(file.mimetype)}`;
        } else {
          fileName = `${new Date()
            .toISOString()
            .replace(/:/g, '-')}.${extension(file.mimetype)}`;
        }

        const gcpFile = getFile(bucketName, fileName);

        const stream = gcpFile.createWriteStream({
          metadata: {
            contentType: file.mimetype,
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
          },
        });

        stream.on('error', (error) => {
          reject(error);
        });

        stream.on('finish', async () => {
          resolve(
            JSON.stringify({ success: 'Upload Successful', fileName: fileName })
          );
        });

        stream.end(file.buffer);
      })
    );
  }

  Promise.all(fileUploads)
    .then((responses) => {
      return res.status(200).json({ uploads: responses });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
});

export default ncRouter;

export const config = {
  api: {
    // Disallow body parsing, consume as stream
    bodyParser: false,
  },
};
