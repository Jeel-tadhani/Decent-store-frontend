import api from "./api";

export const fetchTrainerOrganisationList = (page: string, limit: string, userId: string) => {
    const url = `api/v1/trainer-company/list`

    let params: any = { page, limit }
    if (userId) {
        params["userId"] = userId
    }

    return api({ url, params });
};

export const fetchOneTrainerOrganisation = (id: string) => {
    const url = `api/v1/trainer-company/get/${id}`

    return api({ url });
};

export const deleteTrainerOrganisation = (id: string) => {
    const url = `api/v1/trainer-company/delete/${id}`,
        method = "delete";

    return api({ url, method, data: {} });
};