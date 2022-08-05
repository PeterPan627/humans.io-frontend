import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import { useWalletManager } from "@noahsaso/cosmodal";
import Anchor from "@ui/anchor";
import CountdownTimer from "@ui/countdown/layout-01";
// import ClientAvatar from "@ui/client-avatar";
// import ShareDropdown from "@components/share-dropdown";
// import ProductBid from "@components/product-bid";
import PurchaseModal from "@components/modals/purchase-modal";
import Button from "@ui/button";
// import { ImageType } from "@utils/types";
import { NftType } from "@utils/types";
import { ChainConfig } from "@constant";
import { useContract } from "@hooks";
import { CustomWalletContext } from "@context";

const NftItem = ({ overlay, auction_date, item }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const { sellNft, withdrawNft, buyNft } = useContract();
    // const { connectedWallet } = useWalletManager();
    const { connectedWallet } = useContext(CustomWalletContext);

    const nftInfo = useMemo(() => {
        const { price } = item;
        const image = item.image_url;
        let buttonString = "Sell";
        if (price) {
            buttonString =
                connectedWallet?.address === item.seller ? "Withdraw" : "Buy";
        }
        return { price, buttonString, image };
    }, [connectedWallet, item]);

    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    const handleNft = async (amount) => {
        if (!nftInfo.price) {
            try {
                await sellNft(item, amount);
                setShowBidModal(false);
                // eslint-disable-next-line no-empty
            } catch (e) {}
        } else if (item.seller === connectedWallet.address) {
            try {
                await withdrawNft(item);
                setShowBidModal(false);
                // eslint-disable-next-line no-empty
            } catch (e) {}
        } else {
            try {
                await buyNft(item);
                setShowBidModal(false);
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    };

    return (
        <>
            <div
                className={clsx(
                    "product-style-one with-placeBid",
                    !overlay && "no-overlay"
                )}
            >
                <div className="card-thumbnail">
                    {nftInfo.image && (
                        <Anchor path={`/product/${item.tokenId}`}>
                            <Image
                                src={nftInfo.image}
                                alt=""
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {auction_date && <CountdownTimer date={auction_date} />}
                    <Button onClick={handleBidModal} size="small">
                        {nftInfo.buttonString}
                    </Button>
                </div>
                {/* <div className="product-share-wrapper">
                    <div className="profile-share">
                        {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))}
                        <Anchor
                            className="more-author-text"
                            path={`/product/${slug}`}
                        >
                            {bitCount}+ Place Bit.
                        </Anchor>
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div> */}
                <Anchor path={`/product/${item.tokenId}`}>
                    <span className="product-name">{item.token_id}</span>
                </Anchor>
                <div className="latest-bid">{item.collection}</div>
                {item.seller && (
                    <div
                        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                        title={item.seller}
                        className="latest-bid"
                    >
                        {item.seller}
                    </div>
                )}
                {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
                {nftInfo.price && (
                    <div className="bid-react-area">
                        <div className="last-bid">
                            {nftInfo.price.amount / 1e6} {nftInfo.price.denom}
                        </div>
                    </div>
                )}
                {/* <ProductBid price={price} likeCount={likeCount} /> */}
            </div>
            <PurchaseModal
                show={showBidModal}
                handleModal={handleBidModal}
                generalOptions={{
                    title: `${nftInfo.buttonString} NFT`,
                    buttonString: nftInfo.buttonString,
                }}
                amountOptions={{
                    denom: nftInfo.price?.denom || ChainConfig.microDenom,
                    defaultAmount: nftInfo.price
                        ? nftInfo.price.amount / 1e6
                        : undefined,
                    disabled: !!nftInfo.price,
                }}
                handleClickConfirm={handleNft}
            />
        </>
    );
};

NftItem.propTypes = {
    overlay: PropTypes.bool,
    auction_date: PropTypes.string,
    item: PropTypes.objectOf(NftType).isRequired,
};

NftItem.defaultProps = {
    overlay: false,
};

export default NftItem;
