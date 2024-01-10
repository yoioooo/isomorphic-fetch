"use strict";

var realFetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

module.exports = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'https:' + url;
	}
	console.log('111', options);
	return realFetch.call(this, url, {...options, agent: new HttpsProxyAgent('http://127.0.0.1:6152', { rejectUnauthorized: false })});
};

if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}
