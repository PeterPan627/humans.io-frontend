import { useCallback, useEffect, useMemo, useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";
import { useContract } from "@hooks";
import { useAppSelector } from "@app/hooks";
import { MarketplaceContract } from "@constant";

const MAX_ITEMS = 50;

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => {
    const [marketplaceNfts, setMarketplaceNfts] = useState([]);
    const collections = useAppSelector((state) => state.collections);
    const { runQuery } = useContract();

    const fetchMarketplaceNfts = useCallback(async () => {
        Object.keys(collections).forEach(async (key) => {
            const queries = [];
            const contractAddress = [];
            // const collection = collections[key];
            const collectionInfo = await runQuery(MarketplaceContract, {
                get_collection_info: {
                    address: key,
                },
            });
            for (
                let i = 0;
                i < Math.ceil((collectionInfo?.num_offerings || 0) / MAX_ITEMS);
                i++
            ) {
                queries.push(
                    runQuery(MarketplaceContract, {
                        get_offers: {
                            page_num: i + 1,
                            count: MAX_ITEMS,
                            address: key,
                        },
                    })
                );
                contractAddress.push(key);
            }
            await Promise.all(queries).then((queryResults) => {
                queryResults.forEach((queryResult, index) => {
                    const nftList = queryResult.map((item, nftIndex) => {
                        const nftAddress = item.contract;
                        const collection = collections[nftAddress];
                        const tokenIdNumber = item.token_id.split(".").pop();
                        const listPrice = item.list_price || {};
                        return {
                            token_address: nftAddress,
                            token_id: item.token_id,
                            collection: collection.collection_info?.title,
                            image_url: `${collection.mint_info?.base_image_uri}${tokenIdNumber}.png`,
                            token_url: `${collection.mint_info?.base_token_uri}${tokenIdNumber}.png`,
                            seller: item.seller,
                            price: {
                                denom: listPrice.denom,
                                amount: Number(listPrice.amount) || 0,
                            },
                            offering_id: nftIndex + 1, // !must be modified!!!
                        };
                    });
                    setMarketplaceNfts((prev) => ({
                        ...prev,
                        [contractAddress[index]]: nftList,
                    }));
                });
            });
        });
    }, [collections, runQuery]);

    useEffect(() => {
        fetchMarketplaceNfts();
    }, [fetchMarketplaceNfts]);

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
