<template>
	<div class="travel">
		<titlebar title="全国迁徙城市热门"></titlebar>
		<div class="selectbox">
			<div v-for="(item,index) in label" class="selectlabel" :class="{activelabel: index === currentindex}" @click="select(index)">
				{{item}}</div>

		</div>
		<table  class="city_tb">

			<tr class="city_tr">
				<th class=" rank" >排名</th>
				<th class="" colspan="1">城市名称</th>
				<th class="p" v-if="currentindex == 0">迁入比例</th>
				<th class="p" v-else>迁出比例</th>
			</tr>
			<tbody v-for="(item ,index) in top[currentindex]" >
				<tr  @click="detail(item)" class="city_td">
					<td class="rank common" :class="{first:index == 0,second:index == 1,third:index == 2}" >{{index+1}}</td>
					<td class="city">{{item["city"]}}</td>
					<td class="p">{{item["p"]}}</span></td>
				</tr>


			</tbody>

		</table>
		
	</div>



</template>

<script>
	import  Titlebar from '../components/common/Titlebar.vue'
	import  {getTravel} from '../net/net.js'
	export default {
		name: "travel",
		components:{
			Titlebar
		},
		created() {
			getTravel().then( res => this.top= res.results)
		},
		data() {
			return {
				top: [],
				label: ["热门迁入地", "热门迁出地"],
				currentindex: 0,

			}
		},
		methods: {
			detail(item) {
				// this.$router.push({
				// 	path: '/travel.html',
				// 	query: {
				// 		name: item["city"]

				// 	}
				// })
                  window.location = "/travel.html?city="+item["city"]
			},
			select(index) {
				this.currentindex = index;

			}
		}

	}
</script>

<style >
	.travel {

		margin-top: 1rem;
		margin-bottom: 2.2rem;
		background-color: #f5f6f7;
		padding: 0 .625rem .55rem;
		border-radius: .5rem;


	}

	

	.selectbox {
		display: flex;
		height: 2.5rem;
		box-sizing: border-box;
		
		margin: 1.075rem 0 .45rem;
		background: #e3e6eb;
		border-radius: 6px;
	}

	.selectlabel {
		flex: 1;
		font-size: 16px;
		text-align: center;
		line-height: 2.1rem;
		height: 100%;
		color: #000000;

		border-radius: 6px;
	}

	.activelabel {
		background-color: #fff;
		font-weight: bold;
		padding: 2px;
	}
	.city_tb{
	    
		width: 100%;
	}
	.city_tr {
		height: 2.87rem;
		line-height: 2.87rem;
		border-bottom: 1px solid rgb(216, 220, 230);
		color: #48494d !important;
		text-align: left;
	}
	.city_td{
		height: 45.92px;
		font-weight: 600;
		
		color: #48494d;
		border-bottom: 1px solid rgb(216, 220, 230);
		vertical-align: middle;
		
		font-size: 20px;
	}
	.rank{
		 width: 11%;
		 text-align: left;
		
	}
	.city{
		 width: 78%;
		  text-align:center;
	}
	.p{
		text-align: center;
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
