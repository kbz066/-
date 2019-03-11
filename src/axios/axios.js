import axios from 'axios'


export default class Axios {


    static axiosRequest(options) {
        return axios({
            method: options.type,
            url: options.url,

        })
    }

    static async request(options) {

        try {
            return await this.axiosRequest(options)
        } catch (e) {

            return {
                status: -1
            }
        }
    }
}