import api from "./api";

export const fetchMaturityLevel = (isClient?: boolean, clientId?: string) => {
    const url = `api/v1/maturity-level/list`
    let params: any = {}
    if (isClient) {
        params["clientId"] = clientId
    }
    return api({ url, params });
};

export const createMaturityLevel = (data: any, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/maturity-level/create`,
        method = "post";
    if (isClient) {
        data["client"] = clientId
    }
    return api({ url, method, data });
};

export const updateMaturityLevel = (data: any) => {
    const url = `api/v1/maturity-level/update`,
        method = "put";

    return api({ url, method, data });
}; 