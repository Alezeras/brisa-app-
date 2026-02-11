import React, { useState, useEffect } from 'react';
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

export default function AddTimeScreen() {
  const { darkMode, fontSize, addActivity } = useAppStore();

  const [name, setName] = useState('');
  
  const [date, setDate] = useState(() => {
      const now = new Date();
      const d = String(now.getDate()).padStart(2, '0');
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const y = now.getFullYear();
      return `${d}/${m}/${y}`;
  });
  
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [durationText, setDurationText] = useState('1h 0m');
  const [realDurationSeconds, setRealDurationSeconds] = useState(3600);

  useEffect(() => {
    const calculateTime = () => {
        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);

        if (isNaN(startH) || isNaN(endH)) return;

        const start = new Date(0, 0, 0, startH, startM || 0, 0);
        const end = new Date(0, 0, 0, endH, endM || 0, 0);

        let diffMs = end.getTime() - start.getTime();
        
        if (diffMs < 0) {
            diffMs += 24 * 60 * 60 * 1000;
        }

        const diffSeconds = diffMs / 1000;
        const diffMinutes = diffSeconds / 60;
        
        const hours = Math.floor(diffMinutes / 60);
        const minutes = Math.floor(diffMinutes % 60);

        setDurationText(`${hours}h ${minutes}m`);
        setRealDurationSeconds(diffSeconds);
    };

    calculateTime();
  }, [startTime, endTime]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Atenção", "Digite o nome da atividade.");
      return;
    }
    
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
        Alert.alert("Data Inválida", "Use o formato DD/MM/AAAA (ex: 05/02/2026)");
        return;
    }

    addActivity({
      title: name,
      date: date, 
      startTime: startTime,
      endTime: endTime,
      duration: realDurationSeconds, 
      type: 'manual',
      color: '#193CB8'
    });

    Alert.alert("Sucesso", "Atividade adicionada!", [
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
                        <Text style={[styles.title, darkMode && styles.textDark]}>Nova Atividade</Text>
                    </View>

                    <View style={styles.formContent}>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Nome da Atividade</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="type" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    placeholder="Ex: Reunião"
                                    placeholderTextColor="#99A1AF"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Data (DD/MM/AAAA)</Text>
                            <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                <Feather name="calendar" size={18} color="#99A1AF" style={{marginRight: 10}} />
                                <TextInput 
                                    style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}
                                    value={date}
                                    onChangeText={setDate}
                                    keyboardType="numbers-and-punctuation"
                                    placeholder="DD/MM/AAAA"
                                    placeholderTextColor="#99A1AF"
                                    maxLength={10}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Horário</Text>
                                <View style={[styles.inputBox, darkMode && styles.inputBoxDark]}>
                                    <TextInput 
                                        style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2, textAlign: 'center' }]}
                                        value={startTime}
                                        onChangeText={setStartTime}
                                        maxLength={5}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder="09:00"
                                    />
                                    <Text style={{color:'#99A1AF', marginHorizontal: 5}}>-</Text>
                                    <TextInput 
                                        style={[styles.input, darkMode && styles.textDark, { fontSize: fontSize + 2, textAlign: 'center' }]}
                                        value={endTime}
                                        onChangeText={setEndTime}
                                        maxLength={5}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder="10:00"
                                    />
                                </View>
                            </View>

                            <View style={{width: 100}}>
                                <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Duração</Text>
                                <View style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'center', backgroundColor: darkMode ? '#2C2C2C' : '#EAEAEA' }]}>
                                    <Text style={[styles.inputText, darkMode && styles.textDark, { fontWeight: 'bold' }]}>{durationText}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Projeto</Text>
                            <TouchableOpacity style={[styles.inputBox, darkMode && styles.inputBoxDark, { justifyContent: 'space-between' }]}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.projectDot} />
                                    <Text style={[styles.inputText, darkMode && styles.textDark, { marginLeft: 8 }]}>Brisa</Text>
                                </View>
                                <Feather name="chevron-down" size={18} color="#99A1AF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.previewContainer}>
                            <Text style={[styles.label, darkMode && styles.textDark, { fontSize: fontSize }]}>Visualização</Text>
                            <View style={[styles.previewBox, darkMode && styles.cardDark]}>
                                <View style={styles.previewTag}>
                                    <Text style={styles.previewTagText} numberOfLines={1}>
                                        {name || "Nome da atividade"}
                                    </Text>
                                </View>
                                <Text style={[styles.previewDate, darkMode && styles.textDarkGray]}>
                                    {date} • {startTime} às {endTime}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={[styles.btnCancel, darkMode && styles.btnCancelDark]} onPress={() => router.back()}>
                            <Text style={[styles.btnCancelText, darkMode && styles.textDark]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                            <Ionicons name="checkmark" size={18} color="#FFF" style={{marginRight: 5}} />
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6', 
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C398E', 
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
  },
  formContent: {
    gap: 20,
    marginBottom: 30,
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#364153', 
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F3F3F5',
    borderWidth: 1.35,
    borderColor: '#BEDBFF', 
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#0A0A0A',
    height: '100%',
  },
  inputText: {
    fontSize: 14,
    color: '#0A0A0A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#193CB8',
  },
  previewContainer: {
    marginTop: 10,
  },
  previewBox: {
    height: 84,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 16,
    justifyContent: 'center',
  },
  previewTag: {
    backgroundColor: '#193CB8',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    opacity: 0.9,
  },
  previewTagText: {
    color: '#FFF',
    fontSize: 12,
  },
  previewDate: {
    fontSize: 12,
    color: '#6A7282',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    height: 48,
    backgroundColor: '#F8FAFF',
    borderWidth: 1.35,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center', },
  btnCancelText: { color: '#0A0A0A', fontWeight: '500', },
  btnSave: { flex: 1, height: 48, backgroundColor: '#193CB8', borderRadius: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',},
  btnSaveText: { color: '#FFFFFF',fontWeight: '500',},
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  inputBoxDark: { backgroundColor: '#333', borderColor: '#555' },
  btnCancelDark: { backgroundColor: '#333', borderColor: '#555' },
});