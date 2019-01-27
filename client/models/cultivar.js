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
}
