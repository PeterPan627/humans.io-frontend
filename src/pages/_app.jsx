import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
    RefreshContextProvider,
    // CustomWalletProvider as WalletProvider,
    WalletProvider,
} from "@context";
import { persistor, store } from "@app/store";
import Updater from "@components/updater";

import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <RefreshContextProvider>
            <WalletProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Updater />
                        <ThemeProvider defaultTheme="dark">
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </PersistGate>
                </Provider>
            </WalletProvider>
        </RefreshContextProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
