import { useState } from 'react';
import { User, Bell, Shield, LogOut, Edit2, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ProfileProps {
  onSignOut: () => void;
}

const Profile = ({ onSignOut }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Ram Sharma',
    email: 'ram.sharma@example.com',
    phone: '+977 98X-XXX-XXXX'
  });
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notifications, setNotifications] = useState({
    serviceReminders: true,
    promotions: false,
    documentAlerts: true,
    customAlerts: true
  });

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempUserInfo(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(tempUserInfo).forEach(field => {
      if (field !== 'phone') {
        const error = validateField(field, tempUserInfo[field as keyof typeof tempUserInfo]);
        if (error) newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      setUserInfo(tempUserInfo);
      setIsEditing(false);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
    setErrors({});
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      onSignOut();
    }
  };

  return (
    <div className="pb-20">
      <div className="p-4 space-y-6">
        {/* User Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <User className="mr-2 h-5 w-5 text-blue-600" />
              Personal Information
            </CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-9 px-3"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="h-9 px-3"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="h-9 px-3"
                  disabled={Object.values(errors).some(error => error !== '')}
                >
                  Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <div>
                  <Input
                    id="name"
                    value={tempUserInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{userInfo.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <div>
                  <Input
                    id="email"
                    type="email"
                    value={tempUserInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{userInfo.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <p className="text-gray-900 font-medium">{userInfo.phone}</p>
              <p className="text-sm text-gray-500">Contact support to change your phone number</p>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Car className="mr-2 h-5 w-5 text-blue-600" />
              Linked Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">BA 3 PA 1234</p>
              <p className="text-sm text-gray-600">Honda City 2022</p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Bell className="mr-2 h-5 w-5 text-blue-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="service-reminders" className="text-base">Service Reminders</Label>
                <p className="text-sm text-gray-500">Get notified about upcoming services</p>
              </div>
              <Switch
                id="service-reminders"
                checked={notifications.serviceReminders}
                onCheckedChange={() => handleNotificationToggle('serviceReminders')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="text-base">Offers & Promotions</Label>
                <p className="text-sm text-gray-500">Receive special offers and discounts</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationToggle('promotions')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="document-alerts" className="text-base">Document Alerts</Label>
                <p className="text-sm text-gray-500">Alerts for license and insurance renewals</p>
              </div>
              <Switch
                id="document-alerts"
                checked={notifications.documentAlerts}
                onCheckedChange={() => handleNotificationToggle('documentAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="custom-alerts" className="text-base">Custom Alerts</Label>
                <p className="text-sm text-gray-500">Personalized alerts based on usage</p>
              </div>
              <Switch
                id="custom-alerts"
                checked={notifications.customAlerts}
                onCheckedChange={() => handleNotificationToggle('customAlerts')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full h-12 text-base font-medium"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
