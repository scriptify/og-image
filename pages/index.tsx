import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ogster - Create OG Images on the fly</title>
        <meta name="description" content="This will be a cool SaaS one day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Ogster</a>
        </h1>

        <p className={styles.description}>...where OG Images come true.</p>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by Mäx
        </a>
      </footer>
    </div>
  );
};

export default Home;
