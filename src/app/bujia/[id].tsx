import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colores, radio } from '../../theme';
import { Boton } from '../../components/Boton';
import { Insignia } from '../../components/Insignia';
import { AVISO_CONFIANZA, catalogo, motoresConBujia } from '../../lib/catalogo';
import { WHATSAPP_NUMERO } from '../../config';

const Fila = ({ k, v }: { k: string; v: string | null }) => (
  <View style={s.fila}>
    <Text style={s.k}>{k}</Text>
    <Text style={s.v}>{v ?? 'Por confirmar'}</Text>
  </View>
);

export default function Detalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const e = catalogo.find((x) => x.id === id);
  if (!e) return <Text style={{ padding: 16 }}>No se encontró el motor.</Text>;

  const otros = motoresConBujia(e.bujia).filter((x) => x.id !== e.id);
  const mensaje = `Hola, necesito bujías NGK ${e.bujia} para ${e.marca} ${e.modelo}` +
    (e.bujiasPorMotor ? ` (${e.bujiasPorMotor} por motor).` : '.') + ' ¿Precio y disponibilidad?';
  const whatsapp = () =>
    Linking.openURL(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`);

  return (
    <ScrollView contentContainerStyle={s.pagina}>
      <Stack.Screen options={{ title: `NGK ${e.bujia}` }} />
      <Text style={s.motor}>{e.marca} · {e.modelo}</Text>
      <Text style={s.ref}>NGK {e.bujia}</Text>
      <Insignia confianza={e.confianza} />
      <Text style={s.aviso}>{AVISO_CONFIANZA[e.confianza]}</Text>

      <View style={s.tabla}>
        <Fila k="Tiempos" v={e.tiempos} />
        {e.categoria === 'fuera_de_borda' && <Fila k="Potencia (según el modelo)" v={e.potenciaTexto} />}
        <Fila k="Motor" v={e.motor && e.motor !== '—' ? e.motor : null} />
        <Fila k="Luz del electrodo (gap)" v={e.gap ? `${e.gap} mm` : null} />
        <Fila k="Torque de apriete" v={e.torque ? `${e.torque} N·m` : null} />
        <Fila k="Bujías por motor" v={e.bujiasPorMotor ? String(e.bujiasPorMotor) : null} />
        <Fila k="Mercado" v={e.mercado} />
        <Fila k="Fuente" v={e.fuente} />
      </View>
      {e.notas && <Text style={s.notas}>Nota: {e.notas}</Text>}

      <Boton texto="Solicitar por WhatsApp" icono="logo-whatsapp" alPulsar={whatsapp} />

      {otros.length > 0 && (
        <>
          <Text style={s.seccion}>Otros motores con la misma bujía ({otros.length})</Text>
          {otros.map((o) => (
            <Text
              key={o.id}
              style={s.enlace}
              onPress={() => router.push({ pathname: '/bujia/[id]', params: { id: o.id } })}
            >
              {o.marca} · {o.modelo}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  pagina: { padding: 16, gap: 10 },
  motor: { color: colores.textoSuave, fontSize: 15 },
  ref: { fontSize: 28, fontWeight: '800', color: colores.azul },
  aviso: { color: colores.textoSuave, fontSize: 13 },
  tabla: { backgroundColor: '#fff', borderRadius: radio, borderWidth: 1, borderColor: colores.borde, marginVertical: 6 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, padding: 13, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colores.borde },
  k: { color: colores.textoSuave, flexShrink: 1 },
  v: { fontWeight: '700', color: colores.texto, flexShrink: 1, textAlign: 'right' },
  notas: { fontSize: 13, color: colores.texto, backgroundColor: colores.ambarFondo, padding: 10, borderRadius: 10 },
  seccion: { fontSize: 16, fontWeight: '800', color: colores.texto, marginTop: 10 },
  enlace: { color: colores.azulClaro, fontSize: 15, paddingVertical: 4 },
});
