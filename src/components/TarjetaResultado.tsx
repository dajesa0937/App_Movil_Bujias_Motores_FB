import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colores, radio } from '../theme';
import type { Entrada } from '../lib/catalogo';
import { Insignia } from './Insignia';

export function TarjetaResultado({ e }: { e: Entrada }) {
  return (
    <Pressable
      style={s.tarjeta}
      onPress={() => router.push({ pathname: '/bujia/[id]', params: { id: e.id } })}
      accessibilityRole="button"
      accessibilityLabel={`${e.marca} ${e.modelo}, bujía ${e.bujia}`}
    >
      <View style={s.icono}>
        <Ionicons name="flash" size={26} color={colores.azul} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.motor}>{e.marca} · {e.modelo}</Text>
        <Text style={s.bujia}>NGK {e.bujia}</Text>
        <Insignia confianza={e.confianza} />
      </View>
      <Ionicons name="chevron-forward" size={20} color={colores.textoSuave} />
    </Pressable>
  );
}
const s = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colores.tarjeta,
    borderRadius: radio, padding: 14, borderWidth: 1, borderColor: colores.borde,
  },
  icono: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#E8F1F9', alignItems: 'center', justifyContent: 'center' },
  motor: { fontSize: 14, color: colores.textoSuave },
  bujia: { fontSize: 18, fontWeight: '800', color: colores.texto },
});
