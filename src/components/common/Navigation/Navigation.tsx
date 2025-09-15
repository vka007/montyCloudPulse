import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabValue } from '@/types/navigation';
import { SidebarLayout } from '../SidebarLayout';
import { ApplicationHeader } from '../ApplicationHeader/ApplicationHeader';

interface NavigationProps {
  children: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabValue>('dashboard');

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveTab('dashboard');
    } else if (path === '/inventory') {
      setActiveTab('inventory');
    }
  }, [location.pathname]);

  const getHeaderContent = (tabValue: TabValue) => {
    switch (tabValue) {
      case 'dashboard':
        return (
          <ApplicationHeader
            title="Cloud Resources Dashboard"
            subtitle="Monitor and manage your cloud infrastructure in real-time"
          />
        );
      case 'inventory':
        return (
          <ApplicationHeader
            title="Resource Inventory"
            subtitle="Search, filter, and manage your cloud resources"
          />
        );
      default:
        return null;
    }
  };


  const handleTabChange = (tabId: string) => {
    const tabValue = tabId as TabValue;
    setActiveTab(tabValue);
    navigate(`/${tabValue}`);
  };

  return (
    <SidebarLayout
      headerContent={getHeaderContent(activeTab)}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {children}
    </SidebarLayout>
  );
};
