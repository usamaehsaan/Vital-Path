import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share,
  MoreHorizontal,
  Verified
} from 'lucide-react';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onReshare?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

const PostCard = ({ post, onLike, onReshare, onComment }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isReshared, setIsReshared] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(post.id);
  };

  const handleReshare = () => {
    setIsReshared(!isReshared);
    onReshare?.(post.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general':
        return 'bg-gray-100 text-gray-800';
      case 'tips':
        return 'bg-blue-100 text-blue-800';
      case 'career':
        return 'bg-green-100 text-green-800';
      case 'entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'locum':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general':
        return 'General';
      case 'tips':
        return 'Tips';
      case 'career':
        return 'Career';
      case 'entertainment':
        return 'Entertainment';
      case 'locum':
        return 'Locum';
      default:
        return 'General';
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {post.authorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                <Verified className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">{post.authorSpecialization}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={getCategoryColor(post.category)}>
                  {getCategoryLabel(post.category)}
                </Badge>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {post.isReshare && (
          <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
            <Repeat2 className="w-4 h-4" />
            <span>Reshared from {post.originalAuthor}</span>
          </div>
        )}
        
        <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>

        {/* Engagement Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(post.id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Comment</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReshare}
              className={`flex items-center space-x-2 ${
                isReshared ? 'text-green-600 hover:text-green-700' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Repeat2 className="w-4 h-4" />
              <span className="text-sm">{post.reshares + (isReshared ? 1 : 0)}</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;