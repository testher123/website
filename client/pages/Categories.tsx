import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { lightingCategories, products } from "@/data/products";

export default function Categories() {
  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  const getCategoryImage = (categoryId: string) => {
    const imageMap: Record<string, string> = {
      chandeliers: "bg-blue-100",
      pendant: "bg-purple-100",
      "wall-sconces": "bg-green-100",
      ceiling: "bg-orange-100",
      desk: "bg-pink-100",
      floor: "bg-indigo-100",
      outdoor: "bg-red-100",
      bulbs: "bg-yellow-100",
      accessories: "bg-teal-100",
    };
    return imageMap[categoryId] || "bg-gray-100";
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Lighting Categories
            </h1>
            <p className="text-muted-foreground mt-2">
              Explore our premium collection of lighting solutions
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lightingCategories.map((category) => {
              const count = getCategoryCount(category.id);
              const image = getCategoryImage(category.id);
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Category Image */}
                    <div className={`${image} h-56 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <div className="text-7xl">{category.icon}</div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {count} {count === 1 ? "product" : "products"} available
                        </p>
                      </div>

                      <div className="mt-4 flex items-center text-primary font-semibold">
                        Shop Now
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Category Descriptions */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                🏠 Lighting for Every Room
              </h3>
              <p className="text-muted-foreground mb-4">
                Whether you're looking for a stunning chandelier for your living room, 
                elegant pendant lights for your dining area, or functional desk lamps for 
                your workspace, we have the perfect lighting solution.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ Chandeliers & Crystal Fixtures</li>
                <li>✓ Modern Pendant & Ceiling Lights</li>
                <li>✓ Wall Sconces & Accent Lighting</li>
                <li>✓ Task & Ambient Lighting</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                💡 Premium Bulbs & Accessories
              </h3>
              <p className="text-muted-foreground mb-4">
                Complement your fixtures with our selection of energy-efficient LED bulbs, 
                smart bulbs with WiFi control, and essential lighting accessories for 
                installation and customization.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ LED & Energy-Efficient Bulbs</li>
                <li>✓ Smart RGB & WiFi Bulbs</li>
                <li>✓ Vintage Edison Bulbs</li>
                <li>✓ Installation & Hardware</li>
              </ul>
            </div>
          </div>

          {/* Outdoor Lighting Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ✨ Outdoor Lighting Solutions
            </h3>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Enhance your outdoor spaces with weather-resistant lighting including 
              solar-powered spotlights, pathway lights, and landscape fixtures. 
              Perfect for gardens, patios, and exterior areas.
            </p>
            <Link
              to="/products?category=outdoor"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Browse Outdoor Lighting <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
