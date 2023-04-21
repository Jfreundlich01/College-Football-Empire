import { useContext, useState, SyntheticEvent } from 'react';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import { trpc } from '@ps/utils/trpc';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FilledButton } from '@ps/components/globalAdmin/FilledButton';
import { AddOrgForm } from '@ps/components/globalAdmin/addOrganization/AddOrgForm';
import { ImportCSVModal } from '@ps/components/globalAdmin/csvImport/ImportCSVModal';
import { MapManufacturers } from '@ps/components/globalAdmin/mapManufacturers/MapManufacturers';
import { SnackBar } from '@ps/utils/SnackBar';
import { ArticleTable } from '@ps/components/globalAdmin/articles/ArticleTable';
import { TabsWrapper } from '@ps/utils/TabsWrapper';

const tabs = [
  { label: 'Org. Management', id: 'org-management-tab' },
  { label: 'Industry Intel', id: 'industry-intel-tab' },
];

const GlobalAdminDashoard = () => {
  const user = useContext(UserContext);

  // Add Org show/hide state
  const [showAddOrg, setShowAddOrg] = useState(false);
  // Import CSV open/close state
  const [addOrgPending, setAddOrgPending] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(false);
  // Map manufacturers open/close state
  const [openMapMan, setOpenMapMan] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  //Handles snackbar on myOrg Page
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Handles Tab index
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newTabIndex: number) => {
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

  const globalAdmin = trpc.useQuery([
    'globalAdmin.checkGlobalAdmin',
    { uid: user.uid },
  ]);

  if (globalAdmin.isLoading) {
    return <>LOADING...</>;
  }

  if (!globalAdmin.data) {
    return (
      <Box>
        <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
          Access denied. You do not have permission to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TabsWrapper
        tabIndex={tabIndex}
        handleChange={handleTabChange}
        tabs={tabs}
      />
      {tabIndex === 0 && (
        <Box sx={{ marginTop: '20px' }}>
          <Box>
            <FilledButton onClick={() => setShowAddOrg(!showAddOrg)}>
              Add New Organization
            </FilledButton>
            {showAddOrg && (
              <AddOrgForm
                setOpenSnack={setOpenSnack}
                setSnackMessage={setSnackMessage}
                setAlertSuccess={setAlertSuccess}
                user={user}
                addOrgPending={addOrgPending}
                setAddOrgPending={setAddOrgPending}
              />
            )}
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <FilledButton
              onClick={() => {
                setUploadDoc(!uploadDoc);
              }}
            >
              Import Featured Items CSV
            </FilledButton>
            <ImportCSVModal
              open={uploadDoc}
              uploadDoc={uploadDoc}
              setUploadDoc={setUploadDoc}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              uid={user.uid}
              orgType={user.orgType}
              setAlertSuccess={setAlertSuccess}
              setSnackMessage={setSnackMessage}
              setOpenSnack={setOpenSnack}
            />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <FilledButton
              onClick={() => {
                setOpenMapMan(!openMapMan);
              }}
            >
              Map Supplier Org to Product Manufacturer
            </FilledButton>
            <MapManufacturers
              open={openMapMan}
              setOpen={setOpenMapMan}
              uid={user.uid}
              setOpenSnack={setOpenSnack}
              setSnackMessage={setSnackMessage}
              setAlertSuccess={setAlertSuccess}
            />
          </Box>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          <ArticleTable
            setOpenSnack={setOpenSnack}
            setSnackMessage={setSnackMessage}
            setAlertSuccess={setAlertSuccess}
          />
        </Box>
      )}
      <SnackBar
        openSnack={openSnack}
        snackMessage={snackMessage}
        closeSnack={closeSnack}
        alertSuccess={alertSuccess}
      />
    </Box>
  );
};

export default GlobalAdminDashoard;
