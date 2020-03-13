import Vue from "vue"
import VueRouter from "vue-router"
const routerPush =  VueRouter.prototype.push
 VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}


const Country = () => import('../views/Country')
const Detail = () => import('../views/Detail')
const Travel = () => import('../views/Travel')
//const TravelPro = () => import('../views/TravelPro')
const News = () => import('../views/News')
const Hotview = () => import('../views/Hotview')
Vue.use(VueRouter)

const routes = [{
		path: '',
		redirect: '/country'
	},
	{
		path: '/country',
		component: Country
	},{
		path: '/detail',
		component: Detail
	},
	{
		path: '/travelpro',
		beforeEnter(to,from,next){
			window.location = "/travel.html"
		}
	},{
		path: '/travel',
		component:Travel
	},
	{
		path: '/news',
		component:News
	},
	{
		path: '/hotview',
		component:Hotview
	}

]
const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router
