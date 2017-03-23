class RulesController {
  constructor() {}
}

const Rules = {
  template: require('./rules.html'),
  controller: () => new RulesController()
};

export default Rules;
