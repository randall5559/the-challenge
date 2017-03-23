/*
    This page needs some refactoring due to time somewhat messy.
    For one filtering, results and data stats should be their own components
    Probably take the toast methods and combine them into one and query methods as well.
*/

import dashboardService from './dashboard.service';

class DashboardController {

    constructor(dashboardService, $mdToast) {
        // set some default vars
        this.records = [];
        this.results = [];
        this.noMatches = false;
        this.infoUpdate = false;
        this.$mdToast = $mdToast;
        this.last = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        this.toastPosition = angular.extend({},this.last);

        // retrieve the mock data
        dashboardService.getMockData().then(result => {
            this.records = result.data;
            this.results = this.records;
        });
    }

    titleCase(str) {
        if(!str) return str;
        let splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    getToastPosition() {
        this.sanitizePosition();

        return Object.keys(this.toastPosition)
        .filter((pos) => { return this.toastPosition[pos]; })
        .join(' ');
    }

    sanitizePosition() {
        var current = this.toastPosition;

        if ( current.bottom && this.last.top ) current.top = false;
        if ( current.top && this.last.bottom ) current.bottom = false;
        if ( current.right && this.last.left ) current.left = false;
        if ( current.left && this.last.right ) current.right = false;

        this.last = angular.extend({},current);
    }

    showSimpleToast() {
        var pinTo = this.getToastPosition();

        this.$mdToast.show(
        this.$mdToast.simple()
            .textContent('Info has been updated!')
            .position(pinTo)
            .hideDelay(2000)
        );
    }
}

DashboardController.$inject = ['dashboardService'];

const Dashboard = {
  template: require('./Dashboard.html'),
  controller: (dashboardService, $mdToast) => new DashboardController(dashboardService, $mdToast)
};

export default Dashboard;
