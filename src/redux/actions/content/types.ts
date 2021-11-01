import { Action } from "redux";
import { Record } from "../../../types/content";

export interface CreateContentAction extends Action<"CREATE_CONTENT"> { result: Record }

export interface GetContentAction extends Action<"GER_CONTENT"> { result: Array<Record> }

export type ContentsAction = CreateContentAction | GetContentAction