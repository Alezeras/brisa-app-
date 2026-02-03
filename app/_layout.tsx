import React from 'react';
import { Stack } from 'expo-router';


export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="esquecer-senha" />
      <Stack.Screen name="mudar-senha" />
      <Stack.Screen name="config-login" />
      <Stack.Screen name="tela" /> 
      <Stack.Screen name="calendario" />
      <Stack.Screen name="clientes" />
      <Stack.Screen name="relatorio" />
      <Stack.Screen name="filtro-relatorio" />
      <Stack.Screen name="nova-atividade" />
      <Stack.Screen name="add-tempo" />
      <Stack.Screen name="add-cliente" />
      <Stack.Screen name="perfil" />
      <Stack.Screen name="editar-perfil" />
      <Stack.Screen name="config" />
      <Stack.Screen name="ajuda" />
      <Stack.Screen name="politica" />
      <Stack.Screen name="termos-uso" />
    </Stack>
  );
}