<template>
	<div class="con">
		<div class="mine location-con">
			<span>我的位置</span>
			<div class="item">
				<p>经度：</p>
				<span>{{mLocation.x | toFixed 2}}</span>
			</div>
			<div class="item">
				<p>纬度：</p>
				<span>{{mLocation.y | toFixed 2}}</span>
			</div>
		</div>
		<div class="other location-con">
			<span>{{other}}的位置</span>
			<div class="item">
				<p>经度：</p>
				<span>{{oLocation.x | toFixed 2}}</span>
			</div>
			<div class="item">
				<p>纬度：</p>
				<span>{{oLocation.y | toFixed 2}}</span>
			</div>
		</div>
	</div>
	<span v-show="showOffLine">对方离线</span>
</template>
<style scoped>
.con {
	font-size: 0;
}
.location-con {
	display: inline-block;vertical-align: middle;width: 50%;font-size: 14px;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

let personMap = {
	her: '她',
	him: '他'
}

export default {
	name: 'Location',
	data() {
		return {
			showOffLine: false
		};
	},
	vuex: {
		getters: {
			who: () => store.state.who,
			mLocation: () => store.state.mLocation,
			oLocation: () => store.state.oLocation,
		}
	},
	computed: {
		other() {
			let otherWho = this.who === 'him' ? 'her' : 'him';
			return personMap[otherWho];
		}
	},
	ready() {
		window.Socket.on('send-location-to-clients', (location) => {
			let otherWho = this.who === 'him' ? 'her' : 'him';
			actions.setOLocation(store, {
				x: location[otherWho].x || '',
				y: location[otherWho].y || ''
			})
			actions.setMLocation(store, {
				x: location[this.who].x || '',
				y: location[this.who].y || ''
			})
		});
		window.Socket.on('checked', () => {
			this.sendLocation();
		})
		window.Socket.on('other-offline', () => {
			this.showOffLine = true;
		})
		window.onbeforeunload = function (e) {
			window.Socket.emit('leave', this.who);
		};
	},
	methods: {
		sendLocation() {
			navigator.geolocation.getCurrentPosition((position) => {
				window.Socket.emit('send-location-to-server', {
					who: this.who,
					location: {
						x: position.coords.longitude,
						y: position.coords.latitude
					}
				})
			})
		}
	}
};
</script>
