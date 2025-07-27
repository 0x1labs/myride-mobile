import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface FuelLogProps {
  onBack: () => void;
}

const FuelLog = ({ onBack }: FuelLogProps) => {
  const [liters, setLiters] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ liters, price, date });
    onBack();
  };

  return (
    <div className="p-4 text-foreground">
      <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold mb-4">Fuel Log</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="liters">Liters</Label>
          <Input id="liters" type="number" value={liters} onChange={(e) => setLiters(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Add Fuel Log</Button>
      </form>
    </div>
  );
};

export default FuelLog;
