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
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[locale]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"locale","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[locale]/[...slug]",
				pattern: /^\/([^/]+?)(?:\/([^]*))?\/?$/,
				params: [{"name":"locale","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
