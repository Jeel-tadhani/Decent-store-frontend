import api from "./api";


export const fetchTrainers = async () => {
    const url = `api/v1/trainer/list`;

    let params: any = { trainerCompanyId: 13 };

    return api({ url, params });
}