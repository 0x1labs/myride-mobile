
import { useState } from 'react';
import { Bell, Calendar, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'service',
      title: 'Service Reminder',
      message: 'Your KTM Adv 390 is due for routine maintenance on December 12, 2024',
      timestamp: '2024-12-01T10:00:00Z',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'document',
      title: 'Insurance Expiry Warning',
      message: 'Your vehicle insurance will expire in 3 months. Please renew to avoid any issues.',
      timestamp: '2024-11-28T14:30:00Z',
      isRead: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your brake service appointment on December 20, 2024 at 2:00 PM has been confirmed.',
      timestamp: '2024-11-25T09:15:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'service',
      title: 'Service Completed',
      message: 'Your routine maintenance service has been completed successfully. Check service history for details.',
      timestamp: '2024-11-20T16:45:00Z',
      isRead: true,
      priority: 'low'
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'document':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'appointment':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white border-red-600';
      case 'medium':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'low':
        return 'bg-green-500 text-white border-green-600';
      default:
        return 'bg-muted text-foreground border-border';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`relative ${!notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-card/50'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-medium ${notification.isRead ? 'text-muted-background' : 'text-black'}`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 text-sm ${notification.isRead ? 'text-muted-background' : 'text-black'}`}>
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className={`text-xs ${notification.isRead ? 'text-muted-background' : 'text-black'}`}>
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <Badge 
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                              variant="outline"
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs  h-8 px-2"
                            >
                              Mark read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="h-8 w-8 text-muted-background hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
