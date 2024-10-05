import React, { useState } from 'react';
const SpaceObject = ({ type, x, y, size, color, onClick, children }) => {
    const objects = {
      gasGiant: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <circle cx={size/2} cy={size/2} r={size/2} fill="#FFA500" />
          <ellipse cx={size/2} cy={size/2} rx={size/2} ry={size/4} fill="none" stroke="#FFD700" strokeWidth={size/20} />
          <ellipse cx={size/2} cy={size/2} rx={size/2} ry={size/3} fill="none" stroke="#FF4500" strokeWidth={size/30} />
        </g>
      ),
      neptunian: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <circle cx={size/2} cy={size/2} r={size/2} fill="#4169E1" />
          <path d={`M ${size/4} ${size/2} Q ${size/2} ${size/4} ${3*size/4} ${size/2}`} fill="none" stroke="#ADD8E6" strokeWidth={size/20} />
          <path d={`M ${size/4} ${size/2} Q ${size/2} ${3*size/4} ${3*size/4} ${size/2}`} fill="none" stroke="#ADD8E6" strokeWidth={size/20} />
        </g>
      ),
      superEarth: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <circle cx={size/2} cy={size/2} r={size/2} fill="#8B4513" />
          <circle cx={size/2} cy={size/2} r={size/2.2} fill="#228B22" />
          <path d={`M ${size/4} ${size/2.5} Q ${size/2} ${size/4} ${3*size/4} ${size/2.5}`} fill="none" stroke="#FFFFFF" strokeWidth={size/30} />
          <circle cx={size/3} cy={size/3} r={size/20} fill="#FFFFFF" />
        </g>
      ),
      terrestrial: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <circle cx={size/2} cy={size/2} r={size/2} fill="#4682B4" />
          <path d={`M ${size/4} ${size/2} Q ${size/2} ${size/3} ${3*size/4} ${size/2}`} fill="#228B22" />
          <path d={`M ${size/4} ${size/1.8} Q ${size/2} ${size/1.5} ${3*size/4} ${size/1.8}`} fill="#8B4513" />
          <circle cx={2*size/3} cy={size/3} r={size/20} fill="#FFFFFF" />
        </g>
      ),
      astronaut: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <circle cx={size/2} cy={size/2} r={size/2} fill="#white" />
          <circle cx={size/2} cy={size/2} r={size/2.5} fill="#DBEAFE" />
          <rect x={size/3} y={size/2.2} width={size/3} height={size/3} fill="#3B82F6" rx={size/10} />
        </g>
      ),
      planet: (
        <circle cx={x} cy={y} r={size/2} fill={color} />
      ),
      star: (
        <polygon
          points={`${x},${y-size/2} ${x+size/6},${y-size/6} ${x+size/2},${y} ${x+size/6},${y+size/6} ${x},${y+size/2} ${x-size/6},${y+size/6} ${x-size/2},${y} ${x-size/6},${y-size/6}`}
          fill={color}
        />
      ),
      satellite: (
        <g transform={`translate(${x - size/2}, ${y - size/2})`}>
          <rect x={0} y={size/3} width={size} height={size/3} fill={color} />
          <rect x={size/3} y={0} width={size/3} height={size} fill={color} />
        </g>
      ),
      ufo: (
        <g transform={`translate(${x - size/2}, ${y - size/4})`}>
          <ellipse cx={size/2} cy={size/4} rx={size/2} ry={size/4} fill={color} />
          <circle cx={size/2} cy={0} r={size/4} fill="#DBEAFE" />
        </g>
      )
    };

    return (
      <g onClick={onClick} style={{cursor: 'pointer'}}>
        {objects[type]}
        <text
          x={x}
          y={y + size/2 + 15}
          fontWeight={type === 'star' ? 'bold' : 'normal'}
          textAnchor="middle"
          fill="white"
          fontFamily="'Space Mono', monospace"
          fontSize={size/5}
        >
          {children}
        </text>
      </g>
    );
  };

  export default SpaceObject;
