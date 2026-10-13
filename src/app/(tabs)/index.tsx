import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colores, radio } from '../../theme';
import { Boton } from '../../components/Boton';
import { CATEGORIAS, bujiasMasUsadas, catalogo } from '../../lib/catalogo';

export default function Inicio() {
  const [q, setQ] = useState('');
  const buscar = () => q.trim() && router.push({ pathname: '/resultados', params: { q: q.trim() } });
  return (
    <ScrollView contentContainerStyle={s.pagina}>
      <View style={s.buscador}>
        <Ionicons name="search" size={20} color={colores.azulClaro} />
        <TextInput
          style={s.input}
          placeholder="Busca bujía o motor (ej. DF60, LFR6A)"
          value={q}
          onChangeText={setQ}
          onSubmitEditing={buscar}
          returnKeyType="search"
          autoCapitalize="none"
        />
      </View>

      {CATEGORIAS.map((c) => (
        <Pressable
          key={c.id}
          style={s.categoria}
          onPress={() => router.push({ pathname: '/consulta', params: { categoria: c.id } })}
        >
          <Ionicons name={c.id === 'fuera_de_borda' ? 'boat' : 'water'} size={32} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={s.categoriaTitulo}>{c.id === 'fuera_de_borda' ? 'Motores fuera de borda' : 'Motos acuáticas'}</Text>
            <Text style={s.categoriaSub}>
              {catalogo.filter((e) => e.categoria === c.id).length} modelos en el catálogo
            </Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
        </Pressable>
      ))}

      <Boton texto="Encontrar mi bujía" icono="search" alPulsar={() => router.push('/consulta')} />

      <Text style={s.seccion}>Referencias más usadas</Text>
      <Text style={s.nota}>Las que atienden más modelos del catálogo.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {bujiasMasUsadas(8).map((b) => (
          <Pressable
            key={b.bujia}
            style={s.destacada}
            onPress={() => router.push({ pathname: '/resultados', params: { q: b.bujia } })}
          >
            <Ionicons name="flash" size={22} color={colores.azul} />
            <Text style={s.destacadaRef}>NGK {b.bujia}</Text>
            <Text style={s.destacadaSub}>{b.modelos} modelos</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  pagina: { padding: 16, gap: 14 },
  buscador: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 16, borderWidth: 1, borderColor: colores.borde },
  input: { flex: 1, paddingVertical: 13, fontSize: 15, color: colores.texto },
  categoria: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colores.azul, borderRadius: radio, padding: 20 },
  categoriaTitulo: { color: '#fff', fontSize: 20, fontWeight: '800' },
  categoriaSub: { color: '#CFE3F5', fontSize: 13 },
  seccion: { fontSize: 18, fontWeight: '800', color: colores.texto, marginTop: 6 },
  nota: { fontSize: 13, color: colores.textoSuave, marginTop: -8 },
  destacada: { backgroundColor: '#fff', borderRadius: radio, padding: 14, borderWidth: 1, borderColor: colores.borde, minWidth: 130, gap: 2 },
  destacadaRef: { fontWeight: '800', fontSize: 16, color: colores.texto },
  destacadaSub: { fontSize: 12, color: colores.textoSuave },
});
