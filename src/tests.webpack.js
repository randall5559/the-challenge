// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
import 'angular';
import 'angular-mocks/angular-mocks';

var testsContext = require.context(".", true, /.spec$/);
console.log(testsContext.keys());
testsContext.keys().forEach(testsContext);