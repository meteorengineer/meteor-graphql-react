import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions(
  {
    react: '16.x.x',
    'prop-types': '15.x.x',
  },
  'meteorengineer:graphql-react',
);
