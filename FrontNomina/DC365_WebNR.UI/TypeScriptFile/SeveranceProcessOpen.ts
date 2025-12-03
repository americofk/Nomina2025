/**
 * @file SeveranceProcessOpen.ts
 * @description Modulo para la gestion de un proceso de prestaciones abierto.
 *              Permite agregar, editar, eliminar y calcular prestaciones de empleados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestacionesLaboralesOpen
 */

// Declaraciones de tipos globales
declare function windows_message(message: string, type: string, options?: any): void;
declare function FormatErrors(data: any): void;
declare function redireccionaralLogin(xhr: any): void;
declare function showAuditModal(data: any): void;
declare var $: any;

interface ResponseUI {
    Type: string;
    Message?: string;
    Errors?: string[];
}

interface ResponseUIGeneric {
    Type: string;
    Message?: string;
    Errors?: string[];
    Obj?: any;
}

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

                if (cardPreaviso) $('#card-preaviso').text(cardPreaviso);
                if (cardCesantia) $('#card-cesantia').text(cardCesantia);
                if (cardVacaciones) $('#card-vacaciones').text(cardVacaciones);
                if (cardNavidad) $('#card-navidad').text(cardNavidad);
                if (cardTotal) $('#card-total').text(cardTotal);

                // Actualizar cantidad de empleados
                const employeeQty = newDom.find('#EmployeeQuantity').val();
                if (employeeQty) $('#EmployeeQuantity').val(employeeQty);
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
                    data.forEach(function (emp: any) {
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
            success: function (data: ResponseUIGeneric) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    if (data.Errors && data.Errors.length > 0) {
                        FormatErrors(data);
                    } else {
                        windows_message(data.Message || "Error al agregar empleado", data.Type);
                    }
                } else {
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
    ShowEditEmployeeModal: function (employeeId: string) {
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
    ShowEditModal: function (data: string) {
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
        const startDateStr = $("input[name='StartWorkDate']").val() as string;
        const endDateStr = $("input[name='EndWorkDate']").val() as string;

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
            if (resultado) resultado += ', ';
            resultado += months + (months === 1 ? ' mes' : ' meses');
        }
        if (days > 0 || resultado === '') {
            if (resultado) resultado += ', ';
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
            const val = $(this).val() as string;
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
    SaveDetail: function (closeAfterSave: boolean = false) {
        // Convertir valores con formato a numeros antes de enviar
        fn.PrepareFormForSubmit();

        let formData = $("#formEditDetail").serialize();
        formData += "&__RequestVerificationToken=" + encodeURIComponent($('input[name="__RequestVerificationToken"]').val() as string);

        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/prestacioneslaborales/actualizardetalle",
            type: "POST",
            data: formData,
            async: true,
            success: function (data: ResponseUIGeneric) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                } else {
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
            const val = $(this).val() as string;
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
                    success: function (data: ResponseUIGeneric) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        } else {
                            windows_message(data.Message || "Calculo realizado correctamente", data.Type);
                            // Recargar el modal con los nuevos datos
                            fn.ShowEditEmployeeModal(employeeId as string);
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
    GetSelectedEmployeeIds: function (): string[] {
        const ids: string[] = [];
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
                        success: function (data: ResponseUI) {
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
    SaveProcess: function (closeAfterSave: boolean = false) {
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
            success: function (data: ResponseUIGeneric) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                } else {
                    windows_message(data.Message || "Proceso guardado correctamente", data.Type);
                    if (closeAfterSave) {
                        window.location.href = '/prestacioneslaborales';
                    } else if (pageData.isNew && data.Obj) {
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
                    success: function (data: ResponseUIGeneric) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        } else {
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
        } else if (selectedIds.length > 1) {
            windows_message("Debe seleccionar solo un empleado!", "info");
        } else {
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

export { };
