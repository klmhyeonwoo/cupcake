/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";

interface ContainerType {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerType) {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setMobile(true);
        // alert("현재 접속한 기기는 모바일이에요!");
      }
    }
  }, []);

  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${isMobile ? window.innerWidth + "px" : `24.5rem`};
        border: 1px solid gray;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
      `}
      className="container"
    >
      {children}
    </div>
  );
}
