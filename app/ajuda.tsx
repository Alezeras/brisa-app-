import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
export default function HelpScreen() {
  const { darkMode, fontSize } = useAppStore();

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color={darkMode ? "#FFF" : "#193CB8"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.textDark]}>Central de Ajuda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={[styles.mainCard, darkMode && styles.cardDark]}>
          
          <View style={styles.bigIconContainer}>
             <Ionicons name="help-circle-outline" size={60} color="#4A5565" style={darkMode && styles.iconDark} />
          </View>

          <Text style={[styles.subtitle, darkMode && styles.textDark, { fontSize: fontSize }]}>
            Como podemos ajudá-lo hoje?
          </Text>

          <View style={[styles.helpCard, darkMode && styles.helpCardDark]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Feather name="log-out" size={20} color="#4A5565" />
              </View>
              <View style={styles.cardTexts}>
                <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>
                  Não consigo fazer login
                </Text>
                <Text style={[styles.cardDescription, darkMode && styles.textDarkGray]}>
                  Problemas para acessar sua conta? Verifique seu email e senha. Se ainda não conseguir, tente recuperar sua senha.
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/login')} 
            >
              <Text style={[styles.actionButtonText, { fontSize: fontSize }]}>Ir para o login</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.helpCard, darkMode && styles.helpCardDark]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Feather name="user-plus" size={20} color="#4A5565" />
              </View>
              <View style={styles.cardTexts}>
                <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>
                  Como me cadastrar
                </Text>
                <Text style={[styles.cardDescription, darkMode && styles.textDarkGray]}>
                  Criar uma nova conta no sistema. Clique em 'Cadastre-se' na tela de login e preencha seus dados para criar uma conta.
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/registro')}
            >
              <Text style={[styles.actionButtonText, { fontSize: fontSize }]}>Fazer Cadastro</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.helpCard, darkMode && styles.helpCardDark]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Feather name="lock" size={20} color="#4A5565" />
              </View>
              <View style={styles.cardTexts}>
                <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>
                  Como recupero minha senha
                </Text>
                <Text style={[styles.cardDescription, darkMode && styles.textDarkGray]}>
                  Esqueci minha senha de acesso. Use a opção 'Esqueceu sua senha?' na tela de login para receber um código de recuperação.
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/esquecer-senha')}
            >
              <Text style={[styles.actionButtonText, { fontSize: fontSize }]}>Recuperar Senha</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, marginTop: Platform.OS === 'android' ? 25 : 0 },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingBottom: 40 },
  mainCard: { width: 330, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 5, marginTop: 10 },
  bigIconContainer: { marginBottom: 15 },
  subtitle: { color: '#4A5565', marginBottom: 25, fontWeight: '500', textAlign: 'center' },
  helpCard: { width: '100%', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 15, marginBottom: 20 },
  helpCardDark: { backgroundColor: '#2C2C2C' },
  cardHeader: { flexDirection: 'row', marginBottom: 15 },
  iconBox: { width: 30, height: 30, backgroundColor: '#F3F4F6', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardTexts: { flex: 1 },
  cardTitle: { color: '#4A5565', fontWeight: 'bold', marginBottom: 4 },
  cardDescription: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  actionButton: { backgroundColor: '#193CB8', borderRadius: 12, height: 35, justifyContent: 'center', alignItems: 'center', width: '100%' },
  actionButtonText: { color: '#FFFFFF', fontWeight: '500' },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  iconDark: { color: '#E0E0E0' },
});