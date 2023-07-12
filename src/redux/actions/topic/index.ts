import { createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../../helper/request"
import { ActionResponse } from "../../../models/response/types";
import { Topic } from "../../../types/content"

export const getTopicsAction = createAsyncThunk<ActionResponse<Array<Topic>> | undefined, undefined>(
    'topic/getAll',
    async () => {
        const result = await http<ActionResponse<Array<Topic>> | undefined, undefined>(
            {
                method: 'GET',
                path: 'topics',
            },
        );
        console.log('GetAll:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const getTopicAction = createAsyncThunk<string | undefined, string>(
    'topic/getTopic',
    async (id: string) => {
        const result = await http<string | undefined, undefined>(
            {
                method: 'GET',
                path: `topics/${id}`,
            },
        );
        console.log('GetTopic:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const createTopicAction = createAsyncThunk<any | undefined, any>(
    'topic/createTopic',
    async (data: any) => {
        const result = await http<any | undefined, any>(
            {
                method: 'POST',
                path: 'topics',
                body: data
            },
        );
        console.log('CreateTopic:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);


export const editTopicAction = createAsyncThunk<string | undefined, any>(
    'topic/createTopic',
    async (data: any) => {
        const result = await http<string | undefined, any>(
            {
                method: 'PUT',
                path: `topics/${data._id}`,
                body: data
            },
        );
        console.log('EditTopic:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const removeTopicAction = createAsyncThunk<string | undefined, string>(
    'topic/createTopic',
    async (id: string) => {
        const result = await http<string | undefined, undefined>(
            {
                method: 'DELETE',
                path: `topics/${id}`,
            },
        );
        console.log('EditTopic:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);
