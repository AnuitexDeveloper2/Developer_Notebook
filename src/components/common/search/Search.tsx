import { Input } from "antd";
import React, { useState } from "react";
import { searchContentAction } from "../../../redux/actions/content";
import {
  setSearchedContent,
  setSearchString,
} from "../../../redux/reducers/contentReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { ContentItem } from "../../../types/content";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchString } = useAppSelector((state) => state.contentReducer);
  const [state, setState] = useState({
    content: Array<ContentItem>(),
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      dispatch(setSearchString(""));
      dispatch(setSearchedContent([]));
      return;
    }
    dispatch(setSearchString(value));
    const { payload } = (await dispatch(searchContentAction(value))) as any;
    if (payload?.data) {
      dispatch(setSearchedContent(payload.data));
    }
  };

  return <Input onChange={handleChange} value={searchString} />;
};

export default Search;
