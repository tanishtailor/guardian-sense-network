
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarTrigger />
        <div className="ml-4 flex items-center">
          <Link to="/" className="flex items-center">
            <div className="rounded-full bg-guardian-info p-1.5 mr-2">
              <div className="rounded-full bg-white p-1">
                <div className="rounded-full bg-guardian-info w-4 h-4"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-primary">Guardian Lens</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-guardian-emergency text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
