import axios from 'axios';

export default class AuthService {
  constructor () {
    //this.axios = axios.create({
    //  baseURL: import.meta.env.VITE_NESTJS_API + '/auth'
    //})
  }


  async login (username, password) {

    let data = JSON.stringify({ "username": username, "password": password });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_NESTJS_API + '/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      const res = await axios.request(config);

      if(res){
        localStorage.setItem("token", res.data.accessToken);
        return true;
      }
      
      return false;
  }

  authenticatedUser () {
    return localStorage.getItem("token") != undefined ? true : false
  }

  async logout () {
    localStorage.removeItem("token")
  }
}