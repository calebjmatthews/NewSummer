export default class Cultivar {
  constructor(name, statsDefinitional, bonus) {
    this.name = name;
    if (Array.isArray(statsDefinitional)) {
      this.statsDefinitional = statsDefinitional.slice();
    }
    else {
      this.statsDefinitional = statsDefinitional;
    }
    this.bonus = bonus;
  }

  areStatsMatch(stats) {
    let isMatch = true;
    this.statsDefinitional.map((defStat) => {
      if (defStat.comparitor == 'less than') {
        if (stats[defStat.stat].value >= defStat.values[0]) {
          isMatch = false;
        }
      }
    })
    return isMatch;
  }
}
