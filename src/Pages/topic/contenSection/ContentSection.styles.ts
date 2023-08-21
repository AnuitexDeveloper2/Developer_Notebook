import styled from "styled-components";

export const ContentSectionWrapper = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 364px);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  padding: 0 150px;
  > :first-child {
    grid-column: span var(--search-span, 1);
    align-self: flex-start;
  }
`;

export const ContentSectionContainer = styled("div")`
  padding: 20px 10px;
  width: 100%;
`;

export const SearchSection = styled("div")`
  width: 30%;
`;
