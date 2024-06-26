import api from "./api";

export const fetchSupportTicketCount = (userId: string) => {
    const url = `api/v1/support-ticket/count`

    return api({ url, params: { userId } });
};

export const fetchSupportTicketList = (page: string, limit: string, userId: string) => {
    const url = `api/v1/support-ticket/list`

    let params: any = { page, limit }
    if (userId) {
        params["userId"] = userId
    }

    return api({ url, params });
};