import api from "./api";


export const fetchPillar = (isClient?: boolean, clientId?: string) => {

    const url = `api/v1/pillar/list`;
        let params: any = {}
        if (isClient) {
            params["clientId"] = clientId
        }

    return api({ url, params });
}