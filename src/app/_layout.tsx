import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colores } from '../theme';

export default function Raiz() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.azul },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="resultados" options={{ title: 'Bujías compatibles' }} />
        <Stack.Screen name="bujia/[id]" options={{ title: 'Detalle de la bujía' }} />
      </Stack>
    </>
  );
}
