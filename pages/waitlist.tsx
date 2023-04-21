import { NextPageWithLayout } from '../types';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { WaitlistForm } from '../src/components/waitlist/WaitlistForm';
import pslogo from '../src/assets/PSLogoWhite.svg';
import { Footer } from '@ps/components/footer/Footer';
import { palette } from 'src/theme/palette';
// TODO: Uncomment out when carousel is ready
// import { CardCarousel } from '../src/components/waitlist/CardCarousel';

const Waitlist: NextPageWithLayout = () => {
  return (
    <Grid container>
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
            {'Join in the ongoing conversation around items, organizations,' +
              'and supply chain updates you care about the most.'}
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
          justifyContent: 'space-between',
        }}
      >
        <WaitlistFormWrapper>
          <WaitlistForm />
        </WaitlistFormWrapper>
        <Footer />
      </Grid>
    </Grid>
  );
};

Waitlist.getLayout = (page) => page;

export default Waitlist;

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
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1.25rem',
  lineHeight: '2rem',
});

const WaitlistFormWrapper = styled(Box)({
  flex: 'auto',
  paddingTop: '3rem',
});

// TODO: Waiting on copy from Peer Supply as of 9/5
// const CarouselWrapper = styled(Box)({
//   marginTop: '5rem',
// });
