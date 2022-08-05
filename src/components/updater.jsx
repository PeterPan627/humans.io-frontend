import { useEffect } from "react";

import { useRefresh, useContract } from "@hooks";
import { useAppDispatch } from "@app/hooks";
import { setCollectionInfo } from "@app/collectionsSlice";

// Demo Data
const NFT_ADDRESS =
    "juno1ypns5jwxhqsfzrnulmnp5h2fqwcyyqun0sg694vhheqx4hfgne7q544ams";

const Updater = () => {
    const { normal } = useRefresh();
    const { runQuery } = useContract();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const collectionInfo = await runQuery(NFT_ADDRESS, {
                get_collection_state: {},
            });
            dispatch(
                setCollectionInfo([
                    NFT_ADDRESS,
                    { ...collectionInfo, nftAddress: NFT_ADDRESS },
                ])
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [normal]);

    return null;
};

export default Updater;
