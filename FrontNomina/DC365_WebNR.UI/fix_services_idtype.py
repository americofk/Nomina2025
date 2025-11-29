#!/usr/bin/env python3
"""
Script para agregar IdType a los servicios Process*.cs
"""

import os
import re

BASE_DIR = r"F:\Nomina2025\FrontNomina\DC365_WebNR.CORE\Aplication\Services"

# Mapeo de archivo -> (tipo entidad, campo ID)
SERVICES = {
    "ProcessPosition.cs": ("Position", "PositionId"),
    "ProcessVacants.cs": ("Vacants", "VacantId"),
    "ProcessCourseType.cs": ("CourseType", "CourseTypeId"),
    "ProcessInstructor.cs": ("Instructor", "InstructorId"),
    "ProcessCourseLocation.cs": ("CourseLocation", "CourseLocationId"),
    "ProcessClassRoom.cs": ("ClassRoom", "ClassRoomId"),
    "ProcessCourse.cs": ("Course", "CourseId"),
    "ProcessEarningCodes.cs": ("EarningCode", "EarningCodeId"),
    "ProcessDeductionCode.cs": ("DeductionCode", "DeductionCodeId"),
    "ProcessProject.cs": ("Project", "ProjectId"),
    "ProcessProjCategory.cs": ("ProjCategory", "CategoryId"),
    "ProcessLoan.cs": ("Loan", "LoanId"),
    "ProcessTax.cs": ("Tax", "TaxId"),
}

# Servicios en Container
SERVICES_CONTAINER = {
    "Container/ProcessUser.cs": ("User", "Alias"),
}

def fix_service_file(filepath, entity_type, id_field):
    """Agrega IdType al servicio"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Verificar si ya tiene IdType
        if 'responseUI.IdType' in content:
            return False, "Ya tiene IdType"

        # Patron 1: responseUI.Type = ErrorMsg.TypeOk; seguido de } luego else o return
        pattern1 = r'(responseUI\.Type = ErrorMsg\.TypeOk;)\s*(\n\s*\})'
        replacement1 = r'\1\n                // Devolver el ID del registro creado para cambiar a modo edicion\n                responseUI.IdType = DataApi.Data?.' + id_field + r';\2'

        new_content = re.sub(pattern1, replacement1, content, count=1)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, f"Agregado IdType = {id_field}"

        # Patron 2: responseUI.Type = "success"; seguido de }
        pattern2 = r'(responseUI\.Type = "success";)\s*(\n\s*\})'
        replacement2 = r'\1\n                    // Devolver el ID del registro creado para cambiar a modo edicion\n                    responseUI.IdType = DataApi.Data?.' + id_field + r';\2'

        new_content = re.sub(pattern2, replacement2, content, count=1)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, f"Agregado IdType = {id_field}"

        return False, "Patron no encontrado"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    print("=" * 60)
    print("Agregando IdType a servicios")
    print("=" * 60)

    fixed_count = 0

    # Procesar servicios normales
    for filename, (entity_type, id_field) in SERVICES.items():
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            fixed, msg = fix_service_file(filepath, entity_type, id_field)
            status = "[OK]" if fixed else "[--]"
            print(f"{status} {filename}: {msg}")
            if fixed:
                fixed_count += 1
        else:
            print(f"[!!] {filename}: No encontrado")

    # Procesar servicios en Container
    for filename, (entity_type, id_field) in SERVICES_CONTAINER.items():
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            fixed, msg = fix_service_file(filepath, entity_type, id_field)
            status = "[OK]" if fixed else "[--]"
            print(f"{status} {filename}: {msg}")
            if fixed:
                fixed_count += 1
        else:
            print(f"[!!] {filename}: No encontrado")

    print("\n" + "=" * 60)
    print(f"Total corregidos: {fixed_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
