import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function ClientsScreen() {
  const { darkMode, fontSize, clients, fetchClients, isLoadingClients } = useAppStore();
  
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        

        {isLoadingClients ? (
           <View style={{marginTop: 50}}>
             <ActivityIndicator size="large" color="#193CB8" />
             <Text style={{textAlign: 'center', marginTop: 10, color: '#999'}}>Carregando clientes...</Text>
           </View>
        ) : (
           <View style={styles.clientList}>
              {filteredClients.length === 0 ? (
                   <Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>Nenhum cliente encontrado.</Text>
              ) : (
                  filteredClients.map((client) => (
                      <View key={client.id} style={[styles.clientCard, darkMode && styles.cardDark]}>
                          <View style={styles.cardHeader}>
                              <Text style={[styles.clientName, darkMode && styles.textDark, { fontSize: fontSize }]}>{client.name}</Text>
                              <Ionicons name="star-outline" size={22} color="#99A1AF" /> 
                          </View>
                          <View style={styles.divider} />
                          <View style={styles.cardStats}>
                              <View style={styles.statItem}>
                                  <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Email</Text>
                                  <Text style={[styles.statValue, { fontSize: fontSize - 2 }]}>{client.email || '-'}</Text>
                              </View>
                              <View style={styles.statItem}>
                                  <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Telefone</Text>
                                  <Text style={[styles.statValue, { fontSize: fontSize - 2 }]}>{client.phone || '-'}</Text>
                              </View>
                          </View>
                      </View>
                  ))
              )}
           </View>
        )}

        <View style={{height: 40}} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  
  headerBlue: { backgroundColor: '#152C70', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, paddingBottom: 15, paddingTop: Platform.OS === 'android' ? 35 : 10, zIndex: 10 },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: 'rgba(255, 255, 255, 0.9)', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },

  scrollContent: { padding: 20 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#101828' },
  pageSubtitle: { fontSize: 14, color: '#4A5565', marginTop: 2 },
  addButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#152C70', justifyContent: 'center', alignItems: 'center', shadowColor: '#152C70', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },

  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#152C70' },
  summaryLabel: { fontSize: 12, color: '#152C70', marginBottom: 5 },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#4A5565' },
  textBlue: { color: '#4A5565' },

  searchContainer: { marginBottom: 20, gap: 10 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#4A5565', borderRadius: 10, paddingHorizontal: 15, height: 45 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  filterButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 45, borderWidth: 1, borderColor: '#4A5565', borderRadius: 10, backgroundColor: '#FFFFFF' },
  filterText: { color: '#4A5565', fontSize: 16, fontWeight: '500' },

  clientList: { gap: 15 },
  clientCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  clientName: { fontSize: 14, fontWeight: 'bold', color: '#101828' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 10 },
  cardStats: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { width: '48%' },
  statLabel: { fontSize: 12, color: '#6A7282', marginBottom: 2 },
  statValue: { fontSize: 13, fontWeight: 'bold', color: '#4A5565' },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
});