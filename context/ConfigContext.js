import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const [currentUser, setCurrentUser] = useState('admin@teste.com'); 
  const [userData, setUserData] = useState({}); 

  const [isRunning, setIsRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);


  const login = (email) => {
    if (!email) return;
    setCurrentUser(email);
    setUserData(prev => {
        if (prev[email]) return prev;
        return { ...prev, [email]: [] };
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsRunning(false);
    setTimerSeconds(0);
  };

  const getUserActivities = () => {
    if (!currentUser) return [];
    return userData[currentUser] || [];
  };

  const toggleTimer = () => {
     if (isRunning) {
        
        if (timerSeconds < 3) {
            setIsRunning(false);
            setTimerSeconds(0);
            return;
        }

        const now = new Date();
        const endH = String(now.getHours()).padStart(2, '0');
        const endM = String(now.getMinutes()).padStart(2, '0');
        const endTime = `${endH}:${endM}`;
        const startObj = new Date(now.getTime() - timerSeconds * 1000);
        const startH = String(startObj.getHours()).padStart(2, '0');
        const startM = String(startObj.getMinutes()).padStart(2, '0');
        const startTime = `${startH}:${startM}`;
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const year = now.getFullYear();
        const dateStr = `${day}/${month}/${year}`;
        const newActivity = {
            id: Date.now(),
            title: 'Atividade Cronometrada', 
            date: dateStr,
            duration: timerSeconds, 
            startTime: startTime,
            endTime: endTime,
            type: 'Timer',
            color: '#193CB8'
        };

        setUserData(prev => {
            const currentList = prev[currentUser] || [];
            const newList = [newActivity, ...currentList];
            return { ...prev, [currentUser]: newList };
        });

        setIsRunning(false);
        setTimerSeconds(0);
        

     } else {
        if (!currentUser) {
            Alert.alert("Atenção", "Faça login para iniciar.");
            return;
        }
        setIsRunning(true);
     }
  };

  const addManualActivity = (activityData) => {
    if (!currentUser) return false;
    
    let fixedDate = activityData.date;
    if (fixedDate && fixedDate.includes('/')) {
        const parts = fixedDate.split('/');
        if (parts.length === 3) {
            fixedDate = `${parts[0].padStart(2,'0')}/${parts[1].padStart(2,'0')}/${parts[2]}`;
        }
    }

    const newActivity = {
        id: Date.now(),
        ...activityData,
        date: fixedDate
    };

    setUserData(prev => {
        const currentList = prev[currentUser] || [];
        return { ...prev, [currentUser]: [newActivity, ...currentList] };
    });
    return true;
  };

  const getTotalSeconds = () => {
    const activities = getUserActivities();
    return activities.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const cycleFontSize = () => setFontSize(curr => (curr === 12 ? 14 : curr === 14 ? 16 : 12));
  
  const getFontSizeLabel = () => {
    if (fontSize === 12) return 'Pequeno';
    if (fontSize === 14) return 'Médio';
    if (fontSize === 16) return 'Grande';
    return 'Médio';
  };

  return (
    <ConfigContext.Provider value={{ 
      darkMode, fontSize, toggleDarkMode, cycleFontSize, getFontSizeLabel,
      login, logout, currentUser,
      activities: getUserActivities(), 
      isRunning, timerSeconds, toggleTimer, formatTime, getTotalSeconds,
      addManualActivity
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useSettings() {
  return useContext(ConfigContext);
}