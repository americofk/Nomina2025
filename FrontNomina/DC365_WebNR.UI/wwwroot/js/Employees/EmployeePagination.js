/**
 * @file EmployeePagination.js
 * @description Inicialización de paginación para la tabla de empleados.
 * @author Equipo de Desarrollo
 * @date 2025
 */

// Variable global para la instancia de paginación
let employeePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initEmployeePagination();
});

function initEmployeePagination() {
    const container = document.getElementById('employee-page');
    if (!container) return;

    const workStatus = container.dataset.employeeType;
    let type = '';

    switch (workStatus) {
        case 'Empleados':
            type = 'Empleado';
            break;
        case 'Prospectos a empleado':
            type = 'Candidato';
            break;
        case 'Dados de baja':
            type = 'Desvinculado';
            break;
    }

    employeePagination = new TablePagination({
        container: '#employee-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Employee',
        apiEndpoint: '/empleadosactivos/GetEmployeesPaged',
        type: type,
        pageSize: parseInt(document.querySelector('.pagination-container .page-size-select')?.value || '20'),
        rowRenderer: renderEmployeeRow,
        onDataLoaded: function(result) {
            // Re-inicializar eventos de la tabla
            reinitializeTableEvents();
        },
        onError: function(error) {
            windows_message('Error al cargar los empleados. Intente nuevamente.', 'error');
        }
    });
}

function renderEmployeeRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '00:00';
        // Si viene como "HH:mm:ss" o "PT8H" o similar
        if (typeof timeStr === 'string' && timeStr.includes(':')) {
            return timeStr.substring(0, 5);
        }
        return '00:00';
    };

    const boolToText = (val) => val ? 'Sí' : 'No';

    const workStatusText = (status) => {
        switch (status) {
            case 0: return 'Candidato';
            case 1: return 'Desvinculado';
            case 2: return 'Empleado';
            case 3: return 'Deshabilitado';
            default: return status;
        }
    };

    const employeeType = document.getElementById('employee-page')?.dataset.employeeType || 'Empleados';
    const isDismissed = employeeType === 'Dados de baja';

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectEmployees">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal EmployeeIdtbl" data-title="Número de personal">${item.employeeId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre">${item.name || ''}</td>
            <td class="cell-app LastNametbl" data-title="Apellido">${item.lastName || ''}</td>
            <td class="cell-app PersonalTreatmenttbl" data-title="Tratamiento">${item.personalTreatment || ''}</td>
            <td class="cell-app BirthDatetbl" data-title="Fecha nacimiento">${formatDate(item.birthDate)}</td>
            <td class="cell-app Gendertbl" data-title="Género">${item.gender || ''}</td>
            <td class="cell-app Agetbl" data-title="Edad">${item.age || ''}</td>
            <td class="cell-app DependentsNumberstbl" data-title="Dependientes">${item.dependentsNumbers || 0}</td>
            <td class="cell-app MaritalStatustbl" data-title="Estado civil">${item.maritalStatus || ''}</td>
            <td class="cell-app NSStbl" data-title="NSS">${item.nss || ''}</td>
            <td class="cell-app ARStbl" data-title="ARS">${item.ars || ''}</td>
            <td class="cell-app AFPtbl" data-title="AFP">${item.afp || ''}</td>
            <td class="cell-app AdmissionDatetbl" data-title="Fecha ingreso">${formatDate(item.admissionDate)}</td>
            <td class="cell-app Countrytbl" data-title="País">${item.country || ''}</td>
            ${isDismissed
                ? `<td class="cell-app EmployeeTypetbl" data-title="Motivo">${item.employeeAction || ''}</td>`
                : `<td class="cell-app EmployeeTypetbl" data-title="Tipo empleado">${item.employeeType || ''}</td>`
            }
            <td class="cell-app HomeOfficetbl" data-title="Home Office">${boolToText(item.homeOffice)}</td>
            <td class="cell-app OwnCartbl" data-title="Vehículo propio">${boolToText(item.ownCar)}</td>
            <td class="cell-app HasDisabilitytbl" data-title="Discapacidad">${boolToText(item.hasDisability)}</td>
            <td class="cell-app ApplyforOvertimetbl" data-title="Aplica horas extra">${boolToText(item.applyforOvertime)}</td>
            <td class="cell-app IsFixedWorkCalendartbl" data-title="Calendario fijo">${boolToText(item.isFixedWorkCalendar)}</td>
            <td class="cell-app WorkFromtbl" data-title="Hora entrada">${formatTime(item.workFrom)}</td>
            <td class="cell-app WorkTotbl" data-title="Hora salida">${formatTime(item.workTo)}</td>
            <td class="cell-app BreakWorkFromtbl" data-title="Inicio descanso">${formatTime(item.breakWorkFrom)}</td>
            <td class="cell-app BreakWorkTotbl" data-title="Fin descanso">${formatTime(item.breakWorkTo)}</td>
            <td class="cell-app EmployeeStatustbl" data-title="Estado">${item.employeeStatus ? 'Activo' : 'Inactivo'}</td>
            <td class="cell-app StartWorkDatetbl" data-title="Inicio trabajo">${formatDate(item.startWorkDate)}</td>
            <td class="cell-app EndWorkDatetbl" data-title="Fin trabajo">${formatDate(item.endWorkDate)}</td>
            <td class="cell-app PayMethodtbl" data-title="Método pago">${item.payMethod || ''}</td>
            <td class="cell-app WorkStatustbl" data-title="Estado laboral">${workStatusText(item.workStatus)}</td>
            <td class="cell-app EmployeeActiontbl" data-title="Acción">${item.employeeAction || ''}</td>
            <td class="cell-app OccupationIdtbl" data-title="Ocupación">${item.occupationId || ''}</td>
            <td class="cell-app EducationLevelIdtbl" data-title="Nivel educación">${item.educationLevelId || ''}</td>
            <td class="cell-app DisabilityTypeIdtbl" data-title="Tipo discapacidad">${item.disabilityTypeId || ''}</td>
            <td class="cell-app Nationalitytbl" data-title="Nacionalidad">${item.nationality || ''}</td>
            <td class="cell-app LocationIdtbl" data-title="Localidad">${item.locationId || ''}</td>
        </tr>
    `;
}

function reinitializeTableEvents() {
    // Re-inicializar checkbox de selección todo
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) {
        checkAll.checked = false;
        checkAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.tbody-Table-Employee .selectEmployees');
            checkboxes.forEach(cb => {
                cb.checked = this.checked;
                const row = cb.closest('.row-app');
                if (row) {
                    row.classList.toggle('selected', this.checked);
                }
            });
        });
    }

    // Re-inicializar doble clic para editar
    const tbody = document.querySelector('.tbody-Table-Employee');
    if (tbody) {
        tbody.querySelectorAll('.row-app').forEach(row => {
            row.addEventListener('dblclick', function(e) {
                if (e.target.type === 'checkbox') return;
                const employeeId = this.querySelector('.EmployeeIdtbl')?.textContent?.trim();
                if (employeeId) {
                    // Simular clic en editar
                    const editBtn = document.querySelector('.EditEmployee');
                    if (editBtn) {
                        // Seleccionar la fila primero
                        const checkbox = this.querySelector('.selectEmployees');
                        if (checkbox) {
                            checkbox.checked = true;
                            checkbox.dispatchEvent(new Event('change'));
                        }
                        editBtn.click();
                    }
                }
            });
        });
    }

    // Re-inicializar grid views manager si existe
    if (typeof initEmployeeViews === 'function') {
        initEmployeeViews();
    }

    // Re-inicializar table features si existe
    if (typeof initTableFeatures === 'function') {
        initTableFeatures({
            filterInput: '.textFilterMask',
            table: '#MainTable',
            tbody: '.tbody-Table-Employee'
        });
    }
}

// Función global para refrescar la tabla desde otros scripts
function refreshEmployeeTable() {
    if (employeePagination) {
        employeePagination.refresh();
    }
}

// Función global para resetear la paginación
function resetEmployeePagination() {
    if (employeePagination) {
        employeePagination.reset();
    }
}
