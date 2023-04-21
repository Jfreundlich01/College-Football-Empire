import { NextPageWithLayout } from '../../../types';
import { Box, styled, Typography } from '@mui/material';
import { Footer } from '@ps/components/footer/Footer';
import { CreateUserForm } from '@ps/components/createUser/createUserForm';
import { useRouter } from 'next/router';
import { trpc } from '@ps/utils/trpc';
import { SnackBar } from '@ps/utils/SnackBar';
import { useState } from 'react';
import Image from 'next/image';
import pslogo from '../../../src/assets/PSLogoWhite.svg';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { palette } from 'src/theme/palette';
import Grid from '@mui/material/Grid';

const CreateUser: NextPageWithLayout = () => {
  //Handles snackbar on invitation page
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const router = useRouter();
  const invitationpass = Array.isArray(router.query.invitationpass)
    ? router.query.invitationpass[0]
    : router.query.invitationpass;
  const email = Array.isArray(router.query.email)
    ? router.query.email[0]
    : router.query.email;
  const resetAlert = () => {
    setAlertSuccess(false);
  };

  const closeSnack = () => {
    setOpenSnack(false);
    setSnackMessage('');
    setTimeout(resetAlert, 100);
  };

  const redirectToWaitlist = () => {
    router.push('/waitlist');
  };

  const redirectToLogin = () => {
    router.push('/auth/login');
  };

  //find user in db
  const userQuery = trpc.useQuery([
    'publicOnboard.getNewUser',
    {
      email: email ?? '',
      invitationpass: invitationpass ?? '',
    },
  ]);

  if (userQuery.isLoading) {
    return <>LOADING...</>;
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} md={5} xl={4}>
          <InfoWrapper>
            <Image
              src={pslogo}
              height="60px"
              width="187.5px"
              alt="Peer Supply Logo"
            />
            <IntroText>{'Building a more resilient supply chain.'}</IntroText>
            <Summary>
              {
                'You’ve been invited to join in the ongoing conversation around items, organizations, and supply chain updates you care about the most.'
              }
            </Summary>
            {/* TODO: Waiting for copy from Peer Supply team */}
            {/* <CarouselWrapper>
        <CardCarousel />
        </CarouselWrapper> */}
          </InfoWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          xl={8}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CreateUserFormWrapper>
            {typeof userQuery.data !== 'number' &&
            userQuery.data !== undefined ? (
              <CreateUserForm
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                user={userQuery.data}
              />
            ) : userQuery.data === 0 || userQuery.data === undefined ? (
              <Box
                sx={{
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LockIcon
                  sx={{ fontSize: '120px', color: palette.primary.dark }}
                />
                <LockHeader>
                  Uh oh! It looks like you don&apos;t have access to this page.
                </LockHeader>
                <UserCreationLockMessage>
                  If you received an invitation to join Peer Supply please try
                  the link again. If you still receive this error message and
                  you’ve not gone through the process of confirming your user
                  details, please reach out to the Peer Supply team at
                  <EmailSpan>support@peersupply.co</EmailSpan>
                  <br />
                  <br />
                  If you are interested in joining Peer Supply and have not yet
                  received an invitation, please join out waitlist using the
                  link below.
                </UserCreationLockMessage>
                <JoinWaitlistButton onClick={redirectToWaitlist}>
                  Join waitlist
                </JoinWaitlistButton>
              </Box>
            ) : (
              <Box
                sx={{
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LockIcon
                  sx={{ fontSize: '120px', color: palette.primary.dark }}
                />
                <LockHeader>
                  Uh oh! It looks like your invitation link has already been
                  used.
                </LockHeader>
                <UserCreationLockMessage>
                  If you received an invitation to join Peer Supply and you’ve
                  not gone through the process of confirming your user details,
                  please reach out to the Peer Supply team at
                  <EmailSpan>support@peersupply.co</EmailSpan>
                  <br />
                  <br />
                  If you have competed your user details and you’re attempting
                  to log in to your Peer Supply account, please follow the link
                  below.
                </UserCreationLockMessage>
                <JoinWaitlistButton onClick={redirectToLogin}>
                  Log In
                </JoinWaitlistButton>
              </Box>
            )}
          </CreateUserFormWrapper>
          <Footer />
        </Grid>
      </Grid>
      <SnackBar
        openSnack={openSnack}
        snackMessage={snackMessage}
        closeSnack={closeSnack}
        alertSuccess={alertSuccess}
      ></SnackBar>
    </>
  );
};

export default CreateUser;

CreateUser.getLayout = (page) => page;

const InfoWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  height: '100vh',
  left: '0',
  padding: '46px',
}));

const IntroText = styled('p')({
  color: palette.neutral.white,
  height: '154px',
  left: '64px',
  marginTop: '8rem',
  // TODO: Fonts
  // fontFamily: 'Roboto',
  top: '208px',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '48px',
  lineHeight: '52px',
});

const Summary = styled('p')({
  color: palette.neutral.white,
  height: '96px',
  left: '64px',
  top: '154px',
  // TODO: Fonts
  // fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '20px',
  lineHeight: '32px',
});

const CreateUserFormWrapper = styled(Box)({
  flex: 'auto',
  marginLeft: '46px',
});

// TODO: Waiting on copy from Peer Supply as of 9/5
// const CarouselWrapper = styled(Box)({
//   marginTop: '5rem',
// });

const LockHeader = styled(Typography)({
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '1.8vw',
  lineHeight: '48px',
  color: palette.neutral.black_7,
  width: '60%',
  textAlign: 'center',
  marginTop: '24px',
});
const UserCreationLockMessage = styled(Box)({
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1vw',
  lineHeight: '24px',
  color: palette.neutral.black_7,
  width: '60%',
  textAlign: 'center',
  marginTop: '24px',
});
const JoinWaitlistButton = styled(Button)({
  marginTop: '24px',
  backgroundColor: palette.primary.main,
  borderRadius: '8px',
  border: `solid 1px ${palette.primary.main}`,
  color: palette.neutral.white,
  '&:hover': {
    backgroundColor: palette.neutral.white,
    color: palette.primary.main,
  },
  textTransform: 'none',
  font: 'Roboto',
  fontWeight: '500',
  paddingLeft: '20px',
  paddingRight: '20px',
});

const EmailSpan = styled(Box)({
  fontWeight: '600',
  color: 'black',
});
