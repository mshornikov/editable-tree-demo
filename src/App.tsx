import { NodeRendererProps, Tree } from 'react-arborist';

type Data = { id: string; name: string; children?: Data[] };

const data = Array.from({ length: 100 }).map((_, index) => {
    const object: Data = { id: index.toString(), name: index.toString() };

    if (index < 10) {
        object.children = Array.from({ length: 100 }).map((_, i) => {
            const child: Data = {
                id: `${index.toString()}${i.toString()}`,
                name: `${index.toString()}${i.toString()}`,
            };

            if (i < 10) {
                child.children = [
                    { id: index.toString(), name: index.toString() },
                ];
            }

            return child;
        });
    }

    return object;
});

const options = ['string', 'boolean', 'number', 'object', 'array'];

function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
    return (
        <div
            style={style}
            ref={dragHandle}
            onClick={() => {
                if (node.isInternal) {
                    node.toggle();
                }
            }}>
            {!node.isLeaf && '+'}
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
}

function App() {
    return (
        <Tree initialData={data} openByDefault={false}>
            {Node}
        </Tree>
    );
}

export { App };
