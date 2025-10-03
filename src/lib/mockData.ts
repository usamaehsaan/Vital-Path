import { User, Job, Post, Connection } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    specialization: 'Cardiology',
    experience: 15,
    location: 'New York',
    hospital: 'Mount Sinai Hospital',
    bio: 'Senior Cardiologist with expertise in interventional cardiology and heart failure management.',
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@email.com',
    specialization: 'Emergency Medicine',
    experience: 8,
    location: 'Los Angeles',
    hospital: 'UCLA Medical Center',
    bio: 'Emergency physician passionate about trauma care and medical education.',
    isVerified: true,
    createdAt: '2024-02-01T14:30:00Z'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    specialization: 'Pediatrics',
    experience: 12,
    location: 'Chicago',
    hospital: 'Children\'s Hospital of Chicago',
    bio: 'Pediatric specialist focusing on childhood development and preventive care.',
    isVerified: true,
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@email.com',
    specialization: 'Orthopedic Surgery',
    experience: 20,
    location: 'Boston',
    hospital: 'Massachusetts General Hospital',
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
    hospital: 'St. Mary\'s Medical Center',
    location: 'San Francisco',
    specialization: 'Emergency Medicine',
    startDate: '2024-12-15',
    endDate: '2024-12-17',
    duration: '3 days',
    postedBy: '1',
    postedByName: 'Dr. Sarah Johnson',
    createdAt: '2024-12-01T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Pediatric Cardiologist - Full Time Position',
    description: 'Join our growing pediatric cardiology team. Excellent benefits, research opportunities, and collaborative environment.',
    type: 'full-time',
    hospital: 'Children\'s Heart Institute',
    location: 'Seattle',
    specialization: 'Pediatric Cardiology',
    postedBy: '4',
    postedByName: 'Dr. James Wilson',
    createdAt: '2024-11-28T14:20:00Z',
    isActive: true
  },
  {
    id: '3',
    title: 'Orthopedic Surgery Locum - Holiday Coverage',
    description: 'Need orthopedic surgeon for holiday coverage. Trauma call and elective cases. Competitive compensation.',
    type: 'locum',
    hospital: 'Regional Medical Center',
    location: 'Denver',
    specialization: 'Orthopedic Surgery',
    startDate: '2024-12-24',
    endDate: '2025-01-02',
    duration: '10 days',
    postedBy: '2',
    postedByName: 'Dr. Michael Chen',
    createdAt: '2024-11-30T09:30:00Z',
    isActive: true
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just published a new study on minimally invasive cardiac procedures. The results show 30% faster recovery times compared to traditional methods. Excited to share these findings with the medical community! #Cardiology #Innovation',
    category: 'professional-tips',
    authorId: '1',
    authorName: 'Dr. Sarah Johnson',
    authorSpecialization: 'Cardiology',
    createdAt: '2024-12-01T15:30:00Z',
    likes: 24,
    reshares: 8
  },
  {
    id: '2',
    content: 'Reminder for all EM docs: Always check for zebras, but don\'t forget the horses are still more common. Pattern recognition comes with experience, but never stop questioning your initial assessment. #EmergencyMedicine #MedicalTips',
    category: 'professional-tips',
    authorId: '2',
    authorName: 'Dr. Michael Chen',
    authorSpecialization: 'Emergency Medicine',
    createdAt: '2024-12-01T12:15:00Z',
    likes: 31,
    reshares: 12
  },
  {
    id: '3',
    content: 'Coffee count today: 6 cups ☕️ Sleep count: 4 hours 😴 Successful surgeries: 3 ✅ Sometimes being a doctor feels like being a superhero running on caffeine! #DoctorLife #Surgery',
    category: 'community',
    authorId: '4',
    authorName: 'Dr. James Wilson',
    authorSpecialization: 'Orthopedic Surgery',
    createdAt: '2024-12-01T08:45:00Z',
    likes: 45,
    reshares: 15
  },
  {
    id: '4',
    content: 'Working with children teaches you patience, creativity, and the importance of making medicine less scary. Today a 5-year-old told me I was "the nicest doctor ever" after I let her listen to her teddy bear\'s heartbeat. These moments make everything worthwhile. #Pediatrics #Inspiration',
    category: 'community',
    authorId: '3',
    authorName: 'Dr. Emily Rodriguez',
    authorSpecialization: 'Pediatrics',
    createdAt: '2024-11-30T16:20:00Z',
    likes: 38,
    reshares: 9
  }
];

export const mockConnections: Connection[] = [
  {
    id: '1',
    requesterId: '2',
    receiverId: '1',
    status: 'accepted',
    message: 'Hi Dr. Johnson, I\'d love to connect and discuss emergency cardiology protocols.',
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
    message: 'Hey Michael, great presentation at the conference last month!',
    createdAt: '2024-11-20T09:15:00Z'
  }
];

// Current user for demo purposes
export const currentUser: User = mockUsers[0]; // Dr. Sarah Johnson