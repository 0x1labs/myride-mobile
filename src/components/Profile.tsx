
import { useState } from 'react';
import { ChevronRight, Plus, LogOut, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const [notifications, setNotifications] = useState({
    serviceReminders: true,
    offers: false,
    documentRenewals: true,
    customAlerts: false
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const vehicles = [
    {
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      type: 'Sedan',
      image: '/lovable-uploads/placeholder-car.png'
    },
    {
      id: 2,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      type: 'Sedan',
      image: '/lovable-uploads/placeholder-car.png'
    }
  ];

  return (
    <div className="pb-20">
      <div className="p-4 space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src="/lovable-uploads/placeholder-avatar.png" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  EC
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-900">Ethan Carter</h2>
              <p className="text-gray-600">ethan.carter@email.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Linked Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Linked Vehicles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-6 bg-gray-400 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-sm text-gray-600">{vehicle.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <span className="text-gray-400">⋮</span>
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Service Reminders</p>
                <p className="text-sm text-gray-600">Get notified about upcoming services</p>
              </div>
              <Switch
                checked={notifications.serviceReminders}
                onCheckedChange={() => toggleNotification('serviceReminders')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Offers & Promotions</p>
                <p className="text-sm text-gray-600">Receive special offers and deals</p>
              </div>
              <Switch
                checked={notifications.offers}
                onCheckedChange={() => toggleNotification('offers')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Document Renewal Alerts</p>
                <p className="text-sm text-gray-600">Alerts for license, insurance, etc.</p>
              </div>
              <Switch
                checked={notifications.documentRenewals}
                onCheckedChange={() => toggleNotification('documentRenewals')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Custom Alerts</p>
                <p className="text-sm text-gray-600">Personalized notifications</p>
              </div>
              <Switch
                checked={notifications.customAlerts}
                onCheckedChange={() => toggleNotification('customAlerts')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-12">
              <span>Sign Out</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between h-12 text-red-600 hover:text-red-700 hover:bg-red-50">
              <span>Delete Account</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
