import React from "react";
import { ContentItem } from "../../../types/content";
import { ContentSectionWrapper } from "./ContentSection.styles";

interface Props {
  items: Array<ContentItem>;
}

const ContentSection: React.FC<Props> = ({ items }) => {
  return (
    <ContentSectionWrapper>
      {items.map((item) => (
        <div key={item._id}>{item.title}</div>
      ))}
    </ContentSectionWrapper>
  );
};

export default ContentSection;
