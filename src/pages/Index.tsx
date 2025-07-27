
import { useState } from 'react';
import { Bell, BarChart3, MessageCircle, User, History, Bike, FileText, CalendarCheck, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import TrackInsights from '@/components/TrackInsights';
import ServiceHistory from '@/components/ServiceHistory';
import Profile from '@/components/Profile';
import BookAppointment from '@/pages/BookAppointment';
import BookedAppointments from '@/components/BookedAppointments';
import Notifications from '@/components/Notifications';
import DocumentManager from '@/components/DocumentManager';

interface IndexProps {
  onSignOut: () => void;
}

const Index = ({ onSignOut }: IndexProps) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [showBooking, setShowBooking] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleBookAppointment = () => {
    setShowBooking(true);
  };

  const handleBackFromBooking = () => {
    setShowBooking(false);
  };

  const handleNotificationClick = () => {
    setActiveTab('notifications');
  };

  // Show booking page if user is booking
  if (showBooking) {
    return <BookAppointment onBack={handleBackFromBooking} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'insights':
        return <TrackInsights onBookService={handleBookAppointment} />;
      case 'appointments':
        return <BookedAppointments />;
      case 'history':
        return <ServiceHistory />;
      case 'documents':
        return <DocumentManager />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile onSignOut={onSignOut} />;
      default:
        return <TrackInsights onBookService={handleBookAppointment} />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'insights':
        return 'Track Insights';
      case 'appointments':
        return 'Service Bookings';
      case 'history':
        return 'Service History';
      case 'documents':
        return 'Documents';
      case 'notifications':
        return 'Notifications';
      case 'profile':
        return 'Profile';
      default:
        return 'Track Insights';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground ktm-gradient bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNotificationClick}
              className="relative h-10 w-10"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <Badge 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-primary text-xs text-primary-foreground"
                aria-label="2 unread notifications"
              >
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto" role="main">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'insights' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Track insights"
            aria-current={activeTab === 'insights' ? 'page' : undefined}
          >
            {activeTab === 'insights' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Insights</span>
          </button>
          
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'appointments' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Service bookings"
            aria-current={activeTab === 'appointments' ? 'page' : undefined}
          >
            {activeTab === 'appointments' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Service</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'history' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Service history"
            aria-current={activeTab === 'history' ? 'page' : undefined}
          >
            {activeTab === 'history' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <History className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">History</span>
          </button>
          
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'documents' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Documents"
            aria-current={activeTab === 'documents' ? 'page' : undefined}
          >
            {activeTab === 'documents' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <FileText className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Docs</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'profile' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Profile and settings"
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            {activeTab === 'profile' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
