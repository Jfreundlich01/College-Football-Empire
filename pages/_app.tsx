import '../styles/globals.css';
import '@ps/components/auth/firebase-client/config';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '../src/emotion/createEmotionCache';
import { ThemeConfig } from '../src/theme/ThemeConfig';
import { AppPropsWithLayout } from '../types';
import { ProtectedPageWrapper } from '../src/layouts/ProtectedPageWrapper';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { AppRouter } from '@ps/server/routers/app';
import superjson from 'superjson';

interface PropsWithEmotion {
  emotionCache?: EmotionCache;
  session: Session;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppPropsWithLayout & PropsWithEmotion) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;

  const getLayout =
    Component.getLayout ??
    ((page) => {
      if (Component.displayName === 'ErrorPage') {
        return page;
      }
      // NOTE: We use the ProtectedPageWrapper as default because most of our pages will be protected pages.
      // If you need to overwrite this layout and use a custom one, then you must set 'getLayout' in your page.
      // Reference the `login` page as an example.
      return <ProtectedPageWrapper>{page}</ProtectedPageWrapper>;
    });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Peer Supply</title>
        {/* Note: Viewport meta tags need to be included in _app not _document
        Reference: https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1"
        />
      </Head>
      <SessionProvider session={session}>
        <ThemeConfig>{getLayout(<Component {...pageProps} />)}</ThemeConfig>
      </SessionProvider>
    </CacheProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.CLOUD_RUN_URL) return `https://${process.env.CLOUD_RUN_URL}`; // SSR should use cloud run url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) => {
            // TODO: TEST in production and remove the defualt console prints statments
            // console.log('the logger link enabled prop:');
            // console.log('NODE_ENV:', process.env.NODE_ENV);
            // console.log('opts.direction:', opts.direction);
            // console.log(
            //   'opts.result:',
            //   opts.direction === 'down' && opts.result instanceof Error
            // );
            return false;
            // return (
            //   process.env.NODE_ENV === 'development' ||
            //   (opts.direction === 'down' && opts.result instanceof Error)
            // );
          },
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      headers: () => {
        if (ctx?.req) {
          const headers = ctx?.req?.headers;
          delete headers?.connection;
          return {
            ...headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
