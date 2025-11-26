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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9QYXlyb2xsUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxNQUFjLENBQUM7QUFDdkIsQ0FBQztBQUVELFdBQVc7QUFDWCxNQUFNLEVBQUUsR0FBRztJQUNQLDhCQUE4QjtJQUM5QixvQkFBb0IsRUFBRSxVQUFVLE1BQWMsRUFBRSxFQUFFLFdBQW1CLEtBQUs7UUFDdEUsSUFBSSxHQUFXLENBQUE7UUFFZixJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLGlDQUFpQyxDQUFDOztZQUV4QyxHQUFHLEdBQUcsb0RBQW9ELEdBQUcsRUFBRSxDQUFDO1FBRXBFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRztZQUVSLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1QixFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRS9CLDJCQUEyQjtvQkFDM0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTt3QkFDNUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUVqQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTt3QkFDL0cscUJBQXFCO29CQUN6QixDQUFDLENBQUMsQ0FBQztnQkFHUCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztNQUdFO0lBQ0YsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFLFFBQWdCO1FBRXRDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixxQ0FBcUM7UUFDckMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDMUIsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2xELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSCxHQUFHLEVBQUUsd0JBQXdCO3dCQUM3QixJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLGNBQWMsTUFBTSxFQUFFO3dCQUNsRCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLEVBQUUsVUFBVSxJQUF1Qjs0QkFDdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dDQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZCLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQ0FDakIsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dDQUM3RSxDQUFDO3FDQUFNLENBQUM7b0NBQ0osRUFBRSxDQUFDLG9CQUFvQixDQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3RELENBQUM7Z0NBRUQsa0RBQWtEO2dDQUNsRCxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ3RCLENBQUM7d0JBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7NEJBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osZUFBZSxDQUFDLHVDQUF1QyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUV0RSxDQUFDO1lBRUwsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzRCxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsUUFBUTtRQUNSLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN0QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xELElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVuRCxDQUFDO2lCQUNJLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNoQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRW5CLDJGQUEyRjtnQkFDdkYsZUFBZSxDQUFDLHlCQUF5QixFQUFFLFNBQVMsRUFBRTtvQkFDbEQsSUFBSSxFQUFFO3dCQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7d0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7d0JBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFaEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzlELENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ0gsR0FBRyxFQUFFLHNCQUFzQjs0QkFDM0IsSUFBSSxFQUFFLE1BQU07NEJBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUU7NEJBQ25DLEtBQUssRUFBRSxJQUFJOzRCQUNYLE9BQU8sRUFBRSxVQUFVLElBQWdCO2dDQUMvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUM3QixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO29DQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3ZCLENBQUM7cUNBQ0ksQ0FBQztvQ0FDRixFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7b0NBQ3pFLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FFN0MsQ0FBQzs0QkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBRUosQ0FBQyxDQUFDO2dCQUNQLFVBQVU7Z0JBQ1YscUVBQXFFO2dCQUNyRSxHQUFHO1lBR1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUVuQixJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDckYsZUFBZSxDQUFDLDRCQUE0QixFQUFFLFNBQVMsRUFBRTt3QkFDckQsSUFBSSxFQUFFOzRCQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7NEJBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7NEJBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs0QkFDbkQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUVuQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDSCxHQUFHLEVBQUUseUJBQXlCO2dDQUM5QixJQUFJLEVBQUUsTUFBTTtnQ0FDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxFQUFFO2dDQUN0QyxLQUFLLEVBQUUsSUFBSTtnQ0FDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjtvQ0FDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDN0IsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQzt3Q0FDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUN2QixDQUFDO3lDQUNJLENBQUM7d0NBQ0YsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dDQUN6RSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBRTdDLENBQUM7Z0NBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7b0NBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUM5QixDQUFDOzZCQUNKLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3FCQUVKLENBQUMsQ0FBQztnQkFDUCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osZUFBZSxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO1lBR0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsa0NBQWtDO1FBQ2xDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFFckMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLDRDQUE0QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMvSCxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsRUFBRSxDQUFDLHNCQUFzQixDQUFDLDRDQUE0QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVySSxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDckMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLG1EQUFtRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUU1SSxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLDRDQUE0QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDck0sQ0FBQyxDQUFDLENBQUM7UUFFSCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUMxQixFQUFFLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUosQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLEVBQUUsVUFBVSxHQUFXO1FBQ25DLElBQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRXJGLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUM7YUFBTSxDQUFDO1lBQ0osZUFBZSxDQUFDLDhEQUE4RCxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdGLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLEVBQUUsVUFBVSxHQUFXO1FBQ3pDLElBQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVoSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQixDQUFDO2FBQU0sQ0FBQztZQUNKLGVBQWUsQ0FBQyxnRUFBZ0UsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRixDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixZQUFZLEVBQUU7UUFDVixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDZixJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsaUJBQWlCLEVBQUUsVUFBVSxRQUFnQjtRQUN6QyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNwQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQ0ksQ0FBQztZQUNGLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLEVBQUU7UUFDcEIsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV4QyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXRDLENBQUM7YUFBTSxDQUFDO1lBQ0osQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFekMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxtQkFBbUIsRUFBRSxVQUFVLE9BQU87UUFDbEMsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELENBQUM7YUFBTSxDQUFDO1lBQ0osQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixlQUFlLEVBQUUsVUFBVSxVQUFrQixFQUFFLFdBQW1CO1FBQzlELENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLFVBQVUsRUFBRTtZQUM3RSxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFckMsSUFBSSxZQUFZLEdBQVcsQ0FBQyxDQUFDO29CQUM3Qix5Q0FBeUM7b0JBQ3pDLHVFQUF1RTtvQkFDdkUsZ0ZBQWdGO29CQUNoRixPQUFPO29CQUNQLDJGQUEyRjtvQkFDM0YsT0FBTztvQkFDUCxLQUFLO29CQUNMLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRXhFLENBQUM7WUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsZ0JBQWdCLEVBQUU7UUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMvRCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3pDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0MsMkJBQTJCO29CQUMzQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO3dCQUM1QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ2pDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNwSCxDQUFDLENBQUMsQ0FBQztvQkFFSCx3QkFBd0I7Z0JBQzVCLENBQUM7WUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0IsRUFBRTtRQUNkLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNDLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN2QixnRUFBZ0U7WUFDaEUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0SCxDQUFDO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFFRCxXQUFXLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDaEMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0UsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDakIsZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELENBQUM7YUFFSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQixlQUFlLENBQUMsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUQsQ0FBQzthQUNJLENBQUM7WUFDRixFQUFFLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDRCQUE0QjtJQUM1QixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztZQUM5QixJQUFJLGFBQWEsR0FBWSxLQUFLLENBQUM7WUFFbkMsd0VBQXdFO1lBQ3hFLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUE7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0RixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO29CQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO29CQUM3QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixJQUFJLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLFdBQVcsRUFBRSxDQUFDO3dCQUNqRCxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUN6QixDQUFDO29CQUFBLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ1osZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELENBQUM7aUJBQ0ksQ0FBQztnQkFDRixJQUFJLGFBQWEsRUFBRSxDQUFDO29CQUNoQixlQUFlLENBQUMseUVBQXlFLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3hHLENBQUM7cUJBQU0sQ0FBQztvQkFDSixlQUFlLENBQUMsdURBQXVELEVBQUUsU0FBUyxFQUFFO3dCQUNoRixJQUFJLEVBQUU7NEJBQ0YsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQzlELENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ0gsR0FBRyxFQUFFLHlCQUF5QjtnQ0FDOUIsSUFBSSxFQUFFLE1BQU07Z0NBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFNBQVMsRUFBRTtnQ0FDNUMsS0FBSyxFQUFFLElBQUk7Z0NBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7b0NBQy9CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQzdCLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7d0NBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDdkIsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDekMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUN0QixDQUFDO2dDQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO29DQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDOUIsQ0FBQzs2QkFDSixDQUFDLENBQUM7d0JBQ1AsQ0FBQzt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDakUsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ3pDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFHTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCO0lBQ2pCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsMkZBQTJGO1lBQ3ZGLElBQUksY0FBYyxHQUFXLDRCQUE0QixDQUFDO1lBQzFELElBQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQzFDLGNBQWMsR0FBRyxpRUFBaUUsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsSUFBSSxFQUFFLHdEQUF3RCxDQUFDO1lBQ2hNLENBQUM7WUFDRCxlQUFlLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxFQUFFO29CQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVwQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSCxHQUFHLEVBQUUseUJBQXlCO3dCQUM5QixJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFO3dCQUN2QyxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJOzRCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM3QixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7Z0NBQzVCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztvQ0FDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUN2QixDQUFDO3FDQUNJLENBQUM7b0NBQ0YsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUU3QyxDQUFDOzRCQUNMLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3pFLGVBQWUsQ0FBQyxpQ0FBaUMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FFOUQsd0JBQXdCO2dDQUN4QixpREFBaUQ7Z0NBQ2pELHFEQUFxRDtnQ0FDckQsbUNBQW1DO2dDQUNuQyxvRkFBb0Y7Z0NBQ3BGLDREQUE0RDtnQ0FDNUQsNkNBQTZDO2dDQUM3Qyw2RUFBNkU7Z0NBQzdFLFdBQVc7Z0NBQ1gsNkJBQTZCO2dDQUU3QixHQUFHOzRCQUNQLENBQUM7d0JBRUwsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7NEJBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBRUosQ0FBQyxDQUFDO1lBQ1AsVUFBVTtZQUNWLHFFQUFxRTtZQUNyRSxHQUFHO1FBR1AsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCO0lBQ2pCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLDJGQUEyRjtZQUN2RixlQUFlLENBQUMsNEJBQTRCLEVBQUUsU0FBUyxFQUFFO2dCQUNyRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztvQkFDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVqQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSCxHQUFHLEVBQUUseUJBQXlCO3dCQUM5QixJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsRUFBRTt3QkFDcEMsS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7NEJBQy9CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzdCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7Z0NBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkIsQ0FBQztpQ0FDSSxDQUFDO2dDQUNGLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQ0FDekUsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUU3QyxDQUFDO3dCQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHOzRCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUVKLENBQUMsQ0FBQztZQUNQLFVBQVU7WUFDVixxRUFBcUU7WUFDckUsR0FBRztRQUdQLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUdILFFBQVE7SUFDUixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM1QixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUMvQixVQUFVLENBQUMsNkJBQTZCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztRQUNqRixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkMsSUFBSSxPQUFPLElBQUksRUFBRSxFQUFFLENBQUM7WUFDaEIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsVUFBVSxDQUFDLDZCQUE2QixFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFFakYsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsWUFBWTtJQUNaLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVyRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BHLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztZQUV4RSxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsNENBQTRDO0lBQzVDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLG9DQUFvQyxFQUFFLFVBQVUsQ0FBQztRQUN4RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN0RSxPQUFPO1FBQ1gsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFBQyxPQUFPO1FBQUMsQ0FBQztRQUN2QixFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsdUNBQXVDO0lBQ3ZDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgcGF5Y3ljbGVzO1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG59XHJcblxyXG4vL0Z1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vRm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRm9ybU5ld0FuZEVkaXQ6IGZ1bmN0aW9uIChfaWQ6IHN0cmluZyA9IFwiXCIsIHZpZXdtb2RlOiBzdHJpbmcgPSBcIm5ld1wiKSB7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nXHJcblxyXG4gICAgICAgIGlmIChfaWQgPT0gXCJcIilcclxuICAgICAgICAgICAgdXJsID0gYC9wcm9jZXNvbm9taW5hL09idGVuZXJGb3JtTnVldm9gO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdXJsID0gYC9wcm9jZXNvbm9taW5hL09idGVuZXJGb3JtTnVldm8/cGF5cm9sbHByb2Nlc3NpZD0ke19pZH1gO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEsIHZpZXdtb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5PcGVuQ2xvc2VOZXdBbmRFZGl0KFwib3BlblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy92ZXIgbm92ZWRhZGVzIGRlIGVtcGxlYWRvXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZWUtbm92ZWx0aWVzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hOb3ZlbHRpZXMoJCh0aGlzKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSwgJCh0aGlzKS5maW5kKFwiLlRvdGFsQW1vdW50dGJsXCIpLmh0bWwoKS50cmltKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm4uVG90YWxOb3ZlbHRpZXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgKiBNw6l0b2RvIHBhcmEgbW9zdHJhciBlbCBmb3JtdWxhcmlvLCBcclxuICAgICogY29udGllbmUgZWwgZXZlbnQgcGFyYSBjZXJyYXIgZWwgZm9ybXVsYXJpbyB5IGd1YXJkYXIgbGEgZGF0YVxyXG4gICAgKi9cclxuICAgIFNob3dGb3JtOiBmdW5jdGlvbiAoZGF0YSwgdmlld21vZGU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAkKFwiI0NvbnROZXdBbmRFZGl0UGF5cm9sbFByb2Nlc3NcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICAgICAgJChcIi5PcENsb3NlZm9ybVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjQ29udE5ld0FuZEVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICBmbi5PcGVuQ2xvc2VOZXdBbmRFZGl0KFwiY2xvc2VcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vZ3VhcmRhciBpbmZvcm1hY2nDs25cclxuICAgICAgICAkKFwiI0Zvcm1OZXdBbmRFZGl0UGF5cm9sbHNQcm9jZXNzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYXRpb249JHtvcHRpb259YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJR2VuZXJpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5PYmogPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KDxzdHJpbmc+ZGF0YS5PYmosIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVmcmVzY2Ftb3MgbGEgdGFibGEgY29uIGxhIGluZm9ybWFjacOzbiBndWFyZGFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlJlZnJlc2hUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIGRlYmUgZXN0YXIgZW4gZXN0YWRvIGNyZWFkYVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Nb3N0cmFyIGNvbnRlbmVkb3JcclxuICAgICAgICAkKFwiI0NvbnROZXdBbmRFZGl0UGF5cm9sbFByb2Nlc3NcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgZm4uU2V0dGluZ05ld0FuZEVkaXQodmlld21vZGUpO1xyXG5cclxuICAgICAgICAvL1RvZ2dsZVxyXG4gICAgICAgICQoXCIjdG9nZ2xlLXRvdGFsc1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIikudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwic2hvdy10b3RhbHNcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3RvdGFscy1jb250YWluZXJcIikuYWRkQ2xhc3MoXCJoaWRlLXRvdGFsc1wiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLmFkZENsYXNzKFwic2hvdy10b3RhbHNcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3RvdGFscy1jb250YWluZXJcIikucmVtb3ZlQ2xhc3MoXCJoaWRlLXRvdGFsc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3BhZ2FyIG5vbWluYVxyXG4gICAgICAgICQoXCIjUGF5LVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIHBhZ2FyIGxhIG7Ds21pbmE/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjUGF5LVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvcGFnYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI1BheS1QYXlyb2xsXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSB5YSBlc3RhIHBhZ2FkYSBvIGNlcnJhZGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jYW5jZWxhciBub21pbmFcclxuICAgICAgICAkKFwiI0NhbmNlbC1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgY2FuY2VsYXIgbGEgbsOzbWluYT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNDYW5jZWwtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9jYW5jZWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjQ2FuY2VsLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5QYXlyb2xsUHJvY2Vzc0lkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2lyIGFsIHJlcG9ydGUgZGUgcGFnb3MgZGUgbsOzbWluYVxyXG4gICAgICAgICQoJy5wYXlyb2xsLXBheW1lbnQtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0KGAvcmVwb3J0ZXMvcGFnb3NkZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1yZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnRQYXlyb2woYC9yZXBvcnRlcy9yZXBvcnRlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0maGlkZWZpbHRlcj10cnVlYCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1zdW1tYXJ5LXJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydFBheXJvbChgL3JlcG9ydGVzL3Jlc3VtZW5wYWdvc2Rlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0maGlkZWZpbHRlcj10cnVlYCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcucGF5cm9sbC1wYXltZW50LXJlcG9ydC1lbXBsb3llZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydChgL3JlcG9ydGVzL3BhZ29zZGVub21pbmE/cGF5cm9sbHByb2Nlc3NpZD0keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfSZlbXBsb3llZUlkPSR7JChcIi5zZWxlY3RlZC1yb3dcIikuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcudHh0LXBheXJvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnQoYC9yZXBvcnRlcy90eHRwYXlyb2xsP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0mcGF5cm9sbGlkPSR7JChcIiNQYXlyb2xsSWRcIikudmFsKCkudG9TdHJpbmcoKX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm4uU2VsZWN0ZWRGaXJzdFJvdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBWYWxpZGF0aW9uUmVwb3J0OiBmdW5jdGlvbiAodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiNFwiKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoUVsIHByb2Nlc28gZGUgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBwYWdhZGEgbyBjZXJyYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVmFsaWRhdGlvblJlcG9ydFBheXJvbDogZnVuY3Rpb24gKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIyXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiNFwiKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoUVsIHByb2Nlc28gZGUgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBwYWdhZGEgbyBjYWxjdWxhZGEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL1JlZnJlc2NhciBsaXN0YSBwcmluY2lwYWxcclxuICAgIFJlZnJlc2hUYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICQoJy50Ym9keVRhYmxlUHJvY2Vzc1BheXJvbGwnKS5yZXBsYWNlV2l0aCgkKCcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL09wY2lvbmVzIGRlbCBmb3JtdWxhcmlvIHNpIGVzIG51ZXZvIG8gZWRpdGFyXHJcbiAgICBTZXR0aW5nTmV3QW5kRWRpdDogZnVuY3Rpb24gKHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmlld21vZGUgPT0gXCJuZXdcIikge1xyXG4gICAgICAgICAgICBvcHRpb24gPSAxO1xyXG4gICAgICAgICAgICBmbi5FbmFibGVkb3JEaXNhYmxlSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2hvd2lkXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb24gPSAyO1xyXG4gICAgICAgICAgICBmbi5FbmFibGVkb3JEaXNhYmxlSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2hvd2lkXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVkb3JEaXNhYmxlSW5wdXRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJyNQYXlyb2xsUHJvY2Vzc1N0YXR1cycpLnZhbCgpICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICQoXCIjUGF5cm9sbElkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjRGVzY3JpcHRpb25cIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIiNQYXltZW50RGF0ZVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI1BheUN5Y2xlSWRcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjUHJvaklkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUHJvakNhdGVnb3J5SWRcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIi5hcHAtaW5wdXQtZGF0ZS1uZXZlclwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtdG9kYXlcIikuaGlkZSgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNEZXNjcmlwdGlvblwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNQYXltZW50RGF0ZVwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJChcIiNQYXlDeWNsZUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgJChcIiNQcm9qSWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUHJvakNhdGVnb3J5SWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtbmV2ZXJcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLXRvZGF5XCIpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vZnVuY2lvbiBhYnJpciBudWV2byBmb3JtdWxhcmlvXHJcbiAgICBPcGVuQ2xvc2VOZXdBbmRFZGl0OiBmdW5jdGlvbiAoX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgU2VhcmNoTm92ZWx0aWVzOiBmdW5jdGlvbiAoX0lkZW1wbG95ZTogc3RyaW5nLCBUb3RhbEFtb3VudDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgcHJvY2Vzb25vbWluYS8keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfS8ke19JZGVtcGxveWV9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlTm92ZWRhZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVOb3ZlZGFkXCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZ3Jlc29Ub3RhbDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoXCIuY2FsY3VsYXItdG90YWxcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJCh0aGlzKS5maW5kKFwiLlBheXJvbGxBY3Rpb25UeXBldGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgkKHRoaXMpLmZpbmQoXCIuUGF5cm9sbEFjdGlvblR5cGV0YmxcIikuaHRtbCgpLnRyaW0oKSAhPSBcIkNvbnRyaWJ1Y2nDs25cIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGluZ3Jlc29Ub3RhbCArPSBwYXJzZUZsb2F0KCQodGhpcykuZmluZChcIi5BY3Rpb25BbW91bnR0YmxhY3Rpb25cIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50b3RhbC1hbW91bnRcIikudGV4dChgJHtGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoVG90YWxBbW91bnQpfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9saXN0YSBkZSBkZXRhbGxlIGRlIHByb2Nlc28gZGUgbm9taW5hXHJcbiAgICBTZWFyY2hMaXN0RGV0YWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgcHJvY2Vzb25vbWluYS8keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZUVtcGxveWVlUHJvY2Vzc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWUtbm92ZWx0aWVzXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hOb3ZlbHRpZXMoJCh0aGlzKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSwgJCh0aGlzKS5maW5kKFwiLlRvdGFsQW1vdW50dGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2ZuLlNlbGVjdGVkRmlyc3RSb3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0ZWRGaXJzdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBmaXJzdFJvdyA9ICQoXCIuc2VlLW5vdmVsdGllc1wiKS5maXJzdCgpO1xyXG4gICAgICAgIGlmIChmaXJzdFJvdy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAvKiAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTsqL1xyXG4gICAgICAgICAgICBmaXJzdFJvdy5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKGZpcnN0Um93LmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpLCBmaXJzdFJvdy5maW5kKFwiLlRvdGFsQW1vdW50dGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn1cclxuXHJcbmVzdWNoYWRvcmVzOiB7XHJcbiAgICAkKFwiLk5ld1BheXJvbGxQcm9jZXNzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLkVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzSWRUYmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoX2lkLCBcImVkaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9FbGltaW5hciBwcm9jZXNvIGRlIG7Ds21pbmFcclxuICAgICQoXCIjRGVsZXRlUGF5cm9sbFByb2Nlc3NcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzUGF5cm9sbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFByb2Nlc3NbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzU3RhdHVzdGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJsaXN0aWRfcGF5cm9sbHByb2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwibGlzdGlkX3BheXJvbGxwcm9jZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUGF5cm9sbFByb2Nlc3NJZFRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IFwiQ2FsY3VsYWRhXCIgfHwgc3RhdHVzID09IFwiUHJvY2VzYWRhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzUGF5cm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVBheXJvbGxQcm9jZXNzXCIpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1c1BheXJvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoVVuYSBkZSBsYXMgbsOzbWluYXMgc2VsZWNjaW9uYWRhcyBlc3RhIGVuIGVzdGFkbyBwcm9jZXNhZGEgbyBjYWxjdWxhZGEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIHByb2Nlc29zIGRlIG7Ds21pbmEgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9jZXNvbm9taW5hL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVQYXlyb2xsUHJvY2Vzc1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5SZWZyZXNoVGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3Byb2Nlc2FyIG5vbWluYVxyXG4gICAgJChcIiNQcm9jZXNzLVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIC8vaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgJiYgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VDb25maXJtOiBzdHJpbmcgPSBcIsK/RGVzZWEgcHJvY2VzYXIgbGEgbsOzbWluYT9cIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUNvbmZpcm0gPSBgwr9EZXNlYSBwcm9jZXNhciBsYSBuw7NtaW5hPyA8YnI+IEVzdGEgbsOzbWluYSB5YSBlc3TDoSBlbiBlc3RhZG8gJHskKCcjUGF5cm9sbFByb2Nlc3NTdGF0dXMgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpfSBzZSByZWFsaXphcmFuIGRlIG51ZXZvIGxvcyBjw6FsY3Vsb3MgY29ycmVzcG9uZGllbnRlcy5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKG1lc3NhZ2VDb25maXJtLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1Byb2Nlc3MtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9wcm9jZXNhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI1Byb2Nlc3MtUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChkYXRhKSAhPSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk7Ds21pbmEgcHJvY2VzYWRhIGNvcnJlY3RhbWVudGUgXCIsIFwic3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICQoXCIudGJvZHlUYWJsZUVtcGxveWVlUHJvY2Vzc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vZm4uU2VhcmNoTGlzdERldGFpbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIHlhIGVzdGEgcGFnYWRhIG8gY2VycmFkYVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2FsY3VsYXIgbm9taW5hXHJcbiAgICAkKFwiI0NhbGMtUGF5cm9sbFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBjYWxjdWxhciBsYSBuw7NtaW5hP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0NhbGMtUGF5cm9sbFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9jYWxjdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0NhbGMtUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSB5YSBlc3RhIHBhZ2FkYSBvIGNlcnJhZGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9maWx0cm9cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1QYXlyb2xscHJvY2Vzc1wiLCBcIi9wcm9jZXNvbm9taW5hL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIiwgXCIvcHJvY2Vzb25vbWluYS9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhZ2luYWNpw7NuXHJcbiAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRzY3JvbGwgPSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4c2Nyb2xsID0gJChcIi50YmxQYXlyb2xsc1Byb2Nlc3NcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcInByb2Nlc29ub21pbmFcIiwgXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgcGFyYSBlZGl0YXJcclxuICAgICQoZG9jdW1lbnQpLm9uKCdkYmxjbGljaycsICcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsIC5yb3ctYXBwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIHx8ICQoZS50YXJnZXQpLmlzKCdsYWJlbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSAkKHRoaXMpLmZpbmQoJy5QYXlyb2xsUHJvY2Vzc0lkVGJsJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICBpZiAoIXJvd0lkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KHJvd0lkLCBcImVkaXRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBcGxpY2FyIGVzdGlsbyBjbGlja2FibGUgYSBsYXMgZmlsYXNcclxuICAgICQoJy50Ym9keVRhYmxlUHJvY2Vzc1BheXJvbGwgLnJvdy1hcHAnKS5hZGRDbGFzcygncm93LWNsaWNrYWJsZScpO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19