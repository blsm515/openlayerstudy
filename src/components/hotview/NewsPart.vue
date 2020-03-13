<template>
	<div class="news_part">
		
		<titlebar :title="data.title"></titlebar>
		<div v-for="(item,index) in data.item" class="tab-item"  @click="itemclick(item)">
			<span class="news-num common" :class="{first:index == 0,second:index == 1,third:index == 2}">{{index+1}}</span>
			<a  :href="item.url" class="news-title">{{item.query}}</a>
		</div>
	</div>
</template>

<script>
	import  Titlebar from '../common/Titlebar.vue'
	export default {
		name: "TabControl",
		props: {
			
			data:""
		},
		data(){
			return{
				
			}
		},
		components:{
			Titlebar
		},
		methods:{
			itemclick(item){
				var url=item.url
				
				//this.$emit('tabClick',index)
			}
		}
	}
</script>

<style>
	.news_part{
		
		    margin-top: 2.37rem;
		    margin-bottom: 2.2rem;
		    background-color: #f5f6f7;
		    padding: 0 .625rem .55rem;
		    border-radius: .5rem;
		

	}
	.tab-item{
	height: 45.92px;
	
	line-height: 45.92px;
	color: #000;
	border-bottom: 1px solid rgb(216, 220, 230);
	 
	font-size: 20px;
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
	.news-num{
		 display:inline-block;
		 width: 3%;
		 text-align: left;
		font-weight: 600;
		margin-left: 3px;
		margin-right: 3px;
		
	}
	.news-title{
		text-decoration:none;
		color: #000000;
	}
</style>
