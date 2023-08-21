import React, { useEffect, useRef } from "react";
import Search from "../../../components/common/search/Search";
import { ContentItem } from "../../../types/content";
import ItemComponent from "./contentItem/ContentItem";
import {
  ContentSectionContainer,
  ContentSectionWrapper,
} from "./ContentSection.styles";

interface Props {
  items: Array<ContentItem<string>>;
}

const ContentSection: React.FC<Props> = ({ items }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustSearchWidth(wrapperRef);
    window.addEventListener("resize", () => adjustSearchWidth(wrapperRef));
    return () => {
      window.removeEventListener("resize", () => adjustSearchWidth(wrapperRef));
    };
  }, [wrapperRef]);

  function adjustSearchWidth(wrapperRef: React.RefObject<HTMLDivElement>) {
    if (wrapperRef.current) {
      const computedStyle = getComputedStyle(wrapperRef.current);
      const columnWidth = parseInt(
        computedStyle.getPropertyValue("grid-template-columns").split(" ")[0]
      );
      const numColumns = Math.floor(
        wrapperRef.current.offsetWidth / columnWidth
      );
      wrapperRef.current.style.setProperty(
        "--search-span",
        (numColumns - 1).toString()
      );
    }
  }
  return (
    <ContentSectionContainer>
      <ContentSectionWrapper ref={wrapperRef}>
        <Search />
        {items.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </ContentSectionWrapper>
    </ContentSectionContainer>
  );
};

export default ContentSection;
