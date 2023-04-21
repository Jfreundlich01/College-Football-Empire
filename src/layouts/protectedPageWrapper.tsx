import { styled, Box, Container } from "@mui/material";
// import { Nav } from '../components/navigation/Nav';
import { useSession } from "next-auth/react";
import { trpc } from "@ps/utils/trpc";
import { createContext } from "react";
// import { Footer } from '../components/footer/Footer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext({
  uid: "0",
  firstName: "",
  lastName: "",
  email: "",
  avatarUrl: "",
  oid: "",
  orgName: "",
  orgType: "",
});

export const ProtectedPageWrapper: React.FC<Props> = (props) => {
  const sess = useSession();
  const userID = sess !== null ? sess.data?.user.uid : "ID NOT PROVIDED";
  const id = userID !== undefined ? userID : "0";

  const orgData = trpc.useQuery(["user.getUserOrgs", { uid: id }]);
  const user = trpc.useQuery(["user.getUser", { uid: id }]);
  // console.log('The data:', userQuery);

  if (orgData.isLoading || user.isLoading) {
    return <>LOADING......</>;
  }

  const getData = () => {
    if (user.data && orgData.data) {
      const { firstName, lastName, uid, email, avatarUrl } = user.data;
      //default org is first one in the array that is returned as data
      //TODO update functionality to allow user to select their "current org" if they have more than 1 org
      const { oid, orgName, orgType } = orgData.data[0];
      return {
        firstName,
        lastName,
        uid,
        email,
        avatarUrl,
        oid,
        orgName,
        orgType,
      };
    }
    return {
      uid: "0",
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      oid: "",
      orgName: "",
      orgType: "",
    };
  };

  const data = getData();

  return (
    <>
      <PageBox>
        <UserContext.Provider value={data}>
          {/* <Nav /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            <Container maxWidth={false}>{props.children}</Container>
            {/* <Footer /> */}
          </Box>
        </UserContext.Provider>
      </PageBox>
    </>
  );
};

const PageBox = styled(Box)({
  marginTop: "100px",
  display: "flex",
});
