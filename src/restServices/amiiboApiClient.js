import axios from 'axios'

const baseUrlApi = 'https://www.amiiboapi.com/api/';

export const getAmiibos = _ => {
    const path = 'amiibo';

    return axios({
        method: 'get',
        url: baseUrlApi + path,
    });
}

export const getTypes = _ => {
    const path = 'type';

    return axios({
        method: 'get',
        url: baseUrlApi + path,
    });
}