import { useCallback } from "react";
import { useWallet } from "@noahsaso/cosmodal";
import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";
import { ChainConfig } from "@constant";
import { toMicroAmount } from "@utils/coins";

const getQueryClient = async (config) => {
    const { rpcEndpoint } = config;
    const client = await CosmWasmClient.connect(rpcEndpoint);
    return client;
};

function useContract() {
    const { offlineSigner, signingCosmWasmClient, address } = useWallet(
        ChainConfig.chainId
    );

    const runQuery = useCallback(
        async (contractAddress, queryMsg) => {
            if (signingCosmWasmClient) {
                const result = await signingCosmWasmClient.queryContractSmart(
                    contractAddress,
                    queryMsg
                );
                return result;
            }
            const client = await getQueryClient(ChainConfig);
            const result = await client.queryContractSmart(
                contractAddress,
                queryMsg
            );
            return result;
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
                    gassPrice: GasPrice.fromString(
                        `${ChainConfig.gasPrice}${ChainConfig.microDenom}`
                    ),
                }
            );
            const coinAmount = executeFunds
                ? toMicroAmount(executeFunds, ChainConfig.coinDecimals)
                : undefined;
            return cwClient.execute(
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
    return {
        runQuery,
        runExecute,
    };
}

export default useContract;
