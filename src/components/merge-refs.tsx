import { MutableRefObject, RefCallback } from 'react';

type AnyRef = MutableRefObject<unknown> | RefCallback<unknown> | null;

export default function mergeRefs(...refs: AnyRef[]) {
    return (instance: unknown) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref != null) {
                ref.current = instance;
            }
        });
    };
}
