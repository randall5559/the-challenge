import { default as DashboardServiceModule } from './dashboard.service';
import Dashboard from './dashboard';

const DashboardModule = angular.module('dashboard.module', [DashboardServiceModule])
    .component('example', Dashboard);

export default module;