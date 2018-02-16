import { create } from 'apisauce';

const API = create({
    baseURL: 'http://localhost:3005/api/v1',
    headers: {'Content-Type': 'application/json'}
});

export { API };
