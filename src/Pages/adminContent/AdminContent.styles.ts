import styled from "styled-components";
import { Card } from "@mui/material";

export const ContentCard = styled(Card)`
  margin-top: 70px;
  padding: 20px;
`;

export const TopicContainerAdmin = styled(Card)`
  display: flex;
`;

export const TopicsSection = styled("div")`
  width: 90%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: auto;
  gap: 10px;
`;

export const AddTopicButton = styled("button")`
  width: 10%;
  color: #ffff;
  margin: 30px;
  border: none;
  background-color: blue;
  padding: 5px;
  border-radius: 5px;
  display: block;
  cursor: pointer;
`;
