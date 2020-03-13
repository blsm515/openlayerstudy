<template>
	<div>
		<div class="yq">{{title}}</div>
		<div class="time"><span>更新至 2020.02.10 13:58</span></div>
		<div class="table">
			<table>
				
				<tr>
					<td>
						<div class="sub">
							<div class="qz">{{list[0]}}</div>
							<div class="sum">确诊病例</div>
						</div>
					</td>
					<td>
						<div class="VirusSummary_1-1-156_2PXtvM">
							<div class="ys">{{list[1]}}</div>
							<div class="sum">疑似病例</div>
							
						</div>
					</td>
					<td>
						<div class="VirusSummary_1-1-156_2ahJaj">
							<div class="zy">{{list[2]}}</div>
							<div class="sum">治愈病例</div>
							
						</div>
					</td>
					<td>
						<div class="VirusSummary_1-1-156_28rIkx">
							<div class="sw">{{list[3]}}</div>
							<div class="sum">死亡病例</div></div>	
					</td>
				</tr>
			</table>
			
		</div>
		
	</div>
</template>

<script>
	export default {
		name :"table",
		props:{
			list:{
				type: Array,
				default:[]
			},
			title:""
		}
	}
</script>

<style >
	.yq{
		font-weight: 700;
		font-size: 18.86px;
		font-family: Arial;
		margin-top: 10px;
		
	}
	
	.time{
		color: rgb(153, 153, 153);
		font-family: Arial;
		font-size: 12.93px;
	}
	
	.table{
		margin-top: 16px ;
		margin-buttom:20px;
		padding-top: 14.88px;
		padding-bottom: 14.88px;
		background-color: rgb(245, 246, 247);
		border-bottom-left-radius: 4.96px;
		border-bottom-right-radius: 4.96px;
		border-top-right-radius: 4.96px;
		border-top-left-radius: 4.96px;
	}
	table{
		width: 734.08px;
	}
	tr{
		margin: auto;
	}
	td{
		width:25%;
		font-size: 20.93px;
		margin-top: 9.92px;
		
		text-align:center;
		vertical-align:middle;
	}
	.sum{
		line-height: 14.88px;
		font-size: 14.86px;
		
	}
	.qz{
		
		color: rgb(232, 49, 50);
		
	}
	.ys{
		color: rgb(255, 106, 87);
	}
	.sw{
		color: rgb(51, 51, 51);
		
	}
	.zy{
		color: rgb(16, 174, 181);
	}
	
	.sub{
		margin: auto auto;
	}
</style>
