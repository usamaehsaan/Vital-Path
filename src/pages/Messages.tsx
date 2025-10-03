import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  ArrowLeft,
  Paperclip,
  Smile
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    participant: {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Emergency Medicine',
      avatar: 'MC',
      isOnline: true
    },
    lastMessage: {
      content: 'Thanks for the consultation referral. The patient is doing much better now.',
      timestamp: '2024-12-02T10:30:00Z',
      senderId: '2',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 2,
    participant: {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrics',
      avatar: 'ER',
      isOnline: false
    },
    lastMessage: {
      content: 'Can we schedule a meeting to discuss the new pediatric protocols?',
      timestamp: '2024-12-02T09:15:00Z',
      senderId: '3',
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: 3,
    participant: {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedic Surgery',
      avatar: 'JW',
      isOnline: true
    },
    lastMessage: {
      content: 'The patient files you requested are ready for review.',
      timestamp: '2024-12-02T08:45:00Z',
      senderId: '1',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 4,
    participant: {
      id: '5',
      name: 'Dr. Sarah Ahmed',
      specialization: 'Cardiology',
      avatar: 'SA',
      isOnline: false
    },
    lastMessage: {
      content: 'Great presentation at the conference yesterday!',
      timestamp: '2024-12-01T16:20:00Z',
      senderId: '5',
      isRead: true
    },
    unreadCount: 0
  }
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    senderId: '2',
    content: 'Hi Dr. Johnson, I wanted to follow up on the patient referral from last week.',
    timestamp: '2024-12-02T10:00:00Z',
    isRead: true
  },
  {
    id: 2,
    senderId: '1',
    content: 'Of course! How is the patient doing? I was concerned about the cardiac symptoms.',
    timestamp: '2024-12-02T10:05:00Z',
    isRead: true
  },
  {
    id: 3,
    senderId: '2',
    content: 'The ECG results came back normal, and we\'ve started them on the medication you recommended.',
    timestamp: '2024-12-02T10:10:00Z',
    isRead: true
  },
  {
    id: 4,
    senderId: '1',
    content: 'That\'s excellent news! Please keep me updated on their progress.',
    timestamp: '2024-12-02T10:15:00Z',
    isRead: true
  },
  {
    id: 5,
    senderId: '2',
    content: 'Thanks for the consultation referral. The patient is doing much better now.',
    timestamp: '2024-12-02T10:30:00Z',
    isRead: true
  }
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participant.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: messages.length + 1,
        senderId: currentUser.id,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      setMessages([...messages, message]);
      
      // Update conversation's last message
      setConversations(conversations.map(conv =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
                senderId: currentUser.id,
                isRead: false
              }
            }
          : conv
      ));
      
      setNewMessage('');
    }
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    
    // Mark conversation as read
    setConversations(conversations.map(conv =>
      conv.id === conversationId
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        {/* Conversations List */}
        <div className={`lg:w-96 ${selectedConversation ? 'hidden lg:block' : 'block'}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <span>Messages</span>
                  {totalUnreadCount > 0 && (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {totalUnreadCount}
                    </Badge>
                  )}
                </CardTitle>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleConversationSelect(conversation.id)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                        selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {conversation.participant.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.participant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium truncate ${
                              conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {conversation.participant.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-0">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-1 truncate">
                            {conversation.participant.specialization}
                          </p>
                          
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                          }`}>
                            {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No conversations found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className={`flex-1 ${selectedConversation ? 'block' : 'hidden lg:block'}`}>
          {selectedConversation && selectedConv ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {selectedConv.participant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConv.participant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{selectedConv.participant.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.participant.isOnline ? 'Online' : 'Offline'} • {selectedConv.participant.specialization}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUser.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <Button variant="ghost" size="sm" className="mb-2">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
                      onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[40px] max-h-[120px] resize-none"
                    />
                  </div>
                  
                  <Button variant="ghost" size="sm" className="mb-2">
                    <Smile className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="mb-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;