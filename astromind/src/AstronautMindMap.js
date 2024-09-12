import React, { useState } from 'react';
import SpaceObject from './SpaceObject';

const AstronautMindMap = () => {
  const [mindMapData, setMindMapData] = useState({
    name: "Exoplanets",
    type: "star",
    children: [
      { name: "Gas Giants", type: "gasGiant" },
      { name: "Neptunian", type: "neptunian" },
      { name: "Super-Earths", type: "superEarth" },
      { name: "Terrestrial", type: "terrestrial" },
    ]
  });

  const [editingNode, setEditingNode] = useState(null);

  const handleEdit = (node) => {
    setEditingNode(node);
  };

  const handleSave = () => {
    if (editingNode) {
      const updatedData = {...mindMapData};
      if (editingNode === mindMapData) {
        updatedData.name = editingNode.name;
      } else {
        const index = mindMapData.children.findIndex(child => child === editingNode);
        if (index !== -1) {
          updatedData.children[index] = {...editingNode};
        }
      }
      setMindMapData(updatedData);
      setEditingNode(null);
    }
  };

  const addSubtopic = () => {
    const types = ['gasGiant', 'neptunian', 'superEarth', 'terrestrial'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setMindMapData({
      ...mindMapData,
      children: [...mindMapData.children, { name: "New Exoplanet", type: randomType }]
    });
  };

  return (
    <div className="p-4 bg-gray-900">
      <div className="mb-4">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={addSubtopic}
        >
          Add Exoplanet
        </button>
      </div>
      <svg viewBox="0 0 800 600" className="w-full h-auto border border-gray-700">
        <rect width="800" height="600" fill="#111827" />
        {/* Stars background */}
        {[...Array(100)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 800}
            cy={Math.random() * 600}
            r={Math.random() * 2}
            fill="white"
          />
        ))}
        <SpaceObject
          type={mindMapData.type}
          x={400}
          y={300}
          size={80}
          color="#FFD700"
          onClick={() => handleEdit(mindMapData)}
        >
          {mindMapData.name}
        </SpaceObject>
        {mindMapData.children.map((child, index) => {
          const angle = (index / mindMapData.children.length) * Math.PI * 2;
          const x = 400 + Math.cos(angle) * 200;
          const y = 300 + Math.sin(angle) * 200;
          return (
            <g key={index}>
              <line
                x1="400"
                y1="300"
                x2={x}
                y2={y}
                stroke="#4B5563"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <SpaceObject
                type={child.type}
                x={x}
                y={y}
                size={60}
                color={['#EF4444', '#F59E0B', '#10B981', '#3B82F6'][index % 4]}
                onClick={() => handleEdit(child)}
              >
                {child.name}
              </SpaceObject>
            </g>
          );
        })}
      </svg>
      {editingNode && (
        <div className="mt-4">
          <input
            type="text"
            value={editingNode.name}
            onChange={(e) => setEditingNode({...editingNode, name: e.target.value})}
            className="border p-1 mr-2 bg-gray-800 text-white"
          />
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AstronautMindMap;
