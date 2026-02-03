import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  TextInput,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { z } from 'zod'; 

import { useAppStore } from '../store/useAppStore';

const changePasswordSchema = z.object({
  currentPass: z.string().min(1, "Digite sua senha atual."),
  newPass: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
  confirmPass: z.string().min(6, "Confirme a nova senha."),
}).refine((data) => data.newPass === data.confirmPass, {
  message: "As senhas não coincidem.",
  path: ["confirmPass"],
});

type ValidationErrors = {
  currentPass?: string;
  newPass?: string;
  confirmPass?: string;
};

export default function ChangePasswordScreen() {
  const { darkMode, fontSize } = useAppStore();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSave = () => {
    setErrors({}); 

    const result = changePasswordSchema.safeParse({ currentPass, newPass, confirmPass });

    if (!result.success) {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof ValidationErrors] = err.message;
        }
      });
      setErrors(formattedErrors);
      Alert.alert("Atenção", "Verifique os campos em vermelho.");
      return;
    }

    Alert.alert("Sucesso", "Sua senha foi alterada!", [
      { text: "OK", onPress: () => router.back() }
    ]);
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
            <Text style={styles.headerTitle}>Alterar Senha</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.inputGroup}>
            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Senha atual</Text>
            <View style={[
                styles.inputContainer, 
                darkMode && styles.inputContainerDark,
                errors.currentPass && styles.inputError
            ]}>
                <Feather name="lock" size={20} color="#9CA3AF" style={styles.inputIconLeft} />
                <TextInput
                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize }]}
                    placeholder="Digite sua senha atual"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showCurrent}
                    value={currentPass}
                    onChangeText={setCurrentPass}
                />
                <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                    <Feather name={showCurrent ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
            {errors.currentPass && <Text style={styles.errorText}>{errors.currentPass}</Text>}
        </View>

        <View style={styles.inputGroup}>
            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Nova senha</Text>
            <View style={[
                styles.inputContainer, 
                darkMode && styles.inputContainerDark,
                errors.newPass && styles.inputError
            ]}>
                <Feather name="shield" size={20} color="#9CA3AF" style={styles.inputIconLeft} />
                <TextInput
                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize }]}
                    placeholder="Digite sua nova senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showNew}
                    value={newPass}
                    onChangeText={setNewPass}
                />
                <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                    <Feather name={showNew ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
            {errors.newPass && <Text style={styles.errorText}>{errors.newPass}</Text>}
        </View>

        <View style={styles.inputGroup}>
            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Confirmar Nova senha</Text>
            <View style={[
                styles.inputContainer, 
                darkMode && styles.inputContainerDark,
                errors.confirmPass && styles.inputError
            ]}>
                <Feather name="check-circle" size={20} color="#9CA3AF" style={styles.inputIconLeft} />
                <TextInput
                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize }]}
                    placeholder="Confirme sua nova senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirm}
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                    <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
            {errors.confirmPass && <Text style={styles.errorText}>{errors.confirmPass}</Text>}
        </View>

        <View style={[styles.requirementsCard, darkMode && styles.cardDark]}>
            <Text style={[styles.reqTitle, darkMode && styles.textDark]}>Requisitos da senha:</Text>
            <Text style={[styles.reqText, darkMode && styles.textDarkGray]}>• Pelo menos 6 caracteres</Text>
            <Text style={[styles.reqText, darkMode && styles.textDarkGray]}>• As senhas devem ser iguais</Text>
        </View>

        <View style={{height: 30}} />

        <View style={styles.buttonsRow}>
            <TouchableOpacity 
                style={[styles.btnOutline, darkMode && styles.btnOutlineDark]} 
                onPress={() => router.back()}
            >
                <Text style={[styles.btnOutlineText, darkMode && styles.textDark]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
                <Feather name="shield" size={18} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.btnPrimaryText}>Alterar Senha</Text>
            </TouchableOpacity>
        </View>
        
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

  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#4A5565', marginBottom: 8, marginLeft: 4 },
  
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 15, height: 50 },
  inputContainerDark: { backgroundColor: '#333', borderColor: '#555' },
  inputError: { borderColor: '#EF4444' },
  
  inputIconLeft: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#333' },
  errorText: { color: '#EF4444', fontSize: 12, marginLeft: 5, marginTop: 4 },

  requirementsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginTop: 10, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  reqTitle: { fontSize: 14, fontWeight: '500', color: '#4A5565', marginBottom: 10 },
  reqText: { fontSize: 11, color: '#4A5565', lineHeight: 18, marginLeft: 10 },

  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  btnOutline: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#9CA3AF', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  btnOutlineDark: { backgroundColor: 'transparent', borderColor: '#555' },
  btnOutlineText: { color: '#4A5565', fontSize: 14, fontWeight: '500' },
  
  btnPrimary: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#193CB8', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },

  containerDark: { backgroundColor: '#121212' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
});