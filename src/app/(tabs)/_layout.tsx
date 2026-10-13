import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../theme';

const icono = (n: React.ComponentProps<typeof Ionicons>['name']) =>
  ({ color, size }: { color: import("react-native").ColorValue; size: number }) => <Ionicons name={n} size={size} color={color} />;

export default function Pestanas() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colores.azul },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        tabBarActiveTintColor: colores.azulClaro,
        sceneStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'BujíaMar', tabBarLabel: 'Inicio', tabBarIcon: icono('home') }} />
      <Tabs.Screen name="consulta" options={{ title: 'Encuentra tu bujía', tabBarLabel: 'Consultar', tabBarIcon: icono('search') }} />
      <Tabs.Screen name="catalogo" options={{ title: 'Catálogo', tabBarIcon: icono('list') }} />
    </Tabs>
  );
}
