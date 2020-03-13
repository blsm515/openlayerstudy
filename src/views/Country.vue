<template>
	<div>		
		
		<tabley :list="list" title="国内疫情"></tabley>
		<china-map></china-map>
		<graphs></graphs>
		<province-data></province-data>
		
	</div>

</template>

<script>
	import  ChinaMap from '../components/country/ChinaMap.vue'
	import  ProvinceData from '../components/country/ProvinceData.vue'
	import  tabley from '../components/common/Tabley.vue'
	import  graphs from '../components/country/graphs.vue'
	import  {getData} from '../net/net.js'
	import  {getArea} from '../net/net.js'
	import { mapGetters } from 'vuex'
	export default {
		name: "country",
		
		data(){
			return{
				data:null,
				list:[66577,8969,8232,1524]
			}
		},
		computed: {
			confirmedCount(){
		    return this.$store.getters.parseData("湖北")
			}
			
			},
		components:{
			 ChinaMap,
			 graphs,
			 tabley,
			 ProvinceData
		},
		created() {
			getArea().then(res => {
				
			     this.$store.commit("update", res.results)
			})
					
		},
		methods:{
			
	}}
</script>

<style>
	
</style>
