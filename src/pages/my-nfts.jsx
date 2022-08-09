import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWalletManager } from "@noahsaso/cosmodal";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";
import { useContract } from "@hooks";
import { useAppSelector } from "@app/hooks";
// import { CustomWalletContext } from "@context";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const MyNfts = () => {
    const [myNfts, setMyNfts] = useState({});
    const { runQuery } = useContract();
    const { connectedWallet } = useWalletManager();
    // const { connectedWallet } = useContext(CustomWalletContext);
    const router = useRouter();
    const collections = useAppSelector((state) => state.collections);
    const marketplaceNfts = useAppSelector((state) => state.marketplaceNfts);

    useEffect(() => {
        if (!connectedWallet) {
            router.push("/");
        }
    }, [connectedWallet, router]);
    useEffect(() => {
        if (!connectedWallet) return;
        Object.keys(collections).forEach(async (key) => {
            const collection = collections[key];
            const queryResult = await runQuery(key, {
                tokens: {
                    owner: connectedWallet.address,
                    start_after: undefined,
                    limit: 100,
                },
            });
            const nftList =
                queryResult.tokens.map((item) => {
                    const tokenIdNumber = item.split(".").pop();
                    const newItem = {
                        token_address: key,
                        token_id: item,
                        collection: collection.collection_info.title || "",
                        image_url: `${collection.mint_info?.base_image_uri}${tokenIdNumber}.png`,
                        token_url: `${collection.mint_info?.base_token_uri}${tokenIdNumber}.png`,
                    };
                    return newItem;
                }) || [];
            marketplaceNfts[key]?.forEach((item) => {
                if (item.seller === connectedWallet.address) {
                    nftList.push(item);
                }
            });
            setMyNfts((prev) => ({
                ...prev,
                [key]: nftList,
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collections, connectedWallet]);

    const productData = useMemo(() => {
        let result = [];
        Object.keys(myNfts).forEach((key) => {
            const nfts = myNfts[key];
            result = result.concat(
                nfts.map((nft) => ({
                    id: nft.token_id,
                    nft,
                }))
            );
        });
        return result;
    }, [myNfts]);
    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="My NFTs" currentPage="My NFTs" />
                <ProductArea data={{ products: productData }} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default MyNfts;
