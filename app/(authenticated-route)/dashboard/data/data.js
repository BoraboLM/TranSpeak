import { BookA, FolderClock, LayoutDashboard, Users, MapPin, BookAudio  } from 'lucide-react';
export const data = [
    {   name: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard  size={32} className="mr-2"/>,
    },
    { 
        name: 'Users',
        path: '/dashboard/users',
        icon: <Users size={32} className="mr-2"/>,
    },
    { 
        name: 'Learn',
        path: '/dashboard/learn',
        icon: <BookA  size={32} className="mr-2"/>,
    },
    { 
        name: 'Places',
        path: '/dashboard/places',
        icon: <MapPin   size={32} className="mr-2"/>,
    },
    {
        name: 'Dictionary',
        path: '/dashboard/dictionary',
        icon: <BookAudio  size={32} className="mr-2"/>,
    },
    { 
        name: 'System Logs',
        path: '/dashboard/system-log',
        icon: <FolderClock  size={32} className="mr-2"/>,
    },
];