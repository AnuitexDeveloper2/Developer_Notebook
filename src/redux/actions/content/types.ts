import { Action } from "redux";
import { Record } from "../../../types/content";

export interface GetTopicsAction extends Action<"GET_TOPICS"> { result: any}

export interface CreateTopicAction extends Action<"CREATE_TOPIC"> {result: Record}

export interface GetTopicAction extends Action<"GET_TOPIC"> { result: any}

export interface EditTopicAction extends Action<"EDIT_TOPIC"> {result: Record}

export interface RemoveTopicAction extends Action<"REMOVE_TOPIC"> {result: Record}

export interface GetItemsAction extends Action<"GET_ITEMS"> { result: any}



export type ContentActions = GetTopicsAction | CreateTopicAction | GetItemsAction | EditTopicAction | RemoveTopicAction | GetTopicAction