import PropTypes from "prop-types";
import { ItemType } from "@utils/types";

const Footer = ({ space, className, data }) => <>This is Footer</>;

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2, 3]),
    className: PropTypes.string,
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

Footer.defaultProps = {
    space: 1,
};

export default Footer;
