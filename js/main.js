$(document).ready(function() {
    var jsonPath = "profile_data/";
    $.getJSON(jsonPath + "personal.json", function(data) {
        console.log(data);


        $("div#field-icon_url").children('img').attr('src', data["icon_url"]);
        $("div#field-name").children('span').text(data["name"]);
        $("div#field-bio").children('span').text(data["bio"]);
        $("div#field-location").children('span').text(data["location"]);
        $("div#field-mail").children('span').text(data["mail"]);
        $("div#field-url").children('span').text(data["url"]);
        $("div#field-birthdate").children('span').text(data["birthdate"]);

    });
});