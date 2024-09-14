import React, { ReactElement } from 'react';
import mergeRefs from './merge-refs';
import useResizeObserver from 'use-resize-observer';

type Props = {
    children: (dimensions: { width: number; height: number }) => ReactElement;
};

export const FillFlexParent = React.forwardRef(function FillFlexParent(
    props: Props,
    forwardRef,
) {
    const { ref, width, height } = useResizeObserver();

    return (
        <div
            className='h-full min-h-0 w-full min-w-0'
            ref={mergeRefs(ref, forwardRef)}>
            {width && height ? props.children({ width, height }) : null}
        </div>
    );
});
