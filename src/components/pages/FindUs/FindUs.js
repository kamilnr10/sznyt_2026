import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import styled from "styled-components";
import { Header } from "../../atoms/HeaderText/HeaderText";
import Loading from "../../organisms/Loading/Loading";

const StyledAddress = styled.h3`
  color: black;
  font-size: 18px;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px auto 0;

  @media (min-width: 365px) {
    height: 80vh;
  }

  .map-container {
    height: 50%;
    width: 80%;

    @media (min-width: 810px) {
      height: 65%;
      width: 65%;
    }

    @media (min-width: 1200px) {
      height: 60%;
      width: 70%;
    }

    @media (min-width: 1600px) {
      height: 50%;
      width: 60%;
    }
  }
`;
const InfoContainer = styled.div`
  width: 90%;
  height: 20%;
  margin: 0 auto;

  p:first-of-type {
    text-align: center;
    font-size: 14px;

    @media (min-width: 810px) {
      font-size: 18px;
    }

    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }

  .blueTable {
    margin: 0 auto;

    td {
      width: 33%;
      padding: 5px;
      text-align: right;

      @media (min-width: 1200px) {
        width: 200px;
      }
      /* font-size: 14px; */
    }
  }
`;

const FindUs = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    id: null,
    address: null,
  });
  const markers = [
    {
      address: "Wrzesińska 6",
      lat: 52.249776619955846,
      lng: 21.03523249301535,
    },
  ];

  //   const markers = [
  //     { lat: 18.5204, lng: 73.8567 },
  //     { lat: 18.5314, lng: 73.8446 },
  //     { lat: 18.5642, lng: 73.7769 },
  //   ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    setInfoWindowData({ id: 0, address: markers[0].address });
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    // console.log(infoWindowData);
    setIsOpen(true);
  };
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    minZoom: 6,
    maxZoom: 15,
  };

  return (
    <MapContainer>
      {!isLoaded ? (
        <>
          <Loading />
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <Header>LOKALIZACJA</Header>
          <InfoContainer>
            <table class="blueTable">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <p>Godziny otwarcia</p>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Pon - Pt</p>
                  </td>
                  <td>9:00-13:00</td>
                  <td>13:30-18:00</td>
                </tr>
                <tr>
                  <td>
                    <p>Sobota</p>
                  </td>
                  <td>9:00-15:00</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </InfoContainer>
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
            options={options}
            zoom={15}
          >
            {markers.map(({ address, lat, lng }, ind) => (
              <MarkerF
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(ind, lat, lng, address);
                }}
              >
                {isOpen && (
                  <InfoWindowF
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <StyledAddress>
                      Sznyt, {infoWindowData.address}
                    </StyledAddress>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        </>
      )}
    </MapContainer>
  );
};

export default FindUs;
