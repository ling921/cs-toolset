
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/[locale]" | "/[locale]/[...slug]";
		RouteParams(): {
			"/[locale]": { locale: string };
			"/[locale]/[...slug]": { locale: string; slug: string }
		};
		LayoutParams(): {
			"/": { locale?: string | undefined; slug?: string | undefined };
			"/[locale]": { locale: string; slug?: string | undefined };
			"/[locale]/[...slug]": { locale: string; slug: string }
		};
		Pathname(): "/" | `/${string}` & {} | `/${string}/` & {} | `/${string}/${string}` & {} | `/${string}/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/icon-192.png" | "/icon-512.png" | "/ling-tools-mark.svg" | "/manifest.webmanifest" | "/social-card.svg" | "/staticwebapp.config.json" | string & {};
	}
}