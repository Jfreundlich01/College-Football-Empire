import { CriticalBenchmarks } from '@ps/components/criticalItems/BenchmarkSection';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MyCritItemsGrid } from '@ps/components/criticalItems/MyCritItemsGrid';
import { ComCritItemsGrid } from '@ps/components/criticalItems/ComCritItemsGrid';
import { SuppMyCritItemsGrid } from '@ps/components/criticalItems/SuppMyCritItemsGrid';
import { SuppComCritItemsGrid } from '@ps/components/criticalItems/SuppComCritItemsGrid';
import { SnackBar } from '@ps/utils/SnackBar';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import LockIcon from '@mui/icons-material/Lock';
import { SupplierCriticalBenchmarks } from '@ps/components/criticalItems/SupplierBenchmarks';
import { palette } from 'src/theme/palette';
import { TabsWrapper } from '@ps/utils/TabsWrapper';

const tabs = [
  { label: 'My Critical Items', id: 'crit-my-items-tab' },
  { label: 'Community Critical Items', id: 'crit-community-items-tab' },
];

const CriticalItemsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const user = useContext(UserContext);
  const oid = user.oid;
  const uid = user.uid;

  //Handles snackbar on CritItems Page
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const resetAlert = () => {
    setAlertSuccess(false);
  };

  const closeSnack = () => {
    setOpenSnack(false);
    setSnackMessage('');
    setTimeout(resetAlert, 100);
  };

  const handleTabChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      {user.orgType === 'Provider' || user.orgName === 'HIRC' ? (
        <>
          <CriticalItemsWrapper>
            <Box>
              <CriticalBenchmarks oid={oid} />
            </Box>
            <TabsWrapper
              style={{ marginTop: '75px' }}
              tabIndex={tabIndex}
              handleChange={handleTabChange}
              tabs={tabs}
            />
            {tabIndex === 0 && (
              <MyCritItemsGrid
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                oid={oid}
                uid={uid}
                orgType={user.orgType}
              />
            )}
            {tabIndex === 1 && <ComCritItemsGrid oid={oid} />}
          </CriticalItemsWrapper>
          <SnackBar
            openSnack={openSnack}
            snackMessage={snackMessage}
            closeSnack={closeSnack}
            alertSuccess={alertSuccess}
          ></SnackBar>
        </>
      ) : user.orgType === 'Supplier' ? (
        <>
          <CriticalItemsWrapper>
            <Box>
              <SupplierCriticalBenchmarks oid={oid} />
            </Box>
            <TabsWrapper
              style={{ marginTop: '75px' }}
              tabIndex={tabIndex}
              handleChange={handleTabChange}
              tabs={tabs}
            />
            {tabIndex === 0 && (
              <SuppMyCritItemsGrid
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                oid={oid}
                uid={uid}
                orgType={user.orgType}
              />
            )}
            {tabIndex === 1 && <SuppComCritItemsGrid oid={oid} />}
          </CriticalItemsWrapper>
          <SnackBar
            openSnack={openSnack}
            snackMessage={snackMessage}
            closeSnack={closeSnack}
            alertSuccess={alertSuccess}
          ></SnackBar>
        </>
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
          <LockIcon sx={{ fontSize: '120px', color: palette.primary.dark }} />
          <CritItemsLockMessage>
            Critical items insights will be available for organizations like
            yours soon
          </CritItemsLockMessage>
        </Box>
      )}
    </>
  );
};

export default CriticalItemsDashboard;

const CriticalItemsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const CritItemsLockMessage = styled(Typography)({
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '40px',
  lineHeight: '48px',
  color: palette.neutral.black_7,
  width: '60%',
  textAlign: 'center',
  marginTop: '24px',
});
