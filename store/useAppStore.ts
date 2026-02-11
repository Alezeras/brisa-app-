import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { companyService, CompanyDTO } from '../services/api'; 

export interface Activity {
  id: string | number;
  title: string;
  date: string;       
  startTime: string;  
  endTime: string;    
  duration: number;   
  type: 'timer' | 'manual' | 'calendar'; 
  projectId?: string; 
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
  currentUser: { name: string; email: string; photo?: string | null } | null;
  lastUserPhoto: string | null;

  activities: Activity[];
  isRunning: boolean;
  timerSeconds: number;
  timerInterval: any | null;

  clients: Client[];
  isLoadingClients: boolean;

  // Actions UI
  toggleDarkMode: () => void;
  cycleFontSize: () => void;
  getFontSizeLabel: () => string;
  login: (email: string) => void;
  logout: () => void;
  updateUserProfile: (name: string, photo: string | null) => void; // <--- Novo para editar perfil

  // Actions Timer/Atividades
  startTimer: () => void;
  stopTimer: () => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  getStats: () => { totalHours: string, projectsCompleted: number, dailyAverage: string }; // <--- Novo para estatísticas

  // Actions Clientes
  fetchClients: () => Promise<void>;
  addClient: (clientData: CompanyDTO) => Promise<boolean>; // <--- GARANTINDO QUE ESTÁ AQUI
  toggleClientFavorite: (id: string | number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // --- ESTADOS INICIAIS ---
      darkMode: false,
      fontSize: 14,
      currentUser: null,
      lastUserPhoto: null,
      activities: [],
      isRunning: false,
      timerSeconds: 0,
      timerInterval: null,
      clients: [],
      isLoadingClients: false,

      // --- UI ---
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      cycleFontSize: () => set((state) => ({ 
        fontSize: state.fontSize === 14 ? 16 : state.fontSize === 16 ? 18 : 14 
      })),
      getFontSizeLabel: () => {
        const { fontSize } = get();
        return fontSize === 14 ? 'Pequeno' : fontSize === 16 ? 'Médio' : 'Grande';
      },

      login: (email) => {
        // CORREÇÃO LOGIN: Apenas salva, a validação deve ser na tela
        const photoUrl = null; 
        set({ 
            currentUser: { name: 'Usuário', email, photo: photoUrl },
            lastUserPhoto: photoUrl 
        });
      },
      
      logout: () => {
        const { timerInterval } = get();
        if (timerInterval) clearInterval(timerInterval);
        set({ currentUser: null, isRunning: false, timerSeconds: 0, timerInterval: null });
      },

      updateUserProfile: (name, photo) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, name, photo } : null,
        lastUserPhoto: photo
      })),

      // --- TIMER E ATIVIDADES ---
      startTimer: () => {
        const { isRunning } = get();
        if (isRunning) return;
        const interval = setInterval(() => {
          set((state) => ({ timerSeconds: state.timerSeconds + 1 }));
        }, 1000);
        set({ isRunning: true, timerInterval: interval });
      },

      stopTimer: () => {
        const { timerInterval, timerSeconds, activities } = get();
        if (timerInterval) clearInterval(timerInterval);

        if (timerSeconds > 0) {
            const now = new Date();
            const dateStr = now.toLocaleDateString('pt-BR');
            const endTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const startTimeMs = now.getTime() - (timerSeconds * 1000);
            const startTimeStr = new Date(startTimeMs).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const newActivity: Activity = {
                id: Math.random().toString(),
                title: 'Atividade Cronometrada',
                date: dateStr,
                startTime: startTimeStr,
                endTime: endTimeStr,
                duration: timerSeconds,
                type: 'timer', // Define que veio do timer
                projectId: 'Brisa'
            };

            set({ isRunning: false, timerInterval: null, timerSeconds: 0, activities: [newActivity, ...activities] });
        } else {
            set({ isRunning: false, timerInterval: null });
        }
      },

      addActivity: (newActivity) => set((state) => ({
        activities: [{ id: Math.random().toString(), ...newActivity }, ...state.activities]
      })),

      // CORREÇÃO ESTATÍSTICAS [cite: 136, 151]
      getStats: () => {
        const { activities } = get();
        // Filtra apenas atividades concluídas (timer ou manual)
        const validActivities = activities.filter(a => a.type !== 'calendar');
        
        const totalSeconds = validActivities.reduce((acc, curr) => acc + curr.duration, 0);
        const totalHours = Math.floor(totalSeconds / 3600);
        const projectsCompleted = new Set(validActivities.map(a => a.projectId)).size;
        
        // Média simples (apenas exemplo)
        const dailyAvg = validActivities.length > 0 ? (totalHours / validActivities.length).toFixed(1) : "0";

        return {
            totalHours: totalHours.toString(),
            projectsCompleted: projectsCompleted,
            dailyAverage: `${dailyAvg}h`
        };
      },

      // --- CLIENTES ---
      fetchClients: async () => {
        set({ isLoadingClients: true });
        try {
          const data = await companyService.list();
          const mappedClients: Client[] = data.map((item: any) => ({
            id: item.id || item._id,
            name: item.name || item.companyName || "Sem Nome",
            email: item.email || "",
            phone: item.phone || "",
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

      // CORREÇÃO CRÍTICA: A função existe e está tipada
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
    }),
    {
      name: 'brisa-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        darkMode: state.darkMode, 
        fontSize: state.fontSize,
        currentUser: state.currentUser,
        lastUserPhoto: state.lastUserPhoto,
        activities: state.activities,
      }),
    }
  )
);