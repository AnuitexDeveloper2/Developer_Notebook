export interface HttpRequest<REQB> {
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
}
export interface HttpResponse<RESB> extends Response {
    parsedBody?: RESB;
}

export const http = <REQB, RESB>(
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
        debugger
        let response: HttpResponse<RESB>;
        fetch(request)
            .then((res) => {
                response = res;
                return res.json();
            })
            .then((body) => {
                debugger
                if (response.ok) {
                    response.parsedBody = body;
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch((err) => {
                debugger
                console.error(err);
                reject(err);
            });
    });
};
