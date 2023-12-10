import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
    0% {
        opacity: 40%;
        transform: translate3d(-50%, 0%, 0);
    }

    50% {
        opacity: 60%;
        transform: translateY(30);
    }

    70% {
        opacity: 80%;
        transform: translateY(40);
    }

    100% {
        opacity: 100%;
        transform: translateY(50);
    }
`;
