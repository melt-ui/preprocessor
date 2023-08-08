import type { Node as ESTreeNode } from 'estree';
import type MagicString from 'magic-string';

export type Builder = BuilderIdentifier | BuilderExpression;

type BuilderIdentifier = {
	identifierName: string;
	startPos: number;
	endPos: number;
};
type BuilderExpression = {
	startPos: number;
	endPos: number;
	expression: ExpressionContent;
};

type ExpressionContent = {
	startPos: number;
	endPos: number;
	contents: string;
};

export type Node = ESTreeNode & {
	start: number;
	end: number;
};

export type Config = {
	alias: string | string[];
	builders: Builder[];
	markup: MagicString;
	content: string;
	builderCount: number;
};
