<template>
	<div class="mgs-list" style="visibility: visible;">
		<h2 class="mgs-list-title">迁入{{title}}来源地</h2>
	
	  <travel-map :city="title"></travel-map>
		<travel-table></travel-table>
				
		</div>
	

</template>

<script>
	import  TravelTable from '../components/TravelPro/TravelTable.vue'
	import  TravelGraph from '../components/TravelPro/TravelGraph.vue'
	import  TravelMap from '../components/TravelPro/TravelMap.vue'
	export default {
		name: "travelpro",
		components:{
			TravelGraph,
			 TravelMap ,
			 TravelTable
		},
		data(){
			return {
				title:this.$route.query["name"]
			}
		}
	}
</script>

<style>
	
</style>
