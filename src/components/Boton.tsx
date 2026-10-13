import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, radio } from '../theme';

interface Props {
  texto: string;
  alPulsar: () => void;
  icono?: React.ComponentProps<typeof Ionicons>['name'];
  variante?: 'primario' | 'contorno';
  deshabilitado?: boolean;
}
export function Boton({ texto, alPulsar, icono, variante = 'primario', deshabilitado }: Props) {
  const primario = variante === 'primario';
  return (
    <Pressable
      onPress={alPulsar}
      disabled={deshabilitado}
      accessibilityRole="button"
      style={[s.base, primario ? s.primario : s.contorno, deshabilitado && { opacity: 0.45 }]}
    >
      {icono && <Ionicons name={icono} size={20} color={primario ? '#fff' : colores.azul} />}
      <Text style={[s.texto, { color: primario ? '#fff' : colores.azul }]}>{texto}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  base: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderRadius: radio },
  primario: { backgroundColor: colores.naranja },
  contorno: { borderWidth: 2, borderColor: colores.azul, backgroundColor: '#fff' },
  texto: { fontSize: 16, fontWeight: '800' },
});
