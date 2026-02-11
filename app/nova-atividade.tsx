import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';

export default function NovaAtividadeScreen() {
  const router = useRouter();
  const { darkMode, addActivity } = useAppStore();
  const [nome, setNome] = useState('');
  const [projeto, setProjeto] = useState('Brisa'); 
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'));
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [duracaoMinutos, setDuracaoMinutos] = useState('60');

  const handleSave = () => {
    if (!nome.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, digite o nome da atividade.");
      return;
    }

    let horaFinal = '10:00'; 
    try {
        const [h, m] = horaInicio.split(':').map(Number);
        const duracao = Number(duracaoMinutos);
        const totalMinutos = h * 60 + m + duracao;
        const fimH = Math.floor(totalMinutos / 60) % 24;
        const fimM = totalMinutos % 60;
        horaFinal = `${fimH.toString().padStart(2, '0')}:${fimM.toString().padStart(2, '0')}`;
    } catch (e) {}

    addActivity({
        title: nome,
        date: data,
        startTime: horaInicio,
        endTime: horaFinal,
        duration: Number(duracaoMinutos) * 60,
        type: 'manual', 
        projectId: projeto
    });

    Alert.alert("Sucesso", "Atividade salva com sucesso!", [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nova Atividade</Text>
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            <View style={[styles.card, darkMode && styles.cardDark]}>
                
                <Text style={[styles.inputLabel, darkMode && styles.textDark]}>Nome da Atividade</Text>
                <View style={[styles.inputContainer, darkMode && styles.inputDark]}>
                    <Feather name="edit-3" size={20} color="#94A3B8" style={{marginRight: 10}} />
                    <TextInput 
                        style={[styles.input, darkMode && styles.textDark]} 
                        placeholder="Ex: Reunião de Design"
                        placeholderTextColor="#94A3B8"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <Text style={[styles.inputLabel, darkMode && styles.textDark]}>Projeto</Text>
                <View style={[styles.inputContainer, darkMode && styles.inputDark]}>
                    <Feather name="folder" size={20} color="#94A3B8" style={{marginRight: 10}} />
                    <TextInput 
                        style={[styles.input, darkMode && styles.textDark]} 
                        placeholder="Ex: Brisa App"
                        placeholderTextColor="#94A3B8"
                        value={projeto}
                        onChangeText={setProjeto}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={[styles.inputLabel, darkMode && styles.textDark]}>Data</Text>
                        <View style={[styles.inputContainer, darkMode && styles.inputDark]}>
                            <Feather name="calendar" size={18} color="#94A3B8" style={{marginRight: 8}} />
                            <TextInput 
                                style={[styles.input, darkMode && styles.textDark]} 
                                value={data}
                                onChangeText={setData}
                                keyboardType="numbers-and-punctuation"
                                placeholder="DD/MM/AAAA"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>
                    <View style={styles.col}>
                        <Text style={[styles.inputLabel, darkMode && styles.textDark]}>Início</Text>
                        <View style={[styles.inputContainer, darkMode && styles.inputDark]}>
                            <Feather name="clock" size={18} color="#94A3B8" style={{marginRight: 8}} />
                            <TextInput 
                                style={[styles.input, darkMode && styles.textDark]} 
                                value={horaInicio}
                                onChangeText={setHoraInicio}
                                keyboardType="numbers-and-punctuation"
                                placeholder="00:00"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>
                </View>

                <Text style={[styles.inputLabel, darkMode && styles.textDark]}>Duração (minutos)</Text>
                <View style={[styles.inputContainer, darkMode && styles.inputDark]}>
                    <Feather name="watch" size={20} color="#94A3B8" style={{marginRight: 10}} />
                    <TextInput 
                        style={[styles.input, darkMode && styles.textDark]} 
                        value={duracaoMinutos}
                        onChangeText={setDuracaoMinutos}
                        keyboardType="numeric"
                        placeholder="60"
                        placeholderTextColor="#94A3B8"
                    />
                </View>

                <View style={[styles.previewBox, darkMode && styles.previewBoxDark]}>
                    <Text style={styles.previewTitle}>Resumo</Text>
                    <Text style={[styles.previewText, darkMode && styles.textDark]}>
                        {nome || "Nova Atividade"} • {projeto}
                    </Text>
                    <Text style={styles.previewSub}>
                        {data} às {horaInicio} ({duracaoMinutos} min)
                    </Text>
                </View>

            </View>

        </ScrollView>

        <View style={[styles.footer, darkMode && styles.footerDark]}>
            <TouchableOpacity style={[styles.btnCancel, darkMode && styles.btnCancelDark]} onPress={() => router.back()}>
                <Text style={[styles.btnCancelText, darkMode && styles.textDark]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                <Text style={styles.btnSaveText}>Salvar</Text>
            </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  headerBlue: { backgroundColor: '#1E40AF', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: 30, paddingTop: Platform.OS === 'android' ? 35 : 10, height: 140, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 20, zIndex: 10 },
  backText: { color: '#FFF', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', marginLeft: 30 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 110, paddingBottom: 100 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8, marginTop: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 15, height: 50 },
  input: { flex: 1, fontSize: 16, color: '#1E293B' },
  row: { flexDirection: 'row', gap: 15 },
  col: { flex: 1 },
  previewBox: { marginTop: 30, padding: 15, backgroundColor: '#EFF6FF', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#1E40AF' },
  previewTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E40AF', textTransform: 'uppercase', marginBottom: 4 },
  previewText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  previewSub: { fontSize: 14, color: '#64748B' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', padding: 20, borderTopWidth: 1, borderTopColor: '#E2E8F0', flexDirection: 'row', gap: 15 },
  btnCancel: { flex: 1, paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  btnCancelText: { fontSize: 16, fontWeight: '600', color: '#64748B' },
  btnSave: { flex: 1, paddingVertical: 15, borderRadius: 12, backgroundColor: '#1E40AF', alignItems: 'center', justifyContent: 'center', shadowColor: '#1E40AF', shadowOpacity: 0.3, elevation: 4 },
  btnSaveText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  containerDark: { backgroundColor: '#0F172A' },
  cardDark: { backgroundColor: '#1E293B' },
  inputDark: { backgroundColor: '#334155', borderColor: '#475569' },
  textDark: { color: '#F1F5F9' },
  previewBoxDark: { backgroundColor: 'rgba(30, 64, 175, 0.2)' },
  footerDark: { backgroundColor: '#1E293B', borderTopColor: '#334155' },
  btnCancelDark: { borderColor: '#475569' },
});