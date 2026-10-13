"""Convierte la pestaña 'Catálogo' del libro Excel a src/data/catalogo.json.
Uso: python scripts/xlsx_a_json.py   (requiere openpyxl)
No inventa datos: solo copia lo que está en el libro."""
import json, pathlib, warnings
import openpyxl
warnings.filterwarnings("ignore")
raiz = pathlib.Path(__file__).resolve().parent.parent
wb = openpyxl.load_workbook(raiz / "Bujias_NGK_Fuera_de_Borda_Colombia.xlsx", data_only=True)
ws = wb["Catálogo"]
def txt(v):
    if v is None: return None
    s = str(v).strip()
    return s or None
out = []
for r in ws.iter_rows(min_row=5, values_only=True):
    if not r[0]: continue
    marca, modelo, tipo, motor, bujia, gap, torque, n, mercado, conf, fuente, notas = r[:12]
    out.append({
        "id": txt(r[12]),
        "categoria": "moto_acuatica" if marca == "Acuáticas" else "fuera_de_borda",
        "marca": txt(marca), "modelo": txt(modelo), "tiempos": txt(tipo), "motor": txt(motor),
        "bujia": txt(bujia), "gap": txt(gap), "torque": txt(torque),
        "bujiasPorMotor": int(n) if isinstance(n, (int, float)) else None,
        "mercado": txt(mercado), "confianza": txt(conf), "fuente": txt(fuente), "notas": txt(notas),
    })
(raiz / "src" / "data" / "catalogo.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(out), "modelos")
