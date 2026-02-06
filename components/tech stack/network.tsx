"use client";
import { useState, useEffect, useRef } from 'react';
import { Connection, Graph, Node, NodeByLayers, NodePosition, NodeComponentProps } from '@/interfaces/tech_stack_interface';

// Node Component
const NodeComponent = ({ node, size, isActive, onEnter, onLeave } : NodeComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      data-node-id={node.id}
      className={`relative flex items-center justify-center overflow-hidden rounded-full border-2 cursor-pointer w-[${size}px] h-[${size}px] border-[${isActive ? '#3b82f6' : '#404040'}] p-[1rem] bg-[#1a1a1a]`}
      onMouseEnter={() => {
        setIsHovered(true);
        onEnter(node.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-full border-0.5 pointer-events-none border-[${isActive ? '#3b82f6' : '#404040'}]`}
      />
      <img
        src={node.icon}
        alt={node.name}
        className={`object-contain w-[30px] h-[30px] ${isHovered || isActive ? 'grayscale-0 brightness-100' : 'grayscale-100 brightness-125'}`}
      />
    </div>
  );
};


export function NetworkComponents ({ graph }: { graph: Graph }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeNode, setActiveNode] = useState<Node | null>(null);
    const [hoveredConnections, setHoveredConnections] = useState<Connection[]>([]);
    const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate node positions
    const updateNodePositions = () => {
        if (!containerRef.current) return;

        const nodes = containerRef.current.querySelectorAll<HTMLElement>('[data-node-id]');
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        
        if (!canvasRect) return;

        const positions = Array.from(nodes).map(node => {
            const rect = node.getBoundingClientRect();
            return {
                id: node.dataset.nodeId || '',
                x: rect.left + rect.width / 2 - canvasRect.left,
                y: rect.top + rect.height / 2 - canvasRect.top,
                element: node,
            };
        });

        setNodePositions(positions);
    };

    // Calculate connections for hovered node
    const calculateConnections = (nodeId : string) => {
        const connections : Connection[] = [];
        const visitedNodes = new Set();
        const visitedEdges = new Set();

        // 1. Helper to find all downstream connections (Forward)
        const traceForward = (id: string) => {
            const nodeData = graph.nodes.find(n => n.id === id);
            if (!nodeData || !nodeData.links) return;

            nodeData.links.forEach(targetId => {
            const edgeKey = `${id}-${targetId}`;
            if (!visitedEdges.has(edgeKey)) {
                const fromPos = nodePositions.find(p => p.id === id);
                const toPos = nodePositions.find(p => p.id === targetId);

                if (fromPos && toPos) {
                    connections.push({ from: fromPos, to: toPos });
                    visitedEdges.add(edgeKey);
                    visitedNodes.add(id);
                    visitedNodes.add(targetId);
                    traceForward(targetId);
                }
            }
            });
        };

        // 2. Helper to find all upstream connections (Backward)
        const traceBackward = (id: string) => {
            graph.nodes.forEach(node => {
                if (node.links && node.links.includes(id)) {
                    const edgeKey = `${node.id}-${id}`;
                    if (!visitedEdges.has(edgeKey)) {
                        const fromPos = nodePositions.find(p => p.id === node.id);
                        const toPos = nodePositions.find(p => p.id === id);

                        if (fromPos && toPos) {
                            connections.push({ from: fromPos, to: toPos });
                            visitedEdges.add(edgeKey);
                            visitedNodes.add(id);
                            visitedNodes.add(node.id);
                            traceBackward(node.id);
                        }
                    }
                }
            });
        };

        traceForward(nodeId);
        traceBackward(nodeId);

        return connections;
    };

    // Handle node hover
    const handleNodeEnter = (nodeId: string) => {
        const nodeData = graph.nodes.find(n => n.id === nodeId);
        setActiveNode(nodeData || null);
        const connections = calculateConnections(nodeId);
        setHoveredConnections(connections);
    };

    const handleNodeLeave = () => {
        setActiveNode(null);
        setHoveredConnections([]);
    };

    // Draw connections on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const drawConnections = (timestamp: number) => {
            if (!ctx) return;
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (hoveredConnections.length > 0) {
                // Draw connection lines
                hoveredConnections.forEach(conn => {
                ctx.beginPath();
                ctx.moveTo(conn.from.x, conn.from.y);
                ctx.lineTo(conn.to.x, conn.to.y);
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
                });

                // Draw animated particles
                const time = timestamp / 1000;
                hoveredConnections.forEach((conn, index) => {
                const progress = (time * 0.8 + index * 0.15) % 1;
                const x = conn.from.x + (conn.to.x - conn.from.x) * progress;
                const y = conn.from.y + (conn.to.y - conn.from.y) * progress;

                // Particle
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
                ctx.fill();
                });
            }

            requestAnimationFrame(drawConnections);
        };

        const animationId = requestAnimationFrame(drawConnections);

        return () => cancelAnimationFrame(animationId);
    }, [hoveredConnections]);

    // Update positions on mount and resize
    useEffect(() => {
        updateNodePositions();
        
        const handleResize = () => {
            updateNodePositions();
            if (canvasRef.current) {
                canvasRef.current.width = canvasRef.current.offsetWidth;
                canvasRef.current.height = canvasRef.current.offsetHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        setTimeout(updateNodePositions, 100);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if node is connected to active node
    const isNodeActive = (nodeId: string) => {
        if (!activeNode) return false;
        return hoveredConnections.some(
            conn => conn.from.id === nodeId || conn.to.id === nodeId
        );
    };

    // Group nodes by layer
    const nodesByLayer = graph.nodes.reduce((acc: NodeByLayers , node: Node) => {
        if (!acc[node.layer]) acc[node.layer] = [];
        acc[node.layer].push(node);
        return acc;
    }, {} as NodeByLayers);

    const layers = Object.keys(nodesByLayer).sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });

    // Calculate dimensions
    const baseSize = 56;
    const nodeSize = baseSize;

    function NetworkVisualisation(){
        return (
            <div 
                className={`relative w-fit mx-1 bg-[#1a1a1a] rounded-[2px] border border-1 border-solid border-[#404040]`}
                ref={containerRef}
                >
            
                <canvas className="absolute top-0 left-0 w-full h-full" ref={canvasRef} />
                <div className="flex items-center justify-center h-full">
                    <div className='relative flex justify-center z-10 w-full h-full items-center p-[4rem] pt-[1.5rem] gap-[10rem]'>
                        {layers.map((layerKey, index) => (
                            <div className='flex flex-grow flex-col items-center justify-center h-full w-full' key={layerKey}>
                                <div key={layerKey} className='flex flex-col items-center gap-[1rem] items-center'>
                                    {nodesByLayer[parseInt(layerKey)].map((node) => (
                                        <NodeComponent
                                        key={node.id}
                                        node={node}
                                        size={nodeSize}
                                        isActive={isNodeActive(node.id)}
                                        onEnter={handleNodeEnter}
                                        onLeave={handleNodeLeave}
                                        />
                                    ))}
                                </div>

                                <p className='absolute bottom-[1rem] text-[#737373] text-base'>
                                    {graph.labels[index]}
                                </p>
                            
                            </div>
                        ))}
                    </div>
                </div>
                </div>
        );
    }

    function SideInfoPanel() {
        return (
            <div className="flex flex-col w-[280px]"> 
                <div className="sticky top-8 p-8 bg-[#1a1a1a] border border-[#404040] rounded-[2px] min-h-[200px] transition-opacity duration-300 ease-in-out h-full flex flex-col">
                    <div className="text-[1rem] font-bold text-[#3b82f6] mb-[1rem]">
                        {activeNode ? activeNode.name : 'Neural Network'}
                    </div>
                    <div className='text-[0.8rem] text-[#737373]'>
                        {activeNode ? activeNode.description : 'Hover over nodes to see connections and explore the tech stack'}
                    </div>
                </div>
            </div>
        );
    }

    return {NetworkVisualisation, SideInfoPanel};
}


export default function TechStackNetwork
(
    { graph} : { graph: Graph}
){
    const { NetworkVisualisation, SideInfoPanel } = NetworkComponents({graph});

    return (
        <div className="font-['IBM_Plex_Mono',_monospace] w-full max-w-[1400px] mx-auto items-center">

            <div className="flex gap-[1rem] items-stretch justify-center">
                <NetworkVisualisation />
                <SideInfoPanel />
            </div>
        </div>
    );
};

// Styles
const styles = {

  node: {
    position: 'relative',
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  nodeBorder: {
    position: 'absolute',
    inset: '-6px',
    border: '1px solid transparent',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
  },
  nodeImg: {
    objectFit: 'contain',
    transition: 'filter 0.3s ease',
  },
  layerLabel: {
    bottom: '1rem',
    fontSize: '0.75rem',
    color: '#737373',
    fontWeight: 300,
    letterSpacing: '0.1em',
    whiteSpace: 'nowrap',
  },
  sidePanel: {
    width: '280px',
    flexShrink: 0,
  },
  infoPanelContent: {
    position: 'sticky',
    top: '2rem',
    padding: '2rem',
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '2px',
    minHeight: '200px',
    transition: 'opacity 0.3s ease',
    height: '100%',
  },
  infoTech: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#3b82f6',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  infoDescription: {
    fontSize: '0.8rem',
    color: '#737373',
    lineHeight: 1.7,
    fontWeight: 300,
  },
};
