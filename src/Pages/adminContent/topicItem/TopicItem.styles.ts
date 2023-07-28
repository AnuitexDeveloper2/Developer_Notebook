import styled from "styled-components";

export const AdminTopicWrapper = styled("div")`
  display: flex;
`;

export const AdminTopicSection = styled("div")`
  margin: 5px;
  cursor: pointer;

  &:hover .admin-topic-title {
    color: #2196f3;
    cursor: pointer;
  }
`;

export const AdminTopicTitle = styled("div")`
  text-align: center;
`;

export const AdminTopicImage = styled("img")`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  object-fit: contain;
`;
