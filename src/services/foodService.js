const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const handleResponse = async response => {
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const fetchFoodCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await handleResponse(response);
    return data.categories || [];
  } catch (error) {
    console.error('[foodService] fetchFoodCategories error:', error.message);
    throw error;
  }
};

export const fetchMealsByCategory = async categoryName => {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`,
    );
    const data = await handleResponse(response);

    return data.meals || [];
  } catch (error) {
    console.error(
      `[foodService] fetchMealsByCategory error (${categoryName}):`,
      error.message,
    );
    throw error;
  }
};

export const fetchMealById = async mealId => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
    const data = await handleResponse(response);

    const meal = data.meals?.[0] || null;

    if (!meal) {
      throw new Error(`No meal found for id: ${mealId}`);
    }
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      image: meal.strMealThumb,
      tags: meal.strTags ? meal.strTags.split(',').map(t => t.trim()) : [],
      youtubeUrl: meal.strYoutube || null,
      ingredients,
      raw: meal,
    };
  } catch (error) {
    console.error(
      `[foodService] fetchMealById error (id: ${mealId}):`,
      error.message,
    );
    throw error;
  }
};

export const searchMeals = async query => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    );
    const data = await handleResponse(response);
    const meals = data.meals || [];

    return meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      image: meal.strMealThumb,
    }));
  } catch (error) {
    console.error(
      `[foodService] searchMeals error (query: "${query}"):`,
      error.message,
    );
    throw error;
  }
};

export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await handleResponse(response);

    const meal = data.meals?.[0] || null;
    if (!meal) {
      throw new Error('No random meal returned');
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      image: meal.strMealThumb,
      tags: meal.strTags ? meal.strTags.split(',').map(t => t.trim()) : [],
      youtubeUrl: meal.strYoutube || null,
      ingredients,
    };
  } catch (error) {
    console.error('[foodService] fetchRandomMeal error:', error.message);
    throw error;
  }
};

export const fetchMealsByIngredient = async ingredient => {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    );
    const data = await handleResponse(response);

    const meals = data.meals || [];
    return meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    }));
  } catch (error) {
    console.error(
      `[foodService] fetchMealsByIngredient error (${ingredient}):`,
      error.message,
    );
    throw error;
  }
};