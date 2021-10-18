import { Reducer } from "redux";
import { Topic, Record } from "../../types/content";
import { ContentActions } from "../actions/content/types";

export interface ContentState {
    topics: Array<Topic>
    records: Array<Record>
}

const initialState: ContentState = {
    topics: Array<Topic>(),
    records: Array<Record>()
}

const neverReached = (never: never) => { };

export const contentReducer: Reducer<ContentState, ContentActions> = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TOPICS":
           return {...state, topics: action.result}
        case "GET_ITEMS":
            return {...state, records: action.result}
        // default:
        //     neverReached(action)
    }
    return state
}