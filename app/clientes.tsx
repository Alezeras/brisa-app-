import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function ClientesScreen() {
  const router = useRouter();
  
  const { 
    darkMode, 
    fontSize, 
    clients, 
    activities, 
    fetchClients 
  } = useAppStore();

  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'hours'>('name'); 

  useEffect(() => {
    fetchClients();
  }, []);

  const getClientHours = (clientName: string) => {
    const clientActivities = activities.filter(a => 
        a.projectId?.toLowerCase() === clientName.toLowerCase()
    );
    const totalSeconds = clientActivities.reduce((acc, curr) => acc + curr.duration, 0);
    return Math.floor(totalSeconds / 3600);
  };

  const totalGeneralSeconds = activities.reduce((acc, curr) => acc + curr.duration, 0);
  const totalGeneralHours = Math.floor(totalGeneralSeconds / 3600);

  
  const filteredClients = clients
    .filter(client => 
        client.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name); // A-Z
        } else {
            return getClientHours(b.name) - getClientHours(a.name); 
        }
    });

  const renderItem = ({ item }: { item: any }) => {
    const hours = getClientHours(item.name);
    
    return (
      <TouchableOpacity 
        style={[styles.clientCard, darkMode && styles.cardDark]}
        onPress={() => Alert.alert("Detalhes", `Cliente: ${item.name}\nTotal: ${hours} horas`)}
      >
        <View style={styles.clientHeader}>
            <Text style={[styles.clientName, darkMode && styles.textDark, { fontSize: fontSize + 2 }]}>
                {item.name}
            </Text>
            {item.favorite && <Ionicons name="star" size={16} color="#E3A008" />}
        </View>
        
        <View style={styles.clientStats}>
            <View>
                <Text style={styles.statLabel}>Projetos</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>
                    {activities.filter(a => a.projectId === item.name).length}
                </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.statLabel}>Horas</Text>
                <Text style={[styles.statValue, darkMode && styles.textDark]}>
                    {hours}h
                </Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Clientes</Text>
            
            <TouchableOpacity onPress={() => router.push('/add-cliente')} style={styles.addButtonHeader}>
               <Feather name="plus" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.contentContainer}>
        
        <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, darkMode && styles.cardDark]}>
                <Text style={styles.summaryLabel}>Clientes</Text>
                <Text style={[styles.summaryValue, darkMode && styles.textDark]}>{clients.length}</Text>
            </View>
            <View style={[styles.summaryCard, darkMode && styles.cardDark]}>
                <Text style={styles.summaryLabel}>Total de Horas</Text>
                <Text style={[styles.summaryValue, darkMode && styles.textDark]}>{totalGeneralHours}h</Text>
            </View>
        </View>

        <View style={styles.searchRow}>
            <View style={[styles.searchBar, darkMode && styles.inputDark]}>
                <Feather name="search" size={20} color="#94A3B8" />
                <TextInput 
                    style={[styles.searchInput, darkMode && styles.textDark]}
                    placeholder="Buscar clientes..."
                    placeholderTextColor="#94A3B8"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            
            <TouchableOpacity 
                style={[styles.filterButton, darkMode && styles.cardDark]} 
                onPress={() => setFilterModalVisible(true)}
            >
                <Feather name="filter" size={20} color="#4A5565" style={darkMode && styles.textDark} />
                <Text style={[styles.filterText, darkMode && styles.textDark]}>Filtrar</Text>
            </TouchableOpacity>
        </View>

        <FlatList 
            data={filteredClients}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyText, darkMode && styles.textDarkGray]}>Nenhum cliente encontrado.</Text>
                </View>
            }
        />

        <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <TouchableOpacity 
                style={styles.modalOverlay} 
                activeOpacity={1} 
                onPress={() => setFilterModalVisible(false)}
            >
                <View style={[styles.modalContent, darkMode && styles.cardDark]}>
                    <Text style={[styles.modalTitle, darkMode && styles.textDark]}>Ordenar por</Text>
                    
                    <TouchableOpacity 
                        style={styles.modalOption} 
                        onPress={() => { setSortBy('name'); setFilterModalVisible(false); }}
                    >
                        <Feather name="type" size={20} color={sortBy === 'name' ? "#1E40AF" : "#64748B"} />
                        <Text style={[
                            styles.modalOptionText, 
                            darkMode && styles.textDark,
                            sortBy === 'name' && { color: '#1E40AF', fontWeight: 'bold' }
                        ]}>Nome (A-Z)</Text>
                        {sortBy === 'name' && <Feather name="check" size={20} color="#1E40AF" />}
                    </TouchableOpacity>

                    <View style={[styles.divider, darkMode && styles.dividerDark]} />

                    <TouchableOpacity 
                        style={styles.modalOption} 
                        onPress={() => { setSortBy('hours'); setFilterModalVisible(false); }}
                    >
                        <Feather name="clock" size={20} color={sortBy === 'hours' ? "#1E40AF" : "#64748B"} />
                        <Text style={[
                            styles.modalOptionText, 
                            darkMode && styles.textDark,
                            sortBy === 'hours' && { color: '#1E40AF', fontWeight: 'bold' }
                        ]}>Mais Horas Trabalhadas</Text>
                        {sortBy === 'hours' && <Feather name="check" size={20} color="#1E40AF" />}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.modalCloseButton} 
                        onPress={() => setFilterModalVisible(false)}
                    >
                        <Text style={styles.modalCloseText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>

      </View>

      <TouchableOpacity 
            style={styles.fab} 
            onPress={() => router.push('/add-cliente')}
      >
            <Feather name="plus" size={30} color="#FFF" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerBlue: { backgroundColor: '#1E40AF', paddingBottom: 20, paddingTop: Platform.OS === 'android' ? 35 : 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 20, zIndex: 10 },
  backText: { color: '#FFF', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  addButtonHeader: { position: 'absolute', right: 20, padding: 5 },
  contentContainer: { flex: 1, padding: 20 },
  summaryRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  summaryCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  summaryLabel: { fontSize: 12, color: '#64748B', marginBottom: 5 },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#E2E8F0' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1E293B' },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 15, borderRadius: 12, justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  filterText: { fontWeight: '600', color: '#4A5565' },
  clientCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, elevation: 1 },
  clientHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  clientName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  clientStats: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  statLabel: { fontSize: 12, color: '#94A3B8' },
  statValue: { fontSize: 14, fontWeight: 'bold', color: '#475569' },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#94A3B8' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#1E293B', textAlign: 'center' },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, gap: 15 },
  modalOptionText: { fontSize: 16, color: '#475569', flex: 1 },
  divider: { height: 1, backgroundColor: '#E2E8F0' },
  modalCloseButton: { marginTop: 20, backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, alignItems: 'center' },
  modalCloseText: { fontWeight: 'bold', color: '#64748B' },
  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#1E40AF', justifyContent: 'center', alignItems: 'center', shadowColor: '#1E40AF', shadowOpacity: 0.4, shadowOffset: { width: 0, height: 4 }, elevation: 8 },
  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#1E1E1E' },
  textDark: { color: '#F1F5F9' },
  textDarkGray: { color: '#94A3B8' },
  inputDark: { backgroundColor: '#1E1E1E', borderColor: '#334155' },
  dividerDark: { backgroundColor: '#334155' },
});