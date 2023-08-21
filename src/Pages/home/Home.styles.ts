import styled from "styled-components";

export const HomeContainer = styled("div")`
  margin-top: 100px;
  align-items: center;
  padding: 0 15px;
`;

export const TopicContainer = styled("div")`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 30%;
  justify-content: center;
`;

export const TopicItemContainer = styled("div")`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 50px;
  margin: 0px 10px;
  &.opacity {
    opacity: 0.2;
  }
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const TopicItem = styled("div")`
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  overflow: hidden;
  background-color: antiquewhite;
  box-shadow: 14px 12px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const TopicImage = styled("img")`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HomeSearchContainer = styled("div")`
  width: 30%;
`;
