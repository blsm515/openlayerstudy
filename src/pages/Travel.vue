<template>
	
		<div>
			<travel-map :city="title">
					  <h2 class="mgs-list-title">迁入{{title}}来源地</h2>
			</travel-map>
			<travel-table class="table"> </travel-table>
			
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
				title:this.$route.query["city"]
			}
		}
	}
</script>

<style>
	
	body{
		background-color:  #000000;
	}
	.table{
		background-color: #000000;
		color: #FFFFFF;
		position: fixed;
		left: 10px;
		top: 10px;
		width: 30%;
		opacity: 0.8;
		margin: 3px;
		border: 2px solid #000000;
		height: 70vh;
	}
</style>
