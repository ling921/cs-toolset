export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","icon-192.png","icon-512.png","ling-tools-mark.svg","manifest.webmanifest","social-card.svg","staticwebapp.config.json","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.P_ui1Zcm.js",app:"_app/immutable/entry/app.Ls65P3Hn.js",imports:["_app/immutable/entry/start.P_ui1Zcm.js","_app/immutable/chunks/XnPbdMYW.js","_app/immutable/chunks/Ca2W0V82.js","_app/immutable/chunks/Ba-wBnwQ.js","_app/immutable/chunks/B-wqvQ_y.js","_app/immutable/chunks/B0XwC4Ot.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.Ls65P3Hn.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/Ca2W0V82.js","_app/immutable/chunks/BnSxoX16.js","_app/immutable/chunks/B--_103R.js","_app/immutable/chunks/BWhcg05g.js","_app/immutable/chunks/B-wqvQ_y.js","_app/immutable/chunks/CzfChjxN.js","_app/immutable/chunks/brtglY9Z.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/en/","/en/about/","/en/privacy/","/en/gen/string/","/en/gen/hex/","/en/gen/number/","/en/gen/uuid/","/en/gen/password/","/en/gen/ids/","/en/gen/lorem/","/en/format/json/","/en/convert/yaml/","/en/encode/base64/","/en/encode/url/","/en/encode/html/","/zh-CN/","/en/security/hash/","/en/convert/timestamp/","/en/security/jwt/","/en/convert/color/","/en/test/regex/","/en/text/diff/","/en/gen/qr/","/en/parse/cron/","/en/text/case/","/en/convert/image-base64/","/en/convert/radix/","/en/gen/china-id/","/en/convert/csv-json/","/en/text/unicode/","/en/inspect/url/","/en/text/statistics/","/en/text/lines/","/en/text/slug/","/en/convert/base32/","/en/inspect/http-status/","/en/format/xml/","/zh-CN/gen/string/","/zh-CN/gen/hex/","/zh-CN/gen/number/","/zh-CN/gen/uuid/","/zh-CN/gen/password/","/zh-CN/gen/ids/","/zh-CN/gen/lorem/","/zh-CN/format/json/","/zh-CN/convert/yaml/","/zh-CN/encode/base64/","/zh-CN/encode/url/","/zh-CN/encode/html/","/zh-CN/security/hash/","/zh-CN/convert/timestamp/","/zh-CN/security/jwt/","/zh-CN/convert/color/","/zh-CN/test/regex/","/zh-CN/text/diff/","/zh-CN/gen/qr/","/zh-CN/parse/cron/","/zh-CN/text/case/","/zh-CN/convert/image-base64/","/zh-CN/convert/radix/","/zh-CN/gen/china-id/","/zh-CN/convert/csv-json/","/zh-CN/text/unicode/","/zh-CN/inspect/url/","/zh-CN/text/statistics/","/zh-CN/text/lines/","/zh-CN/text/slug/","/zh-CN/convert/base32/","/zh-CN/inspect/http-status/","/zh-CN/format/xml/","/zh-CN/about/","/zh-CN/privacy/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
