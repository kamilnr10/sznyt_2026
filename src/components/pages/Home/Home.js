import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OurStory from "../../organisms/OurStory/OurStory";
// import VideoSection from "../../organisms/VideoSection/VideoSection";
import HomeHero from "./HomeHero";

const HomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://graphql.datocms.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer 2aa56d799dab452e317773613cc9ed`,
          },
          body: JSON.stringify({
            query:
              "{ ourstory { id header secondSentence description video { id url } } }",
          }),
        });

        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.errors?.[0]?.message || "Błąd zapytania");
        }
        console.log(json.data);
        setData(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ourstory = data?.ourstory;
  const header = ourstory?.header ?? "";
  const secondSentence = ourstory?.second_sentence ?? ourstory?.secondSentence ?? "";
  // const videoUrl = ourstory?.video?.url ?? ""; // przy odkomentowaniu VideoSection

  return (
    <HomeWrapper>
      <HomeHero />
      {!loading && (
        <OurStory header={header} secondSentence={secondSentence} loading={false} />
      )}
      {error && (
        <div
          style={{
            padding: "2rem 1rem",
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            width: "100%",
            maxWidth: "560px",
          }}
        >
          Nie udało się załadować treści. Pozostałe sekcje są dostępne.
        </div>
      )}
      {/* Sekcja z napisem SZNYT na samym dole strony – tymczasowo wyłączona */}
      {/* <VideoSection video={videoUrl} loading={false} /> */}
    </HomeWrapper>
  );
};

export default Home;
