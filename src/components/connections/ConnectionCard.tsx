import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  MapPin, 
  Building2,
  Stethoscope,
  Verified,
  UserMinus
} from 'lucide-react';
import { User } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ConnectionCardProps {
  user: User;
  connectionDate: string;
  onMessage?: (userId: string) => void;
  onRemove?: (userId: string) => void;
}

const ConnectionCard = ({ user, connectionDate, onMessage, onRemove }: ConnectionCardProps) => {
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {user.experience} years exp.
                </Badge>
                <span className="text-xs text-gray-500">
                  Connected {formatDistanceToNow(new Date(connectionDate), { addSuffix: true })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMessage?.(user.id)}
                  className="flex items-center space-x-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove?.(user.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <UserMinus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;