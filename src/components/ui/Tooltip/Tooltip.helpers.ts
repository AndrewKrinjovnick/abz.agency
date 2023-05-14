import {
	TooltipPositions,
	type SetTooltipPositionReturn,
	type TooltipPositionsKeys,
} from './Tooltip.types';

export const setTooltipPosition = (
	child: HTMLElement,
	tooltip: HTMLElement,
	position: TooltipPositionsKeys
): SetTooltipPositionReturn => {
	const coords = child.getBoundingClientRect();
	const scrollTop = document.documentElement.scrollTop;

	let left = 0;
	let top = 0;
	let currentPosition: TooltipPositionsKeys = position;

	if (position === TooltipPositions.top) {
		left = coords.left + (child.offsetWidth - tooltip.offsetWidth) / 2;
		top = scrollTop + coords.top - tooltip.offsetHeight;
		currentPosition = 'top';

		if (scrollTop > top) {
			top = scrollTop + coords.top + child.offsetHeight;
			currentPosition = 'bottom';
		}
	}

	if (position === TooltipPositions.bottom) {
		left = coords.left + (child.offsetWidth - tooltip.offsetWidth) / 2;
		top = scrollTop + coords.top + child.offsetHeight;
		currentPosition = 'bottom';

		if (scrollTop + document.documentElement.clientHeight < top + tooltip.offsetHeight) {
			top = scrollTop + coords.top - tooltip.offsetHeight;
			currentPosition = 'top';
		}
	}

	if (position === TooltipPositions.left) {
		top = scrollTop + coords.top + (child.offsetHeight - tooltip.offsetHeight) / 2;
		left = coords.left - tooltip.offsetWidth;
		currentPosition = 'left';

		if (left < 0) {
			left = coords.left + child.offsetWidth;
			currentPosition = 'right';
		}
	}

	if (position === TooltipPositions.right) {
		top = scrollTop + coords.top + (child.offsetHeight - tooltip.offsetHeight) / 2;
		left = coords.left + child.offsetWidth;
		currentPosition = 'right';

		if (document.documentElement.clientWidth < left + tooltip.offsetWidth) {
			left = coords.left - tooltip.offsetWidth;
			currentPosition = 'left';
		}
	}

	return { left, top, currentPosition };
};
