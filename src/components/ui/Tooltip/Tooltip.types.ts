import { type ReactElement } from 'react';

export enum TooltipPositions {
	left = 'left',
	right = 'right',
	top = 'top',
	bottom = 'bottom',
}

export enum TooltipMode {
	always = 'always',
	content = 'content',
}

export type TooltipPositionsKeys = keyof typeof TooltipPositions;

export interface TooltipProps {
	children: ReactElement;
	mode?: keyof typeof TooltipMode;
	position?: TooltipPositionsKeys;
	title: string;
}

export interface SetTooltipPositionReturn {
	left: number;
	top: number;
	currentPosition: TooltipPositionsKeys;
}
