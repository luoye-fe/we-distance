<template>
	<div class="check-con" v-show="showCheck">
		<div class="center">
			<p>你是谁</p>
			<div class="checks">
				<div class="item">
					<input type="radio" name="who" value="him" id="him" v-model="selected">
					<label for="him">他</label>
				</div>
				<div class="item">
					<input type="radio" name="who" value="her" id="her" v-model="selected">
					<label for="her">她</label>
				</div>
			</div>
			<button type="button" @click="apply()">确认</button>
		</div>
	</div>
</template>
<style>
.check-con {
	position: fixed;
	z-index: 999;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,0.4);
}
.center {
	width: 200px;
	height: 100px;
	background-color: #fff;
	position: absolute;top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.center p {
	display: block;text-align: center;
	font-size: 18px;
	line-height: 32px;
}
.checks {
	font-size: 0;
	text-align: center;
}
.checks .item {
	display: inline-block;vertical-align: middle;
	font-size: 14px;
	cursor: pointer;
	margin: 0 5px;
}
button {
	margin: 5px 0;
}
</style>
<script>
import store from 'store';
import actions from 'actions';
export default {
	name: 'Check',
	data() {
		return {
			 selected: 'him',
			 showCheck: true
		};
	},
	methods: {
		apply() {
			window.Socket.emit('check', this.selected);
			window.Socket.on('checked', () => {
				this.showCheck = false;
				actions.setWho(store, this.selected);
			})
		}
	}
};
</script>
