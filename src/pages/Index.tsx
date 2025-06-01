import { useState } from 'react';
import { Bell, Calendar, MessageCircle, User, History, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Dashboard from '@/components/Dashboard';
import ServiceHistory from '@/components/ServiceHistory';
import Profile from '@/components/Profile';

interface IndexProps {
  onSignOut: () => void;
}

const Index = ({ onSignOut }: IndexProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <ServiceHistory />;
      case 'profile':
        return <Profile onSignOut={onSignOut} />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'My Vehicle';
      case 'history':
        return 'Service History';
      case 'profile':
        return 'Account';
      default:
        return 'My Vehicle';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-12 w-12 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs"
              aria-label="2 unread notifications"
            >
              2
            </Badge>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto" role="main">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 min-h-[60px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
              activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Home screen"
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 min-h-[60px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
              activeTab === 'history' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Service history"
            aria-current={activeTab === 'history' ? 'page' : undefined}
          >
            <History className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">History</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 min-h-[60px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
              activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Profile and settings"
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
