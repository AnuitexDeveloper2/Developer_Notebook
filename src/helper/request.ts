import axios from "axios";
import { alertService } from "../services";


const agent = axios.create({
    baseURL: process.env.REACT_APP_URI,
    // `https://b653dd9653de.ngrok.io/api`,

    // process.env.REACT_APP_API_BASE_URL,
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
});
export interface HttpRequest<REQB> {
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
}
export interface HttpResponse<RESB> extends Response {
    parsedBody?: RESB;
}

export const http = <RESB, REQB>(
    config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
    return new Promise((resolve, reject) => {
        const request = new Request(`${process.env.REACT_APP_URI}/${config.path}`, {
            method: config.method || 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            body: config.body ? JSON.stringify(config.body) : undefined,
        });
        if (config.accessToken) {
            request.headers.set('authorization', `bearer ${config.accessToken}`);
        }
        let response: HttpResponse<RESB>;
        fetch(request)
            .then((res) => {
                response = res;
                return res.json();
            })
            .then((body) => {
                if (body.error) {
                    alertService.error(body.error, { fade: true, fixed: true })
                }
                if (response.ok) {
                    response.parsedBody = body;
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const httpMultipart = <REQB, RESB>(
    config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
    return new Promise((resolve, reject) => {
        const request = new Request(`${process.env.REACT_APP_URI}/${config.path}`, {
            method: config.method || 'get',
            headers: {
                "Content-Type": "multipart/form-data; boundary=MyBoundary",
            },
            body: config.body as any,
        });
        if (config.accessToken) {
            request.headers.set('authorization', `bearer ${config.accessToken}`);
        }
        let response: HttpResponse<RESB>;
        fetch(request)
            .then((res) => {
                response = res;
                return res.json();
            })
            .then((body) => {
                if (response.ok) {
                    response.parsedBody = body;
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const sendMultipart = async (multipartData: FormData, topicId: string) => {
    await axios.post(`${process.env.REACT_APP_URI}/topics/image/${topicId}`, multipartData, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=Image`,
        },
    });
};