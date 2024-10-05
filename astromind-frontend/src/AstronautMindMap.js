import React, { useState, useEffect } from 'react';
import SpaceObject from './SpaceObject';
import Quiz from './Quiz';
const API_URL = 'http://localhost:3001';

const MindMap = ({ data, onSelect }) => {
  if (!data) return null;

  const isTopLevel = Array.isArray(data);

  const renderNode = (node, x, y, size) => {
    const childrenCount = node.children ? node.children.length : 0;
    const angleStep = (2 * Math.PI) / childrenCount;
    const childDistance = 200;

    return (
      <g key={node.id}>
        <SpaceObject
          type={getNodeType(node.name)}
          x={x}
          y={y}
          size={size}
          color="#FFD700"
          onClick={() => onSelect(node.id)}
        >
          {node.name}
        </SpaceObject>
        {node.children && node.children.map((child, index) => {
          const angle = index * angleStep;
          const childX = x + Math.cos(angle) * childDistance;
          const childY = y + Math.sin(angle) * childDistance;
          return (
            <g key={child.id}>
              <line
                x1={x}
                y1={y}
                x2={childX}
                y2={childY}
                stroke="#4B5563"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <SpaceObject
                type={getNodeType(child.name)}
                x={childX}
                y={childY}
                size={size * 0.8}
                color={['#EF4444', '#F59E0B', '#10B981', '#3B82F6'][index % 4]}
                onClick={() => onSelect(child.id)}
              >
                {child.name}
              </SpaceObject>
            </g>
          );
        })}
      </g>
    );
  };

  const getNodeType = (name) => {
    switch (name) {
      case 'Gas Giant':
        return 'gasGiant';
      case 'Terrestrial':
        return 'terrestrial';
      case 'Super-Earths':
        return 'superEarth';
      case 'Neptunian Exoplanets':
        return 'neptunian';
      default:
        return 'planet';
    }
  };

  return (
    <svg viewBox="-400 -300 800 600" className="w-full h-auto border border-gray-700">
      <rect x="-400" y="-300" width="800" height="600" fill="#111827" />
      {[...Array(100)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 800 - 400}
          cy={Math.random() * 600 - 300}
          r={Math.random() * 2}
          fill="white"
        />
      ))}
      <SpaceObject
        type="star"
        x={0}
        y={0}
        size={80}
        color="#FDB813"
        onClick={() => {}}
      >
      </SpaceObject>
      {isTopLevel ? (
        data.map((item, index) => {
          const angle = (index / data.length) * Math.PI * 2;
          const x = Math.cos(angle) * 200;
          const y = Math.sin(angle) * 200;
          return (
            <g key={item.id}>
              <line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke="#4B5563"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <SpaceObject
                type={getNodeType(item.name)}
                x={x}
                y={y}
                size={60}
                color={['#EF4444', '#F59E0B', '#10B981', '#3B82F6'][index % 4]}
                onClick={() => onSelect(item.id)}
              >
                {item.name}
              </SpaceObject>
            </g>
          );
        })
      ) : (
        renderNode(data, 0, 0, 80)
      )}
    </svg>
  );
};

const AstroButton = ({ onClick, children, type }) => {
    const [isHovered, setIsHovered] = useState(false);

    let buttonContent;
    switch (type) {
      case 'back':
        buttonContent = (
          <svg width="60" height="60" viewBox="0 0 60 60" className="transform transition-all duration-300 ease-in-out hover:scale-110">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="30" cy="30" r="28" fill="#3B82F6" filter={isHovered ? "url(#glow)" : ""} />
            <path d="M35 20 L25 30 L35 40" stroke="white" strokeWidth="3" fill="none" />
            {isHovered && (
              <g>
                <circle cx="20" cy="15" r="3" fill="white" opacity="0.5" />
                <circle cx="40" cy="45" r="2" fill="white" opacity="0.3" />
              </g>
            )}
          </svg>
        );
        break;
      case 'main':
        buttonContent = (
          <svg width="60" height="60" viewBox="0 0 60 60" className="transform transition-all duration-300 ease-in-out hover:scale-110">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="30" cy="30" r="28" fill="#10B981" filter={isHovered ? "url(#glow)" : ""} />
            <circle cx="30" cy="30" r="12" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            {isHovered && (
              <g>
                <circle cx="45" cy="20" r="2" fill="white" opacity="0.5" />
                <circle cx="15" cy="40" r="3" fill="white" opacity="0.3" />
              </g>
            )}
          </svg>
        );
        break;
      case 'quiz':
        buttonContent = (
          <svg width="60" height="60" viewBox="0 0 60 60" className="transform transition-all duration-300 ease-in-out hover:scale-110">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="30" cy="30" r="28" fill="#F59E0B" filter={isHovered ? "url(#glow)" : ""} />
            <text x="30" y="38" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold">Quiz</text>
            {isHovered && (
              <g>
                <circle cx="15" cy="15" r="2" fill="white" opacity="0.5" />
                <circle cx="45" cy="45" r="3" fill="white" opacity="0.3" />
                <circle cx="45" cy="15" r="1" fill="white" opacity="0.7" />
              </g>
            )}
          </svg>
        );
        break;
      default:
        buttonContent = null;
    }

    return (
      <button
        onClick={onClick}
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {buttonContent}
        <span className={`absolute inset-0 flex items-center justify-center text-white font-bold text-xs transition-all duration-300 ${isHovered ? 'text-shadow' : ''}`}>
          {children}
        </span>
      </button>
    );
  };

  const handleJoinQuiz = () => {
    // Implement the logic to join the quiz here
    console.log("Joining quiz...");
  };

const AstronautMindMap = () => {
  const [topLevelData, setTopLevelData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const fetchTopLevelData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/parent`);
      if (res.ok) {
        const result = await res.json();
        setTopLevelData(result);
      } else {
        throw new Error('Failed to fetch top-level data');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNodeDetails = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/one/${id}`);
      if (res.ok) {
        const result = await res.json();
        // Ensure we only keep the first level of children
        if (result.children) {
          result.children = result.children.map(child => ({ ...child, children: [] }));
        }
        setHistory(prev => [...prev, selectedNode]);
        setSelectedNode(result);
      } else {
        throw new Error('Failed to fetch node details');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopLevelData();
  }, []);

  const handleSelect = (id) => {
    fetchNodeDetails(id);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setSelectedNode(previousNode);
      setHistory(prev => prev.slice(0, -1));
    } else {
      setSelectedNode(null);
    }
  };

  const handleMainCategories = () => {
    setSelectedNode(null);
    setHistory([]);
  };

  const handleJoinQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <style jsx>{`
        .text-shadow {
          text-shadow: 0 0 5px white, 0 0 10px white;
        }
      `}</style>
      <h1 className="text-2xl mb-4">Exoplanet Types</h1>
      <div className="mb-4 flex gap-4">
        {selectedNode && (
          <>
            <AstroButton onClick={handleBack} type="back">
            </AstroButton>
            <AstroButton onClick={handleMainCategories} type="main">
            </AstroButton>
          </>
        )}
        <AstroButton onClick={handleJoinQuiz} type="quiz">
        </AstroButton>
      </div>
      <MindMap
        data={selectedNode || topLevelData}
        onSelect={handleSelect}
      />
      {showQuiz && <Quiz onClose={handleCloseQuiz} />}
    </div>
  );
};

export default AstronautMindMap;
