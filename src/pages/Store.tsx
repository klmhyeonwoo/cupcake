/** @jsxImportSource @emotion/react */
import Container from "../components/Container";
import Canvas from "../components/Canvas";
import Locker from "../components/Locker";
import { useState } from "react";

export default function Store() {
  const [isFloor, setIsFloor] = useState(false);
  return (
    <Container>
      {!isFloor && <Locker checkIsFloor={setIsFloor} />}
      {isFloor && <Canvas />}
    </Container>
  );
}
