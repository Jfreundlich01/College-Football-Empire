import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import sgMail from '@sendgrid/mail';

const sendUploadDocRouter = createRouter<NextApiRequest, NextApiResponse>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

const env = process.env.GCP_BUCKET_SUFFIX;

type InputParms = {
  orgName: string;
  oid: string;
  userFirstName: string;
  fileExt: string;
};

sendUploadDocRouter.post(async (req, res) => {
  const params = req.query as InputParms;

  let targetAddress = [];
  if (env === '-peer-supply-dev') {
    targetAddress.push('jordan@engineeredinnovationgroup.com');
  } else {
    targetAddress.push('jchavez@peersupply.co', 'rwilson@peersupply.co');
  }

  const uploadDocTemplate = {
    to: targetAddress,
    from: 'community@peersupply.co',
    templateId: 'd-e7939749ef8c419b9e3688c9425c92c6',
    dynamicTemplateData: {
      organization_name: params.orgName,
      //Tis is actually the docType ie) 'Critical-Items' but the clients sendGrid template uses 'fileExt' as the variable name.
      fileExt: params.fileExt,
      URL: `${process.env.PS_BASE_URL}/authorized/organizations/${params.oid}`,
      user_firstname: params.userFirstName,
    },
  };

  try {
    await sgMail.send(uploadDocTemplate);
  } catch (error) {
    console.error(error);
  }
  return res.status(200);
});

export default sendUploadDocRouter;
