<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" class="tab-bar-item" :class="{active: index === currentindex}" @click="itemclick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props: {
			
			titles: {
				type: Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return{
				currentindex: 0
			}
		},
		methods:{
			itemclick(index){
				this.currentindex = index;
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: white;
	}
	
	.tab-bar-item {
		flex: 1;
	}
	
	.active{
		color: pink;
	}
	
	.active span{
		border-bottom: 3px solid pink;
	}
</style>
