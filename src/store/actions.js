import{
	ADD_COUNTER,
	 ADD_TO_CART
} from './types.js'

export default{
	addCart(context, payload) {
		//也可以用indexof index = state.cartList.indexOf(payload)
		// let old = null;
		// for(let item of state.cartList){
		// 	if (item.iid === payload.iid){
		// 		old = item
		// 	}
		// }
		// return new Promise((resolve,reject) => {
		// 	let old = context.state.cartList.find(item => item.iid === payload.iid)
		// 	if (old){
		// 		context.commit(ADD_COUNTER, old)
		// 		resolve('+1')
		// 	}else {
		// 		payload.count =1
		// 		context.commit(ADD_TO_CART,payload)
		// 		resolve("success")
		// 	}
		// })
		
		
	}
}