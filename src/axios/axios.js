import axios from 'axios'
import { Modal } from 'antd';


export default class Axios {




    static async request(options) {

        try {
            return await axios({
                method: options.type,
                url: options.url,

            })
        } catch (e) {

            return {
                status: -1
            }
        }
    }

    static  ajax(options){

        const baseURL=" https://www.easy-mock.com/mock/5c8c5ac2ee611359cdbb4840/example"
        return new Promise(function(resolve, reject){
            axios({
                method: options.type,
                url: options.url,
                timeout: 5000,
                baseURL
            }).then((res)=>{
                
                if(res.status=="200"){


                    if(res.data.code=="0"){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.data.msg
                        })
                    }

                }else{
                    reject(res) 
                }

            })
        })
    }
}