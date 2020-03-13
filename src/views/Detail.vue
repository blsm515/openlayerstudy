<template>
	<div>	
		
		<tabley :list="list" title="省内疫情"></tabley>
		<pro-map></pro-map>
		
	</div>
	
</template>

<script>
	import  tabley from '../components/common/Tabley.vue'
	import  ProMap from '../components/detail/ProMap.vue'
	
	import { mapGetters } from 'vuex'
	export default {
		name: "detail",
		
		data(){
			return{
				pro:"山西",
				list:[132,11,76,0],
				active: 0
			}
			
		},
		created(){
			if(this.$route.query.name!= null){
				this.pro = this.$route.query.name
			}
			},
		components:{
				 ProMap,
				 tabley,
				
			},
		handleSelect:{
			
		}
			
			}
</script>

<style>
</style>
