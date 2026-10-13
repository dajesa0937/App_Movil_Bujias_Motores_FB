import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { colores, radio } from '../../theme';
import { Boton } from '../../components/Boton';
import { Selector } from '../../components/Selector';
import { CATEGORIAS, marcasDe, modelosDe, type Categoria } from '../../lib/catalogo';

export default function Consulta() {
  const params = useLocalSearchParams<{ categoria?: Categoria }>();
  const [categoria, setCategoria] = useState<Categoria>(params.categoria ?? 'fuera_de_borda');
  const [marca, setMarca] = useState<string | null>(null);
  const [modelo, setModelo] = useState<string | null>(null);

  const marcas = marcasDe(categoria);
  const modelos = marca ? modelosDe(categoria, marca) : [];

  const consultar = () => {
    if (!marca) return;
    router.push({ pathname: '/resultados', params: { categoria, marca, ...(modelo ? { modelo } : {}) } });
  };

  return (
    <ScrollView contentContainerStyle={s.pagina}>
      <Selector
        etiqueta="Tipo de motor"
        valor={categoria}
        opciones={CATEGORIAS.map((c) => ({ clave: c.id, texto: c.nombre }))}
        alElegir={(c) => { setCategoria(c as Categoria); setMarca(null); setModelo(null); }}
      />
      <Selector
        etiqueta="Marca"
        valor={marca}
        opciones={marcas.map((m) => ({ clave: m, texto: m }))}
        alElegir={(m) => { setMarca(m); setModelo(null); }}
      />
      <Selector
        etiqueta="Modelo (opcional)"
        placeholder={marca ? 'Todos los modelos de la marca' : 'Elige primero la marca'}
        valor={modelo}
        deshabilitado={!marca}
        opciones={modelos.map((m) => ({ clave: m.id, texto: m.modelo }))}
        alElegir={setModelo}
      />
      <Boton texto="Consultar compatibilidad" icono="search" alPulsar={consultar} deshabilitado={!marca} />
      <View style={s.aviso}>
        <Ionicons name="information-circle" size={24} color={colores.azulClaro} />
        <Text style={s.avisoTexto}>
          Confirma el modelo exacto, el año y la serie antes de comprar. Cuando el dato figure como "Por equivalencia" o
          "Verifica año/serie", compara con la bujía instalada.
        </Text>
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  pagina: { padding: 16, gap: 12 },
  aviso: { flexDirection: 'row', gap: 10, backgroundColor: '#E8F6FC', borderRadius: radio, padding: 14, borderWidth: 1, borderColor: '#BFE3F2' },
  avisoTexto: { flex: 1, color: colores.texto, fontSize: 14 },
});
