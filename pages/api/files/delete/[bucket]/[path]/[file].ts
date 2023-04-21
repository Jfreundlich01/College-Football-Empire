import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import { verifyStorageInstance } from '@ps/server/cloud-storage/storage';

const deletePathRouter = createRouter<NextApiRequest, NextApiResponse>();

deletePathRouter.delete(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json('Unauthorized');
  }

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

  async function deleteFile() {
    await storage.bucket(bucketName).file(fileName).delete();
    return res.status(200).json(`You deleted this document`);
  }

  deleteFile().catch((error) => {
    console.error(error);
  });
});

export default deletePathRouter;
