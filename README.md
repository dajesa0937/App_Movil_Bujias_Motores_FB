# BujíaMar

App móvil para consultar la bujía NGK que necesita un motor **fuera de borda** o una **moto acuática**, ver gap, torque y cantidad por motor, y pedir cotización por WhatsApp.

Construida con **Expo (React Native) + TypeScript + Expo Router**. Funciona en Android, iOS y web.

## Datos

Todo el catálogo sale del libro `Bujias_NGK_Fuera_de_Borda_Colombia.xlsx` (pestaña *Catálogo*: 122 modelos de Suzuki, Yamaha, Mercury, Parsun y motos acuáticas, con fuente y nivel de confianza por fila). **La app no inventa datos**: cada ficha muestra su fuente y si el dato está *Confirmado*, *Por equivalencia* o *Verificar*.

Para actualizar el catálogo: edita el Excel y ejecuta

```bash
npm run datos   # regenera src/data/catalogo.json (requiere python3 + openpyxl)
```

## Empezar

```bash
npm install
npx expo start      # escanea el QR con Expo Go, o pulsa a (Android) / w (web)
npm run typecheck
npm test
```

## Estructura

- `src/lib/catalogo.ts` — búsqueda y filtros (con pruebas en `__tests__/`)
- `src/app/` — pantallas (Expo Router): Inicio, Consulta, Catálogo, Resultados, Detalle
- `src/config.ts` — número de WhatsApp del vendedor (vacío por ahora)

## Pendiente

- Año del motor: el catálogo no trae año por separado (a veces va dentro del nombre del modelo), por eso el flujo es Tipo → Marca → Modelo.
- Potencia (HP) como filtro: requiere agregar esa columna al catálogo.
- Fotos de producto, precios y carrito: no hay datos reales aún; el precio se muestra como «Consultar».
- Validación contra catálogos del fabricante para las filas «Por equivalencia» / «Verificar».
- Pestaña Perfil, favoritos, mantenimiento y cuidados de la bujía.
