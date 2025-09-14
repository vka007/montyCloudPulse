import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNotificationStore } from '@/store/notificationStore';
import { NotificationService } from '@/services/notificationService';
import { useEnhancedResourceStore } from '@/store/enhancedResourceStore';

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { resources } = useEnhancedResourceStore();
  const { enqueueSnackbar } = useSnackbar();
  const [shownNotifications, setShownNotifications] = useState<Set<string>>(new Set());
  const notificationService = NotificationService.getInstance();

  // Start notification simulation when resources are available (only once)
  useEffect(() => {
    if (resources.length > 0) {
      // Stop any existing simulation first
      notificationService.stopSimulation();
      
      // Start the notification simulation (this will generate the first notification after 20-25 seconds)
      notificationService.startSimulation(resources);
    }
    
    return () => {
      // Don't stop simulation on unmount - let it continue across pages
    };
  }, [resources.length]); // Only depend on resources.length, not the entire resources array

  // Listen for new notifications and show snackbar alerts
  useEffect(() => {
    const unsubscribe = useNotificationStore.subscribe((state: any) => {
      const latestNotification = state.notifications[0];
      if (latestNotification && 
          !latestNotification.read && 
          !shownNotifications.has(latestNotification.id)) {
        
        // Mark this notification as shown
        setShownNotifications(prev => new Set(prev).add(latestNotification.id));
        
        // Show snackbar notification
        const severity = latestNotification.severity === 'critical' ? 'error' : 
                        latestNotification.severity === 'high' ? 'warning' : 'info';
        
        enqueueSnackbar(latestNotification.message, {
          variant: severity,
          autoHideDuration: 5000,
        });
      }
    });

    return unsubscribe;
  }, [enqueueSnackbar]);

  return <>{children}</>;
};
