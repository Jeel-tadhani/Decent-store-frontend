import { Question } from "@/types/Questions";
import api from "./api";


export const fetchQuestion = (page: string, limit: string) => {
    const url = `api/v1/question/admin/list`
    return api({ url, params: { page, limit } });
};

export const createQuestion = (data: Question) => {

    console.log(data);


    const url = `api/v1/question/create`,
        method = "post";

    return api({ url, method, data });
};


export const updateQuestion = (data: Question, id: string) => {

    const url = `api/v1/question/update/${id}`,
        method = "put";

    return api({ url, method, data });
};


export const deleteQuestion = (QuestionId: string) => {
    const url = `api/v1/question/delete/${QuestionId}`,
        method = "delete";

    return api({ url, method, data: {} });
}

export const fetchOneQuestion = (id: string) => {
    const url = `api/v1/question/get/${id}`
    return api({ url });
};

