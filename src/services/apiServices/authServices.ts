import { ResetPasswordType } from "@/types";
import api from "./api";

// export const Login = (data: { email: string, password: string }): Promise<any> => {
//     const url = `api/v1/user/login`,
//         method = "post";

//     return api({ url, method, data });
// };

export const Logout = () => {
    const url = `api/v1/user/logout`;
    const method = "post";

    return api({ url, method });
}

export const ResetPassword = (data: ResetPasswordType) => {
    const url = `api/v1/user/reset-password`;
    const method = "post";

    return api({ url, method, data });
}


export const Login = (data: { email: string, password: string }): Promise<any> => {
    const url = `api/v1/user/login`,
        method = "post";

    return api({ url, method, data });
};

export const Register = (data: { user_name: string, email: string, password: string }): Promise<any> => {
    const url = `api/v1/user/register`,
        method = "post";

    return api({ url, method, data });
};