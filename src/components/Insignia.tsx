import { StyleSheet, Text, View } from 'react-native';
import { colores } from '../theme';
import type { Confianza } from '../lib/catalogo';

const estilos: Record<Confianza, { fondo: string; texto: string; etiqueta: string }> = {
  Confirmado: { fondo: colores.verdeFondo, texto: colores.verde, etiqueta: 'Confirmado' },
  'Por equivalencia': { fondo: colores.ambarFondo, texto: '#8A6100', etiqueta: 'Por equivalencia' },
  'Verificar año/serie': { fondo: colores.ambarFondo, texto: '#8A6100', etiqueta: 'Verifica año/serie' },
  Verificar: { fondo: colores.rojoFondo, texto: colores.rojo, etiqueta: 'Verificar' },
};

export function Insignia({ confianza }: { confianza: Confianza }) {
  const e = estilos[confianza];
  return (
    <View style={[s.caja, { backgroundColor: e.fondo }]}>
      <Text style={[s.texto, { color: e.texto }]}>{e.etiqueta}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  caja: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  texto: { fontSize: 12, fontWeight: '700' },
});
