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
            className='w-full h-full min-h-0 min-w-0'
            ref={mergeRefs(ref, forwardRef)}>
            {width && height ? props.children({ width, height }) : null}
        </div>
    );
});
