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
    return AxiosFetch({
        method: 'GET',
        url: baseAPIURL,
    });
};

export const CallDeleteData = (id: string) => {
    return AxiosFetch({
        method: 'DELETE',
        url: `${baseAPIURL}/${id}`,
    });
};

export const CallAddData = (param: DataParam) => {
    return AxiosFetch({
        method: 'POST',
        url: baseAPIURL,
        data: {
            id: param?.id,
            title: param?.title,
            completed: false,
            popupStatus: false,
            editStatus: false,
        }
    });
};

export const CallEditData = (param: DataParam) => {
    return AxiosFetch({
        method: 'PUT',
        url: `${baseAPIURL}/${param?.id}`,
        data: {
            title: param?.title,
            completed: param?.completed,
            popupStatus: false,
            editStatus: false,
        }
    });
};