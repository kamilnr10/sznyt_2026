import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Carousel, { Modal, ModalGateway } from "react-images";
import Loading from "../../organisms/Loading/Loading";
import {
  DATOCMS_GRAPHQL_ENDPOINT,
  getDatocmsHeaders,
} from "../../../config/datocms";
import { datoFileDataProps } from "../../../helpers/cmsGalleryImageData";

const OurWorksContainer = styled.div`
  width: 80vw;
  margin: 80px 0 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  h1 {
    text-align: center;
    margin: 0 0 40px 0;
  }

  div:first-child {
    /* margin: 20px 0 0 0; */
  }

  img {
    border-radius: 20px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    /* width: 100%;
    height: 100%;
    object-fit: cover; */
  }
`;

//{ allGalleries(filter: {id: {eq: ""}}) { id name preview { id url } gallery { id url } width height } }
const OurWorks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    // console.log(event);
    console.log(index);
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
          query: `{ allGalleries(filter: {id: {eq: ${id}}}) { id name preview { id url basename title alt } gallery { id url basename title alt } } }`,
        }),
      });

      const myData = await response.json();

      setData(myData);
      // console.log(data.data.allGalleries);
      setLoading(false);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <OurWorksContainer>
        <Loading />
      </OurWorksContainer>
    );
  }

  return (
    <OurWorksContainer>
      <h1>{data.data.allGalleries[0].name}</h1>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        style={{ width: "100%" }}
      >
        <Masonry gutter="5px">
          {data.data.allGalleries[0].gallery.map((image, i) => (
            <img
              key={image.id}
              src={image.url}
              style={{ width: "100%", display: "block" }}
              alt={
                image.alt ||
                image.title ||
                `${data.data.allGalleries[0].name} — zdjęcie ${i + 1}`
              }
              {...datoFileDataProps(image, {
                "data-cms-context": "gallery-detail-grid",
                "data-cms-gallery-record-id": data.data.allGalleries[0].id,
                "data-gallery-index": String(i),
              })}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </OurWorksContainer>
  );
};

export default OurWorks;
