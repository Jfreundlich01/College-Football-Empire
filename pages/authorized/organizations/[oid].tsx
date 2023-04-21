import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import { OrgInfo } from '../../../src/components/organizations/OrgInfo';
import { OrgMembersList } from '../../../src/components/organizations/OrgMembersList';
import { OrgRecentPosts } from '../../../src/components/organizations/OrgRecentPosts';
import { FeaturedDocumentList } from '../../../src/components/organizations/FeaturedDocumentList';
import { AllDocGrid } from '../../../src/components/organizations/AllDocGrid';
import { SnackBar } from '@ps/utils/SnackBar';
import { SupplierAchievements } from '@ps/components/organizations/achievements/SupplierAchievements';
import { trpc } from '@ps/utils/trpc';
import { palette } from 'src/theme/palette';

const OrgPage: React.FC = () => {
  const user = useContext(UserContext);
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

  const router = useRouter();
  const orgId = String(router.query.oid);
  const orgData = trpc.useQuery(['org.getOrg', { oid: orgId }]);
  // pulls organization's document metadata from neo4j database
  const docsQuery = trpc.useQuery(['doc.getOrgDocs', { oid: orgId }]);

  if (docsQuery.isLoading || orgData.isLoading) {
    return <>LOADING...</>;
  }

  // if there are no documents, and 0 is returned, replace with empty array
  const docs = docsQuery.data ? docsQuery.data : [];

  return (
    <>
      {orgData ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <OrgInfoBox>
              <OrgInfo
                orgData={orgData.data}
                uid={user.uid}
                oid={orgId}
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
              />
              {orgData.data.orgType[0] === 'Supplier' ? (
                <SupplierAchievements oid={orgId} myOrg={false} />
              ) : (
                <></>
              )}
              <OrgMembersList orgData={orgData.data} />
            </OrgInfoBox>
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={8}>
            <OrgRecentPosts oid={orgId} orgName={orgData.data.orgName} />
            {orgData.data.orgType[0] === 'ThirdParty' ? (
              <></>
            ) : (
              <FeaturedDocumentList orgData={orgData.data} docs={docs} />
            )}
            <AllDocGrid orgData={orgData.data} docs={docs} />
          </Grid>
          <SnackBar
            openSnack={openSnack}
            snackMessage={snackMessage}
            closeSnack={closeSnack}
            alertSuccess={alertSuccess}
          />
        </Grid>
      ) : (
        <>
          <p>Organization not found.</p>
        </>
      )}
    </>
  );
};

const OrgInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: palette.neutral.white,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: palette.neutral.grey_9,
  borderRadius: '8px',
  height: '100%',
  marginBottom: '12px',
}));

export default OrgPage;
