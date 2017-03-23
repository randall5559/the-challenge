class StatsController {

  constructor() {}

}

const Stats = {
  bindings: {
      total: "=",
      filterTotal: "="
  },
  template: require('./stats.html'),
  controller: () => new StatsController()
};

export default Stats;
