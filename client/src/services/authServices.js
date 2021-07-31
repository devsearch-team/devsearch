import devSearchApi from "../config/api"
export async function empLogIn(data) {
	const res= await devSearchApi.post("/employer/auth/signin",data)
	console.log("res",res)
	return {...res.data,isEmployer:true}
	// return {
	// 	username: "Test",
    //     isEmployer:true,
	// 	jwt: "token"
	// }
}
export async function empSignUp(data) {
	const res= await devSearchApi.post("/employer/auth/register",data)
	console.log("res",res)
	return {...res.data,isEmployer:true}
	// return {
	// 	username: "Test",
    //     isEmployer:true,
	// 	jwt: "token"
	// }
}

export async function getEmployer(){
	const res= await devSearchApi.get("/employer/auth/profile")
	console.log("res",res.data)
	return res.data	
}

export async function updateEmployer(data){
	const res= await devSearchApi.put("/employer/auth/profile",data)
	console.log("res",res)
	return res.data
}

export async function seekerLogIn(data) {
	return {
		username: "Test",
        isEmployer:false,
		jwt: "token"
	}
}

export async function seekerSignUp(data) {
	return {
		username: "Test",
        isEmployer:false,
		jwt: "token"
	}
}

export async function logOut(data) {
	return data.userName
}