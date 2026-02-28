import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Header } from "../../atoms/HeaderText/HeaderText";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Loading from "../../organisms/Loading/Loading";

const TeamSection = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0 0 0;

  @media (min-width: 1500px) {
    position: absolute;
  }
`;

const TeamContainer = styled.div`
  width: 100%;
  height: 100%;
  /* font-size: 100px; */
  /* display: flex;

  justify-content: center;
  align-items: center; */

  @media (min-width: 1200px) {
    /* height: 100vh; */
    margin: 80px 0 0;
  }

  div {
    /* border-radius: 10%; */
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    border-radius: 10% 10% 10% 10%;

    @media (min-width: 1200px) {
      width: 350px;
    }

    @media (min-width: 1600px) {
      width: 400px;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    /* height: 100%; */
    border-radius: 10%;

    @media (min-width: 100%) {
      height: 100%;
    }
  }
`;

const MemberContainer = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
  border-radius: 10%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    width: 350px;
    height: 600px;
  }

  @media (min-width: 1600px) {
    width: 400px;
    height: 750px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 100px;
    display: flex;
    justify-content: center;
    padding: 5px;

    &:last-of-type {
      justify-content: end;
    }
    a {
      margin: 0 auto;
      text-align: right;
      width: 30px;
      height: 30px;
    }
  }
`;

const Team = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
           Authorization: `Bearer 2aa56d799dab452e317773613cc9ed`,
        },
        body: JSON.stringify({
          query:
            "{ allTeams { id name job description instagram image {id url} booksy } }",
        }),
      });

      const myData = await response.json();

      setData(myData.data.allTeams.reverse());
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
    return <Loading />;
  }

  return (
    <TeamSection>
      <h1>Zespół</h1>
      <TeamContainer>
        <Swiper
          effect={"coverflow"}
          // grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {data.map((member) => (
            <SwiperSlide key={member.id}>
              <MemberContainer>
                <a href={member.booksy} target="_blank">
                  <img src={member.image.url} />
                </a>
                <InfoContainer>
                  <div>
                    <p style={{ fontWeight: "900", fontSize: "20px" }}>
                      {member.name}
                    </p>
                  </div>
                  <div>
                    <p>{member.job}</p>
                  </div>
                  <div>
                    <a href={member.instagram} target="_blank">
                      <FontAwesomeIcon
                        style={{ fontSize: "28px" }}
                        icon={faInstagram}
                      />
                    </a>
                  </div>
                </InfoContainer>
              </MemberContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </TeamContainer>
    </TeamSection>
  );
};

export default Team;
