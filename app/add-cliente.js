import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, 
  KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSettings } from '../context/ConfigContext';

export default function AddClientScreen() {
  const { darkMode, fontSize, addClient } = useSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Atenção", "O nome do cliente é obrigatório.");
      return;
    }

    const success = addClient({
      name: name,
      email: email,
      phone: phone
    });

    if (success) {
      Alert.alert("Sucesso", "Cliente cadastrado!", [
          { text: "OK", onPress: () => router.back() }
      ]);
    }
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={[styles.card, darkMode && styles.cardDark]}>
                    
                    <View style={styles.cardHeader}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={20} color="#152C70" />
                        </TouchableOpacity>
                        <Text style={[styles.title, darkMode && styles.textDark]}>Novo Cliente</Text>
                    </View>

                    <View style={styles.formContent}>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Nome Completo</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="user" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    placeholder="Ex: Empresa ABC Ltda"
                                    placeholderTextColor="#99A1AF"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>E-mail</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="mail" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    placeholder="contato@empresa.com"
                                    placeholderTextColor="#99A1AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Telefone</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="phone" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    placeholder="(00) 00000-0000"
                                    placeholderTextColor="#99A1AF"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={[styles.btnCancel, darkMode && styles.btnCancelDark]} onPress={() => router.back()}>
                            <Text style={[styles.btnCancelText, darkMode && styles.textDark]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                            <Text style={styles.btnSaveText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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