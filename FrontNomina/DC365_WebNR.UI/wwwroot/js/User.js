variables: {
    var defaultimage = "/Images/Dashboard/default_perfil.png";
    var option;
}
//Arreglo de funciones
const fn = {
    //Configurar elementos del dom al editar o crear nuevo
    EditAndNewSettings: function (option) {
        if (option == "edit") {
            $('.setiartitulo').text("Editar usuario");
            $("#Alias").attr("readonly", "readonly");
            $("#Email").attr("readonly", "readonly");
            /*            $("#Email").prop('disabled', true);*/
            $('.Contempresa').removeClass('collapse');
            $('.contImputDatosPersonalesFoto').removeClass('collapse');
            fn.funtionNewAndEditUsers("open");
        }
        else {
            $('.setiartitulo').text("Nuevo usuario");
            $("#Alias").removeAttr("readonly");
            $("#Email").removeAttr("readonly");
            $('.contImputDatosPersonalesFoto').addClass('collapse');
            $('.Contempresa').addClass('collapse');
            fn.funtionNewAndEditUsers("open");
        }
    },
    //funcion abrir nuevo usuario
    funtionNewAndEditUsers: function (_opcion) {
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
    //Limpia el formulario de guardar y editar
    ClearImput: function () {
        let form;
        form = document.getElementById("CreateAndEditUser");
        form.reset();
    },
    ////funtion crear y editar usuarios
    //CreateAndEditUsers: function () {
    //},
    //FuntionModelUsers: function () {
    //    let ElevationType: string = "2";
    //    let _CompanyDefaultId: string;
    //    if ($('.CompanyDefaultId').val() == null)
    //        _CompanyDefaultId = "";
    //    else
    //        _CompanyDefaultId = $('.CompanyDefaultId').val().toString();
    //    if ($(".ElevationType").is(":checked")) {
    //        ElevationType = "0";
    //    }
    //    var ModelUser: IUsers =
    //    {
    //        Name: $('.Name').val().toString(),
    //        Alias: $('.Alias').val().toString(),
    //        Email: $('.Email').val().toString(),
    //        FormatCodeId: $('.FormatCodeId').val().toString(),
    //        ElevationType: ElevationType,
    //        CompanyDefaultId: _CompanyDefaultId
    //    };
    //    return ModelUser;
    //},
    SearchRoltoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarRolUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableRol").html('');
                    $("#AllTableRol").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchCompanytoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarEmpresasUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableCompany").html('');
                    $("#AllTableCompany").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchCompaniesDropDownList: function (_id) {
        $.ajax({
            url: "/usuarios/BuscarListaEmpresa",
            type: "GET",
            data: {
                Alias: _id
            },
            async: false,
            success: function (data) {
                $(".CompanyDefaultId").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".CompanyDefaultId").append(option);
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.CompanyName);
                        option.val(this.companyId);
                        $(".CompanyDefaultId").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchImageUser: function (_alias) {
        $.ajax({
            url: "/usuarios/descargarimagen",
            type: "GET",
            data: {
                Alias: _alias
            },
            async: true,
            success: function (data) {
                if (data.Message != "") {
                    $("#FotoperfilDP").attr("src", data.Message);
                }
                else {
                    $("#FotoperfilDP").attr("src", defaultimage);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
};
escuchadores: {
    //Crear nuevo usuario
    $('.NewUser').on('click', function () {
        option = 1;
        $("#FotoperfilDP").attr("src", defaultimage);
        fn.ClearImput();
        fn.EditAndNewSettings("new");
    });
    //Editar usuario
    $(".EditUsers").on("click", function () {
        let id;
        let contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                if (contador == 2) {
                    windows_message("¡Debe seleccionar un solo registro!", "error");
                    return false;
                }
                id = $(this).parent().parent().find(".Aliastbl").html().trim();
            }
        });
        if (contador != 2) {
            if (contador == 0) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                $.ajax({
                    url: `/usuarios/${id}`,
                    type: "GET",
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data != null) {
                            option = 2;
                            fn.SearchCompaniesDropDownList(data.Alias);
                            fn.SearchImageUser(data.Alias);
                            fn.EditAndNewSettings("edit");
                            AutomaticBinding(data, "#CreateAndEditUser");
                            if (!data.ElevationTypeBool) {
                                //$('#ElevationType').prop("checked", true);
                                $('.contendorRolandCompaies').removeClass('collapse');
                                fn.SearchRoltoUsers();
                                fn.SearchCompanytoUsers();
                            }
                            else {
                                //$('#ElevationType').prop("checked", false);
                                $('.contendorRolandCompaies').addClass('collapse');
                            }
                        }
                        else {
                            windows_message("No se encontró el usuario", "error");
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    $('.OpCloseform').on('click', function () {
        fn.funtionNewAndEditUsers("close");
    });
    $('#CreateAndEditUser').submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/usuarios/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        FormatErrors(data);
                    }
                    else {
                        option = 2;
                        fn.EditAndNewSettings("edit");
                        if (!$('.ElevationType').is(":checked")) {
                            $('.contendorRolandCompaies').removeClass('collapse');
                            fn.SearchRoltoUsers();
                            fn.SearchCompanytoUsers();
                        }
                        else {
                            $('.contendorRolandCompaies').addClass('collapse');
                        }
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tblUser').replaceWith($('.tblUser', newDom));
                        });
                        windows_message(data.Message, data.Type);
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    // mostrar modal de todas las empresas
    $('.ShowModCompanies').on('click', function () {
        $.ajax({
            url: "/usuarios/modalempresas",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModCompanies").html('');
                    $(".ModCompanies").append(data);
                    //*****************Form****************************
                    //guardar empresas de usuario
                    $('#SaveUserCompanyForm').submit(function (e) {
                        e.preventDefault();
                        let contador = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectOptionCompanies[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {
                                let input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].companyId`);
                                input.attr("class", "automatic_input_emp");
                                input.val($(this).parent().parent().find(".companyIdtbl").html().trim());
                                $("#SaveUserCompanyForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].Alias`);
                                input.attr("class", "automatic_input_emp");
                                input.val($("#Alias").val().toString());
                                $("#SaveUserCompanyForm").append(input);
                                contador++;
                            }
                        });
                        if (!contador) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarEmpresas",
                                type: "POST",
                                data: $("#SaveUserCompanyForm").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input_emp").remove();
                                    }
                                    else {
                                        fn.SearchCompanytoUsers();
                                        fn.SearchCompaniesDropDownList($("#Alias").val().toString());
                                        $('.ModCompanies').modal("hide");
                                        $('.selectOptionCompanies').prop('checked', false);
                                        windows_message(data.Message, data.Type);
                                        $(".automatic_input_emp").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });
                    $(".BuscartblCompanies").keyup(function () {
                        var _this = this;
                        // Show only matching TR, hide rest of them
                        $.each($(".tblCompanie tbody tr"), function () {
                            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                $(this).hide();
                            else
                                $(this).show();
                        });
                    });
                    //select all companies
                    $("#check-table-AsigCust").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', true);
                        }
                        else {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', false);
                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
        $('.ModCompanies').modal('show');
    });
    // mostrar modal de todos las opciones del menu
    $('.showRoles').on('click', function () {
        $.ajax({
            url: "/usuarios/modalroles",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModAsigRoles").html('');
                    $(".ModAsigRoles").append(data);
                    //Opción para alternar entre los roles de ver, editar y eliminar, según se marquen
                    //**********************************************
                    $('.clickCheckver').on('click', function () {
                        let estado = $(this).find(".idCheckver").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado);
                        }
                    });
                    $('.clickCheckeditar').on('click', function () {
                        let estado = $(this).find(".idCheckeditar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado);
                        }
                    });
                    $('.clickCheckeliminar').on('click', function () {
                        let estado = $(this).find(".idCheckeliminar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado);
                        }
                    });
                    //*************************************************
                    //*****************Form****************************
                    //guardar roles de usuario
                    $('#SaveUserRolForm').submit(function (e) {
                        e.preventDefault();
                        let contador = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectAsigRol[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {
                                let input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].MenuId`);
                                input.attr("class", "automatic_input");
                                input.val($(this).parent().parent().find(".MenuIdtblrol").html().trim());
                                $("#SaveUserRolForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].Alias`);
                                input.attr("class", "automatic_input");
                                input.val($('#Alias').val().toString());
                                $("#SaveUserRolForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeView`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckver").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckver").is(":checked")).toString());
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeEdit`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckeditar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeditar").is(":checked")).toString());
                                input = $(document.createElement('input'));
                                input.attr("type", "checkbox");
                                input.attr("name", `roles[${contador}].PrivilegeDelete`);
                                input.attr("class", "automatic_input");
                                $("#SaveUserRolForm").append(input);
                                //input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeliminar").is(":checked")).toString());
                                contador++;
                            }
                        });
                        if (contador == 0) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarRol",
                                type: "POST",
                                data: $(this).serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input").remove();
                                    }
                                    else {
                                        windows_message(data.Message, data.Type);
                                        fn.SearchRoltoUsers();
                                        $('.ModAsigRoles').modal("hide");
                                        /*$(".tbodyTableMenu").load(location.href + " .tbodyTableMenu>*", "");*/
                                        $(".automatic_input").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });
                    $(".Buscartblroles").keyup(function () {
                        var _this = this;
                        // Show only matching TR, hide rest of them
                        $.each($(".tblroles-para-asignar tbody tr"), function () {
                            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                $(this).hide();
                            else
                                $(this).show();
                        });
                    });
                    //select all rols
                    $(".selectOptionCompaniesAll").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectAsigRol[type=checkbox]").prop('checked', true);
                        }
                        else {
                            $(".selectAsigRol[type=checkbox]").prop('checked', false);
                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
        $('.ModAsigRoles').modal('show');
    });
    $("#Name").change(function (e) {
        $(this).val(Firtscapitalletter($(this).val().toString()));
    });
    $("#Email").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });
    $("#Alias").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });
    //*****************Form Delete****************************
    //Eliminar roles asignados a un usuario
    $('#DeleteUserRolForm').submit(function (e) {
        e.preventDefault();
        var contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selecRolAsignados[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `roles`);
                input.attr("class", "automatic_input_del");
                input.val($(this).parent().parent().find(".MenuIdAssignedtbl").html().trim());
                $("#DeleteUserRolForm").append(input);
                contador = true;
            }
        });
        if (!contador) {
            windows_message("¡Debe seleccionar al menos un registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar roles asignadas?", "confirm", {
                onOk: function () {
                    $(".AliasForRole").val($('#Alias').val().toString());
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/usuarios/eliminarRolesAsignadas",
                        type: "POST",
                        data: $("#DeleteUserRolForm").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchRoltoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del").remove();
                },
                onCancel: function () {
                    $(".selecRolAsignados[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del").remove();
                }
            });
        }
    });
    //*****************Form Delete****************************
    //Eliminar empresas asignada a un  usuario
    $('#DeleteUserCompanyForm').submit(function (e) {
        e.preventDefault();
        let contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectCompaniesAssigned[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `companies`);
                input.attr("class", "automatic_input_del_emp");
                input.val($(this).parent().parent().find(".companyIdAsigtbl").html().trim());
                $("#DeleteUserCompanyForm").append(input);
                contador = true;
            }
        });
        if (!contador) {
            windows_message("¡Debe seleccionar un Registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar empresas asignadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $(".AliasForCompany").val($('#Alias').val().toString());
                    $.ajax({
                        url: "/usuarios/eliminarEmpresasAsignadas",
                        type: "POST",
                        data: $("#DeleteUserCompanyForm").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchCompanytoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del_emp").remove();
                },
                onCancel: function () {
                    $(".selectCompaniesAssigned[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del_emp").remove();
                }
            });
        }
    });
    //cargar imagen de usuario
    $(".Image").change(function (e) {
        let _dato = this;
        if ($('#Alias').val() == null) {
            windows_message("El usuario debe tener un alias", "error");
        }
        else {
            if (_dato.files != null) {
                let originalform;
                originalform = document.querySelector("#save-userimages-form");
                let dataform = new FormData(originalform);
                dataform.append("Alias", $('#Alias').val().toString());
                $.ajax({
                    url: "/usuarios/cargarimagen",
                    type: "POST",
                    data: dataform,
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                        if (data.Type == "error") {
                            FormatErrors(data);
                            $('.progreso').modal('hide');
                        }
                        else {
                            $("#FotoperfilDP").attr("src", data.Message);
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    $("#toggle-rol").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#rol-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#rol-container-toggle").removeClass("collapse");
        }
    });
    $("#toggle-company").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#companies-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#companies-container-toggle").removeClass("collapse");
        }
    });
    //eliminar usuario
    $("#DeleteUser").submit(function (e) {
        e.preventDefault();
        var contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador = true;
                let input = $(document.createElement('input'));
                input.attr("name", `users`);
                input.attr("class", "automatic_input_user");
                input.val($(this).parent().parent().find(".Aliastbl").html().trim());
                $("#DeleteUser").append(input);
            }
        });
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar usuarios seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/usuarios/eliminar",
                        type: "POST",
                        data: $("#DeleteUser").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                $.get(location.href)
                                    .done(function (r) {
                                    var newDom = $(r);
                                    $('.tblUser').replaceWith($('.tblUser', newDom));
                                });
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_user").remove();
                },
                onCancel: function () {
                    $(".selectUsers[type=checkbox]").prop('checked', false);
                    $(".automatic_input_user").remove();
                }
            });
        }
    });
    //Código para mostrar la ayuda
    $("#id-help-user").on("click", function () {
        let that = $(this)[0];
        showhelp(that, "/usuarios/ayuda", ".help-user");
    });
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");
        }
    });
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblUser").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "usuarios", ".tbody-Table-user");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    $(document).on('dblclick', '.tbody-Table-user .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.Aliastbl').text().trim();
        if (!rowId) {
            return;
        }
        $.ajax({
            url: `/usuarios/${rowId}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    option = 2;
                    fn.SearchCompaniesDropDownList(data.Alias);
                    fn.SearchImageUser(data.Alias);
                    fn.EditAndNewSettings("edit");
                    AutomaticBinding(data, "#CreateAndEditUser");
                    if (!data.ElevationTypeBool) {
                        $('.contendorRolandCompaies').removeClass('collapse');
                        fn.SearchRoltoUsers();
                        fn.SearchCompanytoUsers();
                    }
                    else {
                        $('.contendorRolandCompaies').addClass('collapse');
                    }
                }
                else {
                    windows_message("No se encontró el usuario", "error");
                }
            },
            error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    });
    // Aplicar estilo clickable a las filas
    $('.tbody-Table-user .row-app').addClass('row-clickable');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLFlBQVksR0FBVyxzQ0FBc0MsQ0FBQztJQUNsRSxJQUFJLE1BQWMsQ0FBQztBQUN2QixDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBQ1Asc0RBQXNEO0lBQ3RELGtCQUFrQixFQUFFLFVBQVUsTUFBTTtRQUNoQyxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsbURBQW1EO1lBQ25ELENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQ0ksQ0FBQztZQUNGLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFV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Q0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxFQUFFLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztvQkFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3dCQUMxQixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3RELEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN0QixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osZUFBZSxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO1lBQ0wsQ0FBQztZQUNELEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ2hCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILHVDQUF1QztJQUN2QyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgZGVmYXVsdGltYWdlOiBzdHJpbmcgPSBcIi9JbWFnZXMvRGFzaGJvYXJkL2RlZmF1bHRfcGVyZmlsLnBuZ1wiO1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9Db25maWd1cmFyIGVsZW1lbnRvcyBkZWwgZG9tIGFsIGVkaXRhciBvIGNyZWFyIG51ZXZvXHJcbiAgICBFZGl0QW5kTmV3U2V0dGluZ3M6IGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgICBpZiAob3B0aW9uID09IFwiZWRpdFwiKSB7XHJcbiAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KFwiRWRpdGFyIHVzdWFyaW9cIik7XHJcbiAgICAgICAgICAgICQoXCIjQWxpYXNcIikuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICQoXCIjRW1haWxcIikuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIC8qICAgICAgICAgICAgJChcIiNFbWFpbFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpOyovXHJcbiAgICAgICAgICAgICQoJy5Db250ZW1wcmVzYScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udEltcHV0RGF0b3NQZXJzb25hbGVzRm90bycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICBmbi5mdW50aW9uTmV3QW5kRWRpdFVzZXJzKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KFwiTnVldm8gdXN1YXJpb1wiKTtcclxuICAgICAgICAgICAgJChcIiNBbGlhc1wiKS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICQoXCIjRW1haWxcIikucmVtb3ZlQXR0cihcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgICAgICAkKCcuY29udEltcHV0RGF0b3NQZXJzb25hbGVzRm90bycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuQ29udGVtcHJlc2EnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgZm4uZnVudGlvbk5ld0FuZEVkaXRVc2VycyhcIm9wZW5cIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9mdW5jaW9uIGFicmlyIG51ZXZvIHVzdWFyaW9cclxuICAgIGZ1bnRpb25OZXdBbmRFZGl0VXNlcnM6IGZ1bmN0aW9uIChfb3BjaW9uKSB7XHJcbiAgICAgICAgaWYgKF9vcGNpb24gPT0gXCJvcGVuXCIpIHtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9MaW1waWEgZWwgZm9ybXVsYXJpbyBkZSBndWFyZGFyIHkgZWRpdGFyXHJcbiAgICBDbGVhckltcHV0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDcmVhdGVBbmRFZGl0VXNlclwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLy8vZnVudGlvbiBjcmVhciB5IGVkaXRhciB1c3Vhcmlvc1xyXG4gICAgLy9DcmVhdGVBbmRFZGl0VXNlcnM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvL30sXHJcblxyXG4gICAgLy9GdW50aW9uTW9kZWxVc2VyczogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgbGV0IEVsZXZhdGlvblR5cGU6IHN0cmluZyA9IFwiMlwiO1xyXG4gICAgLy8gICAgbGV0IF9Db21wYW55RGVmYXVsdElkOiBzdHJpbmc7XHJcbiAgICAvLyAgICBpZiAoJCgnLkNvbXBhbnlEZWZhdWx0SWQnKS52YWwoKSA9PSBudWxsKVxyXG4gICAgLy8gICAgICAgIF9Db21wYW55RGVmYXVsdElkID0gXCJcIjtcclxuICAgIC8vICAgIGVsc2VcclxuICAgIC8vICAgICAgICBfQ29tcGFueURlZmF1bHRJZCA9ICQoJy5Db21wYW55RGVmYXVsdElkJykudmFsKCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAvLyAgICBpZiAoJChcIi5FbGV2YXRpb25UeXBlXCIpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgIC8vICAgICAgICBFbGV2YXRpb25UeXBlID0gXCIwXCI7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICB2YXIgTW9kZWxVc2VyOiBJVXNlcnMgPVxyXG4gICAgLy8gICAge1xyXG4gICAgLy8gICAgICAgIE5hbWU6ICQoJy5OYW1lJykudmFsKCkudG9TdHJpbmcoKSxcclxuICAgIC8vICAgICAgICBBbGlhczogJCgnLkFsaWFzJykudmFsKCkudG9TdHJpbmcoKSxcclxuICAgIC8vICAgICAgICBFbWFpbDogJCgnLkVtYWlsJykudmFsKCkudG9TdHJpbmcoKSxcclxuICAgIC8vICAgICAgICBGb3JtYXRDb2RlSWQ6ICQoJy5Gb3JtYXRDb2RlSWQnKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgLy8gICAgICAgIEVsZXZhdGlvblR5cGU6IEVsZXZhdGlvblR5cGUsXHJcbiAgICAvLyAgICAgICAgQ29tcGFueURlZmF1bHRJZDogX0NvbXBhbnlEZWZhdWx0SWRcclxuICAgIC8vICAgIH07XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIE1vZGVsVXNlcjtcclxuICAgIC8vfSxcclxuXHJcbiAgICBTZWFyY2hSb2x0b1VzZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9CdXNjYXJSb2xVc3VhcmlvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIEFsaWFzOiAkKCcjQWxpYXMnKS52YWwoKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjQWxsVGFibGVSb2xcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBbGxUYWJsZVJvbFwiKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlYXJjaENvbXBhbnl0b1VzZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9CdXNjYXJFbXByZXNhc1VzdWFyaW9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgQWxpYXM6ICQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBbGxUYWJsZUNvbXBhbnlcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBbGxUYWJsZUNvbXBhbnlcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWFyY2hDb21wYW5pZXNEcm9wRG93bkxpc3Q6IGZ1bmN0aW9uIChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvQnVzY2FyTGlzdGFFbXByZXNhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBfaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuQ29tcGFueURlZmF1bHRJZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoXCJTZWxlY2Npb25lLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5Db21wYW55RGVmYXVsdElkXCIpLmFwcGVuZChvcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KHRoaXMuQ29tcGFueU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuY29tcGFueUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Db21wYW55RGVmYXVsdElkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VhcmNoSW1hZ2VVc2VyOiBmdW5jdGlvbiAoX2FsaWFzOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL2Rlc2NhcmdhcmltYWdlblwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBBbGlhczogX2FsaWFzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuTWVzc2FnZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRFBcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRFBcIikuYXR0cihcInNyY1wiLCBkZWZhdWx0aW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9DcmVhciBudWV2byB1c3VhcmlvXHJcbiAgICAkKCcuTmV3VXNlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb24gPSAxO1xyXG4gICAgICAgICQoXCIjRm90b3BlcmZpbERQXCIpLmF0dHIoXCJzcmNcIiwgZGVmYXVsdGltYWdlKTtcclxuICAgICAgICBmbi5DbGVhckltcHV0KCk7XHJcbiAgICAgICAgZm4uRWRpdEFuZE5ld1NldHRpbmdzKFwibmV3XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9FZGl0YXIgdXN1YXJpb1xyXG4gICAgJChcIi5FZGl0VXNlcnNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdFVzZXJzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhZG9yID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuQWxpYXN0YmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgIT0gMikge1xyXG4gICAgICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3VzdWFyaW9zLyR7aWR9YCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJVXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoQ29tcGFuaWVzRHJvcERvd25MaXN0KGRhdGEuQWxpYXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoSW1hZ2VVc2VyKGRhdGEuQWxpYXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uRWRpdEFuZE5ld1NldHRpbmdzKFwiZWRpdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI0NyZWF0ZUFuZEVkaXRVc2VyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5FbGV2YXRpb25UeXBlQm9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCgnI0VsZXZhdGlvblR5cGUnKS5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hSb2x0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoQ29tcGFueXRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCgnI0VsZXZhdGlvblR5cGUnKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTm8gc2UgZW5jb250csOzIGVsIHVzdWFyaW9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uZnVudGlvbk5ld0FuZEVkaXRVc2VycyhcImNsb3NlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI0NyZWF0ZUFuZEVkaXRVc2VyJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCkgKyBgJm9wZXJhY2lvbj0ke29wdGlvbn1gLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLkVkaXRBbmROZXdTZXR0aW5ncyhcImVkaXRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoJy5FbGV2YXRpb25UeXBlJykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hSb2x0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW55dG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFVzZXInKS5yZXBsYWNlV2l0aCgkKCcudGJsVXNlcicsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3N0cmFyIG1vZGFsIGRlIHRvZGFzIGxhcyBlbXByZXNhc1xyXG4gICAgJCgnLlNob3dNb2RDb21wYW5pZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9tb2RhbGVtcHJlc2FzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuTW9kQ29tcGFuaWVzXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuTW9kQ29tcGFuaWVzXCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKkZvcm0qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ndWFyZGFyIGVtcHJlc2FzIGRlIHVzdWFyaW9cclxuICAgICAgICAgICAgICAgICAgICAkKCcjU2F2ZVVzZXJDb21wYW55Rm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0T3B0aW9uQ29tcGFuaWVzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGBjb21wYW5pZXNbJHtjb250YWRvcn1dLmNvbXBhbnlJZGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dF9lbXBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5jb21wYW55SWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlckNvbXBhbnlGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgY29tcGFuaWVzWyR7Y29udGFkb3J9XS5BbGlhc2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dF9lbXBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQoXCIjQWxpYXNcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlckNvbXBhbnlGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIGFsIG1lbm9zIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL2d1YXJkYXJFbXByZXNhc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjU2F2ZVVzZXJDb21wYW55Rm9ybVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZW1wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoQ29tcGFueXRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbmllc0Ryb3BEb3duTGlzdCgkKFwiI0FsaWFzXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLk1vZENvbXBhbmllcycpLm1vZGFsKFwiaGlkZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNlbGVjdE9wdGlvbkNvbXBhbmllcycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZW1wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5CdXNjYXJ0YmxDb21wYW5pZXNcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgb25seSBtYXRjaGluZyBUUiwgaGlkZSByZXN0IG9mIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKFwiLnRibENvbXBhbmllIHRib2R5IHRyXCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudGV4dCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigkKF90aGlzKS52YWwoKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0IGFsbCBjb21wYW5pZXNcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2NoZWNrLXRhYmxlLUFzaWdDdXN0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5Nb2RDb21wYW5pZXMnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW9zdHJhciBtb2RhbCBkZSB0b2RvcyBsYXMgb3BjaW9uZXMgZGVsIG1lbnVcclxuICAgICQoJy5zaG93Um9sZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9tb2RhbHJvbGVzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuTW9kQXNpZ1JvbGVzXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuTW9kQXNpZ1JvbGVzXCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9PcGNpw7NuIHBhcmEgYWx0ZXJuYXIgZW50cmUgbG9zIHJvbGVzIGRlIHZlciwgZWRpdGFyIHkgZWxpbWluYXIsIHNlZ8O6biBzZSBtYXJxdWVuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNsaWNrQ2hlY2t2ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3RhZG8gPSAkKHRoaXMpLmZpbmQoXCIuaWRDaGVja3ZlclwiKS5pcyhcIjpjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXN0YWRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5wcm9wKCdjaGVja2VkJywgIWVzdGFkbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikucHJvcCgnY2hlY2tlZCcsICFlc3RhZG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNsaWNrQ2hlY2tlZGl0YXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3RhZG8gPSAkKHRoaXMpLmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5pcyhcIjpjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXN0YWRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja3ZlclwiKS5wcm9wKCdjaGVja2VkJywgIWVzdGFkbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikucHJvcCgnY2hlY2tlZCcsICFlc3RhZG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jbGlja0NoZWNrZWxpbWluYXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3RhZG8gPSAkKHRoaXMpLmZpbmQoXCIuaWRDaGVja2VsaW1pbmFyXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3RhZG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrdmVyXCIpLnByb3AoJ2NoZWNrZWQnLCAhZXN0YWRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlZGl0YXJcIikucHJvcCgnY2hlY2tlZCcsICFlc3RhZG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKkZvcm0qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ndWFyZGFyIHJvbGVzIGRlIHVzdWFyaW9cclxuICAgICAgICAgICAgICAgICAgICAkKCcjU2F2ZVVzZXJSb2xGb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RBc2lnUm9sW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGByb2xlc1ske2NvbnRhZG9yfV0uTWVudUlkYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTWVudUlkdGJscm9sXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU2F2ZVVzZXJSb2xGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5BbGlhc2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgcm9sZXNbJHtjb250YWRvcn1dLlByaXZpbGVnZVZpZXdgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyUm9sRm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrdmVyXCIpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2t2ZXJcIikuaXMoXCI6Y2hlY2tlZFwiKSkudG9TdHJpbmcoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5Qcml2aWxlZ2VFZGl0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wcm9wKFwiY2hlY2tlZFwiLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLmlzKFwiOmNoZWNrZWRcIikpLnRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5Qcml2aWxlZ2VEZWxldGVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lucHV0LnByb3AoXCJjaGVja2VkXCIsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikuaXMoXCI6Y2hlY2tlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucHJvcChcImNoZWNrZWRcIiwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikuaXMoXCI6Y2hlY2tlZFwiKSkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZ3VhcmRhclJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFJvbHRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5Nb2RBc2lnUm9sZXMnKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiQoXCIudGJvZHlUYWJsZU1lbnVcIikubG9hZChsb2NhdGlvbi5ocmVmICsgXCIgLnRib2R5VGFibGVNZW51PipcIiwgXCJcIik7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5CdXNjYXJ0Ymxyb2xlc1wiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgb25seSBtYXRjaGluZyBUUiwgaGlkZSByZXN0IG9mIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoXCIudGJscm9sZXMtcGFyYS1hc2lnbmFyIHRib2R5IHRyXCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCQoX3RoaXMpLnZhbCgpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3QgYWxsIHJvbHNcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc0FsbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RBc2lnUm9sW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0QXNpZ1JvbFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5Nb2RBc2lnUm9sZXMnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNOYW1lXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQodGhpcykudmFsKEZpcnRzY2FwaXRhbGxldHRlcigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjRW1haWxcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCh0aGlzKS52YWwoTWF5dXNjdWxhKCQodGhpcykudmFsKCkudG9TdHJpbmcoKSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNBbGlhc1wiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbChNYXl1c2N1bGEoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKkZvcm0gRGVsZXRlKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLy9FbGltaW5hciByb2xlcyBhc2lnbmFkb3MgYSB1biB1c3VhcmlvXHJcbiAgICAkKCcjRGVsZXRlVXNlclJvbEZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY1JvbEFzaWduYWRvc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGByb2xlc2ApO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2RlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTWVudUlkQXNzaWduZWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJSb2xGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIGFsIG1lbm9zIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciByb2xlcyBhc2lnbmFkYXM/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5BbGlhc0ZvclJvbGVcIikudmFsKCQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9lbGltaW5hclJvbGVzQXNpZ25hZGFzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVVzZXJSb2xGb3JtXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoUm9sdG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZGVsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY1JvbEFzaWduYWRvc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X2RlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKipGb3JtIERlbGV0ZSoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8vRWxpbWluYXIgZW1wcmVzYXMgYXNpZ25hZGEgYSB1biAgdXN1YXJpb1xyXG4gICAgJCgnI0RlbGV0ZVVzZXJDb21wYW55Rm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdENvbXBhbmllc0Fzc2lnbmVkW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYGNvbXBhbmllc2ApO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2RlbF9lbXBcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmNvbXBhbnlJZEFzaWd0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJDb21wYW55Rm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgZW1wcmVzYXMgYXNpZ25hZGFzP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5BbGlhc0ZvckNvbXBhbnlcIikudmFsKCQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZWxpbWluYXJFbXByZXNhc0FzaWduYWRhc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVVc2VyQ29tcGFueUZvcm1cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW55dG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZGVsX2VtcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0Q29tcGFuaWVzQXNzaWduZWRbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9kZWxfZW1wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9jYXJnYXIgaW1hZ2VuIGRlIHVzdWFyaW9cclxuICAgICQoXCIuSW1hZ2VcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IF9kYXRvID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGlmICgkKCcjQWxpYXMnKS52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkVsIHVzdWFyaW8gZGViZSB0ZW5lciB1biBhbGlhc1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKF9kYXRvLmZpbGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS11c2VyaW1hZ2VzLWZvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFmb3JtID0gbmV3IEZvcm1EYXRhKG9yaWdpbmFsZm9ybSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhZm9ybS5hcHBlbmQoXCJBbGlhc1wiLCAkKCcjQWxpYXMnKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvY2FyZ2FyaW1hZ2VuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YWZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRm90b3BlcmZpbERQXCIpLmF0dHIoXCJzcmNcIiwgZGF0YS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJChcIiN0b2dnbGUtcm9sXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIiwgXCIyXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI3JvbC1jb250YWluZXItdG9nZ2xlXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZhLWFuZ2xlLXVwXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgJChcIiNyb2wtY29udGFpbmVyLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdG9nZ2xlLWNvbXBhbnlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjY29tcGFuaWVzLWNvbnRhaW5lci10b2dnbGVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI2NvbXBhbmllcy1jb250YWluZXItdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vZWxpbWluYXIgdXN1YXJpb1xyXG4gICAgJChcIiNEZWxldGVVc2VyXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdFVzZXJzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHVzZXJzYCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfdXNlclwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuQWxpYXN0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJcIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciB1c3VhcmlvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVVc2VyXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFVzZXInKS5yZXBsYWNlV2l0aCgkKCcudGJsVXNlcicsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X3VzZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFVzZXJzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfdXNlclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Dw7NkaWdvIHBhcmEgbW9zdHJhciBsYSBheXVkYVxyXG4gICAgJChcIiNpZC1oZWxwLXVzZXJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSAkKHRoaXMpWzBdO1xyXG4gICAgICAgIHNob3doZWxwKHRoYXQsIFwiL3VzdWFyaW9zL2F5dWRhXCIsIFwiLmhlbHAtdXNlclwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtdXNlclwiLCBcIi91c3Vhcmlvcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLXVzZXJcIiwgXCIvdXN1YXJpb3MvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsVXNlclwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwidXN1YXJpb3NcIiwgXCIudGJvZHktVGFibGUtdXNlclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgJChkb2N1bWVudCkub24oJ2RibGNsaWNrJywgJy50Ym9keS1UYWJsZS11c2VyIC5yb3ctYXBwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIHx8ICQoZS50YXJnZXQpLmlzKCdsYWJlbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSAkKHRoaXMpLmZpbmQoJy5BbGlhc3RibCcpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFyb3dJZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL3VzdWFyaW9zLyR7cm93SWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJVXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW5pZXNEcm9wRG93bkxpc3QoZGF0YS5BbGlhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoSW1hZ2VVc2VyKGRhdGEuQWxpYXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLkVkaXRBbmROZXdTZXR0aW5ncyhcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNDcmVhdGVBbmRFZGl0VXNlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLkVsZXZhdGlvblR5cGVCb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hSb2x0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgdXN1YXJpb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXBsaWNhciBlc3RpbG8gY2xpY2thYmxlIGEgbGFzIGZpbGFzXHJcbiAgICAkKCcudGJvZHktVGFibGUtdXNlciAucm93LWFwcCcpLmFkZENsYXNzKCdyb3ctY2xpY2thYmxlJyk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=