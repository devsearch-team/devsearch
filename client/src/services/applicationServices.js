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
     //console.log('res', res)
    return res
}

export async function seekerAccept(data){
    console.log("seeker req data",data)
    const res = await devSearchApi.post(`/seeker/seekeraccept/${data.id}`,data.payload)
    console.log("seeker accepted app is",res.data)
    return res
}
export async function seekerReject(data){
    console.log("seeker req data",data)
    const res = await devSearchApi.post(`/seeker/seekerreject/${data.id}`,data.payload)
    console.log("seeker rejected app is",res.data)
    return res
}
//employer-----------------------------------------------------
export async function getEmpApplications(stage){
    const res = await devSearchApi.get(`/employer/applications/?currentStage=${stage}`)
     //console.log('res', res)
    return res
}

export async function empAccept(data){
    console.log("req data",data)
    const res = await devSearchApi.post(`/employer/empaccept/${data.id}`,data.payload)
    console.log("accepted app is",res.data)
    return res
}