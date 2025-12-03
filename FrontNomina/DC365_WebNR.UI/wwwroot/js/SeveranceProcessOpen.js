/**
 * @file SeveranceProcessOpen.ts
 * @description Modulo para la gestion de un proceso de prestaciones abierto.
 *              Permite agregar, editar, eliminar y calcular prestaciones de empleados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestacionesLaboralesOpen
 */
// Variables globales del proceso
const pageData = {
    token: '',
    userRecId: 0,
    dataAreaId: '',
    processId: '',
    isNew: false
};
// Inicializar datos de la pagina
document.addEventListener('DOMContentLoaded', function () {
    const page = document.getElementById('openprocess-page');
    if (page) {
        pageData.token = page.dataset.token || '';
        pageData.userRecId = parseInt(page.dataset.user || '0');
        pageData.dataAreaId = page.dataset.dataarea || '';
        pageData.processId = page.dataset.processid || '';
        pageData.isNew = page.dataset.isnew === 'true';
    }
    // Cargar lista de empleados para el modal de agregar (solo si no es nuevo)
    if (!pageData.isNew) {
        fn.LoadEmployeesList();
    }
});
// Funciones
const fn = {
    /**
     * Refresca la tabla de detalles y las tarjetas de totales
     */
    RefreshDetailsTable: function () {
        $.ajax({
            url: `/prestacioneslaborales/${pageData.processId}`,
            type: "GET",
            async: true,
            success: function (html) {
                // Parsear el HTML para obtener solo las partes que necesitamos
                const newDom = $(html);
                // Actualizar tabla de detalles
                const newTbody = newDom.find('.tbody-Table-SeveranceDetails').html();
                if (newTbody) {
                    $('.tbody-Table-SeveranceDetails').html(newTbody);
                }
                // Actualizar tarjetas de totales
                const cardPreaviso = newDom.find('#card-preaviso').text();
                const cardCesantia = newDom.find('#card-cesantia').text();
                const cardVacaciones = newDom.find('#card-vacaciones').text();
                const cardNavidad = newDom.find('#card-navidad').text();
                const cardTotal = newDom.find('#card-total').text();
                if (cardPreaviso)
                    $('#card-preaviso').text(cardPreaviso);
                if (cardCesantia)
                    $('#card-cesantia').text(cardCesantia);
                if (cardVacaciones)
                    $('#card-vacaciones').text(cardVacaciones);
                if (cardNavidad)
                    $('#card-navidad').text(cardNavidad);
                if (cardTotal)
                    $('#card-total').text(cardTotal);
                // Actualizar cantidad de empleados
                const employeeQty = newDom.find('#EmployeeQuantity').val();
                if (employeeQty)
                    $('#EmployeeQuantity').val(employeeQty);
            },
            error: function (xhr) {
                console.log("Error al refrescar la tabla de detalles");
            }
        });
    },
    /**
     * Carga la lista de empleados para el selector
     */
    LoadEmployeesList: function () {
        $.ajax({
            url: "/prestacioneslaborales/ObtenerEmpleados",
            type: "GET",
            async: true,
            success: function (data) {
                if (data && data.length > 0) {
                    const select = $("#SelectEmployee");
                    select.find('option:not(:first)').remove();
                    data.forEach(function (emp) {
                        select.append(`<option value="${emp.value}">${emp.text}</option>`);
                    });
                }
            },
            error: function (xhr) {
                console.log("Error cargando empleados");
            }
        });
    },
    /**
     * Muestra el modal para agregar un empleado
     */
    ShowAddEmployeeModal: function () {
        $("#SelectEmployee").val('');
        $(".modal-AddEmployee").show();
    },
    /**
     * Cierra el modal de agregar empleado
     */
    CloseAddEmployeeModal: function () {
        $(".modal-AddEmployee").hide();
    },
    /**
     * Agrega el empleado seleccionado al proceso
     */
    AddEmployee: function () {
        const employeeId = $("#SelectEmployee").val();
        if (!employeeId) {
            windows_message("Debe seleccionar un empleado", "error");
            return;
        }
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/prestacioneslaborales/agregarempleado",
            type: "POST",
            data: {
                SeveranceProcessId: pageData.processId,
                EmployeeId: employeeId,
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
            },
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    if (data.Errors && data.Errors.length > 0) {
                        FormatErrors(data);
                    }
                    else {
                        windows_message(data.Message || "Error al agregar empleado", data.Type);
                    }
                }
                else {
                    windows_message(data.Message || "Empleado agregado correctamente", data.Type);
                    fn.CloseAddEmployeeModal();
                    // Refrescar la tabla de detalles sin recargar toda la pagina
                    fn.RefreshDetailsTable();
                    // Recargar lista de empleados disponibles
                    fn.LoadEmployeesList();
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                console.log("Error xhr:", xhr);
                redireccionaralLogin(xhr);
            }
        });
    },
    /**
     * Muestra el modal para editar un empleado existente
     */
    ShowEditEmployeeModal: function (employeeId) {
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: `/prestacioneslaborales/ObtenerFormEditar?processId=${pageData.processId}&employeeId=${employeeId}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data) {
                    fn.ShowEditModal(data);
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                redireccionaralLogin(xhr);
            }
        });
    },
    /**
     * Muestra y configura el modal de edicion de detalle
     */
    ShowEditModal: function (data) {
        // Insertar el modal en el contenedor
        $("#ContModalDetail").html(data);
        // Configurar eventos del modal
        fn.SetupDetailModalEvents();
        // Inicializar plugins de formato numerico
        fn.InitNumberFormat();
        // Calcular tiempo laborando inicial
        fn.CalculateTiempoLaborando();
        // Mostrar modal (es full-page, solo mostrar)
        $("#ModalEditDetail").show();
    },
    /**
     * Configura los eventos del modal de detalle
     */
    SetupDetailModalEvents: function () {
        // Cerrar modal
        $(".closeModalDetail").off('click').on('click', function () {
            fn.CloseEditModal();
        });
        // Guardar y cerrar
        $(".btnSaveAndCloseDetail").off('click').on('click', function () {
            fn.SaveDetail(true);
        });
        // Solo guardar
        $(".btnSaveDetail").off('click').on('click', function () {
            fn.SaveDetail(false);
        });
        // Calcular
        $(".btnCalculateDetail").off('click').on('click', function () {
            fn.CalculateDetail();
        });
        // Imprimir reporte individual
        $(".btnPrintDetailReport").off('click').on('click', function () {
            fn.PrintDetailReport();
        });
        // Info de auditoria del detalle
        $(".AuditInfoDetail").off('click').on('click', function () {
            fn.ShowDetailAuditInfo();
        });
        // Recalcular tiempo laborando cuando cambien las fechas
        $("input[name='StartWorkDate'], input[name='EndWorkDate']").off('change').on('change', function () {
            fn.CalculateTiempoLaborando();
        });
    },
    /**
     * Calcula el tiempo laborando entre fecha de inicio y fin
     */
    CalculateTiempoLaborando: function () {
        const startDateStr = $("input[name='StartWorkDate']").val();
        const endDateStr = $("input[name='EndWorkDate']").val();
        if (!startDateStr || !endDateStr) {
            $("input[name='TiempoLaborando']").val('');
            return;
        }
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            $("input[name='TiempoLaborando']").val('');
            return;
        }
        if (endDate < startDate) {
            $("input[name='TiempoLaborando']").val('Fecha inválida');
            return;
        }
        // Calcular diferencia en años, meses y días
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();
        // Ajustar días negativos
        if (days < 0) {
            months--;
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        // Ajustar meses negativos
        if (months < 0) {
            years--;
            months += 12;
        }
        // Construir texto
        let resultado = '';
        if (years > 0) {
            resultado += years + (years === 1 ? ' año' : ' años');
        }
        if (months > 0) {
            if (resultado)
                resultado += ', ';
            resultado += months + (months === 1 ? ' mes' : ' meses');
        }
        if (days > 0 || resultado === '') {
            if (resultado)
                resultado += ', ';
            resultado += days + (days === 1 ? ' día' : ' días');
        }
        $("input[name='TiempoLaborando']").val(resultado);
    },
    /**
     * Inicializa el formato numerico en los campos
     */
    InitNumberFormat: function () {
        $(".plugin-number-format").each(function () {
            // Formatear valores existentes
            const val = $(this).val();
            if (val) {
                const num = parseFloat(val.replace(/,/g, ''));
                if (!isNaN(num)) {
                    $(this).val(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                }
            }
        });
    },
    /**
     * Cierra el modal de edicion
     */
    CloseEditModal: function () {
        $("#ModalEditDetail").hide();
        $("#ContModalDetail").html('');
    },
    /**
     * Guarda el detalle del empleado
     */
    SaveDetail: function (closeAfterSave = false) {
        // Convertir valores con formato a numeros antes de enviar
        fn.PrepareFormForSubmit();
        let formData = $("#formEditDetail").serialize();
        formData += "&__RequestVerificationToken=" + encodeURIComponent($('input[name="__RequestVerificationToken"]').val());
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/prestacioneslaborales/actualizardetalle",
            type: "POST",
            data: formData,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                }
                else {
                    windows_message(data.Message || "Detalle guardado correctamente", data.Type);
                    if (closeAfterSave) {
                        fn.CloseEditModal();
                    }
                    // Siempre refrescar la tabla de detalles despues de guardar
                    fn.RefreshDetailsTable();
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                redireccionaralLogin(xhr);
            }
        });
    },
    /**
     * Prepara el formulario quitando formato de numeros
     */
    PrepareFormForSubmit: function () {
        $(".plugin-number-format").each(function () {
            const val = $(this).val();
            if (val) {
                const num = parseFloat(val.replace(/,/g, ''));
                if (!isNaN(num)) {
                    $(this).val(num.toString());
                }
            }
        });
    },
    /**
     * Calcula las prestaciones del empleado actual
     */
    CalculateDetail: function () {
        const employeeId = $("input[name='EmployeeId']").val();
        windows_message("Desea calcular las prestaciones de este empleado?", "confirm", {
            onOk: function () {
                $('.progreso').modal({ backdrop: 'static', keyboard: false });
                $.ajax({
                    url: "/prestacioneslaborales/calculardetalle",
                    type: "POST",
                    data: {
                        processId: pageData.processId,
                        employeeId: employeeId,
                        __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
                    },
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message || "Calculo realizado correctamente", data.Type);
                            // Recargar el modal con los nuevos datos
                            fn.ShowEditEmployeeModal(employeeId);
                        }
                    },
                    error: function (xhr) {
                        $('.progreso').modal('hide');
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });
    },
    /**
     * Imprime el reporte individual del empleado
     */
    PrintDetailReport: function () {
        const employeeId = $("input[name='EmployeeId']").val();
        window.open(`/reportes/prestacioneslaborales/detalle?processId=${pageData.processId}&employeeId=${employeeId}`, '_blank');
    },
    /**
     * Muestra info de auditoria del detalle
     */
    ShowDetailAuditInfo: function () {
        const data = {
            DataAreaId: $('#DetailDataAreaId').val() || '-',
            RecId: $('#DetailRecId').val() || '-',
            CreatedBy: $('#DetailCreatedBy').val() || '-',
            CreatedOn: $('#DetailCreatedOn').val(),
            ModifiedBy: $('#DetailModifiedBy').val() || '-',
            ModifiedOn: $('#DetailModifiedOn').val()
        };
        showAuditModal(data);
    },
    /**
     * Obtiene los IDs de empleados seleccionados
     */
    GetSelectedEmployeeIds: function () {
        const ids = [];
        $(".selectDetail[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                const employeeId = $(this).closest('tr').data('employeeid');
                if (employeeId) {
                    ids.push(employeeId.toString());
                }
            }
        });
        return ids;
    },
    /**
     * Elimina los empleados seleccionados
     */
    DeleteSelectedEmployees: function () {
        const selectedIds = fn.GetSelectedEmployeeIds();
        if (selectedIds.length === 0) {
            windows_message("Debe seleccionar al menos un empleado!", "error");
            return;
        }
        windows_message("Desea eliminar los empleados seleccionados del proceso?", "confirm", {
            onOk: function () {
                $('.progreso').modal({ backdrop: 'static', keyboard: false });
                // Eliminar uno por uno
                let completed = 0;
                let hasError = false;
                selectedIds.forEach(function (employeeId) {
                    $.ajax({
                        url: "/prestacioneslaborales/eliminarempleado",
                        type: "POST",
                        data: {
                            processId: pageData.processId,
                            employeeId: employeeId,
                            __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
                        },
                        async: true,
                        success: function (data) {
                            completed++;
                            if (data.Type == "error") {
                                hasError = true;
                            }
                            if (completed === selectedIds.length) {
                                $('.progreso').modal('hide');
                                if (!hasError) {
                                    windows_message("Empleados eliminados correctamente", "success");
                                }
                                // Refrescar la tabla de detalles sin recargar toda la pagina
                                fn.RefreshDetailsTable();
                                // Recargar lista de empleados disponibles
                                fn.LoadEmployeesList();
                            }
                        },
                        error: function (xhr) {
                            completed++;
                            hasError = true;
                            if (completed === selectedIds.length) {
                                $('.progreso').modal('hide');
                                // Refrescar la tabla de detalles sin recargar toda la pagina
                                fn.RefreshDetailsTable();
                                fn.LoadEmployeesList();
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * Guarda el proceso completo
     */
    SaveProcess: function (closeAfterSave = false) {
        const processData = {
            SeveranceProcessId: pageData.processId,
            ProcessDate: $("#ProcessDate").val(),
            Description: $("#Description").val(),
            operation: pageData.isNew ? "1" : "2",
            __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
        };
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/prestacioneslaborales/guardar",
            type: "POST",
            data: processData,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                }
                else {
                    windows_message(data.Message || "Proceso guardado correctamente", data.Type);
                    if (closeAfterSave) {
                        window.location.href = '/prestacioneslaborales';
                    }
                    else if (pageData.isNew && data.Obj) {
                        // Si era nuevo, navegar al proceso creado
                        window.location.href = `/prestacioneslaborales/${data.Obj}`;
                    }
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                redireccionaralLogin(xhr);
            }
        });
    },
    /**
     * Calcula todos los empleados del proceso
     */
    CalculateAllEmployees: function () {
        windows_message("Desea calcular las prestaciones de todos los empleados del proceso?", "confirm", {
            onOk: function () {
                $('.progreso').modal({ backdrop: 'static', keyboard: false });
                $.ajax({
                    url: "/prestacioneslaborales/calcular",
                    type: "POST",
                    data: {
                        processId: pageData.processId,
                        __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
                    },
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message || "Calculo realizado correctamente", data.Type);
                            // Refrescar la tabla de detalles sin recargar toda la pagina
                            fn.RefreshDetailsTable();
                        }
                    },
                    error: function (xhr) {
                        $('.progreso').modal('hide');
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });
    },
    /**
     * Imprime el reporte del proceso
     */
    PrintReport: function () {
        window.open(`/reportes/prestacioneslaborales?processId=${pageData.processId}`, '_blank');
    }
};
// Event Listeners
escuchadores: {
    // Agregar empleado - abre modal simple
    $(".AddEmployee").on("click", function () {
        fn.ShowAddEmployeeModal();
    });
    // Submit del form de agregar empleado
    $("#formAddEmployee").on("submit", function (e) {
        e.preventDefault();
        fn.AddEmployee();
    });
    // Cerrar modal de agregar
    $(".close-modal-AddEmployee").on("click", function () {
        fn.CloseAddEmployeeModal();
    });
    // Editar empleado seleccionado - abre modal completo
    $(".EditEmployee").on("click", function () {
        const selectedIds = fn.GetSelectedEmployeeIds();
        if (selectedIds.length === 0) {
            windows_message("Debe seleccionar un empleado!", "error");
        }
        else if (selectedIds.length > 1) {
            windows_message("Debe seleccionar solo un empleado!", "info");
        }
        else {
            fn.ShowEditEmployeeModal(selectedIds[0]);
        }
    });
    // Eliminar empleados
    $(".DeleteEmployee").on("click", function () {
        fn.DeleteSelectedEmployees();
    });
    // Guardar proceso
    $(".SaveSeverance").on("click", function () {
        fn.SaveProcess(false);
    });
    // Guardar y cerrar proceso
    $(".SaveAndCloseSeverance").on("click", function () {
        fn.SaveProcess(true);
    });
    // Calcular todos los empleados
    $(".CalculateProcess").on("click", function () {
        fn.CalculateAllEmployees();
    });
    // Imprimir reporte
    $(".PrintReport").on("click", function () {
        fn.PrintReport();
    });
    // Actualizar pagina
    $(".OpcActualizar").on("click", function () {
        location.reload();
    });
    // Cerrar modulo - volver al listado
    $(".CerrarModulo").on("click", function () {
        window.location.href = '/prestacioneslaborales';
    });
    // Doble clic para editar en la tabla de detalles
    $(document).on('dblclick', '#tbodyDetails .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const employeeId = $(this).data('employeeid');
        if (employeeId) {
            fn.ShowEditEmployeeModal(employeeId);
        }
    });
    // Aplicar estilo clickable a las filas
    $('#tbodyDetails .row-app').addClass('row-clickable');
    // Checkbox "seleccionar todos" en la tabla de detalles
    $("#check-detail-0").on('change', function () {
        const isChecked = $(this).is(':checked');
        $(".selectDetail").prop('checked', isChecked);
    });
    // Informacion de auditoria
    $(".AuditInfo").on('click', function () {
        $.ajax({
            url: `/prestacioneslaborales/getbyid?Id=${pageData.processId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data) {
                    showAuditModal(data);
                }
            },
            error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V2ZXJhbmNlUHJvY2Vzc09wZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9TZXZlcmFuY2VQcm9jZXNzT3Blbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBc0JILGlDQUFpQztBQUNqQyxNQUFNLFFBQVEsR0FBRztJQUNiLEtBQUssRUFBRSxFQUFFO0lBQ1QsU0FBUyxFQUFFLENBQUM7SUFDWixVQUFVLEVBQUUsRUFBRTtJQUNkLFNBQVMsRUFBRSxFQUFFO0lBQ2IsS0FBSyxFQUFFLEtBQUs7Q0FDZixDQUFDO0FBRUYsaUNBQWlDO0FBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUMxQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekQsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNQLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO0lBQ25ELENBQUM7SUFFRCwyRUFBMkU7SUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0FBQ0wsQ0FB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bi50c1xyXG4gKiBAZGVzY3JpcHRpb24gTW9kdWxvIHBhcmEgbGEgZ2VzdGlvbiBkZSB1biBwcm9jZXNvIGRlIHByZXN0YWNpb25lcyBhYmllcnRvLlxyXG4gKiAgICAgICAgICAgICAgUGVybWl0ZSBhZ3JlZ2FyLCBlZGl0YXIsIGVsaW1pbmFyIHkgY2FsY3VsYXIgcHJlc3RhY2lvbmVzIGRlIGVtcGxlYWRvcy5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgUHJlc3RhY2lvbmVzTGFib3JhbGVzT3BlblxyXG4gKi9cclxuXHJcbi8vIERlY2xhcmFjaW9uZXMgZGUgdGlwb3MgZ2xvYmFsZXNcclxuZGVjbGFyZSBmdW5jdGlvbiB3aW5kb3dzX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiB2b2lkO1xyXG5kZWNsYXJlIGZ1bmN0aW9uIEZvcm1hdEVycm9ycyhkYXRhOiBhbnkpOiB2b2lkO1xyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocjogYW55KTogdm9pZDtcclxuZGVjbGFyZSBmdW5jdGlvbiBzaG93QXVkaXRNb2RhbChkYXRhOiBhbnkpOiB2b2lkO1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5pbnRlcmZhY2UgUmVzcG9uc2VVSSB7XHJcbiAgICBUeXBlOiBzdHJpbmc7XHJcbiAgICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgRXJyb3JzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZXNwb25zZVVJR2VuZXJpYyB7XHJcbiAgICBUeXBlOiBzdHJpbmc7XHJcbiAgICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgRXJyb3JzPzogc3RyaW5nW107XHJcbiAgICBPYmo/OiBhbnk7XHJcbn1cclxuXHJcbi8vIFZhcmlhYmxlcyBnbG9iYWxlcyBkZWwgcHJvY2Vzb1xyXG5jb25zdCBwYWdlRGF0YSA9IHtcclxuICAgIHRva2VuOiAnJyxcclxuICAgIHVzZXJSZWNJZDogMCxcclxuICAgIGRhdGFBcmVhSWQ6ICcnLFxyXG4gICAgcHJvY2Vzc0lkOiAnJyxcclxuICAgIGlzTmV3OiBmYWxzZVxyXG59O1xyXG5cclxuLy8gSW5pY2lhbGl6YXIgZGF0b3MgZGUgbGEgcGFnaW5hXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5wcm9jZXNzLXBhZ2UnKTtcclxuICAgIGlmIChwYWdlKSB7XHJcbiAgICAgICAgcGFnZURhdGEudG9rZW4gPSBwYWdlLmRhdGFzZXQudG9rZW4gfHwgJyc7XHJcbiAgICAgICAgcGFnZURhdGEudXNlclJlY0lkID0gcGFyc2VJbnQocGFnZS5kYXRhc2V0LnVzZXIgfHwgJzAnKTtcclxuICAgICAgICBwYWdlRGF0YS5kYXRhQXJlYUlkID0gcGFnZS5kYXRhc2V0LmRhdGFhcmVhIHx8ICcnO1xyXG4gICAgICAgIHBhZ2VEYXRhLnByb2Nlc3NJZCA9IHBhZ2UuZGF0YXNldC5wcm9jZXNzaWQgfHwgJyc7XHJcbiAgICAgICAgcGFnZURhdGEuaXNOZXcgPSBwYWdlLmRhdGFzZXQuaXNuZXcgPT09ICd0cnVlJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXJnYXIgbGlzdGEgZGUgZW1wbGVhZG9zIHBhcmEgZWwgbW9kYWwgZGUgYWdyZWdhciAoc29sbyBzaSBubyBlcyBudWV2bylcclxuICAgIGlmICghcGFnZURhdGEuaXNOZXcpIHtcclxuICAgICAgICBmbi5Mb2FkRW1wbG95ZWVzTGlzdCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIEZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzY2EgbGEgdGFibGEgZGUgZGV0YWxsZXMgeSBsYXMgdGFyamV0YXMgZGUgdG90YWxlc1xyXG4gICAgICovXHJcbiAgICBSZWZyZXNoRGV0YWlsc1RhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL3ByZXN0YWNpb25lc2xhYm9yYWxlcy8ke3BhZ2VEYXRhLnByb2Nlc3NJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBhcnNlYXIgZWwgSFRNTCBwYXJhIG9idGVuZXIgc29sbyBsYXMgcGFydGVzIHF1ZSBuZWNlc2l0YW1vc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RG9tID0gJChodG1sKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBY3R1YWxpemFyIHRhYmxhIGRlIGRldGFsbGVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYm9keSA9IG5ld0RvbS5maW5kKCcudGJvZHktVGFibGUtU2V2ZXJhbmNlRGV0YWlscycpLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdUYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy50Ym9keS1UYWJsZS1TZXZlcmFuY2VEZXRhaWxzJykuaHRtbChuZXdUYm9keSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWN0dWFsaXphciB0YXJqZXRhcyBkZSB0b3RhbGVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkUHJlYXZpc28gPSBuZXdEb20uZmluZCgnI2NhcmQtcHJlYXZpc28nKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkQ2VzYW50aWEgPSBuZXdEb20uZmluZCgnI2NhcmQtY2VzYW50aWEnKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkVmFjYWNpb25lcyA9IG5ld0RvbS5maW5kKCcjY2FyZC12YWNhY2lvbmVzJykudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZE5hdmlkYWQgPSBuZXdEb20uZmluZCgnI2NhcmQtbmF2aWRhZCcpLnRleHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRUb3RhbCA9IG5ld0RvbS5maW5kKCcjY2FyZC10b3RhbCcpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FyZFByZWF2aXNvKSAkKCcjY2FyZC1wcmVhdmlzbycpLnRleHQoY2FyZFByZWF2aXNvKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkQ2VzYW50aWEpICQoJyNjYXJkLWNlc2FudGlhJykudGV4dChjYXJkQ2VzYW50aWEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRWYWNhY2lvbmVzKSAkKCcjY2FyZC12YWNhY2lvbmVzJykudGV4dChjYXJkVmFjYWNpb25lcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FyZE5hdmlkYWQpICQoJyNjYXJkLW5hdmlkYWQnKS50ZXh0KGNhcmROYXZpZGFkKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkVG90YWwpICQoJyNjYXJkLXRvdGFsJykudGV4dChjYXJkVG90YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFjdHVhbGl6YXIgY2FudGlkYWQgZGUgZW1wbGVhZG9zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbXBsb3llZVF0eSA9IG5ld0RvbS5maW5kKCcjRW1wbG95ZWVRdWFudGl0eScpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVtcGxveWVlUXR5KSAkKCcjRW1wbG95ZWVRdWFudGl0eScpLnZhbChlbXBsb3llZVF0eSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGFsIHJlZnJlc2NhciBsYSB0YWJsYSBkZSBkZXRhbGxlc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhcmdhIGxhIGxpc3RhIGRlIGVtcGxlYWRvcyBwYXJhIGVsIHNlbGVjdG9yXHJcbiAgICAgKi9cclxuICAgIExvYWRFbXBsb3llZXNMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wcmVzdGFjaW9uZXNsYWJvcmFsZXMvT2J0ZW5lckVtcGxlYWRvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9ICQoXCIjU2VsZWN0RW1wbG95ZWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmZpbmQoJ29wdGlvbjpub3QoOmZpcnN0KScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZW1wOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7ZW1wLnZhbHVlfVwiPiR7ZW1wLnRleHR9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGNhcmdhbmRvIGVtcGxlYWRvc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE11ZXN0cmEgZWwgbW9kYWwgcGFyYSBhZ3JlZ2FyIHVuIGVtcGxlYWRvXHJcbiAgICAgKi9cclxuICAgIFNob3dBZGRFbXBsb3llZU1vZGFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNTZWxlY3RFbXBsb3llZVwiKS52YWwoJycpO1xyXG4gICAgICAgICQoXCIubW9kYWwtQWRkRW1wbG95ZWVcIikuc2hvdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENpZXJyYSBlbCBtb2RhbCBkZSBhZ3JlZ2FyIGVtcGxlYWRvXHJcbiAgICAgKi9cclxuICAgIENsb3NlQWRkRW1wbG95ZWVNb2RhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIubW9kYWwtQWRkRW1wbG95ZWVcIikuaGlkZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFncmVnYSBlbCBlbXBsZWFkbyBzZWxlY2Npb25hZG8gYWwgcHJvY2Vzb1xyXG4gICAgICovXHJcbiAgICBBZGRFbXBsb3llZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGVtcGxveWVlSWQgPSAkKFwiI1NlbGVjdEVtcGxveWVlXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoIWVtcGxveWVlSWQpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGViZSBzZWxlY2Npb25hciB1biBlbXBsZWFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJlc3RhY2lvbmVzbGFib3JhbGVzL2FncmVnYXJlbXBsZWFkb1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgU2V2ZXJhbmNlUHJvY2Vzc0lkOiBwYWdlRGF0YS5wcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICBFbXBsb3llZUlkOiBlbXBsb3llZUlkLFxyXG4gICAgICAgICAgICAgICAgX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW46ICQoJ2lucHV0W25hbWU9XCJfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXScpLnZhbCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSUdlbmVyaWMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkVycm9ycyAmJiBkYXRhLkVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlIHx8IFwiRXJyb3IgYWwgYWdyZWdhciBlbXBsZWFkb1wiLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSB8fCBcIkVtcGxlYWRvIGFncmVnYWRvIGNvcnJlY3RhbWVudGVcIiwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5DbG9zZUFkZEVtcGxveWVlTW9kYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNjYXIgbGEgdGFibGEgZGUgZGV0YWxsZXMgc2luIHJlY2FyZ2FyIHRvZGEgbGEgcGFnaW5hXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaERldGFpbHNUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY2FyZ2FyIGxpc3RhIGRlIGVtcGxlYWRvcyBkaXNwb25pYmxlc1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLkxvYWRFbXBsb3llZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB4aHI6XCIsIHhocik7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVlc3RyYSBlbCBtb2RhbCBwYXJhIGVkaXRhciB1biBlbXBsZWFkbyBleGlzdGVudGVcclxuICAgICAqL1xyXG4gICAgU2hvd0VkaXRFbXBsb3llZU1vZGFsOiBmdW5jdGlvbiAoZW1wbG95ZWVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvcHJlc3RhY2lvbmVzbGFib3JhbGVzL09idGVuZXJGb3JtRWRpdGFyP3Byb2Nlc3NJZD0ke3BhZ2VEYXRhLnByb2Nlc3NJZH0mZW1wbG95ZWVJZD0ke2VtcGxveWVlSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93RWRpdE1vZGFsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNdWVzdHJhIHkgY29uZmlndXJhIGVsIG1vZGFsIGRlIGVkaWNpb24gZGUgZGV0YWxsZVxyXG4gICAgICovXHJcbiAgICBTaG93RWRpdE1vZGFsOiBmdW5jdGlvbiAoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gSW5zZXJ0YXIgZWwgbW9kYWwgZW4gZWwgY29udGVuZWRvclxyXG4gICAgICAgICQoXCIjQ29udE1vZGFsRGV0YWlsXCIpLmh0bWwoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIENvbmZpZ3VyYXIgZXZlbnRvcyBkZWwgbW9kYWxcclxuICAgICAgICBmbi5TZXR1cERldGFpbE1vZGFsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIEluaWNpYWxpemFyIHBsdWdpbnMgZGUgZm9ybWF0byBudW1lcmljb1xyXG4gICAgICAgIGZuLkluaXROdW1iZXJGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXIgdGllbXBvIGxhYm9yYW5kbyBpbmljaWFsXHJcbiAgICAgICAgZm4uQ2FsY3VsYXRlVGllbXBvTGFib3JhbmRvKCk7XHJcblxyXG4gICAgICAgIC8vIE1vc3RyYXIgbW9kYWwgKGVzIGZ1bGwtcGFnZSwgc29sbyBtb3N0cmFyKVxyXG4gICAgICAgICQoXCIjTW9kYWxFZGl0RGV0YWlsXCIpLnNob3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmEgbG9zIGV2ZW50b3MgZGVsIG1vZGFsIGRlIGRldGFsbGVcclxuICAgICAqL1xyXG4gICAgU2V0dXBEZXRhaWxNb2RhbEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENlcnJhciBtb2RhbFxyXG4gICAgICAgICQoXCIuY2xvc2VNb2RhbERldGFpbFwiKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5DbG9zZUVkaXRNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBHdWFyZGFyIHkgY2VycmFyXHJcbiAgICAgICAgJChcIi5idG5TYXZlQW5kQ2xvc2VEZXRhaWxcIikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uU2F2ZURldGFpbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU29sbyBndWFyZGFyXHJcbiAgICAgICAgJChcIi5idG5TYXZlRGV0YWlsXCIpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlNhdmVEZXRhaWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhclxyXG4gICAgICAgICQoXCIuYnRuQ2FsY3VsYXRlRGV0YWlsXCIpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLkNhbGN1bGF0ZURldGFpbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBJbXByaW1pciByZXBvcnRlIGluZGl2aWR1YWxcclxuICAgICAgICAkKFwiLmJ0blByaW50RGV0YWlsUmVwb3J0XCIpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlByaW50RGV0YWlsUmVwb3J0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEluZm8gZGUgYXVkaXRvcmlhIGRlbCBkZXRhbGxlXHJcbiAgICAgICAgJChcIi5BdWRpdEluZm9EZXRhaWxcIikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uU2hvd0RldGFpbEF1ZGl0SW5mbygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZWNhbGN1bGFyIHRpZW1wbyBsYWJvcmFuZG8gY3VhbmRvIGNhbWJpZW4gbGFzIGZlY2hhc1xyXG4gICAgICAgICQoXCJpbnB1dFtuYW1lPSdTdGFydFdvcmtEYXRlJ10sIGlucHV0W25hbWU9J0VuZFdvcmtEYXRlJ11cIikub2ZmKCdjaGFuZ2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5DYWxjdWxhdGVUaWVtcG9MYWJvcmFuZG8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhIGVsIHRpZW1wbyBsYWJvcmFuZG8gZW50cmUgZmVjaGEgZGUgaW5pY2lvIHkgZmluXHJcbiAgICAgKi9cclxuICAgIENhbGN1bGF0ZVRpZW1wb0xhYm9yYW5kbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVN0ciA9ICQoXCJpbnB1dFtuYW1lPSdTdGFydFdvcmtEYXRlJ11cIikudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IGVuZERhdGVTdHIgPSAkKFwiaW5wdXRbbmFtZT0nRW5kV29ya0RhdGUnXVwiKS52YWwoKSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghc3RhcnREYXRlU3RyIHx8ICFlbmREYXRlU3RyKSB7XHJcbiAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdUaWVtcG9MYWJvcmFuZG8nXVwiKS52YWwoJycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShzdGFydERhdGVTdHIpO1xyXG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShlbmREYXRlU3RyKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTmFOKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHx8IGlzTmFOKGVuZERhdGUuZ2V0VGltZSgpKSkge1xyXG4gICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0nVGllbXBvTGFib3JhbmRvJ11cIikudmFsKCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVuZERhdGUgPCBzdGFydERhdGUpIHtcclxuICAgICAgICAgICAgJChcImlucHV0W25hbWU9J1RpZW1wb0xhYm9yYW5kbyddXCIpLnZhbCgnRmVjaGEgaW52w6FsaWRhJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGFyIGRpZmVyZW5jaWEgZW4gYcOxb3MsIG1lc2VzIHkgZMOtYXNcclxuICAgICAgICBsZXQgeWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgbW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgbGV0IGRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIEFqdXN0YXIgZMOtYXMgbmVnYXRpdm9zXHJcbiAgICAgICAgaWYgKGRheXMgPCAwKSB7XHJcbiAgICAgICAgICAgIG1vbnRocy0tO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0TW9udGggPSBuZXcgRGF0ZShlbmREYXRlLmdldEZ1bGxZZWFyKCksIGVuZERhdGUuZ2V0TW9udGgoKSwgMCk7XHJcbiAgICAgICAgICAgIGRheXMgKz0gbGFzdE1vbnRoLmdldERhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFqdXN0YXIgbWVzZXMgbmVnYXRpdm9zXHJcbiAgICAgICAgaWYgKG1vbnRocyA8IDApIHtcclxuICAgICAgICAgICAgeWVhcnMtLTtcclxuICAgICAgICAgICAgbW9udGhzICs9IDEyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29uc3RydWlyIHRleHRvXHJcbiAgICAgICAgbGV0IHJlc3VsdGFkbyA9ICcnO1xyXG4gICAgICAgIGlmICh5ZWFycyA+IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0YWRvICs9IHllYXJzICsgKHllYXJzID09PSAxID8gJyBhw7FvJyA6ICcgYcOxb3MnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vbnRocyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdGFkbykgcmVzdWx0YWRvICs9ICcsICc7XHJcbiAgICAgICAgICAgIHJlc3VsdGFkbyArPSBtb250aHMgKyAobW9udGhzID09PSAxID8gJyBtZXMnIDogJyBtZXNlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF5cyA+IDAgfHwgcmVzdWx0YWRvID09PSAnJykge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0YWRvKSByZXN1bHRhZG8gKz0gJywgJztcclxuICAgICAgICAgICAgcmVzdWx0YWRvICs9IGRheXMgKyAoZGF5cyA9PT0gMSA/ICcgZMOtYScgOiAnIGTDrWFzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiaW5wdXRbbmFtZT0nVGllbXBvTGFib3JhbmRvJ11cIikudmFsKHJlc3VsdGFkbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pY2lhbGl6YSBlbCBmb3JtYXRvIG51bWVyaWNvIGVuIGxvcyBjYW1wb3NcclxuICAgICAqL1xyXG4gICAgSW5pdE51bWJlckZvcm1hdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucGx1Z2luLW51bWJlci1mb3JtYXRcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEZvcm1hdGVhciB2YWxvcmVzIGV4aXN0ZW50ZXNcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlRmxvYXQodmFsLnJlcGxhY2UoLywvZywgJycpKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKG51bS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENpZXJyYSBlbCBtb2RhbCBkZSBlZGljaW9uXHJcbiAgICAgKi9cclxuICAgIENsb3NlRWRpdE1vZGFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNNb2RhbEVkaXREZXRhaWxcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjQ29udE1vZGFsRGV0YWlsXCIpLmh0bWwoJycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEd1YXJkYSBlbCBkZXRhbGxlIGRlbCBlbXBsZWFkb1xyXG4gICAgICovXHJcbiAgICBTYXZlRGV0YWlsOiBmdW5jdGlvbiAoY2xvc2VBZnRlclNhdmU6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIC8vIENvbnZlcnRpciB2YWxvcmVzIGNvbiBmb3JtYXRvIGEgbnVtZXJvcyBhbnRlcyBkZSBlbnZpYXJcclxuICAgICAgICBmbi5QcmVwYXJlRm9ybUZvclN1Ym1pdCgpO1xyXG5cclxuICAgICAgICBsZXQgZm9ybURhdGEgPSAkKFwiI2Zvcm1FZGl0RGV0YWlsXCIpLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIGZvcm1EYXRhICs9IFwiJl9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KCQoJ2lucHV0W25hbWU9XCJfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXScpLnZhbCgpIGFzIHN0cmluZyk7XHJcblxyXG4gICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wcmVzdGFjaW9uZXNsYWJvcmFsZXMvYWN0dWFsaXphcmRldGFsbGVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UgfHwgXCJEZXRhbGxlIGd1YXJkYWRvIGNvcnJlY3RhbWVudGVcIiwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VBZnRlclNhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uQ2xvc2VFZGl0TW9kYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2llbXByZSByZWZyZXNjYXIgbGEgdGFibGEgZGUgZGV0YWxsZXMgZGVzcHVlcyBkZSBndWFyZGFyXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaERldGFpbHNUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJhIGVsIGZvcm11bGFyaW8gcXVpdGFuZG8gZm9ybWF0byBkZSBudW1lcm9zXHJcbiAgICAgKi9cclxuICAgIFByZXBhcmVGb3JtRm9yU3VibWl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wbHVnaW4tbnVtYmVyLWZvcm1hdFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlRmxvYXQodmFsLnJlcGxhY2UoLywvZywgJycpKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKG51bS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGEgbGFzIHByZXN0YWNpb25lcyBkZWwgZW1wbGVhZG8gYWN0dWFsXHJcbiAgICAgKi9cclxuICAgIENhbGN1bGF0ZURldGFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGVtcGxveWVlSWQgPSAkKFwiaW5wdXRbbmFtZT0nRW1wbG95ZWVJZCddXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZXNlYSBjYWxjdWxhciBsYXMgcHJlc3RhY2lvbmVzIGRlIGVzdGUgZW1wbGVhZG8/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJlc3RhY2lvbmVzbGFib3JhbGVzL2NhbGN1bGFyZGV0YWxsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0lkOiBwYWdlRGF0YS5wcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcGxveWVlSWQ6IGVtcGxveWVlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiAkKCdpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlIHx8IFwiQ2FsY3VsbyByZWFsaXphZG8gY29ycmVjdGFtZW50ZVwiLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjYXJnYXIgZWwgbW9kYWwgY29uIGxvcyBudWV2b3MgZGF0b3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNob3dFZGl0RW1wbG95ZWVNb2RhbChlbXBsb3llZUlkIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXByaW1lIGVsIHJlcG9ydGUgaW5kaXZpZHVhbCBkZWwgZW1wbGVhZG9cclxuICAgICAqL1xyXG4gICAgUHJpbnREZXRhaWxSZXBvcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBlbXBsb3llZUlkID0gJChcImlucHV0W25hbWU9J0VtcGxveWVlSWQnXVwiKS52YWwoKTtcclxuICAgICAgICB3aW5kb3cub3BlbihgL3JlcG9ydGVzL3ByZXN0YWNpb25lc2xhYm9yYWxlcy9kZXRhbGxlP3Byb2Nlc3NJZD0ke3BhZ2VEYXRhLnByb2Nlc3NJZH0mZW1wbG95ZWVJZD0ke2VtcGxveWVlSWR9YCwgJ19ibGFuaycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE11ZXN0cmEgaW5mbyBkZSBhdWRpdG9yaWEgZGVsIGRldGFsbGVcclxuICAgICAqL1xyXG4gICAgU2hvd0RldGFpbEF1ZGl0SW5mbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIERhdGFBcmVhSWQ6ICQoJyNEZXRhaWxEYXRhQXJlYUlkJykudmFsKCkgfHwgJy0nLFxyXG4gICAgICAgICAgICBSZWNJZDogJCgnI0RldGFpbFJlY0lkJykudmFsKCkgfHwgJy0nLFxyXG4gICAgICAgICAgICBDcmVhdGVkQnk6ICQoJyNEZXRhaWxDcmVhdGVkQnknKS52YWwoKSB8fCAnLScsXHJcbiAgICAgICAgICAgIENyZWF0ZWRPbjogJCgnI0RldGFpbENyZWF0ZWRPbicpLnZhbCgpLFxyXG4gICAgICAgICAgICBNb2RpZmllZEJ5OiAkKCcjRGV0YWlsTW9kaWZpZWRCeScpLnZhbCgpIHx8ICctJyxcclxuICAgICAgICAgICAgTW9kaWZpZWRPbjogJCgnI0RldGFpbE1vZGlmaWVkT24nKS52YWwoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2hvd0F1ZGl0TW9kYWwoZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0aWVuZSBsb3MgSURzIGRlIGVtcGxlYWRvcyBzZWxlY2Npb25hZG9zXHJcbiAgICAgKi9cclxuICAgIEdldFNlbGVjdGVkRW1wbG95ZWVJZHM6IGZ1bmN0aW9uICgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3QgaWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICQoXCIuc2VsZWN0RGV0YWlsW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbXBsb3llZUlkID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpLmRhdGEoJ2VtcGxveWVlaWQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbXBsb3llZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2goZW1wbG95ZWVJZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpZHM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWxpbWluYSBsb3MgZW1wbGVhZG9zIHNlbGVjY2lvbmFkb3NcclxuICAgICAqL1xyXG4gICAgRGVsZXRlU2VsZWN0ZWRFbXBsb3llZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZElkcyA9IGZuLkdldFNlbGVjdGVkRW1wbG95ZWVJZHMoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIGFsIG1lbm9zIHVuIGVtcGxlYWRvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZXNlYSBlbGltaW5hciBsb3MgZW1wbGVhZG9zIHNlbGVjY2lvbmFkb3MgZGVsIHByb2Nlc28/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRWxpbWluYXIgdW5vIHBvciB1bm9cclxuICAgICAgICAgICAgICAgIGxldCBjb21wbGV0ZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZHMuZm9yRWFjaChmdW5jdGlvbiAoZW1wbG95ZWVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJlc3RhY2lvbmVzbGFib3JhbGVzL2VsaW1pbmFyZW1wbGVhZG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJZDogcGFnZURhdGEucHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVJZDogZW1wbG95ZWVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiAkKCdpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkID09PSBzZWxlY3RlZElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRW1wbGVhZG9zIGVsaW1pbmFkb3MgY29ycmVjdGFtZW50ZVwiLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2NhciBsYSB0YWJsYSBkZSBkZXRhbGxlcyBzaW4gcmVjYXJnYXIgdG9kYSBsYSBwYWdpbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5SZWZyZXNoRGV0YWlsc1RhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjYXJnYXIgbGlzdGEgZGUgZW1wbGVhZG9zIGRpc3BvbmlibGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uTG9hZEVtcGxveWVlc0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA9PT0gc2VsZWN0ZWRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNjYXIgbGEgdGFibGEgZGUgZGV0YWxsZXMgc2luIHJlY2FyZ2FyIHRvZGEgbGEgcGFnaW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaERldGFpbHNUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLkxvYWRFbXBsb3llZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR3VhcmRhIGVsIHByb2Nlc28gY29tcGxldG9cclxuICAgICAqL1xyXG4gICAgU2F2ZVByb2Nlc3M6IGZ1bmN0aW9uIChjbG9zZUFmdGVyU2F2ZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc0RhdGEgPSB7XHJcbiAgICAgICAgICAgIFNldmVyYW5jZVByb2Nlc3NJZDogcGFnZURhdGEucHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICBQcm9jZXNzRGF0ZTogJChcIiNQcm9jZXNzRGF0ZVwiKS52YWwoKSxcclxuICAgICAgICAgICAgRGVzY3JpcHRpb246ICQoXCIjRGVzY3JpcHRpb25cIikudmFsKCksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogcGFnZURhdGEuaXNOZXcgPyBcIjFcIiA6IFwiMlwiLFxyXG4gICAgICAgICAgICBfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlbjogJCgnaW5wdXRbbmFtZT1cIl9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdJykudmFsKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJlc3RhY2lvbmVzbGFib3JhbGVzL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHByb2Nlc3NEYXRhLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UgfHwgXCJQcm9jZXNvIGd1YXJkYWRvIGNvcnJlY3RhbWVudGVcIiwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VBZnRlclNhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ByZXN0YWNpb25lc2xhYm9yYWxlcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWdlRGF0YS5pc05ldyAmJiBkYXRhLk9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBlcmEgbnVldm8sIG5hdmVnYXIgYWwgcHJvY2VzbyBjcmVhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL3ByZXN0YWNpb25lc2xhYm9yYWxlcy8ke2RhdGEuT2JqfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhIHRvZG9zIGxvcyBlbXBsZWFkb3MgZGVsIHByb2Nlc29cclxuICAgICAqL1xyXG4gICAgQ2FsY3VsYXRlQWxsRW1wbG95ZWVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGVzZWEgY2FsY3VsYXIgbGFzIHByZXN0YWNpb25lcyBkZSB0b2RvcyBsb3MgZW1wbGVhZG9zIGRlbCBwcm9jZXNvP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3ByZXN0YWNpb25lc2xhYm9yYWxlcy9jYWxjdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0lkOiBwYWdlRGF0YS5wcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiAkKCdpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlIHx8IFwiQ2FsY3VsbyByZWFsaXphZG8gY29ycmVjdGFtZW50ZVwiLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVmcmVzY2FyIGxhIHRhYmxhIGRlIGRldGFsbGVzIHNpbiByZWNhcmdhciB0b2RhIGxhIHBhZ2luYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaERldGFpbHNUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wcmltZSBlbCByZXBvcnRlIGRlbCBwcm9jZXNvXHJcbiAgICAgKi9cclxuICAgIFByaW50UmVwb3J0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oYC9yZXBvcnRlcy9wcmVzdGFjaW9uZXNsYWJvcmFsZXM/cHJvY2Vzc0lkPSR7cGFnZURhdGEucHJvY2Vzc0lkfWAsICdfYmxhbmsnKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEV2ZW50IExpc3RlbmVyc1xyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vIEFncmVnYXIgZW1wbGVhZG8gLSBhYnJlIG1vZGFsIHNpbXBsZVxyXG4gICAgJChcIi5BZGRFbXBsb3llZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TaG93QWRkRW1wbG95ZWVNb2RhbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0IGRlbCBmb3JtIGRlIGFncmVnYXIgZW1wbGVhZG9cclxuICAgICQoXCIjZm9ybUFkZEVtcGxveWVlXCIpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGZuLkFkZEVtcGxveWVlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDZXJyYXIgbW9kYWwgZGUgYWdyZWdhclxyXG4gICAgJChcIi5jbG9zZS1tb2RhbC1BZGRFbXBsb3llZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5DbG9zZUFkZEVtcGxveWVlTW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEVkaXRhciBlbXBsZWFkbyBzZWxlY2Npb25hZG8gLSBhYnJlIG1vZGFsIGNvbXBsZXRvXHJcbiAgICAkKFwiLkVkaXRFbXBsb3llZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZElkcyA9IGZuLkdldFNlbGVjdGVkRW1wbG95ZWVJZHMoKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gZW1wbGVhZG8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZElkcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgc29sbyB1biBlbXBsZWFkbyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZuLlNob3dFZGl0RW1wbG95ZWVNb2RhbChzZWxlY3RlZElkc1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRWxpbWluYXIgZW1wbGVhZG9zXHJcbiAgICAkKFwiLkRlbGV0ZUVtcGxveWVlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLkRlbGV0ZVNlbGVjdGVkRW1wbG95ZWVzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIHByb2Nlc29cclxuICAgICQoXCIuU2F2ZVNldmVyYW5jZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TYXZlUHJvY2VzcyhmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIHkgY2VycmFyIHByb2Nlc29cclxuICAgICQoXCIuU2F2ZUFuZENsb3NlU2V2ZXJhbmNlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNhdmVQcm9jZXNzKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXIgdG9kb3MgbG9zIGVtcGxlYWRvc1xyXG4gICAgJChcIi5DYWxjdWxhdGVQcm9jZXNzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLkNhbGN1bGF0ZUFsbEVtcGxveWVlcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSW1wcmltaXIgcmVwb3J0ZVxyXG4gICAgJChcIi5QcmludFJlcG9ydFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5QcmludFJlcG9ydCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWN0dWFsaXphciBwYWdpbmFcclxuICAgICQoXCIuT3BjQWN0dWFsaXphclwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENlcnJhciBtb2R1bG8gLSB2b2x2ZXIgYWwgbGlzdGFkb1xyXG4gICAgJChcIi5DZXJyYXJNb2R1bG9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ByZXN0YWNpb25lc2xhYm9yYWxlcyc7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEb2JsZSBjbGljIHBhcmEgZWRpdGFyIGVuIGxhIHRhYmxhIGRlIGRldGFsbGVzXHJcbiAgICAkKGRvY3VtZW50KS5vbignZGJsY2xpY2snLCAnI3Rib2R5RGV0YWlscyAucm93LWFwcCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSB8fCAkKGUudGFyZ2V0KS5pcygnbGFiZWwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVtcGxveWVlSWQgPSAkKHRoaXMpLmRhdGEoJ2VtcGxveWVlaWQnKTtcclxuICAgICAgICBpZiAoZW1wbG95ZWVJZCkge1xyXG4gICAgICAgICAgICBmbi5TaG93RWRpdEVtcGxveWVlTW9kYWwoZW1wbG95ZWVJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXBsaWNhciBlc3RpbG8gY2xpY2thYmxlIGEgbGFzIGZpbGFzXHJcbiAgICAkKCcjdGJvZHlEZXRhaWxzIC5yb3ctYXBwJykuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxuXHJcbiAgICAvLyBDaGVja2JveCBcInNlbGVjY2lvbmFyIHRvZG9zXCIgZW4gbGEgdGFibGEgZGUgZGV0YWxsZXNcclxuICAgICQoXCIjY2hlY2stZGV0YWlsLTBcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBpc0NoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgICQoXCIuc2VsZWN0RGV0YWlsXCIpLnByb3AoJ2NoZWNrZWQnLCBpc0NoZWNrZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSW5mb3JtYWNpb24gZGUgYXVkaXRvcmlhXHJcbiAgICAkKFwiLkF1ZGl0SW5mb1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL3ByZXN0YWNpb25lc2xhYm9yYWxlcy9nZXRieWlkP0lkPSR7cGFnZURhdGEucHJvY2Vzc0lkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93QXVkaXRNb2RhbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyB9O1xyXG4iXX0=