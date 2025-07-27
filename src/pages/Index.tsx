
import { useState } from 'react';
import { Bell, BarChart3, User, History, FileText, CalendarCheck, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import MyRide from '@/components/MyRide';
import Profile from '@/components/Profile';
import BookAppointment from '@/pages/BookAppointment';
import BookedAppointments from '@/components/BookedAppointments';
import Notifications from '@/components/Notifications';
import DocumentManager from '@/components/DocumentManager';
import AddRide from '@/components/AddRide';
import FuelLog from '@/components/FuelLog';
import Reminders from '@/components/Reminders';
import Activity from '@/pages/Activity';

interface IndexProps {
  onSignOut: () => void;
}

type ActiveView = 'insights' | 'appointments' | 'activity' | 'documents' | 'notifications' | 'profile' | 'add-ride' | 'fuel-log' | 'reminders';

const Index = ({ onSignOut }: IndexProps) => {
  const [activeTab, setActiveTab] = useState<ActiveView>('insights');
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

  const handleBack = () => {
    setActiveTab('insights');
  }

  // Show booking page if user is booking
  if (showBooking) {
    return <BookAppointment onBack={handleBackFromBooking} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'insights':
        return <MyRide 
          onBookService={handleBookAppointment} 
          onAddRide={() => setActiveTab('add-ride')}
          onFuelLog={() => setActiveTab('fuel-log')}
          onReminders={() => setActiveTab('reminders')}
        />;
      case 'appointments':
        return <BookedAppointments />;
      case 'activity':
        return <Activity />;
      case 'documents':
        return <DocumentManager />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile onSignOut={onSignOut} />;
      case 'add-ride':
        return <AddRide onBack={handleBack} />;
      case 'fuel-log':
        return <FuelLog onBack={handleBack} />;
      case 'reminders':
        return <Reminders onBack={handleBack} />;
      default:
        return <MyRide 
          onBookService={handleBookAppointment} 
          onAddRide={() => setActiveTab('add-ride')}
          onFuelLog={() => setActiveTab('fuel-log')}
          onReminders={() => setActiveTab('reminders')}
        />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'insights':
        return 'My Ride';
      case 'appointments':
        return 'Service Bookings';
      case 'activity':
        return 'Activity';
      case 'documents':
        return 'Documents';
      case 'notifications':
        return 'Notifications';
      case 'profile':
        return 'Profile';
      case 'add-ride':
        return 'Add Ride';
      case 'fuel-log':
        return 'Fuel Log';
      case 'reminders':
        return 'Reminders';
      default:
        return 'My Ride';
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
            aria-label="My ride dashboard"
            aria-current={activeTab === 'insights' ? 'page' : undefined}
          >
            {activeTab === 'insights' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">My Ride</span>
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
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 min-h-[70px] transition-all duration-300 focus:outline-none ${
              activeTab === 'activity' 
                ? 'text-primary bg-primary/10 relative' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            aria-label="Activity"
            aria-current={activeTab === 'activity' ? 'page' : undefined}
          >
            {activeTab === 'activity' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ktm-gradient rounded-full"></div>
            )}
            <History className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Activity</span>
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
