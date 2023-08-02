import styled from "styled-components";

export const HeaderWrapper = styled("div")`
  box-sizing: border-box;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e3e2e2;
  box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
  height: 60px;
`;

export const HeaderTitle = styled("div")`
  font-size: 24px;
  font-weight: bold;
  color: #824c67;
  text-decoration: none;
  a {
    color: unset;
    text-decoration: unset;
  }
`;

export const HeaderUserIcon = styled("img")`
  width: 16px;
  float: right;
  width: 178px;
  height: 18px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
