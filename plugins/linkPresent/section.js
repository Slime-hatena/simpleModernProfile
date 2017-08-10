$.getJSON("plugins/linkPresent/option.json", function(data) {
    $.each(data['section'], function(index, val) {
        str = "<h3>" + val['title'] + "</h3><div>" +
            '<a href="' + val['url'] + '" target="_blank">' +
            val['url'] + '</a><img src="http://mozshot.nemui.org/shot/large?' + val['url'] + '"><p>' + val['description'] + '</p></div>';
        $(".linkPresent").append(str);
    });
});