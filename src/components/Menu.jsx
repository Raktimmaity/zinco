import React, { useState } from "react";

const menuItems = [
  // Non-veg
  { name: "Planung Manao - Thai Style Steamed Fish", price: "₹900/1200", category: "food", type: "non-veg" },
  { name: "Ikan Sambal", price: "₹1100", category: "food", type: "non-veg" },
  { name: "Whole Bhetki", price: "₹1200", category: "food", type: "non-veg" },
  { name: "Gaeng Leuang Pla - Yellow Curry", price: "₹900", category: "food", type: "non-veg" },
  { name: "Kaming Goong", price: "₹1500", category: "food", type: "non-veg" },
  { name: "Prawns", price: "₹1600", category: "food", type: "non-veg" },
  { name: "Stemed Crab Meat Butter Garlic", price: "₹650", category: "food", type: "non-veg" },
  { name: "Whole Singapore Style Chill Crab", price: "₹795/995", category: "food", type: "non-veg" },
  { name: "Lobster Kaeng Panang", price: "₹2999", category: "food", type: "non-veg" },
  { name: "Lobster Gang Garee", price: "₹2999", category: "food", type: "non-veg" },
  { name: "Lobster", price: "₹2999", category: "food", type: "non-veg" },

  // Soups
  { name: "Thai Soup", price: "₹375/395/425", category: "food", type: "soup" },
  { name: "Tom Yum Soup", price: "₹375/395/425", category: "food", type: "soup" },
  { name: "Korean Soup", price: "₹375/395/425", category: "food", type: "soup" },
  { name: "Laksha Soup", price: "₹375/395/425", category: "food", type: "soup" },
  { name: "Prawn & Vermicelli Soup", price: "₹425", category: "food", type: "soup" },

  { name: "BBQ Ribs", price: "$15", category: "food", type: "non-veg" },

  // Bar
  // Single Malt  
  { name: "Glenlivet 15 Yrs", price: "₹700", category: "bar", type: "single-malt" },
  { name: "Glenfiddich 15 Yrs", price: "₹750", category: "bar", type: "single-malt" },
  { name: "Macallan 15", price: "$25", category: "bar", type: "single-malt" },

  { name: "Classic Mojito", price: "$10", category: "bar", type: "cocktail" },
  { name: "Whiskey Sour", price: "$11", category: "bar", type: "cocktail" },
  { name: "Craft Beer", price: "$7", category: "bar", type: "beer" },
  { name: "Heineken", price: "$6", category: "bar", type: "beer" },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("food");

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory);
  const soupItems = filteredItems.filter((item) => item.type === "soup");
  const nonVegItems = filteredItems.filter((item) => item.type === "non-veg");

  const barTypes = [...new Set(filteredItems.map(item => item.type))];
  const groupedBarItems = barTypes.reduce((acc, type) => {
    acc[type] = filteredItems.filter(item => item.type === type);
    return acc;
  }, {});

  return (
    <section id="menu" className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl text-yellow-400 font-bold mb-8">Our Menu</h2>

        {/* Category Switch */}
        <div className="flex justify-center gap-4 mb-10">
          {["food", "bar"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white hover:bg-yellow-500"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Food Section */}
        {selectedCategory === "food" && (
          <div className="space-y-10">
            {soupItems.length > 0 && (
              <fieldset className="border border-yellow-400 rounded p-4">
                <legend className="text-lg text-yellow-400 px-2 font-bold">Soups</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  {soupItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-yellow-400/40 transition">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-yellow-400 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </fieldset>
            )}

            {nonVegItems.length > 0 && (
              <fieldset className="border border-yellow-400 rounded p-4">
                <legend className="text-lg text-yellow-400 px-2 font-bold">Non-Veg</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  {nonVegItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-yellow-400/40 transition">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-yellow-400 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </fieldset>
            )}
          </div>
        )}

        {/* Bar Section */}
        {selectedCategory === "bar" && (
          <div className="space-y-10">
            {Object.entries(groupedBarItems).map(([type, items]) => (
              <fieldset key={type} className="border border-yellow-400 rounded p-4">
                <legend className="text-lg text-yellow-400 px-2 font-bold">
                  {type.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                </legend>
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-yellow-400/40 transition">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-yellow-400 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
