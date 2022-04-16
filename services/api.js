import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
  });

  const getData = async () => {
    
    try {
      const jsonValue = await AsyncStorage.getItem('login')
      console.log('teste', jsonValue)
      jsonValue != null ? JSON.parse(jsonValue) : null;

      

        if(jsonValue){
          api.interceptors.request.use(
            config =>
                AsyncStorage.getItem('login').then(login => {
                    let obj = JSON.parse(login)
        console.log(obj.data.token)
                    config.headers.Authorization = `Bearer ${obj.data.token}`;
                    //console.log('config',config)
                    return config;
                }),
            error => Promise.reject(error)
        );
      }

    } catch(e) {
      return e
    }
  }
 
  getData()
 
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error api > ", error);


      if (500 === error.response.status) {

      }else if (401 === error.response.status) {

      } else {
        return Promise.reject(error);
      }
    }
  );

  export default api;