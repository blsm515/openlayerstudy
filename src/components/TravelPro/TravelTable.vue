<template>
	<table class="city_tb">
		<thead>
			<tr>
				<th class=" rank" ></th>
				<th class="name">名称</th>
				<th class=" p">比例</th>
			</tr>
		</thead>
		<tbody class="city_tr">
			<tr v-for="(item,index) in city" class="city_td">
				<td class="rank common" :class="{first:index == 0,second:index == 1,third:index == 2}">{{index+1}}</td>
				<td  class="name">
					<div>{{item["province_name"]}}</div>
				</td>
				<td class="p">{{item["value"]}} </td>
			</tr>
		</tbody>
	</table>

</template>

<script>
	import data from './t.json'
	export default {
		data() {
			return {
				city: data.moveLines
			}
		},

	}
</script>

<style>
	
	.city_tb{
	    
		width: 90%;
		box-sizing:border-box;
		text-align: center;
		border-collapse: collapse;
		table-layout: fixed;
		margin: 4px ;
		padding: 4px;
		
	}
	.city_tr {
		height: 2.87rem;
		line-height: 2.87rem;
		border-bottom: 1px solid rgb(216, 220, 230);
		color: #48494d !important;
		text-align: center;
		margin: 10px ;
	}
	.city_td{
		height:20px;
		font-weight:500;
		margin: 5px ;
		color: white;
		border-bottom: 1px solid rgb(216, 220, 230);
		vertical-align: middle;
		
		font-size: 14px;
	}
	.rank{
		 width: 11%;
		 text-align: left;
		
	}
	.name{
		 width: 68%;
		 text-align: center;
	}
	.p{
		
	}
	
	.common{
		 color:  rgb(216, 220, 230);
	}
	.first{
		 color:  red;
	}
	.second{
		 color: #f60;
	}
	.third{
		 color: #faa90e;
	}
</style>
