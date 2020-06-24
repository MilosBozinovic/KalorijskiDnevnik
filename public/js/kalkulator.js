$(document).ready(function() {
    /* Prikazivanje forme u html stranici /kalkulator */
    $(".ženski-bmr").hide();
    $(".muški-bmr").show();


    $(".polM").click(function() {
        $(".ženski-bmr").hide();
        $(".muški-bmr").show();
    });

    $(".polZ").click(function() {
        $(".ženski-bmr").show();
        $(".muški-bmr").hide();
    });

    /* formula za izraćunavanje bmr za muškarca i ispis */

    $("#potvrdiM").click(function() {
        var muškoTežina = $("#muškoTežina").val();
        var muškoVisina = $("#muškoVisina").val();
        var muškoGodine = $("#muškoGodine").val();

        var bmr;

        bmr = ((10 * muškoTežina) + (6.25 * muškoVisina) - (5 * muškoGodine) + 5);
        $("#rezultatM").val(parseInt(bmr));

    });
    /* formula za ženu */
    $("#potvrdiZ").click(function() {
        var ženskoTežina = $("#ženskoTežina").val();
        var ženskoVisina = $("#ženskoVisina").val();
        var ženskoGodine = $("#ženskoGodine").val();

        var bmr;

        bmr = ((10 * ženskoTežina) + (6.25 * ženskoVisina) - (5 * ženskoGodine) + 5);
        $("#rezultatZ").val(parseInt(bmr));

    });

    /* BMI KALKULATOR */
    $("#potvrdiBmi").click(function() {
        var bmiVisina = $("#bmi-visina").val() / 100;
        var bmiTežina = $("#bmi-težina").val();
        var bmi;

        bmi = bmiTežina / (bmiVisina * bmiVisina);
        $("#rezultatBmi").val(parseFloat(bmi).toFixed(1));

        /* štampa samo do normalna ste težina if else ne radi na dalje */

        if (bmi < 18) {
            $("#rezultat-text").text("Neuhranjeni ste!");
        } else if (bmi < 25) {
            $("#rezultat-text").text("Normalna ste težina!");
        } else if (bmi < 29) {
            $("#rezultat-text").text("Povišena težina!");
        } else {
            $("#rezultat-text").text("Gojazni ste!");
        }



    });


});