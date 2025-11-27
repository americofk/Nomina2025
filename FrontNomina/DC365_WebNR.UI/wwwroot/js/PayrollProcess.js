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
        //guardar información
        $("#FormNewAndEditPayrollsProcess").submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
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
                                if (data.Obj == "") {
                                    fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                }
                                else {
                                    fn.SearchFormNewAndEdit(data.Obj, "edit");
                                }
                                //Refrescamos la tabla con la información guardada
                                fn.RefreshTable();
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
        //Mostrar contenedor
        $("#ContNewAndEditPayrollProcess").removeClass("collapse");
        fn.SettingNewAndEdit(viewmode);
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
            if ($(this).valid()) {
                e.preventDefault();
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
            if ($(this).valid()) {
                e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9QYXlyb2xsUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLFNBQVMsQ0FBQztJQUNkLElBQUksTUFBYyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxXQUFXO0FBQ1gsTUFBTSxFQUFFLEdBQUc7SUFDUCw4QkFBOEI7SUFDOUIsb0JBQW9CLEVBQUUsVUFBVSxNQUFjLEVBQUUsRUFBRSxXQUFtQixLQUFLO1FBQ3RFLElBQUksR0FBVyxDQUFBO1FBRWYsSUFBSSxHQUFHLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxpQ0FBaUMsQ0FBQzs7WUFFeEMsR0FBRyxHQUFHLG9EQUFvRCxHQUFHLEVBQUUsQ0FBQztRQUVwRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEdBQUc7WUFFUixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUUvQiwyQkFBMkI7b0JBQzNCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7d0JBQzVCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFFakMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFB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Q0FBb0MsRUFBRSxVQUFVLENBQUM7UUFDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdEUsT0FBTztRQUNYLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQUMsT0FBTztRQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILHVDQUF1QztJQUN2QyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBQYXlyb2xsUHJvY2Vzcy50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBwcm9jZXNhbWllbnRvIGRlIG7Ds21pbmEuIFBlcm1pdGUgZWplY3V0YXIsIGNvbnN1bHRhclxyXG4gKiAgICAgICAgICAgICAgeSBhZG1pbmlzdHJhciBsb3MgcHJvY2Vzb3MgZGUgY8OhbGN1bG8gZGUgbsOzbWluYS5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgUHJvY2Vzb05vbWluYVxyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgdmFyIHBheWN5Y2xlcztcclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxufVxyXG5cclxuLy9GdW5jaW9uZXNcclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL0Zvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgIFNlYXJjaEZvcm1OZXdBbmRFZGl0OiBmdW5jdGlvbiAoX2lkOiBzdHJpbmcgPSBcIlwiLCB2aWV3bW9kZTogc3RyaW5nID0gXCJuZXdcIikge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZ1xyXG5cclxuICAgICAgICBpZiAoX2lkID09IFwiXCIpXHJcbiAgICAgICAgICAgIHVybCA9IGAvcHJvY2Vzb25vbWluYS9PYnRlbmVyRm9ybU51ZXZvYDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHVybCA9IGAvcHJvY2Vzb25vbWluYS9PYnRlbmVyRm9ybU51ZXZvP3BheXJvbGxwcm9jZXNzaWQ9JHtfaWR9YDtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcblxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhLCB2aWV3bW9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uT3BlbkNsb3NlTmV3QW5kRWRpdChcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWUtbm92ZWx0aWVzXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCksICQodGhpcykuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZuLlRvdGFsTm92ZWx0aWVzKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICogTcOpdG9kbyBwYXJhIG1vc3RyYXIgZWwgZm9ybXVsYXJpbywgXHJcbiAgICAqIGNvbnRpZW5lIGVsIGV2ZW50IHBhcmEgY2VycmFyIGVsIGZvcm11bGFyaW8geSBndWFyZGFyIGxhIGRhdGFcclxuICAgICovXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEsIHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICQoXCIjQ29udE5ld0FuZEVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgICAgICQoXCIuT3BDbG9zZWZvcm1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnROZXdBbmRFZGl0UGF5cm9sbFByb2Nlc3NcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgZm4uT3BlbkNsb3NlTmV3QW5kRWRpdChcImNsb3NlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiAgICAgICAgJChcIiNGb3JtTmV3QW5kRWRpdFBheXJvbGxzUHJvY2Vzc1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSUdlbmVyaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuT2JqID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCg8c3RyaW5nPmRhdGEuT2JqLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JlZnJlc2NhbW9zIGxhIHRhYmxhIGNvbiBsYSBpbmZvcm1hY2nDs24gZ3VhcmRhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5SZWZyZXNoVGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBjcmVhZGFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTW9zdHJhciBjb250ZW5lZG9yXHJcbiAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcblxyXG4gICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KHZpZXdtb2RlKTtcclxuXHJcbiAgICAgICAgLy9Ub2dnbGVcclxuICAgICAgICAkKFwiI3RvZ2dsZS10b3RhbHNcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5yZW1vdmVDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLmFkZENsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5hZGRDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9wYWdhciBub21pbmFcclxuICAgICAgICAkKFwiI1BheS1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiNFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBwYWdhciBsYSBuw7NtaW5hP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1BheS1QYXlyb2xsXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9jZXNvbm9taW5hL3BhZ2FyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNQYXktUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vY2FuY2VsYXIgbm9taW5hXHJcbiAgICAgICAgJChcIiNDYW5jZWwtUGF5cm9sbFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGNhbmNlbGFyIGxhIG7Ds21pbmE/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQ2FuY2VsLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvY2FuY2VsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0NhbmNlbC1QYXlyb2xsXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIHlhIGVzdGEgcGFnYWRhIG8gY2VycmFkYVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9pciBhbCByZXBvcnRlIGRlIHBhZ29zIGRlIG7Ds21pbmFcclxuICAgICAgICAkKCcucGF5cm9sbC1wYXltZW50LXJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydChgL3JlcG9ydGVzL3BhZ29zZGVub21pbmE/cGF5cm9sbHByb2Nlc3NpZD0keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfSZoaWRlZmlsdGVyPXRydWVgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0UGF5cm9sKGAvcmVwb3J0ZXMvcmVwb3J0ZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtc3VtbWFyeS1yZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnRQYXlyb2woYC9yZXBvcnRlcy9yZXN1bWVucGFnb3NkZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtcGF5bWVudC1yZXBvcnQtZW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnQoYC9yZXBvcnRlcy9wYWdvc2Rlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0mZW1wbG95ZWVJZD0keyQoXCIuc2VsZWN0ZWQtcm93XCIpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpfSZoaWRlZmlsdGVyPXRydWVgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnR4dC1wYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0KGAvcmVwb3J0ZXMvdHh0cGF5cm9sbD9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JnBheXJvbGxpZD0keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpLnRvU3RyaW5nKCl9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZuLlNlbGVjdGVkRmlyc3RSb3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgVmFsaWRhdGlvblJlcG9ydDogZnVuY3Rpb24gKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjRcIikge1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFFbCBwcm9jZXNvIGRlIG7Ds21pbmEgZGViZSBlc3RhciBlbiBlc3RhZG8gcGFnYWRhIG8gY2VycmFkYSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFZhbGlkYXRpb25SZXBvcnRQYXlyb2w6IGZ1bmN0aW9uICh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiMlwiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjRcIikge1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFFbCBwcm9jZXNvIGRlIG7Ds21pbmEgZGViZSBlc3RhciBlbiBlc3RhZG8gcGFnYWRhIG8gY2FsY3VsYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZWZyZXNjYXIgbGlzdGEgcHJpbmNpcGFsXHJcbiAgICBSZWZyZXNoVGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAkKCcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsJykucmVwbGFjZVdpdGgoJCgnLnRib2R5VGFibGVQcm9jZXNzUGF5cm9sbCcsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9PcGNpb25lcyBkZWwgZm9ybXVsYXJpbyBzaSBlcyBudWV2byBvIGVkaXRhclxyXG4gICAgU2V0dGluZ05ld0FuZEVkaXQ6IGZ1bmN0aW9uICh2aWV3bW9kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZpZXdtb2RlID09IFwibmV3XCIpIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAgICAgZm4uRW5hYmxlZG9yRGlzYWJsZUlucHV0cygpO1xyXG4gICAgICAgICAgICAkKFwiLnNob3dpZFwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgZm4uRW5hYmxlZG9yRGlzYWJsZUlucHV0cygpO1xyXG4gICAgICAgICAgICAkKFwiLnNob3dpZFwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlZG9yRGlzYWJsZUlucHV0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcjUGF5cm9sbFByb2Nlc3NTdGF0dXMnKS52YWwoKSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI0Rlc2NyaXB0aW9uXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5bWVudERhdGVcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIiNQYXlDeWNsZUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI1Byb2pJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI1Byb2pDYXRlZ29yeUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtbmV2ZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLXRvZGF5XCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcIiNQYXlyb2xsSWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjRGVzY3JpcHRpb25cIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5bWVudERhdGVcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5Q3ljbGVJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjUHJvaklkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKFwiI1Byb2pDYXRlZ29yeUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLW5ldmVyXCIpLnNob3coKTtcclxuICAgICAgICAgICAgJChcIi5hcHAtaW5wdXQtZGF0ZS10b2RheVwiKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldm8gZm9ybXVsYXJpb1xyXG4gICAgT3BlbkNsb3NlTmV3QW5kRWRpdDogZnVuY3Rpb24gKF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgIFNlYXJjaE5vdmVsdGllczogZnVuY3Rpb24gKF9JZGVtcGxveWU6IHN0cmluZywgVG90YWxBbW91bnQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYHByb2Nlc29ub21pbmEvJHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0vJHtfSWRlbXBsb3llfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZU5vdmVkYWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlTm92ZWRhZFwiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmdyZXNvVG90YWw6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKFwiLmNhbGN1bGFyLXRvdGFsXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCQodGhpcykuZmluZChcIi5QYXlyb2xsQWN0aW9uVHlwZXRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoJCh0aGlzKS5maW5kKFwiLlBheXJvbGxBY3Rpb25UeXBldGJsXCIpLmh0bWwoKS50cmltKCkgIT0gXCJDb250cmlidWNpw7NuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpbmdyZXNvVG90YWwgKz0gcGFyc2VGbG9hdCgkKHRoaXMpLmZpbmQoXCIuQWN0aW9uQW1vdW50dGJsYWN0aW9uXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudG90YWwtYW1vdW50XCIpLnRleHQoYCR7Rm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKFRvdGFsQW1vdW50KX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vbGlzdGEgZGUgZGV0YWxsZSBkZSBwcm9jZXNvIGRlIG5vbWluYVxyXG4gICAgU2VhcmNoTGlzdERldGFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYHByb2Nlc29ub21pbmEvJHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlRW1wbG95ZWVQcm9jZXNzXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCksICQodGhpcykuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mbi5TZWxlY3RlZEZpcnN0Um93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdGVkRmlyc3RSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZmlyc3RSb3cgPSAkKFwiLnNlZS1ub3ZlbHRpZXNcIikuZmlyc3QoKTtcclxuICAgICAgICBpZiAoZmlyc3RSb3cubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgLyogICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7Ki9cclxuICAgICAgICAgICAgZmlyc3RSb3cuYWRkQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgIGZuLlNlYXJjaE5vdmVsdGllcyhmaXJzdFJvdy5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSwgZmlyc3RSb3cuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59XHJcblxyXG5lc3VjaGFkb3Jlczoge1xyXG4gICAgJChcIi5OZXdQYXlyb2xsUHJvY2Vzc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5FZGl0UGF5cm9sbFByb2Nlc3NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsUHJvY2Vzc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlyb2xsUHJvY2Vzc0lkVGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiaW5mb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KF9pZCwgXCJlZGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vRWxpbWluYXIgcHJvY2VzbyBkZSBuw7NtaW5hXHJcbiAgICAkKFwiI0RlbGV0ZVBheXJvbGxQcm9jZXNzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1c1BheXJvbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlyb2xsUHJvY2Vzc1N0YXR1c3RibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwibGlzdGlkX3BheXJvbGxwcm9jZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzSWRUYmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBcIkNhbGN1bGFkYVwiIHx8IHN0YXR1cyA9PSBcIlByb2Nlc2FkYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1BheXJvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNEZWxldGVQYXlyb2xsUHJvY2Vzc1wiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXNQYXlyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFVbmEgZGUgbGFzIG7Ds21pbmFzIHNlbGVjY2lvbmFkYXMgZXN0YSBlbiBlc3RhZG8gcHJvY2VzYWRhIG8gY2FsY3VsYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBwcm9jZXNvcyBkZSBuw7NtaW5hIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGVsZXRlUGF5cm9sbFByb2Nlc3NcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5saXN0aWRfcGF5cm9sbHByb2Nlc3NcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaFRhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsUHJvY2Vzc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5saXN0aWRfcGF5cm9sbHByb2Nlc3NcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wcm9jZXNhciBub21pbmFcclxuICAgICQoXCIjUHJvY2Vzcy1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL2lmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiICYmICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlQ29uZmlybTogc3RyaW5nID0gXCLCv0Rlc2VhIHByb2Nlc2FyIGxhIG7Ds21pbmE/XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VDb25maXJtID0gYMK/RGVzZWEgcHJvY2VzYXIgbGEgbsOzbWluYT8gPGJyPiBFc3RhIG7Ds21pbmEgeWEgZXN0w6EgZW4gZXN0YWRvICR7JCgnI1BheXJvbGxQcm9jZXNzU3RhdHVzIG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKX0gc2UgcmVhbGl6YXJhbiBkZSBudWV2byBsb3MgY8OhbGN1bG9zIGNvcnJlc3BvbmRpZW50ZXMuYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShtZXNzYWdlQ29uZmlybSwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQcm9jZXNzLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvcHJvY2VzYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNQcm9jZXNzLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSkgIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJOw7NtaW5hIHByb2Nlc2FkYSBjb3JyZWN0YW1lbnRlIFwiLCBcInN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gJChcIi50Ym9keVRhYmxlRW1wbG95ZWVQcm9jZXNzXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnNlZS1ub3ZlbHRpZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgICQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgIGZuLlNlYXJjaE5vdmVsdGllcygkKHRoaXMpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvL2ZuLlNlYXJjaExpc3REZXRhaWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSB5YSBlc3RhIHBhZ2FkYSBvIGNlcnJhZGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NhbGN1bGFyIG5vbWluYVxyXG4gICAgJChcIiNDYWxjLVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvL2lmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgY2FsY3VsYXIgbGEgbsOzbWluYT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNDYWxjLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvY2FsY3VsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNDYWxjLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vZmlsdHJvXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIiwgXCIvcHJvY2Vzb25vbWluYS9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLVBheXJvbGxwcm9jZXNzXCIsIFwiL3Byb2Nlc29ub21pbmEvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wYWdpbmFjacOzblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsUGF5cm9sbHNQcm9jZXNzXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJwcm9jZXNvbm9taW5hXCIsIFwiLnRib2R5LVRhYmxlLVBheXJvbGxwcm9jZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhYmlsaXRhciBkb2JsZSBjbGljIGVuIGZpbGFzIHBhcmEgZWRpdGFyXHJcbiAgICAkKGRvY3VtZW50KS5vbignZGJsY2xpY2snLCAnLnRib2R5VGFibGVQcm9jZXNzUGF5cm9sbCAucm93LWFwcCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSB8fCAkKGUudGFyZ2V0KS5pcygnbGFiZWwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJvd0lkID0gJCh0aGlzKS5maW5kKCcuUGF5cm9sbFByb2Nlc3NJZFRibCcpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFyb3dJZCkgeyByZXR1cm47IH1cclxuICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdChyb3dJZCwgXCJlZGl0XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXBsaWNhciBlc3RpbG8gY2xpY2thYmxlIGEgbGFzIGZpbGFzXHJcbiAgICAkKCcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsIC5yb3ctYXBwJykuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==