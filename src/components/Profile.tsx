
import { useState } from 'react';
import { ChevronRight, Plus, LogOut, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [notifications, setNotifications] = useState({
    serviceReminders: true,
    offers: false,
    documentRenewals: true,
    customAlerts: false
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Ethan Carter',
    email: 'ethan.carter@email.com'
  });
  const [tempValues, setTempValues] = useState({ ...userInfo });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handleFieldEdit = (field: string) => {
    setEditingField(field);
    setTempValues({ ...userInfo });
    setValidationErrors({});
  };

  const handleFieldSave = (field: string) => {
    const value = tempValues[field as keyof typeof tempValues];
    let isValid = true;
    const errors = { ...validationErrors };

    if (field === 'email') {
      if (!validateEmail(value)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      } else {
        delete errors.email;
      }
    } else if (field === 'name') {
      if (!validateName(value)) {
        errors.name = 'Name must be at least 2 characters long';
        isValid = false;
      } else {
        delete errors.name;
      }
    }

    setValidationErrors(errors);

    if (isValid) {
      setUserInfo({ ...userInfo, [field]: value });
      setEditingField(null);
      toast({
        title: "Profile Updated",
        description: `Your ${field} has been updated successfully.`,
      });
    }
  };

  const handleFieldCancel = () => {
    setEditingField(null);
    setTempValues({ ...userInfo });
    setValidationErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setTempValues(prev => ({ ...prev, [field]: value }));
    
    // Clear validation errors as user types valid input
    if (field === 'email' && validateEmail(value)) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    } else if (field === 'name' && validateName(value)) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
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
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/lovable-uploads/placeholder-avatar.png" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  EC
                </AvatarFallback>
              </Avatar>
              
              {/* Name Field */}
              <div className="w-full max-w-sm">
                {editingField === 'name' ? (
                  <div className="space-y-2">
                    <Input
                      value={tempValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="text-center text-xl font-semibold"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleFieldSave('name');
                        if (e.key === 'Escape') handleFieldCancel();
                      }}
                      autoFocus
                      aria-invalid={!!validationErrors.name}
                      aria-describedby={validationErrors.name ? 'name-error' : undefined}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-sm text-red-600" role="alert">
                        {validationErrors.name}
                      </p>
                    )}
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" onClick={() => handleFieldSave('name')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleFieldEdit('name')}
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                    aria-label="Click to edit name"
                  >
                    {userInfo.name}
                  </button>
                )}
              </div>

              {/* Email Field */}
              <div className="w-full max-w-sm">
                {editingField === 'email' ? (
                  <div className="space-y-2">
                    <Input
                      type="email"
                      value={tempValues.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="text-center"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleFieldSave('email');
                        if (e.key === 'Escape') handleFieldCancel();
                      }}
                      autoFocus
                      aria-invalid={!!validationErrors.email}
                      aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-sm text-red-600" role="alert">
                        {validationErrors.email}
                      </p>
                    )}
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" onClick={() => handleFieldSave('email')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleFieldEdit('email')}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                    aria-label="Click to edit email"
                  >
                    {userInfo.email}
                  </button>
                )}
              </div>
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
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-200"
                  aria-label={`Options for ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                >
                  <span className="text-gray-400 text-lg">⋮</span>
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full h-12 text-base">
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
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="service-reminders" className="font-medium text-gray-900 text-base cursor-pointer">
                  Service Reminders
                </Label>
                <p className="text-sm text-gray-600 mt-1">Get notified about upcoming services</p>
              </div>
              <Switch
                id="service-reminders"
                checked={notifications.serviceReminders}
                onCheckedChange={() => toggleNotification('serviceReminders')}
                className="data-[state=checked]:bg-blue-600"
                aria-describedby="service-reminders-desc"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="offers" className="font-medium text-gray-900 text-base cursor-pointer">
                  Offers & Promotions
                </Label>
                <p className="text-sm text-gray-600 mt-1">Receive special offers and deals</p>
              </div>
              <Switch
                id="offers"
                checked={notifications.offers}
                onCheckedChange={() => toggleNotification('offers')}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="document-renewals" className="font-medium text-gray-900 text-base cursor-pointer">
                  Document Renewal Alerts
                </Label>
                <p className="text-sm text-gray-600 mt-1">Alerts for license, insurance, etc.</p>
              </div>
              <Switch
                id="document-renewals"
                checked={notifications.documentRenewals}
                onCheckedChange={() => toggleNotification('documentRenewals')}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="custom-alerts" className="font-medium text-gray-900 text-base cursor-pointer">
                  Custom Alerts
                </Label>
                <p className="text-sm text-gray-600 mt-1">Personalized notifications</p>
              </div>
              <Switch
                id="custom-alerts"
                checked={notifications.customAlerts}
                onCheckedChange={() => toggleNotification('customAlerts')}
                className="data-[state=checked]:bg-blue-600"
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
            <Button 
              variant="ghost" 
              className="w-full justify-between h-12 text-base hover:bg-gray-50"
            >
              <span>Sign Out</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-12 text-red-600 hover:text-red-700 hover:bg-red-50 text-base"
                >
                  <span>Delete Account</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">
                    This action cannot be undone. This will permanently delete your account,
                    remove all your vehicle data, and cancel any active service appointments.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Account Deletion Requested",
                        description: "We'll process your request within 24 hours.",
                        variant: "destructive",
                      });
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
