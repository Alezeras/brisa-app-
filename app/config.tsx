import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Platform,
  Dimensions,
  Image 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const { 
    darkMode, 
    toggleDarkMode, 
    currentUser,
    logout 
  } = useAppStore();

  const getInitials = (n: string) => n ? n.substring(0, 2).toUpperCase() : 'US';

  const handleLogout = () => {
      logout();
      router.replace('/tela');
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
            <Text style={styles.headerTitle}>Configurações</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={[styles.mainCard, darkMode && styles.cardDark]}>
            
            <Text style={[styles.pageTitle, darkMode && styles.textDark]}>Configurações</Text>
            <View style={styles.titleUnderline} />

            <View style={[styles.profileBox, darkMode && styles.innerCardDark]}>
                <View style={styles.avatarCircle}>
                    {currentUser?.photo ? (
                        <Image 
                            source={{ uri: currentUser.photo }} 
                            style={styles.avatarImage} 
                        />
                    ) : (
                        <Text style={styles.avatarText}>
                            {getInitials(currentUser?.name || 'perfil')}
                        </Text>
                    )}
                </View>
                <View style={styles.profileInfo}>
                    <Text style={[styles.profileName, darkMode && styles.textDark]}>
                        {currentUser?.name || 'perfil'}
                    </Text>
                    <Text style={[styles.profileEmail, darkMode && styles.textDarkGray]}>
                        {currentUser?.email || 'paulo.foina@gmail.com'}
                    </Text>
                </View>
            </View>

            <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Conta</Text>
            
            <View style={[styles.sectionGroup, darkMode && styles.innerCardDark]}>
                
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/editar-perfil')}>
                    <View style={styles.iconBox}>
                        <Feather name="user" size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                    </View>
                    <View style={styles.menuTexts}>
                        <Text style={[styles.menuTitle, darkMode && styles.textDark]}>Perfil do Usuário</Text>
                        <Text style={[styles.menuSubtitle, darkMode && styles.textDarkGray]}>Nome, foto e informações pessoais</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CEC8D4" />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/mudar-senha')}>
                    <View style={styles.iconBox}>
                        <Feather name="lock" size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                    </View>
                    <View style={styles.menuTexts}>
                        <Text style={[styles.menuTitle, darkMode && styles.textDark]}>Alterar Senha</Text>
                        <Text style={[styles.menuSubtitle, darkMode && styles.textDarkGray]}>Segurança da sua conta</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CEC8D4" />
                </TouchableOpacity>

            </View>

            <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Preferências</Text>
            
            <View style={[styles.sectionGroup, darkMode && styles.innerCardDark]}>
                <TouchableOpacity style={styles.menuItem} onPress={toggleDarkMode}>
                    <View style={styles.iconBox}>
                        <Feather name={darkMode ? "moon" : "sun"} size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                    </View>
                    <View style={styles.menuTexts}>
                        <Text style={[styles.menuTitle, darkMode && styles.textDark]}>
                            {darkMode ? "Modo Claro" : "Modo Escuro"}
                        </Text>
                        <Text style={[styles.menuSubtitle, darkMode && styles.textDarkGray]}>
                            Aparência escura ou clara do app
                        </Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CEC8D4" />
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Ajuda</Text>
            
            <View style={[styles.sectionGroup, darkMode && styles.innerCardDark]}>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ajuda')}>
                    <View style={styles.iconBox}>
                        <Feather name="help-circle" size={20} color="#4A5565" style={darkMode && styles.iconDark} />
                    </View>
                    <View style={styles.menuTexts}>
                        <Text style={[styles.menuTitle, darkMode && styles.textDark]}>Ajuda</Text>
                        <Text style={[styles.menuSubtitle, darkMode && styles.textDarkGray]}>Central de ajuda e perguntas frequentes</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CEC8D4" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={[styles.logoutButton, darkMode && styles.innerCardDark]} 
                onPress={handleLogout}
            >
                <View style={styles.logoutIconBox}>
                    <Feather name="log-out" size={20} color="#FF0000" />
                </View>
                <Text style={styles.logoutText}>Sair da Conta</Text>
            </TouchableOpacity>

        </View>

        <View style={{height: 40}} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  headerBlue: { backgroundColor: '#1E40AF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 20, paddingTop: Platform.OS === 'android' ? 35 : 10, position: 'absolute', top: 0, left: 0, right: 0, height: 120, zIndex: 1 },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 20, zIndex: 10 },
  backText: { color: '#FFF', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', marginLeft: 30 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 100 }, 
  mainCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5, minHeight: 700 },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5565', marginTop: 10 },
  titleUnderline: { width: '100%', height: 1, backgroundColor: '#E5E7EB', marginTop: 15, marginBottom: 20 },
  profileBox: { flexDirection: 'row', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, marginBottom: 25 },
  avatarCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center', marginRight: 15, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' }, 
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 14, fontWeight: 'bold', color: '#4A5565' },
  profileEmail: { fontSize: 12, color: '#6B7280' },
  sectionTitle: { fontSize: 14, color: '#4A5565', marginBottom: 10, marginLeft: 5 },
  sectionGroup: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, marginBottom: 20, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
  iconBox: { width: 30, alignItems: 'center' },
  menuTexts: { flex: 1, marginLeft: 10 },
  menuTitle: { fontSize: 14, fontWeight: '500', color: '#4A5565' },
  menuSubtitle: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#E5E7EB', marginLeft: 55, marginRight: 15 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#FEE2E2', borderRadius: 12, marginTop: 10, backgroundColor: '#FEF2F2' },
  logoutIconBox: { width: 30, alignItems: 'center', marginRight: 10 },
  logoutText: { color: '#FF0000', fontSize: 14, fontWeight: '500' },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  innerCardDark: { borderColor: '#333', backgroundColor: 'transparent' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  iconDark: { color: '#E0E0E0' },
});