var dashService = 'app.dashboard.service';

var HTTP = null;

class DashboardService
{
  constructor($http)
  {
    HTTP = new WeakMap();
    this.mockData =
    HTTP.set(this, $http);
  }

  getMockData(){
    return HTTP.get(this).get('/data/mock-data.json');
  }

  checkIfEntryExists(title){
    return HTTP.get(this).get(`/api/bookExists/${title}`).then(result =>  result.data );
  }

  addEntry(book){
    return HTTP.get(this).post('/api/books', book);
  }

  static dashboardFactory($http){
    return new DashboardService($http);
  }
}

DashboardService.dashboardFactory.$inject = ['$http'];

angular.module(dashService, [])
  .factory('dashboardService', DashboardService.dashboardFactory);

export default dashService;