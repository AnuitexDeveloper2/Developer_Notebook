import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Topic, Record, ContentItem } from "../../types/content";
import { getTopicsAction } from "../actions/topic";

export interface ContentState {
  topics: Array<Topic>;
  records: Array<Record>;
  searchString: string;
  searchedContent: Array<ContentItem<string>>;
}

const initialState: ContentState = {
  topics: Array<Topic>(),
  records: Array<Record>(),
  searchString: "",
  searchedContent: Array<ContentItem<string>>(),
};

export const contentReducer = createSlice({
  name: "content",
  initialState: initialState,
  reducers: {
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
    setSearchedContent(state, action: PayloadAction<Array<ContentItem<string>>>) {
      state.searchedContent = action.payload;
    },
  },
});

export const {setSearchString, setSearchedContent} = contentReducer.actions;

export default contentReducer.reducer;
