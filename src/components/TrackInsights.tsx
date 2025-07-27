import { useState } from 'react';
import { Zap, Timer, TrendingUp, MapPin, Trophy, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ktmImage from '@/assets/ktm-390-adventure.jpg';

interface TrackInsightsProps {
  onBookService?: () => void;
}

const TrackInsights = ({ onBookService }: TrackInsightsProps) => {
  const [selectedTrack, setSelectedTrack] = useState('circuit');

  const trackStats = {
    circuit: {
      name: 'Racing Circuit',
      bestLap: '1:42.3',
      avgSpeed: '85 km/h',
      topSpeed: '145 km/h',
      cornering: 92,
      braking: 88,
      acceleration: 95
    },
    mountain: {
      name: 'Mountain Pass',
      bestLap: '12:15.8',
      avgSpeed: '45 km/h',
      topSpeed: '120 km/h',
      cornering: 78,
      braking: 85,
      acceleration: 70
    }
  };

  const currentStats = trackStats[selectedTrack as keyof typeof trackStats];

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section with KTM */}
      <div className="relative overflow-hidden rounded-2xl ktm-card">
        <div className="absolute inset-0 ktm-gradient opacity-10"></div>
        <div className="relative p-6 flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">KTM 390 Adventure</h2>
            <p className="text-muted-foreground mb-4">Ready to Ride • Track Mode Active</p>
            <div className="flex space-x-2">
              <Badge className="performance-badge">Sport Mode</Badge>
              <Badge variant="outline">GPS Active</Badge>
            </div>
          </div>
          <div className="w-32 h-24 rounded-lg overflow-hidden">
            <img 
              src={ktmImage} 
              alt="KTM 390 Adventure" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Track Selection */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={selectedTrack === 'circuit' ? 'default' : 'outline'}
          onClick={() => setSelectedTrack('circuit')}
          className="h-16 flex flex-col"
        >
          <Trophy className="h-5 w-5 mb-1" />
          <span className="text-xs">Racing Circuit</span>
        </Button>
        <Button
          variant={selectedTrack === 'mountain' ? 'default' : 'outline'}
          onClick={() => setSelectedTrack('mountain')}
          className="h-16 flex flex-col"
        >
          <MapPin className="h-5 w-5 mb-1" />
          <span className="text-xs">Mountain Pass</span>
        </Button>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="track-stat">
          <div className="flex items-center space-x-2 mb-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Best Lap</span>
          </div>
          <div className="text-2xl font-bold text-primary">{currentStats.bestLap}</div>
        </div>
        
        <div className="track-stat">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Top Speed</span>
          </div>
          <div className="text-2xl font-bold text-primary">{currentStats.topSpeed}</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <Card className="ktm-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Cornering</span>
              <span>{currentStats.cornering}%</span>
            </div>
            <Progress value={currentStats.cornering} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Braking</span>
              <span>{currentStats.braking}%</span>
            </div>
            <Progress value={currentStats.braking} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Acceleration</span>
              <span>{currentStats.acceleration}%</span>
            </div>
            <Progress value={currentStats.acceleration} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="ktm-card">
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Today • 2:30 PM</p>
              <p className="text-sm text-muted-foreground">15 laps • {currentStats.name}</p>
            </div>
            <Badge className="performance-badge">Personal Best</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Yesterday • 4:45 PM</p>
              <p className="text-sm text-muted-foreground">8 laps • Mountain Pass</p>
            </div>
            <Badge variant="outline">Completed</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onBookService} className="ktm-gradient text-white h-12">
          <Settings className="h-4 w-4 mr-2" />
          Service Booking
        </Button>
        <Button variant="outline" className="h-12">
          <MapPin className="h-4 w-4 mr-2" />
          Find Tracks
        </Button>
      </div>
    </div>
  );
};

export default TrackInsights;