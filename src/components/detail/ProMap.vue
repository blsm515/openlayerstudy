<template>
	<div>
		<div id="map" class="map">
			<div id="popup" class="ol-popup">
				<a href="#" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content"></div>
			</div>
			<div id="layerControl" class="layerControl">
			      <ul id="layerTree" class="layerTree" v-for="(item,index) in layername">
					  <li><input type="checkbox" name="layer" :id="index" :value="item" @change="showLayer(index)" v-model="state[index]"/>{{item}}</li>
				  </ul>
			        
			</div>
			
		</div>
		


	</div>

</template>

<script>
	import Map from 'ol/Map.js';
	import View from 'ol/View.js';
	import {
		defaults as defaultControls,
		Attribution
	} from 'ol/control.js';

	import OSM from 'ol/source/OSM.js';
	import 'ol/ol.css';

	import {
		equalTo as equalToFilter,
		like as likeFilter,

	} from 'ol/format/filter';

	import {
		Tile as TileLayer,
		Vector as VectorLayer,
		Heatmap as HeatmapLayer
	} from 'ol/layer';
	import {
		bbox as bboxStrategy
	} from 'ol/loadingstrategy';
	import BingMaps from 'ol/source/BingMaps';
	import VectorSource from 'ol/source/Vector';
	import {
		Stroke,
		Style,
		Icon,
		Text,
		Fill
	} from 'ol/style';
	import {
		WFS,
		GeoJSON
	} from 'ol/format';
	import Overlay from 'ol/Overlay';
	import KML from 'ol/format/KML';
	export default {
		name: 'promap',
		props: {
			pro: {
				type: String,
				default () {
					return "山西省";
				}
			}
		},
		data() {
			return {
				map: "",
				layers: [],
				layername:["定点医院","疫情小区","热力图"],
				_this:this,
				state:[false,false,false]
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			showLayer(index){
				var layer = this.layers[index]
				if(this.state[index] == true){
					layer.setVisible(true)
				}else{
					layer.setVisible(false)
				}
			},
			
			styleFunction(feature) {

				const name = feature.get('NAME');
				const color = this.getColor(name);
				return new Style({

					stroke: new Stroke({
						color: 'rgba(0, 0, 255, 1.0)',
						width: 2
					}),
					fill: new Fill({
						color: color
					}),
					text: new Text({
						// font: '15px Microsoft YaHei',
						text: name,
						fill: new Fill({
							color: '#222'
						})
					})
				})

			},
			getCount(str) {
				return this.$store.getters.parseProvince(this.pro, str)
			},
			getColor(str) {
				var num = this.$store.getters.parseProvince(this.pro, str)
				var f = Number(num)
				console.log(f)
				if (f >= 10000) {

					return "rgba(137,17,20,1)"
				} else if (f < 10000 && f > 1000) {
					return "rgba(255,48,48,1)"
				} else if (f < 1000 && f > 100) {
					return "rgba(215,81,84,1)"
				} else if (f < 100 && f > 10) {
					return "rgba(255,100,97,0.5)"
				} else {

					return "rgba(219,197,197,1)"
				}

			},

			init() {
				var vector = new HeatmapLayer({
				  source: new VectorSource({
				    url: '/disease.json',
				    format: new GeoJSON({
				               extractStyles: false
				             })
				  }),
				  // blur: 10,
				  // radius: 10,
				  gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
				  zIndex: 3
				});
				// var vector = new VectorLayer({
				//   source: new VectorSource({
				//     url: 'data/disease.json',
				//     format:  new GeoJSON()
				//   }),
				  
				// });
				

				
				var map = new Map({
					layers: [],
					target: 'map',
					
					view: new View({
						projection: 'EPSG:4326',
						center: [116, 39],
						maxZoom: 19,
						zoom: 12

					})
				});
				map.addLayer(vector)
			    this.map=map
				var hospStyle = new Style({
						image: new Icon(({
							src: "/hosp.png"
						}))
							
				})
				var hosp = {
					srsName: 'EPSG:4326',
					featureNS: 'http://www.opengeospatial.net/cite',
					featurePrefix: 'cite',
					featureTypes: ['hosp'],
					outputFormat: 'application/json',
				
						
				};
				var pro={
						srsName: 'EPSG:4326',
						featureNS: 'http://www.opengeospatial.net/cite',
						featurePrefix: 'cite',
						featureTypes: ['cn'],
						outputFormat: 'application/json',
						filter: equalToFilter('F4', '山西省')
					
					};		
				this.setFeature(map,this.styleFunction,0,true,pro)
				this.setFeature(map,hospStyle,1,false,hosp)
				//this.setFeature(map,vectorSource,featureRequest)
				this.setOverlay(map)
                 console.log(map.getLayers())


			
			},
			setOverlay(map){
				var container = document.getElementById('popup');
				var content = document.getElementById('popup-content');
				var closer = document.getElementById('popup-closer');
				
				var overlay = new Overlay({
					element: container,
					autoPan: true,
					autoPanAnimation: {
						duration: 250
					}
				});
				
				closer.onclick = function() {
					overlay.setPosition(undefined);
					closer.blur();
					return false;
				};
				map.addOverlay(overlay)
				
				map.on('singleclick', (evt) =>{
					var coordinate = evt.coordinate;
				
					var features = map.getFeaturesAtPixel(evt.pixel);
					if (features.length == 0) {
				
						return;
					}
					var properties = features[0].getProperties();
					//console.log(properties)
					var num = this.getCount(properties["CityNameC"])
					console.log(num)
					content.innerHTML = '<span class="title">' + properties["CityNameC"] +
						'  </span><span>' + num +
						'</span>';
					overlay.setPosition(coordinate);
				});
				
			},
			
			setFeature(map,style,zIndex,f,layer){
				const that = this;
				var vectorSource = new VectorSource();
				var v = new VectorLayer({
					source:  vectorSource,
					style: style,
					zIndex: zIndex,
					visible:f
				});
				var featureRequest = new WFS().writeGetFeature(layer);
				
				// then post the request and add the received features to a layer
				fetch('http://localhost:8081/geoserver/wfs', {
					method: 'POST',
					body: new XMLSerializer().serializeToString(featureRequest)
				}).then(function(response) {
					return response.json();
				}).then(function(json) {
				
					var features = new GeoJSON().readFeatures(json);
					console.log(features)
					vectorSource.addFeatures(features);
					//vectorSource.setStyle(that.styleFunction(feature));
					console.log(v)
					map.addLayer(v)
					if(!f){
						that.layers.push(v)
					}
					map.getView().fit(vectorSource.getExtent());
				
				});
			}
		}
	}
</script>

<style scoped>
	.map {
		width: 100%;
		height: 700px;
		position: relative;
	}


	.ol-popup {
		position: absolute;
		background-color: white;
		-webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
		filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #cccccc;
		bottom: 12px;
		/* left: -50px; */
		min-width: 420px;
	}

	.ol-popup:after,
	.ol-popup:before {
		top: 100%;
		border: solid transparent;
		content: " ";
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
	}

	.ol-popup:after {
		border-top-color: white;
		border-width: 10px;
		left: 48px;
		margin-left: -10px;
	}

	.ol-popup:before {
		border-top-color: #cccccc;
		border-width: 11px;
		left: 48px;
		margin-left: -11px;
	}

	.ol-popup-closer {
		text-decoration: none;
		position: absolute;
		top: 2px;
		right: 8px;
	}

	.ol-popup-closer:after {
		content: "✖";
	}

	.title {
		font-size: 22px;
		font-weight: bold;
	}
	
	 .layerControl {
	            position: absolute;
	            bottom: 5px;
	            min-width: 200px;
	            max-height: 200px;
	            right: 0px;
	            top: 5px;
	            z-index: 2001;
	            /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
	            color: #ffffff;
	            background-color: #4c4e5a;
	            border-width: 10px;
	            /*边缘的宽度*/
	            border-radius: 10px;
	            /*圆角的大小 */
	            border-color: #000 #000 #000 #000;
	            /*边框颜色*/
	        }
	
	        
	
	        .layerTree li {
	            list-style: none;
	            margin: 5px 10px;
	        }

</style>
