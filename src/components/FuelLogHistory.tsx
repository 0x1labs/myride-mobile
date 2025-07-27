import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FuelLogEntry {
  id: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  mileage: number;
}

const FuelLogHistory = () => {
  const [fuelLogs, setFuelLogs] = useState<FuelLogEntry[]>([
    {
      id: '1',
      date: '2024-07-20',
      liters: 10.5,
      pricePerLiter: 1.5,
      totalCost: 15.75,
      mileage: 15200,
    },
    {
      id: '2',
      date: '2024-07-10',
      liters: 12.0,
      pricePerLiter: 1.48,
      totalCost: 17.76,
      mileage: 14900,
    },
    {
      id: '3',
      date: '2024-06-30',
      liters: 9.8,
      pricePerLiter: 1.52,
      totalCost: 14.896,
      mileage: 14600,
    },
  ]);

  return (
    <div className="space-y-4">
      {fuelLogs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Fuel Log History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No fuel log history yet.</p>
          </CardContent>
        </Card>
      ) : (
        fuelLogs.map((log) => (
          <Card key={log.id}>
            <CardHeader>
              <CardTitle className="text-foreground">Fuel Log - {log.date}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Liters: {log.liters}</p>
              <p>Price per Liter: ${log.pricePerLiter.toFixed(2)}</p>
              <p>Total Cost: ${log.totalCost.toFixed(2)}</p>
              <p>Mileage: {log.mileage} km</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FuelLogHistory;
