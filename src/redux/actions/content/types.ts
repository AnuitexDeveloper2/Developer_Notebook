import { Action } from "redux";
import { Record } from "../../../types/content";

export interface CreateContentAction extends Action<"CREATE_CONTENT"> { result: Record }

export interface GetContentAction extends Action<"GER_CONTENT"> { result: Array<Record> }

export interface RemoveContentAction extends Action<"REMOVE_CONTENT"> { error: any }

export type ContentsAction = CreateContentAction | GetContentAction | RemoveContentAction