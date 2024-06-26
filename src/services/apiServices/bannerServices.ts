import api from "./api";
import { Banner } from "@/types";

export const fetchBanner = (isClient?: boolean, clientId?: string) => {
    const url = `api/v1/slider/list`
    let params: any = {}
    if (isClient) {
        params["clientId"] = clientId
    }
    return api({ url, params });
};

export const fetchBannerById = (id: string) => {
    const url = `api/v1/slider/get/${id}`

    return api({ url });
};

export const createBanner = (data: Banner, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/slider/create`,
        method = "post";

    if (isClient) {
        data["client"] = clientId
    }

    return api({ url, method, data });
};

export const updateBanner = (data: Banner, id: string) => {
    const url = `api/v1/slider/update/${id}`,
        method = "put";

    return api({ url, method, data });
};

export const deleteBanner = (id: string) => {
    const url = `api/v1/slider/delete/${id}`,
        method = "delete";

    return api({ url, method, data: {} });
};