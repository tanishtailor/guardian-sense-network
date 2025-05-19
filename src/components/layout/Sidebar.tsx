
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Shield, MapPin, MessageCircle, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Shield,
    },
    {
      title: 'Safety Map',
      url: '/map',
      icon: MapPin,
    },
    {
      title: 'Incident Reporting',
      url: '/report',
      icon: Plus,
    },
    {
      title: 'Emergency Chat',
      url: '/chat',
      icon: MessageCircle,
    },
    {
      title: 'Alerts',
      url: '/alerts',
      icon: Bell,
    },
  ];
  
  return (
    <SidebarUI>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild active={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button className="w-full emergency-button animate-pulse-emergency">
            EMERGENCY SOS
          </Button>
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
};

export default Sidebar;
