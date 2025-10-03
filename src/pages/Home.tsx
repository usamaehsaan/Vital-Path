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
  ArrowRight
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';

const Home = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Mock user stats
  const userStats = {
    posts: 42,
    connections: 156,
    communities: 8
  };

  // Mock communities data
  const joinedCommunities = [
    { id: 1, name: 'Cardiology Network', members: 2340, avatar: 'CN' },
    { id: 2, name: 'Emergency Medicine', members: 1890, avatar: 'EM' },
    { id: 3, name: 'Medical Research', members: 3200, avatar: 'MR' }
  ];

  const suggestedCommunities = [
    { id: 4, name: 'Surgical Innovations', members: 1560, avatar: 'SI' },
    { id: 5, name: 'Telemedicine Hub', members: 980, avatar: 'TH' }
  ];

  // Enhanced mock posts data
  const posts = [
    {
      id: 1,
      category: 'Medical Research',
      location: 'Johns Hopkins Hospital, Baltimore',
      author: {
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        avatar: 'SJ'
      },
      timeAgo: '2 hours ago',
      content: 'Excited to share our latest research findings on minimally invasive cardiac procedures. The results show a 40% reduction in recovery time for patients.',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      category: 'Clinical Case',
      location: 'Mayo Clinic, Rochester',
      author: {
        name: 'Dr. Michael Chen',
        specialization: 'Neurologist',
        avatar: 'MC'
      },
      timeAgo: '4 hours ago',
      content: 'Interesting case study: 45-year-old patient with rare neurological condition. Collaborative approach with our multidisciplinary team led to successful treatment.',
      likes: 18,
      comments: 12,
      shares: 5
    },
    {
      id: 3,
      category: 'Medical Education',
      location: null,
      author: {
        name: 'Dr. Emily Davis',
        specialization: 'Emergency Medicine',
        avatar: 'ED'
      },
      timeAgo: '6 hours ago',
      content: 'Teaching medical students about emergency protocols today. Their enthusiasm and quick learning remind me why I love being an educator.',
      likes: 31,
      comments: 15,
      shares: 7
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Medical Research': 'bg-blue-100 text-blue-800',
      'Clinical Case': 'bg-green-100 text-green-800',
      'Medical Education': 'bg-purple-100 text-purple-800',
      'Healthcare Innovation': 'bg-orange-100 text-orange-800',
      'Community Health': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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

  const handlePublishPost = () => {
    if (postContent.trim()) {
      // Handle post publishing logic here
      console.log('Publishing post:', { content: postContent, category: postCategory, location: postLocation });
      setPostContent('');
      setPostCategory('');
      setPostLocation('');
      setIsPostModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsPostModalOpen(false);
  };

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
          className="bg-white rounded-lg border border-gray-200 p-3 mb-6 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => setIsPostModalOpen(true)}
        >
          <div className="flex items-center space-x-3">
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
                  <p>Dr. Wilson liked your post</p>
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
                <p className="font-medium text-blue-600">#CardiacSurgery</p>
                <p className="text-gray-500">1,234 posts</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-600">#MedicalEducation</p>
                <p className="text-gray-500">856 posts</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-600">#Telemedicine</p>
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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

                <Textarea
                  placeholder="What's on your mind? Share your medical insights..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px] mb-4 text-base resize-none"
                  autoFocus
                />

                <div className="flex items-center space-x-4 mb-6">
                  <Select value={postCategory} onValueChange={setPostCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Research">Medical Research</SelectItem>
                      <SelectItem value="Clinical Case">Clinical Case</SelectItem>
                      <SelectItem value="Medical Education">Medical Education</SelectItem>
                      <SelectItem value="Healthcare Innovation">Healthcare Innovation</SelectItem>
                      <SelectItem value="Community Health">Community Health</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2 flex-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Add location (optional)"
                      value={postLocation}
                      onChange={(e) => setPostLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
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