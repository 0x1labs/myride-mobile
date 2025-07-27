
import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" 
            aria-hidden="true"
          />
          <Input
            placeholder="Search by date or service type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-20 h-12 text-base focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Search service records"
            type="search"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Clear search"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Service Records */}
        <div className="space-y-3" role="list" aria-label="Service history records">
          {filteredRecords.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No service records found matching your search.</p>
              {searchTerm && (
                <Button variant="outline" onClick={clearSearch} className="mt-2">
                  Show all records
                </Button>
              )}
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="overflow-hidden" role="listitem">
                <Collapsible 
                  open={expandedRecord === record.id}
                  onOpenChange={() => toggleExpand(record.id)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className="w-full p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      aria-expanded={expandedRecord === record.id}
                      aria-controls={`service-details-${record.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-auto-color text-lg">{record.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span aria-label={`Service date: ${record.date}`}>{record.date}</span>
                            <span aria-label={`Cost: ${record.cost}`}>${record.cost}</span>
                            <span aria-label={`Mileage: ${record.mileage.toLocaleString()} miles`}>
                              {record.mileage.toLocaleString()} mi
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 p-2">
                          {expandedRecord === record.id ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent 
                    id={`service-details-${record.id}`}
                    className="border-t border-border"
                  >
                    <div className="px-4 pb-4 pt-4 space-y-4">
                      {/* Parts */}
                      <div>
                        <h4 className="font-medium text-foreground mb-3 text-base">Parts Replaced</h4>
                        <div className="space-y-2">
                          {record.details.parts.map((part, index) => (
                            <div key={index} className="flex justify-between items-center py-1">
                              <span className="text-muted-foreground">{part.name}</span>
                              <span className="font-medium">${part.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Labor */}
                      <div className="flex justify-between items-center py-2 border-t border-border">
                        <span className="text-muted-foreground font-medium">Labor Cost</span>
                        <span className="font-medium">${record.details.labor}</span>
                      </div>

                      {/* Discounts */}
                      {record.details.discounts && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-muted-foreground font-medium">Discount Applied</span>
                          <span className="font-medium text-green-600">-${record.details.discounts}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">Total Cost</span>
                          <span className="font-semibold text-lg">${record.cost}</span>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Service Notes</h4>
                        <p className="text-muted-foreground leading-relaxed">{record.details.notes}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;
