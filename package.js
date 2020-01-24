/* global Package */

Package.describe({
  name: 'meteorengineer:graphql-react',
  version: '0.0.1',
  summary: 'Realtime GraphQL Client for React.JS',
  git: 'https://github.com/meteorengineer/meteor-graphql-react',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use('ecmascript');
  api.use('tracker');
  api.use('tmeasday:check-npm-versions@0.3.2');
  api.use('meteorengineer:graphql');
  api.addFiles('src/checkNpmVersions.js');
  api.mainModule('src/index.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteorengineer:graphql-react');
  api.mainModule('graphql-react-tests.js');
});
