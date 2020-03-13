<template>
	<div>
  
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
		 text-color="rgb(0,0,0)" active-text-color="rgb(16, 174, 181)" >

			<el-menu-item index="1" keyPath="/country" ><span class="menuitem">全国疫情</span></el-menu-item>
			<el-menu-item index="2" path="/detail"><span class="menuitem">迁徙地图</span></el-menu-item>
			<el-menu-item index="3" ><span class="menuitem">全民热搜</span></el-menu-item>
			<el-menu-item index="4" ><span class="menuitem">实时播报</span></el-menu-item>
		</el-menu>
	</div>

</template>

<script>
	export default {
		name: 'navbar',
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {

				switch (key) {
					case '1':
						this.$router.replace("/country");
						break;
					case '3':
						this.$router.replace("/hotview");
						break;
					case '2':
					    this.$router.replace("/travel");
						break;
					case '4':
						this.$router.replace("/news");
						break;
				}

			}
		}
	}
</script>

<style>
	.el-menu-demo{
		display: flex;
		font-size: 18px;
	}
	.el-menu-item{
		flex: 1;
		
		
		text-align: center;
	}
.menuitem{
	font-size: 18px;
	font-weight: 400;
}
</style>
