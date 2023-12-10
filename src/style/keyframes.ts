import { keyframes } from "@emotion/react";

export const fadeUp = keyframes`
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

export const fadeIn = keyframes`
    0% {
        opacity : 40%;
    }

    50% {
        opacity : 70%;
    }

    100 % {
        opacity : 100%;
    }
`;

export const scrollEffect = keyframes`
	0% {
    margin-top: 0px;
    opacity: 60%;
  }
  25% {
    opacity: 80%;
  }
	50% {
    margin-top: 20px;
    opacity: 100%;
  }
  75% {
    opacity: 80%;
  }
  100% {
    margin-top: 0px;
    opacity: 60%;
  }
`;
