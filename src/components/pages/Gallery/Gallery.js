import React, { useState, useCallback, useEffect, useMemo } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import styled from "styled-components";
import { Header } from "../../atoms/HeaderText/HeaderText";
import {
  DATOCMS_GRAPHQL_ENDPOINT,
  getDatocmsHeaders,
} from "../../../config/datocms";
import { datoFileDataProps } from "../../../helpers/cmsGalleryImageData";

const SectionContainer = styled.section`
  padding: 0 5%;
  margin: 80px auto 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1200px) {
    padding: 0 10%;
  }

  div {
    margin: 0 auto;
  }
  h1 {
    font-size: 94px;
  }
`;

export const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
];

const Works = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const workPhotos = useMemo(() => {
    const works = data?.data?.allWorks;
    if (!works?.length) return [];
    return works.map((work, index) => {
      const src = work.src || work.image?.url;
      return {
        src,
        width: work.width,
        height: work.height,
        alt: work.image?.alt || work.image?.title || "",
        key: work.id,
        ...datoFileDataProps(work.image, {
          "data-cms-context": "works-photo-gallery",
          "data-cms-work-record-id": work.id,
          "data-gallery-index": String(index),
        }),
      };
    });
  }, [data]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(DATOCMS_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: getDatocmsHeaders(),
        body: JSON.stringify({
          query:
            "{ allWorks { id image { id url basename title alt } src width height } }",
        }),
      });

      const myData = await response.json();

      setData(myData);
      setLoading(false);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionContainer>
      <Header>Gallery</Header>
      <Gallery photos={workPhotos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={data.data.allWorks.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </SectionContainer>
  );
};

export default Works;
