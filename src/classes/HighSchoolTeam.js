export class HighSchoolTeam {
  constructor(name, state, city, players) {
    this.name = name;
    this.state = state;
    this.city = city;
    this.players = players;
  }
  addPlayer(player) {
    this.players.push(player);
  }
}
