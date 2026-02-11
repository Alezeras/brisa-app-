import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, 
  KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

import { ActivityIndicator } from 'react-native';

export default function AddClientScreen() {
  const { darkMode, fontSize, addClient } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Atenção", "O nome do cliente é obrigatório.");
      return;
    }

    setLoading(true); 

    const success = await addClient({
      name: name,
      email: email,
      phone: phone
    });

    setLoading(false); 

    if (success) {
      Alert.alert("Sucesso", "Cliente cadastrado na nuvem!", [
          { text: "OK", onPress: () => router.back() }
      ]);
    } else {
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique sua internet ou tente novamente.");
    }
  };

  return (
                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={[styles.btnCancel, darkMode && styles.btnCancelDark]} onPress={() => router.back()}>
                            <Text style={[styles.btnCancelText, darkMode && styles.textDark]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.btnSave, loading && { opacity: 0.7 }]} 
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.btnSaveText}>Cadastrar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: '100%' },
  card: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 12 },
  backButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#152C70' },
  formContent: { gap: 20, marginBottom: 30 },
  inputGroup: { width: '100%' },
  label: { fontSize: 14, color: '#364153', marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: '#F3F3F5', borderWidth: 1.35, borderColor: '#BEDBFF', borderRadius: 14, paddingHorizontal: 15 },
  input: { flex: 1, color: '#0A0A0A', height: '100%' },
  footerButtons: { flexDirection: 'row', gap: 12 },
  btnCancel: { flex: 1, height: 48, backgroundColor: '#F8FAFF', borderWidth: 1.35, borderColor: '#E5E7EB', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnCancelText: { color: '#0A0A0A', fontWeight: '500' },
  btnSave: { flex: 1, height: 48, backgroundColor: '#152C70', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnSaveText: { color: '#FFFFFF', fontWeight: '500' },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  inputBoxDark: { backgroundColor: '#333', borderColor: '#555' },
  btnCancelDark: { backgroundColor: '#333', borderColor: '#555' },
});