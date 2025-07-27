
import { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginProps {
  onLogin: (phoneNumber: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validatePhoneNumber = (number: string) => {
    // Nepal phone numbers are typically 10 digits
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length === 10;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setIsValid(validatePhoneNumber(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onLogin(phoneNumber);
    }
  };

  const formatPhoneDisplay = (number: string) => {
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)}-${number.slice(3)}`;
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md ktm-card">
        <CardHeader className="text-center space-y-6">
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 ktm-gradient rounded-full flex items-center justify-center ktm-glow">
              <Phone className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold ktm-gradient bg-clip-text text-transparent mb-2">
                KTM Track
              </h1>
              <p className="text-lg text-muted-foreground">Motorcycle Insights</p>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Ready to Ride?
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your phone number to access track insights
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <span className="text-lg mr-2">🇳🇵</span>
                  <span className="text-gray-700 font-medium">+977</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={formatPhoneDisplay(phoneNumber)}
                  onChange={handlePhoneChange}
                  placeholder="98X-XXX-XXXX"
                  className="rounded-l-none flex-1 text-base"
                  maxLength={12}
                />
              </div>
              {phoneNumber && !isValid && (
                <p className="text-sm text-red-600">
                  Please enter a valid 10-digit phone number
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full h-12 text-base font-medium ktm-gradient text-white hover:opacity-90 transition-all duration-300"
            >
              Enter Track
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
