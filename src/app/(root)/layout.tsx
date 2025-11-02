import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Toaster } from 'sonner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
     <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            {children}
            <Toaster/>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;