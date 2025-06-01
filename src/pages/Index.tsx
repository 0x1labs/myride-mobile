
import { useState } from 'react';
import { Bell, Calendar, MessageCircle, User, History, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Dashboard from '@/components/Dashboard';
import ServiceHistory from '@/components/ServiceHistory';
import Profile from '@/components/Profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <ServiceHistory />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            {activeTab === 'dashboard' && 'My Vehicle'}
            {activeTab === 'history' && 'Service History'}
            {activeTab === 'profile' && 'Account'}
          </h1>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
              2
            </Badge>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${
              activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${
              activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <History className="h-5 w-5" />
            <span className="text-xs font-medium">History</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
