<template>
	<div>
	<table>
		
			<tr class="tr" >
				<th class="th" v-for="(item) in title">
				     {{item}}
				</th>
			</tr>
		
		<tbody >
			<tr v-for="(item) in prodata"  @click="itemclick(index)" class="tr" >
			<td  class="data province">
				<div  ><span>{{item["provinceShortName"]}}</span></div>
			</td>
			<td class="data">{{item["confirmedCount"]}}</td>
			<td  class="data">{{item["curedCount"]}}</td>
			<td class="data">{{item["deadCount"]}}</td>
			</tr>
			
			
			
		</tbody>
		
	</table>
	</div>
	
	
</template>

<script>
	export default {
		name:"provincedata",
		data(){
			 return{
			      title:["地区","确诊","治愈","死亡"]
			 }
			
		},
		computed:{
			 prodata(){
				 return this.$store.state.data
			 }
		},
		methods:{
			
		}
	}
</script>

<style >
	.th{
		font-size: 14px;
		flex: 1;
		text-align: center;
		margin-left: 4px;
		padding: 3px;
	}
	.tr {
		display: flex;
		margin-bottom: 10px;
		margin-top: 9.92px;
		flex-direction:row ;
		width: 734px;
		height: 40px;
		
	}
	.data{
		font-size: 18px;
		
		flex: 1;
		text-align: center;
		margin-left: 4px;
		padding: 3px;
		background-color: rgb(238, 238, 238);
		margin-top: 4px;
		border-radius: 5px;
		line-height: 29.92px;
	}
	.province{
		background-color: rgb(0, 190, 199);
		color: white;
	}
</style>
