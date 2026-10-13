import datos from '../data/catalogo.json';

export type Categoria = 'fuera_de_borda' | 'moto_acuatica';
export type Confianza = 'Confirmado' | 'Por equivalencia' | 'Verificar año/serie' | 'Verificar';

export interface Entrada {
  id: string;
  categoria: Categoria;
  marca: string;
  modelo: string;
  tiempos: '2T' | '4T' | null;
  motor: string | null;
  potenciaTexto: string | null;
  potenciaValores: number[];
  potenciaRangos: number[][];
  bujia: string;
  gap: string | null;
  torque: string | null;
  bujiasPorMotor: number | null;
  mercado: string | null;
  confianza: Confianza;
  fuente: string | null;
  notas: string | null;
}

export const catalogo = datos as Entrada[];

export const CATEGORIAS: { id: Categoria; nombre: string }[] = [
  { id: 'fuera_de_borda', nombre: 'Fuera de borda' },
  { id: 'moto_acuatica', nombre: 'Moto acuática' },
];

const ordenar = (a: string, b: string) => a.localeCompare(b, 'es', { numeric: true });

export function marcasDe(categoria: Categoria, data: Entrada[] = catalogo): string[] {
  return [...new Set(data.filter((e) => e.categoria === categoria).map((e) => e.marca))].sort(ordenar);
}

export function modelosDe(categoria: Categoria, marca: string, data: Entrada[] = catalogo): Entrada[] {
  return data
    .filter((e) => e.categoria === categoria && e.marca === marca)
    .sort((a, b) => ordenar(a.modelo, b.modelo));
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[\s\-_/]+/g, '');

/** Potencias (HP) que aparecen en los nombres de modelo de una marca, de menor a mayor. */
export function potenciasDe(categoria: Categoria, marca: string, data: Entrada[] = catalogo): number[] {
  const hp = new Set<number>();
  for (const e of modelosDe(categoria, marca, data)) {
    e.potenciaValores.forEach((v) => hp.add(v));
    e.potenciaRangos.forEach(([a, b]) => { hp.add(a); hp.add(b); });
  }
  return [...hp].sort((a, b) => a - b);
}

export function atiendePotencia(e: Entrada, hp: number): boolean {
  return e.potenciaValores.includes(hp) || e.potenciaRangos.some(([a, b]) => hp >= a && hp <= b);
}

/** Filtro de la pantalla Consulta: categoría + marca + potencia (HP) + modelo exacto, todos opcionales salvo categoría. */
export function filtrar(
  f: { categoria?: Categoria; marca?: string; potencia?: number; modeloId?: string },
  data: Entrada[] = catalogo,
): Entrada[] {
  return data
    .filter(
      (e) =>
        (!f.categoria || e.categoria === f.categoria) &&
        (!f.marca || e.marca === f.marca) &&
        (f.potencia === undefined || atiendePotencia(e, f.potencia)) &&
        (!f.modeloId || e.id === f.modeloId),
    )
    .sort((a, b) => ordenar(a.modelo, b.modelo));
}

/** Busca por referencia de bujía, marca o modelo (sin tildes, espacios ni guiones). */
export function buscar(consulta: string, data: Entrada[] = catalogo): Entrada[] {
  const q = norm(consulta);
  if (!q) return [];
  return data.filter((e) => norm(`${e.marca}${e.modelo}${e.bujia}${e.potenciaTexto ?? ''}`).includes(q)).sort((a, b) =>
    ordenar(`${a.marca} ${a.modelo}`, `${b.marca} ${b.modelo}`),
  );
}

/** Motores del catálogo que usan una misma referencia NGK. */
export function motoresConBujia(bujia: string, data: Entrada[] = catalogo): Entrada[] {
  return data.filter((e) => e.bujia === bujia);
}

/** Referencias NGK más repetidas en el catálogo (útil para destacados reales). */
export function bujiasMasUsadas(n = 6, data: Entrada[] = catalogo): { bujia: string; modelos: number }[] {
  const cuenta = new Map<string, number>();
  for (const e of data) cuenta.set(e.bujia, (cuenta.get(e.bujia) ?? 0) + 1);
  return [...cuenta.entries()]
    .map(([bujia, modelos]) => ({ bujia, modelos }))
    .sort((a, b) => b.modelos - a.modelos || ordenar(a.bujia, b.bujia))
    .slice(0, n);
}

export const AVISO_CONFIANZA: Record<Confianza, string> = {
  Confirmado: 'Dato tomado de un manual, ficha técnica o catálogo oficial.',
  'Por equivalencia': 'Motor idéntico a otro con dato oficial, pero sin manual propio. Confirma con la bujía instalada.',
  'Verificar año/serie': 'Depende del año o la serie. Confirma siempre con la bujía instalada.',
  Verificar: 'Sin fuente suficiente. Confirma siempre con la bujía instalada.',
};
