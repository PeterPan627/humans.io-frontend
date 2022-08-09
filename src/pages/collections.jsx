import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection";
import { useAppSelector } from "@app/hooks";

// demo data
// const collectionsData = [
//     {
//         id: 1,
//         title: "Cubic Trad",
//         slug: "/marketplace",
//         total_item: 27,
//         image: {
//             src: "/images/collection/collection-lg-01.jpg",
//         },
//         thumbnails: [
//             {
//                 src: "/images/collection/collection-sm-01.jpg",
//             },
//             {
//                 src: "/images/collection/collection-sm-02.jpg",
//             },
//             {
//                 src: "/images/collection/collection-sm-03.jpg",
//             },
//         ],
//         profile_image: {
//             src: "/images/client/client-15.png",
//         },
//     },
// ];

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Collection = () => {
    const collections = useAppSelector((state) => state.collections) || [];
    const collectionsData = Object.keys(collections).map((key) => {
        const collection = collections[key];
        const totalItem = Number.isNaN(
            Number(collection.mint_info?.total_supply)
        )
            ? 0
            : Number(collection.mint_info?.total_supply);
        return {
            id: key,
            title: collection.collection_info?.title || "",
            slug: `/marketplace?nftAddress=${key}`,
            total_item: totalItem,
            image: {
                src: collection.collection_info?.background_url || "",
            },
            thumbnails: [
                {
                    src: "/images/collection/collection-sm-01.jpg",
                },
                {
                    src: "/images/collection/collection-sm-02.jpg",
                },
                {
                    src: "/images/collection/collection-sm-03.jpg",
                },
            ],
            profile_image: {
                src: collection.collection_info?.logo_url || "",
            },
        };
    });
    return (
        <Wrapper>
            <SEO pageTitle="Collections" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Our Collections"
                    currentPage="Collections"
                />
                <CollectionArea data={{ collections: collectionsData }} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Collection;
