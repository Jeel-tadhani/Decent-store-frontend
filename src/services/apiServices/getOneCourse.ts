import api from "./api";


export const fetchOneCourse = (id: any) => {
    const url = `api/v1/course/get/${id}`
    return api({ url });
}