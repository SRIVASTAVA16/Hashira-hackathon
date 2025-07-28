import { menuData, MenuItem, ComboMeal, TASTE_PROFILES } from '@/data/menuData';

// Seeded random function for consistent daily generation
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get day seed based on day name
function getDaySeed(day: string): number {
  return day.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Shuffle array with seeded random
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Define combo generation rules with logical restrictions
const COMBO_RULES = [
  {
    id: 1,
    name: "Spicy Delight",
    taste_profile: 'spicy' as const,
    logic: "High-calorie mains with cooling sides and spiced drinks",
    restriction: (main: MenuItem, side: MenuItem, drink: MenuItem) => 
      main.taste_profile === 'spicy' && 
      side.calories < 250 && 
      (drink.taste_profile === 'spicy' || drink.taste_profile === 'sweet')
  },
  {
    id: 2, 
    name: "Comfort Classic",
    taste_profile: 'savory' as const,
    logic: "Balanced savory combinations with moderate calories",
    restriction: (main: MenuItem, side: MenuItem, drink: MenuItem) =>
      main.taste_profile === 'savory' &&
      side.taste_profile === 'savory' &&
      main.calories + side.calories < 700
  },
  {
    id: 3,
    name: "Sweet & Savory",
    taste_profile: 'sweet' as const, 
    logic: "Mix of savory mains with sweet accompaniments",
    restriction: (main: MenuItem, side: MenuItem, drink: MenuItem) =>
      (main.taste_profile === 'savory' || main.taste_profile === 'spicy') &&
      (side.taste_profile === 'sweet' || drink.taste_profile === 'sweet') &&
      main.popularity_score > 0.7
  }
];

export function generateDailyCombos(day: string): ComboMeal[] {
  const seed = getDaySeed(day);
  
  // Separate items by category
  const mains = menuData.filter(item => item.category === 'main');
  const sides = menuData.filter(item => item.category === 'side');
  const drinks = menuData.filter(item => item.category === 'drink');
  
  // Shuffle all categories with day seed
  const shuffledMains = shuffleArray(mains, seed);
  const shuffledSides = shuffleArray(sides, seed + 100);
  const shuffledDrinks = shuffleArray(drinks, seed + 200);
  
  const usedItems = new Set<number>();
  const combos: ComboMeal[] = [];
  
  // Generate 3 unique combos using different rules
  for (let i = 0; i < 3; i++) {
    const rule = COMBO_RULES[i];
    let attempts = 0;
    let validCombo = false;
    
    while (!validCombo && attempts < 50) {
      // Get items that haven't been used
      const availableMains = shuffledMains.filter(item => !usedItems.has(item.id));
      const availableSides = shuffledSides.filter(item => !usedItems.has(item.id));  
      const availableDrinks = shuffledDrinks.filter(item => !usedItems.has(item.id));
      
      if (availableMains.length === 0 || availableSides.length === 0 || availableDrinks.length === 0) {
        break;
      }
      
      // Try different combinations
      for (const main of availableMains.slice(0, 3)) {
        for (const side of availableSides.slice(0, 3)) {
          for (const drink of availableDrinks.slice(0, 3)) {
            if (rule.restriction(main, side, drink)) {
              const totalCalories = main.calories + side.calories + drink.calories;
              const avgPopularity = (main.popularity_score + side.popularity_score + drink.popularity_score) / 3;
              
              combos.push({
                combo_id: i + 1,
                main: main.item_name,
                side: side.item_name,
                drink: drink.item_name,
                total_calories: totalCalories,
                popularity_score: Math.round(avgPopularity * 100) / 100,
                taste_profile: rule.taste_profile,
                reasoning: `${rule.logic} - ${TASTE_PROFILES[rule.taste_profile]}`
              });
              
              // Mark items as used
              usedItems.add(main.id);
              usedItems.add(side.id);
              usedItems.add(drink.id);
              
              validCombo = true;
              break;
            }
          }
          if (validCombo) break;
        }
        if (validCombo) break;
      }
      attempts++;
    }
    
    // Fallback if no valid combo found
    if (!validCombo) {
      const availableMains = shuffledMains.filter(item => !usedItems.has(item.id));
      const availableSides = shuffledSides.filter(item => !usedItems.has(item.id));
      const availableDrinks = shuffledDrinks.filter(item => !usedItems.has(item.id));
      
      if (availableMains.length > 0 && availableSides.length > 0 && availableDrinks.length > 0) {
        const main = availableMains[0];
        const side = availableSides[0];
        const drink = availableDrinks[0];
        
        combos.push({
          combo_id: i + 1,
          main: main.item_name,
          side: side.item_name,
          drink: drink.item_name,
          total_calories: main.calories + side.calories + drink.calories,
          popularity_score: Math.round(((main.popularity_score + side.popularity_score + drink.popularity_score) / 3) * 100) / 100,
          taste_profile: rule.taste_profile,
          reasoning: `${rule.logic} - Fallback combination for ${day}`
        });
        
        usedItems.add(main.id);
        usedItems.add(side.id);
        usedItems.add(drink.id);
      }
    }
  }
  
  return combos;
}