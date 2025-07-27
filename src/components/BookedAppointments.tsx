
import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const BookedAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      date: '2024-12-15',
      time: '10:00 AM',
      serviceType: 'Routine Maintenance',
      status: 'confirmed',
      contactName: 'Ram Sharma',
      contactPhone: '+977 98X-XXX-XXXX',
      notes: 'Regular check-up and oil change',
      location: 'KTM Service Center, Naxal'
    },
    {
      id: '2',
      date: '2024-12-20',
      time: '02:00 PM',
      serviceType: 'Brake Service',
      status: 'pending',
      contactName: 'Ram Sharma',
      contactPhone: '+977 98X-XXX-XXXX',
      notes: 'Brake pads replacement needed',
      location: 'KTM Service Center, Lalitpur'
    }
  ]);

  const handleCancelAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="pb-20">
        <div className="p-4">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
            <p className="text-gray-500">You don't have any booked appointments yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-muted-foreground">
                    {appointment.serviceType}
                  </CardTitle>
                  <Badge 
                    className={`mt-2 ${getStatusColor(appointment.status)}`}
                    variant="outline"
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
                {appointment.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    aria-label="Cancel appointment"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(appointment.date)}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{appointment.time}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{appointment.location}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">{appointment.contactName}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{appointment.contactPhone}</span>
              </div>
              
              {appointment.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{appointment.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookedAppointments;
