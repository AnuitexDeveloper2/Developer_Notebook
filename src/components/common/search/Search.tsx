import { Input, Image } from "antd";
import React from "react";
import { searchContentAction } from "../../../redux/actions/content";
import {
  setSearchedContent,
  setSearchString,
} from "../../../redux/reducers/contentReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import clear from "../../../assets/images/close.svg";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchString } = useAppSelector((state) => state.contentReducer);

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

  const clearSearchInput = () => {
    dispatch(setSearchString(""));
    dispatch(setSearchedContent([]));
  }

  return (
    <>
      <Input
        onChange={handleChange}
        value={searchString}
        suffix={
          <>
            {searchString && (
              <Image
                preview={false}
                src={clear}
                width={'20px'}
                onClick={clearSearchInput}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default Search;
