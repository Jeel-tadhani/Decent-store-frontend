import { Document } from "@/types/Document";
import api from "./api";

export const fetchDocument = (page: string, limit: string, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/document/list`

    let params: any = { page, limit }
    if (isClient) {
        params["clientId"] = clientId
    }

    return api({ url, params });
};

export const createDocument = (data: Document, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/document/create`,
        method = "post";

    if (isClient) {
        data["client"] = clientId
    }

    return api({ url, method, data });
};

export const deleteDocument = (id: string) => {
    const url = `api/v1/document/delete/${id}`,
        method = "delete";

    return api({ url, method, data: {} });
};