<template>
	<div>
		<div id="map" class="map">
			<div id="popup" class="ol-popup">
				<a href="#" id="popup-closer" class="ol-popup-closer"></a>
				<button @click="detail" class="detail">详情</button>
				<div id="popup-content"></div>
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
		Tile as TileLayer,
		Vector as VectorLayer
	} from 'ol/layer';
	import {
		bbox as bboxStrategy
	} from 'ol/loadingstrategy';

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
	//import {defaults} from 'ol/control.js';

	import {
		defaults
	} from 'ol/interaction';
	export default {
		name: 'map',
		props: {

		},
		data() {
			return {
				map: "",
				pro: "武汉"
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			//style
			styleFunction(feature) {

				const name = feature.get('NAME');
				const color = this.getColor(name);
				return new Style({

					stroke: new Stroke({
						color: '#222',
						width: 1
					}),
					fill: new Fill({
						color: color
					}),
					text: new Text({

						text: name,
						fill: new Fill({
							color: '#222'
						})
					})
				})

			},
			getCount(str) {
				return this.$store.getters.parseData(str)
			},
			getColor(str) {
				var num = this.$store.getters.parseData(str)
				var f = Number(num)

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
				//弹窗
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

				var vectorSource = new VectorSource();
				var vector = new VectorLayer({
					source: vectorSource,
					style: this.styleFunction

				});


				var raster = new TileLayer({
					source: new OSM()
				});

				var map = new Map({
					layers: [vector],
					//controls: defaults({ attribution:false, zoom: false, rotate: false }),
					interactions: defaults({
						doubleClickZoom: false, // 取消双击放大功能交互
						mouseWheelZoom: false, // 取消滚动鼠标中间的滑轮交互
						shiftDragZoom: false,
						dragPan: false // 取消shift+wheel左键拖动交互
					}),

					target: 'map',
					overlays: [overlay],
					view: new View({
						projection: 'EPSG:4326',
						center: [116, 39],
						maxZoom: 19,
						zoom: 12

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


				const that = this;

				map.on('singleclick', function(evt) {
					var coordinate = evt.coordinate;

					var features = map.getFeaturesAtPixel(evt.pixel);
					if (features.length == 0) {

						return;
					}
					var properties = features[0].getProperties();
					//console.log(properties)
					that.pro = properties["NAME"]
					var num = that.getCount(properties["NAME"])
					//加弹框
					content.innerHTML = '<div class="name">' + properties["NAME"] +
						'  </div><div>确诊：' + num +
						'</div>';
					overlay.setPosition(coordinate);
				});
			},
			detail() {
				this.$router.push({
					path: 'detail',
					query: {
						name: this.pro

					}
				})
			}
		}
	}
</script>

<style scoped>
	.map {
		width: 100%;
		height: 561px;
	}


	.ol-popup {
		position: absolute;
		background-color: rgba(50, 50, 50, 0.7);
		border-style: solid;
		white-space: nowrap;
         width: 80px;
		 
		transition: left 0.1s cubic-bezier(0.23, 1, 0.32, 1), top 0.1s cubic-bezier(0.23, 1, 0.32, 1);
		border-color: #333;
		border-radius: 4px;
		color: #fff;
		font: normal normal 14px Microsoft YaHei;
		line-height: 21px;
		padding: 6px 6px 6px 6px;
		text-align: left;
		border-radius: 5px;
		pointer-events: auto;

	}

	/* .ol-popup:after,
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
	} */
/* 
	.ol-popup:before {
		border-top-color: #cccccc;
		border-width: 11px;
		left: 48px;
		margin-left: -11px;
	} */

	.ol-popup-closer {
		text-decoration: none;
		position: absolute;
		top: 2px;
		right: 8px;
	}

	.ol-popup-closer:after {
		content: "✖";
	}

	.name {
		font-size: 22px;
		font-weight: bold;
	}
	#popup-content{
		   width: 60px;
	}
	.detail{
		background-color: rgba(50, 50, 50, 0.7);
		border: none;
	}
</style>
