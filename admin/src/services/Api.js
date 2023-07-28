import axios from 'axios';


const url = "http://localhost:2000/inters";

export const getAllInter = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}
export const addInter = async (inter) => {
    return await axios.post(url, inter);
}

export const editInter = async (id, inter) => {
    return await axios.put(`${url}/${id}`,inter);
}


export const deleteInter = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

