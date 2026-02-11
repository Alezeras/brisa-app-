import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { z } from 'zod'; 
import { useAppStore } from '../store/useAppStore'; 

const loginSchema = z.object({
  email: z.string().email("Por favor, digite um e-mail válido."),
  password: z.string().min(1, "A senha não pode estar vazia."),
});

type ValidationErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { darkMode, fontSize, login, lastUserPhoto } = useAppStore();
  const defaultImage = require('../assets/images/foto-perfil.png'); 
  const profileImageSource = lastUserPhoto ? { uri: lastUserPhoto } : defaultImage;

  async function handleLogin() {
    setErrors({}); 

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof ValidationErrors] = err.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(email); 
      
      router.replace('/tela');
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity 
              style={styles.settingsButton} 
              onPress={() => router.push('/config-login')} 
            >
               <Ionicons name="settings-sharp" size={24} color="#193CB8" />
            </TouchableOpacity>
          </View>

          <View style={[styles.card, darkMode && styles.cardDark]}>
            
            <View style={styles.clockCircle}>
               <Image 
                 source={profileImageSource} 
                 style={styles.profileImage} 
                 resizeMode="cover" 
               />
            </View>

            <Text style={[styles.subtitle, darkMode && styles.textDark, { fontSize: fontSize }]}>
              {lastUserPhoto ? 'Bem-vindo de volta!' : 'Registre suas atividades com um toque'}
            </Text>

            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/logo-brisa.png')} 
                style={styles.logoImage} 
                resizeMode="contain" 
              />
            </View>

            <View style={styles.formContainer}>
              
              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Email</Text>
              <TextInput 
                style={[
                  styles.input, 
                  darkMode && styles.inputDark, 
                  { fontSize: fontSize + 2 },
                  errors.email && styles.inputError
                ]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={darkMode ? "#ccc" : "#999"}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Senha</Text>
              <View style={[
                  styles.passwordContainer, 
                  darkMode && styles.inputDark,
                  errors.password && styles.inputError
              ]}>
                <TextInput 
                  style={[styles.inputInside, darkMode && { color: '#FFF' }, { fontSize: fontSize + 2 }]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={darkMode ? "#ccc" : "#999"}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{padding: 5}}>
                   <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color={darkMode ? "#FFF" : "#666"} />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <View style={styles.buttonContentContainer}>
                    <Ionicons name="log-in-outline" size={24} color="#FFF" style={{marginRight: 8}} />
                    <Text style={[styles.loginButtonText, { fontSize: fontSize + 2 }]}>Entrar</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('/esquecer-senha')}>
              <Text style={[styles.forgotPassword, darkMode && styles.textDark, { fontSize: fontSize }]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/registro')}>
              <Text style={[styles.register, darkMode && styles.textDark, { fontSize: fontSize }]}>
                Cadastre-se
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
  headerButtonContainer: { position: 'absolute', top: 45, right: 25, zIndex: 10 },
  settingsButton: { width: 40, height: 40, backgroundColor: '#FFFFFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3 },
  card: { marginTop: 50, width: 330, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 35, paddingHorizontal: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 5, marginBottom: 30 },
  clockCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#193CB8', justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden', backgroundColor: '#F0F4FF' },
  profileImage: { width: '100%', height: '100%' },
  subtitle: { fontSize: 14, color: '#4A5565', textAlign: 'center', marginBottom: 20, fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto' },
  logoContainer: { marginBottom: 25, alignItems: 'center', justifyContent: 'center', height: 50 },
  logoImage: { width: 140, height: '100%' },
  formContainer: { width: '100%', alignItems: 'center' },
  label: { width: 235, fontSize: 14, color: '#4A5565', marginBottom: 6, textAlign: 'left' },
  input: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 5, color: '#333', fontSize: 16 },
  inputError: { borderColor: '#EF4444', borderWidth: 2 },
  errorText: { width: 235, color: '#EF4444', fontSize: 12, marginBottom: 10, textAlign: 'left' },
  passwordContainer: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 5, flexDirection: 'row', alignItems: 'center' },
  inputInside: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
  loginButton: { width: 235, height: 45, backgroundColor: '#193CB8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  buttonContentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  forgotPassword: { fontSize: 14, color: '#4A5565', marginBottom: 10 },
  register: { fontSize: 14, fontWeight: 'bold', color: '#4A5565' },
  footerLink: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  footerText: { fontSize: 14, color: '#4A5565', fontWeight: '500' },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  inputDark: { backgroundColor: '#333', borderColor: '#555', color: '#FFF' },
});