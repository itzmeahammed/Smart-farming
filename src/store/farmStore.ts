import { create } from 'zustand';

interface Plot {
  id: string;
  name: string;
  area: number; // hectares
  soilType: 'loamy' | 'clay' | 'sandy' | 'silt';
  cropType?: string;
  plantedAt?: Date;
  expectedHarvest?: Date;
  growthStage: number; // 0-4
  health: number; // 0-100
  yieldPrediction?: number;
  tasks: Task[];
  alerts: Alert[];
}

interface Task {
  id: string;
  type: 'irrigation' | 'fertilizer' | 'pesticide' | 'harvest';
  title: string;
  description: string;
  scheduledAt: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface Alert {
  id: string;
  type: 'pest' | 'disease' | 'weather' | 'irrigation';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  createdAt: Date;
  resolved: boolean;
}

interface FarmState {
  plots: Plot[];
  selectedPlot: string | null;
  isSimulationRunning: boolean;
  simulationSpeed: number;
  addPlot: (plot: Omit<Plot, 'id' | 'tasks' | 'alerts'>) => void;
  updatePlot: (id: string, updates: Partial<Plot>) => void;
  selectPlot: (id: string | null) => void;
  addTask: (plotId: string, task: Omit<Task, 'id'>) => void;
  completeTask: (plotId: string, taskId: string) => void;
  addAlert: (plotId: string, alert: Omit<Alert, 'id'>) => void;
  resolveAlert: (plotId: string, alertId: string) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  setSimulationSpeed: (speed: number) => void;
}

export const useFarmStore = create<FarmState>((set, get) => ({
  plots: [
    {
      id: '1',
      name: 'North Field',
      area: 2.5,
      soilType: 'loamy',
      cropType: 'wheat',
      plantedAt: new Date('2024-03-15'),
      expectedHarvest: new Date('2024-07-15'),
      growthStage: 2,
      health: 85,
      yieldPrediction: 4.2,
      tasks: [
        {
          id: '1',
          type: 'irrigation',
          title: 'Morning Irrigation',
          description: 'Water the wheat field for 30 minutes',
          scheduledAt: new Date(),
          completed: false,
          priority: 'high'
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'pest',
          severity: 'warning',
          message: 'Aphid activity detected in sector B',
          createdAt: new Date(),
          resolved: false
        }
      ]
    },
    {
      id: '2',
      name: 'South Field',
      area: 1.8,
      soilType: 'clay',
      cropType: 'rice',
      plantedAt: new Date('2024-04-01'),
      expectedHarvest: new Date('2024-08-01'),
      growthStage: 1,
      health: 92,
      yieldPrediction: 3.8,
      tasks: [],
      alerts: []
    }
  ],
  selectedPlot: null,
  isSimulationRunning: false,
  simulationSpeed: 1,

  addPlot: (plotData) => {
    const newPlot: Plot = {
      ...plotData,
      id: Date.now().toString(),
      tasks: [],
      alerts: []
    };
    set(state => ({ plots: [...state.plots, newPlot] }));
  },

  updatePlot: (id, updates) => {
    set(state => ({
      plots: state.plots.map(plot => 
        plot.id === id ? { ...plot, ...updates } : plot
      )
    }));
  },

  selectPlot: (id) => {
    set({ selectedPlot: id });
  },

  addTask: (plotId, taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    
    set(state => ({
      plots: state.plots.map(plot =>
        plot.id === plotId 
          ? { ...plot, tasks: [...plot.tasks, newTask] }
          : plot
      )
    }));
  },

  completeTask: (plotId, taskId) => {
    set(state => ({
      plots: state.plots.map(plot =>
        plot.id === plotId
          ? {
              ...plot,
              tasks: plot.tasks.map(task =>
                task.id === taskId ? { ...task, completed: true } : task
              )
            }
          : plot
      )
    }));
  },

  addAlert: (plotId, alertData) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString()
    };
    
    set(state => ({
      plots: state.plots.map(plot =>
        plot.id === plotId 
          ? { ...plot, alerts: [...plot.alerts, newAlert] }
          : plot
      )
    }));
  },

  resolveAlert: (plotId, alertId) => {
    set(state => ({
      plots: state.plots.map(plot =>
        plot.id === plotId
          ? {
              ...plot,
              alerts: plot.alerts.map(alert =>
                alert.id === alertId ? { ...alert, resolved: true } : alert
              )
            }
          : plot
      )
    }));
  },

  startSimulation: () => {
    set({ isSimulationRunning: true });
  },

  stopSimulation: () => {
    set({ isSimulationRunning: false });
  },

  setSimulationSpeed: (speed) => {
    set({ simulationSpeed: speed });
  }
}));