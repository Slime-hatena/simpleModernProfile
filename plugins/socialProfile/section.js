$.getJSON("plugins/socialProfile/option.json", function(data) {
    $.each(data, function(index, val) {
        var str = index;
        var isName = (val['name'] !== false ? true : false);
        var isIcon = (val['icon'] !== false ? true : false);
        var isLink = (val['link'] !== false ? true : false);

        str = "<div>" + (isIcon ? val['icon'] : "□") +
            (isLink ? '<a href="' + val['link'] + '" target="_blank">' : "") +
            index +
            (isName ? ":  " + val['name'] : "") +
            (isLink ? '</a>' : "") + "</div>";

        /*
                if (val['name'] !== false) {
                    str += ": " + val['name'];
                }

                if (val['icon'] !== false) {
                    str = val['icon'] + str;
                }

                if (val['link'] !== false) {
                    str = '<div>< + str + ' < /a></div > ';
                }
                */

        $("#socialProfileAppend").append(str);

    });
});