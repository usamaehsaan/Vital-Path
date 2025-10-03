import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Users, 
  UserPlus, 
  Clock, 
  Filter
} from 'lucide-react';
import ConnectionCard from '@/components/connections/ConnectionCard';
import ConnectionRequestCard from '@/components/connections/ConnectionRequestCard';
import UserDiscoveryCard from '@/components/connections/UserDiscoveryCard';
import { mockUsers, mockConnections, currentUser } from '@/lib/mockData';
import { Connection } from '@/types';
import { showSuccess } from '@/utils/toast';

const Connections = () => {
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');

  // Filter out current user and already connected users for discovery
  const connectedUserIds = connections
    .filter(conn => conn.status === 'accepted')
    .map(conn => conn.requesterId === currentUser.id ? conn.receiverId : conn.requesterId);
  
  const pendingUserIds = connections
    .filter(conn => conn.status === 'pending')
    .map(conn => conn.requesterId === currentUser.id ? conn.receiverId : conn.requesterId);

  const availableUsers = mockUsers.filter(user => 
    user.id !== currentUser.id && 
    !connectedUserIds.includes(user.id) && 
    !pendingUserIds.includes(user.id)
  );

  // Get connected users
  const connectedUsers = connections
    .filter(conn => conn.status === 'accepted')
    .map(conn => {
      const userId = conn.requesterId === currentUser.id ? conn.receiverId : conn.requesterId;
      const user = mockUsers.find(u => u.id === userId);
      return user ? { user, connectionDate: conn.createdAt } : null;
    })
    .filter((item): item is { user: any; connectionDate: string } => item !== null);

  // Get pending requests (received)
  const receivedRequests = connections
    .filter(conn => conn.status === 'pending' && conn.receiverId === currentUser.id)
    .map(conn => {
      const user = mockUsers.find(u => u.id === conn.requesterId);
      return user ? { user, connection: conn } : null;
    })
    .filter((item): item is { user: any; connection: Connection } => item !== null);

  // Get sent requests
  const sentRequests = connections
    .filter(conn => conn.status === 'pending' && conn.requesterId === currentUser.id)
    .map(conn => {
      const user = mockUsers.find(u => u.id === conn.receiverId);
      return user ? { user, connection: conn } : null;
    })
    .filter((item): item is { user: any; connection: Connection } => item !== null);

  // Filter users for discovery
  const filteredUsers = availableUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || user.location === locationFilter;
    const matchesSpecialization = specializationFilter === 'all' || user.specialization === specializationFilter;

    return matchesSearch && matchesLocation && matchesSpecialization;
  });

  const handleConnect = (userId: string, message: string) => {
    const newConnection: Connection = {
      id: Date.now().toString(),
      requesterId: currentUser.id,
      receiverId: userId,
      status: 'pending',
      message: message || undefined,
      createdAt: new Date().toISOString()
    };

    setConnections([...connections, newConnection]);
    showSuccess('Connection request sent successfully!');
  };

  const handleAcceptRequest = (connectionId: string) => {
    setConnections(connections.map(conn =>
      conn.id === connectionId ? { ...conn, status: 'accepted' as const } : conn
    ));
    showSuccess('Connection request accepted!');
  };

  const handleDeclineRequest = (connectionId: string) => {
    setConnections(connections.map(conn =>
      conn.id === connectionId ? { ...conn, status: 'declined' as const } : conn
    ));
    showSuccess('Connection request declined.');
  };

  const handleCancelRequest = (connectionId: string) => {
    setConnections(connections.filter(conn => conn.id !== connectionId));
    showSuccess('Connection request cancelled.');
  };

  const handleMessage = () => {
    showSuccess('Opening message conversation...');
    // This would navigate to messages page with the specific user
  };

  const handleRemoveConnection = (userId: string) => {
    setConnections(connections.filter(conn => 
      !(conn.requesterId === userId || conn.receiverId === userId)
    ));
    showSuccess('Connection removed.');
  };

  const locations = Array.from(new Set(mockUsers.map(user => user.location)));
  const specializations = Array.from(new Set(mockUsers.map(user => user.specialization)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Specialization</label>
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All specializations</SelectItem>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setSpecializationFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Professional Network</h1>
            <p className="text-gray-600">Connect with medical professionals worldwide</p>
          </div>

          <Tabs defaultValue="connections" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="connections" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>My Connections ({connectedUsers.length})</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Requests ({receivedRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Sent ({sentRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="discover" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Discover</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="mt-6">
              <div className="space-y-4">
                {connectedUsers.length > 0 ? (
                  connectedUsers.map((item) => (
                    <ConnectionCard
                      key={item.user.id}
                      user={item.user}
                      connectionDate={item.connectionDate}
                      onMessage={handleMessage}
                      onRemove={handleRemoveConnection}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No connections yet</p>
                      <p className="text-sm text-gray-400">Start building your professional network by discovering and connecting with other medical professionals.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <div className="space-y-4">
                {receivedRequests.length > 0 ? (
                  receivedRequests.map((item) => (
                    <ConnectionRequestCard
                      key={item.connection.id}
                      user={item.user}
                      connection={item.connection}
                      type="received"
                      onAccept={handleAcceptRequest}
                      onDecline={handleDeclineRequest}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No pending requests</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="mt-6">
              <div className="space-y-4">
                {sentRequests.length > 0 ? (
                  sentRequests.map((item) => (
                    <ConnectionRequestCard
                      key={item.connection.id}
                      user={item.user}
                      connection={item.connection}
                      type="sent"
                      onCancel={handleCancelRequest}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No sent requests</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="discover" className="mt-6">
              <div className="space-y-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserDiscoveryCard
                      key={user.id}
                      user={user}
                      onConnect={handleConnect}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No doctors found matching your criteria</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setLocationFilter('all');
                          setSpecializationFilter('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Connections;