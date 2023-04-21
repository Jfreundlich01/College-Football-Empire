import { useContext, useState, SyntheticEvent } from 'react';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { AddMemberList } from '@ps/components/organizations/myOrganization/memberList/MyOrgMemberList';
import { MyOrgFeaturedDocumentList } from '@ps/components/organizations/myOrganization/FeaturedDocs/MyOrgFeaturedDocumentList';
import { MyOrgAllDocGrid } from '@ps/components/organizations/myOrganization/allDocs/AllDocGrid';
import { OrgInfoEd } from '@ps/components/organizations/myOrganization/editOrgInfo/OrgInfoEd';
import { trpc } from '@ps/utils/trpc';
import { SnackBar } from '@ps/utils/SnackBar';
import { SupplierAchievements } from '@ps/components/organizations/achievements/SupplierAchievements';
import { TabsWrapper } from '@ps/utils/TabsWrapper';
import { ArticlesSection } from '@ps/components/organizations/myOrganization/articles/ArticlesSection';
import { palette } from 'src/theme/palette';

const tabs = [
  { label: 'Assets', id: 'asset-tab' },
  { label: 'Articles', id: 'articles-tab' },
];

const MyOrganization = () => {
  const user = useContext(UserContext);

  const oid = user.oid;
  const uid = user.uid;

  const orgName = user.orgName;

  //Handles snackbar on myOrg Page
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTablChange = (event: SyntheticEvent, newTabIndex: number) => {
    if (newTabIndex >= tabs.length) {
      setTabIndex(tabs.length - 1);
      return;
    }
    setTabIndex(newTabIndex);
  };

  const resetAlert = () => {
    setAlertSuccess(false);
  };

  const closeSnack = () => {
    setOpenSnack(false);
    setSnackMessage('');
    setTimeout(resetAlert, 100);
  };

  // pulling admin status from db
  const admin = trpc.useQuery([
    'org.orgAdmin',
    {
      oid,
      uid,
    },
  ]).data;

  //pulls documents from database
  const docQuery = trpc.useQuery(['doc.getOrgDocs', { oid: user.oid }]);

  const orgData = trpc.useQuery(['org.getOrg', { oid }]);

  if (docQuery.isLoading || orgData.isLoading) {
    return <>LOADING</>;
  }

  const docs = docQuery.data ? docQuery.data : [];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <OrgInfoBox>
            <OrgInfoEd
              setOpenSnack={setOpenSnack}
              setSnackMessage={setSnackMessage}
              setAlertSuccess={setAlertSuccess}
              org={orgData.data}
              admin={admin}
            />
            {user.orgType === 'Supplier' ? (
              <SupplierAchievements oid={oid} myOrg={true} />
            ) : (
              <></>
            )}
            <AddMemberList
              setOpenSnack={setOpenSnack}
              setSnackMessage={setSnackMessage}
              setAlertSuccess={setAlertSuccess}
              orgName={orgName}
              oid={oid}
              currentUserId={uid}
            />
          </OrgInfoBox>
        </Grid>
        <Grid style={{ marginTop: '-12px' }} item xs={12} md={8} lg={8} xl={8}>
          <TabsWrapper
            tabIndex={tabIndex}
            handleChange={handleTablChange}
            tabs={tabs}
          />
          {tabIndex === 0 && (
            <>
              {user.orgType === 'ThirdParty' ? (
                // Returning empty box with negative top margin to allow for proper alignment when all documents grid moves to top of page
                <Box sx={{ marginTop: '-40px' }}></Box>
              ) : (
                <MyOrgFeaturedDocumentList
                  setOpenSnack={setOpenSnack}
                  setSnackMessage={setSnackMessage}
                  setAlertSuccess={setAlertSuccess}
                  oid={oid}
                  uid={uid}
                  orgType={user.orgType}
                  docs={docs}
                />
              )}
              <MyOrgAllDocGrid
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                oid={oid}
                uid={uid}
                docs={docs}
                isAdmin={admin}
              />
            </>
          )}
          {tabIndex === 1 && (
            <Box>
              <ArticlesSection
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                oid={oid}
                uid={uid}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <SnackBar
        openSnack={openSnack}
        snackMessage={snackMessage}
        closeSnack={closeSnack}
        alertSuccess={alertSuccess}
      />
    </>
  );
};

export default MyOrganization;

const OrgInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: palette.neutral.white,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: palette.neutral.grey_9,
  borderRadius: '8px',
  [theme.breakpoints.up('md')]: { height: 'calc(100% - 42px)' },
  [theme.breakpoints.down('md')]: {
    height: '100%',
  },
}));
