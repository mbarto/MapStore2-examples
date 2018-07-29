/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {combineReducers, combineEpics} = require('../../../MapStore2/web/client/utils/PluginsUtils');
const {createDebugStore} = require('../../../MapStore2/web/client/utils/DebugUtils');
const LayersUtils = require('../../../MapStore2/web/client/utils/LayersUtils');

const {createEpicMiddleware} = require('redux-observable');

const map = require('../../../MapStore2/web/client/reducers/map');

const layers = require('../../../MapStore2/web/client/reducers/layers');
const mapConfig = require('../../../MapStore2/web/client/reducers/config');

const standardEpics = {
    ...require('../../../MapStore2/web/client/epics/controls')
};

module.exports = (plugins, custom) => {
    const allReducers = combineReducers(plugins, {
        locale: require('../../../MapStore2/web/client/reducers/locale'),
        browser: require('../../../MapStore2/web/client/reducers/browser'),
        theme: require('../../../MapStore2/web/client/reducers/theme'),
        map: () => {return null; },
        mapInitialConfig: () => {return null; },
        layers: () => {return null; },
        pluginsConfig: {},
        custom
    });
    const rootEpic = combineEpics(plugins, {...standardEpics });
    const epicMiddleware = createEpicMiddleware(rootEpic);
    const rootReducer = (state, action) => {
        if (action.type === 'LOADED_STATE') {
            return action.state;
        }
        let mapState = LayersUtils.splitMapAndLayers(mapConfig(state, action));
        let newState = {
            ...allReducers(state, action),
            map: mapState && mapState.map ? map(mapState.map, action) : null,
            mapInitialConfig: mapState ? mapState.mapInitialConfig : null,
            layers: mapState ? layers(mapState.layers, action) : null
        };
        return newState;
    };

    return createDebugStore(rootReducer, {}, [epicMiddleware]);
};
