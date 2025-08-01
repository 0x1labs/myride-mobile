
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Index from './pages/Index';
import Login from './pages/Login';
import OtpVerification from './pages/OtpVerification';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState<'login' | 'otp' | 'app'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      setCurrentStep('app');
    }
  }, []);

  const handleLogin = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentStep('otp');
  };

  const handleOtpVerify = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setCurrentStep('app');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setCurrentStep('login');
    setPhoneNumber('');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setPhoneNumber('');
  };

  if (!isAuthenticated) {
    if (currentStep === 'login') {
      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Login onLogin={handleLogin} />
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      );
    }

    if (currentStep === 'otp') {
      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <OtpVerification
                phoneNumber={phoneNumber}
                onVerify={handleOtpVerify}
                onBack={handleBackToLogin}
              />
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      );
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index onSignOut={handleSignOut} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
