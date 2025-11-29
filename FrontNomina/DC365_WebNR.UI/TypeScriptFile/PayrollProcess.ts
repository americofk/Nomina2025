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
    var option: number;
}

//Funciones
const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEdit: function (_id: string = "", viewmode: string = "new") {
        let url: string

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

                        fn.SearchNovelties($(this).find(".EmployeeIdtbl").html().trim(), $(this).find(".TotalAmounttbl").html().trim())
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
    ShowForm: function (data, viewmode: string) {

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
                        success: function (data: ResponseUIGeneric) {
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
                                } else {
                                    if (data.Obj == "") {
                                        fn.SearchFormNewAndEdit($("#PayrollProcessId").val().toString(), "edit");
                                    } else {
                                        fn.SearchFormNewAndEdit(<string>data.Obj, "edit");
                                    }
                                }
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                } else {
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
        $(".AuditInfoForm").off('click').on('click', function() {
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
                                success: function (data: ResponseUI) {
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
                                success: function (data: ResponseUI) {
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
                } else {
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

    ValidationReport: function (url: string) {
        if ($("#PayrollProcessStatus").val() == "3" || $("#PayrollProcessStatus").val() == "4") {

            window.open(url, '_blank');
        } else {
            windows_message("¡El proceso de nómina debe estar en estado pagada o cerrada!", "error");
        }
    },

    ValidationReportPayrol: function (url: string) {
        if ($("#PayrollProcessStatus").val() == "2" || $("#PayrollProcessStatus").val() == "3" || $("#PayrollProcessStatus").val() == "4") {

            window.open(url, '_blank');
        } else {
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
    SettingNewAndEdit: function (viewmode: string) {
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

        } else {
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

        } else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },

    //ver novedades de empleado
    SearchNovelties: function (_Idemploye: string, TotalAmount: string) {
        $.ajax({
            url: `procesonomina/${$("#PayrollProcessId").val().toString()}/${_Idemploye}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableNovedad").html('');
                    $(".tbodyTableNovedad").append(data);

                    let ingresoTotal: number = 0;
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
}

esuchadores: {
    $(".NewPayrollProcess").on("click", function () {
        fn.SearchFormNewAndEdit();
    });

    $(".EditPayrollProcess").on("click", function () {
        let _id: string;
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
            var contador: boolean = false;
            var statusPayroll: boolean = false;

            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayrollProcess[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    let status = $(this).parent().parent().find(".PayrollProcessStatustbl").html().trim();
                    input.attr("name", "listid_payrollprocess");
                    input.attr("class", "listid_payrollprocess");
                    input.val($(this).parent().parent().find(".PayrollProcessIdTbl").html().trim());
                    if (status == "Calculada" || status == "Procesada") {
                        statusPayroll = true;
                    };
                    $("#DeletePayrollProcess").append(input);
                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                if (statusPayroll) {
                    windows_message("¡Una de las nóminas seleccionadas esta en estado procesada o calculada!", "error");
                } else {
                    windows_message("¿Desea eliminar los procesos de nómina seleccionados?", "confirm", {
                        onOk: function () {
                            $('.progreso').modal({ backdrop: 'static', keyboard: false });
                            $.ajax({
                                url: "/procesonomina/eliminar",
                                type: "POST",
                                data: $("#DeletePayrollProcess").serialize(),
                                async: true,
                                success: function (data: ResponseUI) {
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
                let messageConfirm: string = "¿Desea procesar la nómina?";
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
                                } else {
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
                            success: function (data: ResponseUI) {
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
        if (!rowId) { return; }
        fn.SearchFormNewAndEdit(rowId, "edit");
    });

    // Aplicar estilo clickable a las filas
    $('.tbodyTableProcessPayroll .row-app').addClass('row-clickable');

    // Inicializar modal de auditoría
    initAuditListPage('.selectPayrollProcess', '.PayrollProcessIdTbl', '/procesonomina/getbyid', 'Id');
}

export { }