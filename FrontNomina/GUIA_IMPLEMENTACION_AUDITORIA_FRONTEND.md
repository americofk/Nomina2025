# 📋 GUÍA DE IMPLEMENTACIÓN - SISTEMA DE AUDITORÍA FRONTEND

**Fecha:** 2025-11-25
**Proyecto:** DC365_WebNR (Frontend Nómina)
**Versión:** 1.0
**Compliance:** ISO 27001

---

## 🎯 RESUMEN EJECUTIVO

Este documento proporciona instrucciones paso a paso para integrar el sistema de auditoría ISO 27001 en los modelos y vistas del frontend. El sistema muestra automáticamente información de auditoría (Creación, Modificación, Eliminación) en los formularios.

---

## 📦 COMPONENTES CREADOS

### 1. Clases Base de Auditoría

**Ubicación:** `DC365_WebNR.CORE/Domain/Models/Common/`

#### AuditableModel.cs
Clase base abstracta para entidades auditables generales.

**Campos incluidos:**
- `RecId` (long) - Identificador único usando SEQUENCE
- `CreatedBy` (string, max 20) - Usuario que creó el registro
- `CreatedOn` (DateTime) - Fecha y hora de creación
- `ModifiedBy` (string, max 20) - Usuario que modificó
- `ModifiedOn` (DateTime) - Fecha y hora de modificación
- `IsDeleted` (bool) - Indicador de eliminación lógica
- `DeletedBy` (string, max 20) - Usuario que eliminó
- `DeletedOn` (DateTime?) - Fecha y hora de eliminación

#### AuditableCompanyModel.cs
Clase base para entidades específicas de empresa (hereda de AuditableModel).

**Campos adicionales:**
- `DataAreaId` (string, max 10) - Identificador de empresa (antes InCompany)

---

### 2. Componente Visual

**Archivo:** `DC365_WebNR.UI/Views/Shared/_AuditInfo.cshtml`

Partial view reutilizable que muestra la información de auditoría en un panel formateado.

**Características:**
- Diseño responsive (grid adaptativo)
- Muestra información de creación, modificación y eliminación
- Resalta registros eliminados con estilo especial
- Soporta tanto AuditableModel como AuditableCompanyModel

---

### 3. Estilos CSS

**Archivo:** `DC365_WebNR.UI/wwwroot/css/AuditInfo.css`

Estilos dedicados para el componente de auditoría.

**Ya integrado en:** `Views/Shared/_Layout.cshtml` línea 25

---

## 🔧 CÓMO IMPLEMENTAR EN OTROS MODELOS Y VISTAS

### PASO 1: Actualizar el Modelo

#### Para entidades NO específicas de empresa:

```csharp
// Antes
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class MiModelo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        // ... otros campos
    }
}

// Después
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;  // ← AGREGAR
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class MiModelo : AuditableModel  // ← HEREDAR
    {
        public string Id { get; set; }
        public string Name { get; set; }
        // ... otros campos
        // Los campos de auditoría se heredan automáticamente
    }
}
```

#### Para entidades específicas de empresa:

```csharp
// Usar AuditableCompanyModel en lugar de AuditableModel
public class MiModelo : AuditableCompanyModel
{
    // ... tus campos
}
```

---

### PASO 2: Integrar en la Vista

Agregar el partial view al final del formulario, dentro del contenedor `x_content`:

```html
<!-- Ejemplo: Views/M_MiEntidad/NewAndEditMiEntidad.cshtml -->

<div class="collapse contNewEntyti">
    <div class="col-md-12 col-sm-12 col-xs-12 margenFormmularios ContenedorFormularios2">
        <div class="x_panel">
            <div class="x_content">
                <h3 class="TituloFormularios">Nuevo registro</h3>
                <form id="createAndEdit" asp-action="save">

                    <!-- Tus campos del formulario aquí -->
                    <div class="contInterNuevoConteGastos">
                        <!-- ... -->
                    </div>

                </form>

                @* ← AGREGAR ESTA LÍNEA *@
                @await Html.PartialAsync("_AuditInfo", Model)

            </div>
        </div>
    </div>
</div>
```

**Importante:**
- Agregar DESPUÉS del `</form>` pero DENTRO del `<div class="x_content">`
- El componente solo se mostrará si el modelo tiene `RecId > 0` (registro existente)

---

## 📝 EJEMPLO COMPLETO: DEPARTMENT

### Modelo Actualizado
**Archivo:** `DC365_WebNR.CORE/Domain/Models/Department.cs`

```csharp
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;  // ← Agregado
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Department : AuditableCompanyModel  // ← Heredado
    {
        [CustomFilter("Id Departamento")]
        public string DepartmentId { get; set; }

        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        // ... resto de campos
    }
}
```

### Vista Actualizada
**Archivo:** `DC365_WebNR.UI/Views/M_Department/NewAndEditDepartment.cshtml`

```html
@model DC365_WebNR.CORE.Domain.Models.Department

<!-- ... resto del formulario ... -->

                    </div>
                </form>

                @* Información de Auditoría ISO 27001 *@
                @await Html.PartialAsync("_AuditInfo", Model)

            </div>
        </div>
    </div>
</div>
```

