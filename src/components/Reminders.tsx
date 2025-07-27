import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface RemindersProps {
  onBack: () => void;
}

const Reminders = ({ onBack }: RemindersProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, date, notes });
    onBack();
  };

  return (
    <div className="p-4 text-foreground">
      <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold mb-4">Set Reminder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Set Reminder</Button>
      </form>
    </div>
  );
};

export default Reminders;
