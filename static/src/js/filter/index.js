import Vue from 'vue';

Vue.filter('toFixed', function (value, input) {
  	return Number(value).toFixed(2);
})