const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración básica para web
config.resolver.platforms = ['web'];
config.resolver.resolverMainFields = ['browser', 'main'];

module.exports = config;
