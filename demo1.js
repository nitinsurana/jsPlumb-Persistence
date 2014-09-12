jsPlumb.ready(function() {


    var load = function(blocks, connections, jsPlumb)
    {
        alert("in load");

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
//        connections = localStorage.getItem("connections");
        for (var i = 0; i < connections.length; i++) {
            var connection1 = jsPlumb.connect({
                source: connections[i].pageSourceId,
                target: connections[i].pageTargetId,
                anchors: connections[i].anchors
            });
        }
        jsPlumb.addEndpoints("#" + o.id, {
            endpoint: "Square",
            anchor: ["Perimeter", {shape: "Square", anchorCount: 150}]
        });
    };


    var co = [{"connectionId": "con_5", "pageSourceId": "window1", "pageTargetId": "window2", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": null}, {"connectionId": "con_13", "pageSourceId": "window2", "pageTargetId": "window3", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": null}, {"connectionId": "con_30", "pageSourceId": "window3", "pageTargetId": "window4", "sourceEndpointUuid": null, "targetEndpointUuid": null}, {"connectionId": "con_39", "pageSourceId": "window5", "pageTargetId": "window6", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": "big\nendpoints"}, {"connectionId": "con_44", "pageSourceId": "window4", "pageTargetId": "window5", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": null}, {"connectionId": "con_52", "pageSourceId": "window3", "pageTargetId": "window7", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": null}, {"connectionId": "con_60", "pageSourceId": "window7", "pageTargetId": "window3", "sourceEndpointUuid": null, "targetEndpointUuid": null, "labelText": null}];
    var blk = [{"id": "window1", "left": 40, "top": 51, "width": 79, "heigth": null, "html": "<strong>Window 1</strong>", "sourceEndpoints": []}, {"id": "window2", "left": 501, "top": 174, "width": 79, "heigth": null, "html": "<strong>Window 2</strong>", "sourceEndpoints": []}, {"id": "window3", "left": 40, "top": 317, "width": 79, "heigth": null, "html": "<strong>Window 3</strong>", "sourceEndpoints": []}, {"id": "window4", "left": 286, "top": 92, "width": 79, "heigth": null, "html": "<strong>Window 4</strong>", "sourceEndpoints": []}, {"id": "window5", "left": 337, "top": 460, "width": 79, "heigth": null, "html": "<strong>Window 5</strong>", "sourceEndpoints": []}, {"id": "window6", "left": 655, "top": 307, "width": 80, "heigth": null, "html": "<strong>Window 6</strong>", "sourceEndpoints": []}, {"id": "window7", "left": 61, "top": 532, "width": 80, "heigth": null, "html": "<strong>Window 7</strong>", "sourceEndpoints": []}];
    load(blk, co, jsPlumb);


});


