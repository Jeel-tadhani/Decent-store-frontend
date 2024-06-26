import { GlobalSetting } from "@/types";
import api from "./api";

export const fetchGlobalSetting = (userId: string) => {
    const url = `api/v1/setting/get/${userId}`

    return api({ url });
};

export const updateGlobalSetting = (data: GlobalSetting) => {
    const url = `api/v1/setting/save`,
        method = "post";

    return api({ url, method, data });
};