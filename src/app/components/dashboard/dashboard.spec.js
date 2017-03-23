import './index';
import dashboardService from './dashboard.service';

class  MockDashboardService {
  getMockData() {
    let promise;

    window.inject(function(_$q_) {
      promise = _$q_;
    });

    return promise(() => ({ data: 'fake data' }));
  }
}

class MockMDToast {
  show() {}

  simple() {
    return { textContent: () => {
        return { position: () => {
            return { hideDelay: () => {} }
          }
        }
      }
    }
  }
}

class WeakMap {
  get() {
    return this;
  }

  set() {}
}

window.WeakMap = WeakMap;

describe('Dashboard Component', () => {
  let $componentController,
    component,
    $q,
    $rootScope,
    dashboardService,
    $mdToast;

  beforeEach(window.module('dashboard.module'));

  beforeEach(() => {
    window.module(($provide) => {
			$provide.service('dashboardService', MockDashboardService);
      $provide.service('$mdToast', MockMDToast);
		});
  })

	beforeEach(window.inject((_$componentController_, _$q_, _$rootScope_, _dashboardService_, _$mdToast_) => {
    $rootScope = _$rootScope_.$new();
    $componentController = _$componentController_;
		$q = _$q_;
    dashboardService = _dashboardService_;
    $mdToast = _$mdToast_;

    component = $componentController('example', null, {
      scope: $rootScope,
      dashboardService: MockDashboardService
    });

    spyOn(component, 'sanitizePosition');
    spyOn($mdToast, 'show');
    spyOn($mdToast, 'simple').and.callThrough();
	}));

  describe('Custom Methods', () => {
    it('should show title case string - titleCase()', () => {
      let titleCaseString = component.titleCase('fake data string');

      expect(titleCaseString).toEqual('Fake Data String');
    });

    it('should get the toast popup position - getToastPosition()', () => {
      let toastPosition = component.getToastPosition();

      expect(component.sanitizePosition).toHaveBeenCalled();
      expect(toastPosition).toEqual('bottom left');
    });

    it('should sanitize position - sanitizePosition()', () => {
      let toastPositionObj = {
        bottom: true,
        top: false,
        left: true,
        right: false
      };

      component.sanitizePosition();
      expect(component.last).toEqual(toastPositionObj);
    });

    it('should show toast - showSimpleToast()', () => {
      component.showSimpleToast();
      expect($mdToast.show).toHaveBeenCalled();
      expect($mdToast.simple).toHaveBeenCalled();
    });
  });
});
