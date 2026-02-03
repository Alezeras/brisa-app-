import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function ProfileScreen() {
  const { darkMode, fontSize, currentUser, logout, activities } = useAppStore();

  const totalSeconds = activities.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalHours = Math.floor(totalSeconds / 3600);

  const dailyAverage = totalHours > 0 ? (totalHours / 1).toFixed(1) : '0';

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja desconectar?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => {
            logout();
            router.replace('/login');
          } 
        }
      ]
    );
  };

  const getInitials = (name?: string) => {
      if (!name) return 'US';
      return name.substring(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.profileCard, darkMode && styles.cardDark]}>
            <View style={styles.profileRow}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{getInitials(currentUser?.name)}</Text>
                    </View>
                    <TouchableOpacity style={styles.cameraBadge}>
                        <Feather name="camera" size={12} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                    <Text style={[styles.userName, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                        {currentUser?.name || 'Usuário'}
                    </Text>
                    <Text style={[styles.userRole, darkMode && styles.textDarkGray]}>
                        {currentUser?.email || 'email@exemplo.com'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.editProfileBtn} onPress={() => router.push('/editar-perfil')}>
                    <Feather name="edit-2" size={14} color="#4A5565" style={darkMode && styles.textDark} />
                    <Text style={[styles.editBtnText, darkMode && styles.textDark]}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Estatística</Text>
        
        <View style={styles.statsGrid}>
            
            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Feather name="clock" size={24} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
                <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Total de Horas</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>{totalHours}h</Text>
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Feather name="target" size={24} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
                <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Projetos Ativos</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>1</Text>
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Feather name="trending-up" size={24} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
                <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Atividades</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>{activities.length}</Text>
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Feather name="pie-chart" size={24} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
                <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Média diária</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>{dailyAverage}h</Text>
            </View>

        </View>

        <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Configurações</Text>
        
        <View style={[styles.menuGroup, darkMode && styles.cardDark]}>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/editar-perfil')}>
                <View style={styles.menuIconBox}>
                    <Feather name="edit" size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                </View>
                <Text style={[styles.menuText, darkMode && styles.textDark, { fontSize: fontSize }]}>Editar Perfil</Text>
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/mudar-senha')}>
                <View style={styles.menuIconBox}>
                    <Feather name="lock" size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                </View>
                <Text style={[styles.menuText, darkMode && styles.textDark, { fontSize: fontSize }]}>Alterar Senha</Text>
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>

        </View>

        <TouchableOpacity 
            style={[styles.logoutButton, darkMode && styles.cardDark]} 
            onPress={handleLogout}
        >
            <View style={styles.logoutIconBox}>
                <Feather name="log-out" size={20} color="#FF0000" />
            </View>
            <Text style={[styles.logoutText, { fontSize: fontSize }]}>Sair da Conta</Text>
        </TouchableOpacity>

        <View style={{height: 40}} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  
  headerBlue: { backgroundColor: '#1E40AF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 20, paddingTop: Platform.OS === 'android' ? 35 : 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5, zIndex: 10 },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 20, zIndex: 10 },
  backText: { color: '#FFF', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', marginLeft: 30 },

  scrollContent: { padding: 20 },

  profileCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { position: 'relative', marginRight: 15 },
  avatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1E40AF', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#4A5565' },
  userRole: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  editProfileBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  editBtnText: { fontSize: 12, color: '#4A5565', marginLeft: 5, fontWeight: '500' },

  sectionTitle: { fontSize: 16, color: '#4A5565', marginBottom: 15, marginLeft: 5 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  statIcon: { marginBottom: 10 },
  statLabel: { fontSize: 12, color: '#6B7280', marginBottom: 5, textAlign: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#4A5565' },

  menuGroup: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 25, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20 },
  menuIconBox: { width: 30, alignItems: 'flex-start' },
  menuText: { flex: 1, fontSize: 14, fontWeight: '500', color: '#4A5565' },
  separator: { height: 1, backgroundColor: '#F3F4F6', marginLeft: 20, marginRight: 20 },

  logoutButton: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  logoutIconBox: { width: 30, alignItems: 'flex-start' },
  logoutText: { color: '#FF0000', fontWeight: '500' },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  iconDark: { color: '#E0E0E0' },
});