/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRef } from "react";
import { useEffect } from "react";
import Matter from "matter-js";
import { wallOptions, wallStyle } from "../util/config";
import mock from "../mock/data.json";
import previewTexture from "../assets/previewTexture.svg";
import clearTexture from "../assets/clearTexture.svg";
import Modal from "./Modal";
import { useState } from "react";
import MarbleTypes from "../../node_modules/.pnpm/@types+matter-js@0.19.5/node_modules/@types/matter-js";
import CanvasTitle from "./CanvasTitle";

export default function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modal, setModal] = useState(false);
  const [marble, setMarble] = useState<MarbleTypes.Body>();
  const [globalEngine, setEngine] = useState<MarbleTypes.Engine>();
  const storeMarble: (
    | Matter.Body
    | Matter.Composite
    | Matter.MouseConstraint
    | Matter.Constraint
    | (
        | Matter.Body
        | Matter.Composite
        | Matter.MouseConstraint
        | Matter.Constraint
      )[]
  )[] = [];
  const {
    Engine,
    Render,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Composite,
    Sleeping,
  } = Matter;
  let scroll = false;
  let mobile = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        mobile = true;
        // alert("현재 접속한 기기는 모바일이에요!");
      }
    }
    const container = document.querySelector(".container");
    const containerWidth =
      container && window.getComputedStyle(container).width.split("px")[0];
    const width = containerWidth ? parseInt(containerWidth) + 100 : 485;
    const height = window.innerHeight + 200;

    if (containerRef.current) {
      containerRef.current.scrollLeft =
        (containerRef.current.scrollWidth - containerRef.current.offsetWidth) /
        2;
    }

    const engine = Engine.create();
    setEngine(engine);
    const render = Render.create({
      element: containerRef.current ? containerRef.current : undefined,
      engine: engine,
      canvas: canvasRef.current ? canvasRef.current : undefined,
      options: {
        width: width,
        height: height,
        background: "transparent",
        wireframes: false,
        showCollisions: false,
      },
    });

    const leftWall = Bodies.rectangle(0, height / 2, 10, height, {
      ...wallOptions,
      render: wallStyle,
    });
    const rightWall = Bodies.rectangle(width, height / 2, 10, height, {
      ...wallOptions,
      render: wallStyle,
    });
    const topWall = Bodies.rectangle(width / 2, -100, width, 10, {
      ...wallOptions,
      render: wallStyle,
    });
    const bottomWall = Bodies.rectangle(width / 2, height, width, 10, {
      ...wallOptions,
      render: wallStyle,
    });

    mock.data.forEach(() => {
      storeMarble.push(
        Bodies.circle(350, 0, 66, {
          label: `ball`,
          restitution: 0,
          motion: 0.4,
          render: {
            sprite: {
              texture: previewTexture,
              xScale: 1.1,
              yScale: 1.1,
            },
            text: {
              content: "test",
              color: "black",
              size: 16,
              family: "Papyrus",
            },
          },
        })
      );
    });

    function generate() {
      if (storeMarble.length > 0) {
        Array.from({ length: Math.random() * 5 }).forEach((_) => {
          if (storeMarble.length > 0) {
            World.add(engine.world, storeMarble.pop()!);
          }
        });
      }
      requestAnimationFrame(generate);
    }

    setTimeout(() => {
      generate();
    }, 200);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, [leftWall, rightWall, topWall, bottomWall]);
    Matter.Runner.run(engine);
    Render.run(render);

    Matter.Events.on(mouseConstraint, "mousedown", (event) => {
      scroll = false;
      const clickedBody = event.source.body;

      if (clickedBody && clickedBody.label === "ball" && !mobile) {
        setMarble(event.source.body);
        setModal(true);
      }
    });

    Mouse.clearSourceEvents(mouse);
    // 기존 내장 이벤트 제거
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchstart",
      mouseConstraint.mouse.mousedown
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchmove",
      mouseConstraint.mouse.mousemove
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchend",
      mouseConstraint.mouse.mouseup
    );

    // 이벤트 추가
    mouseConstraint.mouse.element.addEventListener(
      "touchstart",
      (e) => {
        mouseConstraint.mouse.mousedown(e);
      },
      {
        passive: true,
      }
    );
    mouseConstraint.mouse.element.addEventListener("touchmove", () => {
      if (mouseConstraint.body) {
        scroll = true;
        // mouseConstraint.mouse.mousemove(e);
      }
    });
    mouseConstraint.mouse.element.addEventListener("touchend", (e) => {
      mouseConstraint.mouse.mouseup(e);

      if (
        mouseConstraint.body &&
        mouseConstraint.body.label === "ball" &&
        !scroll
      ) {
        setModal(true);
        setMarble(mouseConstraint.body);
      }
    });
  }, []);

  /** 모달이 종료되었을 때 렌더링 */
  useEffect(() => {
    if (!modal && globalEngine && marble && marble.label === "ball") {
      World.add(
        globalEngine.world,
        Bodies.circle(300, 0, 65, {
          label: `ball`,
          restitution: 0,
          motion: 0.4,
          render: {
            sprite: {
              texture: clearTexture,
              xScale: 1.1,
              yScale: 1.1,
            },
          },
        })
      );
      World.remove(globalEngine.world, marble);
    }
  }, [modal]);

  return (
    <>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: left;
          align-items: center;
          z-index: 2;
          overflow: auto;
          scroll-behavior: smooth;

          -ms-overflow-style: none;
          scrollbar-width: none;

          &::-webkit-scrollbar {
            display: none;
          }
        `}
        ref={containerRef}
      >
        {modal && <Modal state={modal} setState={setModal} />}
        <CanvasTitle marbleLength={mock.data.length} />
        <canvas
          css={css`
            z-index: 1;
          `}
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  );
}
