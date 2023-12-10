/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { fadeIn } from "../style/keyframes";

interface CanvasTitleTypes {
  marbleLength: number;
}

export default function CanvasTitle({ marbleLength }: CanvasTitleTypes) {
  return (
    <div
      css={css`
        position: absolute;
        top: 20%;
        left: 20%;
        transform: translate(-20%, -20%);
        z-index: 2;

        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        font-weight: 700;
        animation: ${fadeIn} 1s ease-in-out;

        span {
          display: block;
        }
      `}
    >
      <span>해당 게시물에 대해</span>
      <span>{marbleLength}개의 칭찬 구슬이 모였어요!</span>
    </div>
  );
}
