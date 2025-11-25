
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
            success: function (data: ICardQtyInfo) {
                if (data != null) {
                    let properties = Object.getOwnPropertyNames(data);
                    properties.forEach((x) =>
                    {
                        $(`.card-qty.${x.toLowerCase()}`).text(data[x]);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    GetGraphicsInformation: function (graphicYear: string, payrollid) {
        $.ajax({
            url: `/Dashboard/GetGraphicsInformation?year=${graphicYear}&payrollid=${payrollid}`,
            type: "GET",
            //headers: {
            //    "company": "Root"
            //},
            async: true,
            success: function (data: IGraphicsInfo) {
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

    BarChart: function (GraphicsData: IDepartamentInfo) {
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

    BarChartAmount: function (GraphicsData: IActionAmountInfo) {
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

    DoubleBarChart: function (GraphicsData: IDtionCtionInfo) {
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

    BarChartPayrollAmount: function (GraphicsData: ITrimestralPayrollAmount) {
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


}

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

export {}