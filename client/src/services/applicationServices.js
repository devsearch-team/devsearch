import devSearchApi from "../config/api"

export async function createApplication(data){
    console.log("payload",data)
    const res = await devSearchApi.post(`/seeker/applications`,data)
    // console.log('res', res)
    return res
}