---

## 🔍 VALIDACIÓN DE FUNCIONAMIENTO

### Para registros NUEVOS:
- El componente de auditoría **NO se mostrará** (RecId = 0)
- Esto es correcto porque aún no existe información de auditoría

### Para registros EXISTENTES:
- El componente mostrará:
  - ✅ Usuario y fecha de creación
  - ✅ Usuario y fecha de última modificación
  - ✅ ID de empresa (si aplica)
  - ✅ RecId único

### Para registros ELIMINADOS (soft delete):
- Mostrará adicionalmente:
  - ⚠️ Usuario que eliminó
  - ⚠️ Fecha de eliminación
  - ⚠️ Sección resaltada en amarillo

---

## 📊 MODELOS QUE DEBEN ACTUALIZARSE

### Modelos que requieren AuditableCompanyModel:
(Entidades específicas de empresa)

- ✅ **Department** (ya actualizado)
- Employee
- EmployeeAddress
- EmployeeBankAccount
- EmployeeContactInf
- EmployeeDeductionCode
- EmployeeEarningCode
- EmployeeExtraHour
- EmployeeLoan
- EmployeePosition
- EmployeeTax
- DeductionCode
- EarningCode
- Payroll
- PayrollProcess
- Position
- Project
- Tax
- TaxDetail
- (Y todos los demás relacionados con empresa)

### Modelos que requieren AuditableModel:
(Entidades generales, no específicas de empresa)

- CalendarHoliday
- Country
- Currency
- DisabilityType
- EducationLevel
- Occupation
- Province
- (Entidades de catálogo general)

---

## 🎨 PERSONALIZACIÓN DEL COMPONENTE

### Modificar estilos:
Editar `wwwroot/css/AuditInfo.css`

### Modificar estructura HTML:
Editar `Views/Shared/_AuditInfo.cshtml`

### Ocultar campos específicos:
Modificar el partial view para comentar secciones no deseadas

---

## ⚠️ NOTAS IMPORTANTES

1. **DataAreaId vs InCompany:**
   - El campo `InCompany` fue renombrado a `DataAreaId` en el backend
   - El frontend usa `DataAreaId` en login y validación de empresa
   - Asegúrate de usar `DataAreaId` en todos los nuevos desarrollos

2. **Campos de Auditoría vs Campos de Modelo:**
   - NO incluyas manualmente RecId, CreatedBy, etc. en tus modelos
   - Estos campos se heredan automáticamente de las clases base
   - Solo define los campos específicos de tu entidad

3. **RecId y SEQUENCE:**
   - RecId se genera automáticamente en el backend usando SEQUENCE
   - Comienza en 20260100
   - NO intentes asignar valores manualmente

4. **Sincronización Backend-Frontend:**
   - Los modelos del frontend deben coincidir con el backend
   - Si el backend tiene AuditableCompanyEntity, el frontend debe usar AuditableCompanyModel
   - Si el backend tiene AuditableEntity, el frontend debe usar AuditableModel

---

## 🚀 PRÓXIMOS PASOS

### Inmediatos:
1. ✅ Actualizar modelo Department (completado)
2. ✅ Integrar componente en vista Department (completado)
3. Probar funcionalidad con datos reales del backend
4. Actualizar modelo Employee y vista
5. Actualizar modelo Position y vista

### A mediano plazo:
1. Actualizar TODOS los modelos listados anteriormente
2. Integrar componente en TODAS las vistas de edición
3. Validar que la información se muestre correctamente
4. Documentar casos especiales si se encuentran

### Opcionales:
1. Agregar tooltips explicativos
2. Crear reportes de auditoría
3. Implementar filtros por usuario en las tablas
4. Agregar indicadores visuales de "última modificación"

---

## 📞 SOPORTE Y REFERENCIAS

### Archivos Clave:
- **Modelos base:** `DC365_WebNR.CORE/Domain/Models/Common/`
- **Partial view:** `DC365_WebNR.UI/Views/Shared/_AuditInfo.cshtml`
- **CSS:** `DC365_WebNR.UI/wwwroot/css/AuditInfo.css`
- **Layout:** `DC365_WebNR.UI/Views/Shared/_Layout.cshtml`

### Ejemplo de Referencia:
- **Modelo:** `DC365_WebNR.CORE/Domain/Models/Department.cs`
- **Vista:** `DC365_WebNR.UI/Views/M_Department/NewAndEditDepartment.cshtml`

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

Para cada entidad que actualices:

- [ ] Agregar `using DC365_WebNR.CORE.Domain.Models.Common;`
- [ ] Heredar de `AuditableModel` o `AuditableCompanyModel`
- [ ] Verificar que compila sin errores
- [ ] Agregar `@await Html.PartialAsync("_AuditInfo", Model)` en vista
- [ ] Probar con registro nuevo (no debe mostrar auditoría)
- [ ] Probar con registro existente (debe mostrar auditoría)
- [ ] Verificar formato y estilos correctos

---

**Documento generado:** 2025-11-25
**Última actualización:** 2025-11-25
**Versión:** 1.0
**Autor:** Sistema de Auditoría ISO 27001
