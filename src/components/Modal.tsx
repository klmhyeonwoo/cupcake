/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ReactComponent as Texture } from "../assets/resultTexture.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { fadeIn } from "../style/keyframes";

interface modalTypes {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ state, setState }: modalTypes) {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba(180, 180, 180, 0.6);
        padding: 1.25rem;
        box-sizing: border-box;
      `}
    >
      <Close
        width={0}
        height={0}
        css={css`
          width: 2rem;
          height: 2rem;
          cursor: pointer;
        `}
        onClick={() => setState(!state)}
      />
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 11;
          width: 20rem;
          height: 20rem;
          animation: ${fadeIn} 1s ease-in-out;
        `}
      >
        {/* <img
          src={resultTexture}
          alt="모달 비눗방울"
          css={css`
            width: 10rem;
            height: 10rem;
          `}
        /> */}
        <Texture
          width={0}
          height={0}
          css={css`
            width: 100%;
            height: 100%;
            transition: 0.4s all;
          `}
        />
      </div>
    </div>
  );
}
