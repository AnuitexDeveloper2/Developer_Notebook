import { createSlice } from "@reduxjs/toolkit";
import { Topic, Record } from "../../types/content";
import { getTopicsAction } from "../actions/topic";

export interface ContentState {
    topics: Array<Topic>
    records: Array<Record>
}

const initialState: ContentState = {
    topics: Array<Topic>(),
    records: Array<Record>()
}

export const contentReducer = createSlice({
    name: 'content',
    initialState: initialState,
    reducers: { },
})

export const { } = contentReducer.actions

export default contentReducer.reducer