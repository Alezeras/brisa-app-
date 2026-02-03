import { create } from 'zustand';
import { companyService, CompanyDTO } from '../services/api'; 

export interface Activity {
  id: string | number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  type?: string;
  color?: string;
}

export interface Client {
  id: string | number;
  name: string;
  email?: string;
  phone?: string;
  projects?: number;
  hours?: number;
  favorite?: boolean;
}

interface AppState {
  darkMode: boolean;
  fontSize: number;
  currentUser: { name: string; email: string } | null;

  activities: Activity[];
  isRunning: boolean;
  timerSeconds: number;
  timerInterval: ReturnType<typeof setInterval> | null;

  clients: Client[];
  isLoadingClients: boolean;

  toggleDarkMode: () => void;
  cycleFontSize: () => void;
  login: (email: string) => void;
  logout: () => void;

  startTimer: () => void;
  stopTimer: () => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;

  fetchClients: () => Promise<void>;
  addClient: (clientData: CompanyDTO) => Promise<boolean>;
  toggleClientFavorite: (id: string | number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  darkMode: false,
  fontSize: 14,
  currentUser: null,
  
  activities: [], 
  isRunning: false,
  timerSeconds: 0,
  timerInterval: null,

  clients: [],
  isLoadingClients: false,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  cycleFontSize: () => set((state) => ({ 
    fontSize: state.fontSize === 14 ? 16 : state.fontSize === 16 ? 18 : 14 
  })),

  login: (email) => set({ currentUser: { name: 'Usuário', email } }),
  
  logout: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    
    set({ 
      currentUser: null, 
      isRunning: false, 
      timerSeconds: 0, 
      timerInterval: null 
    });
  },

startTimer: () => {
  const { isRunning } = get();
  if (isRunning) return;

  const interval: number = window.setInterval(() => {
    set((state) => ({ timerSeconds: state.timerSeconds + 1 }));
  }, 1000);

  set({ isRunning: true, timerInterval: interval });
},

  stopTimer: () => {
    const { timerInterval, timerSeconds, activities } = get();
    if (timerInterval) clearInterval(timerInterval);

    if (timerSeconds > 0) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR'); // DD/MM/AAAA
        
        const endTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const startTimeMs = now.getTime() - (timerSeconds * 1000);
        const startTimeStr = new Date(startTimeMs).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const newActivity: Activity = {
            id: Math.random().toString(), 
            title: 'Sessão Cronometrada', 
            date: dateStr,
            startTime: startTimeStr,
            endTime: endTimeStr,
            duration: timerSeconds,
            type: 'Timer',
            color: '#193CB8'
        };

        set({ 
            isRunning: false, 
            timerInterval: null,
            timerSeconds: 0, 
            activities: [newActivity, ...activities] 
        });
    } else {
        set({ isRunning: false, timerInterval: null });
    }
  },

  addActivity: (newActivity) => set((state) => ({
    activities: [
      { id: Math.random().toString(), ...newActivity },
      ...state.activities
    ]
  })),

  fetchClients: async () => {
    set({ isLoadingClients: true });
    try {
      const data = await companyService.list();
      
      const mappedClients: Client[] = data.map((item: any) => ({
        id: item.id || item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        projects: 0,
        hours: 0,
        favorite: false
      }));

      set({ clients: mappedClients });
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      set({ isLoadingClients: false });
    }
  },

  addClient: async (clientData) => {
    try {
      const newCompany = await companyService.create(clientData);
      
      const newClientFormatted: Client = {
        id: newCompany.id || newCompany._id || Math.random(),
        name: newCompany.name || clientData.name,
        email: newCompany.email || clientData.email,
        phone: newCompany.phone || clientData.phone,
        projects: 0,
        hours: 0,
        favorite: false
      };

      set((state) => ({ clients: [...state.clients, newClientFormatted] }));
      return true;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return false;
    }
  },

  toggleClientFavorite: (id) => set((state) => ({
    clients: state.clients.map(client => 
      client.id === id ? { ...client, favorite: !client.favorite } : client
    )
  })),

}));