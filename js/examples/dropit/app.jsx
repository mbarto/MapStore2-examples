/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const startApp = () => {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const {connect} = require('react-redux');

    const ConfigUtils = require('../../../MapStore2/web/client/utils/ConfigUtils');
    const LocaleUtils = require('../../../MapStore2/web/client/utils/LocaleUtils');
    const PluginsUtils = require('../../../MapStore2/web/client/utils/PluginsUtils');

    const { changeBrowserProperties } = require('../../../MapStore2/web/client/actions/browser');
    const { loadMapConfig } = require('../../../MapStore2/web/client/actions/config');
    const { loadLocale } = require('../../../MapStore2/web/client/actions/locale');
    const { searchTextChanged, textSearch } = require('../../../MapStore2/web/client/actions/search');
    const { loadPrintCapabilities } = require('../../../MapStore2/web/client/actions/print');
    const { plugins } = require('./plugins');

    const annyang = require('annyang');

    const stringSimilarity = require('string-similarity');

    const Localized = connect((state) => ({
        messages: state.locale && state.locale.messages,
        locale: state.locale && state.locale.current,
        loadingError: state.locale && state.locale.localeError
    }))(require('../../../MapStore2/web/client/components/I18N/Localized'));



    const assign = require('object-assign');
    const appCfg = {
        customReducers: assign({}, require('../../../MapStore2/web/client/reducers/shapefile')),
        currentStyle: require('!!raw-loader!./theme.less')
    };

    const customReducer = (state = {}, action) => {
        if (appCfg.customReducers) {
            const newState = assign({}, state);
            Object.keys(appCfg.customReducers).forEach((stateKey) => {
                assign(newState, { [stateKey]: appCfg.customReducers[stateKey](state[stateKey], action) });
            });
            return newState;
        }
        return state;
    };

    const store = require('./store')(plugins, customReducer);

    const Dropzone = require('react-dropzone');

    const pluginsCfg = {
        standard: ['Notifications']
    };

    const {Promise} = require('es6-promise');

    const Theme = connect((state) => ({
        theme: state.theme && state.theme.selectedTheme && state.theme.selectedTheme.id || 'default'
    }))(require('../../../MapStore2/web/client/components/theme/Theme'));

    const { Provider } = require('react-redux');

    const PluginsContainer = connect((state) => ({
        pluginsState: state && state.controls || {}
    }))(require('../../../MapStore2/web/client/components/plugins/PluginsContainer'));

    const userPlugins = {};

    const getPlugins = () => {
        return assign({}, plugins, userPlugins);
    };

    const getPluginsConfiguration = () => {
        return {
            standard: pluginsCfg.standard.map((plugin) => ({
                name: plugin,
                cfg: {}
            }))
        };
    };

    const SpeechEnabled = class extends React.Component {
        componentDidMount() {
            const pluginNames = Object.keys(plugins).map(p => p.substring(0, p.length - 6));

            var commands = {
                'aggiungi *plugin':(plugin) => { 
                    checkFile({name: stringSimilarity.findBestMatch(plugin.replace(/[^a-zA-Z]/g, ''), pluginNames).bestMatch.target + 'Plugin'});
                },
                'cerca *place':(place) => {
                    store.dispatch(searchTextChanged(place));
                    store.dispatch(textSearch(place));
                }
            };
            annyang.setLanguage('it-IT');
            // Add our commands to annyang
            annyang.addCommands(commands);
            annyang.debug(true);
            // Start listening.
            annyang.start();
        }

        render() {
            return this.props.children;
        }
    };

    const renderPage = () => {
        ReactDOM.render(

                <Provider store={store}>
                    <Localized>
                    <SpeechEnabled>
                        <Dropzone className="dropzone" onClick={(e) => {
                            e.preventDefault();
                        }} onDrop={checkFiles}>
                            <Theme path="../../../MapStore2/web/client/dist/themes" />
                            <PluginsContainer params={{ mapType: "leaflet" }} plugins={PluginsUtils.getPlugins(getPlugins())} pluginsConfig={getPluginsConfiguration()} mode="standard" />
                            <div className="dropzone-content"><div className="dropzone-text">Drop it here!</div>
                            </div>
                        </Dropzone>
                        </SpeechEnabled>
                    </Localized>
                </Provider>
            ,
            document.getElementById("container"));
    };

    assign(appCfg, {
        store,
        plugins,
        pluginsCfg,
        userPlugins,
        React
    });

    const fileHandlers = [
        require('./drophandlers/plugin')(appCfg),
        require('./drophandlers/style')(appCfg),
        require('./drophandlers/data')(appCfg),
        require('./drophandlers/url')(appCfg)
    ];

    const checkContent = (text) => {
        Promise.all(fileHandlers.map((handler) => handler.canHandleText(text))).then((handlers) => {
            const result = handlers.reduce((previous, current) => {
                return current.priority > previous.priority ? current : previous;
            }, {
                    handler: null,
                    priority: -1
                });
            if (result.handler) {
                result.handler.handleText(text, renderPage);
            }
        });
    };

    const checkFile = (file) => {
        Promise.all(fileHandlers.map((handler) => handler.canHandle(file))).then((handlers) => {
            const result = handlers.reduce((previous, current) => {
                return current.priority > previous.priority ? current : previous;
            }, {
                    handler: null,
                    priority: -1
                });
            if (result.handler) {
                result.handler.handle(file, renderPage);
            }
        });
    };

    const checkFiles = (files, otherContent) => {
        files.forEach(file => {
            checkFile(file);
        });
        otherContent.forEach(content => {
            content.getAsString(text => checkContent(text));
        });
    };

    ConfigUtils.loadConfiguration().then(() => {
        store.dispatch(changeBrowserProperties(ConfigUtils.getBrowserProperties()));

        const { configUrl, legacy } = ConfigUtils.getUserConfiguration('config', 'json');
        store.dispatch(loadMapConfig(configUrl, legacy));

        let locale = LocaleUtils.getUserLocale();
        store.dispatch(loadLocale('../../../MapStore2/web/client/translations', locale));

        store.dispatch(loadPrintCapabilities(ConfigUtils.getConfigProp('printUrl')));

        renderPage();
    });
};

if (!global.Intl ) {
    require.ensure(['intl', 'intl/locale-data/jsonp/en.js', 'intl/locale-data/jsonp/it.js'], (require) => {
        global.Intl = require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/it.js');
        startApp();
    });
} else {
    startApp();
}
