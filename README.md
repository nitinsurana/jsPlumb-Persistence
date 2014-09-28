jsPlumb-Persistence
===================


Introduction
--------------

This plugin provides the ability to convert a jsPlumb diagram into a Json &amp; vice-versa.
Hence, providing the ever missing feature of persistence in jsPlumb.



```This plugin adds the following methods, to the jsPlumb global variable :```

```save(plumbInstance)

load(plumbInstace, connectionsArray, nodesDetailArray)

Save the graph connection detail(anchors, overlay, style).
Load the graph ```

Please make sure you load this plugin, after jsPlumb is loaded.

Different modes of saving are supported :
        1. Compact - No look & feel stuff is saved (classes/border/background etc.)
        2. Full - All connections with their styling are saved. 
                NOTE - Nodes styling is not saved, only endpoints/anchors & overlays.
