"""Convierte la pestaña 'Catálogo' del libro Excel a src/data/catalogo.json.
Uso: python scripts/xlsx_a_json.py   (requiere openpyxl)
No inventa datos: solo copia lo que está en el libro."""
import json, pathlib, re, warnings
import openpyxl
warnings.filterwarnings("ignore")
raiz = pathlib.Path(__file__).resolve().parent.parent
wb = openpyxl.load_workbook(raiz / "Bujias_NGK_Fuera_de_Borda_Colombia.xlsx", data_only=True)
ws = wb["Catálogo"]
def txt(v):
    if v is None: return None
    s = str(v).strip()
    return s or None
NUM = r"\d+(?:\.\d+)?"
def potencia(categoria, modelo):
    """Extrae los HP que el propio nombre del modelo indica (p. ej. DF60A -> 60, 'FourStroke 75–115' -> rango).
    Motos acuáticas: el catálogo no da HP de forma uniforme, se deja vacío. Nada se estima."""
    if categoria != "fuera_de_borda" or modelo.startswith("LT7"):
        return [], []
    t = re.sub(r"\([^)]*\)", " ", modelo)             # quita paréntesis (años, series, cc)
    t = re.sub(r"sin '[^']*'", " ", t)
    t = re.sub(r"de " + NUM + r" ?(cc|L)\b", " ", t)    # cilindrada
    t = re.sub(r"\b2T\b|V[68](/V8)?|\bDFI\b|\bEFI\b", " ", t)
    rangos = [[float(a), float(b)] for a, b in re.findall("(" + NUM + ")[–-](" + NUM + ")", t)]
    t = re.sub(NUM + "[–-]" + NUM, " ", t)
    vals = sorted({float(x) for x in re.findall(NUM, t)})
    f = lambda x: int(x) if x == int(x) else x
    return [f(v) for v in vals], [[f(a), f(b)] for a, b in rangos]
def texto_hp(vals, rangos):
    partes = [f"{a}–{b}" for a, b in rangos] + [str(v) for v in vals]
    return " / ".join(partes) + " HP" if partes else None
out = []
for r in ws.iter_rows(min_row=5, values_only=True):
    if not r[0]: continue
    marca, modelo, tipo, motor, bujia, gap, torque, n, mercado, conf, fuente, notas = r[:12]
    cat = "moto_acuatica" if marca == "Acuáticas" else "fuera_de_borda"
    vals, rangos = potencia(cat, modelo)
    out.append({
        "id": txt(r[12]),
        "categoria": cat,
        "marca": txt(marca), "modelo": txt(modelo), "tiempos": txt(tipo), "motor": txt(motor),
        "potenciaTexto": texto_hp(vals, rangos), "potenciaValores": vals, "potenciaRangos": rangos,
        "bujia": txt(bujia), "gap": txt(gap), "torque": txt(torque),
        "bujiasPorMotor": int(n) if isinstance(n, (int, float)) else None,
        "mercado": txt(mercado), "confianza": txt(conf), "fuente": txt(fuente), "notas": txt(notas),
    })
(raiz / "src" / "data" / "catalogo.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(out), "modelos")
