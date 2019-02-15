export const newJsPage = function (testVariableFromController) {
    $('#messageOnThisPage').text(testVariableFromController);
    $(".dropdown-toggle").dropdown();
    console.log("hey!");
};