import { useCallback, useContext, useEffect } from "react";

import { useRefresh, useContract } from "@hooks";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setCollectionInfo } from "@app/collectionsSlice";
import { ChainConfig, MarketplaceContract } from "@constant";
import { setMarketplaceNfts } from "@app/marketplaceNftsSlice";
import { CustomWalletContext } from "@context";
import { setBalance } from "@app/balanceSlice";

// Demo Data
const NFT_ADDRESSES = [
    "human1466nf3zuxpya8q9emxukd7vftaf6h4psr0a07srl5zw74zh84yjqtnljx7",
    // "human1sr06m8yqg0wzqqyqvzvp5t07dj4nevx9u8qc7j4qa72qu8e3ct8qsjjkp3",
];

const MAX_ITEMS = 50;

const Updater = () => {
    const { normal } = useRefresh();
    const { runQuery } = useContract();
    const { connectedWallet, signingClient } = useContext(CustomWalletContext);
    const dispatch = useAppDispatch();
    const collections = useAppSelector((state) => state.collections);

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
                            page_count: MAX_ITEMS,
                            address: key,
                        },
                    })
                );
                contractAddress.push(key);
            }
            await Promise.all(queries).then((queryResults) => {
                queryResults.forEach((queryResult, index) => {
                    const nftList = queryResult.map((item) => {
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
                            offering_id: item.id,
                        };
                    });
                    dispatch(
                        setMarketplaceNfts([contractAddress[index], nftList])
                    );
                });
            });
        });
    }, [collections, dispatch, runQuery]);

    const fetchCollectionInfo = useCallback(async () => {
        NFT_ADDRESSES.forEach(async (nftAddress) => {
            const collectionInfo = await runQuery(nftAddress, {
                get_collection_state: {},
            });
            dispatch(
                setCollectionInfo([
                    nftAddress,
                    { ...collectionInfo, nftAddress },
                ])
            );
        });
    }, [dispatch, runQuery]);

    const fetchBalance = useCallback(async () => {
        if (!signingClient) return;
        const balance = await signingClient.getBalance(
            connectedWallet.address,
            ChainConfig.microDenom
        );
        dispatch(
            setBalance({
                denom: balance.denom,
                amount: Number.isNaN(balance.amount)
                    ? 0
                    : Number(balance.amount) / 1e6,
            })
        );
    }, [connectedWallet, dispatch, signingClient]);

    useEffect(() => {
        fetchMarketplaceNfts();
        fetchCollectionInfo();
        fetchBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [normal]);

    return null;
};

export default Updater;
