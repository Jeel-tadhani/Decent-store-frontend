import api from "./api";
import { CourseSlider } from "@/types";

export const fetchCourseSlider = (isClient?: boolean, clientId?: string) => {
    const url = `api/v1/course-slider/list`
    let params: any = {}
    if (isClient) {
        params["clientId"] = clientId
    }

    return api({ url, params });
};

export const fetchCourseSliderById = (id: string) => {
    const url = `api/v1/course-slider/get/${id}`

    return api({ url });
};

export const createCourseSlider = (data: CourseSlider, isClient?: boolean, clientId?: string) => {
    const url = `api/v1/course-slider/create`,
        method = "post";

    if (isClient) {
        data["client"] = clientId
    }

    return api({ url, method, data });
};

export const updateCourseSlider = (data: CourseSlider, id: string) => {
    const url = `api/v1/course-slider/update/${id}`,
        method = "put";

    return api({ url, method, data });
};

export const deleteCourseSlider = (id: string) => {
    const url = `api/v1/course-slider/delete/${id}`,
        method = "delete";

    return api({ url, method, data: {} });
};