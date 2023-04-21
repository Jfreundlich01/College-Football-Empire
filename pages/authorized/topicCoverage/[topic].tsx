/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { trpc } from '@ps/utils/trpc';
import Typography from '@mui/material/Typography';
import { palette } from 'src/theme/palette';
import { styled } from '@mui/material/styles';
import { FilterSelect } from '@ps/components/directory/utils/filterSelect';
import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SubmitButton } from '@ps/components/forms/SubmitButton';
import { EditButton } from '@ps/components/organizations/myOrganization/utils/EditButton';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TablePaginationActions } from '@ps/utils/tablePagination';
import { ArticleCard } from '@ps/components/articles/ArticleCard';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import { SnackBar } from '@ps/utils/SnackBar';
import { Article } from '@ps/components/interfaces/Articles';
import { useFollowTopic } from '@ps/components/dashboard/articles/hooks/useFollowTopic';
import { BreadcrumbsComponent } from '@ps/utils/Breadcrumbs';
import { CommentsBox } from '@ps/components/topicCoverage/CommentBox';
import { TopicSurvey } from '@ps/components/dashboard/survey/TopicSurvey';
import { AddArticleModal } from '@ps/components/articles/AddArticleModal';
import { EditArticleModal } from '@ps/components/articles/EditArticleModal';
import { ConfirmationModal } from '@ps/utils/ConfirmationModal';
import { FallBackPage } from '@ps/components/articles/FallBackPage';
interface Topic {
  createdOn: number;
  name: string;
  id: string;
  updatedOn: number;
}

interface TopicCoverage {
  articles: Article[];
  topic: Topic;
}

// Define an array of links to be displayed in breadcrumbs
const links = [{ label: 'Community Dashboard', href: '/authorized/dashboard' }];

