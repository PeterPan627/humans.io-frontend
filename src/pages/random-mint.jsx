import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product";

// Demo data
import sellerData from "../data/sellers.json";
import productData from "../data/products-02.json";
import notificationData from "../data/notifications.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => (
    <Wrapper>
        <SEO pageTitle="Explore List Style" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Explore Style List"
                currentPage="Explore Style List"
            />
            <ProductArea
                data={{
                    section_title: {
                        title: "OUR All NFT'S",
                    },
                    products: productData,
                    notifications: notificationData,
                    creators: sellerData,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default Home02;
