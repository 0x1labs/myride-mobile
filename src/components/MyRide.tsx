import { Calendar, Clock, FileText, Wrench, AlertTriangle, MapPin, Fuel, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ktmImage from '@/assets/ktm-390-adventure.jpg';

interface MyRideProps {
  onBookService?: () => void;
  onAddRide?: () => void;
  onFuelLog?: () => void;
  onReminders?: () => void;
}

const MyRide = ({ onBookService, onAddRide, onFuelLog, onReminders }: MyRideProps) => {
  return (
    <div className="space-y-6 pb-20">
      {/* KTM Image at the top */}
      <div className="w-full flex justify-center items-center pt-4">
        <img 
          src={ktmImage} 
          alt="KTM 390 Adventure" 
          className="w-full max-w-xs object-contain"
        />
      </div>

      {/* Hero Section with KTM - Text Content */}
      <div className="relative rounded-2xl ktm-card -mt-12 z-10"> {/* Adjust margin-top to overlap with image */}
        <div className="absolute inset-0 ktm-gradient opacity-10"></div>
        <div className="relative p-6 flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">KTM 390 Adventure</h2>
            <p className="text-muted-foreground mb-4">Ready to Ride • 2,450 km</p>
            <div className="flex space-x-2">
              <Badge className="performance-badge">Excellent Condition</Badge>
              <Badge variant="outline" className="text-foreground border-border">Next Service: 550 km</Badge>
            </div>
          </div>
          <div className="w-32 h-24 rounded-lg overflow-hidden opacity-0">{/* Placeholder to maintain layout */}
          </div>
        </div>
      </div>

      {/* Ride Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="track-stat">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">This Month</span>
          </div>
          <div className="text-2xl font-bold text-primary">450 km</div>
        </div>
        
        <div className="track-stat">
          <div className="flex items-center space-x-2 mb-2">
            <Fuel className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Avg Mileage</span>
          </div>
          <div className="text-2xl font-bold text-primary">32 km/l</div>
        </div>
      </div>

      {/* Last Service */}
      <Card className="ktm-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Wrench className="h-5 w-5 text-primary" />
            <span>Last Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Basic Service</p>
              <p className="text-sm text-muted-foreground">Dec 15, 2024 • KTM Service Center</p>
              <p className="text-xs text-muted-foreground">Oil change, Chain lubrication, Brake check</p>
            </div>
            <Badge variant="outline" className="text-foreground border-border">Completed</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Document Renewals */}
      <Card className="ktm-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            <span>Document Renewals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Driving License</p>
              <p className="text-sm text-muted-foreground">Expires: Mar 15, 2025</p>
            </div>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">78 days left</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Insurance</p>
              <p className="text-sm text-muted-foreground">Expires: Apr 20, 2025</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">114 days left</Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Registration (RC)</p>
              <p className="text-sm text-muted-foreground">Expires: Jan 10, 2025</p>
            </div>
            <Badge className="bg-red-600 text-white">
              <AlertTriangle className="h-3 w-3 mr-1" />
              14 days left
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onBookService} className="ktm-gradient text-white h-12">
          <Wrench className="h-4 w-4 mr-2" />
          Book Service
        </Button>
        <Button onClick={onAddRide} variant="outline" className="h-12 text-foreground border-border">
          <Plus className="h-4 w-4 mr-2" />
          Add Ride
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onFuelLog} variant="outline" className="h-12 text-foreground border-border">
          <Calendar className="h-4 w-4 mr-2" />
          Fuel Log
        </Button>
        <Button onClick={onReminders} variant="outline" className="h-12 text-foreground border-border">
          <Clock className="h-4 w-4 mr-2" />
          Reminders
        </Button>
      </div>
    </div>
  );
};

export default MyRide;