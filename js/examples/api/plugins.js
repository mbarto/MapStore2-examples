/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    plugins: {
        MapPlugin: require('../../../MapStore2/web/client/plugins/Map'),
        ToolbarPlugin: require('../../../MapStore2/web/client/plugins/Toolbar'),
        DrawerMenuPlugin: require('../../../MapStore2/web/client/plugins/DrawerMenu'),
        ShapeFilePlugin: require('../../../MapStore2/web/client/plugins/ShapeFile'),
        SnapshotPlugin: require('../../../MapStore2/web/client/plugins/Snapshot'),
        SettingsPlugin: require('../../../MapStore2/web/client/plugins/Settings'),
        ExpanderPlugin: require('../../../MapStore2/web/client/plugins/Expander'),
        SearchPlugin: require('../../../MapStore2/web/client/plugins/Search'),
        ScaleBoxPlugin: require('../../../MapStore2/web/client/plugins/ScaleBox'),
        LocatePlugin: require('../../../MapStore2/web/client/plugins/Locate'),
        ZoomInPlugin: require('../../../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../../../MapStore2/web/client/plugins/ZoomOut'),
        ZoomAllPlugin: require('../../../MapStore2/web/client/plugins/ZoomAll'),
        MapLoadingPlugin: require('../../../MapStore2/web/client/plugins/MapLoading'),
        HelpPlugin: require('../../../MapStore2/web/client/plugins/Help'),
        HomePlugin: require('../../../MapStore2/web/client/plugins/Home'),
        MetadataExplorerPlugin: require('../../../MapStore2/web/client/plugins/MetadataExplorer'),
        LoginPlugin: require('../../../MapStore2/web/client/plugins/Login'),
        OmniBarPlugin: require('../../../MapStore2/web/client/plugins/OmniBar'),
        BurgerMenuPlugin: require('../../../MapStore2/web/client/plugins/BurgerMenu'),
        UndoPlugin: require('../../../MapStore2/web/client/plugins/History'),
        RedoPlugin: require('../../../MapStore2/web/client/plugins/History'),
        MapsPlugin: require('../../../MapStore2/web/client/plugins/Maps'),
        MapSearchPlugin: require('../../../MapStore2/web/client/plugins/MapSearch'),
        LanguagePlugin: require('../../../MapStore2/web/client/plugins/Language'),
        ManagerPlugin: require('../../../MapStore2/web/client/plugins/manager/Manager'),
        RulesManagerPlugin: require('../../../MapStore2/web/client/plugins/manager/RulesManager'),
        ManagerMenuPlugin: require('../../../MapStore2/web/client/plugins/manager/ManagerMenu'),
        SharePlugin: require('../../../MapStore2/web/client/plugins/Share'),
        SavePlugin: require('../../../MapStore2/web/client/plugins/Save'),
        SaveAsPlugin: require('../../../MapStore2/web/client/plugins/SaveAs'),
        TOCPlugin: require('../../../MapStore2/web/client/plugins/TOC'),
        BackgroundSelectorPlugin: require('../../../MapStore2/web/client/plugins/BackgroundSelector'),
        MeasurePlugin: require('../../../MapStore2/web/client/plugins/Measure'),
        TOCItemsSettingsPlugin: require('../../../MapStore2/web/client/plugins/TOCItemsSettings')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('../../../MapStore2/web/client/components/data/identify/SwipeHeader')
    }
};
