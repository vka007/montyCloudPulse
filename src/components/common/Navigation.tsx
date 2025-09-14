import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabValue } from '@/types/navigation';
import { SidebarLayout } from './SidebarLayout';
import { ProfessionalHeader } from './ProfessionalHeader';

interface NavigationProps {
  children: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabValue>('dashboard');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

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
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            availableAccounts={['all', 'prod-account', 'dev-account', 'staging-account']}
          />
        );
      case 'inventory':
        return (
          <ProfessionalHeader
            title="Resource Inventory"
            subtitle="Search, filter, and manage your cloud resources"
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            availableAccounts={['all', 'prod-account', 'dev-account', 'staging-account']}
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
