import { NodeRendererProps, Tree } from 'react-arborist';
import { ChevronRight, GripVertical } from 'lucide-react';

import styles from './node.module.css';

import { FillFlexParent } from '@/components/fill-flex-parent';
import { Combobox } from '@/components/ui/combobox';

import './index.css';
import { cn } from './lib/utils';

type Data = { id: string; name: string; children?: Data[] };

const data = Array.from({ length: 2000 }).map((_, index) => {
    const object: Data = {
        id: Math.random().toString(),
        name: index.toString(),
    };

    if (index < 10) {
        object.children = Array.from({ length: 100 }).map((_, i) => {
            const child: Data = {
                id: Math.random().toString(),
                name: `${index.toString()}${i.toString()}`,
            };

            return child;
        });
    }

    return object;
});

const options = [
    {
        value: 'string',
        label: 'string',
    },
    {
        value: 'number',
        label: 'number',
    },
    {
        value: 'array',
        label: 'array',
    },
    {
        value: 'boolean',
        label: 'boolean',
    },
    {
        value: 'object',
        label: 'object',
    },
];

const Node = ({ node, style, dragHandle }: NodeRendererProps<Data>) => {
    return (
        <div
            style={style}
            className={cn('flex items-center gap-2', styles.node, node.state)}
            ref={dragHandle}>
            <div className='w-6'>
                {!node.isLeaf && (
                    <button
                        onClick={() => {
                            if (node.isInternal) {
                                node.toggle();
                            }
                        }}>
                        <div
                            className={`transition-transform duration-200 ease-in-out ${node.isOpen ? 'rotate-90' : 'rotate-0'}`}>
                            <ChevronRight />
                        </div>
                    </button>
                )}
            </div>
            <Combobox
                defaultValue={node.data.name}
                options={options}
                callback={(value) => {
                    node.submit(value);
                }}
                onClick={() => {
                    node.edit().catch(() => {
                        throw new Error();
                    });
                }}
            />
            <GripVertical className='ml-4 cursor-pointer' />
        </div>
    );
};

const App = () => {
    return (
        <div className='h-screen py-5 pl-5'>
            <FillFlexParent>
                {(dimensions) => (
                    <Tree
                        {...dimensions}
                        initialData={data}
                        openByDefault={false}
                        rowHeight={50}
                        indent={32}>
                        {Node}
                    </Tree>
                )}
            </FillFlexParent>
        </div>
    );
};

export { App };
