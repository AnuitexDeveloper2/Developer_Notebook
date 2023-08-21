import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import { ContentItem } from "../../../../types/content";
import {
  ArticleItemWrapper,
  ArticleTitle,
  ArticleDescription,
} from "./ContentItem.styles";

interface Props {
  item: ContentItem<string>;
}

const ItemComponent: React.FC<Props> = ({ item }) => {
  const {searchedContent} = useAppSelector((state) => state.contentReducer);
  const [_isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ArticleItemWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        searchedContent?.length &&
        !searchedContent.some((content) => content._id === item._id)
          ? "opacity"
          : ""
      }`}
    >
      <ArticleTitle>{item.title}</ArticleTitle>
      <ArticleDescription>{item.description}</ArticleDescription>
    </ArticleItemWrapper>
  );
};

export default ItemComponent;
