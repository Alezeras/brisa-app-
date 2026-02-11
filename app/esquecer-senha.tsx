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
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { z } from 'zod'; 
import { useAppStore } from '../store/useAppStore'; 

const forgotPasswordSchema = z.object({
  email: z.string().email("Por favor, digite um e-mail válido."),
});

type ValidationErrors = {
  email?: string;
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { darkMode, fontSize } = useAppStore(); 
  async function handleReset() {
    setErrors({}); 

    const result = forgotPasswordSchema.safeParse({ email });

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

    setTimeout(() => {
        setLoading(false);
        Alert.alert(
            "Email Enviado", 
            "Verifique sua caixa de entrada para redefinir a senha.", 
            [{ text: "OK", onPress: () => router.back() }]
        );
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
               <Ionicons name="lock-closed-outline" size={60} color="#193CB8" />
            </View>

            <Text style={[styles.title, darkMode && styles.textDark]}>
              Recuperar Senha
            </Text>
            
            <Text style={[styles.instruction, darkMode && styles.textDark, { fontSize: fontSize }]}>
              Digite seu email para receber o link de redefinição.
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

              <TouchableOpacity style={styles.actionButton} onPress={handleReset} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <View style={styles.buttonContentContainer}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <Text style={[styles.buttonText, { fontSize: fontSize + 2 }]}>Enviar Link</Text>
                  </View>
                )}
              </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => router.push('/registro')}>
              <Text style={[styles.registerLink, darkMode && styles.textDark, { fontSize: fontSize }]}>
                  Não tem conta? <Text style={styles.registerBold}>Cadastre-se</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#4A5565', marginBottom: 10 },
  instruction: { color: '#4A5565', textAlign: 'center', marginBottom: 30, width: 235 },
  formContainer: { width: '100%', alignItems: 'center' },
  label: { width: 235, color: '#4A5565', marginBottom: 6, textAlign: 'left' },
  input: { width: 235, height: 45, backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: '#193CB8', borderRadius: 12, paddingHorizontal: 15, marginBottom: 5, color: '#333' },
  inputError: { borderColor: '#EF4444' },
  errorText: { width: 235, color: '#EF4444', fontSize: 12, marginBottom: 15, textAlign: 'left' },
  actionButton: { width: 235, height: 45, backgroundColor: '#193CB8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 25, marginTop: 10 },
  buttonContentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '500' },
  registerLink: { color: '#4A5565' },
  registerBold: { fontWeight: 'bold', color: '#4A5565' },
  footerLink: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  footerText: { color: '#4A5565', fontWeight: '500' },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  inputDark: { backgroundColor: '#333', borderColor: '#555', color: '#FFF' },
});