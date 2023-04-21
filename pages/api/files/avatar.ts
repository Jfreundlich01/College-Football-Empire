import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import multer from 'multer';
import { getFile } from '@ps/server/cloud-storage/storage';
import {
  PublicBuckets,
  verifyPublicStorage,
} from '@ps/server/cloud-storage/public';
import { extension } from 'mime-types';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 5 * 1024 * 1024,
  },
});

const ncRouter = createRouter<NextConnectApiRequest, NextApiResponse>();

ncRouter.use(multerMiddleware.array('files'));

ncRouter.post(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json('Unauthorized');
  }

  const suffix = process.env.GCP_BUCKET_SUFFIX;

  const files = req.files;
  const path = req.body.path;
  const bucketName =
    suffix === '-peer-supply-prod'
      ? PublicBuckets.avatarsProd
      : suffix === '-peer-supply-int'
      ? PublicBuckets.avatarsInt
      : PublicBuckets.avatarsDev;

  if (!files || files.length === 0) {
    return res.status(400).send('No files to upload');
  }

  if (!verifyPublicStorage(bucketName, path)) {
    return res.status(400).send('Public Storage not supported');
  }

  const uploadPhoto = new Promise((resolve, reject) => {
    const file = files[0];
    const fileName = `${path}/${new Date()
      .toISOString()
      .replace(/:/g, '-')}.${extension(file.mimetype)}`;

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
      const publiceURL = await gcpFile.publicUrl();
      resolve(publiceURL);
    });

    stream.end(file.buffer);
  });

  uploadPhoto.then((result) => {
    return res.status(200).json(result);
  });
});

export default ncRouter;

export const config = {
  api: {
    // Disallow body parsing, consume as stream
    bodyParser: false,
  },
};
