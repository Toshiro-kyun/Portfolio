export interface Graph {
    labels: string[]
    nodes: Node[];
}
  
export interface Node {
    id: string;
    name: string;
    layer: number;
    icon: string;
    description: string;
    links: string[];
}

export interface NodePosition {
    id: string;
    x: number;
    y: number;
    element: HTMLElement;
}

export interface Connection {
    from: NodePosition;
    to: NodePosition;
}

export interface NodeByLayers {
    [layer: number]: Node[];
}

export interface NodeComponentProps {
    node: Node;
    isActive: boolean;
    onEnter: (nodeId: string) => void;
    onLeave: () => void;
    size: number;
}