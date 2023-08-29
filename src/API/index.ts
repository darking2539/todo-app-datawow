import axios from "axios";
import { baseAPIURL } from '../constant';

const AxiosFetch = axios.create({});

interface DataParam {
    id: string;
    title: string;
    completed: boolean;
    popupStatus: boolean | null;
    editStatus: boolean | null;
}

export const CallGetDataList = () => {

    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'GET',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `${baseAPIURL}/todos/list`,
    });
};

export const CallDeleteData = (id: string) => {

    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'DELETE',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `${baseAPIURL}/todos/${id}`,
    });
};

export const CallAddData = (param: DataParam) => {
    
    var token = localStorage.getItem("token")
    
    return AxiosFetch({
        method: 'POST',
        url: `${baseAPIURL}/todos/submit`,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: null,
            title: param?.title,
            complete: false,
            popupStatus: false,
            editStatus: false,
        }
    });
};

export const CallEditData = (param: DataParam) => {
    
    var token = localStorage.getItem("token")

    return AxiosFetch({
        withCredentials: true,
        method: 'POST',
        url: `${baseAPIURL}/todos/submit`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: param?.id,
            title: param?.title,
            complete: param?.completed,
            popupStatus: false,
            editStatus: false,
        }
    });
};

interface userParam {
    username: string;
    password: string;
    email: string;
}

export const CallLogin = () => {
    return AxiosFetch({
        method: 'GET',
        url: `${baseAPIURL}/auth/login`,
    });
};

export const CallRegister = (param: userParam) => {
    return AxiosFetch({
        method: 'POST',
        url: `${baseAPIURL}/auth/register`,
        data: {
            username: param?.username,
            password: param?.password,
            email: param?.email,
        }
    });
};

interface changePasswordParam {
    username: string;
    oldPassword: string;
    newPassword: string;
}

export const CallChangePassword = (param: changePasswordParam) => {

    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'POST',
        url: `${baseAPIURL}/auth/changepassword`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            username: param?.username,
            oldPassword: param?.oldPassword,
            newPassword: param?.newPassword,
        }
    });
};