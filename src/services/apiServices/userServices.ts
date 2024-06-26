import api from "./api";

export const fetchUser = () => {
    const url = `api/v1/user/get`

    return api({ url });
};

export const fetchOneUserById = (id: string) => {
    const url = `api/v1/user/get/${id}`;
    return api({ url });
}

export const fetchUsers = (page: string, limit: string) => {
    const url = `api/v1/user/list`
    return api({ url, params: { page, limit } });
};

export const updateUserById = (data: any, id: string) => {
    const url = `api/v1/user/update/${id}`,
        method = "patch";

    return api({ url, method, data });
};

export const updateUser = (data: any) => {
    const url = `api/v1/user/update`,
        method = "patch";

    return api({ url, method, data });
};


export const deleteUser = (id: string) => {
    const url = `api/v1/user/delete/${id}`,
        method = "delete";

    return api({ url, method, data: {} });
};