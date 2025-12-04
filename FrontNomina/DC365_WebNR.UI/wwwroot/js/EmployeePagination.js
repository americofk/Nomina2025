/**
 * EmployeePagination.js
 * Paginacion para la tabla de empleados
 */

let employeePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initEmployeePagination();
});

function initEmployeePagination() {
    const container = document.getElementById('employee-page');
    if (!container) return;

    // Obtener el tipo de empleado desde el data attribute
    const employeeType = container.dataset.employeeType || 'Empleados';

    // Determinar el endpoint segun el tipo
    let apiEndpoint = '/empleadosactivos/GetEmployeesPaged';
    let workStatus = 'Employ';

    if (employeeType === 'Prospectos a empleado') {
        workStatus = 'Candidate';
    } else if (employeeType === 'Dados de baja') {
        workStatus = 'Dismissed';
    }

    employeePagination = new TablePagination({
        container: '#employee-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Employee',
        apiEndpoint: `${apiEndpoint}?workStatus=${workStatus}`,
        pageSize: 20,
        rowRenderer: renderEmployeeRow,
        onDataLoaded: function(result) {
            reinitEmployeeEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los empleados.', 'error');
            }
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
        // El tiempo puede venir como "HH:mm:ss" o como objeto
        if (typeof timeStr === 'string') {
            const parts = timeStr.split(':');
            return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
        }
        return '00:00';
    };

    const boolToSiNo = (val) => val ? 'Si' : 'No';

    // Obtener el tipo de empleado para mostrar la columna correcta
    const container = document.getElementById('employee-page');
    const employeeType = container ? container.dataset.employeeType : 'Empleados';
    const isDismissed = employeeType === 'Dados de baja';

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectEmployees">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal EmployeeIdtbl" data-title="Numero de personal">${item.EmployeeId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app LastNametbl" data-title="Apellido">${item.LastName || ''}</td>
            <td class="cell-app PersonalTreatmenttbl" data-title="Tratamiento">${item.PersonalTreatment || ''}</td>
            <td class="cell-app BirthDatetbl" data-title="Fecha nacimiento">${formatDate(item.BirthDate)}</td>
            <td class="cell-app Gendertbl" data-title="Genero">${item.Gender || ''}</td>
            <td class="cell-app Agetbl" data-title="Edad">${item.Age || 0}</td>
            <td class="cell-app DependentsNumberstbl" data-title="Dependientes">${item.DependentsNumbers || 0}</td>
            <td class="cell-app MaritalStatustbl" data-title="Estado civil">${item.MaritalStatus || ''}</td>
            <td class="cell-app NSStbl" data-title="NSS">${item.NSS || ''}</td>
            <td class="cell-app ARStbl" data-title="ARS">${item.ARS || ''}</td>
            <td class="cell-app AFPtbl" data-title="AFP">${item.AFP || ''}</td>
            <td class="cell-app AdmissionDatetbl" data-title="Fecha ingreso">${formatDate(item.AdmissionDate)}</td>
            <td class="cell-app Countrytbl" data-title="Pais">${item.Country || ''}</td>
            <td class="cell-app EmployeeTypetbl" data-title="${isDismissed ? 'Motivo' : 'Tipo empleado'}">${isDismissed ? (item.EmployeeAction || '') : (item.EmployeeType || '')}</td>
            <td class="cell-app HomeOfficetbl" data-title="Home Office">${boolToSiNo(item.HomeOffice)}</td>
            <td class="cell-app OwnCartbl" data-title="Vehiculo propio">${boolToSiNo(item.OwnCar)}</td>
            <td class="cell-app HasDisabilitytbl" data-title="Discapacidad">${boolToSiNo(item.HasDisability)}</td>
            <td class="cell-app ApplyforOvertimetbl" data-title="Aplica horas extra">${boolToSiNo(item.ApplyforOvertime)}</td>
            <td class="cell-app IsFixedWorkCalendartbl" data-title="Calendario fijo">${boolToSiNo(item.IsFixedWorkCalendar)}</td>
            <td class="cell-app WorkFromtbl" data-title="Hora entrada">${formatTime(item.WorkFrom)}</td>
            <td class="cell-app WorkTotbl" data-title="Hora salida">${formatTime(item.WorkTo)}</td>
            <td class="cell-app BreakWorkFromtbl" data-title="Inicio descanso">${formatTime(item.BreakWorkFrom)}</td>
            <td class="cell-app BreakWorkTotbl" data-title="Fin descanso">${formatTime(item.BreakWorkTo)}</td>
            <td class="cell-app EmployeeStatustbl" data-title="Estado">${item.EmployeeStatus ? 'Activo' : 'Inactivo'}</td>
            <td class="cell-app StartWorkDatetbl" data-title="Inicio trabajo">${formatDate(item.StartWorkDate)}</td>
            <td class="cell-app EndWorkDatetbl" data-title="Fin trabajo">${formatDate(item.EndWorkDate)}</td>
            <td class="cell-app PayMethodtbl" data-title="Metodo pago">${item.PayMethod || ''}</td>
            <td class="cell-app WorkStatustbl" data-title="Estado laboral">${item.WorkStatus || ''}</td>
            <td class="cell-app EmployeeActiontbl" data-title="Accion">${item.EmployeeAction || ''}</td>
            <td class="cell-app OccupationIdtbl" data-title="Ocupacion">${item.OccupationId || ''}</td>
            <td class="cell-app EducationLevelIdtbl" data-title="Nivel educacion">${item.EducationLevelId || ''}</td>
            <td class="cell-app DisabilityTypeIdtbl" data-title="Tipo discapacidad">${item.DisabilityTypeId || ''}</td>
            <td class="cell-app Nationalitytbl" data-title="Nacionalidad">${item.Nationality || ''}</td>
            <td class="cell-app LocationIdtbl" data-title="Localidad">${item.LocationId || ''}</td>
        </tr>
    `;
}

function reinitEmployeeEvents() {
    // Checkbox seleccionar todo
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) {
        checkAll.checked = false;
    }

    // Doble clic para editar
    const rows = document.querySelectorAll('.tbody-Table-Employee .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectEmployees');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditEmployee');
            if (editBtn) editBtn.click();
        });
    });

    // Re-inicializar grid views si existe
    if (typeof initEmployeeViews === 'function') {
        initEmployeeViews();
    }
}

// Funciones globales
function refreshEmployeeTable() {
    if (employeePagination) employeePagination.refresh();
}

function resetEmployeePagination() {
    if (employeePagination) employeePagination.reset();
}
