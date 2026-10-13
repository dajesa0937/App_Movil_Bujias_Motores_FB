import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, radio } from '../theme';

interface Props {
  etiqueta: string;
  valor: string | null;
  opciones: { clave: string; texto: string }[];
  alElegir: (clave: string) => void;
  deshabilitado?: boolean;
  placeholder?: string;
}

export function Selector({ etiqueta, valor, opciones, alElegir, deshabilitado, placeholder = 'Selecciona' }: Props) {
  const [abierto, setAbierto] = useState(false);
  const actual = opciones.find((o) => o.clave === valor)?.texto;
  return (
    <View style={[s.caja, deshabilitado && { opacity: 0.5 }]}>
      <Pressable disabled={deshabilitado} onPress={() => setAbierto((a) => !a)} style={s.cabecera} accessibilityRole="button">
        <View style={{ flex: 1 }}>
          <Text style={s.etiqueta}>{etiqueta}</Text>
          <Text style={[s.valor, !actual && { color: colores.textoSuave }]} numberOfLines={2}>{actual ?? placeholder}</Text>
        </View>
        <Ionicons name={abierto ? 'chevron-up' : 'chevron-down'} size={20} color={colores.texto} />
      </Pressable>
      {abierto && (
        <ScrollView style={s.lista} nestedScrollEnabled>
          {opciones.map((o) => (
            <Pressable key={o.clave} style={s.opcion} onPress={() => { alElegir(o.clave); setAbierto(false); }}>
              <Text style={[s.opcionTexto, o.clave === valor && { fontWeight: '800', color: colores.azulClaro }]}>{o.texto}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  caja: { backgroundColor: colores.tarjeta, borderRadius: radio, borderWidth: 1, borderColor: colores.borde, overflow: 'hidden' },
  cabecera: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  etiqueta: { fontSize: 12, color: colores.textoSuave },
  valor: { fontSize: 16, fontWeight: '600', color: colores.texto },
  lista: { maxHeight: 240, borderTopWidth: 1, borderTopColor: colores.borde },
  opcion: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colores.borde },
  opcionTexto: { fontSize: 15, color: colores.texto },
});
