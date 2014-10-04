
(function(jsPlumbInstance) {
    jsPlumbInstance.load = function(options,plumbInstance)
    {
        if(!options || !options.savedObj || !options.containerSelector){
            return;
        }
        var conn=options.savedObj;
        plumbInstance = plumbInstance || jsPlumb;
        var blocks = conn.blocks;
        for (var i = 0; i < blocks.length; i++) {
            var o = blocks[i];
            if ($("#" + o.id).length == 0) {
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
                $(options.containerSelector).append(elem);
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
            console.log(connections[i].endpoint);

            var connection1 = plumbInstance.connect({
                source: connections[i].sourceId,
                target: connections[i].targetId,
                anchors: function()
                {
                    var temp = [];
                    connections[i].anchors.forEach(function(anc)
                    {
                        if (anc.type) {
                            temp.push(anc.type);
                        }
                        else {
                            var x = anc.x;
                            var y = anc.y;
                            var arr = [x, y].concat(anc.orientation).concat(anc.offset);
                            temp.push(arr);
                        }
                    });
                    return temp;
                }(),
                paintStyle: connections[i].paintStyle,
                hoverPaintStyle: connections[i].hoverPaintStyle,
                endpointStyles: connections[i].endpointStyle,
                endpoints: connections[i].endpoint,
                connector: [connections[i].connectorType, connections[i].connectorAttr],
                labelStyle: {
                    cssClass: connections[i].labelClassName
                }
            });
            connections[i].overlays.forEach(function(overlay) {
                connection1.addOverlay([overlay.type, overlay]);
            });
        }
        plumbInstance.draggable(plumbInstance.getSelector(options.savedObj.selector), {
            drag: function() {
            }
        });
    };


    jsPlumbInstance.save = function(options,plumbInstance)
    {
        if(!options || !options.selector){
            return {};
        }
        plumbInstance = plumbInstance || jsPlumb;
        var connection;
        connection = plumbInstance.getAllConnections();
        var blocks = [];
        $(options.selector).each(function(idx, elem) {
            var $elem = $(elem);
            var id = $elem.attr('id');
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
            var id = connection[i].sourceId;
            var endpoints = plumbInstance.getEndpoints(connection[i].sourceId);
            var connector = connection[i].getConnector();
            var type = connector.type;
            var attrs = {};
            switch (type) {
                case "Bezier":
                    attrs["curviness"] = connector.getCurviness();
                    break;
                case "Straight":
                    {
                        break;
                    }
                case "Flowchart ":
                    {
                        break;
                    }
                case "State Machine":
                    {
                        attrs["curviness"] = connector.getCurviness();
                        break;
                    }
            }
            var endpointArray = [];
            connection[i].endpoints.forEach(function(endpoint) {
                var options = {};
                if (endpoint.type == 'Image')
                {
                    options.url = endpoint.canvas.src;
                    options.anchor = endpoint.anchor;
                    endpointArray.push([endpoint.type, options]);
                } else
                {
                    options.anchor = endpoint.anchor;
                    endpointArray.push([endpoint.type, options]);
                }
                console.log(options);
            });

            connections.push({
                path: connector.getPath(),
                segment: connector.getSegments(),
                connectorType: type,
                connectorAttr: attrs,
                connectionId: connection[i].id,
                sourceId: connection[i].sourceId,
                targetId: connection[i].targetId,
                sourceEndpointUuid: connection[i].endpoints[0].getUuid(),
                targetEndpointUuid: connection[i].endpoints[1].getUuid(),
                paintStyle: connection[i].getPaintStyle(),
                endpointStyle: function()
                {
                    var temp = [];
                    connection[i].endpoints.forEach(function(endpoint) {
                        temp.push(endpoint.getPaintStyle());
                    });
                    return temp;
                }(),
                hoverPaintStyle: connection[i].getHoverPaintStyle(),
                endpoint: endpointArray,
                anchors: function()
                {
                    var temp = [];
                    connection[i].endpoints.forEach(function(endpoint) {
                        var tempObj = {
                            uuid: endpoint.getUuid(),
                            x: endpoint.anchor.x,
                            y: endpoint.anchor.y,
                            orientation: endpoint.anchor.orientation,
                            offset: endpoint.anchor.offsets,
                            parameters: endpoint.getParameters(),
                            type: endpoint.anchor.type
                        };
                        temp.push(tempObj);
                    });
                    return temp;
                }(),
                labelText: connection[i].getLabel(),
                overlays: $.map(connection[i].getOverlays(), function(overlay) {
                    var temp = new Array();
                    var obj = {};
                    for (var key in overlay) {
                        if (typeof overlay[key] !== 'function' && typeof overlay[key] !== 'object' && typeof overlay[key] != 'undefined')
                        {
                            if (key == 'loc')
                            {
                                obj["location"] = overlay[key];
                            } else {
                                obj[key] = overlay[key];
                            }
                        }
                    }
                    obj["cssClass"] = overlay.canvas.className;
                    temp.push(obj);
                    return temp;
                })
            });
        }

        var obj = {selector:options.selector,connections: connections, blocks: blocks};
        return obj;
    };

})(jsPlumb);