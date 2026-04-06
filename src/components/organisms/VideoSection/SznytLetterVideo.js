import React, { useId } from "react";
import styled from "styled-components";

/** Współrzędne maski i obrysu (viewBox 0 0 1 1, objectBoundingBox) */
const TEXT_X = 0.5;
const TEXT_Y = 0.56;
const DEFAULT_FONT = 0.34;
const DEFAULT_STROKE = 0.014;

const VideoMaskBox = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  mask: url(#${({ $maskId }) => $maskId});
  -webkit-mask: url(#${({ $maskId }) => $maskId});
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-position: center;
  -webkit-mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
`;

const InnerVideo = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const OutlineSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
`;

const LetterVideoRoot = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
`;

function SznytMaskDefs({ maskId, fontSize }) {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
      aria-hidden
    >
      <defs>
        <style type="text/css">
          {`
            .sznyt-video-mask-text {
              font-family: "Six Caps", Impact, sans-serif;
              font-weight: 400;
            }
          `}
        </style>
        <mask
          id={maskId}
          maskUnits="objectBoundingBox"
          maskContentUnits="objectBoundingBox"
          x="0"
          y="0"
          width="1"
          height="1"
        >
          <rect x="0" y="0" width="1" height="1" fill="black" />
          <text
            className="sznyt-video-mask-text"
            x={TEXT_X}
            y={TEXT_Y}
            dominantBaseline="central"
            textAnchor="middle"
            fill="white"
            fontSize={fontSize}
          >
            SZNYT
          </text>
        </mask>
      </defs>
    </svg>
  );
}

function SznytOutlineOverlay({ fontSize, strokeWidth }) {
  return (
    <OutlineSvg
      viewBox="0 0 1 1"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <text
        x={TEXT_X}
        y={TEXT_Y}
        dominantBaseline="central"
        textAnchor="middle"
        fill="none"
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        fontSize={fontSize}
        style={{ fontFamily: '"Six Caps", Impact, sans-serif', fontWeight: 400 }}
      >
        SZNYT
      </text>
    </OutlineSvg>
  );
}

/**
 * Wideo widoczne tylko w kształcie napisu SZNYT (czarne tło, biały obrys).
 * Wypełnia rodzica z position: relative i zadaną wysokością.
 */
export function SznytLetterVideo({
  src,
  videoRef = undefined,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  preload = "auto",
  autoPlay,
  onClick,
  maskFontSize = DEFAULT_FONT,
  "aria-label": ariaLabel,
}) {
  const reactId = useId();
  const maskId = `sznyt-vid-${reactId.replace(/:/g, "")}`;
  const fontSize = maskFontSize;
  const strokeWidth = DEFAULT_STROKE * (fontSize / DEFAULT_FONT);

  return (
    <LetterVideoRoot>
      <SznytMaskDefs maskId={maskId} fontSize={fontSize} />
      <VideoMaskBox $maskId={maskId}>
        <InnerVideo
          ref={videoRef}
          src={src}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload={preload}
          autoPlay={autoPlay}
          onClick={onClick}
          aria-label={ariaLabel}
        />
      </VideoMaskBox>
      <SznytOutlineOverlay fontSize={fontSize} strokeWidth={strokeWidth} />
    </LetterVideoRoot>
  );
}

export default SznytLetterVideo;
