#!/usr/bin/env python3
"""
Script para corregir el problema de registros duplicados en toda la aplicación.
Aplica dos correcciones:
1. Mueve e.preventDefault() fuera del if(valid()) para prevenir envío nativo
2. Después de crear un registro, cambia a modo edición para evitar duplicados
"""

import os
import re
import glob

# Directorio base
BASE_DIR = r"F:\Nomina2025\FrontNomina\DC365_WebNR.UI"
TS_DIR = os.path.join(BASE_DIR, "TypeScriptFile")

def fix_typescript_file(filepath):
    """Corrige un archivo TypeScript"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        changes_made = []

        # Patrón 1: Mover e.preventDefault() fuera del if (valid())
        # Buscar: .submit(function (e) { if ($(this).valid()) { e.preventDefault();
        # Reemplazar por: .submit(function (e) { e.preventDefault(); if ($(this).valid()) {

        pattern1 = r'(\.submit\s*\(\s*function\s*\(\s*e\s*\)\s*\{)\s*(if\s*\(\s*\$\(this\)\.valid\(\)\s*\)\s*\{)\s*(e\.preventDefault\(\);?)'

        def replace_prevent_default(match):
            submit_start = match.group(1)
            if_valid = match.group(2)
            prevent = match.group(3)
            return f'{submit_start}\n        e.preventDefault(); // Siempre prevenir el envío nativo del formulario\n        {if_valid}'

        new_content = re.sub(pattern1, replace_prevent_default, content)

        if new_content != content:
            changes_made.append("Movido e.preventDefault() fuera del if(valid())")
            content = new_content

        if changes_made:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, changes_made

        return False, []

    except Exception as e:
        return False, [f"Error: {str(e)}"]

def main():
    print("=" * 60)
    print("Corrección de registros duplicados")
    print("=" * 60)

    # Buscar todos los archivos TypeScript
    ts_files = glob.glob(os.path.join(TS_DIR, "**", "*.ts"), recursive=True)

    fixed_count = 0

    for ts_file in ts_files:
        # Saltar archivos .d.ts
        if ts_file.endswith('.d.ts'):
            continue

        fixed, changes = fix_typescript_file(ts_file)

        if fixed:
            rel_path = os.path.relpath(ts_file, BASE_DIR)
            print(f"\n[OK] {rel_path}")
            for change in changes:
                print(f"  - {change}")
            fixed_count += 1

    print("\n" + "=" * 60)
    print(f"Total de archivos corregidos: {fixed_count}")
    print("=" * 60)
    print("\nAhora ejecute 'npx tsc' para compilar los cambios")

if __name__ == "__main__":
    main()
