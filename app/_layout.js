import React from 'react';
import { Stack } from 'expo-router';
import { ConfigProvider, SettingsProvider } from '../context/ConfigContext'; 

export default function Layout() {
  return (
    <ConfigProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
        <Stack.Screen name="esquecer-senha" />
        <Stack.Screen name="tela" />
        <Stack.Screen name="config" />
        <Stack.Screen name="ajuda" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="relatorio" />
        <Stack.Screen name="filtro-relatorio" />
        <Stack.Screen name="calendario" /> 
        <Stack.Screen name="add-tempo" />
        <Stack.Screen name="nova-atividade" />
        <Stack.Screen name="clientes" />
        <Stack.Screen name="mudar-senha" />
        <Stack.Screen name="add-cliente" />
        <Stack.Screen name="editar-perfil" />
        <Stack.Screen name="politica" />
        <Stack.Screen name="termos-uso" />
        <Stack.Screen name="config-login" />
      </Stack>
    </ConfigProvider>
  );
}