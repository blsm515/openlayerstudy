import axios from 'axios'

export function request(config){
	const instance = axios.create({
		baseURL: 'http://localhost:8080',
		timeout:5000
	})
	
	// instance(config)
	//  .then(res => {
		
	// 	success(res)
	// })
	// .catch(err => {
		
	// 	failure(err)
	// })
	
	instance.interceptors.request.use(config => {
	  return config
	}, err => {
	  // console.log(err);
	})
	instance.interceptors.response.use(res => {
	  return res.data
	}, err => {
	  console.log(err);
	})
	
	// 3.发送真正的网络请求
	return instance(config)
}