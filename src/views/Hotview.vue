<template>
	<div>
		<news-part v-for="(item) in hot" :data="item"></news-part>
	</div>
	
</template>

<script>
	import  NewsPart from '../components/hotview/NewsPart.vue'
	import  {getHot} from '../net/net.js'
	export default{
	   components:{
		   NewsPart
	   },
	   data(){
		   return {
			   hot:[]
		   }
	   },
	   created() {
	   	 getHot().then( res => this.hot= res.results)
	   }
	   
	}
</script>

<style>
	
</style>
