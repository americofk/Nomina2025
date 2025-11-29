/**
 * @file PayrollProcess.ts
 * @description Módulo de procesamiento de nómina. Permite ejecutar, consultar
 *              y administrar los procesos de cálculo de nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module ProcesoNomina
 */
variables: {
    var paycycles;
    var option;
}
//Funciones
const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEdit: function (_id = "", viewmode = "new") {
        let url;
        if (_id == "")
            url = `/procesonomina/ObtenerFormNuevo`;
        else
            url = `/procesonomina/ObtenerFormNuevo?payrollprocessid=${_id}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data, viewmode);
                    fn.OpenCloseNewAndEdit("open");
                    //ver novedades de empleado
                    $(".see-novelties").on("click", function () {
                        $(".see-novelties").removeClass("selected-row");
                        $(this).addClass("selected-row");
                        fn.SearchNovelties($(this).find(".EmployeeIdtbl").html().trim(), $(this).find(".TotalAmounttbl").html().trim());
                        //fn.TotalNovelties()
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    /*
    * Método para mostrar el formulario,
    * contiene el event para cerrar el formulario y guardar la data
    */
    ShowForm: function (data, viewmode) {
        $("#ContNewAndEditPayrollProcess").html('');
        $("#ContNewAndEditPayrollProcess").append(data);
        InstaciateListener();
        //cerrar formulario de nuevo y editar
        $(".OpCloseform").on('click', function () {
            $("#ContNewAndEditPayrollProcess").addClass("collapse");
            fn.OpenCloseNewAndEdit("close");
        });
        // Variable para controlar si debe cerrar después de guardar
        var shouldCloseAfterSave = false;
        //guardar información
        $("#FormNewAndEditPayrollsProcess").submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                if ($("#PayrollProcessStatus").val() == "0") {
                    $.ajax({
                        url: "/procesonomina/guardar",
                        type: "POST",
                        data: $(this).serialize() + `&operation=${option}`,
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                windows_message(data.Message, data.Type);
                                //Refrescamos la tabla con la información guardada
                                fn.RefreshTable();
                                if (shouldCloseAfterSave) {
                                    fn.OpenCloseNewAndEdit("close");
                                    shouldCloseAfterSave = false;
                                }
                                else {
                                    if (data.Obj == "") {
                                        fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                    }
                                    else {
                                        fn.SearchFormNewAndEdit(data.Obj, "edit");
                                    }
                                }
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                }
                else {
                    windows_message("La nómina debe estar en estado creada", "error");
                }
            }
        });
        // Guardar y cerrar
        $(".btnSaveAndClose").on('click', function () {
            shouldCloseAfterSave = true;
            $("#FormNewAndEditPayrollsProcess").submit();
        });
        //Mostrar contenedor
        $("#ContNewAndEditPayrollProcess").removeClass("collapse");
        fn.SettingNewAndEdit(viewmode);
        // Registrar evento de auditoría para el formulario cargado dinámicamente
        $(".AuditInfoForm").off('click').on('click', function () {
            showAuditModalFromForm();
        });
        //Toggle
        $("#toggle-totals").click(function () {
            let value = $(this).attr("data-value").toString();
            if (value == "1") {
                $(this).attr("data-value", "2");
                $(this).removeClass("fa-angle-up");
                $(this).addClass("fa-angle-down");
                $("#totals-container").removeClass("show-totals");
                $("#totals-container").addClass("hide-totals");
            }
            else {
                $(this).attr("data-value", "1");
                $(this).addClass("fa-angle-up");
                $(this).removeClass("fa-angle-down");
                $("#totals-container").addClass("show-totals");
                $("#totals-container").removeClass("hide-totals");
            }
        });
        //pagar nomina
        $("#Pay-Payroll").submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                //if ($("#PayrollProcessStatus").val() != "3" || $("#PayrollProcessStatus").val() != "4") {
                windows_message("¿Desea pagar la nómina?", "confirm", {
                    onOk: function () {
                        let input = $(document.createElement('input'));
                        input.attr("name", "PayrollProcessId");
                        input.attr("class", "PayrollProcessId");
                        input.val($("#PayrollProcessId").val().toString());
                        $("#Pay-Payroll").append(input);
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/procesonomina/pagar",
                            type: "POST",
                            data: $("#Pay-Payroll").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".PayrollProcessId").remove();
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                }
                                else {
                                    fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                });
                //} else {
                //    windows_message("La nómina ya esta pagada o cerrada", "error");
                //}
            }
        });
        //cancelar nomina
        $("#Cancel-Payroll").submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                if ($("#PayrollProcessStatus").val() != "3" || $("#PayrollProcessStatus").val() != "4") {
                    windows_message("¿Desea cancelar la nómina?", "confirm", {
                        onOk: function () {
                            let input = $(document.createElement('input'));
                            input.attr("name", "PayrollProcessId");
                            input.attr("class", "PayrollProcessId");
                            input.val($("#PayrollProcessId").val().toString());
                            $("#Cancel-Payroll").append(input);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false });
                            $.ajax({
                                url: "/procesonomina/cancelar",
                                type: "POST",
                                data: $("#Cancel-Payroll").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    $(".PayrollProcessId").remove();
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                    }
                                    else {
                                        fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                        windows_message(data.Message, data.Type);
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        },
                    });
                }
                else {
                    windows_message("La nómina ya esta pagada o cerrada", "error");
                }
            }
        });
        //ir al reporte de pagos de nómina
        $('.payroll-payment-report').on('click', function () {
            fn.ValidationReport(`/reportes/pagosdenomina?payrollprocessid=${$("#PayrollProcessId").val().toString()}&hidefilter=true`);
        });
        $('.payroll-report').on('click', function () {
            fn.ValidationReportPayrol(`/reportes/reportenomina?payrollprocessid=${$("#PayrollProcessId").val().toString()}&hidefilter=true`);
        });
        $('.payroll-summary-report').on('click', function () {
            fn.ValidationReportPayrol(`/reportes/resumenpagosdenomina?payrollprocessid=${$("#PayrollProcessId").val().toString()}&hidefilter=true`);
        });
        $('.payroll-payment-report-employee').on('click', function () {
            fn.ValidationReport(`/reportes/pagosdenomina?payrollprocessid=${$("#PayrollProcessId").val().toString()}&employeeId=${$(".selected-row").find(".EmployeeIdtbl").html().trim()}&hidefilter=true`);
        });
        $('.txt-payroll').on('click', function () {
            fn.ValidationReport(`/reportes/txtpayroll?payrollprocessid=${$("#PayrollProcessId").val().toString()}&payrollid=${$("#PayrollId").val().toString()}`);
        });
        fn.SelectedFirstRow();
    },
    ValidationReport: function (url) {
        if ($("#PayrollProcessStatus").val() == "3" || $("#PayrollProcessStatus").val() == "4") {
            window.open(url, '_blank');
        }
        else {
            windows_message("¡El proceso de nómina debe estar en estado pagada o cerrada!", "error");
        }
    },
    ValidationReportPayrol: function (url) {
        if ($("#PayrollProcessStatus").val() == "2" || $("#PayrollProcessStatus").val() == "3" || $("#PayrollProcessStatus").val() == "4") {
            window.open(url, '_blank');
        }
        else {
            windows_message("¡El proceso de nómina debe estar en estado pagada o calculada!", "error");
        }
    },
    //Refrescar lista principal
    RefreshTable: function () {
        $.get(location.href)
            .done(function (r) {
            var newDom = $(r);
            $('.tbodyTableProcessPayroll').replaceWith($('.tbodyTableProcessPayroll', newDom));
        });
    },
    //Opciones del formulario si es nuevo o editar
    SettingNewAndEdit: function (viewmode) {
        if (viewmode == "new") {
            option = 1;
            fn.EnabledorDisableInputs();
            $(".showid").addClass("collapse");
        }
        else {
            option = 2;
            fn.EnabledorDisableInputs();
            $(".showid").removeClass("collapse");
        }
    },
    EnabledorDisableInputs: function () {
        if ($('#PayrollProcessStatus').val() != "0") {
            $("#PayrollId").prop('disabled', true);
            $("#Description").prop('disabled', true);
            $("#PaymentDate").prop('disabled', true);
            $("#PayCycleId").prop('disabled', true);
            $("#ProjId").prop('disabled', true);
            $("#ProjCategoryId").prop('disabled', true);
            $(".app-input-date-never").hide();
            $(".app-input-date-today").hide();
        }
        else {
            $("#PayrollId").prop('disabled', false);
            $("#Description").prop('disabled', false);
            $("#PaymentDate").prop('disabled', false);
            $("#PayCycleId").prop('disabled', false);
            $("#ProjId").prop('disabled', false);
            $("#ProjCategoryId").prop('disabled', false);
            $(".app-input-date-never").show();
            $(".app-input-date-today").show();
        }
    },
    //funcion abrir nuevo formulario
    OpenCloseNewAndEdit: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        }
        else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },
    //ver novedades de empleado
    SearchNovelties: function (_Idemploye, TotalAmount) {
        $.ajax({
            url: `procesonomina/${$("#PayrollProcessId").val().toString()}/${_Idemploye}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableNovedad").html('');
                    $(".tbodyTableNovedad").append(data);
                    let ingresoTotal = 0;
                    //$(".calcular-total").each(function () {
                    //    console.log($(this).find(".PayrollActionTypetbl").html().trim());
                    //    if ($(this).find(".PayrollActionTypetbl").html().trim() != "Contribución")
                    //    {
                    //        ingresoTotal += parseFloat($(this).find(".ActionAmounttblaction").html().trim());
                    //    }
                    //});
                    $(".total-amount").text(`${FormatoNumericos_Mostrar(TotalAmount)}`);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //lista de detalle de proceso de nomina
    SearchListDetail: function () {
        $.ajax({
            url: `procesonomina/${$("#PayrollProcessId").val().toString()}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableEmployeeProcess").html('');
                    $(".tbodyTableEmployeeProcess").append(data);
                    //ver novedades de empleado
                    $(".see-novelties").on("click", function () {
                        $(".see-novelties").removeClass("selected-row");
                        $(this).addClass("selected-row");
                        fn.SearchNovelties($(this).find(".EmployeeIdtbl").html().trim(), $(this).find(".TotalAmounttbl").html().trim());
                    });
                    //fn.SelectedFirstRow();
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SelectedFirstRow: function () {
        let firstRow = $(".see-novelties").first();
        if (firstRow.length != 0) {
            /*            $(".see-novelties").removeClass("selected-row");*/
            firstRow.addClass("selected-row");
            fn.SearchNovelties(firstRow.find(".EmployeeIdtbl").html().trim(), firstRow.find(".TotalAmounttbl").html().trim());
        }
    },
};
esuchadores: {
    $(".NewPayrollProcess").on("click", function () {
        fn.SearchFormNewAndEdit();
    });
    $(".EditPayrollProcess").on("click", function () {
        let _id;
        var contador = 0;
        $(".selectPayrollProcess[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".PayrollProcessIdTbl").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un registro!", "info");
        }
        else {
            fn.SearchFormNewAndEdit(_id, "edit");
        }
    });
    //Eliminar proceso de nómina
    $("#DeletePayrollProcess").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador = false;
            var statusPayroll = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayrollProcess[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    let status = $(this).parent().parent().find(".PayrollProcessStatustbl").html().trim();
                    input.attr("name", "listid_payrollprocess");
                    input.attr("class", "listid_payrollprocess");
                    input.val($(this).parent().parent().find(".PayrollProcessIdTbl").html().trim());
                    if (status == "Calculada" || status == "Procesada") {
                        statusPayroll = true;
                    }
                    ;
                    $("#DeletePayrollProcess").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                if (statusPayroll) {
                    windows_message("¡Una de las nóminas seleccionadas esta en estado procesada o calculada!", "error");
                }
                else {
                    windows_message("¿Desea eliminar los procesos de nómina seleccionados?", "confirm", {
                        onOk: function () {
                            $('.progreso').modal({ backdrop: 'static', keyboard: false });
                            $.ajax({
                                url: "/procesonomina/eliminar",
                                type: "POST",
                                data: $("#DeletePayrollProcess").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    $(".listid_payrollprocess").remove();
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                    }
                                    else {
                                        windows_message(data.Message, data.Type);
                                        fn.RefreshTable();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        },
                        onCancel: function () {
                            $(".selectPayrollProcess[type=checkbox]").prop('checked', false);
                            $(".listid_payrollprocess").remove();
                        }
                    });
                }
            }
        }
    });
    //procesar nomina
    $("#Process-Payroll").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            //if ($("#PayrollProcessStatus").val() != "3" && $("#PayrollProcessStatus").val() != "4") {
            let messageConfirm = "¿Desea procesar la nómina?";
            if ($("#PayrollProcessStatus").val() != "0") {
                messageConfirm = `¿Desea procesar la nómina? <br> Esta nómina ya está en estado ${$('#PayrollProcessStatus option:selected').text()} se realizaran de nuevo los cálculos correspondientes.`;
            }
            windows_message(messageConfirm, "confirm", {
                onOk: function () {
                    let input = $(document.createElement('input'));
                    input.attr("name", "PayrollProcessId");
                    input.attr("class", "PayrollProcessId");
                    input.val($("#PayrollProcessId").val().toString());
                    $("#Process-Payroll").append(input);
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/procesonomina/procesar",
                        type: "POST",
                        data: $("#Process-Payroll").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            $(".PayrollProcessId").remove();
                            if (typeof (data) != "string") {
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                }
                                else {
                                    windows_message(data.Message, data.Type);
                                }
                            }
                            else {
                                fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                windows_message("Nómina procesada correctamente ", "success");
                                //if (data.length > 0) {
                                //   // $(".tbodyTableEmployeeProcess").html('');
                                //   // $(".tbodyTableEmployeeProcess").append(data);
                                //   // //ver novedades de empleado
                                //   // $(".see-novelties").on("click", function () {                               
                                //   //     $(".see-novelties").removeClass("selected-row");
                                //   //     $(this).addClass("selected-row");
                                //   //     fn.SearchNovelties($(this).find(".EmployeeIdtbl").html().trim());
                                //   // });
                                //   //fn.SearchListDetail();
                                //}
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
            });
            //} else {
            //    windows_message("La nómina ya esta pagada o cerrada", "error");
            //}
        }
    });
    //calcular nomina
    $("#Calc-Payroll").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            //if ($("#PayrollProcessStatus").val() != "3" || $("#PayrollProcessStatus").val() != "4") {
            windows_message("¿Desea calcular la nómina?", "confirm", {
                onOk: function () {
                    let input = $(document.createElement('input'));
                    input.attr("name", "PayrollProcessId");
                    input.attr("class", "PayrollProcessId");
                    input.val($("#PayrollProcessId").val().toString());
                    $("#Calc-Payroll").append(input);
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/procesonomina/calcular",
                        type: "POST",
                        data: $("#Calc-Payroll").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            $(".PayrollProcessId").remove();
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
            });
            //} else {
            //    windows_message("La nómina ya esta pagada o cerrada", "error");
            //}
        }
    });
    //filtro
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Payrollprocess", "/procesonomina/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Payrollprocess", "/procesonomina/FilterOrMoreData");
        }
    });
    //paginación
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblPayrollsProcess").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "procesonomina", ".tbody-Table-Payrollprocess");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    $(document).on('dblclick', '.tbodyTableProcessPayroll .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.PayrollProcessIdTbl').text().trim();
        if (!rowId) {
            return;
        }
        fn.SearchFormNewAndEdit(rowId, "edit");
    });
    // Aplicar estilo clickable a las filas
    $('.tbodyTableProcessPayroll .row-app').addClass('row-clickable');
    // Inicializar modal de auditoría
    initAuditListPage('.selectPayrollProcess', '.PayrollProcessIdTbl', '/procesonomina/getbyid', 'Id');
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9QYXlyb2xsUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLFNBQVMsQ0FBQztJQUNkLElBQUksTUFBYyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxXQUFXO0FBQ1gsTUFBTSxFQUFFLEdBQUc7SUFDUCw4QkFBOEI7SUFDOUIsb0JBQW9CLEVBQUUsVUFBVSxNQUFjLEVBQUUsRUFBRSxXQUFtQixLQUFLO1FBQ3RFLElBQUksR0FBVyxDQUFBO1FBRWYsSUFBSSxHQUFHLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxpQ0FBaUMsQ0FBQzs7WUFFeEMsR0FBRyxHQUFHLG9EQUFvRCxHQUFHLEVBQUUsQ0FBQztRQUVwRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEdBQUc7WUFFUixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUUvQiwyQkFBMkI7b0JBQzNCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7d0JBQzVCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFFakMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFB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QUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILHVDQUF1QztJQUN2QyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFbEUsaUNBQWlDO0lBQ2pDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgUGF5cm9sbFByb2Nlc3MudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgcHJvY2VzYW1pZW50byBkZSBuw7NtaW5hLiBQZXJtaXRlIGVqZWN1dGFyLCBjb25zdWx0YXJcclxuICogICAgICAgICAgICAgIHkgYWRtaW5pc3RyYXIgbG9zIHByb2Nlc29zIGRlIGPDoWxjdWxvIGRlIG7Ds21pbmEuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIFByb2Nlc29Ob21pbmFcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBwYXljeWNsZXM7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vRnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9Gb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICBTZWFyY2hGb3JtTmV3QW5kRWRpdDogZnVuY3Rpb24gKF9pZDogc3RyaW5nID0gXCJcIiwgdmlld21vZGU6IHN0cmluZyA9IFwibmV3XCIpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmdcclxuXHJcbiAgICAgICAgaWYgKF9pZCA9PSBcIlwiKVxyXG4gICAgICAgICAgICB1cmwgPSBgL3Byb2Nlc29ub21pbmEvT2J0ZW5lckZvcm1OdWV2b2A7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB1cmwgPSBgL3Byb2Nlc29ub21pbmEvT2J0ZW5lckZvcm1OdWV2bz9wYXlyb2xscHJvY2Vzc2lkPSR7X2lkfWA7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG5cclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSwgdmlld21vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLk9wZW5DbG9zZU5ld0FuZEVkaXQoXCJvcGVuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaE5vdmVsdGllcygkKHRoaXMpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpLCAkKHRoaXMpLmZpbmQoXCIuVG90YWxBbW91bnR0YmxcIikuaHRtbCgpLnRyaW0oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mbi5Ub3RhbE5vdmVsdGllcygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAqIE3DqXRvZG8gcGFyYSBtb3N0cmFyIGVsIGZvcm11bGFyaW8sIFxyXG4gICAgKiBjb250aWVuZSBlbCBldmVudCBwYXJhIGNlcnJhciBlbCBmb3JtdWxhcmlvIHkgZ3VhcmRhciBsYSBkYXRhXHJcbiAgICAqL1xyXG4gICAgU2hvd0Zvcm06IGZ1bmN0aW9uIChkYXRhLCB2aWV3bW9kZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICQoXCIjQ29udE5ld0FuZEVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAkKFwiI0NvbnROZXdBbmRFZGl0UGF5cm9sbFByb2Nlc3NcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgIEluc3RhY2lhdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgICAgICAkKFwiLk9wQ2xvc2Vmb3JtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgIGZuLk9wZW5DbG9zZU5ld0FuZEVkaXQoXCJjbG9zZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGUgcGFyYSBjb250cm9sYXIgc2kgZGViZSBjZXJyYXIgZGVzcHXDqXMgZGUgZ3VhcmRhclxyXG4gICAgICAgIHZhciBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiAgICAgICAgJChcIiNGb3JtTmV3QW5kRWRpdFBheXJvbGxzUHJvY2Vzc1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9jZXNvbm9taW5hL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCkgKyBgJm9wZXJhdGlvbj0ke29wdGlvbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVmcmVzY2Ftb3MgbGEgdGFibGEgY29uIGxhIGluZm9ybWFjacOzbiBndWFyZGFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlJlZnJlc2hUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2xvc2VBZnRlclNhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uT3BlbkNsb3NlTmV3QW5kRWRpdChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLk9iaiA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoPHN0cmluZz5kYXRhLk9iaiwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIGRlYmUgZXN0YXIgZW4gZXN0YWRvIGNyZWFkYVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gR3VhcmRhciB5IGNlcnJhclxyXG4gICAgICAgICQoXCIuYnRuU2F2ZUFuZENsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkKFwiI0Zvcm1OZXdBbmRFZGl0UGF5cm9sbHNQcm9jZXNzXCIpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vc3RyYXIgY29udGVuZWRvclxyXG4gICAgICAgICQoXCIjQ29udE5ld0FuZEVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG5cclxuICAgICAgICBmbi5TZXR0aW5nTmV3QW5kRWRpdCh2aWV3bW9kZSk7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdHJhciBldmVudG8gZGUgYXVkaXRvcsOtYSBwYXJhIGVsIGZvcm11bGFyaW8gY2FyZ2FkbyBkaW7DoW1pY2FtZW50ZVxyXG4gICAgICAgICQoXCIuQXVkaXRJbmZvRm9ybVwiKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNob3dBdWRpdE1vZGFsRnJvbUZvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Ub2dnbGVcclxuICAgICAgICAkKFwiI3RvZ2dsZS10b3RhbHNcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5yZW1vdmVDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLmFkZENsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5hZGRDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9wYWdhciBub21pbmFcclxuICAgICAgICAkKFwiI1BheS1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgcGFnYXIgbGEgbsOzbWluYT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQYXktUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9wYWdhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjUGF5LVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5QYXlyb2xsUHJvY2Vzc0lkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIHlhIGVzdGEgcGFnYWRhIG8gY2VycmFkYVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NhbmNlbGFyIG5vbWluYVxyXG4gICAgICAgICQoXCIjQ2FuY2VsLVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgY2FuY2VsYXIgbGEgbsOzbWluYT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNDYW5jZWwtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9jYW5jZWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjQ2FuY2VsLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5QYXlyb2xsUHJvY2Vzc0lkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2lyIGFsIHJlcG9ydGUgZGUgcGFnb3MgZGUgbsOzbWluYVxyXG4gICAgICAgICQoJy5wYXlyb2xsLXBheW1lbnQtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0KGAvcmVwb3J0ZXMvcGFnb3NkZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1yZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnRQYXlyb2woYC9yZXBvcnRlcy9yZXBvcnRlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0maGlkZWZpbHRlcj10cnVlYCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1zdW1tYXJ5LXJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydFBheXJvbChgL3JlcG9ydGVzL3Jlc3VtZW5wYWdvc2Rlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0maGlkZWZpbHRlcj10cnVlYCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1wYXltZW50LXJlcG9ydC1lbXBsb3llZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydChgL3JlcG9ydGVzL3BhZ29zZGVub21pbmE/cGF5cm9sbHByb2Nlc3NpZD0keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfSZlbXBsb3llZUlkPSR7JChcIi5zZWxlY3RlZC1yb3dcIikuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcudHh0LXBheXJvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnQoYC9yZXBvcnRlcy90eHRwYXlyb2xsP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0mcGF5cm9sbGlkPSR7JChcIiNQYXlyb2xsSWRcIikudmFsKCkudG9TdHJpbmcoKX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm4uU2VsZWN0ZWRGaXJzdFJvdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBWYWxpZGF0aW9uUmVwb3J0OiBmdW5jdGlvbiAodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiNFwiKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoUVsIHByb2Nlc28gZGUgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBwYWdhZGEgbyBjZXJyYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVmFsaWRhdGlvblJlcG9ydFBheXJvbDogZnVuY3Rpb24gKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIyXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiNFwiKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoUVsIHByb2Nlc28gZGUgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBwYWdhZGEgbyBjYWxjdWxhZGEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL1JlZnJlc2NhciBsaXN0YSBwcmluY2lwYWxcclxuICAgIFJlZnJlc2hUYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICQoJy50Ym9keVRhYmxlUHJvY2Vzc1BheXJvbGwnKS5yZXBsYWNlV2l0aCgkKCcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL09wY2lvbmVzIGRlbCBmb3JtdWxhcmlvIHNpIGVzIG51ZXZvIG8gZWRpdGFyXHJcbiAgICBTZXR0aW5nTmV3QW5kRWRpdDogZnVuY3Rpb24gKHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmlld21vZGUgPT0gXCJuZXdcIikge1xyXG4gICAgICAgICAgICBvcHRpb24gPSAxO1xyXG4gICAgICAgICAgICBmbi5FbmFibGVkb3JEaXNhYmxlSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2hvd2lkXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb24gPSAyO1xyXG4gICAgICAgICAgICBmbi5FbmFibGVkb3JEaXNhYmxlSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2hvd2lkXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVkb3JEaXNhYmxlSW5wdXRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJyNQYXlyb2xsUHJvY2Vzc1N0YXR1cycpLnZhbCgpICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICQoXCIjUGF5cm9sbElkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjRGVzY3JpcHRpb25cIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIiNQYXltZW50RGF0ZVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI1BheUN5Y2xlSWRcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjUHJvaklkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUHJvakNhdGVnb3J5SWRcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIi5hcHAtaW5wdXQtZGF0ZS1uZXZlclwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtdG9kYXlcIikuaGlkZSgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNEZXNjcmlwdGlvblwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNQYXltZW50RGF0ZVwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNQYXlDeWNsZUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgJChcIiNQcm9qSWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUHJvakNhdGVnb3J5SWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtbmV2ZXJcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLXRvZGF5XCIpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vZnVuY2lvbiBhYnJpciBudWV2byBmb3JtdWxhcmlvXHJcbiAgICBPcGVuQ2xvc2VOZXdBbmRFZGl0OiBmdW5jdGlvbiAoX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgU2VhcmNoTm92ZWx0aWVzOiBmdW5jdGlvbiAoX0lkZW1wbG95ZTogc3RyaW5nLCBUb3RhbEFtb3VudDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgcHJvY2Vzb25vbWluYS8keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfS8ke19JZGVtcGxveWV9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlTm92ZWRhZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVOb3ZlZGFkXCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZ3Jlc29Ub3RhbDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoXCIuY2FsY3VsYXItdG90YWxcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJCh0aGlzKS5maW5kKFwiLlBheXJvbGxBY3Rpb25UeXBldGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgkKHRoaXMpLmZpbmQoXCIuUGF5cm9sbEFjdGlvblR5cGV0YmxcIikuaHRtbCgpLnRyaW0oKSAhPSBcIkNvbnRyaWJ1Y2nDs25cIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGluZ3Jlc29Ub3RhbCArPSBwYXJzZUZsb2F0KCQodGhpcykuZmluZChcIi5BY3Rpb25BbW91bnR0YmxhY3Rpb25cIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50b3RhbC1hbW91bnRcIikudGV4dChgJHtGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoVG90YWxBbW91bnQpfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9saXN0YSBkZSBkZXRhbGxlIGRlIHByb2Nlc28gZGUgbm9taW5hXHJcbiAgICBTZWFyY2hMaXN0RGV0YWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgcHJvY2Vzb25vbWluYS8keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZUVtcGxveWVlUHJvY2Vzc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWUtbm92ZWx0aWVzXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hOb3ZlbHRpZXMoJCh0aGlzKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSwgJCh0aGlzKS5maW5kKFwiLlRvdGFsQW1vdW50dGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2ZuLlNlbGVjdGVkRmlyc3RSb3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0ZWRGaXJzdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBmaXJzdFJvdyA9ICQoXCIuc2VlLW5vdmVsdGllc1wiKS5maXJzdCgpO1xyXG4gICAgICAgIGlmIChmaXJzdFJvdy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAvKiAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTsqL1xyXG4gICAgICAgICAgICBmaXJzdFJvdy5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKGZpcnN0Um93LmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpLCBmaXJzdFJvdy5maW5kKFwiLlRvdGFsQW1vdW50dGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn1cclxuXHJcbmVzdWNoYWRvcmVzOiB7XHJcbiAgICAkKFwiLk5ld1BheXJvbGxQcm9jZXNzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLkVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzSWRUYmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoX2lkLCBcImVkaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9FbGltaW5hciBwcm9jZXNvIGRlIG7Ds21pbmFcclxuICAgICQoXCIjRGVsZXRlUGF5cm9sbFByb2Nlc3NcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzUGF5cm9sbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFByb2Nlc3NbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzU3RhdHVzdGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJsaXN0aWRfcGF5cm9sbHByb2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwibGlzdGlkX3BheXJvbGxwcm9jZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUGF5cm9sbFByb2Nlc3NJZFRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IFwiQ2FsY3VsYWRhXCIgfHwgc3RhdHVzID09IFwiUHJvY2VzYWRhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzUGF5cm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVBheXJvbGxQcm9jZXNzXCIpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1c1BheXJvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoVVuYSBkZSBsYXMgbsOzbWluYXMgc2VsZWNjaW9uYWRhcyBlc3RhIGVuIGVzdGFkbyBwcm9jZXNhZGEgbyBjYWxjdWxhZGEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIHByb2Nlc29zIGRlIG7Ds21pbmEgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9jZXNvbm9taW5hL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVQYXlyb2xsUHJvY2Vzc1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5SZWZyZXNoVGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3Byb2Nlc2FyIG5vbWluYVxyXG4gICAgJChcIiNQcm9jZXNzLVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgJiYgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VDb25maXJtOiBzdHJpbmcgPSBcIsK/RGVzZWEgcHJvY2VzYXIgbGEgbsOzbWluYT9cIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUNvbmZpcm0gPSBgwr9EZXNlYSBwcm9jZXNhciBsYSBuw7NtaW5hPyA8YnI+IEVzdGEgbsOzbWluYSB5YSBlc3TDoSBlbiBlc3RhZG8gJHskKCcjUGF5cm9sbFByb2Nlc3NTdGF0dXMgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpfSBzZSByZWFsaXphcmFuIGRlIG51ZXZvIGxvcyBjw6FsY3Vsb3MgY29ycmVzcG9uZGllbnRlcy5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKG1lc3NhZ2VDb25maXJtLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1Byb2Nlc3MtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9wcm9jZXNhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI1Byb2Nlc3MtUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChkYXRhKSAhPSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk7Ds21pbmEgcHJvY2VzYWRhIGNvcnJlY3RhbWVudGUgXCIsIFwic3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICQoXCIudGJvZHlUYWJsZUVtcGxveWVlUHJvY2Vzc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vZm4uU2VhcmNoTGlzdERldGFpbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIHlhIGVzdGEgcGFnYWRhIG8gY2VycmFkYVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2FsY3VsYXIgbm9taW5hXHJcbiAgICAkKFwiI0NhbGMtUGF5cm9sbFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBjYWxjdWxhciBsYSBuw7NtaW5hP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0NhbGMtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9jYWxjdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0NhbGMtUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSB5YSBlc3RhIHBhZ2FkYSBvIGNlcnJhZGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9maWx0cm9cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1QYXlyb2xscHJvY2Vzc1wiLCBcIi9wcm9jZXNvbm9taW5hL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIiwgXCIvcHJvY2Vzb25vbWluYS9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhZ2luYWNpw7NuXHJcbiAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRzY3JvbGwgPSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4c2Nyb2xsID0gJChcIi50YmxQYXlyb2xsc1Byb2Nlc3NcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcInByb2Nlc29ub21pbmFcIiwgXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgcGFyYSBlZGl0YXJcclxuICAgICQoZG9jdW1lbnQpLm9uKCdkYmxjbGljaycsICcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsIC5yb3ctYXBwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIHx8ICQoZS50YXJnZXQpLmlzKCdsYWJlbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSAkKHRoaXMpLmZpbmQoJy5QYXlyb2xsUHJvY2Vzc0lkVGJsJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICBpZiAoIXJvd0lkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KHJvd0lkLCBcImVkaXRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBcGxpY2FyIGVzdGlsbyBjbGlja2FibGUgYSBsYXMgZmlsYXNcclxuICAgICQoJy50Ym9keVRhYmxlUHJvY2Vzc1BheXJvbGwgLnJvdy1hcHAnKS5hZGRDbGFzcygncm93LWNsaWNrYWJsZScpO1xyXG5cclxuICAgIC8vIEluaWNpYWxpemFyIG1vZGFsIGRlIGF1ZGl0b3LDrWFcclxuICAgIGluaXRBdWRpdExpc3RQYWdlKCcuc2VsZWN0UGF5cm9sbFByb2Nlc3MnLCAnLlBheXJvbGxQcm9jZXNzSWRUYmwnLCAnL3Byb2Nlc29ub21pbmEvZ2V0YnlpZCcsICdJZCcpO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19