import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  MapPin,
  MoreHorizontal,
  Menu,
  X,
  Info,
  TrendingUp,
  Users,
  Briefcase,
  Bell,
  Activity,
  Building2,
  FileText,
  UserCheck,
  Globe,
  ArrowRight,
  Search,
  Pin,
  PinOff,
  Image,
  Trash2
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';

const Home = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General'); // Default to General
  const [postLocation, setPostLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [pinnedLocations, setPinnedLocations] = useState<Set<string>>(new Set(['Aga Khan University Hospital, Karachi', 'Shaukat Khanum Memorial Hospital, Lahore']));

  // Mock Pakistani locations data
  const mockLocations = [
    'Aga Khan University Hospital, Karachi',
    'Shaukat Khanum Memorial Hospital, Lahore',
    'Pakistan Institute of Medical Sciences, Islamabad',
    'Combined Military Hospital, Rawalpindi',
    'Jinnah Postgraduate Medical Centre, Karachi',
    'King Edward Medical University, Lahore',
    'Liaquat National Hospital, Karachi',
    'Services Hospital, Lahore',
    'Holy Family Hospital, Rawalpindi',
    'Nishtar Medical University, Multan',
    'Lady Reading Hospital, Peshawar',
    'Sandeman Provincial Hospital, Quetta',
    'Faisalabad Institute of Cardiology, Faisalabad',
    'Children Hospital, Lahore',
    'Civil Hospital, Karachi'
  ];

  const filteredLocations = mockLocations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Mock user stats
  const userStats = {
    posts: 42,
    connections: 156,
    communities: 8
  };

  // Mock communities data
  const joinedCommunities = [
    { id: 1, name: 'Cardiology Network Pakistan', members: 2340, avatar: 'CN' },
    { id: 2, name: 'Emergency Medicine Pakistan', members: 1890, avatar: 'EM' },
    { id: 3, name: 'Medical Research Pakistan', members: 3200, avatar: 'MR' }
  ];

  const suggestedCommunities = [
    { id: 4, name: 'Surgical Innovations Pakistan', members: 1560, avatar: 'SI' },
    { id: 5, name: 'Telemedicine Hub Pakistan', members: 980, avatar: 'TH' }
  ];

  // Enhanced mock posts data with Pakistani names and locations
  const posts = [
    {
      id: 1,
      category: 'Tips',
      location: 'Aga Khan University Hospital, Karachi',
      author: {
        name: 'Dr. Ahmed Khan',
        specialization: 'Cardiologist',
        avatar: 'AK'
      },
      timeAgo: '2 hours ago',
      content: 'Pro tip for young doctors: Always double-check medication dosages and never hesitate to ask senior colleagues for guidance. Patient safety comes first, and there\'s no shame in seeking clarification.',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      category: 'Career',
      location: 'Shaukat Khanum Memorial Hospital, Lahore',
      author: {
        name: 'Dr. Fatima Sheikh',
        specialization: 'Neurologist',
        avatar: 'FS'
      },
      timeAgo: '4 hours ago',
      content: 'Just completed my fellowship application process! For those considering specialization, start early and build strong relationships with mentors. The journey is challenging but incredibly rewarding.',
      likes: 18,
      comments: 12,
      shares: 5
    },
    {
      id: 3,
      category: 'Entertainment',
      location: null,
      author: {
        name: 'Dr. Hassan Ali',
        specialization: 'Emergency Medicine',
        avatar: 'HA'
      },
      timeAgo: '6 hours ago',
      content: 'When a patient asks if laughter is the best medicine... I tell them it\'s definitely in the top 10, right after actual medicine! 😄 Sometimes humor really does help with healing.',
      likes: 31,
      comments: 15,
      shares: 7
    },
    {
      id: 4,
      category: 'Locum',
      location: 'Combined Military Hospital, Rawalpindi',
      author: {
        name: 'Dr. Ayesha Malik',
        specialization: 'Orthopedic Surgery',
        avatar: 'AM'
      },
      timeAgo: '8 hours ago',
      content: 'Just finished a fantastic 2-week locum assignment in Rawalpindi. Great team, excellent facilities, and the experience of working in different environments really broadens your perspective as a physician.',
      likes: 12,
      comments: 6,
      shares: 2
    },
    {
      id: 5,
      category: 'General',
      location: 'Services Hospital, Lahore',
      author: {
        name: 'Dr. Muhammad Usman',
        specialization: 'Family Medicine',
        avatar: 'MU'
      },
      timeAgo: '10 hours ago',
      content: 'Reflecting on why I chose medicine today. Every patient interaction reminds me of the privilege and responsibility we have as healthcare providers. Grateful for this calling.',
      likes: 28,
      comments: 9,
      shares: 4
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'General':
        return 'bg-gray-100 text-gray-800';
      case 'Tips':
        return 'bg-blue-100 text-blue-800';
      case 'Career':
        return 'bg-green-100 text-green-800';
      case 'Entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'Locum':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
      }
    }
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePublishPost = () => {
    if (postContent.trim()) {
      // Handle post publishing logic here
      console.log('Publishing post:', { 
        content: postContent, 
        category: postCategory, 
        location: postLocation,
        image: selectedImage 
      });
      setPostContent('');
      setPostCategory('General'); // Reset to General after publishing
      setPostLocation('');
      setSelectedImage(null); // Reset image
      setIsPostModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsPostModalOpen(false);
    // Reset form when closing
    setPostContent('');
    setPostCategory('General');
    setPostLocation('');
    setSelectedImage(null);
  };

  const handleLocationSelect = (location: string) => {
    setPostLocation(location);
    setIsLocationModalOpen(false);
    setLocationSearch('');
  };

  const handlePinLocation = (location: string) => {
    setPinnedLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(location)) {
        newSet.delete(location);
      } else {
        newSet.add(location);
      }
      return newSet;
    });
  };

  const pinnedLocationsList = Array.from(pinnedLocations);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Triggers */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLeftSidebarOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <div className="lg:hidden fixed top-20 right-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRightSidebarOpen(true)}
          className="bg-white shadow-md"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* Left Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out ${
        leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 pt-20 lg:pt-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Profile & Communities</h2>
            <Button variant="ghost" size="sm" onClick={() => setLeftSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Info Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{currentUser.name}</h3>
                  <p className="text-sm text-gray-600">{currentUser.specialization}</p>
                  {currentUser.hospital && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{currentUser.hospital}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">{userStats.posts}</span>
                  </div>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <UserCheck className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-900">{userStats.connections}</span>
                  </div>
                  <p className="text-xs text-gray-500">Connections</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-gray-900">{userStats.communities}</span>
                  </div>
                  <p className="text-xs text-gray-500">Communities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communities Card */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>My Communities</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {joinedCommunities.map((community) => (
                <div key={community.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                      {community.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{community.name}</p>
                    <p className="text-xs text-gray-500">{community.members.toLocaleString()} members</p>
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Suggested Communities</p>
                {suggestedCommunities.map((community) => (
                  <div key={community.id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                          {community.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{community.name}</p>
                        <p className="text-xs text-gray-500">{community.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6">
                      Join
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="w-full justify-between text-blue-600 hover:text-blue-700">
                <span>Explore More Communities</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto p-4 pt-18 lg:pt-6">
        {/* Compact Post Creation Bar */}
        <div 
          className="bg-white rounded-lg border border-gray-200 px-6 py-4 mb-6 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => setIsPostModalOpen(true)}
        >
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-500">
              What's on your mind? Share your medical insights...
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.author.specialization}</p>
                      <p className="text-xs text-gray-400">{post.timeAgo}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs font-medium px-2 py-1 ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    {post.location && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{post.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pb-3 border-b">
                  <span>{post.likes} likes</span>
                  <div className="flex space-x-4">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 ${
                        likedPosts.has(post.id) ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span>Like</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comment</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(post.id)}
                    className={`${
                      savedPosts.has(post.id) ? 'text-blue-600 hover:text-blue-700' : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`fixed lg:static inset-y-0 right-0 z-50 w-80 bg-white border-l transform transition-transform duration-300 ease-in-out ${
        rightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 pt-20 lg:pt-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Activity & Trends</h2>
            <Button variant="ghost" size="sm" onClick={() => setRightSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Recent Activity - Now First */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-semibold flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Recent Activity</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <Bell className="w-4 h-4 text-blue-600 mt-1" />
                <div className="text-sm">
                  <p>Dr. Hassan liked your post</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-green-600 mt-1" />
                <div className="text-sm">
                  <p>New connection request</p>
                  <p className="text-gray-500 text-xs">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Briefcase className="w-4 h-4 text-orange-600 mt-1" />
                <div className="text-sm">
                  <p>New job posting in your area</p>
                  <p className="text-gray-500 text-xs">6 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics - Now Second */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Topics</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-blue-600">#CardiacSurgeryPK</p>
                <p className="text-gray-500">1,234 posts</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-600">#MedicalEducationPK</p>
                <p className="text-gray-500">856 posts</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-600">#TelemedicinePK</p>
                <p className="text-gray-500">642 posts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Post Creation Modal */}
      {isPostModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[120]"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseModal}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{currentUser.name}</h3>
                    <p className="text-sm text-gray-500">{currentUser.specialization}</p>
                  </div>
                </div>

                {/* Auto-expanding Textarea */}
                <div className="mb-4">
                  <Textarea
                    placeholder="What's on your mind? Share your medical insights..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="text-base border-none shadow-none px-3 py-2 text-gray-900 placeholder-gray-500 focus-visible:ring-0 resize-none min-h-[60px]"
                    autoFocus
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <Select value={postCategory} onValueChange={setPostCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="z-[140]">
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Tips">Tips</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Locum">Locum</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center space-x-2 flex-1 justify-start"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 truncate">
                      {postLocation || 'Add location'}
                    </span>
                  </Button>
                </div>

                {/* Single Image Preview Section - Only show when image is selected */}
                {selectedImage && (
                  <div className="mb-4">
                    <div className="relative group max-w-sm">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Bottom Action Row with Add/Change Image, Cancel, and Publish Post */}
                <div className="flex justify-between items-center">
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center space-x-2 cursor-pointer"
                        asChild
                      >
                        <span>
                          <Image className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">
                            {selectedImage ? 'Change Image' : 'Add Image'}
                          </span>
                        </span>
                      </Button>
                    </label>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handlePublishPost}
                      disabled={!postContent.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Publish Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Location Selection Modal */}
      {isLocationModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[140]"
            onClick={() => setIsLocationModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Add Location</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLocationModalOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>

                {/* Pinned Locations */}
                {pinnedLocationsList.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                      <Pin className="w-4 h-4" />
                      <span>Pinned Locations</span>
                    </h3>
                    <div className="space-y-1">
                      {pinnedLocationsList.map((location) => (
                        <div
                          key={location}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <div className="flex items-center space-x-2 flex-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900 truncate">{location}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePinLocation(location);
                            }}
                            className="h-8 w-8 p-0 text-blue-600"
                          >
                            <PinOff className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                <div className="max-h-64 overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {locationSearch ? 'Search Results' : 'All Locations'}
                  </h3>
                  <div className="space-y-1">
                    {filteredLocations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900 truncate">{location}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinLocation(location);
                          }}
                          className={`h-8 w-8 p-0 ${
                            pinnedLocations.has(location) ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        >
                          {pinnedLocations.has(location) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {filteredLocations.length === 0 && locationSearch && (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No locations found</p>
                    <p className="text-sm text-gray-400">Try a different search term</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Overlay */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;