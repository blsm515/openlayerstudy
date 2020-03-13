<template>
	<div class="timebar">
	  <el-timeline >
	    <el-timeline-item v-for="(item,index) in news" :timestamp="item.eventTime" placement="top"  color="#afdade" class="el-timeline-item__timestamp">
	      <el-card class="el-card__body">
			  <a :href="item.eventUrl" >
	        <div class="time_news">{{item["eventDescription"]}}</div>
			</a>
	      </el-card>
	    </el-timeline-item>
	    
	  </el-timeline>
	</div>
</template>

<script>
	
	export default{
		data(){
			return {
				color:"#afdade"
			}
		},
		props:{
			news: ""
		},
		methods:{
			timestamp(eventTime){
				var commonTime = new Date(eventTime* 1000).toLocaleString()
				console.log(commonTime)
			}
		}
	}
</script>

<style>
	.timebar{
		margin: 30px;
	}
	.el-timeline-item__timestamp{
		font-size: 16px;
		margin: 10px; 
	}
	.el-card__body {
	    padding: .5rem .625rem;
	   
	    background: #f5f6f7;
	    border-radius: .27rem;
	   
	    

	}
	.time_news{
		color: #4d5054;
		 font-weight: 800;
		  line-height: 1.62rem;
		  font-size: 16px;
	}
	
	a{
		text-decoration: none;
	}

</style>
