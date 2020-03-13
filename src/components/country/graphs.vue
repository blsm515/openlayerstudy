<template>
	<div class="graphs">

		<graph :data="data[currentIndex]" class="graph"></graph>



		<!-- <div v-else:"currentIndex===1"></div> -->
		<div class="title">
			<div v-for="(item,index) in title" class="item" @click="itemclick(index)" :class="{active: index === currentIndex}">
				<span class="tab" v-html="item"></span>
			</div>
		</div>
	</div>

</template>

<script>
	import graph from './graph.vue'
	import  {getSum} from '../../net/net.js'
	export default {
		name: "graphs",
		components: {
			graph

		},
		props:{
			//data:[]
		},
		mounted() {
			getSum().then(res => this.data = res.results)
		},
		data() {
			return {
				currentIndex: 0,
				title: ['全国疫情<br/>新增趋势', '全国确诊<br/>疑似趋势', '全国累计<br/>治愈死亡', '治愈率<br/>死亡率'],
				data: []
			}
		},
		methods: {
			itemclick(index) {
				this.currentIndex = index
				console.log(this.data[this.currentIndex])
			}
		}
	}
</script>

<style >
	.title {
		display: flex;
		margin-bottom: 24px;
		margin-top: 9.92px;
		flex-direction:row ;
	}

	.item {
		flex: 1;
		text-align: center;
		font-size: 16px;
		line-height: 24px;
		height:54px;
		vertical-align: middle;
		/* margin:auto auto; */
		background-color: rgb(238, 238, 238);
		margin-left: 4px;
		padding: 3px;
		border-radius: 4.96px;
		

	}

	.active {
		background-color: rgb(0, 190, 199);
		position: relative;
	}

	.active::before {
		content: "";
		display: block;
		
		width: 0;
		height: 0;
		position: absolute;
		border-right: 6px solid transparent;

		border-left: 6px solid transparent;

		border-bottom: 4px solid rgb(0, 190, 199);
		top: -6px;
		right: 50%;
	}

	.graph {
		border-bottom-left-radius: 4.96px;
		border-bottom-right-radius: 4.96px;
		border-top-right-radius: 4.96px;
		border-top-left-radius: 4.96px;
		border: 1px solid rgb(238, 238, 238);
		padding-left: 10px;
		padding-right: 6px;
	}

	.graphs {
		margin-top: 29.92px;
		margin-bottom: 33.92px;
	}
</style>
