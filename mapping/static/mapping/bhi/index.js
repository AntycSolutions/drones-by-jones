
// DefaultOptionsWorld.js
OpenLayers.Util.onImageLoadErrorColor = "transparent";
// https://trac.osgeo.org/openlayers/wiki/FrequentlyAskedQuestions#ProxyHost
// OpenLayers.ProxyHost = "/host.ashx?url="
// OpenLayers.ProxyHost = "heron/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = (
    'https://extjs.cachefly.net/ext-3.4.0/resources/images/default/s.gif'
);

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Ext.namespace("Heron.options.map");

Heron.options.map.settings = {
    projection: 'EPSG:26912',
    units: 'm',
    // resolutions: Heron.options.serverResolutions.zoom_0_16,
    resolutions: [
        88.1944445344028,
        35.2777778137611,
        17.6388889068806,
        8.81944445344028,
        3.52777778137611,
        1.76388889068806,
        0.881944445344028
    ],
    /*
        resolutions: [
            176.388889068806,
            88.1944445344028,
            35.2777778137611,
            17.6388889068806,
            8.81944445344028,
            3.52777778137611,
            1.76388889068806,
            0.881944445344028,
            0.352777778137611,
            0.176388889068806,
            0.0881944445344028
        ],
        maxExtent: new OpenLayers.Bounds(
            368436.099804558,
            5924256.6788872,
            382434.259100775,
            5934331.36360633
        ),
    */
    maxExtent: '336760.0,5893300.0,398220.0,5964010.0',

    center: '366465.0,5928440.0',

    xy_precision: 3,
    max_features: 10,
    zoom: 0,
    theme: null,

    /*
     * Useful to always have permalinks enabled. default is enabled with
     *  these settings.
     * MapPanel.getPermalink() returns current permalink
     */
    permalinks: {
        // The prefix to be used for parameters, e.g. map_x, default is 'map'
        paramPrefix: 'map',
        // Encodes values of permalink parameters ? default false
        encodeType: false,
        // Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks
        prettyLayerNames: true
    },

    /* You can always control which controls are to be added to the map. */
    /*
        controls : [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.ZoomBox(),
            new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
            new OpenLayers.Control.LoadingPanel(),
            new OpenLayers.Control.PanPanel(),
            new OpenLayers.Control.ZoomPanel(),
            new OpenLayers.Control.OverviewMap(),
            new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})
        ]
    */
};

// TODO see how we can set/override Map OpenLayers Controls
// Heron.options.map.controls = [
//     new OpenLayers.Control.ZoomBox(),
//     new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200}),
// ];
Ext.namespace("Heron.options.wfs");

Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv',
    },
    {
        name: 'GML (version 2.1.2)',
        outputFormat: 'text/xml; subtype=gml/2.1.2',
        fileExt: '.gml',
    },
    {
        name: 'ESRI Shapefile (zipped)',
        outputFormat: 'SHAPE-ZIP',
        fileExt: '.zip',
    },
    {
        name: 'GeoJSON',
        outputFormat: 'json',
        fileExt: '.json',
    },
];

