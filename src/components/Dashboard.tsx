import { Calendar, MessageCircle, AlertTriangle, CheckCircle, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  onBookAppointment?: () => void;
}

const Dashboard = ({ onBookAppointment }: DashboardProps) => {
  const [questionText, setQuestionText] = useState('');
  const [showQuestionBox, setShowQuestionBox] = useState(false);
  const { toast } = useToast();
  
  const nextServiceDate = "December 12, 2024";
  const daysUntilService = 15;
  const maxQuestionLength = 500;

  const handleSubmitQuestion = () => {
    if (questionText.trim().length === 0) return;
    
    toast({
      title: "Question Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    
    setQuestionText('');
    setShowQuestionBox(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmitQuestion();
    }
  };

  return (
    <div className="pb-20">
      {/* Vehicle Header */}
      <div className="relative h-64 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <h2 className="text-2xl font-bold">KTM Adv </h2>
          <p className="text-slate-200">BA 1234 • 2021</p>
        </div>
        {/* Car silhouette */}
        <div className="absolute bottom-0 right-0 opacity-30">
          <div className="w-48 h-24 bg-white/10 rounded-tl-full"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Next Service */}
        <Card className="border-l-4 border-l-blue-500" role="region" aria-labelledby="next-service-title">
          <CardHeader className="pb-3">
            <CardTitle id="next-service-title" className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Next Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Next Service Due</p>
                <p className="text-sm text-gray-600">{nextServiceDate}</p>
              </div>
              <div className="flex items-center">
                <AlertTriangle 
                  className="h-5 w-5 text-orange-500 mr-2" 
                  aria-label="Service reminder warning"
                />
                <Badge 
                  variant="outline" 
                  className="text-orange-600 border-orange-200"
                  aria-label={`Service due in ${daysUntilService} days`}
                >
                  {daysUntilService} days
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Reminders */}
        <Card role="region" aria-labelledby="document-reminders-title">
          <CardHeader>
            <CardTitle id="document-reminders-title" className="text-lg">Document Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg" role="listitem">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">License</p>
                  <p className="text-sm text-green-600">Valid</p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" aria-label="License is valid" />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg" role="listitem">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bluebook</p>
                  <p className="text-sm text-green-600">Valid</p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" aria-label="Bluebook is valid" />
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200" role="listitem">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Insurance</p>
                  <p className="text-sm text-orange-600">Expires in 3 months</p>
                </div>
              </div>
              <AlertTriangle className="h-5 w-5 text-orange-500" aria-label="Insurance expires soon" />
            </div>
          </CardContent>
        </Card>

        {/* Question Input */}
        {showQuestionBox && (
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Ask a Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Textarea
                  placeholder="Type your question here... (e.g., 'When did I last change the engine oil?')"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={maxQuestionLength}
                  className="min-h-[100px] resize-none"
                  aria-describedby="question-help character-count"
                />
                <div className="flex justify-between items-center mt-2">
                  <p id="question-help" className="text-xs text-gray-500">
                    Press Cmd/Ctrl + Enter to submit
                  </p>
                  <p 
                    id="character-count" 
                    className={`text-xs ${
                      questionText.length > maxQuestionLength * 0.9 
                        ? 'text-orange-600' 
                        : 'text-gray-500'
                    }`}
                  >
                    {questionText.length}/{maxQuestionLength}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitQuestion}
                  disabled={questionText.trim().length === 0}
                  className="flex-1"
                >
                  <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                  Submit Question
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowQuestionBox(false);
                    setQuestionText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onBookAppointment}
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby="book-appointment-help"
          >
            <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
            Book Appointment
          </Button>
          <p id="book-appointment-help" className="sr-only">
            Primary action to schedule a service appointment
          </p>
          
          {!showQuestionBox && (
            <Button 
              variant="outline" 
              className="w-full h-12 text-base font-medium border-2 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => setShowQuestionBox(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Ask a Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
