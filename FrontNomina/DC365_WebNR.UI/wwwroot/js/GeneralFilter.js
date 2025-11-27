/**
 * @file GeneralFilter.ts
 * @description Módulo de filtros generales. Proporciona funciones para filtrar
 *              datos en las tablas según diferentes criterios y tipos de datos.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module FiltrosGenerales
 */
/**
 * Configura el tipo de filtro según la opción seleccionada
 * @param {HTMLElement} that - Elemento select con la opción de filtro
 */
function optionFilterFunction(that) {
    let typeFilter = $(that).val().toString().substring(0, 2);
    //Fecha
    if (typeFilter.toLowerCase() == "da") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "date") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }
        $('.textFilterMask').attr("type", "Date");
        $('.textFilterMask').removeClass("plugin-number-format");
    }
    //Decimal
    if (typeFilter.toLowerCase() == "de") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "number") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }
        $('.textFilterMask').attr("type", "Number");
    }
    //Texto
    if (typeFilter.toLowerCase() == "st") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "text") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }
        $('.textFilterMask').attr("type", "Text");
        $('.textFilterMask').removeClass("plugin-number-format");
    }
}
function textFilterMaskFunction(that) {
    //let typeFilter = $(".optionFilter").val().toString().substring(0, 2);
    $(".textFilter").val($(that).val().toString());
}
//Escuchador del filtro
//$('.optionFilter').on('change', function () {
//});
//Escuchador del enter
//$('.textFilterMask').on('keyup', function (e) {
//    var keycode = e.keyCode || e.which;
//    if (keycode == 13) {
//        let typeFilter = $(".optionFilter").val().toString().substring(0, 2);
//        $(".textFilter").val($(this).val().toString());
//        //if (typeFilter.toLowerCase() == "de") {
//        //    $(".textFilter").val(FormatoNumericos_Calcular($(this).val().toString()));
//        //}
//        //else {
//        //}
//    }
//});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhbEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL0dlbmVyYWxGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVIOzs7R0FHRztBQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBSTtJQUM5QixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUxRCxPQUFPO0lBQ1AsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksTUFBTSxFQUFFLENBQUM7WUFDNUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVM7SUFDVCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUM5RCxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsT0FBTztJQUNQLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQzVELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRCxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7QUFDTCxDQUFDO0FBR0QsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJO0lBQ2hDLHVFQUF1RTtJQUV2RSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFJRCx1QkFBdUI7QUFDdkIsK0NBQStDO0FBRy9DLEtBQUs7QUFHTCxzQkFBc0I7QUFDdEIsaURBQWlEO0FBQ2pELHlDQUF5QztBQUN6QywwQkFBMEI7QUFDMUIsK0VBQStFO0FBRS9FLHlEQUF5RDtBQUN6RCxtREFBbUQ7QUFDbkQsMEZBQTBGO0FBQzFGLGFBQWE7QUFDYixrQkFBa0I7QUFDbEIsYUFBYTtBQUNiLE9BQU87QUFDUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIEdlbmVyYWxGaWx0ZXIudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZmlsdHJvcyBnZW5lcmFsZXMuIFByb3BvcmNpb25hIGZ1bmNpb25lcyBwYXJhIGZpbHRyYXJcclxuICogICAgICAgICAgICAgIGRhdG9zIGVuIGxhcyB0YWJsYXMgc2Vnw7puIGRpZmVyZW50ZXMgY3JpdGVyaW9zIHkgdGlwb3MgZGUgZGF0b3MuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIEZpbHRyb3NHZW5lcmFsZXNcclxuICovXHJcblxyXG4vKipcclxuICogQ29uZmlndXJhIGVsIHRpcG8gZGUgZmlsdHJvIHNlZ8O6biBsYSBvcGNpw7NuIHNlbGVjY2lvbmFkYVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0aGF0IC0gRWxlbWVudG8gc2VsZWN0IGNvbiBsYSBvcGNpw7NuIGRlIGZpbHRyb1xyXG4gKi9cclxuZnVuY3Rpb24gb3B0aW9uRmlsdGVyRnVuY3Rpb24odGhhdCkge1xyXG4gICAgbGV0IHR5cGVGaWx0ZXIgPSAkKHRoYXQpLnZhbCgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xyXG5cclxuICAgIC8vRmVjaGFcclxuICAgIGlmICh0eXBlRmlsdGVyLnRvTG93ZXJDYXNlKCkgPT0gXCJkYVwiKSB7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyTWFzaycpLmF0dHIoXCJ0eXBlXCIpLnRvTG93ZXJDYXNlKCkgIT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgJCgnLnRleHRGaWx0ZXJNYXNrJykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCcudGV4dEZpbHRlcicpLnZhbChcIlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLmF0dHIoXCJ0eXBlXCIsIFwiRGF0ZVwiKTtcclxuICAgICAgICAkKCcudGV4dEZpbHRlck1hc2snKS5yZW1vdmVDbGFzcyhcInBsdWdpbi1udW1iZXItZm9ybWF0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vRGVjaW1hbFxyXG4gICAgaWYgKHR5cGVGaWx0ZXIudG9Mb3dlckNhc2UoKSA9PSBcImRlXCIpIHtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXJNYXNrJykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSAhPSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCgnLnRleHRGaWx0ZXInKS52YWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcudGV4dEZpbHRlck1hc2snKS5hdHRyKFwidHlwZVwiLCBcIk51bWJlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RleHRvXHJcbiAgICBpZiAodHlwZUZpbHRlci50b0xvd2VyQ2FzZSgpID09IFwic3RcIikge1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlck1hc2snKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpICE9IFwidGV4dFwiKSB7XHJcbiAgICAgICAgICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCgnLnRleHRGaWx0ZXInKS52YWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcudGV4dEZpbHRlck1hc2snKS5hdHRyKFwidHlwZVwiLCBcIlRleHRcIik7XHJcbiAgICAgICAgJCgnLnRleHRGaWx0ZXJNYXNrJykucmVtb3ZlQ2xhc3MoXCJwbHVnaW4tbnVtYmVyLWZvcm1hdFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhhdCkge1xyXG4gICAgLy9sZXQgdHlwZUZpbHRlciA9ICQoXCIub3B0aW9uRmlsdGVyXCIpLnZhbCgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xyXG5cclxuICAgICQoXCIudGV4dEZpbHRlclwiKS52YWwoJCh0aGF0KS52YWwoKS50b1N0cmluZygpKTtcclxufVxyXG5cclxuXHJcblxyXG4vL0VzY3VjaGFkb3IgZGVsIGZpbHRyb1xyXG4vLyQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbi8vfSk7XHJcblxyXG5cclxuLy9Fc2N1Y2hhZG9yIGRlbCBlbnRlclxyXG4vLyQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgIHZhciBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbi8vICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbi8vICAgICAgICBsZXQgdHlwZUZpbHRlciA9ICQoXCIub3B0aW9uRmlsdGVyXCIpLnZhbCgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xyXG5cclxuLy8gICAgICAgICQoXCIudGV4dEZpbHRlclwiKS52YWwoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKTtcclxuLy8gICAgICAgIC8vaWYgKHR5cGVGaWx0ZXIudG9Mb3dlckNhc2UoKSA9PSBcImRlXCIpIHtcclxuLy8gICAgICAgIC8vICAgICQoXCIudGV4dEZpbHRlclwiKS52YWwoRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuLy8gICAgICAgIC8vfVxyXG4vLyAgICAgICAgLy9lbHNlIHtcclxuLy8gICAgICAgIC8vfVxyXG4vLyAgICB9XHJcbi8vfSk7Il19