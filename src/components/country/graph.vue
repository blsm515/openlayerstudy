<template>
	<div>
		<div id="main" ref="graph"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "graph",
		props: {
			data:""
		},
		mounted() {
			// this.newGraph()
			// let that =this;
			// this.$nextTick(function () {
			// 	    console.log(1)
			//          that.newGraph()
			// })
		},
		watch:{
			data:{
				handler(newValue,oldValue){
					this.newGraph()
				},
				deep:true
			}
		},
		methods: {
			newGraph() {
				console.log(this.$refs.graph)
				echarts.init(this.$refs.graph).setOption({
					title: {
						text:  this.data.title
					},
					legend: {
						type: "plain",
						orient: "vertical",
						left: "right",
						top: "top",
						show: true,
						data: [{
							name: this.data.name1,
							// 强制设置图形为圆。
							icon: 'circle',
							// 设置文本为红色
							textStyle: {
								color: 'red'
							}
						}, {
							name: this.data.name2,
							// 强制设置图形为圆。
							icon: 'circle',
							// 设置文本为红色
							textStyle: {
								color: 'blue'

							}
						}]
					},
					tooltip: {
						trigger: 'item',
						axisPointer: {
							type: 'cross',
							 axis :'x'
						}
					},

					dataset: {
						source: this.data.source,

					},
					//data:['2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9','2.10','2.11'
					xAxis: {
						type: "category"
					},
					yAxis: {},
					series: [{
						name:  this.data.name1,
						type: 'line',
						smooth: true,
						encode: {
							x: 0,
							y: 1
						}
					}, {
						name:  this.data.name2,
						type: 'line',
						smooth: true,
						encode: {
							x: 0,
							y: 2
						}
					}]
				})
			}
		}

	}
</script>

<style>
	#main {
		width:100% ;
		height:579px;
		
	}
</style>
