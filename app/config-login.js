import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useSettings } from '../context/ConfigContext';

export default function ConfigScreen() {
  const { 
    darkMode, 
    toggleDarkMode, 
    fontSize, 
    currentUser,
    logout 
  } = useSettings();

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair do aplicativo?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => {
            logout();
            router.replace('/');
        }}
    ]);
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.header, darkMode && styles.headerDark]}>
        <SafeAreaView>
           <View style={styles.headerContent}>
             <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFF" />
             </TouchableOpacity>
             <Text style={styles.headerTitle}>Configurações</Text>
             <View style={{width: 24}} /> 
           </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={[styles.profileSummary, darkMode && styles.cardDark]}>
            <View style={styles.profileIconCircle}>
                <Text style={styles.profileInitials}>PF</Text>
            </View>
            <View>
                <Text style={[styles.profileName, darkMode && styles.textDark, { fontSize: fontSize }]}>Administrador</Text>
                <Text style={[styles.profileEmail, { fontSize: fontSize - 2 }]}>{currentUser}</Text>
            </View>
        </View>

        <Text style={[styles.sectionLabel, darkMode && styles.textDark]}>CONTA</Text>

        <View style={[styles.cardGroup, darkMode && styles.cardDark]}>
            
            <TouchableOpacity 
                style={styles.cardItem} 
                onPress={() => router.push('/editar-perfil')}
            >
                <View style={styles.itemLeft}>
                    <Feather name="user" size={20} color={darkMode ? "#FFF" : "#4A5565"} />
                    <View style={styles.textContainer}>
                        <Text style={[styles.itemTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Dados Pessoais</Text>
                        <Text style={styles.itemSubtitle}>Alterar nome, telefone, cargo</Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color="#CEC8D4" />
            </TouchableOpacity>

            <View style={[styles.divider, darkMode && styles.dividerDark]} />

            <TouchableOpacity 
                style={styles.cardItem} 
                onPress={() => router.push('/mudar-senha')}
            >
                <View style={styles.itemLeft}>
                    <Feather name="lock" size={20} color={darkMode ? "#FFF" : "#4A5565"} />
                    <View style={styles.textContainer}>
                        <Text style={[styles.itemTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Segurança</Text>
                        <Text style={styles.itemSubtitle}>Alterar sua senha de acesso</Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color="#CEC8D4" />
            </TouchableOpacity>
        </View>

        <Text style={[styles.sectionLabel, darkMode && styles.textDark]}>APARÊNCIA</Text>

        <View style={[styles.cardGroup, darkMode && styles.cardDark]}>
            <View style={styles.cardItem}>
                <View style={styles.itemLeft}>
                    <Feather name="sun" size={20} color={darkMode ? "#FFF" : "#4A5565"} />
                    <View style={styles.textContainer}>
                        <Text style={[styles.itemTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Modo Escuro</Text>
                        <Text style={styles.itemSubtitle}>Alterar o tema do aplicativo</Text>
                    </View>
                </View>
                <Switch 
                    value={darkMode} 
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: "#E5E7EB", true: "#1E40AF" }}
                    thumbColor={"#FFF"}
                />
            </View>
        </View>

        <Text style={[styles.sectionLabel, darkMode && styles.textDark]}>SUPORTE</Text>

        <View style={[styles.cardGroup, darkMode && styles.cardDark]}>
            <TouchableOpacity 
                style={styles.cardItem} 
                onPress={() => router.push('/ajuda')}
            >
                <View style={styles.itemLeft}>
                    <Feather name="help-circle" size={20} color={darkMode ? "#FFF" : "#4A5565"} />
                    <View style={styles.textContainer}>
                        <Text style={[styles.itemTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Ajuda e Suporte</Text>
                        <Text style={styles.itemSubtitle}>Tire suas dúvidas</Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color="#CEC8D4" />
            </TouchableOpacity>
        </View>

        <TouchableOpacity 
            style={[styles.logoutCard, darkMode && styles.cardDark]} 
            onPress={handleLogout}
        >
             <View style={styles.itemLeft}>
                <Feather name="log-out" size={20} color="#FF0000" />
                <Text style={[styles.logoutText, { fontSize: fontSize }]}>Sair da conta</Text>
                <TouchableOpacity onPress={() => router.push('/login')}></TouchableOpacity>
             </View>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => router.push('/politica')}>
                <Text style={styles.footerText}>Política de Privacidade</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> • </Text>
            <TouchableOpacity onPress={() => router.push('/termos-uso')}>
                <Text style={styles.footerText}>Termos de Uso</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Versão 1.0.0</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  containerDark: { backgroundColor: '#121212' },
  header: { backgroundColor: '#1E40AF', paddingBottom: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  headerDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { fontSize: 20, fontWeight: '500', color: '#FFF' },
  backButton: { padding: 5 },
  content: { padding: 20, paddingBottom: 50 },
  profileSummary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 25, borderWidth: 1, borderColor: 'rgba(203, 206, 212, 0.4)' },
  profileIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  profileInitials: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: '#4A5565' },
  profileEmail: { color: '#99A1AF' },
  sectionLabel: { fontSize: 14, color: '#4A5565', marginBottom: 8, marginLeft: 4, marginTop: 10 },
  cardGroup: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15, overflow: 'hidden' }, // overflow hidden para o ripple não sair
  cardDark: { backgroundColor: '#1E1E1E' },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  textContainer: { justifyContent: 'center' },
  itemTitle: { fontSize: 14, fontWeight: '500', color: '#4A5565' },
  itemSubtitle: { fontSize: 11, color: '#99A1AF' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginLeft: 50 }, // Linha separadora que não pega o ícone
  dividerDark: { backgroundColor: '#333' },
  logoutCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginTop: 10, marginBottom: 20 },
  logoutText: { color: '#FF0000', fontWeight: '500', marginLeft: 0 },
  footerLinks: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  footerText: { color: '#99A1AF', fontSize: 12 },
  versionText: { textAlign: 'center', color: '#ccc', fontSize: 10, marginTop: 10 },
  textDark: { color: '#E0E0E0' },
});