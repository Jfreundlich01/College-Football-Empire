import { useRouter } from 'next/router';
import { trpc } from '@ps/utils/trpc';
import { useState } from 'react';
import {
  styled,
  Table,
  TableFooter,
  TablePagination,
  TableRow,
  Grid,
  InputBase,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { OrgCard } from '@ps/components/productPage/orgCard';
import { TablePaginationActions } from '@ps/utils/tablePagination';
import { BreadCrumbsOrgUsing } from '@ps/components/productPage/breadcrumbs/breadCrumbsOrgUsing';
import { OrgSearch } from '@ps/components/productPage/utils/orgSearch';
import { palette } from 'src/theme/palette';

const OrgsUsing: React.FC = () => {
  const router = useRouter();
  const productId = String(router.query.id);
  //pagination states
  const [page, setPage] = useState(0);
  const [orgsPerPage, setOrgsPerPage] = useState(12);
  //search state
  const [searchTerm, setSearchTerm] = useState('');
  const order = 'desc';
  const orderBy = 'orgName';

  //This allorgCards variable pulls all orgs that are using this product.
  const allOrgCards = trpc.useQuery(['product.getOrgCards', { id: productId }]);
  const productData = trpc.useQuery(['product.getProduct', { id: productId }]);

  const orgCards = allOrgCards.data ? allOrgCards.data : [];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrgsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  //sorting functionality
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | string[] },
    b: { [key in Key]: number | string | string[] }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <>
      {productData.data ? (
        <>
          <BreadCrumbsOrgUsing
            aria-label="breadcrumb"
            productData={productData.data}
            id={productId}
          />
          <TopRow>
            <TitleBox>
              <TitleText>
                Organizations using {productData.data.description}{' '}
              </TitleText>
            </TitleBox>
            <SelectWrapper>
              <Search sx={{ marginLeft: '20px' }}>
                <SearchIconWrapper>
                  <SearchIcon style={{ color: palette.neutral.grey_8 }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Organizations"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </Search>
            </SelectWrapper>
          </TopRow>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: '24px', marginBottom: '24px' }}
          >
            {orgCards &&
              (orgsPerPage > 0
                ? OrgSearch(orgCards, searchTerm)
                    .sort(getComparator(order, orderBy))
                    .slice(page * orgsPerPage, page * orgsPerPage + orgsPerPage)
                : OrgSearch(orgCards, searchTerm).sort(
                    getComparator(order, orderBy)
                  )
              ).map((org, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  sx={{ display: 'flex' }}
                  key={org.oid}
                >
                  <OrgCard key={org.oid} orgCardData={org} />
                </Grid>
              ))}
          </Grid>
          <Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[6, 12, 24]}
                  colSpan={8}
                  count={orgCards.length}
                  rowsPerPage={orgsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'organizations per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelRowsPerPage="Organizations per page"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrgsUsing;

const TopRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexBasis: '100%',
  marginTop: '24px',
});

const TitleBox = styled(Box)({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
});

const TitleText = styled(Typography)({
  font: 'Roboto',
  fontWeight: '600',
  fontSize: '20px',
  lineHeight: '24px',
  color: palette.neutral.black_7,
});

const SelectWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  width: '100%',
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: '8px',
  borderStyle: 'solid',
  borderColor: palette.neutral.grey_3,
  borderWidth: '1px',
  backgroundColor: palette.neutral.main,
  marginLeft: 0,
  height: '40px',
  width: '60%',
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: palette.neutral.grey_4,
  width: '370px',
  font: 'Roboto',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    //check with client to see if we can leave the width responsive
    width: '311px',
  },
}));
