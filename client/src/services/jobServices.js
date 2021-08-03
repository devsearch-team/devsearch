import devSearchApi from "../config/api"


export async function getJobs(data){
    const res = await devSearchApi.get("/jobs")
    // console.log('res', res)
    return res
}