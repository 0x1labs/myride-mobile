
import { Calendar, MessageCircle, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const nextServiceDate = "December 12, 2024";
  const daysUntilService = 15;

  return (
    <div className="pb-20">
      {/* Vehicle Header */}
      <div className="relative h-64 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <h2 className="text-2xl font-bold">Honda Civic</h2>
          <p className="text-slate-200">BA 1234 • 2021</p>
        </div>
        {/* Car silhouette */}
        <div className="absolute bottom-0 right-0 opacity-30">
          <div className="w-48 h-24 bg-white/10 rounded-tl-full"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Next Service */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
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
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {daysUntilService} days
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">License</p>
                  <p className="text-sm text-green-600">Valid</p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bluebook</p>
                  <p className="text-sm text-green-600">Valid</p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Insurance</p>
                  <p className="text-sm text-orange-600">Expires in 3 months</p>
                </div>
              </div>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700">
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
          
          <Button variant="outline" className="w-full h-12 text-base font-medium border-2">
            <MessageCircle className="mr-2 h-5 w-5" />
            Ask a Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
