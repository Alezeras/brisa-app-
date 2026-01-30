import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSettings } from '../context/ConfigContext';

export default function ClientsScreen() {
  const { darkMode, fontSize } = useSettings();
  
  const [searchText, setSearchText] = useState('');

  const initialClients = [
    { id: 1, name: 'Amanda', projects: 1, hours: '45.5h', favorite: true },
    { id: 2, name: 'Joel', projects: 2, hours: '25.0h', favorite: false },
    { id: 3, name: 'Wesley', projects: 3, hours: '15.5h', favorite: true },
    { id: 4, name: 'Rafaela', projects: 4, hours: '5.0h', favorite: false },
  ];

  const [clients, setClients] = useState(initialClients);

  const toggleFavorite = (id) => {
    setClients(currentClients => 
      currentClients.map(client => 
        client.id === id ? { ...client, favorite: !client.favorite } : client
      )
    );
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="rgba(255, 255, 255, 0.9)" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Clientes</Text>
            
            <View style={{width: 70}} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.pageHeader}>
            <View>
                <Text style={[styles.pageTitle, darkMode && styles.textDark]}>Clientes</Text>
                <Text style={[styles.pageSubtitle, darkMode && styles.textDarkGray]}>Gerencie seus clientes e projetos</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-cliente')}>
                <Feather name="plus" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>

        <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, darkMode && styles.cardDark]}>
                <Text style={[styles.summaryLabel, darkMode && styles.textDark]}>Clientes</Text>
                <Text style={[styles.summaryValue, darkMode && styles.textBlue]}>{clients.length}</Text>
            </View>

            <View style={[styles.summaryCard, darkMode && styles.cardDark]}>
                <Text style={[styles.summaryLabel, darkMode && styles.textDark]}>Total de Horas</Text>
                <Text style={[styles.summaryValue, darkMode && styles.textBlue]}>00h</Text>
            </View>
        </View>

        <View style={styles.searchContainer}>
            <View style={[styles.searchBox, darkMode && styles.cardDark]}>
                <Feather name="search" size={20} color="#99A1AF" style={{marginRight: 10}} />
                <TextInput 
                    style={[styles.searchInput, darkMode && styles.textDark]}
                    placeholder="Buscar clientes..."
                    placeholderTextColor="#99A1AF"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            
            <TouchableOpacity style={[styles.filterButton, darkMode && styles.cardDark]}>
                <Feather name="filter" size={20} color="#193CB8" style={{marginRight: 5}} />
                <Text style={styles.filterText}>Filtrar</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.clientList}>
            {filteredClients.map((client) => (
                <View key={client.id} style={[styles.clientCard, darkMode && styles.cardDark]}>
                    
                    <View style={styles.cardHeader}>
                        <Text style={[styles.clientName, darkMode && styles.textDark, { fontSize: fontSize }]}>{client.name}</Text>
                        <TouchableOpacity onPress={() => toggleFavorite(client.id)}>
                            <Ionicons 
                                name={client.favorite ? "star" : "star-outline"} 
                                size={22} 
                                color={client.favorite ? "#F0B100" : "#99A1AF"} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.cardStats}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Projetos</Text>
                            <Text style={[styles.statValue, { fontSize: fontSize - 1 }]}>{client.projects}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, darkMode && styles.textDarkGray]}>Horas</Text>
                            <Text style={[styles.statValue, { fontSize: fontSize - 1 }]}>{client.hours}</Text>
                        </View>
                    </View>

                </View>
            ))}
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
    backgroundColor: '#152C70',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? 35 : 10,
    zIndex: 10,
  },
  headerBlueDark: { backgroundColor: '#152C70' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 5,
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  scrollContent: {
    padding: 20,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#101828',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#4A5565',
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#152C70',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#152C70',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#152C70', 
  },
  summaryLabel: {
    fontSize: 12,
    color: '#152C70',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A5565', 
  },
  textBlue: { color: '#4A5565' },

  searchContainer: {
    marginBottom: 20,
    gap: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#4A5565',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#4A5565',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    color: '#4A5565',
    fontSize: 16,
    fontWeight: '500',
  },

  clientList: {
    gap: 15,
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101828',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
  },
  statLabel: {
    fontSize: 12,
    color: '#6A7282',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A5565',
  },

  containerDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  textDark: { color: '#E0E0E0' },
  textDarkGray: { color: '#AAAAAA' },
});