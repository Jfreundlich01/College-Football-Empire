import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import { verifyStorageInstance } from '@ps/server/cloud-storage/storage';

const downloadPathRouter = createRouter<NextApiRequest, NextApiResponse>();

downloadPathRouter.get(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json('Unauthorized');
  }

  // organization bucket name is
  // Because the fileName has a / character, it is being read as two different parameters
  // We first pull those and then stitch back together as single fileName
  const { bucket, path, file } = req.query;

  if (!bucket || !path || !file) {
    return res
      .status(400)
      .json(
        'Request must include bucket name, subdirectory path, and file name'
      );
  }

  const bucketName = `${bucket}${process.env.GCP_BUCKET_SUFFIX}`;

  const fileName = Array.isArray(file)
    ? `${path}/${file[0]}`
    : `${path}/${file}`;

  const storage = verifyStorageInstance();

  const url = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 1000,
    });

  return res.status(200).json(url);
});

export default downloadPathRouter;
