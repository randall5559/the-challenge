import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngMessage from 'angular-messages';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import UIRouter from 'angular-ui-router';
import ComponentRouter from '@angular/router/angular1/angular_1_router';
import UISelect from 'angular-ui-select/select.min';
import ngSanitize from 'angular-sanitize';
import Navbar from 'components/navbar/navbar';
import Landing from 'components/landing/landing';
import Rules from 'components/rules/rules';
import Stats from 'components/dashboard.stats/stats';
import Filter from 'components/dashboard.filter/filter';
import Dashboard from 'components/dashboard/dashboard';
import { default as DashboardServiceModule } from 'components/dashboard/dashboard.service';

import '../style/app.scss';
import 'angular-ui-select/select.min.css';
import 'angular-material/angular-material.css';


class AppController {}


let AppComponent = {
  template: `<div class="container">
                <navbar></navbar>
                <main ui-view></main>
                <footer></footer>
            </div>`,

  controller: () => new AppController()
};

angular
  .module('app',
    ['ui.select', 'ui.router', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial', DashboardServiceModule])
  .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
      "ngInject";   // ng-annotate doesn't handle arrow functions automatically; need to add the directive prologue.
      // do this xxxxx/path instead of this xxxxx/#/path
      $locationProvider.html5Mode(true)

      // define routes
      let homeState = {
        name: 'home',
        url: '/',
        template: '<landing></landing>'
      };

      let rulesState = {
        name: 'rules',
        url: '/rules',
        template: '<rules></rules>'
      };

      let dashboardState = {
        name: 'example',
        url: '/example',
        template: '<example></example>'
      }

      $stateProvider.state(homeState);
      $stateProvider.state(rulesState);
      $stateProvider.state(dashboardState);

      $urlRouterProvider.otherwise('/');
    })
  .component('app', AppComponent)
  .component('navbar', Navbar)
  .component('landing', Landing)
  .component('rules', Rules)
  .component('example', Dashboard)
  .component('stats', Stats)
  .component('filter', Filter);

angular
  .element(document)
  .ready(() => angular.bootstrap(document, ['app']));

export default AppController;
