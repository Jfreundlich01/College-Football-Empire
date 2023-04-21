import {
  styled,
  Table,
  TableFooter,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Box, Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
// import { SortSelect } from '@ps/components/directory/utils/sortSelect';
import { FilterSelect } from '@ps/components/directory/utils/filterSelect';
import { trpc } from '@ps/utils/trpc';
import { OrgCard } from '@ps/components/organizations/orgCard/OrgCard';
import { TablePaginationActions } from '@ps/utils/tablePagination';
import { OrgSearch } from '@ps/components/organizations/utils/orgSearch';
import { palette } from 'src/theme/palette';

const Directory = () => {
  // const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  //pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //search state
  const [searchTerm, setSearchTerm] = useState('');
  //orderingStates
  // const [order, setOrder] = useState<Order>('desc');
  // const [orderBy, setOrderBy] = useState('timestamp');
  const order = 'desc';
  const orderBy = 'orgName';

  const allOrgCards = trpc.useQuery(['org.getOrgCards']);

  if (allOrgCards.isLoading) {
    return <>LOADING...</>;
  }

  const orgs = allOrgCards.data ? allOrgCards.data : [];

  const getOrgs = () => {
    let returnedOrgs;

    if (filter === 'Providers') {
      returnedOrgs = orgs.filter((org) => org.orgType === 'Provider');
    } else if (filter === 'Suppliers') {
      returnedOrgs = orgs.filter((org) => org.orgType === 'Supplier');
    } else if (filter === 'Third Parties') {
      returnedOrgs = orgs.filter((org) => org.orgType === 'ThirdParty');
    } else {
      returnedOrgs = orgs;
    }

    return returnedOrgs;
  };

  const orgCards = getOrgs();

  //Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orgs.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/authorized/dashboard"
          sx={{
            font: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '18px',
            color: palette.secondary.main,
          }}
        >
          Community Dashboard
        </Link>
        <Typography
          sx={{
            font: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '18px',
          }}
        >
          Community Directory
        </Typography>
      </Breadcrumbs>
      <TopRow>
        <TitleBox>
          <TitleText>Community Directory</TitleText>
        </TitleBox>
        <SelectWrapper>
          <SortFilter>
            {/* TO DO: Uncomment the Sort, and make functional! */}
            {/* <SortSelect sort={sort} setSort={setSort} /> */}
            <FilterSelect filter={filter} setFilter={setFilter} />
          </SortFilter>
          <Search sx={{ marginLeft: '20px', width: '30%' }}>
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
              id="org-search-filter"
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
          (rowsPerPage > 0
            ? OrgSearch(orgCards, searchTerm)
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
              id="org-card"
              data-testid={`org-card-${index}`}
            >
              <OrgCard
                key={org.oid}
                orgCardData={org}
                badgeCount={org.badgeCount}
                id={index}
              />
            </Grid>
          ))}
      </Grid>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={8}
              count={orgs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
                id: 'page-amount-filter',
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
  );
};

export default Directory;

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
  width: '40%',
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

const SortFilter = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: '8px',
  borderStyle: 'solid',
  borderColor: palette.neutral.grey_3,
  borderWidth: '1px',
  backgroundColor: palette.neutral.main,
  marginLeft: 0,
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
    // width: '311px',
  },
}));
