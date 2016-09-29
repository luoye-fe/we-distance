// import $ from 'jquery';

// var x = document.getElementById("demo");

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//     } else { x.innerHTML = "Geolocation is not supported by this browser."; }
// }

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br />Longitude: " + position.coords.longitude;
// }

// getLocation();

// var socket = io('');


import Vue from 'vue';
import './filter/index.js';

import store from 'store';

import App from './app.vue';

import io from 'socket.io-client';

window.Socket = io('');

Socket.on('init', () => {
	new Vue({
		el: '#app',
		store: store,
		components: {
			'm-app': App
		},
		template:`<div><m-app></m-app></div>`
	});
})
