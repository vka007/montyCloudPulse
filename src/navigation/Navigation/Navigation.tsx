import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabValue } from '@/types/navigation';
import { SidebarLayout } from '../../components/common/SidebarLayout';
import { ModernHeader } from '../../components/common/ModernHeader/ModernHeader';

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

  const getHeaderContent = () => {
    return <ModernHeader />;
  };


  const handleTabChange = (tabId: string) => {
    const tabValue = tabId as TabValue;
    setActiveTab(tabValue);
    navigate(`/${tabValue}`);
  };

  return (
    <SidebarLayout
      headerContent={getHeaderContent()}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      noPadding={activeTab === 'dashboard'}
    >
      {children}
    </SidebarLayout>
  );
};
