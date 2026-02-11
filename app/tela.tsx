import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Modal, 
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function Dashboard() {
  const router = useRouter();
  const { 
    darkMode, 
    fontSize, 
    activities, 
    isRunning, 
    timerSeconds, 
    startTimer,
    stopTimer,
    logout,
    fetchClients 
  } = useAppStore();
  
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const recentActivities = activities.filter(a => a.type === 'timer' || a.type === 'manual');
  const totalSeconds = recentActivities.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const handleToggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleLogout = () => {
    setMenuVisible(false);
    logout(); 
    setTimeout(() => {
        router.replace('/login'); 
    }, 100);
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)} 
        >
          <View style={[styles.menuBox, darkMode && styles.menuBoxDark]}>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); router.push('/relatorio'); }}>
                <Feather name="bar-chart-2" size={18} color={darkMode ? "#FFF" : "#4A5565"} style={styles.menuIcon} />
                <Text style={[styles.menuText, darkMode && styles.textDark, { fontSize: fontSize }]}>Relatórios</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); router.push('/config'); }}>
                <Feather name="settings" size={18} color={darkMode ? "#FFF" : "#4A5565"} style={styles.menuIcon} />
                <Text style={[styles.menuText, darkMode && styles.textDark, { fontSize: fontSize }]}>Configurações</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Feather name="log-out" size={18} color="#EF4444" style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: '#EF4444', fontSize: fontSize }]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
          <Feather name="menu" size={24} color={darkMode ? "#FFF" : "#030000"} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerLabel, darkMode && styles.textDark, { fontSize: fontSize + 4 }]}>
            {isRunning ? "Cronômetro Ativo" : "Total Acumulado"}
          </Text>
          <Text style={[styles.bigTimer, darkMode && styles.textDark, isRunning && { color: '#193CB8', fontWeight: 'bold' }]}>
            {isRunning ? formatTime(timerSeconds) : formatTime(totalSeconds)}
          </Text>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/nova-atividade')}>
          <Feather name="plus" size={24} color={darkMode ? "#FFF" : "#000000"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {recentActivities.length === 0 ? (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text style={{color: '#9CA3AF', fontSize: 14}}>Nenhuma atividade registrada hoje.</Text>
            </View>
        ) : (
            recentActivities.map((item) => (
            <View key={item.id} style={[styles.activityCard, darkMode && styles.cardDark]}>
                <View style={styles.cardHeaderRow}>
                <Text style={[styles.cardDate, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>
                    {item.date}
                </Text>
                <Text style={[styles.cardDuration, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>
                    {formatTime(item.duration)}
                </Text>
                </View>

                <View style={styles.cardBodyRow}>
                <View style={styles.leftInfo}>
                    <View style={[styles.blueDot, item.color ? { backgroundColor: item.color } : {}]} />
                    <View>
                    <Text style={[styles.activityTitle, darkMode && styles.textDarkGray, { fontSize: fontSize - 2 }]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.timeRange, darkMode && styles.textDarkGray, { fontSize: fontSize - 2 }]}>
                        {item.startTime} - {item.endTime}
                    </Text>
                    </View>
                </View>

                <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.smallPlayButton}>
                      <Ionicons name="play" size={12} color={darkMode ? "#FFF" : "#000"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionsButton}>
                      <MaterialIcons name="more-vert" size={20} color={darkMode ? "#FFF" : "#000"} />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            ))
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={[styles.bottomBar, darkMode && styles.bottomBarDark]}>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="home" size={24} color="#193CB8" />
          <Text style={[styles.tabLabel, { color: '#193CB8', fontWeight: 'bold' }]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/calendario')}>
          <Feather name="calendar" size={24} color="#4A5565" style={darkMode ? styles.textDark : {}} />
          <Text style={[styles.tabLabel, darkMode && styles.textDark]}>Agendamentos</Text>
        </TouchableOpacity>
        
        <View style={{ width: 60 }} /> 
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/clientes')}>
          <Feather name="users" size={24} color="#4A5565" style={darkMode ? styles.textDark : {}} />
          <Text style={[styles.tabLabel, darkMode && styles.textDark]}>Clientes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/perfil')}>
          <Feather name="user" size={24} color="#4A5565" style={darkMode ? styles.textDark : {}} />
          <Text style={[styles.tabLabel, darkMode && styles.textDark]}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.bigPlayButton, isRunning && { backgroundColor: '#EF4444' }]} 
            onPress={handleToggleTimer}
        >
          {isRunning ? (
             <Ionicons name="square" size={24} color="#FFFFFF" />
          ) : (
             <Ionicons name="play" size={32} color="#FFFFFF" style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  menuBox: { position: 'absolute', top: Platform.OS === 'android' ? 50 : 60, left: 20, width: 200, backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 10 },
  menuBoxDark: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#333' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15 },
  menuIcon: { marginRight: 12 },
  menuText: { fontSize: 14, color: '#4A5565', fontWeight: '500' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 20 },
  headerCenter: { alignItems: 'center' },
  headerLabel: { fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto', fontSize: 18, color: '#4A5565', marginBottom: 5 },
  bigTimer: { fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto', fontSize: 32, color: '#4A5565', fontWeight: '400' },
  iconButton: { padding: 5 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  activityCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardDate: { fontSize: 12, color: '#4A5565' },
  cardDuration: { fontSize: 12, color: '#4A5565', fontWeight: 'bold' },
  cardBodyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leftInfo: { flexDirection: 'row', alignItems: 'center' },
  blueDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#1E40AF', marginRight: 10 },
  activityTitle: { fontSize: 12, fontWeight: '600', color: '#5C6265', marginBottom: 2 },
  timeRange: { fontSize: 12, fontWeight: '300', color: '#5C6265' },
  rightActions: { flexDirection: 'row', alignItems: 'center' },
  smallPlayButton: { marginRight: 15 },
  optionsButton: {},
  bottomBar: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', elevation: 10 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  tabLabel: { fontSize: 10, color: '#4A5565', marginTop: 4, textAlign: 'center', width: '100%' },
  bigPlayButton: { position: 'absolute', bottom: 35, alignSelf: 'center', width: 70, height: 70, borderRadius: 35, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center', shadowColor: '#1E40AF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8, zIndex: 10 },
  containerDark: { backgroundColor: '#121212' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  bottomBarDark: { backgroundColor: '#1E1E1E', borderTopColor: '#333' },
});