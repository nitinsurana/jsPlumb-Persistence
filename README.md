jsPlumb-Persistence
===================


Introduction
--------------

This plugin provides the ability to convert a jsPlumb diagram into a Json &amp; vice-versa.
Hence, providing the ever missing feature of persistence in jsPlumb.


This plugin adds the following methods, to the jsPlumb global variable :

```
save(options,plumbInstance)             //Returns a Javascript Object

where options contains the following :

selector (required)           -   a valid jquery selector to select the nodes/blocks associated with the connection
```


```
load(options, plumbInstance)

where options contains the following attributes :

savedObj (required)           -   the javascript object that was saved
containerSelector (required)  -   a valid jquery selector pointing to the container in which the diagram is to be loaded
```


The plugin saves the graph connection details, anchors, overlays & style.


How To Use
-------------

`var savedObj = jsPlumb.save({selector : ".window" });    //If no plumbInstance is passed then global jsPlumb variable is used`

`jsPlumb.load({savedObj : savedObj, containerSelector : "#kitchensink-demo"});          //If no plumbInstance is passed then global jsPlumb variable is used`
  



**Note**:Please make sure to load this plugin, after jsPlumb is loaded.


[Demos](http://coding-idiot.github.io/jsPlumb-Persistence/)
