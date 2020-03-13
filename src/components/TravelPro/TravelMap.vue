<template>
	
	<div class="map" id="map"></div>
</template>

<script>
	import {
		Map,
		View
	} from 'ol';
	import {
		Tile as TileLayer,
		Vector as VectorLayer
	} from 'ol/layer';
	import XYZ from 'ol/source/XYZ';
	import Point from 'ol/geom/Point';
	import VectorSource from 'ol/source/Vector';
	
	import Feature from 'ol/Feature';
	import * as turf from '@turf/turf'
	import GeoJSON from 'ol/format/GeoJSON'
	import {
		getVectorContext
	} from 'ol/render';
	import Style from 'ol/style/Style';
	import Stroke from 'ol/style/Stroke';
	import Fill from 'ol/style/Fill';
	import CircleStyle from 'ol/style/Circle';
	import data from './t.json'
	import OSM from 'ol/source/OSM.js';
	import {defaults as control} from 'ol/control.js'
	import {
		WFS
	} from 'ol/format';
	import {
		defaults
	} from 'ol/interaction';
	export default {
		props:{
			city:""
		},
		data(){
			return {
				map: "",
				chinaGeoCoordMap:{
					'黑龙江': [127.9688, 45.368],
					'内蒙古': [110.3467, 41.4899],
					"吉林": [125.8154, 44.2584],
					'北京': [116.4551, 40.2539],
					"辽宁": [123.1238, 42.1216],
					"河北": [114.4995, 38.1006],
					"天津": [117.4219, 39.4189],
					"山西": [112.3352, 37.9413],
					"陕西": [109.1162, 34.2004],
					"甘肃": [103.5901, 36.3043],
					"宁夏": [106.3586, 38.1775],
					"青海": [101.4038, 36.8207],
					"新疆": [87.9236, 43.5883],
					"西藏": [91.11, 29.97],
					"四川": [103.9526, 30.7617],
					"重庆": [108.384366, 30.439702],
					"山东": [117.1582, 36.8701],
					"河南": [113.4668, 34.6234],
					"江苏": [118.8062, 31.9208],
					"安徽": [117.29, 32.0581],
					"湖北": [114.3896, 30.6628],
					"浙江": [119.5313, 29.8773],
					"福建": [119.4543, 25.9222],
					"江西": [116.0046, 28.6633],
					"湖南": [113.0823, 28.2568],
					"贵州": [106.6992, 26.7682],
					"云南": [102.9199, 25.4663],
					"广东": [113.12244, 23.009505],
					"广西": [108.479, 23.1152],
					"海南": [110.3893, 19.8516],
					'上海': [121.4648, 31.2891],
					"广州市": [113.12244, 23.009505]
				}
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				let tileLayer = new TileLayer({
					 source: new XYZ({
					
					        url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
					
					    })
				}) 
				var vectorSource = new VectorSource();
				var vector = new VectorLayer({
					source: vectorSource,
					style:  new Style({
				
									stroke: new Stroke({
										color: '#e5e600',
										width: 1
									}),
									fill: new Fill({
										color:'#666699',
									}),
									
				
				}),
				opacity:0.5
				})

				
				var map = new Map({
					layers: [tileLayer,vector],
					controls:  control({ attribution:true, zoom: true, rotate: true }),
					interactions: defaults({
						doubleClickZoom: true, 
						mouseWheelZoom:true, 
						shiftDragZoom: false,
						dragPan:true 
					}),
					target: 'map',
					
					view: new View({
						projection: 'EPSG:4326',
						center: [116, 39],
						maxZoom: 19,
						zoom: 13
				
					})
				
				});
				var featureRequest = new WFS().writeGetFeature({
					srsName: 'EPSG:4326', //坐标系统
					featureNS: 'http://www.opengeospatial.net/cite', //命名空间 URI
					featurePrefix: 'cite', //工作区名称
					featureTypes: ['province'], //查询图层，可以是同一个工作区下多个图层
					outputFormat: 'application/json'
				
				});
				
				//geoserver wfs地址如localhost:8080/geoserver/wfs
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
					map.getView().fit(vectorSource.getExtent());
				
				});
				//画航线
				var flightSource = new VectorSource()
				 var flightLayer = new VectorLayer({
					source: flightSource
				}) 
				var turfFormat = new GeoJSON();
				
				function getTurfArcFeature(start, end, opt) {
					var line = turf.lineString([start, [start[0] + (end[0] - start[0]) * 0.5, start[1] + (end[1] - start[1]) * 0.65], end]);
					var curved = turf.bezierSpline(line);
					let length = turf.length(curved, {
						units: 'meters'
					});
					
					var bF = turfFormat.readFeature(curved);
					//bF.getGeometry().transform('EPSG:4326', 'EPSG:3857');
					bF.setProperties(opt);
					bF.set("length", length);
					return bF;
				}
				map.addLayer(flightLayer)
				 var arcStyle = new Style({
					stroke: new Stroke({
						color: '#ffff66',
						width: 3
					})
				}) 
				var dotStyle = new Style({
					image: new CircleStyle({
						fill: new Fill({
							color: '#ffffff'
						}),
						radius: 5
					})
				}) 
				var arcLinesFeature = [];
				var startpoi=this.getCoord(this.city);
				data.moveLines.forEach((item, index) => {
					console.log(this.getCoord(item["province_name"]))
					let tempF = getTurfArcFeature( this.getCoord(item["province_name"]), startpoi, {
						// 'from': item.fromName,
						// 'to': item.toName
					});
					arcLinesFeature.push(tempF);
				})
				vector.on('postrender', (evt) => {
					let veContext = getVectorContext(evt);
					arcLinesFeature.forEach((item, index) => {
						veContext.drawFeature(item, arcStyle);
						let time = (evt.frameState.time - item.get('start')) / 1000;
						let frac = time / 5 - index / arcLinesFeature.length;
						if (!item.get('start')) item.set('start', new Date().getTime());
						if (frac >= 1) {
							item.set('start', new Date().getTime());
							frac = 0;
						}
						let along = item.getGeometry().getCoordinateAt(frac);
						let pF = new Feature(new Point(along));
						veContext.drawFeature(pF, dotStyle);
					})
					 map.render()
				})
			 },
			 getCoord(name){
				 var coord= this.chinaGeoCoordMap[name]
				 return coord;
			 }
		}
	}
	
</script>

<style>
	.map {
		width: 100%;
		height: 100vh;
	}
</style>
