import { useState } from 'react';
import { generateDailyCombos } from '@/utils/comboGenerator';
import { ComboCard } from './ComboCard';
import { DaySelector } from './DaySelector';
import { Button } from '@/components/ui/button';
import { Shuffle, ChefHat, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ComboGenerator() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [combos, setCombos] = useState(generateDailyCombos('Monday'));
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const newCombos = generateDailyCombos(day);
      setCombos(newCombos);
      setIsGenerating(false);
      
      toast({
        title: "Combos Generated! 🍽️",
        description: `3 unique meal combos for ${day} are ready!`,
      });
    }, 800);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newCombos = generateDailyCombos(selectedDay + Date.now()); // Add timestamp for variation
      setCombos(newCombos);
      setIsGenerating(false);
      
      toast({
        title: "Fresh Combos! ✨",
        description: "New combinations generated with different selections!",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-warm text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <ChefHat className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Combo Meal Generator</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover perfectly crafted meal combinations with unique taste profiles, designed for optimal nutrition and flavor balance
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Day Selection */}
        <div className="bg-card rounded-xl p-6 shadow-warm border border-orange-200/50">
          <DaySelector selectedDay={selectedDay} onDaySelect={handleDaySelect} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between bg-card rounded-xl p-6 shadow-warm border border-orange-200/50">
          <div>
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              {selectedDay} Combos
            </h3>
            <p className="text-muted-foreground mt-1">
              3 unique combinations with no repeated dishes
            </p>
          </div>
          
          <Button 
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="bg-gradient-food hover:shadow-glow text-white border-0"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Regenerate"}
          </Button>
        </div>

        {/* Combos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isGenerating ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                className="h-96 bg-card rounded-xl border border-orange-200/50 animate-pulse"
              />
            ))
          ) : (
            combos.map((combo, index) => (
              <ComboCard 
                key={`${selectedDay}-${combo.combo_id}-${index}`} 
                combo={combo} 
                index={index} 
              />
            ))
          )}
        </div>

        {/* API Output */}
        <div className="bg-card rounded-xl p-6 shadow-warm border border-orange-200/50">
          <h3 className="text-xl font-bold text-foreground mb-4">API Response Format</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{JSON.stringify(combos, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}