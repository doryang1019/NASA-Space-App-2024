import React, { useEffect, useState } from 'react';
import SpaceObject from './SpaceObject';

const APP_URL = 'https://localhost:3001';

function DataFetchComponent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const res = await fetch(APP_URL + "/parent");
            if(res.ok) {
                const result = await res.json();
                setData(result);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
}

const exoplanetData = {
  "Exoplanets": {
    type: "star",
    children: [
      { name: "Gas Giants", type: "gasGiant" },
      { name: "Neptunian", type: "neptunian" },
      { name: "Super-Earths", type: "superEarth" },
      { name: "Terrestrial", type: "terrestrial" },
    ]
  },
  "Gas Giants": {
    type: "gasGiant",
    children: [
      { name: "Types", type: "category" },
      { name: "Characteristics", type: "category" },
      { name: "Notable Examples", type: "category" },
      { name: "Formation", type: "category" },
      { name: "Importance", type: "category" },
      {name: "Test", type: "category"},
    ],
    explanation: [
      "Large planets mainly composed of hydrogen and helium",
      "Similar to Jupiter and Saturn in our solar system",
      "Among the most commonly detected exoplanets"
    ]
  },
  "Types": {
    type: "category",
    children: [
      { name: "Hot Jupiters", type: "info" },
      { name: "Cold Jupiters", type: "info" },
      { name: "Super-Jupiters", type: "info" },
    ]
  },
  "Hot Jupiters": {
    type: "info",
    explanation: ["Orbit very close to their stars"]
  },
  "Cold Jupiters": {
    type: "info",
    explanation: ["Orbit farther from their stars"]
  },
  "Super-Jupiters": {
    type: "info",
    explanation: ["More massive than Jupiter"]
  },
  "Characteristics": {
    type: "category",
    children: [
      { name: "Composition", type: "info" },
      { name: "Size", type: "info" },
      { name: "Atmosphere", type: "info" },
      { name: "Orbits", type: "info" },
    ]
  },
  "Composition": {
    type: "info",
    explanation: ["Mainly hydrogen and helium", "May have rocky or icy cores"]
  },
  "Size": {
    type: "info",
    explanation: ["Typically larger than Neptune", "Can be several times Jupiter's size"]
  },
  "Atmosphere": {
    type: "info",
    explanation: ["Thick, extensive atmospheres", "Complex weather patterns"]
  },
  "Orbits": {
    type: "info",
    explanation: ["Can be found in various orbital distances", "Some orbit extremely close to their stars"]
  },
  "Notable Examples": {
    type: "category",
    children: [
      { name: "51 Pegasi b", type: "info" },
      { name: "HD 189733 b", type: "info" },
      { name: "WASP-121b", type: "info" },
    ]
  },
  "51 Pegasi b": {
    type: "info",
    explanation: ["First exoplanet found around a Sun-like star"]
  },
  "HD 189733 b": {
    type: "info",
    explanation: ["Known for its deep blue color"]
  },
  "WASP-121b": {
    type: "info",
    explanation: ["Ultra-hot Jupiter with a disintegrating atmosphere"]
  },
  "Formation": {
    type: "category",
    children: [
      { name: "Origin", type: "info" },
      { name: "Migration", type: "info" },
      { name: "Habitability", type: "info" },
    ]
  },
  "Origin": {
    type: "info",
    explanation: ["Believed to form in outer regions of planetary systems"]
  },
  "Migration": {
    type: "info",
    explanation: ["May migrate inward over time"]
  },
  "Habitability": {
    type: "info",
    explanation: ["Not considered habitable, but their moons might support life"]
  },
  "Importance": {
    type: "category",
    children: [
      { name: "System Formation", type: "info" },
      { name: "Detection", type: "info" },
      { name: "Atmospheric Study", type: "info" },
    ]
  },
  "System Formation": {
    type: "info",
    explanation: ["Help understand planetary system formation and evolution"]
  },
  "Detection": {
    type: "info",
    explanation: ["Easier to detect due to their large size"]
  },
  "Atmospheric Study": {
    type: "info",
    explanation: ["Provide insights into atmospheric composition of distant worlds"]
  },
};

const BulletPoints = ({ points }) => (
  <ul className="list-disc list-inside text-left ml-4">
    {points.map((point, index) => (
      <li key={index} className="mb-2">{point}</li>
    ))}
  </ul>
);


const MindMap = ({ data, onSelect }) => {
  if (!data) return null;

  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto border border-gray-700">
      <rect width="800" height="600" fill="#111827" />
      {[...Array(100)].map((_, i) => (
        // this is the star in the background
        <circle
          key={i}
          cx={Math.random() * 800}
          cy={Math.random() * 600}
          r={Math.random() * 2}
          fill="white"
        />
      ))}
      <SpaceObject
        type={data.type}
        x={400}
        y={300}
        size={80}
        color="#FFD700"
        onClick={() => onSelect(data.name)}
      >
        {data.name}
      </SpaceObject>
      {data.children && data.children.map((child, index) => {
        const angle = (index / data.children.length) * Math.PI * 2;
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
              onClick={() => onSelect(child.name)}
            >
              {child.name}
            </SpaceObject>
          </g>
        );
      })}
    </svg>
  );
};

const AstronautMindMap = () => {
  const [currentTopic, setCurrentTopic] = useState("Exoplanets");
  const [history, setHistory] = useState([]);

  const handleSelect = (topic) => {
    if (exoplanetData[topic]) {
      setHistory([...history, currentTopic]);
      setCurrentTopic(topic);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousTopic = newHistory.pop();
      setCurrentTopic(previousTopic);
      setHistory(newHistory);
    }
  };

  const handleMainPage = () => {
    setCurrentTopic("Exoplanets");
    setHistory([]);
  };

  const currentData = exoplanetData[currentTopic];

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">{currentTopic}</h1>
      <div className="mb-4">
        {currentTopic !== "Exoplanets" && (
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {currentTopic !== "Exoplanets" && (
          <button
            className="px-2 py-1 bg-green-500 text-white rounded"
            onClick={handleMainPage}
          >
            Main Page
          </button>
        )}
      </div>
      {currentData && (
        <MindMap
          data={{name: currentTopic, ...currentData}}
          onSelect={handleSelect}
        />
      )}
      {currentData && currentData.explanation && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Explanation:</h2>
          <BulletPoints points={currentData.explanation} />
        </div>
      )}
    </div>
  );
};

export default AstronautMindMap;
