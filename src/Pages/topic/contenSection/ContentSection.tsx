import React from "react";
import Search from "../../../components/common/search/Search";
import { ContentItem } from "../../../types/content";
import ItemComponent from "./contentItem/ContentItem";
import {
  ContentSectionContainer,
  ContentSectionWrapper,
  SearchSection,
} from "./ContentSection.styles";

interface Props {
  items: Array<ContentItem<string>>;
}

const ContentSection: React.FC<Props> = ({ items }) => {
  return (
    <ContentSectionContainer>
      <SearchSection>
        <Search />
      </SearchSection>
      <ContentSectionWrapper>
        {items.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </ContentSectionWrapper>
    </ContentSectionContainer>
  );
};

export default ContentSection;
