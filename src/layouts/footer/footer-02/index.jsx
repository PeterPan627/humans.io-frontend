import PropTypes from "prop-types";
import clsx from "clsx";

const Footer = ({ className }) => (
    <div
        className={clsx(
            "rn-footer-area footer-for-left-sticky-header",
            className
        )}
    >
        <span>className</span>
    </div>
);

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
