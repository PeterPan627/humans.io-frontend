import PropTypes from "prop-types";
import { WalletManagerProvider } from "@noahsaso/cosmodal";

const WalletProvider = ({ children }) => (
    <WalletManagerProvider>{children}</WalletManagerProvider>
);

WalletProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WalletProvider;
