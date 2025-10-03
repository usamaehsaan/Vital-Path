import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  MapPin,
  Search,
  X,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Users,
  Calendar,
  TrendingUp,
  Star,
  Plus,
  UserPlus,
  ExternalLink,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

// Mock location data - Pakistan cities and sub-parts
const mockLocations = [
  { id: 1, name: 'Karachi, Sindh', type: 'city' },
  { id: 2, name: 'Lahore, Punjab', type: 'city' },
  { id: 3, name: 'Islamabad, ICT', type: 'city' },
  { id: 4, name: 'Rawalpindi, Punjab', type: 'city' },
  { id: 5, name: 'Faisalabad, Punjab', type: 'city' },
  { id: 6, name: 'Multan, Punjab', type: 'city' },
  { id: 7, name: 'Peshawar, KPK', type: 'city' },
  { id: 8, name: 'Quetta, Balochistan', type: 'city' },
  { id: 9, name: 'Hyderabad, Sindh', type: 'city' },
  { id: 10, name: 'Gujranwala, Punjab', type: 'city' },
  { id: 11, name: 'DHA Karachi', type: 'city' },
  { id: 12, name: 'Clifton, Karachi', type: 'city' },
  { id: 13, name: 'Gulshan-e-Iqbal, Karachi', type: 'city' },
  { id: 14, name: 'North Nazimabad, Karachi', type: 'city' },
  { id: 15, name: 'Saddar, Karachi', type: 'city' },
  { id: 16, name: 'Korangi, Karachi', type: 'city' },
  { id: 17, name: 'DHA Lahore', type: 'city' },
  { id: 18, name: 'Gulberg, Lahore', type: 'city' },
  { id: 19, name: 'Model Town, Lahore', type: 'city' },
  { id: 20, name: 'Johar Town, Lahore', type: 'city' },
  { id: 21, name: 'Cantt, Lahore', type: 'city' },
  { id: 22, name: 'F-6, Islamabad', type: 'city' },
  { id: 23, name: 'F-7, Islamabad', type: 'city' },
  { id: 24, name: 'F-8, Islamabad', type: 'city' },
  { id: 25, name: 'G-9, Islamabad', type: 'city' },
  { id: 26, name: 'Blue Area, Islamabad', type: 'city' },
  { id: 27, name: 'Aga Khan University Hospital, Karachi', type: 'hospital' },
  { id: 28, name: 'Shaukat Khanum Memorial Hospital, Lahore', type: 'hospital' },
  { id: 29, name: 'Pakistan Institute of Medical Sciences (PIMS), Islamabad', type: 'hospital' },
  { id: 30, name: 'Jinnah Postgraduate Medical Centre, Karachi', type: 'hospital' },
  { id: 31, name: 'King Edward Medical University, Lahore', type: 'hospital' },
  { id: 32, name: 'Liaquat National Hospital, Karachi', type: 'hospital' },
  { id: 33, name: 'Services Hospital, Lahore', type: 'hospital' },
  { id: 34, name: 'Holy Family Hospital, Rawalpindi', type: 'hospital' },
  { id: 35, name: 'Combined Military Hospital (CMH), Lahore', type: 'hospital' },
  { id: 36, name: 'Fatima Memorial Hospital, Lahore', type: 'hospital' },
  { id: 37, name: 'National Institute of Cardiovascular Diseases, Karachi', type: 'hospital' },
  { id: 38, name: 'Shifa International Hospital, Islamabad', type: 'hospital' },
  { id: 39, name: 'Hameed Latif Hospital, Lahore', type: 'clinic' },
  { id: 40, name: 'South City Hospital, Karachi', type: 'clinic' },
  { id: 41, name: 'Maroof International Hospital, Islamabad', type: 'clinic' },
  { id: 42, name: 'Omar Hospital & Cardiac Centre, Lahore', type: 'clinic' },
  { id: 43, name: 'Ziauddin Hospital, Karachi', type: 'clinic' },
  { id: 44, name: 'National Hospital, Lahore', type: 'clinic' },
  { id: 45, name: 'Kulsum International Hospital, Islamabad', type: 'clinic' },
  { id: 46, name: 'Indus Hospital, Karachi', type: 'clinic' },
  { id: 47, name: 'Doctors Hospital, Lahore', type: 'clinic' },
  { id: 48, name: 'Rehman Medical Institute, Peshawar', type: 'clinic' },
];

