<template>
	<div id="app" class="app">
		
		<header class="header">
			<h3 class="v1" >新型冠状病毒肺炎</h3>
			<h1 class="v2" text="疫情大数据报告" >疫情大数据报告</h1>
			<!-- <div class="visited">共        人次已浏览</div> -->
		</header>
		<section>

			<navbar></navbar>
			<router-view></router-view>
			
		</section>
		<foottab></foottab>
		
	</div>

</template>

<script>
	
	import navbar from './components/common/navbar.vue'
	import foottab from './components/common/footer.vue'
	export default {
		name: 'App',
		components: {
			
			navbar,
			foottab
		}
	}
</script>

<style>
	html{
		font-size: 16px;
	}
	.app{
		background-color:  #10aeb5
	}
	.header {
		
		background-position: 50% 50%;
		margin: auto auto;
		background-image: url("/header1.png");
		height: 187px;
		width: 768px;
	    background-repeat: no-repeat;
		

		background-size: 695px 189px;
	}

	h3 {
		color: rgb(196, 250, 255);
		margin-left: 17px;
		padding-top: 67px;
		font-weight: 400;
		font-size: 20px;
	}

	h1 {

		padding-left: 17px;

		font-size: 40px;
		

		font-weight: 700;
		position: relative;
		max-width: 100%;
		line-height: 1.5rem;
		white-space: nowrap;
         
		color: #fff;

		

	}

	h1[text]::after {
		content:  attr(text);
		display: block;
		position: absolute;
		color: #afdade;
		top: 0;
		  -webkit-mask: linear-gradient(to right, red, blue);
	}

	section {
		border-radius: 9.92px;
		
		margin: auto auto;
		width: 768px;
		padding-top:14.56px ;
		padding-bottom:14.56px ;
		padding-left:16.96px ;
		padding-right:16.96px ;
		margin-top: 2px;
		background-color: white;
		height: auto;
		margin-bottom: 20px;
	}
	.visited{
		    display:inline-block;
		    margin-top:17px;
		    margin-left: 17px;
		    
		    padding: 5px;
		    background-color: rgba(9, 148, 167, 0.5);
		    border-radius: .71875rem;
		    font-size:16px;
			white-space: pre;
			
		

	}
	footer{
		text-align: center;
		
	}
	body{
		background-color:  #10aeb5
	}
</style>
