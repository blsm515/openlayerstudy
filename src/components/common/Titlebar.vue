<template>
	<header class="travelcity">{{title}}</header>
</template>

<script>
	export default{
		props:{
			title:""
		}
	}
</script>

<style>
	.travelcity {
		text-align: center;
		font-size: 1.18rem;
		line-height: 100%;
		font-weight: 700;
		padding: 1.25rem 0.65rem;
	}
	
	.travelcity::after,
	.travelcity::before {
		content: "";
		background-image: url("/footer.svg");
		width: 0.55rem;
		height: 1.62rem;
		display: inline-block;
		height: 0.8rem;
		background-repeat: no-repeat;
		background-size: 0.5rem 0.5rem;
		background-position: 50%;
		margin: 0 1.26rem;
	}
</style>
