import { User, Job, Post, Connection } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Khan',
    email: 'ahmed.khan@email.com',
    specialization: 'Cardiology',
    experience: 15,
    location: 'Karachi',
    hospital: 'Aga Khan University Hospital',
    bio: 'Senior Cardiologist with expertise in interventional cardiology and heart failure management.',
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Dr. Fatima Sheikh',
    email: 'fatima.sheikh@email.com',
    specialization: 'Emergency Medicine',
    experience: 8,
    location: 'Lahore',
    hospital: 'Shaukat Khanum Memorial Hospital',
    bio: 'Emergency physician passionate about trauma care and medical education.',
    isVerified: true,
    createdAt: '2024-02-01T14:30:00Z'
  },
  {
    id: '3',
    name: 'Dr. Hassan Ali',
    email: 'hassan.ali@email.com',
    specialization: 'Pediatrics',
    experience: 12,
    location: 'Islamabad',
    hospital: 'Pakistan Institute of Medical Sciences',
    bio: 'Pediatric specialist focusing on childhood development and preventive care.',
    isVerified: true,
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '4',
    name: 'Dr. Ayesha Malik',
    email: 'ayesha.malik@email.com',
    specialization: 'Orthopedic Surgery',
    experience: 20,
    location: 'Rawalpindi',
    hospital: 'Combined Military Hospital',
    bio: 'Orthopedic surgeon specializing in sports medicine and joint replacement.',
    isVerified: true,
    createdAt: '2024-01-10T16:45:00Z'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Emergency Medicine Locum - Weekend Coverage',
    description: 'Seeking experienced EM physician for weekend coverage. 12-hour shifts, well-equipped ED with 40 beds.',
    type: 'locum',
    hospital: 'Jinnah Postgraduate Medical Centre',
    location: 'Karachi',
    specialization: 'Emergency Medicine',
    startDate: '2024-12-15',
    endDate: '2024-12-17',
    duration: '3 days',
    postedBy: '1',
    postedByName: 'Dr. Ahmed Khan',
    createdAt: '2024-12-01T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Pediatric Cardiologist - Full Time Position',
    description: 'Join our growing pediatric cardiology team. Excellent benefits, research opportunities, and collaborative environment.',
    type: 'full-time',
    hospital: 'Children Hospital Lahore',
    location: 'Lahore',
    specialization: 'Pediatric Cardiology',
    postedBy: '4',
    postedByName: 'Dr. Ayesha Malik',
    createdAt: '2024-11-28T14:20:00Z',
    isActive: true
  },
  {
    id: '3',
    title: 'Orthopedic Surgery Locum - Holiday Coverage',
    description: 'Need orthopedic surgeon for holiday coverage. Trauma call and elective cases. Competitive compensation.',
    type: 'locum',
    hospital: 'Holy Family Hospital',
    location: 'Rawalpindi',
    specialization: 'Orthopedic Surgery',
    startDate: '2024-12-24',
    endDate: '2025-01-02',
    duration: '10 days',
    postedBy: '2',
    postedByName: 'Dr. Fatima Sheikh',
    createdAt: '2024-11-30T09:30:00Z',
    isActive: true
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Pro tip for young doctors: Always double-check medication dosages and never hesitate to ask senior colleagues for guidance. Patient safety comes first, and there\'s no shame in seeking clarification.',
    category: 'tips',
    authorId: '1',
    authorName: 'Dr. Ahmed Khan',
    authorSpecialization: 'Cardiology',
    createdAt: '2024-12-01T15:30:00Z',
    likes: 24,
    reshares: 8
  },
  {
    id: '2',
    content: 'Just completed my fellowship application process! For those considering specialization, start early and build strong relationships with mentors. The journey is challenging but incredibly rewarding.',
    category: 'career',
    authorId: '2',
    authorName: 'Dr. Fatima Sheikh',
    authorSpecialization: 'Emergency Medicine',
    createdAt: '2024-12-01T12:15:00Z',
    likes: 31,
    reshares: 12
  },
  {
    id: '3',
    content: 'When a patient asks if laughter is the best medicine... I tell them it\'s definitely in the top 10, right after actual medicine! 😄 Sometimes humor really does help with healing.',
    category: 'entertainment',
    authorId: '4',
    authorName: 'Dr. Ayesha Malik',
    authorSpecialization: 'Orthopedic Surgery',
    createdAt: '2024-12-01T08:45:00Z',
    likes: 45,
    reshares: 15
  },
  {
    id: '4',
    content: 'Just finished a fantastic 2-week locum assignment in Rawalpindi. Great team, excellent facilities, and the experience of working in different environments really broadens your perspective as a physician.',
    category: 'locum',
    authorId: '3',
    authorName: 'Dr. Hassan Ali',
    authorSpecialization: 'Pediatrics',
    createdAt: '2024-11-30T16:20:00Z',
    likes: 38,
    reshares: 9
  },
  {
    id: '5',
    content: 'Reflecting on why I chose medicine today. Every patient interaction reminds me of the privilege and responsibility we have as healthcare providers. Grateful for this calling.',
    category: 'general',
    authorId: '1',
    authorName: 'Dr. Ahmed Khan',
    authorSpecialization: 'Cardiology',
    createdAt: '2024-11-30T14:10:00Z',
    likes: 28,
    reshares: 6
  }
];

export const mockConnections: Connection[] = [
  {
    id: '1',
    requesterId: '2',
    receiverId: '1',
    status: 'accepted',
    message: 'Hi Dr. Khan, I\'d love to connect and discuss emergency cardiology protocols.',
    createdAt: '2024-11-25T10:00:00Z'
  },
  {
    id: '2',
    requesterId: '3',
    receiverId: '1',
    status: 'pending',
    message: 'Hello! I\'m interested in pediatric cardiology and would appreciate connecting with you.',
    createdAt: '2024-11-28T14:30:00Z'
  },
  {
    id: '3',
    requesterId: '4',
    receiverId: '2',
    status: 'accepted',
    message: 'Hey Fatima, great presentation at the conference last month!',
    createdAt: '2024-11-20T09:15:00Z'
  }
];

// Current user for demo purposes
export const currentUser: User = mockUsers[0]; // Dr. Ahmed Khan