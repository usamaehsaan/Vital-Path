import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  MapPin, 
  Building2,
  Stethoscope,
  Verified,
  Clock
} from 'lucide-react';
import { User, Connection } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ConnectionRequestCardProps {
  user: User;
  connection: Connection;
  type: 'received' | 'sent';
  onAccept?: (connectionId: string) => void;
  onDecline?: (connectionId: string) => void;
  onCancel?: (connectionId: string) => void;
}

const ConnectionRequestCard = ({ 
  user, 
  connection, 
  type, 
  onAccept, 
  onDecline, 
  onCancel 
}: ConnectionRequestCardProps) => {
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
              <Badge variant="outline" className="text-xs">
                {type === 'received' ? 'Wants to connect' : 'Request sent'}
              </Badge>
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
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{formatDistanceToNow(new Date(connection.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
            
            {connection.message && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 italic">"{connection.message}"</p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {user.experience} years experience
              </Badge>
              
              <div className="flex items-center space-x-2">
                {type === 'received' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDecline?.(connection.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => onAccept?.(connection.id)}
                      className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancel?.(connection.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionRequestCard;