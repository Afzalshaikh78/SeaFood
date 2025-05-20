import { useEffect } from "react";
import { useStore } from "../store";

function Meals() {
  const { meals, searchQuery, setMeals, setSearchQuery } = useStore();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMeals();
  }, [setMeals]);

  // const filteredMeals = meals.filter((meal) =>
  //   meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredMeals = meals.filter((meal) => 
  meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        🐟 Seafood Recipes
      </h1>

      <input
        type="text"
        placeholder="Search for a meal..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-lg w-full h-48 object-cover mb-3"
              />
              <h2 className="text-xl font-semibold text-black text-center">
                {meal.strMeal}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No meals found</p>
        )}
      </div>
    </div>
  );
}

export default Meals;
