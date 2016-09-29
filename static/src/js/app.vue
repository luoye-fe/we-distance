<template>
	<m-check></m-check>
	<m-location></m-location>
	<m-map></m-map>
</template>
<style lang="less">
@import url('../css/app.less');
</style>
<script>
import Check from './components/check.vue';
import Location from './components/location.vue';
import MapCom from './components/map.vue';

export default {
	name: 'App',
	components: {
		'm-check': Check,
		'm-location': Location,
		'm-map': MapCom
	}
};
</script>
