$.getJSON("plugins/personalData/option.json", function(data) {
    $("div#field-location").children('span').text(data["location"]);
    $("div#field-mail").children('span').text(data["mail"]);
    $("div#field-url").children('a').children('span').text(data["url"]);
    $("div#field-url").children('a').attr('href', data["url"]);
    $("div#field-birthdate").children('span').text(data["birthdate"]);
});