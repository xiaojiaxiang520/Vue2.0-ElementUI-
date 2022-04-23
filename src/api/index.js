import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'static/table.json',
        method: 'get',
        params: query
    });
};
