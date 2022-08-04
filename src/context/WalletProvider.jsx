import PropTypes from "prop-types";
import { WalletManagerProvider, WalletType } from "@noahsaso/cosmodal";
import { ChainConfig } from "@constant";

const WalletProvider = ({ children }) => (
    <WalletManagerProvider
        defaultChainId={ChainConfig.chainId}
        enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
        localStorageKey="keplr-wallet"
        walletConnectClientMeta={{
            name: "Humans.io",
            description: "Humans.io",
            url: "",
            icons: [],
        }}
    >
        {children}
    </WalletManagerProvider>
);

WalletProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WalletProvider;
