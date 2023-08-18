import React from "react";
import { ContentItem } from "../../../types/content";
import ItemComponent from "./contentItem/ContentItem";
import { ContentSectionWrapper } from "./ContentSection.styles";

interface Props {
  items: Array<ContentItem>;
}

const ContentSection: React.FC<Props> = ({ items }) => {
  return (
    <ContentSectionWrapper>
      {items.map((item) => (
        <ItemComponent key={item._id} item={item} />
      ))}
    </ContentSectionWrapper>
  );
};

export default ContentSection;
