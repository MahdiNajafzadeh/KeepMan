// IMPORT
import MarkdownIt from "markdown-it";
import { full as emoji } from "markdown-it-emoji";
import markdownItHighlight from "markdown-it-highlightjs";
// TYPES
import type Token from "markdown-it/lib/token.mjs";
import type Renderer from "markdown-it/lib/renderer.mjs";

// CONFIG
const md = new MarkdownIt({
	html: true,
	breaks: true,
	linkify: true
})
	.use(emoji)
	.use(markdownItHighlight);

interface CustomAttrsMap {
	[key: string]: string;
}

const customAttrsMap: CustomAttrsMap = {
	h1: `class="text-4xl mt-4 mb-2"`,
	h2: `class="text-3xl mt-4 mb-2"`,
	h3: `class="text-2xl mt-4 mb-2"`,
	h4: `class="text-xl" mt-4 mb-2`
};

md.renderer.rules.heading_open = (tokens: Token[], idx: number) => {
	const tag = tokens[idx].tag;
	const attrs = customAttrsMap[tag];
	return `<${tag} ${attrs}>`;
};

md.renderer.rules.list_item_open = (tokens: Token[], idx: number, options: object, env: object, slf: Renderer) => {
	const prevToken = tokens[idx - 1];
	if (prevToken) {
		return '<li class="mb-2 ml-4 list-disc">';
	}
	return slf.renderToken(tokens, idx, options);
};

md.renderer.rules.table_open = () => {
	return '<table class="min-w-full border-collapse border border-gray-200">';
};

md.renderer.rules.thead_open = () => {
	return '<thead class="bg-gray-100">';
};

md.renderer.rules.tbody_open = () => {
	return '<tbody class="divide-y divide-gray-200">';
};

md.renderer.rules.th_open = () => {
	return '<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">';
};

md.renderer.rules.td_open = () => {
	return '<td class="px-6 py-4 whitespace-nowrap">';
};

export default md;
