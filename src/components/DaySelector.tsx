import { Button } from '@/components/ui/button';
import { DAYS } from '@/data/menuData';
import { Calendar } from 'lucide-react';


interface DaySelectorProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}


export function DaySelector({ selectedDay, onDaySelect }: DaySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Select Day</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => onDaySelect(day)}
            className={`transition-all duration-200 ${
              selectedDay === day 
                ? "bg-gradient-warm text-white shadow-warm border-0 hover:shadow-glow" 
                : "hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}