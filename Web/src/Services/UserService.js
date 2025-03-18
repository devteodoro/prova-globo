import axios from "axios";


export default class UserService{
    constructor () {
        //this.axios = axios.create({
        //  baseURL: import.meta.env.VITE_NESTJS_API + '/auth'
        //})
    }

    async getUsers() {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            return response.data
        } catch (error) {
            throw error;
        } 
    };   
}



