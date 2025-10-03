import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Briefcase, 
  Heart, 
  MessageCircle, 
  UserPlus,
  Check,
  X,
  Eye,
  Trash2,
  Settings
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { showSuccess } from '@/utils/toast';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'Dr. James Wilson wants to connect with you',
    timestamp: '2024-12-02T10:30:00Z',
    isRead: false,
    actionData: {
      userId: 4,
      userName: 'Dr. James Wilson',
      userSpecialization: 'Orthopedic Surgery',
      userAvatar: 'JW'
    }
  },
  {
    id: 2,
    type: 'job_match',
    title: 'New Job Match',
    message: 'A new locum position in Karachi matches your profile',
    timestamp: '2024-12-02T09:15:00Z',
    isRead: false,
    actionData: {
      jobTitle: 'Emergency Medicine Locum - Weekend Coverage',
      location: 'Karachi, Sindh'
    }
  },
  {
    id: 3,
    type: 'post_like',
    title: 'Post Interaction',
    message: 'Dr. Michael Chen and 5 others liked your post',
    timestamp: '2024-12-02T08:45:00Z',
    isRead: true,
    actionData: {
      postContent: 'Just finished a complex cardiac procedure...',
      likeCount: 6
    }
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'connections') return ['connection_request', 'connection_accepted'].includes(notification.type);
    if (activeTab === 'jobs') return ['job_match', 'job_application'].includes(notification.type);
    if (activeTab === 'interactions') return ['post_like', 'post_comment', 'message'].includes(notification.type);
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'job_match':
      case 'job_application':
        return <Briefcase className="w-5 h-5 text-green-600" />;
      case 'post_like':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'post_comment':
      case 'message':
        return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case 'profile_view':
        return <Eye className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    showSuccess('All notifications marked as read');
  };

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
    showSuccess('Notification deleted');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Bell className="w-6 h-6" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-gray-600">Stay updated with your professional network</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
              >
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
            <Button variant="ghost">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.isRead ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-medium ${
                                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-2">{notification.message}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                            
                            <div className="flex items-center space-x-1">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">
                    {activeTab === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications in this category yet."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;