/*
 * Layers to be added to the map.
 * Syntax is defined in OpenLayers Layer API.
 * "isBaseLayer: true" means the layer will be added as base/background layer.
 */
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */
    // May use new NASA WMTS:
    // http://onearth.jpl.nasa.gov/wms.cgi?request=GetCapabilities

    /*
     * BHI Images
     */

    /*
        new OpenLayers.Layer(
            "None", {isBaseLayer: true, displayInLayerSwitcher: true}
        ),
     */
    new OpenLayers.Layer("None", {isBaseLayer: true, visibility: false}),

    new OpenLayers.Layer.WMS(
        "OrthoBase",
        'Ortho/',
        {layers: "col_bw", format: 'image/jpeg'},
        {
            isBaseLayer: true,
            visibility: true,
            singleTile: false,
            noLegend: true,
            transitionEffect: 'resize',
        }
    ),

    /*
        new OpenLayers.Layer.WMS(
            "SpotMS",
            // doesn't exist
            'BHIWET/',
            {
                layers: "test10jp2",
                format: 'image/png',
                isBaseLayer: true,
                visibility: true,
                singleTile: false,
                noLegend: true,
                transitionEffect: 'resize',
            }
        ),
     */

    /*
     * ==================================
     *            Overlays
     * ==================================
     */
    new OpenLayers.Layer.WMS(
        "Agriculture Capability",
        'AgCap/',
        {layers: "agcapg", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
            featureInfoFormat: 'application/vnd.ogc.gml',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                },
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "Core Areas",
        'Core/',
        {layers: "coreg", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Environmental Sensitivity",
        'ESM/',
        {layers: "esmg", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Connected Habitats",
        'Con_Hab/',
        {layers: "connhabg", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Ground Water Risk",
        'GWRisk/',
        {layers: "gwriskg", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Surface Water Risk QTR",
        'SWRiskQTR/',
        {layers: "swriskq", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Potential Land Use Map",
        'PLUM/',
        {layers: "plumall", format: 'image/png'},
        {
            isBaseLayer: false,
            visibility: false,
            transparent: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Railways",
        'Transp/',
        {layers: "Rail", format: 'image/png', transparent: true},
        {
            isBaseLayer: false,
            visibility: false,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "Roads",
        'Transp/',
        {layers: "Road", format: 'image/png', transparent: true},
        {
            isBaseLayer: false,
            visibility: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "ATS Sections",
        'ATS/',
        {layers: "SEC", format: 'image/png', transparent: true},
        {
            isBaseLayer: false,
            visibility: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
    new OpenLayers.Layer.WMS(
        "ATS Township",
        'ATS/',
        {layers: "TWP", format: 'image/png', transparent: true},
        {
            isBaseLayer: false,
            visibility: true,
            singleTile: false,
            noLegend: false,
            transitionEffect: 'resize',
        }
    ),
];



// hConfig.js
Ext.namespace("Heron.options");

/* See ToolbarBuilder.js : each string item points to a definition
 * in Heron.ToolbarBuilder.defs. Extra options and even an item create function
 * can be passed here as well. "-" denotes a separator item.
 * By providing a "create" function your own toolbar item can be added.
 * For menu's and other standard ExtJS Toolbar items, the "any" type can be
 * used. There you need only pass the options, similar as in the function
 * ExtJS Toolbar.add().
 */
Heron.options.map.toolbar = [
    {type: "scale", options: {width: 110}},
    {type: "-"},
    /*
        {type: "featureinfo", options: {
            popupWindow: {
                width: 360,
                height: 200,
                featureInfoPanel: {
                    // Option values are 'Grid', 'Tree' and 'XML',
                    //  default is 'Grid' (results in no display menu)
                    displayPanels: ['Grid', 'XML', 'Tree'],
                    // Export to download file. Option values are 'CSV',
                    //  'XLS', default is no export (results in no export menu).
                    exportFormats: ['CSV', 'XLS'],
                    maxFeatures: 10,
                },
            },
        }},
        {type: "-"},
     */
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    // {type: "coordinatesearch", options: {
    //     onSearchCompleteZoom: 8, fieldLabelX: 'lon', fieldLabelY: 'lat'
    // }},
    {type: "-"} ,
    {type: "printdirect", options: {
        url: 'http://geo.solsticecanada.com:8080/print-servlet-1.1/pdf',
        mapTitle: 'My Title - Direct Print',
        // mapTitleYAML: "mapTitle",
        // // MapFish - field name in config.yaml - default is: 'mapTitle'
        // mapComment: 'My Comment - Direct Print',
        // mapCommentYAML: "mapComment",
        // // MapFish - field name in config.yaml - default is: 'mapComment'
        // mapFooter: 'My Footer - Direct Print',
        // mapFooterYAML: "mapFooter",
        // // MapFish - field name in config.yaml - default is: 'mapFooter'
        // mapPrintLayout: "A4",
        // // MapFish - 'name' entry of the 'layouts' array or
        // //  Null (=> MapFish default)
        // mapPrintDPI: "75",
        // // MapFish - 'value' entry of the 'dpis' array or
        // //  Null (=> MapFish default)
        // mapPrintLegend: true,
        // legendDefaults: {
        //     useScaleParameter : false,
        //     baseParams: {FORMAT: "image/png"},
        // },
    }},
    {type: "printdialog", options: {
        url: 'http://geo.solsticecanada.com:8080/print-servlet-1.1/pdf',
        windowWidth: 360,
        // showTitle: true,
        // mapTitle: 'My Header - Print Dialog',
        // mapTitleYAML: "mapTitle",
        // // MapFish - field name in config.yaml - default is: 'mapTitle'
        // showComment: true,
        // mapComment: 'My Comment - Print Dialog',
        // mapCommentYAML: "mapComment",
        // // MapFish - field name in config.yaml - default is: 'mapComment'
        // showFooter: true,
        // mapFooter: 'My Footer - Print Dialog',
        // mapFooterYAML: "mapFooter" ,
        // // MapFish - field name in config.yaml - default is: 'mapFooter'
        // showRotation: true,
        // showLegend: true,
        // showLegendChecked: true,
        // mapLimitScales: false,
    }},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    // {type: "measurelength", options: {geodesic: true}},
    // {type: "measurearea", options: {geodesic: true}},
    {type: "measurelength", options: {geodesic: false}},
    {type: "measurearea", options: {geodesic: false}},
    {type: "-"},
    {type: "addbookmark"},
];

Heron.options.bookmarks = [
    /*
        {
            id: 'tnotoch',
            name: 'TNO Boorgaten',
            desc: 'een voorbeeld van een TNO Dino Services',
            layers: ['OpenStreetMap', 'TNO Boorgaten'],
            x: 133993,
            y: 473167,
            zoom: 10
        },
        {
            id: 'debrughaha',
            name: 'Kadaster - De Brug',
            desc: 'een voorbeeld van een Place2',
            layers: ['Luchtfoto (PDOK)'],
            x: 194194,
            y: 465873,
            zoom: 13
        }
    */
];



// DefaultConfig.js
Ext.namespace("Heron.options.layertree");

/*
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://docs.sencha.com/ext-js/3-4/#!/api
 *
 * This is the core config, mainly the layout of a Heron browser application for all examples.
 * Many of the options refer to Javascript variables that are defined within
 * the DefaultOptions*.js. In particular Layers and specific widgets. This has been done
 * to create a reusable config for all examples. Each example may also add a 3rd refinement
 * using a local Config.js file. The names of the config files and variables like Heron.options.bookmarks
 * don't matter. They are just a convenience as to break up a large configuration into
 * the more stable common parts and the more variable parts. As it is all JSON/JavaScript, we
 * can use variables, in our case namespaced, like "Heron.options.bookmarks" as to avoid conflicts in
 * the global JS namespace. (If we would have XML configs we would have to resort to xlinks).
 *
 */
Heron.layout = {
    xtype: 'panel',

    // Optional ExtJS Panel properties here, like "border", see ExtJS API docs.
    id: 'hr-container-main',
    layout: 'border',
    border: true,

    /*
        Any classes in "items" and nested items are automatically
         instantiated (via "xtype") and added by ExtJS.
     */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region : "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    border: true,

                    // The LayerTree tree nodes appearance: default is
                    //  ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be
                    //  overridden in specific 'gx_layer' type config.
                    layerIcons : 'bylayertype',

                    // Allow moving layers
                    enableDD: true,

                    // Right-mouse popoup menu
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
                    // Optional, use internal default if not set
                    hropts: Heron.options.layertree
                },

                /*
                    {
                        xtype: 'hr_htmlpanel',
                        id: 'hr-info-west',
                        html: Heron.options.info.html,
                        preventBodyReset: true,
                        title: 'Info'
                    },
                */
                {
                    xtype: 'hr_bookmarkspanel',
                    id: 'hr-bookmarks',
                    //The map contexts to show links for in the BookmarksPanel.
                    hropts: Heron.options.bookmarks
                },
            ],
        },
        {
            xtype: 'panel',
            id: 'hr-map-and-info-container',
            layout:'border',
            region:'center',
            width:'100%',
            collapsible:false,
            split:false,
            border:false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    id: 'hr-map',
                    title: '&nbsp;',
                    region: 'center',
                    collapsible : false,
                    border: false,
                    hropts: Heron.options.map,
                },
            ],
        },
        {
            xtype: 'panel',
            id: 'hr-menu-right-container',
            layout: 'accordion',
            region : "east",
            width: 240,
            collapsible: true,
            split   : false,
            border: false,
            items: [
                {
                    xtype: 'hr_layerlegendpanel',
                    id: 'hr-layerlegend-panel',
                    defaults: {
                        useScaleParameter : true,
                        baseParams: {
                            FORMAT: 'image/png',
                        },
                    },
                    hropts: {
                        // Preload Legends on initial startup
                        // Will fire WMS GetLegendGraphic's for WMS Legends
                        // Otherwise Legends will be loaded only when Layer
                        // becomes visible. Default: false
                        prefetchLegends: false,
                    },
                },
            ],
        },
    ],
};
