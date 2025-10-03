import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  UserPlus, 
  MapPin, 
  Building2,
  Stethoscope,
  Verified,
  MessageSquare
} from 'lucide-react';
import { User } from '@/types';

interface UserDiscoveryCardProps {
  user: User;
  onConnect?: (userId: string, message: string) => void;
}

const UserDiscoveryCard = ({ user, onConnect }: UserDiscoveryCardProps) => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');

  const handleConnect = () => {
    if (showMessageBox) {
      onConnect?.(user.id, message);
      setMessage('');
      setShowMessageBox(false);
    } else {
      setShowMessageBox(true);
    }
  };

  const handleCancel = () => {
    setShowMessageBox(false);
    setMessage('');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
              {user.isVerified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Stethoscope className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{user.specialization}</span>
              </div>
              
              {user.hospital && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{user.hospital}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{user.location}</span>
              </div>
            </div>
            
            {user.bio && (
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{user.bio}</p>
            )}
            
            {showMessageBox && (
              <div className="mb-3 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>Add a personal message (optional)</span>
                </div>
                <Textarea
                  placeholder="Hi! I'd love to connect and share insights about our medical practice..."
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {user.experience} years experience
              </Badge>
              
              <div className="flex items-center space-x-2">
                {showMessageBox && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                )}
                
                <Button
                  size="sm"
                  onClick={handleConnect}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{showMessageBox ? 'Send Request' : 'Connect'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDiscoveryCard;