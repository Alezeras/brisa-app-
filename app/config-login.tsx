import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

export default function SettingsScreen() {
  const { 
    darkMode, 
    toggleDarkMode, 
    fontSize, 
    cycleFontSize, 
    getFontSizeLabel 
  } = useAppStore();

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      <SafeAreaView style={{ flex: 1 }}>
        
        <View style={[styles.header, darkMode && styles.headerDark]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={darkMode ? "#FFF" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.title, darkMode && styles.textDark]}>Configurações</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          
          <Text style={styles.sectionTitle}>Aparência</Text>

          <View style={[styles.optionRow, darkMode && styles.optionRowDark]}>
            <View style={styles.optionLeft}>
              <Feather name="moon" size={24} color={darkMode ? "#FFF" : "#4A5565"} />
              <Text style={[styles.optionText, darkMode && styles.textDark, { fontSize: fontSize }]}>Modo Escuro</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#E5E7EB", true: "#193CB8" }}
              thumbColor={"#FFF"}
            />
          </View>

          <TouchableOpacity style={[styles.optionRow, darkMode && styles.optionRowDark]} onPress={cycleFontSize}>
            <View style={styles.optionLeft}>
              <Feather name="type" size={24} color={darkMode ? "#FFF" : "#4A5565"} />
              <Text style={[styles.optionText, darkMode && styles.textDark, { fontSize: fontSize }]}>Tamanho da Fonte</Text>
            </View>
            <View style={styles.valueBadge}>
              <Text style={styles.valueText}>
                {getFontSizeLabel ? getFontSizeLabel() : 'Médio'}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Sobre e Legal</Text>

          <TouchableOpacity 
            style={[styles.optionRow, darkMode && styles.optionRowDark]} 
            onPress={() => router.push('/politica')} 
          >
            <View style={styles.optionLeft}>
              <Feather name="shield" size={24} color={darkMode ? "#FFF" : "#4A5565"} />
              <Text style={[styles.optionText, darkMode && styles.textDark, { fontSize: fontSize }]}>Política de Privacidade</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#99A1AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionRow, darkMode && styles.optionRowDark]} 
            onPress={() => router.push('/termos-uso')}
          >
            <View style={styles.optionLeft}>
              <Feather name="file-text" size={24} color={darkMode ? "#FFF" : "#4A5565"} />
              <Text style={[styles.optionText, darkMode && styles.textDark, { fontSize: fontSize }]}>Termos de Uso</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#99A1AF" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={{ color: '#99A1AF', fontSize: 12 }}>Versão 1.0.0 (Brisa)</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  headerDark: { backgroundColor: '#121212' },
  backButton: { marginRight: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#101828' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#99A1AF', marginBottom: 10, marginTop: 10, textTransform: 'uppercase' },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  optionText: { color: '#101828', fontWeight: '500' },
  valueBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  valueText: { color: '#4A5565', fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 10 },
  containerDark: { backgroundColor: '#121212' },
  textDark: { color: '#E0E0E0' },
  optionRowDark: { backgroundColor: '#1E1E1E' }
});