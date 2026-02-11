import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

interface ProjectData {
  id: string;
  name: string;
  seconds: number;
  percent: number;
  color: string;
}

export default function ReportsScreen() {
  const { darkMode, fontSize, activities } = useAppStore();
  
  const [selectedTab, setSelectedTab] = useState<'Hoje' | 'Semana' | 'Mês'>('Semana'); 
  const [stats, setStats] = useState({
    totalSeconds: 0,
    projectCount: 0,
    dailyAverage: 0,
    projects: [] as ProjectData[]
  });

  useEffect(() => {
    const now = new Date();
    const filteredActivities = activities.filter(activity => {
        const actDateParts = activity.date.split('/'); 
        const actDate = new Date(
            parseInt(actDateParts[2]), 
            parseInt(actDateParts[1]) - 1, 
            parseInt(actDateParts[0])
        );

        if (selectedTab === 'Hoje') {
            return actDate.toDateString() === now.toDateString();
        } else if (selectedTab === 'Semana') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return actDate >= oneWeekAgo && actDate <= now;
        } else { 
            return actDate.getMonth() === now.getMonth() && actDate.getFullYear() === now.getFullYear();
        }
    });

    const totalSeconds = filteredActivities.reduce((acc, curr) => acc + curr.duration, 0);
    const uniqueProjects = new Set(filteredActivities.map(a => a.projectId || 'Geral'));
    const projectMap: Record<string, number> = {};
    filteredActivities.forEach(a => {
        const pName = a.projectId || 'Geral';
        projectMap[pName] = (projectMap[pName] || 0) + a.duration;
    });

    const calculatedProjects: ProjectData[] = Object.keys(projectMap).map((name, index) => ({
        id: name,
        name,
        seconds: projectMap[name],
        percent: totalSeconds > 0 ? Math.round((projectMap[name] / totalSeconds) * 100) : 0,
        color: '#193CB8' 
    })).sort((a, b) => b.seconds - a.seconds); 

    const daysDivisor = selectedTab === 'Hoje' ? 1 : selectedTab === 'Semana' ? 7 : now.getDate();
    const avgSeconds = totalSeconds / daysDivisor;

    setStats({
        totalSeconds,
        projectCount: uniqueProjects.size,
        dailyAverage: avgSeconds,
        projects: calculatedProjects
    });

  }, [activities, selectedTab]);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const handleDownloadReport = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Helvetica, sans-serif; padding: 20px; }
            h1 { color: #1E40AF; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Relatório Brisa - ${selectedTab}</h1>
          <p><strong>Tempo Total:</strong> ${formatDuration(stats.totalSeconds)}</p>
          <p><strong>Projetos Ativos:</strong> ${stats.projectCount}</p>
          
          <h2>Detalhes por Projeto</h2>
          <table>
            <tr>
              <th>Projeto</th>
              <th>Tempo</th>
              <th>%</th>
            </tr>
            ${stats.projects.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${formatDuration(p.seconds)}</td>
                <td>${p.percent}%</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o relatório.");
    }
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
                Resumo de Atividades
            </Text>
            <TouchableOpacity style={styles.filterButton}>
                <Feather name="filter" size={14} color="#4A5565" />
                <Text style={styles.filterText}>Por atividade</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.tabsContainer, darkMode && styles.tabsContainerDark]}>
            {(['Hoje', 'Semana', 'Mês'] as const).map((tab) => (
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
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                    {formatDuration(stats.totalSeconds)}
                </Text>
                <Feather name="clock" size={20} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Projetos</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                    {stats.projectCount}
                </Text>
                <Feather name="folder" size={20} color="#4A5565" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>
        </View>

        <View style={[styles.bigCard, darkMode && styles.cardDark]}>
            <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Produtividade</Text>
            <View style={styles.productivityRow}>
                <Text style={[styles.subLabel, darkMode && styles.textDarkGray]}>Meta (exemplo)</Text>
                <Text style={[styles.subLabel, darkMode && styles.textDarkGray]}>
                   {Math.min(100, Math.round((stats.totalSeconds / (8 * 3600)) * 100))}%
                </Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${Math.min(100, (stats.totalSeconds / (8 * 3600)) * 100)}%` }]} />
            </View>
        </View>

        <View style={[styles.bigCard, darkMode && styles.cardDark]}>
            <Text style={[styles.cardTitle, darkMode && styles.textDark, { fontSize: fontSize }]}>Tempo por Projeto</Text>
            {stats.projects.length === 0 ? (
                <Text style={{color: '#999', textAlign: 'center', marginVertical: 10}}>Sem dados no período.</Text>
            ) : (
                stats.projects.map((project) => (
                    <View key={project.id} style={styles.projectRow}>
                        <View style={styles.projectHeader}>
                            <Text style={[styles.projectName, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>{project.name}</Text>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={[styles.projectTime, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>
                                    {formatDuration(project.seconds)}
                                </Text>
                                <Text style={[styles.projectPercent, darkMode && styles.textDarkGray]}>{project.percent}%</Text>
                            </View>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${project.percent}%`, backgroundColor: project.color }]} />
                        </View>
                    </View>
                ))
            )}
        </View>

        <View style={styles.cardsRow}>
            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Média Diária</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                    {formatDuration(stats.dailyAverage)}
                </Text>
                <Feather name="bar-chart-2" size={24} color="#000" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>

            <View style={[styles.statCard, darkMode && styles.cardDark]}>
                <Text style={[styles.statLabel, darkMode && styles.textDark, { fontSize: fontSize - 2 }]}>Atividades</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                    {activities.length} 
                </Text>
                <Feather name="list" size={24} color="#000" style={[styles.statIcon, darkMode && styles.iconDark]} />
            </View>
        </View>
        
        <TouchableOpacity 
            style={[styles.downloadButton, darkMode && styles.downloadButtonDark]} 
            onPress={handleDownloadReport}
        >
            <Feather name="download" size={20} color="#FFF" style={{marginRight: 10}} />
            <Text style={styles.downloadText}>Baixar Relatório PDF</Text>
        </TouchableOpacity>

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
  scrollContent: { padding: 20, paddingBottom: 50 },
  pageTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5565' },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F3F5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  filterText: { marginLeft: 5, fontSize: 12, color: '#4A5565' },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#F3F3F5', borderRadius: 10, padding: 4, marginBottom: 20 },
  tabsContainerDark: { backgroundColor: '#333' },
  tabItem: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabItemActive: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2 },
  tabText: { fontSize: 12, color: '#4A5565', fontWeight: '500' },
  tabTextActive: { color: '#1E40AF', fontWeight: 'bold' },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, height: 120 },
  statLabel: { fontSize: 12, color: '#4A5565', marginBottom: 10, textAlign: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#4A5565', marginBottom: 10 },
  statIcon: { marginTop: 5 },
  bigCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: '500', color: '#4A5565', marginBottom: 15 },
  productivityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  subLabel: { fontSize: 12, color: '#6B7280' },
  progressBarBackground: { height: 8, backgroundColor: '#F3F3F5', borderRadius: 4, width: '100%', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#193CB8', borderRadius: 4 },
  projectRow: { marginBottom: 20 },
  projectHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 5 },
  projectName: { fontSize: 12, color: '#4A5565', fontWeight: '500' },
  projectTime: { fontSize: 12, fontWeight: 'bold', color: '#4A5565' },
  projectPercent: { fontSize: 10, color: '#9CA3AF' },
  downloadButton: { flexDirection: 'row', backgroundColor: '#193CB8', paddingVertical: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#193CB8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, elevation: 5 },
  downloadButtonDark: { backgroundColor: '#152C70' },
  downloadText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
  iconDark: { color: '#E0E0E0' },
});