import '../styles/globals.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/confiureStore';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>flow</title>
    </Head>
    <Component {...pageProps} />
  </>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(MyApp);
