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

export default function ReportsScreen() {
  const { darkMode, fontSize } = useSettings();
  const [selectedTab, setSelectedTab] = useState('Semana'); 

  const projectData = [
    { id: 1, name: 'Projeto 1', time: '00h 00m', percent: 0, color: '#193CB8' },
    { id: 2, name: 'Projeto 2', time: '00h 00m', percent: 0, color: '#193CB8' },
    { id: 3, name: 'Projeto 3', time: '00h 00m', percent: 0, color: '#193CB8' },
    { id: 4, name: 'Projeto 4', time: '00h 00m', percent: 0, color: '#193CB8' },
  ];

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Relatórios</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.pageTitleRow}>
            <Text style={[styles.sectionTitle, darkMode && styles.textDark, { fontSize: fontSize + 4 }]}>
                Relatórios
            </Text>
            <TouchableOpacity 
                style={styles.filterButton}
                onPress={() => router.push('/filtro-relatorio')} 
            >
                <Feather name="filter" size={14} color="#4A5565" />
                <Text style={styles.filterText}>Por atividade</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.tabsContainer, darkMode && styles.tabsContainerDark]}>
            {['Hoje', 'Semana', 'Mês'].map((tab) => (
                <TouchableOpacity 
                    key={tab} 
                    style={[styles.tabItem, selectedTab === tab && styles.tabItemActive]}
                    onPress={() => setSelectedTab(tab)}
                >
                    <Text style={[
                        styles.tabText, 
                        selectedTab === tab && styles.tabTextActive,
                        darkMode && selectedTab !== tab && styles.textDark
                    ]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.cardsRow}>
            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Tempo Total</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>00h 00m</Text>
                <Feather name="clock" size={20} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Projetos</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>0</Text>
                <Feather name="trending-up" size={20} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>
        </View>

        <View style={[styles.bigCard, darkMode && styles.cardDark]}>
            <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Produtividade</Text>
            <View style={styles.productivityRow}>
                <Text style={[styles.subLabel, darkMode && styles.textDarkGray]}>Esta semana</Text>
                <Text style={[styles.subLabel, darkMode && styles.textDarkGray]}>00%</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '0%' }]} />
            </View>
        </View>

        <View style={[styles.bigCard, darkMode && styles.cardDark]}>
            <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Tempo por Projeto</Text>
            {projectData.map((project) => (
                <View key={project.id} style={styles.projectRow}>
                    <View style={styles.projectHeader}>
                        <Text style={[styles.projectName, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>{project.name}</Text>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={[styles.projectTime, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>{project.time}</Text>
                            <Text style={[styles.projectPercent, darkMode && styles.textDarkGray]}>{project.percent}%</Text>
                        </View>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${project.percent}%` }]} />
                    </View>
                </View>
            ))}
        </View>

        <View style={styles.cardsRow}>
            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Média Diária</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>00h 00m</Text>
                <Feather name="bar-chart-2" size={24} color="#000" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Meta Mensal</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>000h</Text>
                <Feather name="target" size={24} color="#000" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>
        </View>

        <View style={{height: 40}} /> 
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  backText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: 30, 
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  pageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5565',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4A5565',
  },

  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  tabsContainerDark: { backgroundColor: '#333' },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#4A5565',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%', 
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    height: 120, 
  },
  statLabel: {
    fontSize: 12,
    color: '#4A5565',
    marginBottom: 10,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5565',
    marginBottom: 10,
  },
  statIcon: {
    marginTop: 5,
  },

  bigCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5565',
    marginBottom: 15,
  },
  productivityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: '#F3F3F5',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#193CB8',
    borderRadius: 4,
  },

  projectRow: {
    marginBottom: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  projectName: {
    fontSize: 12,
    color: '#4A5565',
    fontWeight: '500',
  },
  projectTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A5565',
  },
  projectPercent: {
    fontSize: 10,
    color: '#9CA3AF',
  },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  iconDark: { color: '#E0E0E0' },
});