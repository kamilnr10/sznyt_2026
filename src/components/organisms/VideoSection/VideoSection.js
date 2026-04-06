import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import SznytLetterVideo from "./SznytLetterVideo";

const VideoSectionContainer = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  min-height: 280px;
  overflow: hidden;
  margin-top: auto;
  background: #000;

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

const Stage = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  min-height: inherit;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const PlaceholderInner = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderTitle = styled.h1`
  margin: 0;
  font-family: "Six Caps", Impact, sans-serif;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  color: #fff;
  font-size: clamp(3rem, 16vw, 10rem);
  @media (max-width: 380px) {
    font-size: clamp(2.5rem, 14vw, 6.5rem);
  }
  @media (min-width: 480px) {
    font-size: clamp(3.5rem, 18vw, 9rem);
  }
  @media (min-width: 768px) {
    font-size: clamp(4.25rem, 14vw, 11rem);
  }
  @media (min-width: 1024px) {
    font-size: clamp(5rem, 12vw, 12rem);
  }
`;

const VideoSection = ({ video }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") {
      return undefined;
    }
    const ro = new ResizeObserver(() => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [video]);

  if (!video || !video.trim()) {
    return (
      <VideoSectionContainer height={320}>
        <Stage height={320} ref={ref}>
          <PlaceholderInner>
            <PlaceholderTitle>SZNYT</PlaceholderTitle>
          </PlaceholderInner>
        </Stage>
      </VideoSectionContainer>
    );
  }

  return (
    <VideoSectionContainer height={height}>
      <Stage height={height || undefined} ref={ref}>
        <SznytLetterVideo
          src={`${video}#t=0.001`}
          muted
          loop
          playsInline
          controls
          preload="auto"
          onClick={(e) => e.target.play()}
          aria-label="Film z salonu SZNYT Barbershop"
        />
      </Stage>
    </VideoSectionContainer>
  );
};

export default VideoSection;
