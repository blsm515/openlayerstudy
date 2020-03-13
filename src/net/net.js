import {
 	request
 } from './request.js'
 export function getData(that) {

 	return fetch("http://localhost:8080/area").then(response => {
 			let data = response.json();
 			return data
 		})
 		.then(data => {
 			console.log(data)
 			that.$store.commit("update", data.results)
 		})

 		.catch(e => console.log(" error", e))
 }

 export function getArea() {
 	return request({
 		url: 'area',

 	})
 }
 export function getSum() {
 	return request({
 		url: 'sum',
 
 	})
	}
  export function getHot() {
 	return request({
 		url: 'hot',
 
 	})
 }
 export function getTravel() {
 	return request({
 		url: 'traveldata',
 
 	})
 }
 
 export function getNews() {
 	return request({
 		url: 'newsdata',
 
 	})
 }
