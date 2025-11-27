/**
 * @file DashboardInfo.ts
 * @description Módulo del panel de control principal. Muestra información
 *              resumida, gráficos y estadísticas del sistema de nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Dashboard
 */
$(document).ready(function () {
    let graphicYear = $(".from_year").val().toString();
    let payrollid = $(".Payroll").val().toString();
    fn.GetCardInformation();
    fn.GetGraphicsInformation(graphicYear, payrollid);
});
const fn = {
    GetCardInformation: function () {
        $.ajax({
            url: `/Dashboard/GetCardInformation`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data != null) {
                    let properties = Object.getOwnPropertyNames(data);
                    properties.forEach((x) => {
                        $(`.card-qty.${x.toLowerCase()}`).text(data[x]);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    GetGraphicsInformation: function (graphicYear, payrollid) {
        $.ajax({
            url: `/Dashboard/GetGraphicsInformation?year=${graphicYear}&payrollid=${payrollid}`,
            type: "GET",
            //headers: {
            //    "company": "Root"
            //},
            async: true,
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    fn.BarChart(data.EmployeeByDepartments);
                    fn.DoubleBarChart(data.DtbutionCtbutionByYear);
                    fn.BarChartAmount(data.AmountByAction);
                    fn.BarChartPayrollAmount(data.TrimestralPayrollAmount);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //DonutChart: function (GraphicsData: IGraphicsInfo) {
    //    var ctx = document.getElementById("donutChart");
    //    var ctx2 = document.getElementById("donutChart2");
    //    var data = {
    //        datasets: [{
    //            data: GraphicsData.Values,
    //            backgroundColor: [
    //                "#455C73",
    //                "#9B59B6"
    //            ]
    //        }],
    //        labels: GraphicsData.Keys
    //    };
    //    var pieChart = new Chart(ctx, {
    //        data: data,
    //        type: 'doughnut',
    //        options: {
    //            legend: {
    //                display: true,
    //                position: 'left',
    //                align: "center",
    //                labels: {
    //                    boxWidth: 30,
    //                    fontColor: 'black'
    //                }
    //            },
    //            title: {
    //                display: false,
    //                text: 'Empleados por departamentos',
    //                position: 'top',
    //                fontColor: '#000',
    //                fontSize: 16,
    //                fontFamily: 'sans-serif'
    //            },
    //            cutoutPercentage: 50,
    //            aspectRatio: 2
    //        }
    //    });
    //    var pieChart2 = new Chart(ctx2, {
    //        data: data,
    //        type: 'doughnut',
    //        options: {
    //            legend: {
    //                display: true,
    //                position: 'left',
    //                align: "center",
    //                labels: {
    //                    boxWidth: 30,
    //                    fontColor: 'black'
    //                }
    //            },
    //            title: {
    //                display: false,
    //                text: 'Empleados por departamentos',
    //                position: 'top',
    //                fontColor: '#000',
    //                fontSize: 16,
    //                fontFamily: 'sans-serif'
    //            },
    //            cutoutPercentage: 50,
    //            aspectRatio: 2
    //        }
    //    });
    //},
    BarChart: function (GraphicsData) {
        var ctx = document.getElementById("barChart");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: GraphicsData.Keys,
                datasets: [{
                        label: '',
                        data: GraphicsData.Values,
                        backgroundColor: "#26B99A",
                    }]
            },
            options: {
                title: {
                    display: false,
                    text: 'Empleados por departamentos',
                    position: 'top',
                    fontColor: '#000',
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                    padding: 10
                },
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'black'
                    }
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                aspectRatio: 6
            }
        });
    },
    BarChartAmount: function (GraphicsData) {
        var ctx = document.getElementById("barChartActionAmount");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: GraphicsData.Keys,
                datasets: [{
                        label: '',
                        data: GraphicsData.Values,
                        backgroundColor: "#9F28B1",
                    }]
            },
            options: {
                title: {
                    display: false,
                    text: 'Monto por novedades',
                    position: 'top',
                    fontColor: '#000',
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                    padding: 10
                },
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'black'
                    }
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    //return value.toLocaleString("en-US");
                                    return formatNumberGraf(value);
                                }
                            }
                            //,
                            //gridLines: {
                            //    display: false
                            //}
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        }
                    }
                },
                aspectRatio: 4
            }
        });
    },
    DoubleBarChart: function (GraphicsData) {
        var ctx = document.getElementById("doubleBarChart");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: GraphicsData.Keys,
                datasets: [
                    {
                        label: 'Deducciones',
                        data: GraphicsData.DtbutionValues,
                        backgroundColor: "#26B99A",
                    },
                    {
                        label: 'Contribuciones',
                        data: GraphicsData.CtbutionValues,
                        backgroundColor: "#26B00A",
                    }
                ]
            },
            options: {
                title: {
                    display: false,
                    text: 'Deducciones y contribuciones del año',
                    position: 'top',
                    fontColor: '#000',
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                    padding: 10
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'black'
                    }
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    //return value.toLocaleString("en-US");
                                    return formatNumberGraf(value);
                                }
                            }
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        }
                    }
                },
                aspectRatio: 2,
            }
        });
    },
    BarChartPayrollAmount: function (GraphicsData) {
        var ctx = document.getElementById("barChartPayrollAmount");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: GraphicsData.Keys,
                datasets: [
                    {
                        label: 'Primer mes',
                        data: GraphicsData.FirtBar,
                        backgroundColor: "#1ABB9C",
                    },
                    {
                        label: 'Segundo mes',
                        data: GraphicsData.SecondBar,
                        backgroundColor: "#270D80",
                    },
                    {
                        label: 'Tercer mes',
                        data: GraphicsData.ThirtBar,
                        backgroundColor: "#707070",
                    }
                ]
            },
            options: {
                title: {
                    display: false,
                    text: 'Pago de nómina por trimestre',
                    position: 'top',
                    fontColor: '#000',
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                    padding: 10
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'black'
                    }
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    //return value.toLocaleString("en-US");
                                    return formatNumberGraf(value);
                                }
                            }
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        }
                    }
                },
                aspectRatio: 2
            }
        });
    },
};
escuchadores: {
    $(".BtnSearchDashboard").on("click", function () {
        let graphicYear = $(".from_year").val().toString();
        let payrollid = $(".Payroll").val().toString();
        if (graphicYear.length == 4) {
            //let canvas = document.querySelectorAll(".custom-chart");
            //canvas.forEach((e) => {
            //    console.log(e.id)
            //    let element = document.getElementById(e.id);
            //    element.innerHTML = "";
            //});
            fn.GetGraphicsInformation(graphicYear, payrollid);
        }
        else {
            windows_message("Formato de año incorrecto", "error");
        }
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL0Rhc2hib2FyZEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDZCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9DLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3hCLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLEVBQUUsR0FBRztJQUNQLGtCQUFrQixFQUFFO1FBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsK0JBQStCO1lBQ3BDLElBQUksRUFBRSxLQUFLO1lBRVgsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFrQjtnQkFDakMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBRXJCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdB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QUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFCLDBEQUEwRDtZQUMxRCx5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLGtEQUFrRDtZQUNsRCw2QkFBNkI7WUFDN0IsS0FBSztZQUNMLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsQ0FBQzthQUNJLENBQUM7WUFDRixlQUFlLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBR1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBEYXNoYm9hcmRJbmZvLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlbCBwYW5lbCBkZSBjb250cm9sIHByaW5jaXBhbC4gTXVlc3RyYSBpbmZvcm1hY2nDs25cclxuICogICAgICAgICAgICAgIHJlc3VtaWRhLCBncsOhZmljb3MgeSBlc3RhZMOtc3RpY2FzIGRlbCBzaXN0ZW1hIGRlIG7Ds21pbmEuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIERhc2hib2FyZFxyXG4gKi9cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBncmFwaGljWWVhciA9ICQoXCIuZnJvbV95ZWFyXCIpLnZhbCgpLnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgcGF5cm9sbGlkID0gJChcIi5QYXlyb2xsXCIpLnZhbCgpLnRvU3RyaW5nKCk7XHJcbiAgICBmbi5HZXRDYXJkSW5mb3JtYXRpb24oKTtcclxuICAgIGZuLkdldEdyYXBoaWNzSW5mb3JtYXRpb24oZ3JhcGhpY1llYXIsIHBheXJvbGxpZCk7XHJcbn0pO1xyXG5cclxuY29uc3QgZm4gPSB7XHJcbiAgICBHZXRDYXJkSW5mb3JtYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvRGFzaGJvYXJkL0dldENhcmRJbmZvcm1hdGlvbmAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJQ2FyZFF0eUluZm8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgoeCkgPT5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC5jYXJkLXF0eS4ke3gudG9Mb3dlckNhc2UoKX1gKS50ZXh0KGRhdGFbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRHcmFwaGljc0luZm9ybWF0aW9uOiBmdW5jdGlvbiAoZ3JhcGhpY1llYXI6IHN0cmluZywgcGF5cm9sbGlkKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL0Rhc2hib2FyZC9HZXRHcmFwaGljc0luZm9ybWF0aW9uP3llYXI9JHtncmFwaGljWWVhcn0mcGF5cm9sbGlkPSR7cGF5cm9sbGlkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIC8vaGVhZGVyczoge1xyXG4gICAgICAgICAgICAvLyAgICBcImNvbXBhbnlcIjogXCJSb290XCJcclxuICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElHcmFwaGljc0luZm8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5CYXJDaGFydChkYXRhLkVtcGxveWVlQnlEZXBhcnRtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uRG91YmxlQmFyQ2hhcnQoZGF0YS5EdGJ1dGlvbkN0YnV0aW9uQnlZZWFyKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5CYXJDaGFydEFtb3VudChkYXRhLkFtb3VudEJ5QWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5CYXJDaGFydFBheXJvbGxBbW91bnQoZGF0YS5UcmltZXN0cmFsUGF5cm9sbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvL0RvbnV0Q2hhcnQ6IGZ1bmN0aW9uIChHcmFwaGljc0RhdGE6IElHcmFwaGljc0luZm8pIHtcclxuICAgIC8vICAgIHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbnV0Q2hhcnRcIik7XHJcbiAgICAvLyAgICB2YXIgY3R4MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9udXRDaGFydDJcIik7XHJcblxyXG4gICAgLy8gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAvLyAgICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAvLyAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5WYWx1ZXMsXHJcbiAgICAvLyAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xyXG4gICAgLy8gICAgICAgICAgICAgICAgXCIjNDU1QzczXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBcIiM5QjU5QjZcIlxyXG4gICAgLy8gICAgICAgICAgICBdXHJcbiAgICAvLyAgICAgICAgfV0sXHJcblxyXG4gICAgLy8gICAgICAgIGxhYmVsczogR3JhcGhpY3NEYXRhLktleXNcclxuICAgIC8vICAgIH07XHJcblxyXG4gICAgLy8gICAgdmFyIHBpZUNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xyXG4gICAgLy8gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAvLyAgICAgICAgdHlwZTogJ2RvdWdobnV0JyxcclxuICAgIC8vICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAvLyAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGJveFdpZHRoOiAzMCxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6ICdibGFjaydcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgfSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHRleHQ6ICdFbXBsZWFkb3MgcG9yIGRlcGFydGFtZW50b3MnLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZidcclxuICAgIC8vICAgICAgICAgICAgfSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgIGN1dG91dFBlcmNlbnRhZ2U6IDUwLFxyXG4gICAgLy8gICAgICAgICAgICBhc3BlY3RSYXRpbzogMlxyXG4gICAgLy8gICAgICAgIH1cclxuICAgIC8vICAgIH0pO1xyXG5cclxuICAgIC8vICAgIHZhciBwaWVDaGFydDIgPSBuZXcgQ2hhcnQoY3R4Miwge1xyXG4gICAgLy8gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAvLyAgICAgICAgdHlwZTogJ2RvdWdobnV0JyxcclxuICAgIC8vICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAvLyAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGJveFdpZHRoOiAzMCxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6ICdibGFjaydcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgfSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHRleHQ6ICdFbXBsZWFkb3MgcG9yIGRlcGFydGFtZW50b3MnLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZidcclxuICAgIC8vICAgICAgICAgICAgfSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgIGN1dG91dFBlcmNlbnRhZ2U6IDUwLFxyXG4gICAgLy8gICAgICAgICAgICBhc3BlY3RSYXRpbzogMlxyXG4gICAgLy8gICAgICAgIH1cclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy99LFxyXG5cclxuICAgIEJhckNoYXJ0OiBmdW5jdGlvbiAoR3JhcGhpY3NEYXRhOiBJRGVwYXJ0YW1lbnRJbmZvKSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFyQ2hhcnRcIik7XHJcblxyXG4gICAgICAgIHZhciBiYXJDaGFydCA9IG5ldyBDaGFydChjdHgsIHtcclxuICAgICAgICAgICAgdHlwZTogJ2JhcicsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGxhYmVsczogR3JhcGhpY3NEYXRhLktleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhc2V0czogW3tcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogR3JhcGhpY3NEYXRhLlZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzI2Qjk5QVwiLFxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRW1wbGVhZG9zIHBvciBkZXBhcnRhbWVudG9zJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94V2lkdGg6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeUF4ZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogNlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEJhckNoYXJ0QW1vdW50OiBmdW5jdGlvbiAoR3JhcGhpY3NEYXRhOiBJQWN0aW9uQW1vdW50SW5mbykge1xyXG4gICAgICAgIHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhckNoYXJ0QWN0aW9uQW1vdW50XCIpO1xyXG5cclxuICAgICAgICB2YXIgYmFyQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdiYXInLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbHM6IEdyYXBoaWNzRGF0YS5LZXlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5WYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiM5RjI4QjFcIixcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ01vbnRvIHBvciBub3ZlZGFkZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hXaWR0aDogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICB5QXhlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE51bWJlckdyYWYodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyaWRMaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkaXNwbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZnVuY3Rpb24gKHRvb2x0aXBJdGVtLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9vbHRpcEl0ZW0ueUxhYmVsLnRvRml4ZWQoMikucmVwbGFjZSgvXFxkKD89KFxcZHszfSkrXFwuKS9nLCAnJCYsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IDRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBEb3VibGVCYXJDaGFydDogZnVuY3Rpb24gKEdyYXBoaWNzRGF0YTogSUR0aW9uQ3Rpb25JbmZvKSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG91YmxlQmFyQ2hhcnRcIik7XHJcblxyXG4gICAgICAgIHZhciBiYXJDaGFydCA9IG5ldyBDaGFydChjdHgsIHtcclxuICAgICAgICAgICAgdHlwZTogJ2JhcicsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGxhYmVsczogR3JhcGhpY3NEYXRhLktleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhc2V0czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdEZWR1Y2Npb25lcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5EdGJ1dGlvblZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMyNkI5OUFcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDb250cmlidWNpb25lcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5DdGJ1dGlvblZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMyNkIwMEFcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RlZHVjY2lvbmVzIHkgY29udHJpYnVjaW9uZXMgZGVsIGHDsW8nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFdpZHRoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNjYWxlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXROdW1iZXJHcmFmKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZnVuY3Rpb24gKHRvb2x0aXBJdGVtLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9vbHRpcEl0ZW0ueUxhYmVsLnRvRml4ZWQoMikucmVwbGFjZSgvXFxkKD89KFxcZHszfSkrXFwuKS9nLCAnJCYsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IDIsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBCYXJDaGFydFBheXJvbGxBbW91bnQ6IGZ1bmN0aW9uIChHcmFwaGljc0RhdGE6IElUcmltZXN0cmFsUGF5cm9sbEFtb3VudCkge1xyXG4gICAgICAgIHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhckNoYXJ0UGF5cm9sbEFtb3VudFwiKTtcclxuXHJcbiAgICAgICAgdmFyIGJhckNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xyXG4gICAgICAgICAgICB0eXBlOiAnYmFyJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgbGFiZWxzOiBHcmFwaGljc0RhdGEuS2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1ByaW1lciBtZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBHcmFwaGljc0RhdGEuRmlydEJhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMxQUJCOUNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTZWd1bmRvIG1lcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5TZWNvbmRCYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMjcwRDgwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVGVyY2VyIG1lcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IEdyYXBoaWNzRGF0YS5UaGlydEJhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiM3MDcwNzBcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1BhZ28gZGUgbsOzbWluYSBwb3IgdHJpbWVzdHJlJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hXaWR0aDogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICB5QXhlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE51bWJlckdyYWYodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgeEF4ZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRMaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZ1bmN0aW9uICh0b29sdGlwSXRlbSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXBJdGVtLnlMYWJlbC50b0ZpeGVkKDIpLnJlcGxhY2UoL1xcZCg/PShcXGR7M30pK1xcLikvZywgJyQmLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxufVxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAkKFwiLkJ0blNlYXJjaERhc2hib2FyZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZ3JhcGhpY1llYXIgPSAkKFwiLmZyb21feWVhclwiKS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBwYXlyb2xsaWQgPSAkKFwiLlBheXJvbGxcIikudmFsKCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKGdyYXBoaWNZZWFyLmxlbmd0aCA9PSA0KSB7XHJcbiAgICAgICAgICAgIC8vbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3VzdG9tLWNoYXJ0XCIpO1xyXG4gICAgICAgICAgICAvL2NhbnZhcy5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKGUuaWQpXHJcbiAgICAgICAgICAgIC8vICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5pZCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgZm4uR2V0R3JhcGhpY3NJbmZvcm1hdGlvbihncmFwaGljWWVhciwgcGF5cm9sbGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkZvcm1hdG8gZGUgYcOxbyBpbmNvcnJlY3RvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCB7fSJdfQ==