import * as axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.englishpatient.org/',
    headers: {
        /*'Authorization': 'r:07bfdebdb258f642bd6581b3d93c5d84',*/
    }
});

export const authAPI = {
    me() {
        return instance.get(`users/me`);
    },

    login(email, password) {
        return instance.post(`login`, { email, password })
    },
}