
 var save = function(inst)
    {
        var connection;
        connection = inst.getAllConnections();
        var blocks = [];
        $(".window").each(function(idx, elem) {
            var $elem = $(elem);
            var id = $elem.attr('id');
//            alert(id);
            var end = inst.selectEndpoints({source: id}).each(function(endpoint) {
                console.log(endpoint);
            });
            console.log(end.getParameters());
            blocks.push({
                id: $elem.attr('id'),
                left: parseInt($elem.css("left"), 10),
                top: parseInt($elem.css("top"), 10),
                width: parseInt($elem.css("width"), 10),
                heigth: parseInt($elem.css("heigth"), 10),
                html: $elem.html()

            });
        });
		 var connections=[];
        for (var i = 0; i < connection.length; i++) {
            console.log(connection[i].endpoints[0]);
            connections.push({
                connectionId: connection[i].id,
                pageSourceId: connection[i].sourceId,
                pageTargetId: connection[i].targetId,
                sourceEndpointUuid: connection[i].endpoints[0].getUuid(),
                targetEndpointUuid: connection[i].endpoints[1].getUuid(),

                anchors: $.map(connection[i].endpoints, function(endpoint) {
                    return [[endpoint.anchor.x,
                            endpoint.anchor.y
                        ]];
                }),
                labelText: connection[i].getLabel()
               
            });
        }
        console.log(JSON.stringify(connections));
        console.log(JSON.stringify(blocks));
		
		var obj={connections:connections,blocks:blocks};
        $("#textarea").val(JSON.stringify(obj));
        console.log(JSON.stringify(connections));
        console.log(JSON.stringify(blocks));
    };

