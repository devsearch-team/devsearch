import devSearchApi from "../config/api"


export async function getJobs(){
    const res = await devSearchApi.get("/jobs")
    // console.log('res', res)
    return res
}

export async function getJob(id){
    const res = await devSearchApi.get(`/jobs/${id}`)
    // console.log("message", res)
    return res
}

export async function getEmployerJobs(){
    const res = await devSearchApi.get("/myjobs")
    // console.log("message", res)
    return res
}