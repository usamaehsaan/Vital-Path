import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Users,
  TrendingUp,
  Calendar,
  Star,
  MapPin,
  ExternalLink,
  Image as ImageIcon,
  X,
  Camera,
  FileImage
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

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

// Mock news data
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
  }
];

// Simplified post categories
const postCategories = [
  'General',
  'Tips and Tricks', 
  'Career',
  'Locum',
  'Entertainment'
];

// Pakistan major cities
const pakistanCities = [
  { name: 'Karachi', province: 'Sindh' },
  { name: 'Lahore', province: 'Punjab' },
  { name: 'Islamabad', province: 'Federal Capital' },
  { name: 'Rawalpindi', province: 'Punjab' },
  { name: 'Faisalabad', province: 'Punjab' },
  { name: 'Multan', province: 'Punjab' },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa' },
  { name: 'Quetta', province: 'Balochistan' },
  { name: 'Sialkot', province: 'Punjab' },
  { name: 'Gujranwala', province: 'Punjab' },
  { name: 'Hyderabad', province: 'Sindh' },
  { name: 'Bahawalpur', province: 'Punjab' },
  { name: 'Sargodha', province: 'Punjab' },
  { name: 'Sukkur', province: 'Sindh' },
  { name: 'Larkana', province: 'Sindh' }
];

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [locationSearch, setLocationSearch] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [postContent]);

  const handleOpenPostModal = () => {
    setShowPostModal(true);
  };

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('Creating post:', {
        content: postContent,
        category: selectedCategory,
        location: selectedLocation,
        images: attachedImages
      });
      setPostContent('');
      setSelectedCategory('');
      setSelectedLocation('');
      setAttachedImages([]);
      setShowPostModal(false);
    }
  };

  const handleImageAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (city: { name: string; province: string }) => {
    setSelectedLocation(`${city.name}, ${city.province}`);
    setShowLocationModal(false);
    setLocationSearch('');
  };

  const filteredCities = pakistanCities.filter(city =>
    city.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
    city.province.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Left Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <div className="space-y-6">
              {/* User Profile Card */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{currentUser.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{currentUser.specialization}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{currentUser.hospital}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">42</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">156</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Connections</p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">8</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Communities</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Your Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-900 dark:text-white">Connections</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-900 dark:text-white">Profile Views</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">23</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Center Content - Posts Feed */}
        <div className="flex-1 max-w-2xl mx-auto space-y-6">
          {/* Create Post */}
          <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div 
                onClick={handleOpenPostModal}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-3 text-gray-500 dark:text-gray-400">
                    What's on your mind, {currentUser.name.split(' ')[0]}?
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <Card key={post.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.specialization}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="dark:hover:bg-gray-700">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                  
                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-blue-500">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-green-500">
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

        {/* Right Sidebar - Desktop */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <div className="space-y-6">
              {/* News & Updates */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2 text-gray-900 dark:text-white">
                    <TrendingUp className="w-5 h-5" />
                    <span>Latest Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4 px-4 pb-4 max-h-80 overflow-y-auto">
                    {mockNews.map((item) => (
                      <div key={item.id} className="border-b border-gray-100 dark:border-gray-600 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            item.type === 'news' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                {item.type === 'news' ? 'News' : 'Event'}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2 text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{item.summary}</p>
                            
                            {item.type === 'event' && (
                              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </div>
                            )}
                            
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs dark:hover:bg-gray-700">
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

              {/* Trending Topics */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2 text-gray-900 dark:text-white">
                    <Star className="w-5 h-5" />
                    <span>Trending Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {['#MedicalResearch', '#CardiacCare', '#EmergencyMedicine', '#HealthTech', '#MedicalEducation'].map((tag, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{tag}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 100) + 50} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create Post</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPostModal(false)}
                  className="dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentUser.specialization}</p>
                </div>
              </div>
              
              {/* Auto-expanding textarea */}
              <Textarea
                ref={textareaRef}
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value)}
                className="min-h-[60px] max-h-[200px] mb-4 border-none resize-none text-lg placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 focus:ring-0 focus:border-transparent"
                style={{ overflow: 'hidden' }}
              />

              {/* Category Selection */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {postCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedCategory === category 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Attached Images */}
              {attachedImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attached Images</p>
                  <div className="grid grid-cols-2 gap-2">
                    {attachedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <FileImage className="w-8 h-8 text-gray-400" />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Location Display */}
              {selectedLocation && (
                <div className="mb-4">
                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700 dark:text-blue-300">{selectedLocation}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLocation('')}
                      className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleImageAttachment}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  >
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLocationModal(true)}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPostModal(false)}
                    className="dark:border-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePost} 
                    disabled={!postContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Post
                  </Button>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Location Picker Modal - Higher z-index */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Location</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLocationModal(false)}
                  className="dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Search cities..."
                value={locationSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationSearch(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="overflow-y-auto max-h-96">
              {filteredCities.map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleLocationSelect(city)}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{city.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{city.province}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;