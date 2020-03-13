<template>
	<div>
		<div id="map" class="map">
			<div id="popup" class="ol-popup">
			     <a href="#" id="popup-closer" class="ol-popup-closer"></a>
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
		  equalTo as equalToFilter,
		  like as likeFilter,
		
		} from 'ol/format/filter';
		
		import {
			Tile as TileLayer,
			Vector as VectorLayer
		} from 'ol/layer';
		import {
			bbox as bboxStrategy
		} from 'ol/loadingstrategy';
		import BingMaps from 'ol/source/BingMaps';
		import VectorSource from 'ol/source/Vector';
		import {
			Stroke,
			Style,
			Icon,Text,Fill
		} from 'ol/style';
		import {
			WFS,
			GeoJSON
		} from 'ol/format';
		import Overlay from 'ol/Overlay';
		export default {
			name: 'promap',
			props: {
		        
			},
			data() {
				return {
					map: "",
					
				}
			},
			mounted() {
				this.init()
			},
			methods: {
				styleFunction(feature) {
				  
				
				  	return new Style({
				  		image: new Icon(({
				  			src: "/hosp.png"
				  		}))
				  		 
				
				  })
	},

				init() {
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
					
					var vectorSource = new VectorSource(
					);
					var vector = new VectorLayer({
						source: vectorSource,
						style: this.styleFunction
	
					});
					
					
					var raster = new TileLayer({
						source: new OSM()
					});
		
					var map = new Map({
						layers: [raster, vector],
						target: 'map',
						 overlays: [overlay],
						view: new View({
							projection: 'EPSG:4326',
							center: [116, 39],
							maxZoom: 19,
							zoom: 12
		
						})
					});
				   const that=this;
					var featureRequest = new WFS().writeGetFeature({
						srsName: 'EPSG:4326',
						featureNS: 'http://www.opengeospatial.net/cite',
						featurePrefix: 'cite',
						featureTypes: ['hosp'],
						outputFormat: 'application/json',
						
						
		
					});
						
					// then post the request and add the received features to a layer
					fetch('http://localhost:8081/geoserver/wfs', {
						method: 'POST',
						body: new XMLSerializer().serializeToString(featureRequest)
					}).then(function(response) {
						return response.json();
					}).then(function(json) {
						
						var features = new GeoJSON().readFeatures(json);
						
						vectorSource.addFeatures(features);
						//vectorSource.setStyle(that.styleFunction(feature));
						map.getView().fit(vectorSource.getExtent());
						 overlay.setPosition(undefined);
						
					});
	
		
						map.on('singleclick', function(evt) {
						  var coordinate = evt.coordinate;
						  
						  var features = map.getFeaturesAtPixel(evt.pixel);
							if (features.length == 0) {
							 
							  return;
							}
						   var properties = features[0].getProperties();
						  
						   
						  content.innerHTML = '<div class="title">' + properties["name"] +
							  '  </div><div> 电话:'+properties["tel"]
							  +'</div><div> 地址:'+properties["address"];
							  map.addOverlay( overlay)
						  overlay.setPosition(coordinate);
						});
				},
				detail(){
					 this.$router.replace("/detail");
				}
			}
		}
</script>

<style>
	.map {
		width: 100%;
		height: 400px;
	}
	
	      
		   .ol-popup {
		          position: absolute;
		          background-color: white;
		          -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		          padding: 15px;
		          border-radius: 10px;
		          border: 1px solid #cccccc;
		          bottom: 12px;
		         /* left: -50px; */
		          min-width: 420px;
		        }
		        .ol-popup:after, .ol-popup:before {
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
				.title{
					font-size: 22px;
					font-weight:bold;
				}
</style>
