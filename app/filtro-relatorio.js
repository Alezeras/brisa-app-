import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSettings } from '../context/ConfigContext';

const { width } = Dimensions.get('window');

export default function FilterReportsScreen() {
  const { darkMode, fontSize } = useSettings();
  
  const [selectedPeriod, setSelectedPeriod] = useState('Esta semana');
  const periods = ['Esta semana', 'Este mês', 'Último trimestre', 'Este ano'];

  const initialActivities = [
    { id: 1, name: 'Atividade', color: '#193CB8', time: '00h 00m', sessions: 0, selected: false },
    { id: 2, name: 'Desenvolvimento', color: '#72BA49', time: '00h 00m', sessions: 0, selected: false },
    { id: 3, name: 'Review', color: '#6F2CBB', time: '00h 00m', sessions: 0, selected: true }, 
    { id: 4, name: 'Daily', color: '#FF860E', time: '00h 00m', sessions: 0, selected: true },
    { id: 5, name: 'Planejamento', color: '#6F2CBB', time: '00h 00m', sessions: 0, selected: false },
    { id: 6, name: 'Testes', color: '#E22BE2', time: '00h 00m', sessions: 0, selected: false },
    { id: 7, name: 'Deploy', color: '#E22B4C', time: '00h 00m', sessions: 0, selected: false },
  ];

  const [activitiesList, setActivitiesList] = useState(initialActivities);

  const toggleActivity = (id) => {
    setActivitiesList(currentList => 
      currentList.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = () => {
    const allSelected = activitiesList.every(item => item.selected);
    setActivitiesList(currentList => 
      currentList.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const selectedCount = activitiesList.filter(a => a.selected).length;

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filtrar por atividade</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.sectionHeader}>
            <Feather name="calendar" size={18} color="#4A5565" style={darkMode && styles.iconDark} />
            <Text style={[styles.sectionTitle, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                Período
            </Text>
        </View>

        <View style={styles.periodGrid}>
            {periods.map((period) => (
                <TouchableOpacity 
                    key={period}
                    style={[
                        styles.periodButton, 
                        selectedPeriod === period && styles.periodButtonActive,
                        darkMode && styles.periodButtonDark
                    ]}
                    onPress={() => setSelectedPeriod(period)}
                >
                    <Text style={[
                        styles.periodText, 
                        selectedPeriod === period && styles.periodTextActive,
                        darkMode && styles.textDark
                    ]}>
                        {period}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={{height: 20}} />

        <View style={[styles.listCard, darkMode && styles.cardDark]}>
            
            <View style={styles.listHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name="filter" size={16} color="#9CA3AF" />
                    <Text style={[styles.listTitle, darkMode && styles.textDark]}>Tipos de Atividade</Text>
                </View>
                <TouchableOpacity onPress={toggleAll}>
                    <Text style={styles.markAllText}>Marcar todos</Text>
                </TouchableOpacity>
            </View>

            {activitiesList.map((item) => (
                <TouchableOpacity 
                    key={item.id} 
                    style={styles.listItem}
                    onPress={() => toggleActivity(item.id)}
                >
                    <View style={styles.itemLeft}>
                        <View style={[
                            styles.checkbox, 
                            item.selected && styles.checkboxSelected
                        ]}>
                            {item.selected && <Ionicons name="checkmark" size={12} color="#FFF" />}
                        </View>

                        <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                        
                        <Text style={[styles.itemName, darkMode && styles.textDark, { fontSize: fontSize }]}>
                            {item.name}
                        </Text>
                    </View>

                    <View style={styles.itemRight}>
                        <Text style={[styles.itemTime, darkMode && styles.textDark]}>{item.time}</Text>
                        <Text style={styles.itemSessions}>{item.sessions} sessões</Text>
                    </View>
                </TouchableOpacity>
            ))}

        </View>

      </ScrollView>

      <SafeAreaView style={[styles.footer, darkMode && styles.footerDark]}>
         
         <View style={styles.footerInfo}>
             <Ionicons name="checkmark-circle-outline" size={20} color="#72BA49" />
             <Text style={[styles.footerInfoText, darkMode && styles.textDark]}>
                {selectedCount} Atividades selecionadas
             </Text>
         </View>

         <View style={styles.footerButtons}>
             <TouchableOpacity 
                style={[styles.footerBtn, styles.btnOutline]}
                onPress={() => router.back()}
             >
                <Text style={styles.btnOutlineText}>Voltar</Text>
             </TouchableOpacity>

             <TouchableOpacity 
                style={[styles.footerBtn, styles.btnPrimary]}
                onPress={() => {
                    router.back();
                }}
             >
                <Feather name="filter" size={16} color="#FFF" style={{marginRight: 8}} />
                <Text style={styles.btnPrimaryText}>Aplicar Filtro</Text>
             </TouchableOpacity>
         </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  
  headerBlue: {
    backgroundColor: '#1E40AF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? 35 : 10,
    zIndex: 10,
  },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 150, 
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5565',
    marginLeft: 10,
  },
  periodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  periodButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  periodButtonDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  periodButtonActive: {
    borderColor: '#193CB8',
  },
  periodText: {
    color: '#4A5565',
    fontSize: 14,
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#193CB8',
    fontWeight: 'bold',
  },

  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  markAllText: {
    fontSize: 12,
    color: '#193CB8',
    fontWeight: '600',
  },
  
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxSelected: {
    backgroundColor: '#193CB8', 
    borderColor: '#193CB8',
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#4A5565',
    fontWeight: '500',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemTime: {
    fontSize: 12,
    color: '#4A5565',
    fontWeight: 'bold',
  },
  itemSessions: {
    fontSize: 10,
    color: '#9CA3AF',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    padding: 20,
  },
  footerDark: { backgroundColor: '#1E1E1E' },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  footerInfoText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5565',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  footerBtn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnOutlineText: {
    color: '#4A5565',
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: '#193CB8',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  textDark: { color: '#E0E0E0' },
  iconDark: { color: '#E0E0E0' },
});