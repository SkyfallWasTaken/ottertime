declare module "github-colors" {
	interface LanguageColor {
		type: string;
		ace_mode: string;
		codemirror_mode: string;
		codemirror_mime_type: string;
		color: string;
		aliases: string[];
		extensions: string[];
		language_id: number;
	}

	interface ExtensionColor {
		extensions: string[];
		aliases: string[];
		type: string;
		ace_mode: string;
		codemirror_mode: string;
		codemirror_mime_type: string;
		color: string;
		language_id: number;
	}

	/**
	 * Gets the color object for the provided language.
	 * @param language The name of the language.
	 * @param handleOthers If true, it will return a gray color object for unknown languages.
	 * @returns The color object for the language, or `undefined` if not found and `handleOthers` is false.
	 */
	function get(language: string): LanguageColor | undefined;
	function get(language: string, handleOthers = false): LanguageColor;

	/**
	 * Gets the color object for the provided extension.
	 * @param extension The file extension (e.g. "js").
	 * @param handleOthers If true, it will return a gray color object for unknown extensions.
	 * @returns The color object for the extension, or `undefined` if not found and `handleOthers` is false.
	 */
	function ext(extension: string): ExtensionColor | undefined;
	function ext(extension: string, handleOthers = false): ExtensionColor;
}
