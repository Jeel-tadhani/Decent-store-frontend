import api from "./api";
import { FAQS } from "@/types/Faqs";

export const fetchFaqs = (isClient?: boolean, clientId?: string) => {
    const url = `api/v1/faq/list`
    let params: any = {}
    if (isClient) {
        params["clientId"] = clientId
    }
    return api({ url, params });
};

export const createFaqs = (data: FAQS, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/faq/create`,
        method = "post";

    if (isClient) {
        data["client"] = clientId
    }

    return api({ url, method, data });
};