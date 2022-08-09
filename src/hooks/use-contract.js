import { useCallback } from "react";
import { toast } from "react-toastify";
import btoa from "btoa";
import { useWallet } from "@noahsaso/cosmodal";
import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";
import { ChainConfig, MarketplaceContract } from "@constant";
import { toMicroAmount } from "@utils/coins";
import { useAppSelector } from "@app/hooks";
// import { CustomWalletContext } from "@context";

const getQueryClient = async (config) => {
    const { rpcEndpoint } = config;
    const client = await CosmWasmClient.connect(rpcEndpoint);
    return client;
};

function useContract() {
    const { offlineSigner, signingCosmWasmClient, address } = useWallet(
        ChainConfig.chainId
    );
    // const { connectedWallet, offlineSigner, signingClient } =
    //     useContext(CustomWalletContext);
    const collections = useAppSelector((state) => state.collections);

    const runQuery = useCallback(
        async (contractAddress, queryMsg) => {
            try {
                if (signingCosmWasmClient) {
                    const result =
                        await signingCosmWasmClient.queryContractSmart(
                            contractAddress,
                            queryMsg
                        );
                    return result;
                }
                const client = await getQueryClient(ChainConfig);
                if (client) {
                    const result = await client.queryContractSmart(
                        contractAddress,
                        queryMsg
                    );
                    return result;
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        [signingCosmWasmClient]
    );

    const runExecute = useCallback(
        async (contractAddress, executeMsg, option) => {
            if (!offlineSigner) {
                throw new Error("No account selected");
            }

            const executeMemo = option?.memo || "";
            const executeFunds = option?.funds || "";
            const executeDenom = option?.denom || "";

            const cwClient = await SigningCosmWasmClient.connectWithSigner(
                ChainConfig.rpcEndpoint,
                offlineSigner,
                {
                    gasPrice: GasPrice.fromString(
                        `${ChainConfig.gasPrice}${ChainConfig.microDenom}`
                    ),
                }
            );
            const coinAmount = executeFunds
                ? toMicroAmount(executeFunds, ChainConfig.coinDecimals)
                : undefined;
            return cwClient.execute(
                // connectedWallet.address,
                address,
                contractAddress,
                executeMsg,
                "auto",
                executeMemo,
                executeFunds
                    ? coins(coinAmount, executeDenom || ChainConfig.microDenom)
                    : undefined
            );
        },
        [address, offlineSigner]
    );

    const sellNft = useCallback(
        async (item, nftPrice) => {
            const targetCollection = collections[item.token_address];
            const regExp = /^(\d+(\.\d+)?)$/;
            const price = +nftPrice;
            if (!targetCollection) {
                toast.error("Collection not found!");
                throw new Error();
            }
            if (!price) {
                toast.error("Please input price!");
                throw new Error();
            }
            if (!(price > 0 && regExp.test(nftPrice))) {
                toast.error("Invalid Price!");
                throw new Error();
            }
            const marketplaceContract = MarketplaceContract;
            const message = {
                send_nft: {
                    contract: marketplaceContract,
                    token_id: item.token_id,
                    msg: btoa(
                        JSON.stringify({
                            list_price: {
                                denom: ChainConfig.microDenom,
                                amount: `${price * 1e6}`,
                            },
                        })
                    ),
                },
            };
            try {
                await runExecute(item.token_address, message);
                toast.success("Success!");
            } catch (err) {
                console.error(err);
                toast.error("Fail!");
            }
        },
        [collections, runExecute]
    );

    const withdrawNft = useCallback(
        async (item) => {
            const message = {
                withdraw_nft: {
                    offering_id: `${item.offering_id}`,
                    address: item.token_address,
                },
            };
            try {
                await runExecute(MarketplaceContract, message);
                toast.success("Success!");
            } catch (err) {
                console.error("withdraw error", item, message, err);
                toast.error("Fail!");
            }
        },
        [runExecute]
    );

    const buyNft = useCallback(
        async (item) => {
            const price = item?.price || {};

            const message = {
                buy: {
                    offering_id: `${item.offering_id}`,
                    address: item.token_address,
                },
            };
            try {
                await runExecute(MarketplaceContract, message, {
                    funds: `${price.amount / 1e6}`,
                    denom: price.denom,
                });
                toast.success("Success!");
            } catch (err) {
                const errMsg = err.message;
                console.error(err, errMsg, typeof errMsg);
                toast.error(`Fail! ${errMsg}`);
            }
        },
        [runExecute]
    );

    return {
        runQuery,
        runExecute,
        sellNft,
        withdrawNft,
        buyNft,
    };
}

export default useContract;
