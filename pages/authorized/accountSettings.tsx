import React, { useContext } from 'react';
import { UserContext } from '../../src/layouts/ProtectedPageWrapper';
import { AccountSettingsChild } from '@ps/components/usersettings/AccountSettingsChild';
import { trpc } from '@ps/utils/trpc';

const AccountSettings: React.FC = () => {
  // Get User
  const user = useContext(UserContext);

  const uid: string = user.uid;
  const orgName = user.orgName;

  const userQuery = trpc.useQuery(['user.getUser', { uid }]);

  if (userQuery.isLoading) {
    return <>LOADING...</>;
  }

  return (
    <>
      {userQuery.data ? (
        <AccountSettingsChild userQuery={userQuery.data} orgName={orgName} />
      ) : (
        <></>
      )}
    </>
  );
};

export default AccountSettings;