// Mock communities data
const mockCommunities = [
  {
    id: 1,
    name: 'Cardiology Pakistan',
    description: 'Community for cardiac specialists across Pakistan',
    memberCount: 1247,
    isJoined: true,
    avatar: 'CP',
    category: 'Medical Specialty'
  },
  {
    id: 2,
    name: 'Emergency Medicine Network',
    description: 'Emergency physicians sharing knowledge and experiences',
    memberCount: 892,
    isJoined: true,
    avatar: 'EM',
    category: 'Medical Specialty'
  },
  {
    id: 3,
    name: 'Karachi Medical Community',
    description: 'Local medical professionals in Karachi',
    memberCount: 2156,
    isJoined: false,
    avatar: 'KM',
    category: 'Location Based'
  },
  {
    id: 4,
    name: 'Medical Research Hub',
    description: 'Sharing latest medical research and publications',
    memberCount: 567,
    isJoined: true,
    avatar: 'MR',
    category: 'Research'
  },
  {
    id: 5,
    name: 'Young Doctors Association',
    description: 'Supporting early career medical professionals',
    memberCount: 3421,
    isJoined: false,
    avatar: 'YD',
    category: 'Career Development'
  },
  {
    id: 6,
    name: 'Pediatrics Network',
    description: 'Pediatric specialists sharing knowledge',
    memberCount: 789,
    isJoined: false,
    avatar: 'PN',
    category: 'Medical Specialty'
  }
];

// Mock news and events data
const mockNews = [
  {
    id: 1,
    type: 'news',
    title: 'New Medical Guidelines Released by Pakistan Medical Commission',
    summary: 'Updated protocols for patient care and safety standards...',
    timestamp: '2024-12-02T08:00:00Z',
    source: 'PMC Official',
    category: 'Regulatory'
  },
  {
    id: 2,
    type: 'event',
    title: 'International Cardiology Conference 2024',
    summary: 'Join leading cardiologists from around the world in Lahore',
    timestamp: '2024-12-15T09:00:00Z',
    location: 'Lahore Convention Center',
    category: 'Conference'
  },
  {
    id: 3,
    type: 'promotion',
    title: 'Special Discount on Medical Equipment',
    summary: '30% off on diagnostic equipment for registered doctors',
    timestamp: '2024-12-10T00:00:00Z',
    company: 'MedTech Solutions',
    category: 'Equipment'
  },
  {
    id: 4,
    type: 'news',
    title: 'Breakthrough in Cancer Treatment Research',
    summary: 'Pakistani researchers develop new immunotherapy approach...',
    timestamp: '2024-12-01T14:30:00Z',
    source: 'Medical Journal',
    category: 'Research'
  }
];

