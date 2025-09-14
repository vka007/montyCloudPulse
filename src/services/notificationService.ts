import { useNotificationStore } from '@/store/notificationStore';
import { EnhancedResource } from '@/data/enhancedMockData';

export class NotificationService {
  private static instance: NotificationService;
  private notificationStore = useNotificationStore.getState();
  private simulationInterval: number | null = null;
  private isSimulating = false;
  private hasInitialized = false;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Check for CPU spikes (only after initialization to avoid initial load notifications)
  checkCpuSpikes(resources: EnhancedResource[]): void {
    if (!this.hasInitialized) return; // Don't check spikes on initial load
    
    resources.forEach((resource) => {
      const cpuUsage = resource.metrics.cpu.current;
      
      if (cpuUsage > 90) {
        this.addCriticalNotification({
          type: 'cpu_spike',
          title: 'Critical CPU Usage',
          message: `${resource.name} CPU usage is at ${cpuUsage.toFixed(1)}%`,
          resourceId: resource.id,
          resourceName: resource.name,
          severity: 'critical',
        });
      } else if (cpuUsage > 80) {
        this.addHighNotification({
          type: 'cpu_spike',
          title: 'High CPU Usage',
          message: `${resource.name} CPU usage is at ${cpuUsage.toFixed(1)}%`,
          resourceId: resource.id,
          resourceName: resource.name,
          severity: 'high',
        });
      }
    });
  }

  // Check for memory spikes (only after initialization to avoid initial load notifications)
  checkMemorySpikes(resources: EnhancedResource[]): void {
    if (!this.hasInitialized) return; // Don't check spikes on initial load
    
    resources.forEach((resource) => {
      const memoryUsage = resource.metrics.memory.percentage;
      
      if (memoryUsage > 95) {
        this.addCriticalNotification({
          type: 'memory_spike',
          title: 'Critical Memory Usage',
          message: `${resource.name} memory usage is at ${memoryUsage.toFixed(1)}%`,
          resourceId: resource.id,
          resourceName: resource.name,
          severity: 'critical',
        });
      } else if (memoryUsage > 85) {
        this.addHighNotification({
          type: 'memory_spike',
          title: 'High Memory Usage',
          message: `${resource.name} memory usage is at ${memoryUsage.toFixed(1)}%`,
          resourceId: resource.id,
          resourceName: resource.name,
          severity: 'high',
        });
      }
    });
  }

  // Add critical notification
  private addCriticalNotification(notification: Omit<import('@/store/notificationStore').Notification, 'id' | 'timestamp' | 'read'>): void {
    this.notificationStore.addNotification(notification);
  }

  // Add high priority notification
  private addHighNotification(notification: Omit<import('@/store/notificationStore').Notification, 'id' | 'timestamp' | 'read'>): void {
    this.notificationStore.addNotification(notification);
  }

  // Start simulation of random notifications
  startSimulation(resources: EnhancedResource[]): void {
    // Always stop any existing simulation first
    this.stopSimulation();
    
    console.log('Starting notification simulation at:', new Date().toLocaleTimeString());
    this.isSimulating = true;
    this.hasInitialized = true;
    
    // Schedule the first notification after a random delay
    this.simulationInterval = setTimeout(() => {
      this.generateRandomNotification(resources);
    }, this.getRandomInterval());
  }

  // Stop simulation
  stopSimulation(): void {
    if (this.simulationInterval) {
      console.log('Stopping notification simulation at:', new Date().toLocaleTimeString());
      clearTimeout(this.simulationInterval);
      this.simulationInterval = null;
    }
    this.isSimulating = false;
  }

  // Generate random notification
  private generateRandomNotification(resources: EnhancedResource[]): void {
    if (resources.length === 0) return;
    
    // Debug log to track notification generation
    console.log('Generating notification at:', new Date().toLocaleTimeString());

    const randomResource = resources[Math.floor(Math.random() * resources.length)];
    const notificationTypes = ['cpu_spike', 'memory_spike', 'warning', 'info'];
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)] as any;

    const notifications: Record<string, { title: string; message: string; severity: 'low' | 'medium' | 'high' | 'critical' }> = {
      cpu_spike: {
        title: 'CPU Usage Alert',
        message: `${randomResource.name} CPU usage is at ${(Math.random() * 30 + 70).toFixed(1)}%`,
        severity: 'high',
      },
      memory_spike: {
        title: 'Memory Usage Alert',
        message: `${randomResource.name} memory usage is at ${(Math.random() * 20 + 80).toFixed(1)}%`,
        severity: 'high',
      },
      warning: {
        title: 'System Warning',
        message: `${randomResource.name} is experiencing high load`,
        severity: 'medium',
      },
      info: {
        title: 'System Update',
        message: `${randomResource.name} has been updated successfully`,
        severity: 'low',
      },
    };

    const notification = notifications[randomType];
    
    this.notificationStore.addNotification({
      type: randomType,
      title: notification.title,
      message: notification.message,
      resourceId: randomResource.id,
      resourceName: randomResource.name,
      severity: notification.severity,
    });

    // Schedule next notification only if still simulating
    if (this.isSimulating) {
      this.simulationInterval = setTimeout(() => {
        this.generateRandomNotification(resources);
      }, this.getRandomInterval());
    }
  }

  // Get random interval between 20-25 seconds
  private getRandomInterval(): number {
    return Math.floor(Math.random() * 5000) + 20000; // 20-25 seconds
  }

  // Check all resources for spikes
  checkAllResources(resources: EnhancedResource[]): void {
    this.checkCpuSpikes(resources);
    this.checkMemorySpikes(resources);
  }
}
