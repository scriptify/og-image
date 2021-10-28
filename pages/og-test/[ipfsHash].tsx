import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Seo from "../../components/Seo";

export const getServerSideProps: GetServerSideProps<
  { ipfsHash: string },
  { ipfsHash: string }
> = async ({ params }) => {
  return {
    props: {
      ipfsHash: params?.ipfsHash ?? "",
    },
  };
};

export default function OgTestPage({
  ipfsHash,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ogImageUrl = `http://ogster.vercel.app/api/${ipfsHash}.png`;

  return (
    <>
      <Seo
        title={ipfsHash}
        description={`OG Image Test page for ${ipfsHash}.`}
        ogImage={ogImageUrl}
      />
      <main>
        <h1>OG Test Page for</h1>
        <h2>{ipfsHash}</h2>
        <img src={ogImageUrl} />
      </main>
    </>
  );
}
