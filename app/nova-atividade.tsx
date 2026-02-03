import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function NewActivityScreen() {
  const { darkMode, fontSize, addActivity } = useAppStore();

  const [name, setName] = useState('');
  const [date, setDate] = useState(''); 
  const [time, setTime] = useState('09:00'); 
  const [durationText, setDurationText] = useState('1 hora'); 
  const [project, setProject] = useState('Brisa');

  const getFormattedDatePreview = () => {
    return "domingo, 4 de janeiro às";
  };

  const handleSave = () => {
    if (!name.trim()) {
        Alert.alert("Ops!", "Por favor, dê um nome para a atividade.");
        return;
    }

    let finalDate = date;
    if (!finalDate) {
        const today = new Date();
        const d = String(today.getDate()).padStart(2, '0');
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const y = today.getFullYear();
        finalDate = `${d}/${m}/${y}`;
    }

    let seconds = 0;
    if (durationText.includes('hora')) seconds += 3600;
    if (durationText.includes('min')) seconds += 1800; 
    if (seconds === 0) seconds = 3600;

    addActivity({
        title: name,
        date: finalDate,
        startTime: time,
        endTime: '10:00', 
        duration: seconds,
        type: 'Manual',
        color: '#193CB8' 
    });

    Alert.alert("Sucesso", "Atividade criada com sucesso!", [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1C398E" />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, darkMode && styles.textDark]}>Nova Atividade</Text>
                </View>

                <View style={[styles.card, darkMode && styles.cardDark]}>
                    
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Nome da Atividade</Text>
                        <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                            <Feather name="user" size={20} color="#99A1AF" style={{marginRight: 10}} />
                            <TextInput 
                                style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize }]}
                                placeholder="Ex: Atividade de projeto"
                                placeholderTextColor="#99A1AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Data</Text>
                        <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                            <Feather name="calendar" size={20} color="#99A1AF" style={{marginRight: 10}} />
                            <TextInput
                                style={[styles.inputTextValue, darkMode && styles.textDark, { flex: 1 }]}
                                placeholder="DD/MM/AAAA"
                                placeholderTextColor="#99A1AF"
                                value={date}
                                onChangeText={setDate}
                                keyboardType="numeric"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 15 }]}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Horário</Text>
                            <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name="clock" size={20} color="#99A1AF" style={{marginRight: 8}} />
                                    <Text style={[styles.inputTextValue, darkMode && styles.textDark]}>{time}</Text>
                                </View>
                                <Feather name="chevron-down" size={20} color="#99A1AF" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Duração</Text>
                            <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                                <Text style={[styles.inputTextValue, darkMode && styles.textDark]}>{durationText}</Text>
                                <Feather name="chevron-down" size={20} color="#99A1AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Projeto</Text>
                        <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.projectDot, { backgroundColor: '#193CB8' }]} />
                                <Text style={[styles.inputTextValue, darkMode && styles.textDark]}>{project}</Text>
                            </View>
                            <Feather name="chevron-down" size={20} color="#99A1AF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.previewContainer}>
                        <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Preview</Text>
                        
                        <View style={[styles.previewBox, darkMode && styles.inputBoxDark]}>
                            <View style={styles.previewTag}>
                                <Text style={styles.previewTagText} numberOfLines={1}>
                                    {name || "Nome da atividade"}
                                </Text>
                            </View>
                            
                            <Text style={[styles.previewDetails, darkMode && styles.textDarkGray]}>
                                {getFormattedDatePreview()} {time} (60m)
                            </Text>
                        </View>
                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity 
                            style={[styles.btnOutline, darkMode && styles.btnOutlineDark]} 
                            onPress={() => router.back()}
                        >
                            <Text style={[styles.btnOutlineText, darkMode && styles.textDark]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
                            <Feather name="save" size={18} color="#FFF" style={{marginRight: 8}} />
                            <Text style={styles.btnPrimaryText}>Salvar</Text>
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
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { padding: 24, paddingTop: 10 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backButton: { marginRight: 15, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C398E' },

  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },
  cardDark: { backgroundColor: '#1E1E1E' },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#364153', marginBottom: 8, fontWeight: '400' },
  
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: '#F3F3F5', borderWidth: 1.35, borderColor: '#BEDBFF', borderRadius: 14, paddingHorizontal: 12 },
  inputBoxDark: { backgroundColor: '#333', borderColor: '#555' },
  
  input: { flex: 1, fontSize: 16, color: '#364153' },
  inputTextValue: { fontSize: 16, color: '#364153' },
  
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  projectDot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },

  previewContainer: { marginBottom: 30 },
  previewBox: { backgroundColor: '#F9FAFB', borderRadius: 14, padding: 16, minHeight: 80, justifyContent: 'center' },
  previewTag: { backgroundColor: '#193CB8', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 8, maxWidth: '100%' },
  previewTagText: { color: '#FFFFFF', fontSize: 12, fontWeight: '500' },
  previewDetails: { fontSize: 12, color: '#6A7282' },

  footerButtons: { flexDirection: 'row', gap: 12 },
  btnOutline: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.35, borderColor: '#E5E7EB', backgroundColor: '#F8FAFF', justifyContent: 'center', alignItems: 'center' },
  btnOutlineDark: { backgroundColor: 'transparent', borderColor: '#555' },
  btnOutlineText: { color: '#0A0A0A', fontWeight: '500', fontSize: 14 },
  
  btnPrimary: { flex: 1, height: 48, borderRadius: 14, backgroundColor: '#193CB8', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '500', fontSize: 14 },

  containerDark: { backgroundColor: '#121212' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
});