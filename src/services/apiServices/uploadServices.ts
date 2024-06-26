import api from "./api";

export const uploadFile = (file: any) => {
    const url = `api/v1/file/upload`,
        method = "post";
    const formData = new FormData();
    formData.append("file", file);

    return api({ url, method, data: formData, isFormData: true });
};