export default{
    parseData(state) { return (id) => {
		
	//console.log(state.data.find(todo => todo.provinceShortName == id))
	var city= state.data.find(todo => todo.provinceShortName == id)
	if(city!==undefined) {return city["confirmedCount"]}
	else {return ""}
	 
  }} ,
  
  parseProvince(state){
	  return (proname,cityname) => {
		  
	  	var prodata= state.data.find(todo => todo.provinceShortName == proname)
	  	if(prodata!==undefined) { 
			var cities = prodata["cities"]
			var city= cities.find(todo => todo.cityName == cityname)
			if(city!==undefined) {return city["confirmedCount"]}
			else {return ""}
	   }
	  	else {return ""}
	  	 
	  }
	  
  }
  
  //  Goods{
  //     constructor(itemInfo, columns, services){
  //         this.title = itemInfo.title;
  //         this.desc = itemInfo.desc;
  //         this.newPrice = itemInfo.price;
  //         this.oldPrice = itemInfo.oldPrice;
  //         this.discount = itemInfo.discountDesc;
  //         this.columns = columns;
  //         this.services = services;
  //         this.realPrice = itemInfo.lowNowPrice;
  //     }
  // }
}