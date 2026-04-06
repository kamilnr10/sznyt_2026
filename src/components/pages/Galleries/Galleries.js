import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../organisms/Loading/Loading";
import {
  DATOCMS_GRAPHQL_ENDPOINT,
  getDatocmsHeaders,
} from "../../../config/datocms";
import { datoFileDataProps } from "../../../helpers/cmsGalleryImageData";

const GalleriesSection = styled.section`
  position: absolute;
  width: 98vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0 0;
  overflow-x: hidden;

  h2 {
    text-align: center;
  }
`;

const ImgContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 5px 0 25px;
  transition: border 0.3s ease-in-out, border-radius 0.3s ease-in-out;

  &:focus,
  &:hover {
    border: 5px solid #b700ffa4; /* Change border style on hover */
    border-radius: 50%; /* Create a circle effect on hover */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const GalleryContainer = styled.div`
  margin: 20px 0 0 0;

  h2 {
    margin: 20px 0 0 0;
  }
`;

// { allGalleries { id name preview { id url } gallery { id url } width height } }
const Galleries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(DATOCMS_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: getDatocmsHeaders(),
        body: JSON.stringify({
          query:
            "{ allGalleries { id name preview { id url basename title alt } gallery { id url basename title alt } priority } }",
        }),
      });

      let myData = await response.json();
      if (myData && myData.data?.allGalleries) {
        // Sort the data by priority before setting it to the state
        myData.data.allGalleries.sort((a, b) => a.priority - b.priority);
      }
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
    return (
      <GalleriesSection>
        <Loading />
      </GalleriesSection>
    );
  }

  return (
    <GalleriesSection>
      <h1>GALERIA</h1>
      {data.data.allGalleries.map((item) => (
        <GalleryContainer key={item.id}>
          <h2>{item.name}</h2>
          <Link to={`/gallery/${item.id}`}>
            <ImgContainer>
              <img
                src={item.preview.url}
                alt={item.preview.alt || item.name || "Podgląd galerii"}
                {...datoFileDataProps(item.preview, {
                  "data-cms-context": "galleries-list-preview",
                  "data-cms-gallery-record-id": item.id,
                })}
              />
            </ImgContainer>
          </Link>
        </GalleryContainer>
      ))}
    </GalleriesSection>
  );
};

export default Galleries;
