import {baseUrl} from "./apiUrl.service";

export default class Api{
    static get(url){
        return fetch(baseUrl + url, {credentials: 'include'}).then(resp => resp.json());
    }

    static saveData(url, data, method){
        return fetch(baseUrl+url, {
            credentials: 'include',
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(resp=>{
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('HTTP Reqest error');
            }
        });
    }

    static post(url, data){
        return this.saveData(url, data, 'POST');
    }

    static put(url, data){
        return this.saveData(url, data, 'PUT');
    }
}
