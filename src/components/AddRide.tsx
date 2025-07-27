import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface AddRideProps {
  onBack: () => void;
}

const AddRide = ({ onBack }: AddRideProps) => {
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ distance, date });
    onBack();
  };

  return (
    <div className="p-4 text-foreground">
      <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold mb-4">Add Ride</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="distance">Distance (km)</Label>
          <Input id="distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Add Ride</Button>
      </form>
    </div>
  );
};

export default AddRide;
