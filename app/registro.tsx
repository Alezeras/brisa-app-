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
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { z } from 'zod'; 

import { useAppStore } from '../store/useAppStore';

const registerSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  confirmPassword: z.string().min(6, "Confirme sua senha."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], 
});

type ValidationErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const { darkMode, fontSize } = useAppStore();

  async function handleRegister() {
    setErrors({}); 

    const result = registerSchema.safeParse({ email, password, confirmPassword });

    if (!result.success) {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof ValidationErrors] = err.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        Alert.alert(
            "Sucesso", 
            "Conta criada com sucesso! Faça login para continuar.", 
            [{ text: "OK", onPress: () => router.back() }] 
        );
    } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível criar a conta.");
    } finally {
        setLoading(false);
    }
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
              <Ionicons name="infinite" size={50} color="#193CB8" />
            </View>

            <Text style={[styles.title, darkMode && styles.textDark]}>
              Crie sua conta
            </Text>

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
                placeholder="seu@email.com"
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
                    placeholder="******"
                    placeholderTextColor={darkMode ? "#ccc" : "#999"}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{padding: 5}}>
                     <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color={darkMode ? "#FFF" : "#666"} />
                  </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Confirmar Senha</Text>
              <View style={[
                  styles.passwordContainer, 
                  darkMode && styles.inputDark,
                  errors.confirmPassword && styles.inputError
              ]}>
                  <TextInput 
                    style={[styles.inputInside, darkMode && { color: '#FFF' }, { fontSize: fontSize + 2 }]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    placeholder="******"
                    placeholderTextColor={darkMode ? "#ccc" : "#999"}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{padding: 5}}>
                     <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color={darkMode ? "#FFF" : "#666"} />
                  </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

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
  title: { fontSize: 20, fontWeight: 'bold', color: '#4A5565', marginBottom: 20 },
  formContainer: { width: '100%', alignItems: 'center' },
  label: { width: 235, color: '#4A5565', marginBottom: 6, textAlign: 'left' },
  input: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 5, color: '#333' },
  inputError: { borderColor: '#EF4444' },
  errorText: { width: 235, color: '#EF4444', fontSize: 12, marginBottom: 10, textAlign: 'left' },
  passwordContainer: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 5, flexDirection: 'row', alignItems: 'center' },
  inputInside: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
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