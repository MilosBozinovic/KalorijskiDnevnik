$(document).ready(function() {
    $("#search-namirnice").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tabela-namirnice tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});