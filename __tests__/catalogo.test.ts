import { catalogo, marcasDe, modelosDe, buscar, motoresConBujia, bujiasMasUsadas } from '../src/lib/catalogo';

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
});
