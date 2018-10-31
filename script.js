

$(function () {
    var options = {
        width: 6,
        float: false,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    $('#grid1').gridstack(options);
    $('#grid2').gridstack(_.defaults({
        float: true
    }, options));
    $('#grid3').gridstack(options);
    $('#grid4').gridstack(options);
    $('#grid5').gridstack(options);
    $('#grid6').gridstack(options);
    $('#grid7').gridstack(options);
    var items = [
        {x: 0, y: 0, width: 2, height: 2},
        {x: 3, y: 1, width: 1, height: 2},
        //{x: 4, y: 1, width: 1, height: 1},
        //{x: 2, y: 3, width: 3, height: 1},
        {x: 2, y: 5, width: 1, height: 1}
    ];

    $('.grid-stack').each(function () {
        var grid = $(this).data('gridstack');

        _.each(items, function (node) {
            grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
        }, this);
    });

    $('.sidebar .grid-stack-item').draggable({
        revert: 'invalid',
        handle: '.grid-stack-item-content',
        scroll: false,
        appendTo: 'body'
    });


    $(".sidebar .grid-stack-item").on("remove", function () {
        $(".sidebar").append('<div class="grid-stack-item"><div class="grid-stack-item-content">Drag me</div></div>');

        $('.sidebar .grid-stack-item').draggable({
            revert: 'invalid',
            handle: '.grid-stack-item-content',
            scroll: false,
            appendTo: 'body'
        });

    });
});
