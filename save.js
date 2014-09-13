var save = function(inst)
    {
        var connection;
        connection = inst.getAllConnections();
        var blocks = [];
        $(".window").each(function(idx, elem) {
            var $elem = $(elem);
            var id = $elem.attr('id');
//            alert(id);
            jsPlumb.selectEndpoints({source: "#"+id}).each(function(endpoint) {
                console.log(endpoint);
            });

            blocks.push({
                id: $elem.attr('id'),
                left: parseInt($elem.css("left"), 10),
                top: parseInt($elem.css("top"), 10),
                width: parseInt($elem.css("width"), 10),
                heigth: parseInt($elem.css("heigth"), 10),
                html: $elem.html(),
                sourceEndpoints: function() {
                    var temp = [];
                    inst.selectEndpoints({
                        source: id
                    }).each(function(endpoint) {
                        temp.push({
                            uuid: endpoint.getUuid(),
                            x: endpoint.anchor.x,
                            y: endpoint.anchor.y,
                            orientation: endpoint.anchor.orientation,
                            offset: endpoint.anchor.offsets,
                            parameters: endpoint.getParameters()
                        });
                    });
                    return temp;
                }()
            });
        });
        var connections=[];
        for (var i = 0; i < connection.length; i++) {
            connections.push({
                connectionId: connection[i].id,
                pageSourceId: connection[i].sourceId,
                pageTargetId: connection[i].targetId,
                sourceEndpointUuid: connection[i].endpoints[0].getUuid(),
                targetEndpointUuid: connection[i].endpoints[1].getUuid(),
                labelText: connection[i].getLabel()
            });
        }
        var obj={connections:connections,blocks:blocks};
        $("#textarea").val(JSON.stringify(obj));
        console.log(JSON.stringify(connections));
        console.log(JSON.stringify(blocks));
    };