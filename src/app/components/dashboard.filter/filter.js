class FilterController {

    constructor() {
        this.selectedItem  = null;
        this.searchText = null;
        this.startDate = new Date();
        this.endDate = new Date();
    }

    querySearch(query) {
        let results = query ? this.records.filter( this.findRecord(query) ) : this.records;

        this.results = results;

        return results;
    }

    findRecord(query) {
        return function(record) {
            let foundMatch = false;

            for(let key in record) {
                let recordVal = record[key];
                let queryExp = new RegExp(query, "ig");
                if(recordVal && typeof recordVal === 'string' && recordVal.match(queryExp)) {
                    foundMatch = true;
                }
            }

            return foundMatch;
        }
    }

    searchTextChange(query){
        let results = this.querySearch(query);

        if(results.length === 0) this.noMatches = true;
        else this.noMatches = false;

        this.results = results;
    }

    searchDate(startDate, endDate, query) {
        let results = startDate && endDate ? this.records.filter( this.findRecordWithDate(startDate, endDate, query) ) : this.records;

        if(results.length === 0) this.noMatches = true;
        else this.noMatches = false;

        this.results = results;
    }

    findRecordWithDate(start, end, query) {
        return function(record) {
            let foundMatch = false;
            let startDate = start.getTime(); //Year, Month, Date
            let endDate = end.getTime(); //Year, Month, Date
            let recordDate = new Date(record.created).getTime();

            for(let key in record) {
                let recordVal = record[key];
                let queryExp = new RegExp(query, "ig");
                if(recordVal && typeof recordVal === 'string' && recordVal.match(queryExp) &&
                    recordDate > startDate && recordDate < endDate) {
                    foundMatch = true;
                }
            }

            return foundMatch;
        }
    }

    resetData() {
        this.results = this.records;
        this.noMatches = false;
        this.searchText = null;
        this.startDate = new Date();
        this.endDate = new Date();
    }
}

const Filter = {
  bindings: {
      records: "=",
      results: "=",
      noMatches: "="
  },
  template: require('./filter.html'),
  controller: () => new FilterController()
};

export default Filter;
