<template>
	<p>{{mi}}</p>
</template>
<script>
import store from 'store';
export default {
	name: 'Map',
	data() {
		return {
			mi: 0
		};
	},
	vuex: {
		getters: {
			mLocation: () => store.state.mLocation,
			oLocation: () => store.state.oLocation
		}
	},
	ready() {
		window.Socket.on('send-location-to-clients', () => {
			this.generateMap();
		})
	},
	methods: {
		generateMap() {
			var map = new BMap.Map("allmap");
			var pointA = new BMap.Point(this.mLocation.x,this.mLocation.y);
			var pointB = new BMap.Point(this.oLocation.x,this.oLocation.y);
			map.centerAndZoom(pointA,15);
			this.mi = (map.getDistance(pointA,pointB)).toFixed(2)+' 米。'
			var polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});
			map.addOverlay(polyline);
			map.enableScrollWheelZoom(true);
			map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
		}
	}
};
</script>