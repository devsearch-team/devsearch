import devSearchApi from "../config/api"

//seeker--------------------------------------------------------
export async function createApplication(data){
    console.log("payload",data)
    const res = await devSearchApi.post(`/seeker/applications`,data)
    // console.log('res', res)
    return res
}

export async function getSeekerApplications(stage){
    const res = await devSearchApi.get(`/seeker/applications/?currentStage=${stage}`)
     console.log('res', res)
    return res
}


//employer-----------------------------------------------------
export async function getEmpApplications(stage){
    const res = await devSearchApi.get(`/employer/applications/?currentStage=${stage}`)
     console.log('res', res)
    return res
}