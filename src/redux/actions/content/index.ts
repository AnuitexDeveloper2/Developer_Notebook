import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request"
import { ActionResponse } from "../../../models/response/types"
import { Record, Topic } from "../../../types/content"
import * as types from "./types"
import { EditContentRequest } from "./types"


export const getContentAction = createAsyncThunk<ActionResponse<any> | undefined, string>(
    'content/getContent',
    async (topicId: string) => {
        const result = await http<ActionResponse<any> | undefined, undefined>(
            {
                method: 'GET',
                path: `contents/admin/${topicId}`,
            },
        );
        console.log('GetContent:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);


export const createContentAction = createAsyncThunk<string | undefined, any>(
    'content/createContent',
    async (data: any) => {
        const result = await http<string | undefined, undefined>(
            {
                method: 'POST',
                path: 'contents/admin',
                body: data
            },
        );
        console.log('GetContent:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const removeContentAction = createAsyncThunk<string | undefined, string>(
    'content/removeContent',
    async (id: string) => {
        const result = await http<string | undefined, undefined>(
            {
                method: 'DELETE',
                path: `contents/admin/${id}`,
            },
        );
        console.log('RemoveContent:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const editContentAction = createAsyncThunk<string | undefined, EditContentRequest>(
    'content/editContent',
    async (data: EditContentRequest) => {
        const result = await http<string | undefined, EditContentRequest>(
            {
                method: 'PUT',
                path: `contents/admin/${data.id}`,
                body: data
            },
        );
        console.log('EditContent:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const getContentByAppointmentIdAction = createAsyncThunk<string | undefined, string>(
    'content/getContentByAppointmentId',
    async (id: string) => {
        const result = await http<string | undefined, string>(
            {
                method: 'Get',
                path: `contents/user/${id}`,
            },
        );
        console.log('GetContentByAppointmentId:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);