import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

interface DayObject {
  d: number;
  m: number;
  y: number;
  prev?: boolean;
  next?: boolean;
  curr?: boolean;
}

export default function CalendarScreen() {
  const { darkMode, activities } = useAppStore();
  
  const getTotalSeconds = () => activities.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [displayDate, setDisplayDate] = useState(new Date());

  const holidays = [
    { d: 1, m: 0, name: 'Confraternização' }, 
    { d: 21, m: 3, name: 'Tiradentes' },      
    { d: 1, m: 4, name: 'Dia do Trabalho' },
    { d: 7, m: 8, name: 'Independência' },
    { d: 12, m: 9, name: 'N. Sra. Aparecida' },
    { d: 2, m: 10, name: 'Finados' },
    { d: 15, m: 10, name: 'Proclamação' },
    { d: 25, m: 11, name: 'Natal' }
  ];

  const generateCalendarDays = (date: Date): DayObject[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const daysArray: DayObject[] = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        daysArray.push({ d: lastDayOfPrevMonth - i, m: month - 1, y: year, prev: true });
    }
    for (let i = 1; i <= lastDayOfMonth; i++) {
        daysArray.push({ d: i, m: month, y: year, curr: true });
    }
    const remainingSlots = 42 - daysArray.length;
    for (let i = 1; i <= remainingSlots; i++) {
        daysArray.push({ d: i, m: month + 1, y: year, next: true });
    }
    return daysArray;
  };

  const calendarData = generateCalendarDays(displayDate);

  const changeMonth = (increment: number) => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + increment, 1);
    setDisplayDate(newDate);
  };

  const monthTitle = displayDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const getHoliday = (dayObj: DayObject) => {
    const tempDate = new Date(dayObj.y, dayObj.m, dayObj.d);
    return holidays.find(h => h.d === tempDate.getDate() && h.m === tempDate.getMonth());
  };

  const getEventsForDay = (dayObj: DayObject) => {
    const tempDate = new Date(dayObj.y, dayObj.m, dayObj.d);
    
    const day = String(tempDate.getDate()).padStart(2, '0'); 
    const month = String(tempDate.getMonth() + 1).padStart(2, '0'); 
    const year = tempDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`; 

    return activities.filter(act => act.date === formattedDate);
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      <View style={[styles.headerBlue, darkMode && styles.headerBlueDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="rgba(255, 255, 255, 0.9)" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Calendário</Text>
            <View style={{width: 70}} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.calendarCard, darkMode && styles.cardDark]}>
            <View style={styles.monthControlRow}>
                <View style={styles.monthLeft}>
                    <Text style={[styles.monthTitle, darkMode && styles.textDark]}>{monthTitle}</Text>
                    <View style={styles.arrowsContainer}>
                        <TouchableOpacity style={styles.arrowBtn} onPress={() => changeMonth(-1)}>
                            <Feather name="chevron-left" size={20} color={darkMode ? "#FFF" : "#0A0A0A"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowBtn} onPress={() => changeMonth(1)}>
                            <Feather name="chevron-right" size={20} color={darkMode ? "#FFF" : "#0A0A0A"} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.newBtn} onPress={() => router.push('/nova-atividade')}>
                    <Feather name="plus" size={16} color="#FFF" />
                    <Text style={styles.newBtnText}>Nova</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <Text key={day} style={styles.weekText}>{day}</Text>
                ))}
            </View>

            <View style={styles.gridContainer}>
                {calendarData.map((dayObj, index) => {
                    const holiday = getHoliday(dayObj);
                    const dayEvents = getEventsForDay(dayObj); 
                    const isFaded = dayObj.prev || dayObj.next;

                    return (
                        <View key={index} style={[
                            styles.dayCell, 
                            darkMode && styles.dayCellDark, 
                            (holiday && !isFaded) ? { backgroundColor: darkMode ? '#331111' : '#FFF5F5' } : {}
                        ]}>
                            <Text style={[
                                styles.dayNumber, 
                                isFaded && styles.dayNumberFade,
                                darkMode && styles.textDark,
                                (holiday && !isFaded) ? { color: '#EF4444', fontWeight: 'bold' } : {}
                            ]}>
                                {dayObj.d}
                            </Text>

                            <View style={styles.tagsContainer}>
                                {holiday && !isFaded && (
                                    <View style={[styles.tag, { backgroundColor: '#EF4444' }]}>
                                        <Text style={styles.tagText} numberOfLines={1}>{holiday.name}</Text>
                                    </View>
                                )}
                                {dayEvents.slice(0, 3).map((evt, i) => (
                                    <View key={i} style={[styles.tag, { backgroundColor: evt.color || '#193CB8' }]}>
                                        <Text style={styles.tagText} numberOfLines={1}>{evt.title}</Text>
                                    </View>
                                ))}
                                {dayEvents.length > 3 && (
                                    <Text style={{fontSize: 8, color: '#999', textAlign: 'center'}}>...</Text>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={[styles.footerRow, darkMode && styles.footerRowDark]}>
                <View style={styles.totalInfo}>
                    <Feather name="clock" size={16} color="#193CB8" style={{marginRight: 8}} />
                    <Text style={[styles.totalText, darkMode && styles.textDark]}>
                        Total acumulado: {formatTime(getTotalSeconds())}
                    </Text>
                </View>
            </View>

        </View>
        <View style={{height: 40}} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
    headerBlue: { backgroundColor: '#1C398E', paddingBottom: 15, paddingTop: Platform.OS === 'android' ? 35 : 10, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 },
    headerBlueDark: { backgroundColor: '#152C70' },
    headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 50 },
    backButton: { flexDirection: 'row', alignItems: 'center' },
    backText: { color: 'rgba(255, 255, 255, 0.9)', marginLeft: 5, fontSize: 16 },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
    scrollContent: { padding: 16 },
    calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 5, paddingBottom: 10, overflow: 'hidden' },
    monthControlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    monthLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    monthTitle: { fontSize: 20, fontWeight: '400', color: '#101828', textTransform: 'capitalize' },
    arrowsContainer: { flexDirection: 'row', gap: 8 },
    arrowBtn: { padding: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 8 },
    newBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#193CB8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 4 },
    newBtnText: { color: '#FFF', fontSize: 14, fontWeight: '500' },
    weekRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingVertical: 8 },
    weekText: { width: '14.28%', textAlign: 'center', fontSize: 12, color: '#6A7282' },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    dayCell: { width: '14.28%', height: 90, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6', padding: 4 },
    dayCellDark: { borderColor: '#333' },
    dayNumber: { fontSize: 14, color: '#101828', marginBottom: 4, marginLeft: 4 },
    dayNumberFade: { color: '#99A1AF' },
    tagsContainer: { gap: 2 },
    tag: { borderRadius: 4, paddingVertical: 2, paddingHorizontal: 4, marginBottom: 2 },
    tagText: { color: '#FFF', fontSize: 9, fontWeight: '500', textAlign: 'center' },
    footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB', marginTop: -1 },
    footerRowDark: { borderTopColor: '#333' },
    totalInfo: { flexDirection: 'row', alignItems: 'center' },
    totalText: { fontSize: 14, color: '#4A5565' },
    containerDark: { backgroundColor: '#121212' },
    cardDark: { backgroundColor: '#1E1E1E' },
    textDark: { color: '#E0E0E0' },
});