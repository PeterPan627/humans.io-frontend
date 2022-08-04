import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";

// Demo Data
const productData = [
    {
        id: 1,
        title: "Preatent",
        slug: "preatent",
        published_at: "20-JUN-2021 08:03:00",
        latestBid: "6/30",
        price: {
            amount: 0.244,
            currency: "wETH",
        },
        likeCount: 322,
        categories: ["music", "video"],
        images: [
            {
                src: "/images/portfolio/lg/portfolio-01.jpg",
            },
            {
                src: "/images/portfolio/lg/portfolio-02.jpg",
            },
            {
                src: "/images/portfolio/lg/portfolio-03.jpg",
            },
        ],
        auction_date: "2024-10-08",
        authors: [
            {
                name: "Mark Jordan",
                slug: "/author",
                image: {
                    src: "/images/client/client-2.png",
                },
            },
            {
                name: "Farik Shaikh",
                slug: "/author",
                image: {
                    src: "/images/client/client-3.png",
                },
            },
            {
                name: "John Doe",
                slug: "/author",
                image: {
                    src: "/images/client/client-5.png",
                },
            },
        ],
        bitCount: 15,
        owner: {
            name: "Brodband",
            slug: "/author",
            image: {
                src: "/images/client/client-1.png",
            },
        },
        collection: {
            name: "Art Decco",
            slug: "/collection",
            image: {
                src: "/images/client/client-2.png",
            },
            total_sale: "2500,000",
        },
        bids: [
            {
                id: 1,
                user: {
                    name: "Allen Waltker",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-3.png",
                    },
                },
                amount: "0.234wETH",
                bidAt: "1 hours ago",
            },
            {
                id: 2,
                user: {
                    name: "Joe Biden",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-4.png",
                    },
                },
                amount: "0.09wETH",
                bidAt: "1.30 hours ago",
            },
            {
                id: 3,
                user: {
                    name: "Sonial Mridha",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-5.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.35 hours ago",
            },
            {
                id: 4,
                user: {
                    name: "Tribute Dhusra",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-6.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.55 hours ago",
            },
            {
                id: 5,
                user: {
                    name: "Sonia Sobnom",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-7.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2 hours ago",
            },
            {
                id: 6,
                user: {
                    name: "Sadia Rummon",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-8.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2.5 hours ago",
            },
        ],
        properties: [
            {
                id: 1,
                type: "HYPE TYPE",
                value: "CALM AF (STILL)",
            },
            {
                id: 2,
                type: "BASTARDNESS",
                value: "C00LIO BASTARD",
            },
            {
                id: 3,
                type: "TYPE",
                value: "APE",
            },
            {
                id: 4,
                type: "ASTARDNESS",
                value: "BASTARD",
            },
            {
                id: 5,
                type: "BAD HABIT(S)",
                value: "PIPE",
            },
            {
                id: 6,
                type: "BID",
                value: "BPEYti",
            },
            {
                id: 7,
                type: "ASTRAGENAKAR",
                value: "BASTARD",
            },
            {
                id: 8,
                type: "CITY",
                value: "TOKYO",
            },
        ],
        tags: [
            {
                id: 1,
                type: "ZARY",
                value: "APP",
            },
            {
                id: 2,
                type: "SOMALIAN",
                value: "TRIBUTE",
            },
            {
                id: 3,
                type: "TUNA",
                value: "PIPE",
            },
            {
                id: 4,
                type: "BID",
                value: "BPEYti",
            },
            {
                id: 5,
                type: "ASTRAGENAKAR",
                value: "BASTARD",
            },
            {
                id: 8,
                type: "CITY",
                value: "TOKYO",
            },
        ],
        history: [
            {
                id: 1,
                user: {
                    name: "Allen Waltker",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-3.png",
                    },
                },
                amount: "0.234wETH",
                bidAt: "1 hours ago",
            },
            {
                id: 2,
                user: {
                    name: "Joe Biden",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-4.png",
                    },
                },
                amount: "0.09wETH",
                bidAt: "1.30 hours ago",
            },
            {
                id: 3,
                user: {
                    name: "Sonial Mridha",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-5.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.35 hours ago",
            },
            {
                id: 4,
                user: {
                    name: "Tribute Dhusra",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-6.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.55 hours ago",
            },
            {
                id: 5,
                user: {
                    name: "Sonia Sobnom",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-7.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2 hours ago",
            },
        ],
        highest_bid: {
            amount: "0.234wETH",
            bidder: {
                name: "Brodband",
                slug: "/author",
                image: {
                    src: "/images/client/client-1.png",
                },
            },
        },
        sale_type: "fixed-price",
        level: "Intermediate",
        language: "English",
        rating: 5,
    },
    {
        id: 2,
        title: "#21 The Wonder",
        slug: "21-the-wonder",
        published_at: "21-JUN-2021 08:03:00",
        latestBid: "1/20",
        price: {
            amount: 0.244,
            currency: "wETH",
        },
        likeCount: 322,
        categories: ["art", "video"],
        images: [
            {
                src: "/images/portfolio/lg/1.jpg",
            },
            {
                src: "/images/portfolio/lg/2.jpg",
            },
            {
                src: "/images/portfolio/lg/3.jpg",
            },
        ],
        auction_date: "2023-11-08",
        authors: [
            {
                name: "Farik Shaikh",
                slug: "/author",
                image: {
                    src: "/images/client/client-1.png",
                },
            },
            {
                name: "Olive Yew",
                slug: "/author",
                image: {
                    src: "/images/client/client-6.png",
                },
            },
            {
                name: "Rita Book",
                slug: "/author",
                image: {
                    src: "/images/client/client-8.png",
                },
            },
        ],
        bitCount: 13,
        owner: {
            name: "Brodband",
            slug: "/author",
            image: {
                src: "/images/client/client-1.png",
            },
        },
        collection: {
            name: "Art Decco",
            slug: "/collection",
            image: {
                src: "/images/client/client-2.png",
            },
            total_sale: "2500,000",
        },
        bids: [
            {
                id: 1,
                user: {
                    name: "Allen Waltker",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-3.png",
                    },
                },
                amount: "0.234wETH",
                bidAt: "1 hours ago",
            },
            {
                id: 2,
                user: {
                    name: "Joe Biden",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-4.png",
                    },
                },
                amount: "0.09wETH",
                bidAt: "1.30 hours ago",
            },
            {
                id: 3,
                user: {
                    name: "Sonial Mridha",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-5.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.35 hours ago",
            },
            {
                id: 4,
                user: {
                    name: "Tribute Dhusra",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-6.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.55 hours ago",
            },
            {
                id: 5,
                user: {
                    name: "Sonia Sobnom",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-7.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2 hours ago",
            },
            {
                id: 6,
                user: {
                    name: "Sadia Rummon",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-8.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2.5 hours ago",
            },
        ],
        properties: [
            {
                id: 1,
                type: "HYPE TYPE",
                value: "CALM AF (STILL)",
            },
            {
                id: 2,
                type: "BASTARDNESS",
                value: "C00LIO BASTARD",
            },
            {
                id: 3,
                type: "TYPE",
                value: "APE",
            },
            {
                id: 4,
                type: "ASTARDNESS",
                value: "BASTARD",
            },
            {
                id: 5,
                type: "BAD HABIT(S)",
                value: "PIPE",
            },
            {
                id: 6,
                type: "BID",
                value: "BPEYti",
            },
            {
                id: 7,
                type: "ASTRAGENAKAR",
                value: "BASTARD",
            },
            {
                id: 8,
                type: "CITY",
                value: "TOKYO",
            },
        ],
        tags: [
            {
                id: 1,
                type: "ZARY",
                value: "APP",
            },
            {
                id: 2,
                type: "SOMALIAN",
                value: "TRIBUTE",
            },
            {
                id: 3,
                type: "TUNA",
                value: "PIPE",
            },
            {
                id: 4,
                type: "BID",
                value: "BPEYti",
            },
            {
                id: 5,
                type: "ASTRAGENAKAR",
                value: "BASTARD",
            },
            {
                id: 8,
                type: "CITY",
                value: "TOKYO",
            },
        ],
        history: [
            {
                id: 1,
                user: {
                    name: "Allen Waltker",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-3.png",
                    },
                },
                amount: "0.234wETH",
                bidAt: "1 hours ago",
            },
            {
                id: 2,
                user: {
                    name: "Joe Biden",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-4.png",
                    },
                },
                amount: "0.09wETH",
                bidAt: "1.30 hours ago",
            },
            {
                id: 3,
                user: {
                    name: "Sonial Mridha",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-5.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.35 hours ago",
            },
            {
                id: 4,
                user: {
                    name: "Tribute Dhusra",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-6.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "1.55 hours ago",
            },
            {
                id: 5,
                user: {
                    name: "Sonia Sobnom",
                    slug: "/author",
                    image: {
                        src: "/images/client/client-7.png",
                    },
                },
                amount: "0.07wETH",
                bidAt: "2 hours ago",
            },
        ],
        highest_bid: {
            amount: "0.234wETH",
            bidder: {
                name: "Brodband",
                slug: "/author",
                image: {
                    src: "/images/client/client-1.png",
                },
            },
        },
        sale_type: "timed-auction",
        level: "Beginner",
        language: "Arabic",
        rating: 4,
    },
];

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => (
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

export default Product;
