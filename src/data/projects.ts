export interface Project {
  id: number;
  type: string;
  name: string;
  description: string;
  url: string;
  restrictedOnMobile: boolean;
  videoUrl: string;
  imageUrl: string;
  fallbackImage: string;
  techStack: string[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    type: 'Ticket Booking',
    name: 'Epic Show 2.0',
    description: 'Developed a New gen fully responsive booking web application with real-time interactions, enabling users to browse movies, sports, events, view showtimes, select seats, and book tickets seamlessly across devices, all within a smooth and intuitive UI/UX.',
    url: 'https://epicshow.vercel.app/',
    restrictedOnMobile: false,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    imageUrl: '/Image/EpicShow.png',
    fallbackImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85',
    techStack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    highlights: ['Real-time seat booking', 'Multi-category events', 'Responsive design'],
  },
  {
    id: 2,
    type: 'Ticket Booking',
    name: 'Get Epic Show',
    description: 'Developed a booking web application with real-time interactions, enabling users to browse movies, view showtimes, select seats, and book tickets seamlessly across devices, all within a smooth and intuitive UI/UX.',
    url: 'https://getepicshow.vercel.app/',
    restrictedOnMobile: false,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    imageUrl: '/Image/GetEpicShow.png',
    fallbackImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=85',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
    highlights: ['Showtime browsing', 'Seat selection', 'Seamless UX'],
  },
  {
    id: 3,
    type: 'Food Delivery',
    name: 'Dining and Delivery',
    description: "Developed 'Dining and Delivery', a responsive web platform that simplifies food ordering and table reservations with features like real-time order tracking, dynamic table booking, and intuitive navigation, enhancing customer experience and restaurant efficiency across all devices.",
    url: 'https://dininganddelivery.vercel.app',
    restrictedOnMobile: false,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageUrl: '/Image/DiningAndDelivery.png',
    fallbackImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS'],
    highlights: ['Order tracking', 'Table reservations', 'Multi-device support'],
  },
  {
    id: 4,
    type: 'Admin Dashboard',
    name: 'Dashboard for Dining and Delivery',
    description: 'Built a desktop dashboard application for real-time sales monitoring, order management, table bookings, and customer tracking - streamlining restaurant operations by centralizing core functions into a single platform to enhance efficiency and support informed decision-making.',
    url: 'https://dashboarddesktop.vercel.app',
    restrictedOnMobile: true,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    imageUrl: '/Image/AdminDashboard.png',
    fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    highlights: ['Sales analytics', 'Order management', 'Real-time monitoring'],
  },
  {
    id: 5,
    type: 'E-Commerce',
    name: 'Silk Street Shop',
    description: 'Developed a sophisticated web-based platform focused on delivering a seamless and engaging shopping experience for users. Implemented robust features with an intuitive UI/UX, ensuring ease of navigation and high user satisfaction across devices.',
    url: 'https://silkstreetshop.vercel.app',
    restrictedOnMobile: true,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    imageUrl: '/Image/SilkStreetShop.png',
    fallbackImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    highlights: ['Product catalog', 'Cart & checkout', 'Responsive design'],
  },
];
