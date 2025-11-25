$(".app-input-date-today").on("click", function () {
    var inputdate = this.parentElement.children[0];
    inputdate.value = FormtFechaTipoCalendario("",true);
});

$(".app-input-date-never").on("click", function () {
    var inputdate = this.parentElement.children[0];
    inputdate.value = "2134-12-31";
});



function InstaciateListener() {
    $(".app-input-date-today").on("click", function () {
        var inputdate = this.parentElement.children[0];
        inputdate.value = FormtFechaTipoCalendario("", true);
    });

    $(".app-input-date-never").on("click", function () {
        var inputdate = this.parentElement.children[0];
        inputdate.value = "2134-12-31";
    });
}