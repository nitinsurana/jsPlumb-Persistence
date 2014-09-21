(function(jsPlumb) {
    jsPlumb.load = function(co, jsPlumb) {
        var inst = jsPlumb.getInstance();
        var conn = JSON.parse(co);
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
                $("#kitchensink-demo").append(elem);
            } else {
                $("#" + o.id).css({
                    left: o.left,
                    top: o.top,
                    width: o.width,
                    height: o.height
                });
            }
            //        o.endpoint.forEach(function(endpoint) {
            //            inst.addEndpoint([o.id, endpoint]);
            //        });
        }
        var connections = conn.connections;
        for (var i = 0; i < connections.length; i++) {
            //        console.log(connections[i].endpointStyle);
            var connection1 = jsPlumb.connect({
                source: connections[i].sourceId,
                target: connections[i].targetId,
                anchors: connections[i].anchors,
                paintStyle: connections[i].paintStyle,
                hoverPaintStyle: connections[i].hoverPaintStyle,
                endpointStyles: connections[i].endpointStyle,
                endpoint: [connections[i].endpoint, {
                    url: connections[i].src
                }],
                connector: [connections[i].connectorType, connections[i].connectorAttr],
                labelStyle: {
                    cssClass: connections[i].labelClassName
                }
            });
            console.log(JSON.stringify(connections[i].overlays));
            connections[i].overlays.forEach(function(overlay) {
                connection1.addOverlay([overlay.type, overlay]);
            });
            //        connections[i].endpoint.forEach(function(endpoint) {
            //            jsPlumb.addEndpoint(endpoint.elementId , endpoint);
            //        });
        }
        jsPlumb.draggable(jsPlumb.getSelector(".window"), {
            drag: function() {
                //console.log("DRAG")
            }
        });
    };
    jsPlumb.save = function(inst) {
        //    console.log(inst);
        var connection;
        connection = inst.getAllConnections();
        var blocks = [];
        $(".window").each(function(idx, elem) {
            var $elem = $(elem);
            var id = $elem.attr('id');
            blocks.push({
                id: $elem.attr('id'),
                left: parseInt($elem.css("left"), 10),
                top: parseInt($elem.css("top"), 10),
                width: parseInt($elem.css("width"), 10),
                heigth: parseInt($elem.css("heigth"), 10),
                html: $elem.html(),
            });
        });
        var connections = [];
        for (var i = 0; i < connection.length; i++) {
            var id = connection[i].sourceId;
            var endpoints = inst.getEndpoints(connection[i].sourceId);
            var connector = connection[i].getConnector();
            var type = connector.type;
            var attrs = {};
            switch (type) {
                case "Bezier":
                    attrs["curviness"] = connector.getCurviness();
                    break;
                case "Straight":
                    {
                        // attrs["stub"]=connector.getStub();
                        //attrs["gap"]=connector.getGap();
                        break;
                    }
                case "Flowchart ":
                    {
                        // attrs["stub"]=connector.getStub();
                        // attrs["alwaysRespectStubs "]=connector.getAlwaysRespectStubs ();
                        // attrs["gap"]=connector.getGap();
                        //attrs["midpoint"]=connector.getmidPoint();
                        //attrs["cornerRadius"]=connector.getCornerRadius();
                        break;
                    }
                case "State Machine":
                    {
                        //attrs["margin"]=connector.getMargin();
                        attrs["curviness"] = connector.getCurviness();
                        //attrs["proximityLimit"]=connector.getProximityLimit ();
                        break;
                    }
            }
            connections.push({
                connectorType: type,
                connectorAttr: attrs,
                connectionId: connection[i].id,
                sourceId: connection[i].sourceId,
                targetId: connection[i].targetId,
                sourceEndpointUuid: connection[i].endpoints[0].getUuid(),
                targetEndpointUuid: connection[i].endpoints[1].getUuid(),
                paintStyle: connection[i].getPaintStyle(),
                endpointStyle: function() {
                    var temp = [];
                    connection[i].endpoints.forEach(function(endpoint) {
                        temp.push(endpoint.getPaintStyle());
                    });
                    return temp;
                }(),
                hoverPaintStyle: connection[i].getHoverPaintStyle(),
                //    endpoint: $.map(endpoints, function(endpoint) {
                //    var temp = new Array();
                //   var obj = {};
                //  for (var key in endpoint) {
                //      if (typeof endpoint[key] !== 'function' && typeof endpoint[key] !== 'object' && typeof endpoint[key] != 'undefined')
                //     {
                //         obj[key] = endpoint[key];
                //     }
                // }
                // temp.push(obj);
                //  return temp;
                //}),
                endpoint: connection[i].endpoints[0].type,
                anchors: $.map(connection[i].endpoints, function(endpoint) {
                    return [[endpoint.anchor.x,
                        endpoint.anchor.y,
                    ]];
                }),
                src: connection[i].endpoints[0].canvas.src,
                labelText: connection[i].getLabel(),
                overlays: $.map(connection[i].getOverlays(), function(overlay) {
                    var temp = new Array();
                    var obj = {};
                    for (var key in overlay) {
                        if (typeof overlay[key] !== 'function' && typeof overlay[key] !== 'object' && typeof overlay[key] != 'undefined') {
                            if (key == 'loc') {
                                obj["location"] = overlay[key];
                            } else {
                                obj[key] = overlay[key];
                            }
                        }
                    }
                    obj["cssClass"] = overlay.canvas.className;
                    console.log(connection[i].getLabel());
                    temp.push(obj);
                    return temp;
                }),
                //            sourceEndpoints: function() {
                //                var temp = [];
                //                inst.Endpoints(connection[i]).each(function(endpoint) {
                //                    var tempObj = {
                //                        uuid: endpoint.getUuid(),
                //                        x: endpoint.anchor.x,
                //                        y: endpoint.anchor.y,
                //                        orientation: endpoint.anchor.orientation,
                //                        offset: endpoint.anchor.offsets,
                //                        parameters: endpoint.getParameters()
                //                    };
                //                    temp.push(tempObj);
                //                });
                //            }
                //            connector: $.map(connection[i].connector, function(connector) {
                //                var temp = new Array();
                //                var obj = {};
                //                for (var key in connector) {
                ////                    console.log(connector[key]);
                //                    if (typeof connector[key] !== 'object' && typeof connector[key] != 'undefined')
                //                    {
                //                        obj[key] = connector[key];
                //                    }
                //                }
                //                temp.push(obj);
                //                return temp;
                //
                //            })
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
        //    console.log(JSON.stringify(connections));
        //    console.log(JSON.stringify(blocks));
        var obj = {
            connections: connections,
            blocks: blocks
        };
        $("#textarea").val(JSON.stringify(obj));
    };
}(jsPlumb));