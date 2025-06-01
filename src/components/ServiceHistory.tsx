
import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ServiceRecord {
  id: string;
  title: string;
  date: string;
  cost: number;
  mileage: number;
  details: {
    parts: { name: string; cost: number }[];
    labor: number;
    discounts?: number;
    notes: string;
  };
}

const ServiceHistory = () => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const serviceRecords: ServiceRecord[] = [
    {
      id: '1',
      title: 'Routine Checkup',
      date: '10/26/2023',
      cost: 120,
      mileage: 15000,
      details: {
        parts: [
          { name: 'Air Filter', cost: 25 },
          { name: 'Spark Plugs', cost: 45 }
        ],
        labor: 50,
        notes: 'All systems checked. Vehicle in good condition.'
      }
    },
    {
      id: '2',
      title: 'Oil Change + Filter Replacement',
      date: '07/15/2023',
      cost: 80,
      mileage: 10000,
      details: {
        parts: [
          { name: 'Engine Oil (5L)', cost: 35 },
          { name: 'Oil Filter', cost: 15 }
        ],
        labor: 30,
        notes: 'Regular maintenance completed successfully.'
      }
    },
    {
      id: '3',
      title: 'Tire Rotation & Balance',
      date: '03/02/2023',
      cost: 150,
      mileage: 5000,
      details: {
        parts: [
          { name: 'Wheel Balancing', cost: 80 },
          { name: 'Tire Rotation', cost: 40 }
        ],
        labor: 30,
        notes: 'Tires rotated and balanced. Good tread depth remaining.'
      }
    },
    {
      id: '4',
      title: 'Initial Service',
      date: '11/18/2022',
      cost: 200,
      mileage: 0,
      details: {
        parts: [
          { name: 'Initial Inspection', cost: 100 },
          { name: 'Fluids Top-up', cost: 50 }
        ],
        labor: 50,
        notes: 'New vehicle inspection and setup completed.'
      }
    }
  ];

  const toggleExpand = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const filteredRecords = serviceRecords.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date.includes(searchTerm)
  );

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by date or service type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Service Records */}
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpand(record.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{record.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{record.date}</span>
                        <span>${record.cost}</span>
                        <span>{record.mileage.toLocaleString()} mi</span>
                      </div>
                    </div>
                    {expandedRecord === record.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedRecord === record.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-4 space-y-3">
                      {/* Parts */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Parts Replaced</h4>
                        <div className="space-y-1">
                          {record.details.parts.map((part, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{part.name}</span>
                              <span className="font-medium">${part.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Labor */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Labor Cost</span>
                        <span className="font-medium">${record.details.labor}</span>
                      </div>

                      {/* Discounts */}
                      {record.details.discounts && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount Applied</span>
                          <span className="font-medium text-green-600">-${record.details.discounts}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total Cost</span>
                          <span>${record.cost}</span>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Service Notes</h4>
                        <p className="text-sm text-gray-600">{record.details.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Results */}
        <div className="flex justify-center">
          <Button variant="outline" className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;
