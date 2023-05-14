import classNames from 'classnames';
import { useMount } from 'hooks/useMount';
import { cloneElement, useEffect, useRef, useState, type FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Portal } from '../Portal';
import { ANIMATION_TIME, tooltipAnimation } from './Tooltip.constants';
import { setTooltipPosition } from './Tooltip.helpers';
import styles from './Tooltip.module.scss';
import { TooltipMode, type TooltipPositions, type TooltipProps } from './Tooltip.types';

export const Tooltip: FC<TooltipProps> = ({
	children,
	mode = 'always',
	position = 'top',
	title,
}) => {
	const childRef = useRef<HTMLElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const [hover, setHover] = useState<boolean>(false);
	const [animationIn, setAnimationIn] = useState<boolean>(false);
	const mounted = useMount(hover, ANIMATION_TIME);
	const [currentPosition, setCurrentPosition] = useState<keyof typeof TooltipPositions>(position);

	useEffect(() => {
		setAnimationIn(hover);
	}, [hover]);

	useEffect(() => {
		const child = childRef.current;

		const toggleTooltip = (open: boolean) => () => {
			setHover(open);
		};

		if (child) {
			child.addEventListener('mouseenter', toggleTooltip(true));
			child.addEventListener('mouseleave', toggleTooltip(false));
		}

		return () => {
			child?.removeEventListener('mouseover', toggleTooltip(true));
			child?.removeEventListener('mouseleave', toggleTooltip(false));
		};
	}, [childRef, tooltipRef]);

	useEffect(() => {
		const child = childRef.current;
		const tooltip = tooltipRef.current;

		if (child && tooltip) {
			if (mode === TooltipMode.content && !(child.scrollWidth - child.offsetWidth)) {
				return;
			}

			const { left, top, currentPosition } = setTooltipPosition(child, tooltip, position);
			setCurrentPosition(currentPosition);
			tooltip.style.left = `${left}px`;
			tooltip.style.top = `${top}px`;
		}
	}, [mounted, tooltipRef, mode]);

	if (!children) {
		return null;
	}

	return (
		<>
			{cloneElement(children, {
				ref: (ref: HTMLElement) => (childRef.current = ref),
			})}
			{(mounted || hover) && (
				<Portal>
					<CSSTransition
						nodeRef={tooltipRef}
						classNames={tooltipAnimation}
						in={animationIn}
						timeout={ANIMATION_TIME}
						mountOnEnter
						unmountOnExit
					>
						<div className={styles.tooltip_wrapper} ref={tooltipRef}>
							<div className={classNames(styles.tooltip, { [styles[currentPosition]]: position })}>
								{title}
							</div>
						</div>
					</CSSTransition>
				</Portal>
			)}
		</>
	);
};
