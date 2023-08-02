import styled from "styled-components";

export const HeaderMenuContent = styled("div")`
  list-style-type: none;
  margin: 0;
  padding: 0;
  top: 45px;
  right: 0px;
  width: 200px;
  background-color: white;
  font-weight: bold;
  position: absolute;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  li a {
    color: #000;
    text-decoration: none;
  }
  li {
    padding: 8px 16px;
    border-bottom: 1px solid #e5e5e5;
  }
  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background-color: #e5e5e5;
    color: white;
  }
  .button {
    width: 178px;
    height: 18px;
    background-color: #ff3232;
    padding: 12px;
    border-radius: 5px;
    font-weight: bold;
    color: white;
  }
  .button:before {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    border: 10px solid;
    border-color: white transparent transparent transparent;
    right: 6px;
    top: 18px;
  }
`;
