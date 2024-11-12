import React, { useState } from 'react';
import { Brain, Grid, Eye, Fingerprint } from 'lucide-react';
import NetworkLayer from './NetworkLayer';

const CAT_IMAGE_URL = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&h=400";
const DOG_IMAGE_URL = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&h=400";
const LUXURY_HOUSE_URL = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&h=400";
const STARTER_HOUSE_URL = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&h=400";

const catLayers = [
  {
    name: 'Input Layer',
    neurons: 4,
    features: ['RGB: 255,220,180', 'RGB: 190,165,140', 'RGB: 220,198,175', 'RGB: 245,210,188'],
    icon: Grid,
    description: 'Raw pixel values from the input image',
    activations: [0.8, 0.6, 0.7, 0.5]
  },
  {
    name: 'Hidden Layer 1',
    neurons: 4,
    features: ['Edges', 'Colors', 'Shapes', 'Texture'],
    icon: Eye,
    description: 'Detects fundamental visual features',
    activations: [0.9, 0.7, 0.8, 0.6]
  },
  {
    name: 'Hidden Layer 2',
    neurons: 4,
    features: ['Whiskers', 'Ears', 'Fur', 'Eyes'],
    icon: Fingerprint,
    description: 'Combines into complex patterns',
    activations: [0.95, 0.85, 0.9, 0.8]
  },
  {
    name: 'Output Layer',
    neurons: 2,
    features: ['Cat', 'Dog'],
    icon: Brain,
    description: 'Final classification',
    activations: [0.92, 0.08]
  }
];

const dogLayers = [
  {
    ...catLayers[0],
    features: ['RGB: 120,98,75', 'RGB: 180,155,130', 'RGB: 200,178,155', 'RGB: 165,140,118'],
    activations: [0.7, 0.8, 0.6, 0.75]
  },
  {
    ...catLayers[1],
    activations: [0.85, 0.75, 0.9, 0.8]
  },
  {
    ...catLayers[2],
    activations: [0.3, 0.4, 0.95, 0.85]
  },
  {
    ...catLayers[3],
    activations: [0.15, 0.85]
  }
];

const starterHouseLayers = [
  {
    name: 'Input Layer',
    neurons: 4,
    features: ['1,200 sqft', '2 beds', 'Suburban', '1985'],
    icon: Grid,
    description: 'Raw numerical input features',
    activations: [0.45, 0.4, 0.5, 0.4]
  },
  {
    name: 'Hidden Layer 1',
    neurons: 4,
    features: ['Living Space', 'Family Size', 'Neighborhood', 'Age Factor'],
    icon: Eye,
    description: 'Basic feature combinations',
    activations: [0.5, 0.45, 0.55, 0.5]
  },
  {
    name: 'Hidden Layer 2',
    neurons: 4,
    features: ['Luxury Level', 'Family Appeal', 'Location Value', 'Investment Age'],
    icon: Fingerprint,
    description: 'High-level property aspects',
    activations: [0.4, 0.6, 0.5, 0.45]
  },
  {
    name: 'Output Layer',
    neurons: 1,
    features: ['$275,000'],
    icon: Brain,
    description: 'Predicted house price',
    activations: [0.45]
  }
];

const luxuryHouseLayers = [
  {
    name: 'Input Layer',
    neurons: 4,
    features: ['4,500 sqft', '5 beds', 'Beachfront', '2022'],
    icon: Grid,
    description: 'Raw numerical input features',
    activations: [0.95, 0.9, 0.98, 0.85]
  },
  {
    name: 'Hidden Layer 1',
    neurons: 4,
    features: ['Living Space', 'Family Size', 'Neighborhood', 'Age Factor'],
    icon: Eye,
    description: 'Basic feature combinations',
    activations: [0.92, 0.85, 0.95, 0.9]
  },
  {
    name: 'Hidden Layer 2',
    neurons: 4,
    features: ['Luxury Level', 'Family Appeal', 'Location Value', 'Investment Age'],
    icon: Fingerprint,
    description: 'High-level property aspects',
    activations: [0.95, 0.85, 0.98, 0.9]
  },
  {
    name: 'Output Layer',
    neurons: 1,
    features: ['$2,450,000'],
    icon: Brain,
    description: 'Predicted house price',
    activations: [0.95]
  }
];

type ExampleType = 'none' | 'cat' | 'dog' | 'starter-house' | 'luxury-house';

