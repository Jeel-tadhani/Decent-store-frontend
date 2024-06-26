import { Theme } from "@/types";
import api from "./api";

export const fetchThemeForClient = (clientId: string) => {
    const url = `api/v1/theme/get`

    return api({ url, params: { clientId } });
};

export const createTheme = (data: Theme) => {
    const url = `api/v1/theme/create`,
        method = "post";

    return api({ url, method, data });
};

export const updateTheme = (data: Theme, id: string) => {
    const url = `api/v1/theme/update/${id}`,
        method = "put";

    return api({ url, method, data });
}; 