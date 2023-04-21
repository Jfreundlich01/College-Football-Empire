import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { palette } from 'src/theme/palette';
import { Search } from '@ps/utils/Search';
import { useCallback, useEffect, useState } from 'react';
import { PostCard } from '@ps/components/dashboard/rightside/PostCard';
import { MultipleArticlesCard } from '@ps/components/dashboard/articles/MultipleArticlesCard';
import { SingleArticleCard } from '@ps/components/dashboard/articles/SingleArticleCard';
import { Articles } from '@ps/components/interfaces/Articles';
import { EditButton } from '@ps/components/organizations/myOrganization/utils/EditButton';
import { SnackBar } from '@ps/utils/SnackBar';
import { AddArticleModal } from '@ps/components/articles/AddArticleModal';
import { TextButton } from '@ps/components/forms/TextButton';
import { trpc } from '@ps/utils/trpc';

const Dashboard: React.FC = () => {
  //search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  //Articles
  const [articles, setArticles] = useState<Articles[] | undefined>(undefined);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const [openAddArticleModal, setOpenAddArticleModal] = useState(false);
  const [reRender, setRerender] = useState(false);
  //Handles snackbar on TopicCoverage Page
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const trendingItemsAndData = trpc.useQuery([
    'trendingCardsRouter.getTrendingDataAndItems',
    { queryArray: ['itemType', 'trendingItems', 'manufacturer'] },
  ]).data;

  const resetAlert = () => {
    setAlertSuccess(false);
  };

  const closeSnack = () => {
    setOpenSnack(false);
    setSnackMessage('');
    setTimeout(resetAlert, 100);
  };

  const fetchArticleData = useCallback(
    (
      queryString: string = `?searchActive=${searchActive}&searchTerm=${searchTerm}&limit=${limit}&skip=${skip}`
    ) => {
      fetch(`/api/articles/dashboard${queryString}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data === 0 || data[0].length === 0) {
            setNoMoreResults(true);
          } else {
            if (queryString.includes('skip=0')) {
              if (data[0].length < limit) {
                setNoMoreResults(true);
              }
              setArticles(data[0]);
            } else {
              if (data[0].length < limit) {
                setNoMoreResults(true);
              }
              setArticles((prevArticles) => {
                if (Array.isArray(prevArticles)) {
                  return [...prevArticles, ...data[0]];
                } else {
                  return data[0];
                }
              });
            }
          }
          setRerender(false);
        })
        .catch((error) => console.error(error));
    },
    // Disabled because it wants SearchTerm to be a part, but if searchActive is a part, this runs everytime a user types in the search input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchActive, skip, page]
  );

  // initial articles pull
  // only time we need logic to run where skip = 0 and reRender = false
  useEffect(() => {
    fetchArticleData();
  }, []);

  // fetches article data when reRender is true and skip !== 0
  // all cases where skip = 0 are also handed by reRender true
  useEffect(() => {
    if (reRender || skip !== 0) {
      setNoMoreResults(false);
      fetchArticleData();
    }
  }, [fetchArticleData, reRender, skip]);

  // use this function to call the initial search results
  const handleSearch = () => {
    if (searchTerm.length > 0) {
      setSearchActive(true);
      setSkip(0);
      setPage(0);
      setArticles(undefined);
      fetchArticleData(
        `?sort=score&desc=desc&searchActive=true&searchTerm=${searchTerm}&limit=${limit}&skip=0`
      );
    }
  };

  // this function calls handle search if user hits enter key while typing in search box
  const handleKeyDown = (keyType: string) => {
    if (keyType === 'Enter' && searchTerm) {
      setPage(0);
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchActive(false);
    setSearchTerm('');
    setSkip(0);
    setArticles(undefined);
    setNoMoreResults(false);
    setPage(0);
    fetchArticleData(`?searchActive=false&searchTerm=''&limit=${limit}&skip=0`);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '24px' }}>
        <Grid item sm={12} md={8}>
          <Grid item sm={12} md={12} spacing={0}>
            <TitleBox>
              <Title>Industry Intel</Title>
              <InputBox sx={{ display: 'flex', flexDirection: 'row' }}>
                <Search
                  handleSearch={handleSearch}
                  clearSearch={clearSearch}
                  handleKeyDown={handleKeyDown}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchActive={searchActive}
                  placeholder={'Search by Topic, Article Name, or Source'}
                />
                <EditButton
                  label="Submit An Article"
                  onClick={() => {
                    setPage(0);
                    setSkip(0);
                    setOpenAddArticleModal(true);
                  }}
                />
              </InputBox>
            </TitleBox>
          </Grid>
          <Box sx={{ width: '100%' }}>
            {articles ? (
              articles.map((topic, index) =>
                topic.articles.length > 1 && !searchActive ? (
                  <MultipleArticlesCard topic={topic} key={index} />
                ) : (
                  <SingleArticleCard
                    searchActive={searchActive}
                    topic={topic}
                    key={index}
                  />
                )
              )
            ) : (
              <p>No articles found.</p>
            )}
            {!noMoreResults && (
              <TextButton
                style={{
                  marginBottom: '24px',
                }}
                onClick={() => {
                  setSkip(skip + 10);
                  setPage(page + 1);
                }}
              >
                Load More Articles
              </TextButton>
            )}
          </Box>
        </Grid>
        <Grid item sm={12} md={4}>
          {trendingItemsAndData ? (
            <Box sx={{ display: 'grid', gap: '15px' }}>
              <PostCard
                title="Top Five Trending Item Types"
                tipText="The top five most common Item Types in the Community Critical Items lists"
                data={trendingItemsAndData[0]}
                chartType="verticalBar"
              />
              <PostCard
                title="Top Five Trending Items"
                tipText="The top five most common Item Types in the Community Critical Items lists"
                data={trendingItemsAndData[1]}
                chartType="horizontalBar"
              />
              <PostCard
                title="Top Five Trending Suppliers"
                tipText="The top five most common suppliers of Critical Items"
                data={trendingItemsAndData[2]}
                chartType="verticalBar"
              />
            </Box>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>

      <AddArticleModal
        open={openAddArticleModal}
        setOpen={setOpenAddArticleModal}
        setOpenSnack={setOpenSnack}
        setSnackMessage={setSnackMessage}
        setAlertSuccess={setAlertSuccess}
        setRerender={setRerender}
        reRender={reRender}
      />
      <SnackBar
        openSnack={openSnack}
        snackMessage={snackMessage}
        closeSnack={closeSnack}
        alertSuccess={alertSuccess}
      />
    </>
  );
};

export default Dashboard;

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
  },
}));

const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    marginTop: '12px',
  },
}));

const Title = styled(Typography)({
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '1.25rem',
  lineHeight: '24px',
  marginRight: '24px',
  color: palette.neutral.black_7,
});
