import { Action } from "redux";
import { Record } from "../../../types/content";

export interface GetTopicsAction extends Action<"GET_TOPICS"> { result: any}

export interface CreateTopicAction extends Action<"CREATE_TOPIC"> {result: Record}


export type ContentActions = GetTopicsAction