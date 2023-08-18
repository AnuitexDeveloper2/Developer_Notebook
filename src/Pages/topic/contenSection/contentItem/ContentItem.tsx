import React, { useState } from 'react';
import { ContentItem } from '../../../../types/content';
import { ArticleItemWrapper, ArticleTitle, ArticleDescription } from './ContentItem.styles';

interface Props {
    item: ContentItem
}

const ItemComponent:React.FC<Props> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
  
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
      >
        <ArticleTitle>{item.title}</ArticleTitle>
        <ArticleDescription>{item.description}</ArticleDescription>
        {/* {isHovered && <FullText>{text}</FullText>} */}
      </ArticleItemWrapper>
    );
  };
  
  
  export default ItemComponent;