const TopicCoverage = () => {
  const utils = trpc.useContext();
  const user = useContext(UserContext);

  // Checks if current user is a globalAdmin
  const globalAdmin = trpc.useQuery([
    'globalAdmin.checkGlobalAdmin',
    { uid: user.uid },
  ]).data;

  // These three states control the opening of modals: AddArticleModal, DeleteConfirmationModal, and EditArticalModal
  const [openAddArticleModal, setOpenAddArticleModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // This stores the information about the article being edited or deleted.
  const [articleBeingEdited, setArticleBeingEdited] = useState<
    Article | undefined
  >(undefined);
  const [reRender, setRerender] = useState(false);

  // mutation to allow for adding new comment
  const addComment = trpc.useMutation('articles.createComment', {
    onSuccess: () => {
      utils.invalidateQueries('articles.getTopicComments');
      setCommentBody('');
    },
    onError: () => {
      followTopicHook.setOpenSnack(true);
      followTopicHook.setSnackMessage('Unable to add comment');
      followTopicHook.setAlertSuccess(false);
    },
  });

  const [filter, setFilter] = useState('');
  //pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  // handles Scrolling
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [page, rowsPerPage]);

  // Comment body for posting comments
  const [commentBody, setCommentBody] = useState('');

  const router = useRouter();
  const topicId = String(router.query.topic);
  const deleteArticle = trpc.useMutation('articles.deleteArticle');

  // Query the server for the articles related to the topic
  const getArticles = trpc.useQuery([
    'articles.topicCoverage',
    {
      id: topicId,
      limit: rowsPerPage,
      skip: rowsPerPage * page,
      filter,
    },
  ]);

  // Query the server for the article sources for the filter
  const getSources = trpc.useQuery([
    'articles.getSources',
    {
      id: topicId,
    },
  ]);

  const followTopicHook = useFollowTopic(user.uid, topicId, 'ArticleTopic');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    utils.invalidateQueries('articles.topicCoverage');
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // pull all comments for the specific articleTopic from database
  const getComments = trpc.useQuery([
    'articles.getTopicComments',
    { topicId: topicId },
  ]);

  if (getComments.isLoading || getArticles.isLoading || getSources.isLoading) {
    //TODO replace with loading screen or animation
    return <>LOADING...</>;
  }

  const getCommentIndex = () => {
    if (!getComments.data) {
      return 0;
    }
    return getComments.data.length - 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedComment = commentBody.replace(/\n/g, '\\n');

    // Save the encodedComment to the Neo4j database
    if (encodedComment.length > 0) {
      addComment.mutate({
        commentBody: encodedComment,
        topicId,
        uid: user.uid,
      });
    }
  };

  const handleDelete = () => {
    if (articleBeingEdited) {
      deleteArticle.mutate(
        {
          id: articleBeingEdited.id,
          uid: user.uid,
        },
        {
          onSuccess: () => {
            utils.invalidateQueries('articles.topicCoverage');
            setOpenDelete(false);
            followTopicHook.setOpenSnack(true);
            followTopicHook.setSnackMessage('Successfully deleted the article');
            followTopicHook.setAlertSuccess(true);
            if (
              typeof getArticles.data !== 'number' &&
              getArticles.data &&
              getArticles.data.articles.length === 1
            ) {
              router.push('/authorized/dashboard');
            }
          },
          onError: () => {
            followTopicHook.setOpenSnack(true);
            followTopicHook.setSnackMessage('Unable to delete the article');
            followTopicHook.setAlertSuccess(false);
          },
        }
      );
    }
  };

  let suffix, body;

  if (articleBeingEdited) {
    suffix = articleBeingEdited.title.length > 50 ? '...' : '';
    body = (
      <span>
        Are you sure you want to delete the article:
        <strong>
          {` ${articleBeingEdited.title.substring(0, 50)}
          ${suffix}`}
        </strong>
        ? It will be permanently deleted.
      </span>
    );
  }

  return getArticles.data &&
    typeof getArticles.data !== 'number' &&
    getSources.data ? (
    <>
      <BreadcrumbsComponent
        ariaLabel="breadcrumb"
        links={links}
        current={`All ${getArticles.data.topic.name} coverage`}
      />
      <TopRow>
        <TitleBox>
          <TitleText>{`${getArticles.data.topic.name} Coverage`}</TitleText>
        </TitleBox>
        <SelectWrapper>
          <SortFilter>
            <FilterSelect
              filters={getSources.data}
              filter={filter}
              setFilter={setFilter}
            />
          </SortFilter>
          {followTopicHook.topicFollowed ? (
            <SubmitButton
              id="topic-follow-button"
              style={{ margin: '0px 12px 0px 12px' }}
              handleSubmit={() => {
                followTopicHook.unfollowTopic.mutate({
                  uid: user.uid,
                  id: topicId,
                  followType: 'ArticleTopic',
                });
              }}
            >
              Unfollow This Topic
            </SubmitButton>
          ) : (
            <SubmitButton
              id="topic-follow-button"
              style={{ margin: '0px 12px 0px 12px' }}
              handleSubmit={() => {
                followTopicHook.followTopic.mutate({
                  uid: user.uid,
                  id: topicId,
                  followType: 'ArticleTopic',
                });
              }}
            >
              Follow This Topic
            </SubmitButton>
          )}
          <EditButton
            label=" Submit An Article"
            onClick={() => {
              setOpenAddArticleModal(true);
            }}
            style={{ margin: '0px 12px 0px 12px' }}
          />
        </SelectWrapper>
      </TopRow>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: '24px', marginBottom: '24px' }}
      >
        {getArticles.data.articles.map((article: Article) => (
          <Grid xs={12} sm={6} md={4} lg={4} item key={article.id}>
            <ArticleCard
              article={article}
              setArticleBeingEdited={setArticleBeingEdited}
              setOpenEdit={setOpenEdit}
              setOpenDelete={setOpenDelete}
              globalAdmin={globalAdmin}
            />
          </Grid>
        ))}
      </Grid>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 12, 18]}
              colSpan={8}
              count={getArticles.data.total}
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
              labelRowsPerPage="Articles per page"
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8} md={8} lg={8} item>
          <CommentsBox
            getCommentIndex={getCommentIndex}
            topicId={topicId}
            commentBody={commentBody}
            setCommentBody={setCommentBody}
            handleSubmit={handleSubmit}
            globalAdmin={globalAdmin}
          />
        </Grid>
        <Grid xs={12} sm={4} md={4} lg={4} item>
          <TopicSurvey
            uid={user.uid}
            orgType={user.orgType}
            topicId={topicId}
          />
        </Grid>
      </Grid>
      <AddArticleModal
        open={openAddArticleModal}
        setOpen={setOpenAddArticleModal}
        setOpenSnack={followTopicHook.setOpenSnack}
        setSnackMessage={followTopicHook.setSnackMessage}
        setAlertSuccess={followTopicHook.setAlertSuccess}
        setRerender={setRerender}
        reRender={reRender}
        articleTopic={getArticles.data.topic.name}
      />
      {articleBeingEdited && (
        <EditArticleModal
          open={openEdit}
          setOpen={setOpenEdit}
          setOpenSnack={followTopicHook.setOpenSnack}
          setSnackMessage={followTopicHook.setSnackMessage}
          setAlertSuccess={followTopicHook.setAlertSuccess}
          setRerender={setRerender}
          editType="topicCoverage"
          article={{
            imgUrl: articleBeingEdited.imgUrl,
            title: articleBeingEdited.title,
            articleUrl: articleBeingEdited.articleUrl,
            topic:
              typeof articleBeingEdited.topic === 'string'
                ? articleBeingEdited.topic
                : articleBeingEdited.topic.name,
            clicks: articleBeingEdited.clicks,
            id: articleBeingEdited.id,
            createdOn: articleBeingEdited.createdOn,
            status: articleBeingEdited.status,
            siteName: articleBeingEdited.siteName,
            oid: articleBeingEdited.oid,
          }}
        />
      )}
      <ConfirmationModal
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
        }}
        handleConfirmation={handleDelete}
        headline="Are you sure?"
        body={body || ''}
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
      />
      <SnackBar
        openSnack={followTopicHook.openSnack}
        snackMessage={followTopicHook.snackMessage}
        closeSnack={followTopicHook.closeSnack}
        alertSuccess={followTopicHook.alertSuccess}
      />
    </>
  ) : (
    <FallBackPage />
  );
};

export default TopicCoverage;

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
  fontSize: '1.25rem',
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
  margin: '0px 12px 0px 12px',
});
