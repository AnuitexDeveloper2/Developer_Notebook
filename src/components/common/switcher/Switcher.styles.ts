import styled from "styled-components";

export const SwitcherContainer = styled("div")``;

export const ToggleButtonCover = styled("div")`
  display: table-cell;
  position: relative;
  width: 200px;
  height: 140px;
  box-sizing: border-box;
  .button-cover:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  .button.b2 {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: blue;
    transition: 0.3s ease all;
    z-index: 1;
  }

  #button-4 .knobs:before,
  #button-4 .knobs:after {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }

  #button-4 .knobs:before {
    content: "New";
  }

  #button-4 .knobs:after {
    content: "Edit";
  }

  #button-4 .knobs:after {
    top: -28px;
    right: 4px;
    left: auto;
    background-color: #f44336;
  }

  #button-4 .checkbox:checked + .knobs:before {
    top: -28px;
  }

  #button-4 .checkbox:checked + .knobs:after {
    top: 4px;
  }

  #button-4 .checkbox:checked ~ .layer {
    background-color: #f3cdcd;
  }
`;
