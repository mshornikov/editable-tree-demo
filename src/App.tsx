import { NodeRendererProps, Tree } from 'react-arborist';

import './index.css';
import { FillFlexParent } from './components/fill-flex-parent';
import { ChevronDown, ChevronRight } from 'lucide-react';

type Data = { id: string; name: string; children?: Data[] };

const data = Array.from({ length: 2000 }).map((_, index) => {
    const object: Data = { id: index.toString(), name: index.toString() };

    if (index < 10) {
        object.children = Array.from({ length: 100 }).map((_, i) => {
            const child: Data = {
                id: `${index.toString()}${i.toString()}`,
                name: `${index.toString()}${i.toString()}`,
            };

            return child;
        });
    }

    return object;
});

const options = ['string', 'boolean', 'number', 'object', 'array'];

const Node = ({ node, style, dragHandle }: NodeRendererProps<Data>) => {
    return (
        <div style={style} className='flex items-center gap-2' ref={dragHandle}>
            {!node.isLeaf && (
                <button
                    onClick={() => {
                        if (node.isInternal) {
                            node.toggle();
                        }
                    }}>
                    {node.isOpen ? <ChevronDown /> : <ChevronRight />}
                </button>
            )}
            <select>
                <option value={node.data.name}>{node.data.name}</option>
                {options.map((i) => (
                    <option value={i} key={i}>
                        {i}
                    </option>
                ))}
            </select>
        </div>
    );
};

const App = () => {
    return (
        <div className='h-screen pl-5 py-5'>
            <FillFlexParent>
                {(dimensions) => (
                    <Tree
                        {...dimensions}
                        initialData={data}
                        openByDefault={false}
                        rowHeight={30}
                        indent={32}>
                        {Node}
                    </Tree>
                )}
            </FillFlexParent>
        </div>
    );
};

export { App };
