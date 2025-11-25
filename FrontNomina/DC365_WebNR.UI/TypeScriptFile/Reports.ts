
//Arreglo de funciones
const fn = {
    SearchListPayrollProcess: function (_payrollId: string) {
        $.ajax({
            url: `/reportes/${_payrollId}`,
            type: "Get",
            async: false,
            success: function (data) {
                $(".payrollprocessid").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".payrollprocessid").append(option);
                    $(data).each(function () {

                        var option = $(document.createElement('option'));
                        option.text(this.PayCycleFormat);
                        option.val(this.PayrollProcessId);
                        $(".payrollprocessid").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });

    },
    SearchListEmployee: function (_payrollProcessid: string) {
        $.ajax({
            url: `/reportes/payrollprocessid/${_payrollProcessid}`,
            type: "Get",
            async: false,
            success: function (data) {
                $(".employee-id-select").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".employee-id-select").append(option);
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.EmployeeName);
                        option.val(this.EmployeeId);
                        $(".employee-id-select").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });

    },
    SearchListEmployeeforDepartment: function (_departmentId: string, _payrollProcessid: string) {
        $.ajax({
            url: `/reportes/payrollprocessid/${_payrollProcessid}/${_departmentId}`,
            type: "Get",
            async: false,
            success: function (data) {
                $(".employee-id-select").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".employee-id-select").append(option);
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.EmployeeName);
                        option.val(this.EmployeeId);
                        $(".employee-id-select").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });

    }

}

escuchadores: {
    $('#Payrolls').on('change', function () {
        if ($(this).val() != "") {
            fn.SearchListPayrollProcess($(this).val().toString());
        }
    });

    $('#Department').on('change', function () {
        if ($(this).val() != "") {
            fn.SearchListEmployeeforDepartment($(this).val().toString(), $(".payrollprocessid").val().toString());
        }
    });

    $('.payrollprocessid').on('change', function () {
        if ($(this).val() != "") {
            $("#Department").val("");
            fn.SearchListEmployee($(this).val().toString());
        }
    });

    $("#update-report").on("click", function () {
        var datatype = $(this).attr("data-type");
        $('.progreso').removeClass("collapse");
        if (datatype == "payroll-payments") {
            var employeeId: string = $('.employee-id-select').val() == null ? "" : $('.employee-id-select').val().toString();
            $.get(`/reportes/pagosdenomina?payrollprocessid=${$(".payrollprocessid").val().toString()}&deparmentId=${$('#Department').val().toString()}&employeeId=${employeeId}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");

                    $("#SendEmailReport").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();

                            var datatype = $("#update-report").attr("data-type");

                            if (datatype == "payroll-payments") {
                                var employeeId: string = $('.employee-id-select').val() == null ? "" : $('.employee-id-select').val().toString();
                          /*      $('.progreso').modal({ backdrop: 'static', keyboard: false })*/
                                $.ajax({
                                    url: `/reportes/email/pagosdenomina?payrollprocessid=${$(".payrollprocessid").val().toString()}&deparmentId=${$('#Department').val().toString()}&employeeId=${employeeId}`,
                                    type: "POST",
                                    data: $("#SendEmailReport").serialize(),
                                    async: true,
                                    success: function (data: ResponseUI) {
                                        if (data.Type == "error") {
                                           /* $('.progreso').modal('hide');*/
                                            FormatErrors(data);
                                        } else {
                                            /*$('.progreso').modal('hide');*/
                                        }
                                    }, error: function (xhr) {
                                        redireccionaralLogin(xhr);
                                    }
                                });
                            }
                        }
                    });
                });

        }
        if (datatype == "report-all-employee") {
            $.get(`/reportes/reporteempleados?deparmentId=${$('#Department').val().toString()}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                });

        }
        if (datatype == "payroll-payments-summary") {
            $.get(`/reportes/resumenpagosdenomina?payrollprocessid=${$(".payrollprocessid").val().toString()}&deparmentId=${$('#Department').val().toString()}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                });

        }

        if (datatype == "payroll-report") {
            $.get(`/reportes/reportenomina?payrollprocessid=${$(".payrollprocessid").val().toString()}&deparmentId=${$('#Department').val().toString()}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }

        if (datatype == "tss-report") {
            let period = $(".period").val().toString();
            console.log($(".type-tss").val().toString());
            $.get(`/reportes/tss?payrollid=${$("#Payrolls").val().toString()}&year=${period.substr(0, 4)}&month=${period.substr(5, 2)}&typetss=${$(".type-tss").val().toString()}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }

        if (datatype == "dgt4-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt4?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }


        if (datatype == "dgt2-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt2?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }
        if (datatype == "dgt3-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt3?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }

        if (datatype == "dgt5-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt5?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }

        if (datatype == "dgt9-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt9?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }


        if (datatype == "dgt12-report") {
            let period = $(".period").val().toString();
            $.get(`/reportes/dgt12?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}`)
                .done(function (r) {
                    var newDom = $(r);
                    $('.cont-general-report').replaceWith($('.cont-general-report', newDom));
                    $('.progreso').addClass("collapse");
                }
                );
        }




    });

    $(".generar-txt").on("click", function () {
        let period = $(".period").val().toString();
        let payrollid = $("#Payrolls").val();

        if ($('.period').val() != "") {
            if (payrollid == undefined)
                window.open(`/reportes/Txt?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}&typeDTG=${$('.Type-dgt').val().toString()}`, '_blank')
            else
                window.open(`/reportes/Txt?year=${period.substr(0, 4)}&month=${period.substr(5, 2)}&typeDTG=${$('.Type-dgt').val().toString()}&payrollid=${payrollid.toString()}&typetss=${$(".type-tss").val().toString()}`, '_blank')

        } else {
            windows_message("¡Debe seleccionar un período!", "error");
        }
    });

    //exportar a excel
    $('.exportarExcel').on('click', function () {
        window.open(`/reportes/ExportarPayroll?payrollprocessid=${$(".payrollprocessid").val().toString()}&deparmentId=${$('#Department').val().toString()}`, '_blank');
    });

}

export { }