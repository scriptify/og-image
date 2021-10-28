import React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const SEO_TITLE = "Cardano Hipsters | NFTs on Cardano";
const SEO_DESCRIPTION = `The most bearded CNFT collection out there 🧔 Unique NFT hipsters you can share, collect and trade on different marketplaces. There's only 10,000 of them. Grab yours now!`;

const Seo = ({
  title = SEO_TITLE,
  description = SEO_DESCRIPTION,
  ogImage = "https://cardanohipsters.io/og/main.png",
}: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#485b47" />
      <title>{title}</title>
      <meta name="author" content="Cardano Hipsters" />
      <meta name="description" content={SEO_DESCRIPTION} />
      {/* SOCIAL MEDIA META */}
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Cardano Hipsters" />
      <meta property="og:title" content={title} />
      {/* <meta property="og:type" content="Cardano Hipsters" /> */}
      <meta property="og:url" content="https://cardanohipsters.io" />
      {/* TWITTER META */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CardanoHipsters" />
      <meta name="twitter:creator" content="@CardanoHipsters" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <link href="/ico/apple-touch-icon.png" rel="apple-touch-icon" />
      <link href="/ico/favicon.png" rel="shortcut icon" />
      {/* CSS FILES */}
    </Head>
  );
};

export default Seo;
