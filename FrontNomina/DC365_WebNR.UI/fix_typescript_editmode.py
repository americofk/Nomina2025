#!/usr/bin/env python3
"""
Script para agregar logica de cambio a modo edicion en TypeScript
"""

import os
import re

BASE_DIR = r"F:\Nomina2025\FrontNomina\DC365_WebNR.UI\TypeScriptFile"

# Mapeo de archivo -> (campo ID en HTML, selector titulo, texto editar)
TYPESCRIPT_FILES = {
    "Position.ts": {
        "id_field": "PositionId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar puesto",
        "success_pattern": r"(windows_message\(data\.Message, data\.Type\);)\s*(\n\s*if \(shouldClose\))",
        "replacement_template": r'\1\n                    // Si era creacion y se devolvio el ID, cambiar a modo edicion\n                    if (option === 1 && data.IdType) {{\n                        $("#{id_field}").val(data.IdType);\n                        option = 2;\n                        $(".Showid").removeClass("collapse");\n                        $("{title_selector}").text("{edit_text}");\n                    }}\2'
    },
    "Vacants.ts": {
        "id_field": "VacantId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar vacante",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "CourseType.ts": {
        "id_field": "CourseTypeId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar tipo de curso",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Instructor.ts": {
        "id_field": "InstructorId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar instructor",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "CourseLocation.ts": {
        "id_field": "CourseLocationId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar ubicacion",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "ClassRoom.ts": {
        "id_field": "ClassRoomId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar salon",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Course.ts": {
        "id_field": "CourseId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar curso",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "EarningCode.ts": {
        "id_field": "EarningCodeId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar codigo de ganancia",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "DeductionCode.ts": {
        "id_field": "DeductionCodeId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar codigo de deduccion",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Project.ts": {
        "id_field": "ProjectId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar proyecto",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "ProjCategory.ts": {
        "id_field": "CategoryId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar categoria",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Loans.ts": {
        "id_field": "LoanId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar prestamo",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Tax.ts": {
        "id_field": "TaxId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar impuesto",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "User.ts": {
        "id_field": "Alias",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar usuario",
        "search": 'windows_message(data.Message, data.Type);',
        "after_block": "shouldCloseAfterSave"
    },
    "Payroll.ts": {
        "id_field": "PayrollId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar nomina",
        "uses_obj": True
    },
    "PayrollProcess.ts": {
        "id_field": "PayrollProcessId",
        "title_selector": ".seteartitulo",
        "edit_text": "Editar proceso",
        "uses_obj": True
    },
}

def fix_typescript_simple(filepath, config):
    """Agrega logica de cambio a modo edicion"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Verificar si ya tiene la correccion
        if 'option === 1 && data.IdType' in content or 'option === 1 && data.Obj' in content:
            return False, "Ya tiene la correccion"

        id_field = config["id_field"]
        title_selector = config.get("title_selector", ".seteartitulo")
        edit_text = config.get("edit_text", "Editar")
        uses_obj = config.get("uses_obj", False)

        # Codigo a insertar
        if uses_obj:
            insert_code = f'''

                        // Si era creacion y se devolvio el objeto, cambiar a modo edicion
                        if (option === 1 && data.Obj && data.Obj.{id_field}) {{
                            $('#{id_field}').val(data.Obj.{id_field});
                            option = 2;
                            $('.Showid').removeClass('collapse');
                            $('{title_selector}').text('{edit_text}');
                        }}
'''
        else:
            insert_code = f'''

                        // Si era creacion y se devolvio el ID, cambiar a modo edicion
                        if (option === 1 && data.IdType) {{
                            $('#{id_field}').val(data.IdType);
                            option = 2;
                            $('.Showid').removeClass('collapse');
                            $('{title_selector}').text('{edit_text}');
                        }}
'''

        # Buscar el patron: windows_message(data.Message, data.Type); seguido de if (shouldCloseAfterSave)
        pattern = r"(windows_message\(data\.Message,\s*data\.Type\);?)(\s*\n\s*if\s*\(shouldCloseAfterSave\))"

        match = re.search(pattern, content)
        if match:
            new_content = content[:match.end(1)] + insert_code + content[match.start(2):]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, f"Agregado cambio a modo edicion ({id_field})"

        # Patron alternativo: windows_message seguido de if (shouldClose) sin After
        pattern2 = r"(windows_message\(data\.Message,\s*data\.Type\);?)(\s*\n\s*if\s*\(shouldClose\)\s*\{)"
        match2 = re.search(pattern2, content)
        if match2:
            new_content = content[:match2.end(1)] + insert_code + content[match2.start(2):]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, f"Agregado cambio a modo edicion ({id_field})"

        return False, "Patron no encontrado"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    print("=" * 60)
    print("Agregando logica de modo edicion a TypeScript")
    print("=" * 60)

    fixed_count = 0

    for filename, config in TYPESCRIPT_FILES.items():
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            fixed, msg = fix_typescript_simple(filepath, config)
            status = "[OK]" if fixed else "[--]"
            print(f"{status} {filename}: {msg}")
            if fixed:
                fixed_count += 1
        else:
            print(f"[!!] {filename}: No encontrado")

    print("\n" + "=" * 60)
    print(f"Total corregidos: {fixed_count}")
    print("=" * 60)
    print("\nAhora ejecute 'npx tsc' para compilar los cambios")

if __name__ == "__main__":
    main()
