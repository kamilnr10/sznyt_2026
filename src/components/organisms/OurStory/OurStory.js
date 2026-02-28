import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  max-width: 100%;
  padding: 3rem 1.5rem 4rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  margin: 0 auto;

  @media (min-width: 480px) {
    padding: 3.5rem 2rem 4.5rem;
  }

  @media (min-width: 768px) {
    padding: 4rem 2.5rem 5rem;
    max-width: 720px;
  }

  @media (min-width: 810px) {
    margin: 80px auto 0;
    padding: 3rem 2.5rem 4rem;
  }

  @media (min-width: 1200px) {
    max-width: 800px;
    padding: 4rem 3rem 5rem;
  }
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: left;
  margin: 0 auto;
`;

/** Nagłówek z CMS (pole header) – h1 pod SEO */
const Heading = styled.h1`
  font-family: "Pirata One", cursive;
  font-size: clamp(1.5rem, 4.5vw, 2.25rem);
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 1.5rem;
  line-height: 1.3;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 1.75rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Text = styled.p`
  font-family: "Ubuntu Mono", monospace;
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 auto 0 0;
  max-width: 65ch;
  text-align: left;
`;

const OurStory = ({ header, secondSentence, loading }) => {
  if (loading) {
    return (
      <Section aria-busy="true" aria-labelledby="o-nas-heading">
        <SectionContent>
          <Heading id="o-nas-heading">O nas</Heading>
          <Text>Ładowanie…</Text>
        </SectionContent>
      </Section>
    );
  }

  const hasHeader = header && String(header).trim();
  const hasText = secondSentence && String(secondSentence).trim();

  return (
    <Section aria-labelledby="o-nas-heading">
      <SectionContent>
        <Heading id="o-nas-heading">
          {hasHeader ? header : "O nas"}
        </Heading>
        {hasText && <Text>{secondSentence}</Text>}
      </SectionContent>
    </Section>
  );
};

export default OurStory;
