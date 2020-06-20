import axios from 'axios'

const baseUrlApi = 'https://www.amiiboapi.com/api/';

export const getAmiibos = _ => {
    const path = 'amiibo';

    return axios({
        method: 'get',
        url: baseUrlApi + path,
    });
}

export const getTypes = async _ => {
    const path = 'type';

    try {
        let response = await axios({
            method: 'get',
            url: baseUrlApi + path,
        });

        return response.data;

    } catch (error) {
        let err = new Error("Error al obtener los tipos de amiibos.");
        throw err;
    }
}