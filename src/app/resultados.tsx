import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colores } from '../theme';
import { TarjetaResultado } from '../components/TarjetaResultado';
import { buscar, filtrar, type Categoria } from '../lib/catalogo';

export default function Resultados() {
  const { q, categoria, marca, potencia, modelo } = useLocalSearchParams<{
    q?: string; categoria?: Categoria; marca?: string; potencia?: string; modelo?: string;
  }>();

  const datos = q
    ? buscar(q)
    : filtrar({ categoria, marca, potencia: potencia ? Number(potencia) : undefined, modeloId: modelo });
  const titulo = q ? `Resultados para "${q}"` : [marca, potencia ? `${potencia} HP` : null, modelos(modelo, datos)].filter(Boolean).join(' · ') || 'Todos los motores';

  return (
    <FlatList
      data={datos}
      keyExtractor={(e) => e.id}
      contentContainerStyle={s.lista}
      ListHeaderComponent={
        <Text style={s.titulo}>{titulo} <Text style={s.cuenta}>({datos.length})</Text></Text>
      }
      ListEmptyComponent={
        <View style={s.vacio}>
          <Text style={s.vacioTexto}>No hay coincidencias en el catálogo. Revisa la escritura o consulta por marca.</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => <TarjetaResultado e={item} />}
    />
  );
}
const modelos = (id: string | undefined, datos: { id: string; modelo: string }[]) => datos.find((d) => d.id === id)?.modelo;
const s = StyleSheet.create({
  lista: { padding: 16 },
  titulo: { fontSize: 18, fontWeight: '800', color: colores.texto, marginBottom: 12 },
  cuenta: { color: colores.textoSuave, fontWeight: '600' },
  vacio: { padding: 24 },
  vacioTexto: { color: colores.textoSuave, textAlign: 'center' },
});
