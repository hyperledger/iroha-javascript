import Token from 'markdown-it/lib/token';
import Debug from 'debug';

const dbg = Debug('fix-html-tokens');

const TAG_REGEX = /^<\/?(\w+)>$/;
const PASCAL_CASE = /^\b(?:[A-Z][a-z]+)+\b$/;

export function fixHtmlInlineTokens(tokens: Token[]): void {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === 'html_inline' && !/^<!--.+-->$/.test(token.content) && TAG_REGEX.test(token.content)) {
            const [, tagName] = token.content.match(TAG_REGEX);
            if (PASCAL_CASE.test(tagName)) {
                // component found - transform back to text
                dbg('Fixing token from html_inline into text: %o', token);
                token.type = 'text';
            }
        }
    }
}