// Mock posts data
const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist'
    },
    content: 'Just finished a complex cardiac procedure. The teamwork in the OR today was exceptional. Grateful to work with such dedicated professionals.',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    author: {
      name: 'Dr. Michael Chen',
      specialization: 'Emergency Medicine'
    },
    content: 'Reminder: The new CPR guidelines have been updated. Make sure to review the latest protocols. Patient safety is our top priority.',
    timestamp: '4 hours ago',
    likes: 18,
    comments: 12
  },
  {
    id: 3,
    author: {
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics'
    },
    content: 'Looking for recommendations on the best pediatric stethoscope. Any suggestions from fellow pediatricians?',
    timestamp: '6 hours ago',
    likes: 15,
    comments: 22
  }
];

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'entertainment' | 'locum' | 'tips' | 'career'>('general');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [communities, setCommunities] = useState(mockCommunities);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');
  
  // Sidebar states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(true);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(true);
  
  const postModalRef = useRef<HTMLDivElement>(null);
  const locationModalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'general', label: 'General', description: 'General medical discussions' },
    { id: 'tips', label: 'Tips', description: 'Medical tips and best practices' },
    { id: 'career', label: 'Career', description: 'Career advice and opportunities' },
    { id: 'entertainment', label: 'Entertainment', description: 'Fun and social content' },
    { id: 'locum', label: 'Locum', description: 'Locum opportunities and requests' }
  ];

  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  const joinedCommunities = communities.filter(c => c.isJoined);
  const availableCommunities = communities.filter(c => !c.isJoined);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(40, textarea.scrollHeight) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [postContent]);

  // Initial height adjustment on modal open
  useEffect(() => {
    if (showPostModal && textareaRef.current) {
      setTimeout(() => {
        adjustTextareaHeight();
      }, 0);
    }
  }, [showPostModal]);

  // Handle touch events for mobile swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        if (diffX > diffY && diffX > 10) {
          isSwiping = true;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      const screenWidth = window.innerWidth;

      // Only trigger if horizontal swipe is significant
      if (Math.abs(diffX) > 80) {
        if (diffX > 0 && startX < 50) {
          // Swipe right from left edge - open left sidebar
          setLeftSidebarOpen(true);
        } else if (diffX < 0 && startX > screenWidth - 50) {
          // Swipe left from right edge - open right sidebar
          setRightSidebarOpen(true);
        }
      }
    };

    // Only add touch events on mobile/tablet
    if (window.innerWidth < 1024) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Close sidebars when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 1024) {
        if (leftSidebarOpen && leftSidebarRef.current && !leftSidebarRef.current.contains(event.target as Node)) {
          setLeftSidebarOpen(false);
        }
        if (rightSidebarOpen && rightSidebarRef.current && !rightSidebarRef.current.contains(event.target as Node)) {
          setRightSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [leftSidebarOpen, rightSidebarOpen]);

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
    setLocationSearchTerm('');
  };

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
  };

  const handleCategorySelect = (categoryId: 'general' | 'entertainment' | 'locum' | 'tips' | 'career') => {
    setSelectedCategory(categoryId);
  };

  const handleOpenPostModal = () => {
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setShowLocationModal(false);
    setEditingImageIndex(null);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
    setLocationSearchTerm('');
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 4));
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleChangeImage = (index: number) => {
    setEditingImageIndex(index);
    editFileInputRef.current?.click();
  };

  const handleEditImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && editingImageIndex !== null) {
      setSelectedImages(prev => {
        const newImages = [...prev];
        newImages[editingImageIndex] = files[0];
        return newImages;
      });
      setEditingImageIndex(null);
    }
  };

  const handlePost = () => {
    if (postContent.trim() || selectedImages.length > 0) {
      console.log('Creating post:', {
        content: postContent,
        category: selectedCategory,
        location: selectedLocation,
        images: selectedImages
      });
      
      setPostContent('');
      setSelectedCategory('general');
      setSelectedLocation(null);
      setSelectedImages([]);
      setShowPostModal(false);
    }
  };

  const handleJoinCommunity = (communityId: number) => {
    setCommunities(communities.map(c =>
      c.id === communityId ? { ...c, isJoined: true, memberCount: c.memberCount + 1 } : c
    ));
  };

  const handleLeaveCommunity = (communityId: number) => {
    setCommunities(communities.map(c =>
      c.id === communityId ? { ...c, isJoined: false, memberCount: c.memberCount - 1 } : c
    ));
  };

  const handleCreateCommunity = () => {
    if (newCommunityName.trim() && newCommunityDescription.trim()) {
      const newCommunity = {
        id: communities.length + 1,
        name: newCommunityName,
        description: newCommunityDescription,
        memberCount: 1,
        isJoined: true,
        avatar: newCommunityName.split(' ').map(w => w[0]).join('').toUpperCase(),
        category: 'User Created'
      };
      setCommunities([...communities, newCommunity]);
      setNewCommunityName('');
      setNewCommunityDescription('');
      setShowCreateCommunity(false);
    }
  };

  // Handle modal backdrop clicks and body scroll
  useEffect(() => {
    const handlePostModalBackdrop = (event: MouseEvent) => {
      if (postModalRef.current && event.target === postModalRef.current) {
        handleClosePostModal();
      }
    };

    const handleLocationModalBackdrop = (event: MouseEvent) => {
      if (locationModalRef.current && event.target === locationModalRef.current) {
        handleCloseLocationModal();
      }
    };

    if (showPostModal) {
      document.addEventListener('mousedown', handlePostModalBackdrop);
      document.body.style.overflow = 'hidden';
    }

    if (showLocationModal) {
      document.addEventListener('mousedown', handleLocationModalBackdrop);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handlePostModalBackdrop);
      document.removeEventListener('mousedown', handleLocationModalBackdrop);
      if (!showPostModal && !showLocationModal) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [showPostModal, showLocationModal]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Floating Action Buttons for Mobile/Tablet */}
      <div className="lg:hidden">
        <Button
          onClick={() => setLeftSidebarOpen(true)}
          className="fixed left-4 top-20 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <Users className="w-5 h-5 text-white" />
        </Button>

        <Button
          onClick={() => setRightSidebarOpen(true)}
          className="fixed right-4 top-20 z-50 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-200 hover:scale-110 xl:hidden"
        >
          <Bell className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Desktop Sidebar Toggle for Right Sidebar */}
      <div className="hidden lg:block xl:hidden">
        <Button
          onClick={() => setRightSidebarExpanded(!rightSidebarExpanded)}
          className="fixed right-4 top-20 z-50 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-200"
        >
          {rightSidebarExpanded ? <ChevronRight className="w-4 h-4 text-white" /> : <Bell className="w-4 h-4 text-white" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      <div className="flex">
        {/* Left Sidebar */}
        <div
          ref={leftSidebarRef}
          className={`
            fixed lg:sticky top-0 left-0 h-screen w-80 bg-white shadow-xl z-50 lg:z-auto
            transform transition-transform duration-300 ease-out
            lg:transform-none lg:shadow-none lg:border-r lg:border-gray-200
            ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${leftSidebarExpanded ? 'lg:block' : 'lg:hidden'}
          `}
        >
          <div className="h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="lg:hidden flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-900">Profile & Communities</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLeftSidebarOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-gray-900">{currentUser.name}</h3>
                    <p className="text-gray-600 mb-2">{currentUser.specialization}</p>
                    <p className="text-sm text-gray-500 mb-4">{currentUser.hospital}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-semibold text-lg text-gray-900">42</p>
                        <p className="text-xs text-gray-500">Posts</p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900">156</p>
                        <p className="text-xs text-gray-500">Connections</p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900">{joinedCommunities.length}</p>
                        <p className="text-xs text-gray-500">Communities</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Communities Section - Fixed UI */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">Communities</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCreateCommunity(!showCreateCommunity)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Create Community Form */}
                  {showCreateCommunity && (
                    <div className="px-4 pb-4 border-b bg-gray-50">
                      <div className="space-y-3">
                        <Input
                          placeholder="Community name"
                          value={newCommunityName}
                          onChange={(e) => setNewCommunityName(e.target.value)}
                          className="text-sm"
                        />
                        <Textarea
                          placeholder="Community description"
                          value={newCommunityDescription}
                          onChange={(e) => setNewCommunityDescription(e.target.value)}
                          className="min-h-[60px] text-sm"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleCreateCommunity} className="text-xs">
                            Create
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowCreateCommunity(false)}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fixed Tabs Layout */}
                  <div className="px-4 pt-4">
                    <Tabs defaultValue="joined" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-8 p-0">
                        <TabsTrigger value="joined" className="text-xs px-2 py-1">
                          Joined ({joinedCommunities.length})
                        </TabsTrigger>
                        <TabsTrigger value="discover" className="text-xs px-2 py-1">
                          Discover
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="joined" className="mt-3 mb-0">
                        <div className="max-h-64 overflow-y-auto space-y-2 pb-4">
                          {joinedCommunities.length > 0 ? (
                            joinedCommunities.map((community) => (
                              <div key={community.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                                    {community.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate text-gray-900">{community.name}</p>
                                  <p className="text-xs text-gray-500">{community.memberCount.toLocaleString()} members</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleLeaveCommunity(community.id)}
                                  className="text-red-600 hover:text-red-700 h-6 w-6 p-0 flex-shrink-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-6">
                              <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No communities joined yet</p>
                              <p className="text-xs text-gray-400">Discover communities to connect with peers</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="discover" className="mt-3 mb-0">
                        <div className="max-h-64 overflow-y-auto space-y-3 pb-4">
                          {availableCommunities.length > 0 ? (
                            availableCommunities.map((community) => (
                              <div key={community.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-start space-x-3">
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                      {community.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-gray-900 mb-1">{community.name}</p>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{community.description}</p>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">{community.memberCount.toLocaleString()} members</span>
                                      <Button
                                        size="sm"
                                        onClick={() => handleJoinCommunity(community.id)}
                                        className="h-6 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                                      >
                                        <UserPlus className="w-3 h-3 mr-1" />
                                        Join
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-6">
                              <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">All communities joined!</p>
                              <p className="text-xs text-gray-400">Create a new community to expand the network</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content - Always Centered */}
        <div className="flex-1 min-w-0">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Create Post */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div 
                  onClick={handleOpenPostModal}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-full px-4 py-3 text-gray-500">
                      What's on your mind, {currentUser.name.split(' ')[0]}?
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-sm text-gray-500">{post.author.specialization}</p>
                          <p className="text-xs text-gray-400">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                          <Share2 className="w-4 h-4 mr-1" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          ref={rightSidebarRef}
          className={`
            fixed xl:sticky top-0 right-0 h-screen w-80 bg-white shadow-xl z-50 xl:z-auto
            transform transition-transform duration-300 ease-out
            xl:transform-none xl:shadow-none xl:border-l xl:border-gray-200
            ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
            ${rightSidebarExpanded ? 'xl:block' : 'xl:hidden'}
          `}
        >
          <div className="h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="xl:hidden flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-900">News & Updates</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightSidebarOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* News & Updates */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2 text-gray-900">
                    <TrendingUp className="w-5 h-5" />
                    <span>Latest Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4 px-4 pb-4">
                    {mockNews.map((item) => (
                      <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            item.type === 'news' ? 'bg-blue-500' :
                            item.type === 'event' ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {item.type === 'news' ? 'News' : 
                                 item.type === 'event' ? 'Event' : 'Promotion'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2 text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.summary}</p>
                            
                            {item.type === 'event' && (
                              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </div>
                            )}
                            
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Read more
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2 text-gray-900">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <div className="text-center flex-shrink-0">
                        <p className="text-lg font-bold text-blue-600">15</p>
                        <p className="text-xs text-blue-600">DEC</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">Cardiology Conference</p>
                        <p className="text-xs text-gray-500">Lahore Convention Center</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                      <div className="text-center flex-shrink-0">
                        <p className="text-lg font-bold text-green-600">22</p>
                        <p className="text-xs text-green-600">DEC</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">Medical Research Symposium</p>
                        <p className="text-xs text-gray-500">Karachi Medical College</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2 text-gray-900">
                    <Star className="w-5 h-5" />
                    <span>Trending Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {['#MedicalResearch', '#CardiacCare', '#EmergencyMedicine', '#HealthTech', '#MedicalEducation'].map((tag, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                        <span className="text-sm font-medium text-blue-600">{tag}</span>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 50} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostModal && (
        <div 
          ref={postModalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClosePostModal}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.specialization}</p>
                </div>
              </div>

              <textarea
                ref={textareaRef}
                placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full min-h-[40px] max-h-[200px] resize-none border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-hidden"
                style={{ height: '40px' }}
                autoFocus
              />

              {selectedLocation && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">{selectedLocation.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedLocation.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveLocation}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {categories.find(c => c.id === selectedCategory)?.description}
                </p>
              </div>

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-32 object-contain rounded-lg"
                      />
                      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleChangeImage(index)}
                          className="w-6 h-6 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full flex items-center justify-center transition-all"
                        >
                          <Edit3 className="w-3 h-3 text-white" />
                        </button>
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="w-6 h-6 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full flex items-center justify-center transition-all"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-blue-600"
                    disabled={selectedImages.length >= 4}
                  >
                    <ImageIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Photo</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLocationModal(true)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">Location</span>
                  </Button>
                </div>

                <Button 
                  onClick={handlePost}
                  disabled={!postContent.trim() && selectedImages.length === 0}
                  className="px-6"
                >
                  Post
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <input
              ref={editFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleEditImageSelect}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Location Search Modal */}
      {showLocationModal && (
        <div 
          ref={locationModalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add Location</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseLocationModal}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search cities, hospitals, clinics..."
                  value={locationSearchTerm}
                  onChange={(e) => setLocationSearchTerm(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredLocations.length > 0 ? (
                <div className="space-y-2">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{location.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {location.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">
                    {locationSearchTerm ? 'No locations found' : 'Start typing to search locations'}
                  </p>
                  {locationSearchTerm && (
                    <p className="text-xs text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;