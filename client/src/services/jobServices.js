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
export async function updateJob(data){
    const res = await devSearchApi.put(`/jobs/${data.id}`,data)
    // console.log("message", res)
    return res
}

export async function getEmployerJobs(page){
    const res = await devSearchApi.get(`/jobs/myjobs?page=${page}`)
    // console.log("message", res)
    return res
}

export async function createJob(data){
    const res = await devSearchApi.post('/jobs/',data)
    // console.log("new added job",data)
    return res
}

