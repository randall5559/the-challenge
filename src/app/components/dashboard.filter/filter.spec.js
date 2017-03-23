import Filter from './filter';

const records = [
  {
    "title": "Tagtune",
    "division": "Accounting",
    "project_owner": "Kevin Snyder",
    "budget": 20614.14,
    "status": "archived",
    "created": "09/14/2015",
    "modified": "10/02/2015"
  }, {
    "title": "Oyoyo",
    "division": "Administration",
    "project_owner": "Eugene Brown",
    "budget": 22106.44,
    "status": "new",
    "created": "07/17/2015",
    "modified": null
  }, {
    "title": "Lajo",
    "division": "Marketing",
    "project_owner": "Killgore Trout",
    "budget": 15481.27,
    "status": "working",
    "created": "07/19/2015",
    "modified": "09/17/2015"
  }
];


describe('Filter Controller Tests', () => {
  let controller;

  beforeEach(() => {
    controller = Filter.controller();

    controller.records = records;
    controller.results = records;

    spyOn(controller, 'findRecord').and.callThrough();
    spyOn(controller, 'findRecordWithDate').and.callThrough();
  });

  describe('Custom Methods', () => {
    it('should perform a query search - querySearch()', () => {
      // with no query
      let results = controller.querySearch();

      expect(results).toEqual(records);

      // with query
      let queryResults = controller.querySearch('Administration');

      expect(queryResults).toEqual([records[1]]);
      expect(controller.findRecord).toHaveBeenCalledWith('Administration');
    });

    it('should find record - findRecord()', () => {
      let record = controller.querySearch('working');

      expect(record[0]).toEqual(records[2]);
    });

    it('should perform text search  - searchTextChange()', () => {
      controller.searchTextChange('Eugene');

      expect(controller.results[0]).toEqual(records[1])
      expect(controller.noMatches).toBe(false);
    });

    it('should perform date search - searchDate()', () => {
      controller.searchDate(new Date('01/13/13'), new Date('03/12/16'), 'working');

      expect(controller.results[0]).toEqual(records[2]);
      expect(controller.findRecordWithDate).toHaveBeenCalledWith(new Date('01/13/13'), new Date('03/12/16'), 'working');
    });

    it('should reset data - resetData()', () => {
      controller.resetData();

      expect(controller.results).toEqual(records);
      expect(controller.noMatches).toBe(false);
      expect(controller.searchText).toBeNull();
      expect(controller.startDate).toEqual(new Date());
      expect(controller.endDate).toEqual(new Date());
    });
  });
});
