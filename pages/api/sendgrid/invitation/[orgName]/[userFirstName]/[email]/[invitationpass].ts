import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import sgMail from '@sendgrid/mail';

const sendInviteRouter = createRouter<NextApiRequest, NextApiResponse>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

type InputParms = {
  orgName: string;
  invitationpass: string;
  userFirstName: string;
  email: string;
};

sendInviteRouter.post(async (req, res) => {

  const params = req.query as InputParms;

  const addOrgMemberTemplate = {
    to: params.email,
    from: 'community@peersupply.co',
    templateId: 'd-9509b25f70024000adb40c8607fec898',
    dynamicTemplateData: {
      user_firstname: params.userFirstName,
      organization_name: params.orgName,
      URL: `${process.env.PS_BASE_URL}/invitation/${params.email}/${params.invitationpass}`,
    },
  };

  try {
    await sgMail.send(addOrgMemberTemplate);
  } catch (error) {
    console.error(error);
  }
  return res.status(200);
});

export default sendInviteRouter;
