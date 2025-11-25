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
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9QYXlyb2xsUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxNQUFjLENBQUM7QUFDdkIsQ0FBQztBQUVELFdBQVc7QUFDWCxNQUFNLEVBQUUsR0FBRztJQUNQLDhCQUE4QjtJQUM5QixvQkFBb0IsRUFBRSxVQUFVLE1BQWMsRUFBRSxFQUFFLFdBQW1CLEtBQUs7UUFDdEUsSUFBSSxHQUFXLENBQUE7UUFFZixJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLGlDQUFpQyxDQUFDOztZQUV4QyxHQUFHLEdBQUcsb0RBQW9ELEdBQUcsRUFBRSxDQUFDO1FBRXBFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRztZQUVSLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1QixFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRS9CLDJCQUEyQjtvQkFDM0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTt3QkFDNUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUVqQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJ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ICAgIHZhciBvcHRpb246IG51bWJlcjtcclxufVxyXG5cclxuLy9GdW5jaW9uZXNcclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL0Zvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgIFNlYXJjaEZvcm1OZXdBbmRFZGl0OiBmdW5jdGlvbiAoX2lkOiBzdHJpbmcgPSBcIlwiLCB2aWV3bW9kZTogc3RyaW5nID0gXCJuZXdcIikge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZ1xyXG5cclxuICAgICAgICBpZiAoX2lkID09IFwiXCIpXHJcbiAgICAgICAgICAgIHVybCA9IGAvcHJvY2Vzb25vbWluYS9PYnRlbmVyRm9ybU51ZXZvYDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHVybCA9IGAvcHJvY2Vzb25vbWluYS9PYnRlbmVyRm9ybU51ZXZvP3BheXJvbGxwcm9jZXNzaWQ9JHtfaWR9YDtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcblxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhLCB2aWV3bW9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uT3BlbkNsb3NlTmV3QW5kRWRpdChcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmVyIG5vdmVkYWRlcyBkZSBlbXBsZWFkb1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWUtbm92ZWx0aWVzXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWQtcm93XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCksICQodGhpcykuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZuLlRvdGFsTm92ZWx0aWVzKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICogTcOpdG9kbyBwYXJhIG1vc3RyYXIgZWwgZm9ybXVsYXJpbywgXHJcbiAgICAqIGNvbnRpZW5lIGVsIGV2ZW50IHBhcmEgY2VycmFyIGVsIGZvcm11bGFyaW8geSBndWFyZGFyIGxhIGRhdGFcclxuICAgICovXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEsIHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICQoXCIjQ29udE5ld0FuZEVkaXRQYXlyb2xsUHJvY2Vzc1wiKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgICAgICQoXCIuT3BDbG9zZWZvcm1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnROZXdBbmRFZGl0UGF5cm9sbFByb2Nlc3NcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgZm4uT3BlbkNsb3NlTmV3QW5kRWRpdChcImNsb3NlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiAgICAgICAgJChcIiNGb3JtTmV3QW5kRWRpdFBheXJvbGxzUHJvY2Vzc1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSUdlbmVyaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuT2JqID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCg8c3RyaW5nPmRhdGEuT2JqLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JlZnJlc2NhbW9zIGxhIHRhYmxhIGNvbiBsYSBpbmZvcm1hY2nDs24gZ3VhcmRhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5SZWZyZXNoVGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSBkZWJlIGVzdGFyIGVuIGVzdGFkbyBjcmVhZGFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTW9zdHJhciBjb250ZW5lZG9yXHJcbiAgICAgICAgJChcIiNDb250TmV3QW5kRWRpdFBheXJvbGxQcm9jZXNzXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcblxyXG4gICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KHZpZXdtb2RlKTtcclxuXHJcbiAgICAgICAgLy9Ub2dnbGVcclxuICAgICAgICAkKFwiI3RvZ2dsZS10b3RhbHNcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5yZW1vdmVDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLmFkZENsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdG90YWxzLWNvbnRhaW5lclwiKS5hZGRDbGFzcyhcInNob3ctdG90YWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0b3RhbHMtY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiaGlkZS10b3RhbHNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9wYWdhciBub21pbmFcclxuICAgICAgICAkKFwiI1BheS1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjNcIiB8fCAkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiNFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBwYWdhciBsYSBuw7NtaW5hP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1BheS1QYXlyb2xsXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcm9jZXNvbm9taW5hL3BhZ2FyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNQYXktUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vY2FuY2VsYXIgbm9taW5hXHJcbiAgICAgICAgJChcIiNDYW5jZWwtUGF5cm9sbFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGNhbmNlbGFyIGxhIG7Ds21pbmE/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIlBheXJvbGxQcm9jZXNzSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQYXlyb2xsUHJvY2Vzc0lkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQ2FuY2VsLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvY2FuY2VsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0NhbmNlbC1QYXlyb2xsXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbFByb2Nlc3NJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpLCBcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJMYSBuw7NtaW5hIHlhIGVzdGEgcGFnYWRhIG8gY2VycmFkYVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9pciBhbCByZXBvcnRlIGRlIHBhZ29zIGRlIG7Ds21pbmFcclxuICAgICAgICAkKCcucGF5cm9sbC1wYXltZW50LXJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgZm4uVmFsaWRhdGlvblJlcG9ydChgL3JlcG9ydGVzL3BhZ29zZGVub21pbmE/cGF5cm9sbHByb2Nlc3NpZD0keyQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpfSZoaWRlZmlsdGVyPXRydWVgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0UGF5cm9sKGAvcmVwb3J0ZXMvcmVwb3J0ZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtc3VtbWFyeS1yZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnRQYXlyb2woYC9yZXBvcnRlcy9yZXN1bWVucGFnb3NkZW5vbWluYT9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JmhpZGVmaWx0ZXI9dHJ1ZWApO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnBheXJvbGwtcGF5bWVudC1yZXBvcnQtZW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLlZhbGlkYXRpb25SZXBvcnQoYC9yZXBvcnRlcy9wYWdvc2Rlbm9taW5hP3BheXJvbGxwcm9jZXNzaWQ9JHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0mZW1wbG95ZWVJZD0keyQoXCIuc2VsZWN0ZWQtcm93XCIpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpfSZoaWRlZmlsdGVyPXRydWVgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnR4dC1wYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5WYWxpZGF0aW9uUmVwb3J0KGAvcmVwb3J0ZXMvdHh0cGF5cm9sbD9wYXlyb2xscHJvY2Vzc2lkPSR7JChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCl9JnBheXJvbGxpZD0keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpLnRvU3RyaW5nKCl9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZuLlNlbGVjdGVkRmlyc3RSb3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgVmFsaWRhdGlvblJlcG9ydDogZnVuY3Rpb24gKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjRcIikge1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFFbCBwcm9jZXNvIGRlIG7Ds21pbmEgZGViZSBlc3RhciBlbiBlc3RhZG8gcGFnYWRhIG8gY2VycmFkYSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFZhbGlkYXRpb25SZXBvcnRQYXlyb2w6IGZ1bmN0aW9uICh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpID09IFwiMlwiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgPT0gXCIzXCIgfHwgJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSA9PSBcIjRcIikge1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFFbCBwcm9jZXNvIGRlIG7Ds21pbmEgZGViZSBlc3RhciBlbiBlc3RhZG8gcGFnYWRhIG8gY2FsY3VsYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZWZyZXNjYXIgbGlzdGEgcHJpbmNpcGFsXHJcbiAgICBSZWZyZXNoVGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAkKCcudGJvZHlUYWJsZVByb2Nlc3NQYXlyb2xsJykucmVwbGFjZVdpdGgoJCgnLnRib2R5VGFibGVQcm9jZXNzUGF5cm9sbCcsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9PcGNpb25lcyBkZWwgZm9ybXVsYXJpbyBzaSBlcyBudWV2byBvIGVkaXRhclxyXG4gICAgU2V0dGluZ05ld0FuZEVkaXQ6IGZ1bmN0aW9uICh2aWV3bW9kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZpZXdtb2RlID09IFwibmV3XCIpIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAgICAgZm4uRW5hYmxlZG9yRGlzYWJsZUlucHV0cygpO1xyXG4gICAgICAgICAgICAkKFwiLnNob3dpZFwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgZm4uRW5hYmxlZG9yRGlzYWJsZUlucHV0cygpO1xyXG4gICAgICAgICAgICAkKFwiLnNob3dpZFwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlZG9yRGlzYWJsZUlucHV0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcjUGF5cm9sbFByb2Nlc3NTdGF0dXMnKS52YWwoKSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI0Rlc2NyaXB0aW9uXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5bWVudERhdGVcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJChcIiNQYXlDeWNsZUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI1Byb2pJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKFwiI1Byb2pDYXRlZ29yeUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIuYXBwLWlucHV0LWRhdGUtbmV2ZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLXRvZGF5XCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcIiNQYXlyb2xsSWRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjRGVzY3JpcHRpb25cIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5bWVudERhdGVcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5Q3ljbGVJZFwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjUHJvaklkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKFwiI1Byb2pDYXRlZ29yeUlkXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKFwiLmFwcC1pbnB1dC1kYXRlLW5ldmVyXCIpLnNob3coKTtcclxuICAgICAgICAgICAgJChcIi5hcHAtaW5wdXQtZGF0ZS10b2RheVwiKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldm8gZm9ybXVsYXJpb1xyXG4gICAgT3BlbkNsb3NlTmV3QW5kRWRpdDogZnVuY3Rpb24gKF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgIFNlYXJjaE5vdmVsdGllczogZnVuY3Rpb24gKF9JZGVtcGxveWU6IHN0cmluZywgVG90YWxBbW91bnQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYHByb2Nlc29ub21pbmEvJHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX0vJHtfSWRlbXBsb3llfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZU5vdmVkYWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlTm92ZWRhZFwiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmdyZXNvVG90YWw6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKFwiLmNhbGN1bGFyLXRvdGFsXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCQodGhpcykuZmluZChcIi5QYXlyb2xsQWN0aW9uVHlwZXRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoJCh0aGlzKS5maW5kKFwiLlBheXJvbGxBY3Rpb25UeXBldGJsXCIpLmh0bWwoKS50cmltKCkgIT0gXCJDb250cmlidWNpw7NuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpbmdyZXNvVG90YWwgKz0gcGFyc2VGbG9hdCgkKHRoaXMpLmZpbmQoXCIuQWN0aW9uQW1vdW50dGJsYWN0aW9uXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudG90YWwtYW1vdW50XCIpLnRleHQoYCR7Rm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKFRvdGFsQW1vdW50KX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vbGlzdGEgZGUgZGV0YWxsZSBkZSBwcm9jZXNvIGRlIG5vbWluYVxyXG4gICAgU2VhcmNoTGlzdERldGFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYHByb2Nlc29ub21pbmEvJHskKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlRW1wbG95ZWVQcm9jZXNzXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VlLW5vdmVsdGllc1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoTm92ZWx0aWVzKCQodGhpcykuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCksICQodGhpcykuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mbi5TZWxlY3RlZEZpcnN0Um93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdGVkRmlyc3RSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZmlyc3RSb3cgPSAkKFwiLnNlZS1ub3ZlbHRpZXNcIikuZmlyc3QoKTtcclxuICAgICAgICBpZiAoZmlyc3RSb3cubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgLyogICAgICAgICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7Ki9cclxuICAgICAgICAgICAgZmlyc3RSb3cuYWRkQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgIGZuLlNlYXJjaE5vdmVsdGllcyhmaXJzdFJvdy5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSwgZmlyc3RSb3cuZmluZChcIi5Ub3RhbEFtb3VudHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59XHJcblxyXG5lc3VjaGFkb3Jlczoge1xyXG4gICAgJChcIi5OZXdQYXlyb2xsUHJvY2Vzc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5FZGl0UGF5cm9sbFByb2Nlc3NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsUHJvY2Vzc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlyb2xsUHJvY2Vzc0lkVGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiaW5mb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZuLlNlYXJjaEZvcm1OZXdBbmRFZGl0KF9pZCwgXCJlZGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vRWxpbWluYXIgcHJvY2VzbyBkZSBuw7NtaW5hXHJcbiAgICAkKFwiI0RlbGV0ZVBheXJvbGxQcm9jZXNzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1c1BheXJvbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxQcm9jZXNzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlyb2xsUHJvY2Vzc1N0YXR1c3RibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwibGlzdGlkX3BheXJvbGxwcm9jZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImxpc3RpZF9wYXlyb2xscHJvY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxQcm9jZXNzSWRUYmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBcIkNhbGN1bGFkYVwiIHx8IHN0YXR1cyA9PSBcIlByb2Nlc2FkYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1BheXJvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNEZWxldGVQYXlyb2xsUHJvY2Vzc1wiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXNQYXlyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFVbmEgZGUgbGFzIG7Ds21pbmFzIHNlbGVjY2lvbmFkYXMgZXN0YSBlbiBlc3RhZG8gcHJvY2VzYWRhIG8gY2FsY3VsYWRhIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBwcm9jZXNvcyBkZSBuw7NtaW5hIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHJvY2Vzb25vbWluYS9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGVsZXRlUGF5cm9sbFByb2Nlc3NcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5saXN0aWRfcGF5cm9sbHByb2Nlc3NcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uUmVmcmVzaFRhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsUHJvY2Vzc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5saXN0aWRfcGF5cm9sbHByb2Nlc3NcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wcm9jZXNhciBub21pbmFcclxuICAgICQoXCIjUHJvY2Vzcy1QYXlyb2xsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL2lmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiICYmICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlQ29uZmlybTogc3RyaW5nID0gXCLCv0Rlc2VhIHByb2Nlc2FyIGxhIG7Ds21pbmE/XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNQYXlyb2xsUHJvY2Vzc1N0YXR1c1wiKS52YWwoKSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VDb25maXJtID0gYMK/RGVzZWEgcHJvY2VzYXIgbGEgbsOzbWluYT8gPGJyPiBFc3RhIG7Ds21pbmEgeWEgZXN0w6EgZW4gZXN0YWRvICR7JCgnI1BheXJvbGxQcm9jZXNzU3RhdHVzIG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKX0gc2UgcmVhbGl6YXJhbiBkZSBudWV2byBsb3MgY8OhbGN1bG9zIGNvcnJlc3BvbmRpZW50ZXMuYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShtZXNzYWdlQ29uZmlybSwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQcm9jZXNzLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvcHJvY2VzYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNQcm9jZXNzLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSkgIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hGb3JtTmV3QW5kRWRpdCgkKFwiI1BheXJvbGxQcm9jZXNzSWRcIikudmFsKCkudG9TdHJpbmcoKSwgXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJOw7NtaW5hIHByb2Nlc2FkYSBjb3JyZWN0YW1lbnRlIFwiLCBcInN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnRib2R5VGFibGVFbXBsb3llZVByb2Nlc3NcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gJChcIi50Ym9keVRhYmxlRW1wbG95ZWVQcm9jZXNzXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAvL3ZlciBub3ZlZGFkZXMgZGUgZW1wbGVhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyAkKFwiLnNlZS1ub3ZlbHRpZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vICAgICAkKFwiLnNlZS1ub3ZlbHRpZXNcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgICQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLy8gICAgIGZuLlNlYXJjaE5vdmVsdGllcygkKHRoaXMpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvL2ZuLlNlYXJjaExpc3REZXRhaWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgd2luZG93c19tZXNzYWdlKFwiTGEgbsOzbWluYSB5YSBlc3RhIHBhZ2FkYSBvIGNlcnJhZGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NhbGN1bGFyIG5vbWluYVxyXG4gICAgJChcIiNDYWxjLVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvL2lmICgkKFwiI1BheXJvbGxQcm9jZXNzU3RhdHVzXCIpLnZhbCgpICE9IFwiM1wiIHx8ICQoXCIjUGF5cm9sbFByb2Nlc3NTdGF0dXNcIikudmFsKCkgIT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgY2FsY3VsYXIgbGEgbsOzbWluYT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUGF5cm9sbFByb2Nlc3NJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjUGF5cm9sbFByb2Nlc3NJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNDYWxjLVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3Byb2Nlc29ub21pbmEvY2FsY3VsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNDYWxjLVBheXJvbGxcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxQcm9jZXNzSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRm9ybU5ld0FuZEVkaXQoJChcIiNQYXlyb2xsUHJvY2Vzc0lkXCIpLnZhbCgpLnRvU3RyaW5nKCksIFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIHdpbmRvd3NfbWVzc2FnZShcIkxhIG7Ds21pbmEgeWEgZXN0YSBwYWdhZGEgbyBjZXJyYWRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vZmlsdHJvXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUGF5cm9sbHByb2Nlc3NcIiwgXCIvcHJvY2Vzb25vbWluYS9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLVBheXJvbGxwcm9jZXNzXCIsIFwiL3Byb2Nlc29ub21pbmEvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wYWdpbmFjacOzblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsUGF5cm9sbHNQcm9jZXNzXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJwcm9jZXNvbm9taW5hXCIsIFwiLnRib2R5LVRhYmxlLVBheXJvbGxwcm9jZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19