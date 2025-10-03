import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageCircle, 
  Stethoscope,
  Bell,
  Search,
  X,
  ArrowRight
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';

const Navbar = () => {
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count
  const [messages] = useState(5); // Mock message count
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<'messages' | 'notifications' | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock recent messages data
  const recentMessages = [
    { id: 1, name: 'Dr. Sarah Johnson', message: 'Thanks for the consultation referral...', time: '2m ago', avatar: 'SJ' },
    { id: 2, name: 'Dr. Michael Chen', message: 'Can we schedule a meeting to discuss...', time: '15m ago', avatar: 'MC' },
    { id: 3, name: 'Dr. Emily Davis', message: 'The patient files you requested are...', time: '1h ago', avatar: 'ED' },
  ];

  // Mock recent notifications data
  const recentNotifications = [
    { id: 1, type: 'connection', message: 'Dr. James Wilson wants to connect', time: '5m ago' },
    { id: 2, type: 'job', message: 'New job posting matches your profile', time: '30m ago' },
    { id: 3, type: 'update', message: 'Your profile was viewed 12 times today', time: '2h ago' },
  ];

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/connections', icon: Users, label: 'Connections' },
    { path: '/jobs', icon: Briefcase, label: 'Jobs' },
    { path: '/messages', icon: MessageCircle, label: 'Messages', badge: messages, hasModal: true },
    { path: '/notifications', icon: Bell, label: 'Notifications', badge: notifications, hasModal: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    }
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchTerm('');
  };

  const handleModalToggle = (modalType: 'messages' | 'notifications') => {
    setActiveModal(activeModal === modalType ? null : modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeModal && 
          messagesRef.current && !messagesRef.current.contains(event.target as Node) &&
          notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeModal]);

  const handleNavClick = (item: any, e: React.MouseEvent<HTMLButtonElement>) => {
    if (item.hasModal) {
      e.preventDefault();
      handleModalToggle(item.path === '/messages' ? 'messages' : 'notifications');
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Responsive sizing */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0 min-w-0">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-current" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-blue-600 truncate">VitalPath</h1>
                <p className="text-xs text-gray-500 hidden md:block">Medical Network</p>
              </div>
            </Link>

            {/* Expanded Search Bar - Takes full width when active */}
            {isSearchExpanded && (
              <div className="flex-1 mx-2 sm:mx-4 flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search doctors, jobs, connections..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSearchClose}
                  className="p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </Button>
              </div>
            )}

            {/* Desktop Search Bar - Only on large screens when not expanded */}
            {!isSearchExpanded && (
              <div className="flex-1 max-w-md mx-2 sm:mx-4 hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search doctors, jobs, connections..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Navigation Items - Responsive spacing and sizing */}
            {!isSearchExpanded && (
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                {/* Search Icon for smaller screens */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    onClick={handleSearchToggle}
                    className="flex flex-col items-center px-1 sm:px-2 py-1 sm:py-2 h-auto relative transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 mb-0 sm:mb-1" />
                    <span className="hidden sm:block text-xs">Search</span>
                  </Button>
                </div>

                {/* Regular Navigation Items - Responsive sizing */}
                {navItems.map((item) => (
                  <div key={item.path} className="relative">
                    {item.hasModal ? (
                      <div ref={item.path === '/messages' ? messagesRef : notificationsRef}>
                        <Button
                          variant="ghost"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleNavClick(item, e)}
                          className={`flex flex-col items-center px-1 sm:px-2 md:px-3 py-1 sm:py-2 h-auto relative transition-colors ${
                            isActive(item.path) || activeModal === (item.path === '/messages' ? 'messages' : 'notifications')
                              ? 'text-gray-900 hover:text-gray-900' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mb-0 sm:mb-1 ${
                            isActive(item.path) || activeModal === (item.path === '/messages' ? 'messages' : 'notifications') 
                              ? 'fill-current' : ''
                          }`} />
                          <span className="hidden sm:block text-xs">{item.label}</span>
                          {item.badge && item.badge > 0 && (
                            <Badge className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center p-0 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>

                        {/* Modal positioned relative to this button */}
                        {activeModal === (item.path === '/messages' ? 'messages' : 'notifications') && (
                          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-[110] max-h-96 overflow-hidden">
                            <div className="p-4 border-b">
                              <h3 className="font-semibold text-gray-900">
                                {item.path === '/messages' ? 'Recent Messages' : 'Recent Notifications'}
                              </h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                              {item.path === '/messages' ? (
                                recentMessages.map((msg) => (
                                  <div key={msg.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0">
                                    <div className="flex items-start space-x-3">
                                      <Avatar className="w-8 h-8 flex-shrink-0">
                                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                          {msg.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{msg.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                recentNotifications.map((notif) => (
                                  <div key={notif.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0">
                                    <div className="flex items-start space-x-3">
                                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                            <Link 
                              to={item.path} 
                              className="block p-3 text-center text-blue-600 hover:bg-blue-50 border-t font-medium text-sm"
                              onClick={closeModal}
                            >
                              <div className="flex items-center justify-center space-x-1">
                                <span>Show all {item.path === '/messages' ? 'messages' : 'notifications'}</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to={item.path}>
                        <Button
                          variant="ghost"
                          className={`flex flex-col items-center px-1 sm:px-2 md:px-3 py-1 sm:py-2 h-auto relative transition-colors ${
                            isActive(item.path) 
                              ? 'text-gray-900 hover:text-gray-900' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mb-0 sm:mb-1 ${isActive(item.path) ? 'fill-current' : ''}`} />
                          <span className="hidden sm:block text-xs">{item.label}</span>
                          {item.badge && item.badge > 0 && (
                            <Badge className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center p-0 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* User Profile - Responsive sizing and guaranteed space */}
            <div className="flex items-center ml-1 sm:ml-2 md:ml-4 flex-shrink-0 min-w-0">
              <Link to="/profile">
                <div className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-50 rounded-lg p-1 sm:p-2 transition-colors cursor-pointer">
                  <Avatar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs sm:text-sm">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.specialization}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
          onClick={closeModal}
        />
      )}
    </>
  );
};

export default Navbar;