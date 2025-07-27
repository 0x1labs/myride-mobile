import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RideLogEntry {
  id: string;
  date: string;
  distance: number;
  notes?: string;
}

const RideHistory = () => {
  const [rideLogs, setRideLogs] = useState<RideLogEntry[]>([
    {
      id: '1',
      date: '2024-07-25',
      distance: 50,
      notes: 'Morning commute',
    },
    {
      id: '2',
      date: '2024-07-22',
      distance: 120,
      notes: 'Weekend long ride',
    },
    {
      id: '3',
      date: '2024-07-18',
      distance: 30,
      notes: 'Quick errands',
    },
  ]);

  return (
    <div className="space-y-4">
      {rideLogs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Ride History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No ride history yet.</p>
          </CardContent>
        </Card>
      ) : (
        rideLogs.map((log) => (
          <Card key={log.id}>
            <CardHeader>
              <CardTitle className="text-foreground">Ride - {log.date}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Distance: {log.distance} km</p>
              {log.notes && <p>Notes: {log.notes}</p>}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default RideHistory;
