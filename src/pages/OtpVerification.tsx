
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface OtpVerificationProps {
  phoneNumber: string;
  onVerify: () => void;
  onBack: () => void;
}

const OtpVerification = ({ phoneNumber, onVerify, onBack }: OtpVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    // Auto-verify when 6 digits are entered
    if (value.length === 6) {
      // For demo purposes, any 6-digit code will work
      setTimeout(() => onVerify(), 500);
    }
  };

  const handleResend = () => {
    setCountdown(30);
    setCanResend(false);
    setOtp('');
    // In a real app, you would call your OTP resend API here
  };

  const formatPhoneNumber = (number: string) => {
    return `+977 ${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md ktm-card">
        <CardHeader className="text-center space-y-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute top-4 left-4 h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 ktm-gradient rounded-full flex items-center justify-center ktm-glow">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold ktm-gradient bg-clip-text text-transparent mb-2">
                KTM Track
              </h1>
              <p className="text-lg text-muted-foreground">Motorcycle Insights</p>
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-foreground">
            Verify Your Number
          </CardTitle>
          
          <p className="text-muted-foreground">
            We've sent a verification code to
          </p>
          <p className="font-medium text-foreground">
            {formatPhoneNumber(phoneNumber)}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 text-center">
              Enter 6-digit code
            </label>
            
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="text-center space-y-4">
            {!canResend ? (
              <p className="text-sm text-gray-500">
                Resend code in {countdown}s
              </p>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Resend Code
              </Button>
            )}
          </div>

          <Button
            onClick={onVerify}
            disabled={otp.length !== 6}
            className="w-full h-12 text-base font-medium ktm-gradient text-white hover:opacity-90 transition-all duration-300"
          >
            Verify & Enter Track
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerification;
