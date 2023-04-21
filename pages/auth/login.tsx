import { NextPageWithLayout } from '../../types';
import Image from 'next/image';
import { Box, styled, Grid } from '@mui/material';
import { LoginForm } from '../../src/components/auth/LoginForm';
import { getSession, GetSessionParams } from 'next-auth/react';
import pslogo from '../../src/assets/PSLogoWhite.svg';
import { Footer } from '@ps/components/footer/Footer';
import { palette } from 'src/theme/palette';

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (session !== null) {
    return {
      redirect: {
        permanent: false,
        destination: '/authorized/dashboard',
      },
    };
  }
  return {
    props: {},
  };
};

const Login: NextPageWithLayout = () => {
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
            <IntroText>{'It’s great to see you again.'}</IntroText>
            <Summary>
              {'Join in the ongoing conversation around items, organizations,' +
                'and supply chain updates you care about the most.'}
            </Summary>
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
          <LoginFormWrapper>
            <LoginForm />
          </LoginFormWrapper>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

Login.getLayout = (page) => {
  return <LoginPageWrapper>{page}</LoginPageWrapper>;
};

export default Login;

const LoginPageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const InfoWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  height: '100vh',
  left: '0',
  padding: '46px',
}));

const IntroText = styled('p')({
  color: palette.neutral.white,
  left: '64px',
  marginTop: '10rem',
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '3rem',
  lineHeight: '3.25rem',
});

const Summary = styled('p')({
  color: palette.neutral.white,
  height: '96px',
  left: '64px',
  top: '217px',
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1.25rem',
  lineHeight: '2rem',
});

const LoginFormWrapper = styled(Box)({
  flex: 'auto',
  paddingTop: '3rem',
});
