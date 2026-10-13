import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { colores } from '../../theme';
import { TarjetaResultado } from '../../components/TarjetaResultado';
import { buscar, catalogo } from '../../lib/catalogo';

export default function Catalogo() {
  const [q, setQ] = useState('');
  const datos = q.trim() ? buscar(q) : catalogo;
  return (
    <FlatList
      data={datos}
      keyExtractor={(e) => e.id}
      contentContainerStyle={s.lista}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <TextInput style={s.input} placeholder="Filtrar por marca, modelo o bujía" value={q} onChangeText={setQ} autoCapitalize="none" />
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => <TarjetaResultado e={item} />}
    />
  );
}
const s = StyleSheet.create({
  lista: { padding: 16 },
  input: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: colores.borde, marginBottom: 12, fontSize: 15 },
});
