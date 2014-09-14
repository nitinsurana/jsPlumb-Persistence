jsPlumb.ready(function() {


    var load = function(co, jsPlumb)
    {
        
//        alert("in load");
        var blocks = co.blocks;
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
        var connections = co.connections;
        for (var i = 0; i < connections.length; i++) {
            var connection1 = jsPlumb.connect({
                source: connections[i].sourceId,
                target: connections[i].targetId,
                anchors: connections[i].anchors,
//                overlays: function() {
//                    var temp = new Array();
//                    connections[i].overlays.forEach(function(overlay) {
//                        temp.push(overlay.type, {
//                            label: overlay.label,
//                            location: overlay.loc,
//                            cssClass: overlay.cssClass
//                        });
//                    });
//                    console.log(temp);
//                    return temp;
//                }()
//                overlays: [["Label", {
//                            cssClass: "component label",
//                            label: "4 - 5",
//                            location: 0.3
//                        }]
//
//                ]
            });
            console.log(connection1);
            connections[i].overlays.forEach(function(overlay) {
                connection1.addOverlay([overlay.type, overlay]);
            });

//            connection1.addOverlay([overlay.type, {
//                    label: "HALLO",
//                    location: 0.7,
//                    id: "label",
//                    cssClass: "aLabel"
//                    
//                }]);
        }
        jsPlumb.draggable(jsPlumb.getSelector(".window"), {
            drag: function() {
                //console.log("DRAG")
            }
        });
    };
//    var co =[{"connectionId":"con_5","sourceId":"window1","targetId":"window2","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[0.5,1],[1,0]],"labelText":null,"overlays":[{"type":"Label","visible":true,"isAppendedAtTopLevel":true,"location":0.7,"id":"label","label":"Connection One","labelText":"Connection One"},{"type":"Arrow","visible":true,"isAppendedAtTopLevel":false,"location":0.5,"length":20,"width":20,"id":"arrow"}]},{"connectionId":"con_13","sourceId":"window2","targetId":"window3","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[0.3,1],[0.5,0]],"labelText":null,"overlays":[]},{"connectionId":"con_30","sourceId":"window3","targetId":"window4","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[1,0.5],[0,0.5]],"overlays":[{"cssClass":"component label","type":"Label","visible":true,"isAppendedAtTopLevel":true,"location":0.5,"id":"__label"}]},{"connectionId":"con_39","sourceId":"window5","targetId":"window6","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[0.5,0.5],[0.5,0.5]],"labelText":"big\nendpoints","overlays":[{"cssClass":"component label","type":"Label","visible":true,"isAppendedAtTopLevel":true,"location":0.5,"id":"__label","label":"big\nendpoints","labelText":"big\nendpoints"}]},{"connectionId":"con_44","sourceId":"window4","targetId":"window5","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[1,1],[0,0]],"labelText":null,"overlays":[{"type":"Label","visible":true,"isAppendedAtTopLevel":true,"location":0.3,"label":"4 - 5","labelText":"4 - 5"},{"type":"Arrow","visible":true,"isAppendedAtTopLevel":false,"location":0.5,"length":20,"width":20}]},{"connectionId":"con_52","sourceId":"window3","targetId":"window7","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[null,null],[null,null]],"labelText":null,"overlays":[{"type":"PlainArrow","visible":true,"isAppendedAtTopLevel":false,"location":1,"length":12,"width":18}]},{"connectionId":"con_60","sourceId":"window7","targetId":"window3","sourceEndpointUuid":null,"targetEndpointUuid":null,"anchors":[[null,null],[null,null]],"labelText":null,"overlays":[{"type":"PlainArrow","visible":true,"isAppendedAtTopLevel":false,"location":1,"length":12,"width":18}]}];
//    var blk = [{"id":"window1","left":40,"top":51,"width":79,"heigth":null,"html":"<strong>Window 1</strong>"},{"id":"window2","left":501,"top":174,"width":79,"heigth":null,"html":"<strong>Window 2</strong>"},{"id":"window3","left":40,"top":317,"width":79,"heigth":null,"html":"<strong>Window 3</strong>"},{"id":"window4","left":286,"top":92,"width":79,"heigth":null,"html":"<strong>Window 4</strong>"},{"id":"window5","left":337,"top":460,"width":79,"heigth":null,"html":"<strong>Window 5</strong>"},{"id":"window6","left":655,"top":307,"width":80,"heigth":null,"html":"<strong>Window 6</strong>"},{"id":"window7","left":61,"top":532,"width":80,"heigth":null,"html":"<strong>Window 7</strong>"}];
    var co = {"connections": [{"connectionId": "con_5", "sourceId": "window1", "targetId": "window2", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[0.5, 1], [1, 0]], "labelText": null, "overlays": [{"type": "Label", "visible": true, "isAppendedAtTopLevel": true, "location": 0.7, "id": "label", "label": "Connection One", "labelText": "Connection One"}, {"type": "Arrow", "visible": true, "isAppendedAtTopLevel": false, "location": 0.5, "length": 20, "width": 20, "id": "arrow"}]}, {"connectionId": "con_13", "sourceId": "window2", "targetId": "window3", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[0.3, 1], [0.5, 0]], "labelText": null, "overlays": []}, {"connectionId": "con_30", "sourceId": "window3", "targetId": "window4", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[1, 0.5], [0, 0.5]], "overlays": [{"cssClass": "component label", "type": "Label", "visible": true, "isAppendedAtTopLevel": true, "location": 0.5, "id": "__label"}]}, {"connectionId": "con_39", "sourceId": "window5", "targetId": "window6", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[0.5, 0.5], [0.5, 0.5]], "labelText": "big\nendpoints", "overlays": [{"cssClass": "component label", "type": "Label", "visible": true, "isAppendedAtTopLevel": true, "location": 0.5, "id": "__label", "label": "big\nendpoints", "labelText": "big\nendpoints"}]}, {"connectionId": "con_44", "sourceId": "window4", "targetId": "window5", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[1, 1], [0, 0]], "labelText": null, "overlays": [{"type": "Label", "visible": true, "isAppendedAtTopLevel": true, "location": 0.3, "label": "4 - 5", "labelText": "4 - 5"}, {"type": "Arrow", "visible": true, "isAppendedAtTopLevel": false, "location": 0.5, "length": 20, "width": 20}]}, {"connectionId": "con_52", "sourceId": "window3", "targetId": "window7", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[null, null], [null, null]], "labelText": null, "overlays": [{"type": "PlainArrow", "visible": true, "isAppendedAtTopLevel": false, "location": 1, "length": 12, "width": 18}]}, {"connectionId": "con_60", "sourceId": "window7", "targetId": "window3", "sourceEndpointUuid": null, "targetEndpointUuid": null, "anchors": [[null, null], [null, null]], "labelText": null, "overlays": [{"type": "PlainArrow", "visible": true, "isAppendedAtTopLevel": false, "location": 1, "length": 12, "width": 18}]}], "blocks": [{"id": "window1", "left": 40, "top": 51, "width": 79, "heigth": null, "html": "<strong>Window 1</strong>"}, {"id": "window2", "left": 501, "top": 174, "width": 79, "heigth": null, "html": "<strong>Window 2</strong>"}, {"id": "window3", "left": 40, "top": 317, "width": 79, "heigth": null, "html": "<strong>Window 3</strong>"}, {"id": "window4", "left": 286, "top": 92, "width": 79, "heigth": null, "html": "<strong>Window 4</strong>"}, {"id": "window5", "left": 337, "top": 460, "width": 79, "heigth": null, "html": "<strong>Window 5</strong>"}, {"id": "window6", "left": 655, "top": 307, "width": 80, "heigth": null, "html": "<strong>Window 6</strong>"}, {"id": "window7", "left": 61, "top": 532, "width": 80, "heigth": null, "html": "<strong>Window 7</strong>"}]};
    load(co, jsPlumb);
});


