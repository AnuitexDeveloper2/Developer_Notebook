import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../../helper/request";
import { CreateAppointmentRequest } from "./types";

export const getAppointmentsByTopicAction = createAsyncThunk<string | undefined, string>(
    'appointment/getContent',
    async (topicId: string) => {
        const result = await http<string | undefined, undefined>(
            {
                method: 'GET',
                path: `appointment/${topicId}`,
            },
        );
        console.log('GetAppointmentByTopic:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

/**
 * Create appointment
 * @param title 
 * @param topic 
 * @returns
 */

export const createAppointmentAction = createAsyncThunk<string | undefined, CreateAppointmentRequest>(
    'createAppointment/getContent',
    async (data: CreateAppointmentRequest) => {
        const result = await http<string | undefined, CreateAppointmentRequest>(
            {
                method: 'POST',
                path: 'appointment',
                body: data
            },
        );
        console.log('CreateAppointment:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const editAppointmentAction = createAsyncThunk<string | undefined, any>(
    'editAppointment/getContent',
    async (data: any) => {
        const result = await http<string | undefined, any>(
            {
                method: 'PUT',
                path: `appointment/${data.id}`,
                body: data
            }
        );
        console.log('EditAppointment:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);

export const removeAppointmentAction = createAsyncThunk<string | undefined, string>(
    'removeAppointment/getContent',
    async (id: string) => {
        const result = await http<string | undefined, string>(
            {
                method: 'Delete',
                path: `appointment/${id}`,
            }
        );
        console.log('RemoveAppointment:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);
