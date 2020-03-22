import fetch from "node-fetch";
import Stats from "../components/Stats";
import SEO from "../components/common/SEO";

const Home = ({ stats, country }) => (
  <>
    <SEO />
    <Stats stats={stats} country={country} />
  </>
);

export const getStaticPaths = async () => {
  const res = await fetch("https://covid19.mathdro.id/api/countries");
  const data = await res.json();

  const paths = Object.entries(data.countries).map(item => ({
    params: {
      country: item[1]
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { country } }) => {
  const res = await fetch(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  const data = await res.json();

  return {
    revalidate: 8,
    props: {
      stats: data,
      country
    }
  };
};

export default Home;
