export interface User {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  location: string;
  hospital?: string;
  bio?: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  type: 'full-time' | 'locum';
  hospital: string;
  location: string;
  specialization: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  postedBy: string;
  postedByName: string;
  createdAt: string;
  isActive: boolean;
}

export interface Post {
  id: string;
  content: string;
  category: 'general' | 'tips' | 'career' | 'entertainment' | 'locum';
  authorId: string;
  authorName: string;
  authorSpecialization: string;
  createdAt: string;
  likes: number;
  reshares: number;
  isReshare?: boolean;
  originalPostId?: string;
  originalAuthor?: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  updatedAt: string;
}