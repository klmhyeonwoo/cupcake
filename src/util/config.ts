import Matter from "matter-js";

export const wallOptions = {
  isStatic: true, // 정적 객체로 설정하여 이동하지 않도록 함
  restitution: 0,
  friction: 0,
  density: 0,
  angularSpeed: 0,
  positionIterations: 10,
  velocityIterations: 10,
};

export const wallStyle = {
  fillStyle: "transparent", // 투명색으로 설정
  strokeStyle: "transparent", // 테두리 색상
  lineWidth: 2, // 테두리 두께
};
