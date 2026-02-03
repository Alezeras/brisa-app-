import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

const { height } = Dimensions.get('window');

export default function EditProfileScreen() {
  const { darkMode, fontSize, currentUser } = useAppStore();

  const [name, setName] = useState(currentUser?.name || 'Administrador');
  const [email, setEmail] = useState(currentUser?.email || 'admin@teste.com');
  const [phone, setPhone] = useState('+55 (11) 99999-9999'); 
  const [role, setRole] = useState('Administrador'); 
  const [department, setDepartment] = useState('Tecnologia'); 
  const [location, setLocation] = useState('Cassino, RG'); 

  const getInitials = (n: string) => {
      if (!n) return 'PF';
      return n.substring(0, 2).toUpperCase();
  };

  const handleSave = () => {
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
      { text: "OK", onPress: () => router.back() }
    ]);
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
                            <Ionicons name="arrow-back" size={20} color="#193CB8" />
                        </TouchableOpacity>
                        <Text style={[styles.title, darkMode && styles.textDark]}>Editar Perfil</Text>
                    </View>

                    <View style={styles.profileSection}>
                        <View style={styles.profileImageContainer}>
                            <View style={styles.profileImageCircle}>
                                <Text style={styles.profileInitials}>{getInitials(name)}</Text>
                            </View>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Ionicons name="camera" size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.changePhotoText, { fontSize: fontSize }]}>Toque na foto para alterar</Text>
                    </View>

                    <View style={styles.formContent}>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Nome Completo</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="user" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Seu nome"
                                    placeholderTextColor="#99A1AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Email</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="mail" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    placeholder="seu@email.com"
                                    placeholderTextColor="#99A1AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Telefone</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="phone" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    placeholder="(00) 00000-0000"
                                    placeholderTextColor="#99A1AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Cargo</Text>
                            <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name="briefcase" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                    <Text style={[styles.inputText, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>{role}</Text>
                                </View>
                                <Feather name="chevron-down" size={20} color="#99A1AF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Departamento</Text>
                            <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name="grid" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                    <Text style={[styles.inputText, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>{department}</Text>
                                </View>
                                <Feather name="chevron-down" size={20} color="#99A1AF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Localização</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="map-pin" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    value={location}
                                    onChangeText={setLocation}
                                    placeholder="Cidade, Estado"
                                    placeholderTextColor="#99A1AF"
                                />
                            </View>
                        </View>

                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={[styles.btnCancel, darkMode && styles.btnCancelDark]} onPress={() => router.back()}>
                            <Text style={[styles.btnCancelText, darkMode && styles.textDark]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                            <Ionicons name="save-outline" size={18} color="#FFF" style={{marginRight: 8}} />
                            <Text style={styles.btnSaveText}>Salvar</Text>
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
  scrollContent: { paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  
  card: { width: '100%', maxWidth: 400, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },

  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  backButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#193CB8', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#1C398E', fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto' },

  profileSection: { alignItems: 'center', marginBottom: 30 },
  profileImageContainer: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', marginBottom: 10, position: 'relative' },
  profileImageCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#193CB8', justifyContent: 'center', alignItems: 'center' },
  profileInitials: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  cameraButton: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#193CB8', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF', elevation: 2 },
  changePhotoText: { color: '#6A7282', fontSize: 14 },

  formContent: { gap: 20, marginBottom: 30 },
  inputGroup: { width: '100%' },
  label: { fontSize: 14, color: '#364153', marginBottom: 8 },
  
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: '#F3F3F5', borderWidth: 1.35, borderColor: '#BEDBFF', borderRadius: 14, paddingHorizontal: 15 },
  input: { flex: 1, color: '#717182', height: '100%' },
  inputText: { color: '#0A0A0A' },

  footerButtons: { flexDirection: 'row', gap: 12 },
  btnCancel: { flex: 1, height: 48, backgroundColor: '#F8FAFF', borderWidth: 1.35, borderColor: '#E5E7EB', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnCancelText: { color: '#0A0A0A', fontWeight: '500' },
  btnSave: { flex: 1, height: 48, backgroundColor: '#193CB8', borderRadius: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnSaveText: { color: '#FFFFFF', fontWeight: '500' },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  inputBoxDark: { backgroundColor: '#333', borderColor: '#555' },
  btnCancelDark: { backgroundColor: '#333', borderColor: '#555' },
});