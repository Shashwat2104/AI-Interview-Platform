'use client';

import {
  Briefcase,
  FileText,
  Heart,
  LayoutDashboard,
  MessageSquare,
  UserCog,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const adminMenu = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Jobs',
    url: '/dashboard/manage-jobs',
    icon: Briefcase,
  },
  {
    title: 'Candidates',
    url: '/dashboard/candidates',
    icon: Users,
  },
  {
    title: 'Recruiters',
    url: '/dashboard/recruiters',
    icon: UserCog,
  },
  {
    title: 'Wishlist',
    url: '/dashboard/wishlist',
    icon: Heart,
  },
  {
    title: 'Contact Submissions',
    url: '/dashboard/contact-submissions',
    icon: MessageSquare,
  },
];

const recruiterMenu = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Job Listing',
    url: '/dashboard/job-listing',
    icon: Briefcase,
  },
  {
    title: 'Job Applications',
    url: '/dashboard/job-applications',
    icon: FileText,
  },
];

const userMenu = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Jobs',
    url: '/dashboard/jobs',
    icon: Briefcase,
  },
  {
    title: 'Applications',
    url: '/dashboard/applications',
    icon: FileText,
  },
];

function isActive(pathname: string, url: string) {
  if (url === '/dashboard') return pathname === '/dashboard';
  return pathname === url || pathname.startsWith(`${url}/`);
}

export function NavMain() {
  const session = useSession();
  const user = session.data?.user;
  const role = user?.role;
  const pathname = usePathname();

  const menu = role === 'admin' ? adminMenu : role === 'recruiter' ? recruiterMenu : userMenu;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {menu.map((item) => {
            const active = isActive(pathname, item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                  <Link href={item.url} aria-current={active ? 'page' : undefined}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
