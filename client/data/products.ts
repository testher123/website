export interface LightingProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  specifications: {
    wattage: string;
    colorTemperature: string;
    brightness: string;
    voltage: string;
    dimensions: string;
  };
}

export const lightingCategories = [
  { id: 'chandeliers', name: 'Chandeliers', icon: '💎' },
  { id: 'pendant', name: 'Pendant Lights', icon: '🪞' },
  { id: 'wall-sconces', name: 'Wall Sconces', icon: '🪟' },
  { id: 'ceiling', name: 'Ceiling Lights', icon: '💡' },
  { id: 'desk', name: 'Desk Lamps', icon: '🏮' },
  { id: 'floor', name: 'Floor Lamps', icon: '🕯️' },
  { id: 'outdoor', name: 'Outdoor Lighting', icon: '✨' },
  { id: 'bulbs', name: 'Bulbs', icon: '🔆' },
  { id: 'accessories', name: 'Lighting Accessories', icon: '⚙️' },
];

export const products: LightingProduct[] = [
  {
    id: 1,
    name: 'Crystal Chandelier - Grand Elegance',
    category: 'chandeliers',
    price: 145999,
    rating: 4.8,
    reviews: 234,
    image: 'bg-blue-100',
    description: 'Stunning crystal chandelier with 12 arms, perfect for large spaces',
    specifications: {
      wattage: '60W',
      colorTemperature: '3000K (Warm White)',
      brightness: '3600 Lumens',
      voltage: '220V',
      dimensions: '80cm H x 100cm W',
    },
  },
  {
    id: 2,
    name: 'Modern Pendant Light - Minimalist',
    category: 'pendant',
    price: 45999,
    rating: 4.9,
    reviews: 189,
    image: 'bg-purple-100',
    description: 'Sleek modern pendant light with adjustable height',
    specifications: {
      wattage: '15W',
      colorTemperature: '4000K (Cool White)',
      brightness: '1200 Lumens',
      voltage: '220V',
      dimensions: '30cm H x 25cm Diameter',
    },
  },
  {
    id: 3,
    name: 'Brass Wall Sconce - Vintage',
    category: 'wall-sconces',
    price: 32000,
    rating: 4.7,
    reviews: 67,
    image: 'bg-green-100',
    description: 'Elegant brass wall sconce with vintage design',
    specifications: {
      wattage: '20W',
      colorTemperature: '2700K (Soft Warm)',
      brightness: '800 Lumens',
      voltage: '220V',
      dimensions: '25cm H x 15cm W',
    },
  },
  {
    id: 4,
    name: 'LED Ceiling Light - Flush Mount',
    category: 'ceiling',
    price: 18500,
    rating: 4.6,
    reviews: 142,
    image: 'bg-orange-100',
    description: 'Energy-efficient LED ceiling light for bedrooms and living areas',
    specifications: {
      wattage: '12W',
      colorTemperature: '3000K (Warm White)',
      brightness: '900 Lumens',
      voltage: '220V',
      dimensions: '40cm Diameter x 8cm H',
    },
  },
  {
    id: 5,
    name: 'Desk Lamp - LED Task Light',
    category: 'desk',
    price: 12999,
    rating: 4.5,
    reviews: 89,
    image: 'bg-pink-100',
    description: 'Adjustable LED desk lamp with flexible arm for reading and work',
    specifications: {
      wattage: '9W',
      colorTemperature: '4000K (Neutral White)',
      brightness: '600 Lumens',
      voltage: '220V',
      dimensions: '50cm H (extendable) x 20cm Base',
    },
  },
  {
    id: 6,
    name: 'Floor Lamp - Arc Design',
    category: 'floor',
    price: 35000,
    rating: 4.7,
    reviews: 156,
    image: 'bg-indigo-100',
    description: 'Modern arc floor lamp with dimming capability',
    specifications: {
      wattage: '40W',
      colorTemperature: '3000K (Warm White)',
      brightness: '2000 Lumens',
      voltage: '220V',
      dimensions: '180cm H (adjustable) x 40cm Radius',
    },
  },
  {
    id: 7,
    name: 'LED Outdoor Spotlight - Solar',
    category: 'outdoor',
    price: 28500,
    rating: 4.8,
    reviews: 203,
    image: 'bg-red-100',
    description: 'Solar-powered outdoor spotlight with motion sensor',
    specifications: {
      wattage: '10W',
      colorTemperature: '6000K (Daylight)',
      brightness: '800 Lumens',
      voltage: 'Solar Powered',
      dimensions: '15cm H x 12cm W',
    },
  },
  {
    id: 8,
    name: 'Edison Bulb - Vintage Style',
    category: 'bulbs',
    price: 5500,
    rating: 4.6,
    reviews: 95,
    image: 'bg-teal-100',
    description: 'Classic Edison-style filament bulb with warm glow',
    specifications: {
      wattage: '4W',
      colorTemperature: '2700K (Warm White)',
      brightness: '300 Lumens',
      voltage: '220V',
      dimensions: '10cm H x 6.5cm Diameter',
    },
  },
  {
    id: 9,
    name: 'Smart RGB LED Bulb - WiFi',
    category: 'bulbs',
    price: 22000,
    rating: 4.7,
    reviews: 178,
    image: 'bg-yellow-100',
    description: 'WiFi-enabled RGB smart bulb with 16 million colors',
    specifications: {
      wattage: '9W',
      colorTemperature: '1600K - 6500K (Adjustable)',
      brightness: '800 Lumens',
      voltage: '220V',
      dimensions: '11cm H x 7.5cm Diameter',
    },
  },
  {
    id: 10,
    name: 'Dimmer Switch - Universal',
    category: 'accessories',
    price: 8999,
    rating: 4.5,
    reviews: 134,
    image: 'bg-cyan-100',
    description: 'Universal dimmer switch compatible with most bulbs',
    specifications: {
      wattage: 'Up to 500W',
      colorTemperature: 'N/A',
      brightness: 'Adjustable 0-100%',
      voltage: '220V',
      dimensions: '8cm H x 8cm W x 3cm D',
    },
  },
  {
    id: 11,
    name: 'Light Fixture Mounting Hardware',
    category: 'accessories',
    price: 3999,
    rating: 4.6,
    reviews: 87,
    image: 'bg-lime-100',
    description: 'Universal mounting kit for light fixtures',
    specifications: {
      wattage: 'N/A',
      colorTemperature: 'N/A',
      brightness: 'N/A',
      voltage: 'N/A',
      dimensions: 'Multiple options (10-20cm)',
    },
  },
  {
    id: 12,
    name: 'Decorative Lamp Shade',
    category: 'accessories',
    price: 6999,
    rating: 4.4,
    reviews: 56,
    image: 'bg-rose-100',
    description: 'Stylish fabric lamp shade with multiple colors',
    specifications: {
      wattage: 'N/A',
      colorTemperature: 'N/A',
      brightness: 'N/A',
      voltage: 'N/A',
      dimensions: '30cm H x 35cm Diameter',
    },
  },
];
