/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useState } from "react";
import { useRef } from "react";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { scrollEffect } from "../style/keyframes";

interface LockerType {
  checkIsFloor: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Locker({ checkIsFloor }: LockerType) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [initialTop, setInitialTop] = useState(0);
  const dragItemRef = useRef<HTMLDivElement | null>(null);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    if (dragItemRef.current) {
      const rect = dragItemRef.current.getBoundingClientRect();
      if (dragItemRef.current && dragItemRef.current.parentElement) {
        setInitialTop(rect.top - dragItemRef.current.parentElement.offsetTop); // 컨테이너 상대 위치 고려
      }
    }
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const currentY = e.type.includes("touch")
      ? e.touches[0].clientY
      : e.clientY;
    const deltaY = currentY - startY;
    if (dragContainerRef.current) {
      const containerHeight = dragContainerRef.current.clientHeight; // 컨테이너 높이

      if (dragItemRef.current) {
        const dragItemHeight = dragItemRef.current.clientHeight; // 드래그 요소의 높이
        const newTop = Math.min(
          initialTop + deltaY,
          containerHeight - dragItemHeight
        );

        dragItemRef.current.style.top = `${newTop}px`;

        // 바닥에 닿았는지 확인
        if (newTop >= containerHeight - dragItemHeight) {
          // 여기에 바닥에 닿았을 때의 추가 로직을 구현할 수 있습니다.
          checkIsFloor(true);
        }
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragItemRef.current) {
      //   dragItemRef.current.style.top = "0%"; // 초기 위치로 복원
    }
  };

  return (
    <div
      id="drag-container"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseLeave={handleDragEnd} // 옵션: 마우스가 컨테이너를 벗어날 때
      css={css`
        position: relative;
        margin-top: auto;
        width: 100%;
        height: 500px; /* 높이 조절 가능 */
        // border: 1px solid #ccc; /* 경계 확인을 위한 스타일 */
      `}
      ref={dragContainerRef}
    >
      <div
        id="drag-item"
        ref={dragItemRef}
        css={css`
          width: 100%;
          position: absolute;
          transition: top 0.3s ease; /* 부드러운 애니메이션 효과 */
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Arrow
          width={0}
          height={0}
          css={css`
            width: 3rem;
            height: 2rem;
            animation: ${scrollEffect} 2.1s linear 1s infinite;
          `}
        />
      </div>
    </div>
  );
}
