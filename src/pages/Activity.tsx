import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceHistory from '@/components/ServiceHistory';
import RideHistory from '@/components/RideHistory';
import FuelLogHistory from '@/components/FuelLogHistory';

const Activity = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Activity</h1>
      <Tabs defaultValue="service-history">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="service-history">Service History</TabsTrigger>
          <TabsTrigger value="ride-history">Ride History</TabsTrigger>
          <TabsTrigger value="fuel-log-history">Fuel Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="service-history">
          <ServiceHistory />
        </TabsContent>
        <TabsContent value="ride-history">
          <RideHistory />
        </TabsContent>
        <TabsContent value="fuel-log-history">
          <FuelLogHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activity;
