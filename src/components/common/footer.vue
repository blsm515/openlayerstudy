<template>
	<div class="footer"><span class="part"></span>
	<span>积极防护，保护自己，戴口罩，勤洗手</span><span class="part"></span>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tip:"积极防护，保护自己，戴口罩，勤洗手"
			}
		}
	}
</script>

<style>
	.footer{
		
		    background-color: #fff;
		    border-radius: .5rem;
		    padding: 14.56px;
		    line-height:  40px;
		    display: flex;
		    font-weight: 700;
		    font-size: 16px;
			margin: 0 auto;
			height: 40px;
			width: 768px;
			background-color: rgb(255, 255, 255);
			border-radius: 8px;
			margin-bottom: 42px;
	
	}
	
	.part{
		flex:1;
		background-image: url("/header1.png");
		background-size: 8px 8px;
		background-position-y: center;
		background-position-x: 50%;
		background-repeat: no-repeat;
	}
</style>
