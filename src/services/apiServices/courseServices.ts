import api from "./api";


export const fetchCourse = () => {

    const url = `api/v1/course/list`
    return api({ url });
    
}