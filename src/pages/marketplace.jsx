import { useCallback, useEffect, useMemo, useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";
import { useAppSelector } from "@app/hooks";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => {
    const marketplaceNfts = useAppSelector((state) => state.marketplaceNfts);

    const productData = useMemo(() => {
        let result = [];
        Object.keys(marketplaceNfts).forEach((key) => {
            const nfts = marketplaceNfts[key];
            result = result.concat(
                nfts.map((nft) => ({
                    id: nft.token_id,
                    nft,
                }))
            );
        });
        return result;
    }, [marketplaceNfts]);

    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Marketplace" currentPage="Marketplace" />
                <ProductArea data={{ products: productData }} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Product;
