import styled, { keyframes } from "styled-components";
import { teal } from "../../styles/colors";

export const ProgressBarContainer = styled("div")``;

export const OutInfo = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  p {
    /* color: #09101d; */
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const ProgressBarWrapper = styled("div")``;

const move = keyframes`
0% {
        background-position: 100% 0
    }
    100% {
        background-position: -100% 0
    }
`;

export const ProgressBarLine = styled("div")`
  height: 100%;
  background: -webkit-linear-gradient(
    left,
    transparent 0%,
    transparent 30%,
    ${teal} 45%,
    ${teal} 50%,
    ${teal} 60%,
    transparent 70%,
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 1000px 100%;
  display: inline-block;
  position: relative;
  -webkit-animation-duration: 1.25s;
  animation-duration: 1.25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: ${move};
  animation-name: ${move};
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-transition: width 0.6s ease;
  transition: width 0.6s ease;
`;
