import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator, Image 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useSettings } from '../context/ConfigContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { darkMode, fontSize } = useSettings();

  async function handleRegister() {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        Alert.alert("Sucesso", "Conta criada! Faça login.", [{ text: "OK", onPress: () => router.back() }]);
    }, 1500);
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#193CB8" />
            </TouchableOpacity>
          </View>

          <View style={[styles.card, darkMode && styles.cardDark]}>
            
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/logo-brisa.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.title, darkMode && styles.textDark]}>
              Crie sua conta
            </Text>

            <View style={styles.formContainer}>
              
              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Email</Text>
              <TextInput 
                style={[styles.input, darkMode && styles.inputDark, { fontSize: fontSize + 2 }]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="seu@email.com"
                placeholderTextColor={darkMode ? "#ccc" : "#999"}
              />

              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Senha</Text>
              <TextInput 
                style={[styles.input, darkMode && styles.inputDark, { fontSize: fontSize + 2 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="******"
                placeholderTextColor={darkMode ? "#ccc" : "#999"}
              />

              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Confirmar Senha</Text>
              <TextInput 
                style={[styles.input, darkMode && styles.inputDark, { fontSize: fontSize + 2 }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="******"
                placeholderTextColor={darkMode ? "#ccc" : "#999"}
              />

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={[styles.registerButtonText, { fontSize: fontSize + 2 }]}>Cadastre-se</Text>
                )}
              </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={[styles.loginLink, darkMode && styles.textDark, { fontSize: fontSize }]}>
                Já tem uma conta? <Text style={styles.loginBold}>Entrar</Text>
              </Text>
            </TouchableOpacity>

          </View>

         <TouchableOpacity 
                    style={styles.footerLink} 
                    onPress={() => router.push('/ajuda')}
                  >
                    <Text style={[styles.footerText, { fontSize: fontSize }]}>Precisa de ajuda?</Text>
                  </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContainer: { flexGrow: 1, minHeight: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  headerButtonContainer: { position: 'absolute', top: 20, left: 25, zIndex: 10 },
  backButton: { width: 40, height: 40, backgroundColor: '#FFFFFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  card: { width: 330, paddingVertical: 40, backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 20, alignItems: 'center', elevation: 5, marginBottom: 30 },
  logoContainer: { marginBottom: 20, alignItems: 'center', height: 65, justifyContent: 'center' },
  logoImage: { width: 204, height: '100%' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#4A5565', marginBottom: 20 },
  formContainer: { width: '100%', alignItems: 'center' },
  label: { width: 235, color: '#4A5565', marginBottom: 6, textAlign: 'left' },
  input: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, color: '#333' },
  registerButton: { width: 235, height: 45, backgroundColor: '#193CB8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 25 },
  registerButtonText: { color: '#FFFFFF', fontWeight: '500' },
  loginLink: { color: '#4A5565' },
  loginBold: { fontWeight: 'bold', color: '#4A5565' },
  footerLink: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  footerText: { color: '#4A5565', fontWeight: '500' },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  inputDark: { backgroundColor: '#333', borderColor: '#555', color: '#FFF' },
});