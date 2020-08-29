/*init*/
var map = new _map({
    name: 'merianplan2d',
    units: 3,
    resolution: 96,
    scales: new Array(2000, 1000, 500),
    keymapExtents: new Array(607312.878788, 262759.659091, 620487.121212, 272640.340909)
});
map.setDefaultExtents(598500, 253000, 629300, 282400);
map.setMaxExtents(598500, 253000, 629300, 282400);
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_200',
    index: -0.001,
    imageformat: 'palette_parzplan_farbig_1000_500',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_farb',
    scales: new Array(0, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_500',
    index: 0.999,
    imageformat: 'palette_parzplan_farbig_1000_500',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_farb',
    scales: new Array(0, 0, 1)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_1000',
    index: 1.999,
    imageformat: 'palette_parzplan_farbig_1000_500',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_farb',
    scales: new Array(0, 1, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_2000',
    index: 2.999,
    imageformat: 'palette_parzplan_farbig_2000',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_farb',
    scales: new Array(1, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_GRAU_200',
    index: 3.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_grau',
    scales: new Array(0, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_GRAU_500',
    index: 4.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_grau',
    scales: new Array(0, 0, 1)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_GRAU_1000',
    index: 5.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_grau',
    scales: new Array(0, 1, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_GRAU_2000',
    index: 6.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_grau',
    scales: new Array(1, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_SW_200',
    index: 7.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_sw',
    scales: new Array(0, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_SW_500',
    index: 8.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_sw',
    scales: new Array(0, 0, 1)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_SW_1000',
    index: 9.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_stadt_parzplan_sw',
    scales: new Array(0, 1, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PARZPLAN_VEKTOR_SW_2000',
    index: 10.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    layerMaxextent: new Array(608000, 262500, 620000, 273000),
    printgroup: 'layerobj_citymap_parz_sw',
    scales: new Array(1, 0, 0)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_FALKNERPLAN',
    index: 51.999,
    imageformat: 'png8_t',
    tileSource: 'cache',
    scales: new Array(1, 1, 1)
}));
map.addLayer(new _layer({
    name: 'LAYEROBJ_PM_2D',
    index: 52.999,
    opacity: 30,
    imageformat: 'png8_t',
    tileSource: 'cache',
    type: 'polygon',
    tileDistanceX: 1000,
    tileDistanceY: 1000,
    highlight: true,
    tooltip: true,
    objectId: 'the_id',
    legendicon: 'merianplan-2d-falknerplan.png',
    metadata: {
        polygon: {
            color: '#aa0000',
            bcolor: '#000000',
            stroke: 1,
            opacity: 0,
            symbolscale: 0
        }
    },
    scales: new Array(1, 1, 1)
}));
map.aLayers.sort(mySortLayers);
map.resolution = 96;
myKaMap.addMap(map);
myKaMap.webCache = '../tmp/kacache/';
myKaMap.metaWidth = 6;
myKaMap.metaHeight = 6;
myKaMap.tileWidth = 256;
myKaMap.tileHeight = 256;
var map = myKaMap.aMaps['merianplan2d'];
map.aZoomTo = new Array(611356.24, 267579.86, 2000);
szMap = gogisPreviouseMap = 'merianplan2d';
myKaMap.selectMap('merianplan2d');
myXmlOverlay.init(myKaMap.getCurrentMap().defaultExtents);
myGogisOverlay.init(myXmlOverlay, myKaMap.getCurrentMap().defaultExtents);
myKaKeymap.imgWidth = 168;
myKaKeymap.imgHeight = 126;
gogisCurrentTheme = 1;
handleLegendThemeResponse({
    "root": [{
        "id_maptheme": "1",
        "themename": "THEME_MERIANPLAN_2D",
        "themedescription": "THEMEDESCR_MERIANPLAN_2D",
        "themeoverviewmap": "keymap-basel.gif",
        "themepriority": "2",
        "defaulttheme": "f",
        "defaultminscale": "2000",
        "defaultmaxscale": "-1",
        "themegroupname": "",
        "themegroupdescription": "",
        "thememapfile": "",
        "thememetaurl": "",
        "themeinfo": "0"
    }]
}, {
    'root': [{
        'group': [{
            'numlayers': '5',
            'active': '0',
            'grouptype': '3',
            'maingrouptype': '1',
            'name': 'BASEMAP',
            'description': 'BASEMAPDESCR',
            'layer': [{
                'icon': 'tmp/',
                'defaultlayer': 't',
                'name': 'LAYEROBJ_FALKNERPLAN',
                'description': 'LAYEROBJDESCR_FALKNERPLAN',
                'basemapgroup': '1'
            }, {
                'icon': 'tmp/',
                'defaultlayer': 'f',
                'name': 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_2000',
                'description': 'LAYEROBJDESCR_PARZPLAN_VEKTOR_FARB_2000',
                'basemapgroup': '3'
            }, {
                'icon': 'tmp/',
                'defaultlayer': 'f',
                'name': 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_1000',
                'description': 'LAYEROBJDESCR_PARZPLAN_VEKTOR_FARB_1000',
                'basemapgroup': '3'
            }, {
                'icon': 'tmp/',
                'defaultlayer': 'f',
                'name': 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_500',
                'description': 'LAYEROBJDESCR_PARZPLAN_VEKTOR_FARB_500',
                'basemapgroup': '3'
            }, {
                'icon': 'tmp/',
                'defaultlayer': 'f',
                'name': 'LAYEROBJ_PARZPLAN_VEKTOR_FARB_200',
                'description': 'LAYEROBJDESCR_PARZPLAN_VEKTOR_FARB_200',
                'basemapgroup': '3'
            }]
        }, {
            'numlayers': '1',
            'active': '1',
            'grouptype': '1',
            'maingrouptype': '1',
            'name': 'LAYEROBJGROUP_PETER_MERIAN_VECTOR',
            'description': 'LAYEROBJGROUPDESCR_PETER_MERIAN_VECTOR',
            'layer': [{
                'icon': 'tmp/',
                'defaultlayer': 't',
                'name': 'LAYEROBJ_PM_2D',
                'description': 'LAYEROBJDESCR_PM_2D'
            }]
        }]
    }]
});