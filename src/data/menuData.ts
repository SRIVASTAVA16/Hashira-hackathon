export interface MenuItem {
  id: number;
  item_name: string;
  category: 'main' | 'side' | 'drink';
  calories: number;
  taste_profile: 'spicy' | 'savory' | 'sweet';
  popularity_score: number;
}

export const menuData: MenuItem[] = [
  { id: 1, item_name: "Paneer Butter Masala", category: "main", calories: 450, taste_profile: "spicy", popularity_score: 0.9 },
  { id: 2, item_name: "Chicken Biryani", category: "main", calories: 600, taste_profile: "spicy", popularity_score: 0.95 },
  { id: 3, item_name: "Vegetable Pulao", category: "main", calories: 400, taste_profile: "savory", popularity_score: 0.7 },
  { id: 4, item_name: "Rajma Chawal", category: "main", calories: 500, taste_profile: "savory", popularity_score: 0.8 },
  { id: 5, item_name: "Chole Bhature", category: "main", calories: 650, taste_profile: "spicy", popularity_score: 0.85 },
  { id: 6, item_name: "Masala Dosa", category: "main", calories: 480, taste_profile: "savory", popularity_score: 0.88 },
  { id: 7, item_name: "Grilled Sandwich", category: "main", calories: 370, taste_profile: "savory", popularity_score: 0.6 },
  { id: 8, item_name: "Garlic Naan", category: "side", calories: 200, taste_profile: "savory", popularity_score: 0.9 },
  { id: 9, item_name: "Mixed Veg Side", category: "side", calories: 150, taste_profile: "sweet", popularity_score: 0.75 },
  { id: 10, item_name: "French Fries", category: "side", calories: 350, taste_profile: "savory", popularity_score: 0.8 },
  { id: 11, item_name: "Curd Rice", category: "side", calories: 250, taste_profile: "savory", popularity_score: 0.7 },
  { id: 12, item_name: "Papad", category: "side", calories: 100, taste_profile: "savory", popularity_score: 0.65 },
  { id: 13, item_name: "Paneer Tikka", category: "side", calories: 300, taste_profile: "spicy", popularity_score: 0.85 },
  { id: 14, item_name: "Masala Chaas", category: "drink", calories: 100, taste_profile: "spicy", popularity_score: 0.8 },
  { id: 15, item_name: "Sweet Lassi", category: "drink", calories: 220, taste_profile: "sweet", popularity_score: 0.9 },
  { id: 16, item_name: "Lemon Soda", category: "drink", calories: 90, taste_profile: "savory", popularity_score: 0.7 },
  { id: 17, item_name: "Cold Coffee", category: "drink", calories: 180, taste_profile: "sweet", popularity_score: 0.75 },
  { id: 18, item_name: "Coconut Water", category: "drink", calories: 60, taste_profile: "sweet", popularity_score: 0.6 },
  { id: 19, item_name: "Iced Tea", category: "drink", calories: 120, taste_profile: "sweet", popularity_score: 0.78 }
];

export interface ComboMeal {
  combo_id: number;
  main: string;
  side: string;
  drink: string;
  total_calories: number;
  popularity_score: number;
  taste_profile: string;
  reasoning: string;
}

export const TASTE_PROFILES = {
  spicy: "Bold and fiery flavors that awaken your taste buds",
  savory: "Rich and satisfying umami-packed combinations", 
  sweet: "Comforting and indulgent flavors for a satisfying meal"
} as const;

export const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
] as const;