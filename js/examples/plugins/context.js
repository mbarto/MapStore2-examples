var context = require.context('../../../MapStore2/web/client/', true, /^\.*((\/components)|(\/actions)|(\/reducers))((?!__tests__).)*jsx?$/);
context.keys().forEach(context);
module.exports = context;
