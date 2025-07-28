import { ComboMeal } from '@/data/menuData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Droplets, Cookie, Star, Zap } from 'lucide-react';

interface ComboCardProps {
  combo: ComboMeal;
  index: number;
}

const tasteIcons = {
  spicy: <Zap className="w-4 h-4" />,
  savory: <Utensils className="w-4 h-4" />,
  sweet: <Cookie className="w-4 h-4" />
};

const tasteColors = {
  spicy: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
  savory: "bg-gradient-to-r from-yellow-600 to-orange-600 text-white", 
  sweet: "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
};

export function ComboCard({ combo, index }: ComboCardProps) {
  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border border-orange-200/50 bg-gradient-subtle">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-foreground">
            Combo {combo.combo_id}
          </CardTitle>
          <Badge className={`${tasteColors[combo.taste_profile as keyof typeof tasteColors]} shadow-sm`}>
            {tasteIcons[combo.taste_profile as keyof typeof tasteIcons]}
            <span className="ml-1 capitalize">{combo.taste_profile}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Dish */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="p-2 rounded-full bg-gradient-warm text-white">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Main Course</p>
            <p className="font-semibold text-foreground">{combo.main}</p>
          </div>
        </div>

        {/* Side Dish */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
          <div className="p-2 rounded-full bg-gradient-food text-white">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Side Dish</p>
            <p className="font-semibold text-foreground">{combo.side}</p>
          </div>
        </div>

        {/* Drink */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
          <div className="p-2 rounded-full bg-blue-500 text-white">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Beverage</p>
            <p className="font-semibold text-foreground">{combo.drink}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{combo.total_calories}</p>
            <p className="text-xs text-muted-foreground">Total Calories</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-foreground">{combo.popularity_score}</span>
            </div>
            <p className="text-xs text-muted-foreground">Popularity Score</p>
          </div>
        </div>

        {/* Reasoning */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {combo.reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}