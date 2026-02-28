import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";

const VideoSectionContainer = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  min-height: 280px;
  overflow: hidden;
  margin-top: auto;

  @media (min-width: 480px) {
    min-height: 320px;
  }

  @media (min-width: 768px) {
    min-height: 400px;
  }

  @media (min-width: 1024px) {
    min-height: 480px;
  }

  @media (min-width: 1200px) {
    grid-area: VideoSection;
    min-height: 520px;
  }

  @media (min-width: 1500px) {
    min-height: 560px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  min-height: inherit;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    will-change: transform;
    overflow-clip-margin: content-box;
    overflow: clip;
  }

  h1 {
    font-size: clamp(8rem, 45vw, 28rem);
    font-family: "Six Caps", sans-serif;
    position: absolute;
    inset: 0;
    margin: 0;
    mix-blend-mode: multiply;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
    line-height: 1;
    pointer-events: none;

    @media (max-width: 380px) {
      font-size: clamp(6rem, 40vw, 10rem);
    }

    @media (min-width: 480px) {
      font-size: clamp(10rem, 42vw, 22rem);
    }

    @media (min-width: 768px) {
      font-size: clamp(14rem, 38vw, 26rem);
    }

    @media (min-width: 1024px) {
      font-size: clamp(18rem, 35vw, 28rem);
    }

    @media (min-width: 1200px) {
      font-size: ${({ height }) => (height ? `min(${height + 30}px, 32rem)` : "28rem")};
    }

    @media (min-width: 1500px) {
      font-size: ${({ height }) => (height ? `min(${height + 40}px, 36rem)` : "32rem")};
    }
  }
`;

const VideoText = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const VideoSection = ({ video }) => {
  const ref = useRef(null);
  const videoRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleVideoPlay = () => {
    videoRef.current?.play();
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (!video || !video.trim()) {
    return (
      <VideoSectionContainer height={320}>
        <VideoContainer height={320} as="div">
          <div style={{ position: "absolute", inset: 0, background: "#111" }} />
          <VideoText as="div">
            <h1>SZNYT</h1>
          </VideoText>
        </VideoContainer>
      </VideoSectionContainer>
    );
  }

  return (
    <VideoSectionContainer width={width} height={height}>
      <VideoContainer width={width} height={height} onClick={handleVideoPlay}>
        {/* <img src={team} alt="team" /> */}
        <video
          ref={videoRef}
          type="video/mp4"
          src={`${video}#t=0.001`}
          controls
          // autobuffer
          autoPlay
          loop
          muted
          // defaultmuted
          playsInline
          // oncontextmenu="return false;"
          preload="auto"
          // poster=""
          width={width}
          height={height}
          onClick={(e) => e.target.play()}
        ></video>
        <VideoText ref={ref}>
          <h1
            width={width}
            height={height}
            // style={{
            //   fontSize: `${height}px`,
            // }}
          >
            SZNYT
          </h1>
        </VideoText>
      </VideoContainer>
    </VideoSectionContainer>
  );
};

export default VideoSection;
