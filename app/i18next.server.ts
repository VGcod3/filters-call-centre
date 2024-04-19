import { createCookie } from "@remix-run/node";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import {i18nOptions} from "~/i18n";

export const i18nCookie = createCookie("i18n", {
	sameSite: "lax",
	path: "/",
});

export const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18nOptions.supportedLngs,
		fallbackLanguage: i18nOptions.fallbackLng,
		cookie: i18nCookie,
	},
	i18next: {
		...i18nOptions,
		backend: {
			loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
		},
	},
	plugins: [Backend],
});