const NeuralNetwork = () => {
  const [activeNeuron, setActiveNeuron] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [selectedExample, setSelectedExample] = useState<ExampleType>('none');

  const handleNeuronHover = (layerIndex: number, neuronIndex: number) => {
    setActiveNeuron(neuronIndex);
    setActiveLayer(layerIndex);
  };

  const getExampleLayers = () => {
    switch (selectedExample) {
      case 'dog':
        return dogLayers;
      case 'cat':
        return catLayers;
      case 'starter-house':
        return starterHouseLayers;
      case 'luxury-house':
        return luxuryHouseLayers;
      default:
        return catLayers;
    }
  };

  const currentLayers = getExampleLayers();

  const getExampleImage = () => {
    switch (selectedExample) {
      case 'dog':
        return DOG_IMAGE_URL;
      case 'cat':
        return CAT_IMAGE_URL;
      case 'starter-house':
        return STARTER_HOUSE_URL;
      case 'luxury-house':
        return LUXURY_HOUSE_URL;
      default:
        return '';
    }
  };

  const isAnimalExample = selectedExample === 'cat' || selectedExample === 'dog';
  const isHouseExample = selectedExample === 'starter-house' || selectedExample === 'luxury-house';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Neural Network in Action
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how neural networks learn different types of patterns
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setSelectedExample(isAnimalExample ? 'none' : 'cat')}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isAnimalExample
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cat vs Dog Example
              </button>
              <button
                onClick={() => setSelectedExample(isHouseExample ? 'none' : 'starter-house')}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isHouseExample
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                House Price Example
              </button>
            </div>
            
            {isAnimalExample && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSelectedExample('cat')}
                  className={`px-4 py-1 rounded transition-colors ${
                    selectedExample === 'cat'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cat Image
                </button>
                <button
                  onClick={() => setSelectedExample('dog')}
                  className={`px-4 py-1 rounded transition-colors ${
                    selectedExample === 'dog'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dog Image
                </button>
              </div>
            )}

            {isHouseExample && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSelectedExample('starter-house')}
                  className={`px-4 py-1 rounded transition-colors ${
                    selectedExample === 'starter-house'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Starter Home
                </button>
                <button
                  onClick={() => setSelectedExample('luxury-house')}
                  className={`px-4 py-1 rounded transition-colors ${
                    selectedExample === 'luxury-house'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Luxury Home
                </button>
              </div>
            )}
          </div>

          {selectedExample !== 'none' && (
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={getExampleImage()}
                    alt={`${selectedExample} example`}
                    className="rounded-lg shadow-md w-64 h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg"></div>
                </div>
              </div>
              <p className="text-center text-gray-600 mb-8">
                {isHouseExample 
                  ? `See how the network processes ${selectedExample === 'luxury-house' ? 'luxury' : 'starter'} home features`
                  : `Observe how neurons activate for this ${selectedExample} image`}
              </p>
            </div>
          )}

          <div className="flex justify-between items-start gap-8 overflow-x-auto pb-4">
            {currentLayers.map((layer, layerIndex) => (
              <NetworkLayer
                key={layer.name}
                {...layer}
                activeNeuron={activeNeuron}
                activeLayer={activeLayer}
                layerIndex={layerIndex}
                onNeuronHover={handleNeuronHover}
                onNeuronLeave={() => {
                  setActiveNeuron(null);
                  setActiveLayer(null);
                }}
                activationStrengths={selectedExample !== 'none' ? layer.activations : undefined}
                isLastLayer={layerIndex === currentLayers.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Understanding the Network</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isHouseExample ? (
              <>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Feature Learning</h4>
                  <p className="text-gray-600">
                    Compare how the network processes different house types. Notice how luxury homes
                    activate high-end feature detectors more strongly, while starter homes trigger
                    more moderate activation patterns across all layers.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Price Prediction</h4>
                  <p className="text-gray-600">
                    The final layer shows dramatically different price predictions based on the
                    learned features. Luxury features like location and size lead to much higher
                    valuations compared to starter home characteristics.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Feature Detection</h4>
                  <p className="text-gray-600">
                    Notice how early layers detect similar basic features (edges, colors) for both images,
                    but deeper layers activate differently based on species-specific characteristics.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Classification Confidence</h4>
                  <p className="text-gray-600">
                    The output layer shows high confidence for the correct class while maintaining low
                    activation for the incorrect one, demonstrating the network's ability to distinguish between cats and dogs.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;