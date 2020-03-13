<template>
	<div>
		<div class="yq">实时播报</div>
		<time-bar :news="news" class="timebar"></time-bar>
	</div>
	
</template>

<script>
	import TimeBar from '../components/news/timebar.vue'
	
	import  {getNews} from '../net/net.js'
	export default{
		components:{
			TimeBar
		},
		data(){
			return{
				news:[]
			}
		},
		mounted() {
			for(let item of news.item){
				var time = item.eventTime
				console.log(time)
				time = new Date(time* 1000)
				
				let date =  this.formatDate(time,"yyyy年MM月dd日 hh:mm")
				console.log(date)
				item.eventTime = date
				
			}
			console.log(1)
			
			
			
		},
		created(){
			getNews().then( res => this.news= res.results)
		},
		methods:{
			 formatDate(date, fmt) {
				 function padLeftZero (str) {
				   return ('00' + str).substr(str.length);
				 };
				//RegExp.$1拿到的y+,按位数截取替换成年份
			  if (/(y+)/.test(fmt)) {
			    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			  }
			  let o = {
			    'M+': date.getMonth() + 1,
			    'd+': date.getDate(),
			    'h+': date.getHours(),
			    'm+': date.getMinutes(),
			    's+': date.getSeconds()
			  };
			  for (let k in o) {
			    if (new RegExp(`(${k})`).test(fmt)) {
			      let str = o[k] + '';
			      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			    }
			  }
			  return fmt;
			}
	},
	}
</script>

<style>
	.yq{
		font-weight: 700;
		font-size: 18.86px;
		font-family: Arial;
		margin-top: 10px;
		margin-left: 40px;
		
	}
	
</style>
