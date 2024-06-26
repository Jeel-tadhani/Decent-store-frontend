import api from "./api";
import { Companies } from "@/types/Companies";


export const fetchCompany = (page: string, limit: string) => {
    const url = `api/v1/company/list`
    return api({ url, params: { page, limit } });
};

export const updateCompany = (data: Companies, id: string) => {

    const url = `api/v1/company/update/${id}`,
        method = "put";

    return api({ url, method, data });
};

export const deleteCompany = (companyId: string) => {
    const url = `api/v1/company/delete/${companyId}`,
        method = "delete";

    return api({ url, method, data: {} });
};

export const fetchOneCompany = (id: string) => {
    const url = `api/v1/company/get/${id}`;
    return api({ url });
}