import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NetworkLayerProps {
  name: string;
  neurons: number;
  features: string[];
  icon: LucideIcon;
  description: string;
  activeNeuron: number | null;
  activeLayer: number | null;
  layerIndex: number;
  onNeuronHover: (layerIndex: number, neuronIndex: number) => void;
  onNeuronLeave: () => void;
  activationStrengths?: number[];
  isLastLayer?: boolean;
}

const NetworkLayer: React.FC<NetworkLayerProps> = ({
  name,
  neurons,
  features,
  icon: Icon,
  description,
  activeNeuron,
  activeLayer,
  layerIndex,
  onNeuronHover,
  onNeuronLeave,
  activationStrengths = [],
  isLastLayer = false,
}) => {
  const getNeuronColor = (neuronIndex: number) => {
    const baseColor = 'rgb(59, 130, 246)';
    const inactiveColor = 'rgb(209, 213, 219)';
    const previousLayerColor = 'rgb(147, 197, 253)';

    if (activeLayer === layerIndex && activeNeuron === neuronIndex) {
      return baseColor;
    }
    
    if (activationStrengths[neuronIndex] !== undefined) {
      const opacity = activationStrengths[neuronIndex];
      return `rgba(59, 130, 246, ${opacity})`;
    }

    if (activeLayer !== null) {
      if (layerIndex > activeLayer) return inactiveColor;
      if (layerIndex < activeLayer) return previousLayerColor;
    }
    
    return 'rgb(156, 163, 175)';
  };

  return (
    <div className="flex-1 min-w-[300px] flex flex-col items-center relative">
      <div className="mb-8 text-center">
        <Icon className="w-8 h-8 mb-2 mx-auto text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 max-w-[250px]">{description}</p>
      </div>

      <div className="relative flex flex-col justify-center items-center gap-6">
        {Array.from({ length: neurons }).map((_, neuronIndex) => (
          <div
            key={neuronIndex}
            className="relative group"
            onMouseEnter={() => onNeuronHover(layerIndex, neuronIndex)}
            onMouseLeave={onNeuronLeave}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer relative z-10"
              style={{
                backgroundColor: getNeuronColor(neuronIndex),
                transform: activeLayer === layerIndex && activeNeuron === neuronIndex
                  ? 'scale(1.1)'
                  : 'scale(1)'
              }}
            >
              <div className="text-center px-2">
                <div className="text-xs text-white font-medium mb-1">
                  {features[neuronIndex]}
                </div>
                {activationStrengths[neuronIndex] !== undefined && (
                  <div className="text-xs text-white font-bold">
                    {`${Math.round(activationStrengths[neuronIndex] * 100)}%`}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkLayer;