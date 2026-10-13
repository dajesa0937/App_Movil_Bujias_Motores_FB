import { filtrar, potenciasDe, catalogo, marcasDe, modelosDe, buscar, motoresConBujia, bujiasMasUsadas } from '../src/lib/catalogo';

describe('catálogo', () => {
  it('tiene las 122 filas del libro y todas con bujía', () => {
    expect(catalogo).toHaveLength(122);
    expect(catalogo.every((e) => e.bujia)).toBe(true);
  });
  it('lista marcas por categoría', () => {
    expect(marcasDe('fuera_de_borda')).toEqual(['Mercury', 'Parsun', 'Suzuki', 'Yamaha']);
    expect(marcasDe('moto_acuatica')).toEqual(['Acuáticas']);
  });
  it('devuelve los modelos de una marca', () => {
    expect(modelosDe('fuera_de_borda', 'Suzuki')).toHaveLength(32);
  });
  it('busca por modelo ignorando tildes y guiones', () => {
    expect(buscar('df60aq').map((e) => e.bujia)).toContain('DCPR6E');
    expect(buscar('lfr6a 11').length).toBeGreaterThan(0);
    expect(buscar('')).toEqual([]);
  });
  it('agrupa motores por bujía y calcula las más usadas', () => {
    expect(motoresConBujia('DCPR6E')).toHaveLength(8);
    expect(bujiasMasUsadas(2).map((b) => b.bujia)).toEqual(['DCPR6E', 'LFR6A-11']);
  });
  it('filtra por potencia: valores exactos y rangos', () => {
    const r = filtrar({ categoria: 'fuera_de_borda', marca: 'Suzuki', potencia: 60 });
    expect(r.map((e) => e.modelo)).toEqual(expect.arrayContaining(['DF60AQHL/ATL', 'DF60/70 (1998–2009)']));
    expect(filtrar({ marca: 'Mercury', potencia: 100 }).some((e) => e.modelo.includes('75–115'))).toBe(true);
    expect(filtrar({ marca: 'Suzuki', potencia: 61 })).toEqual([]);
  });
  it('lista potencias por marca y no asigna HP a motos acuáticas ni al LT7', () => {
    const hp = potenciasDe('fuera_de_borda', 'Parsun');
    expect(hp).toContain(9.8);
    expect(hp).toEqual([...hp].sort((a, b) => a - b));
    expect(catalogo.filter((e) => e.categoria === 'moto_acuatica').every((e) => e.potenciaTexto === null)).toBe(true);
    expect(catalogo.find((e) => e.modelo.startsWith('LT7'))?.potenciaTexto).toBeNull();
  });
});
