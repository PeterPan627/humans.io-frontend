import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => (
    <Wrapper>
        <SEO pageTitle="Home Default" />
        <Header />
        <main id="main-content">Welcome Here</main>
        <Footer />
    </Wrapper>
);

export default Home;
