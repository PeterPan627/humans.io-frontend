import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product";
import { useAppSelector } from "@app/hooks";
import { ChainConfig } from "@constant";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const RandomMint = () => {
    const collections = useAppSelector((state) => state.collections);
    const productData = Object.keys(collections).map((key) => {
        const collection = collections[key];
        return {
            id: key,
            title: collection.collection_info?.title || "",
            price: {
                public: {
                    amount: collection.mint_info?.public_price?.amount,
                    currency: ChainConfig.microDenom,
                },
                private: {
                    amount: collection.mint_info?.private_price?.amount,
                    currency: ChainConfig.microDenom,
                },
            },
            images: [
                {
                    src: collection.collection_info?.logo_url || "",
                },
            ],
            contractAddress: collection.minter,
        };
    });

    return (
        <Wrapper>
            <SEO pageTitle="Random Mint" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Random Mint" currentPage="Random Mint" />
                <ProductArea
                    data={{
                        // section_title: {
                        //     title: "OUR All NFT'S",
                        // },
                        products: productData,
                        // notifications: notificationData,
                        // creators: sellerData,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default RandomMint;
