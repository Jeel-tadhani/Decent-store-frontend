import api from "./api";


export const courseTrendData = () => {
    const url = `api/v1/course/enroll/trend`
    return api({ url });
}

export const courseTopFive = () => {
    const url = `api/v1/course/top/list`
    return api({ url });
}