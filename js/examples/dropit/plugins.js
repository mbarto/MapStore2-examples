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
        MousePositionPlugin: require('../../../MapStore2/web/client/plugins/MousePosition'),
        MapLoadingPlugin: require('../../../MapStore2/web/client/plugins/MapLoading'),
        ZoomAllPlugin: require('../../../MapStore2/web/client/plugins/ZoomAll'),
        ZoomInPlugin: require('../../../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../../../MapStore2/web/client/plugins/ZoomOut'),
        SearchPlugin: require('../../../MapStore2/web/client/plugins/Search'),
        ScaleBoxPlugin: require('../../../MapStore2/web/client/plugins/ScaleBox'),
        ToolbarPlugin: require('../../../MapStore2/web/client/plugins/Toolbar'),
        DrawerMenuPlugin: require('../../../MapStore2/web/client/plugins/DrawerMenu'),
        BurgerMenuPlugin: require('../../../MapStore2/web/client/plugins/BurgerMenu'),
        OmniBarPlugin: require('../../../MapStore2/web/client/plugins/OmniBar'),
        LocatePlugin: require('../../../MapStore2/web/client/plugins/Locate'),
        IdentifyPlugin: require('../../../MapStore2/web/client/plugins/Identify'),
        TOCPlugin: require('../../../MapStore2/web/client/plugins/TOC'),
        FeatureGridPlugin: require('../../../MapStore2/web/client/plugins/FeatureGrid'),
        RasterStylerPlugin: require('../../../MapStore2/web/client/plugins/RasterStyler'),
        VectorStylerPlugin: require('../../../MapStore2/web/client/plugins/VectorStyler'),
        BackgroundSwitcherPlugin: require('../../../MapStore2/web/client/plugins/BackgroundSwitcher'),
        BackgroundSelectorPlugin: require('../../../MapStore2/web/client/plugins/BackgroundSelector'),
        MeasurePlugin: require('../../../MapStore2/web/client/plugins/Measure'),
        PrintPlugin: require('../../../MapStore2/web/client/plugins/Print'),
        FullScreenPlugin: require('../../../MapStore2/web/client/plugins/FullScreen'),
        SnapshotPlugin: require('../../../MapStore2/web/client/plugins/Snapshot'),
        ShapeFilePlugin: require('../../../MapStore2/web/client/plugins/ShapeFile'),
        MetadataExplorerPlugin: require('../../../MapStore2/web/client/plugins/MetadataExplorer'),
        SettingsPlugin: require('../../../MapStore2/web/client/plugins/Settings'),
        ExpanderPlugin: require('../../../MapStore2/web/client/plugins/Expander'),
        SharePlugin: require('../../../MapStore2/web/client/plugins/Share'),
        HomePlugin: require('../../../MapStore2/web/client/plugins/Home'),
        LoginPlugin: require('../../../MapStore2/web/client/plugins/Login'),
        NotificationsPlugin: require('../../../MapStore2/web/client/plugins/Notifications')
    },
    requires: {}
};
