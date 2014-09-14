var load = function(co, jsPlumb)
{
//        alert("in load");
 

    var conn = JSON.parse(co);

    var blocks = conn.blocks;
    console.log(blocks.length);
    for (var i = 0; i < blocks.length; i++) {
//            alert("in loop");
        var o = blocks[i];
        console.log(o);
        if ($("#" + o.id).length == 0) {
//                alert("in if");
            var elem = $("<div/>");
            elem.attr('id', o.id);
            elem.css({
                left: o.left,
                top: o.top,
                width: o.width,
                height: o.height,
                position: 'absolute'
            });
            elem.html(o.html);
            elem.attr({
                'class': 'component window'
            });
            $("#kitchensink-demo").append(elem);
        } else {
            $("#" + o.id).css({
                left: o.left,
                top: o.top,
                width: o.width,
                height: o.height
            });
        }
    }
    var connections = conn.connections;
    for (var i = 0; i < connections.length; i++) {
        var connection1 = jsPlumb.connect({
            source: connections[i].sourceId,
            target: connections[i].targetId,
            anchors: connections[i].anchors
        });
        console.log(connection1);
        connections[i].overlays.forEach(function(overlay) {
            connection1.addOverlay([overlay.type, overlay]);
        });
    }
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {
        drag: function() {
            //console.log("DRAG")
        }
    });
};
var save = function(inst)
{

    var connection;
    connection = inst.getAllConnections();
    var blocks = [];
    $(".window").each(function(idx, elem) {
        var $elem = $(elem);
        var id = $elem.attr('id');
//            alert(id);

        blocks.push({
            id: $elem.attr('id'),
            left: parseInt($elem.css("left"), 10),
            top: parseInt($elem.css("top"), 10),
            width: parseInt($elem.css("width"), 10),
            heigth: parseInt($elem.css("heigth"), 10),
            html: $elem.html()

        });
    });
    var connections = [];
    for (var i = 0; i < connection.length; i++) {
//        console.log(connection[i].getOverlay());
        connections.push({
            connectionId: connection[i].id,
            sourceId: connection[i].sourceId,
            targetId: connection[i].targetId,
            sourceEndpointUuid: connection[i].endpoints[0].getUuid(),
            targetEndpointUuid: connection[i].endpoints[1].getUuid(),
            anchors: $.map(connection[i].endpoints, function(endpoint) {
                return [[endpoint.anchor.x,
                        endpoint.anchor.y
                    ]];
            }),
            labelText: connection[i].getLabel(),
            overlays: $.map(connection[i].getOverlays(), function(overlay) {
                var temp = new Array();
                var obj = {};
                for (var key in overlay) {
                    if (typeof overlay[key] !== 'function' && typeof overlay[key] !== 'object' && typeof overlay[key] != 'undefined')
                    {
//                        console.log("i m in inner " + typeof overlay[key]);
                        if (key == 'loc')
                        {
                            obj["location"] = overlay[key];
                        } else {
                            obj[key] = overlay[key];
                        }
                    }
                }
                temp.push(obj);
                return temp;
            })
//            overlays: function() {
//                var temp = [];
//                connection[i].getOverlays().forEach(function(overlay) {
//                    console.log(overlay);
//                    temp.push({
//                        label: overlay.label,
//                        type: overlay.type,
//                        location: overlay.loc,
//                        cssClass: overlay.cssClass,
//                        id:overlay.id
//                        
//                    });
//                });
//                return temp;
//            }()
        });
    }
    console.log(JSON.stringify(connections));
    console.log(JSON.stringify(blocks));

    var obj = {connections: connections, blocks: blocks};
    $("#textarea").val(JSON.stringify(obj));
};

