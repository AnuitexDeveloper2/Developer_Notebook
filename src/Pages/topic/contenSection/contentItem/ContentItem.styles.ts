import { teal } from "@mui/material/colors";
import styled from "styled-components";
import { grayDark05, mainColor, teal1, teal2 } from "../../../../styles/colors";

export const ArticleItemWrapper = styled("a")`
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid ${grayDark05};
  background-color: ${teal1};
  box-shadow: 14px 12px 5px 0px rgba(0, 0, 0, 0.75);
  text-decoration: none;
  max-height: 200px;
  &:hover {
    max-height: fit-content;
    height: 100%;
  }
`;

export const ArticleTitle = styled("div")`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  color: ${mainColor};
  text-align: center;
`;

export const ArticleDescription = styled("div")`
  background-color: ${teal2};
  color: ${teal};
  padding: 20px;
  height: 100%;
`;
