import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabValue } from '@/types/navigation';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { ResourceTable } from '@/components/inventory/ResourceTable';
import { SidebarLayout } from './SidebarLayout';
import { ProfessionalHeader } from './ProfessionalHeader';

export const Navigation: React.FC = () => {
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
          <ProfessionalHeader
            title="Cloud Resources Dashboard"
            subtitle="Monitor and manage your cloud infrastructure in real-time"
            showControls={true}
          />
        );
      case 'inventory':
        return (
          <ProfessionalHeader
            title="Resource Inventory"
            subtitle="Search, filter, and manage your cloud resources"
            showControls={false}
          />
        );
      default:
        return null;
    }
  };

  const getTabContent = (tabValue: TabValue) => {
    switch (tabValue) {
      case 'dashboard':
        return <DashboardGrid />;
      case 'inventory':
        return <ResourceTable />;
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
      {getTabContent(activeTab)}
    </SidebarLayout>
  );
};
