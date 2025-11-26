// ============================================================================
// Archivo: login.ts
// Proyecto: DC365_WebNR.UI
// Descripcion:
//   - Script TypeScript para manejo del formulario de login
//   - Validaciones client-side y llamadas AJAX al controller
// ============================================================================

// Formulario de login principal
$("#loginForm").submit(function (e) {
    e.preventDefault();

    const email = $('#email').val()?.toString().trim();
    const password = $('#password').val()?.toString();

    // Validaciones
    if (!email) {
        showError('El correo electronico es requerido');
        $('#email').addClass('is-invalid');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Ingrese un correo electronico valido');
        $('#email').addClass('is-invalid');
        return;
    }

    if (!password) {
        showError('La contrasena es requerida');
        $('#password').addClass('is-invalid');
        return;
    }

    // Limpiar errores
    $('#email, #password').removeClass('is-invalid');

    // Mostrar estado de carga
    setLoadingState(true);

    $.ajax({
        url: "/Login/ValidartePassword",
        type: "POST",
        data: {
            Password: password,
            correo: email,
            __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
        },
        async: true,
        success: function (data: ResponseUI) {
            if (data.Type == "error") {
                setLoadingState(false);
                showError(data.Message || 'Credenciales invalidas');
            } else {
                showSuccess('Autenticacion exitosa. Cargando sistema...');
                setTimeout(function () {
                    location.href = "/Dashboard/Principal";
                }, 800);
            }
        },
        error: function (xhr) {
            setLoadingState(false);
            showError('Error de conexion. Intente nuevamente.');
        }
    });
});

// Formulario de recuperacion de contrasena
$("#forgotPasswordForm").submit(function (e) {
    e.preventDefault();

    const email = $('#emailRecover').val()?.toString().trim();

    if (!email) {
        showError('El correo electronico es requerido');
        $('#emailRecover').addClass('is-invalid');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Ingrese un correo electronico valido');
        $('#emailRecover').addClass('is-invalid');
        return;
    }

    $('#emailRecover').removeClass('is-invalid');
    setRecoverLoadingState(true);

    $.ajax({
        url: "/Login/Requestchangepassword",
        type: "POST",
        data: {
            _email: email,
            __RequestVerificationToken: $('#forgotPasswordForm input[name="__RequestVerificationToken"]').val()
        },
        async: true,
        success: function (data: ResponseUI) {
            setRecoverLoadingState(false);
            if (data.Type == "error") {
                showError(data.Message || 'Error al enviar solicitud');
            } else {
                showSuccess(data.Message || 'Se ha enviado una contrasena temporal a su correo');
                setTimeout(function () {
                    showLoginForm();
                }, 2000);
            }
        },
        error: function (xhr) {
            setRecoverLoadingState(false);
            showError('Error de conexion. Intente nuevamente.');
        }
    });
});

// Link para mostrar formulario de olvido de contrasena
$('#linkForgotPassword').on('click', function (e) {
    e.preventDefault();
    showForgotPasswordForm();
});

// Link para volver al login
$('#linkBackToLogin').on('click', function (e) {
    e.preventDefault();
    showLoginForm();
});

// Limpiar errores al escribir
$('#email, #password, #emailRecover').on('input', function () {
    $(this).removeClass('is-invalid');
    clearAlerts();
});

// Funciones auxiliares
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message: string): void {
    $('#alertContainer').html(`
        <div class="alert alert-danger fade-in" style="margin-bottom: 15px;">
            <i class="fa fa-exclamation-circle"></i> ${message}
        </div>
    `);
}

function showSuccess(message: string): void {
    $('#alertContainer').html(`
        <div class="alert alert-success fade-in" style="margin-bottom: 15px;">
            <i class="fa fa-check-circle"></i> ${message}
            <span class="spinner-border spinner-border-sm" style="float: right;"></span>
        </div>
    `);
}

function clearAlerts(): void {
    $('#alertContainer').empty();
}

function setLoadingState(loading: boolean): void {
    if (loading) {
        $('#btnSubmit').prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Ingresando...');
        $('#email, #password').prop('disabled', true);
    } else {
        $('#btnSubmit').prop('disabled', false).html('Ingresar');
        $('#email, #password').prop('disabled', false);
    }
}

function setRecoverLoadingState(loading: boolean): void {
    if (loading) {
        $('#btnRecover').prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Enviando...');
        $('#emailRecover').prop('disabled', true);
    } else {
        $('#btnRecover').prop('disabled', false).html('Enviar');
        $('#emailRecover').prop('disabled', false);
    }
}

function showForgotPasswordForm(): void {
    clearAlerts();
    $('#loginForm').hide();
    $('#forgotPasswordForm').show();
    $('#emailRecover').val($('#email').val()?.toString() || '');
}

function showLoginForm(): void {
    clearAlerts();
    $('#forgotPasswordForm').hide();
    $('#loginForm').show();
}
