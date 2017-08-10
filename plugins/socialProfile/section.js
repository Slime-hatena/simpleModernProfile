$.getJSON("plugins/socialProfile/option.json", function(data) {
    $.each(data, function(index, val) {
        var str = index;
        var isName = (val['name'] !== false ? true : false);
        var isIcon = (val['icon'] !== false ? true : false);
        var isLink = (val['link'] !== false ? true : false);

        str = '<div><span class="service_icon">' + (isIcon ? val['icon'] : "□") + "</span>" +
            (isLink ? '<a href="' + val['link'] + '" target="_blank">' : "") +
            index +
            (isName ? ":  " + val['name'] : "") +
            (isLink ? '</a>' : "") + "</div>";

        $("#socialProfileAppend").append(str);

    });
});