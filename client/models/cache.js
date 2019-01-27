export default class Cache {

  constructor(members) {
    this.members = members;
  }

  getIndex(id) {
    for (var iii = 0; iii < this.members.length; iii++) {
      if (this.members[iii].id == id) {
        return iii;
      }
    }
    return null;
  }

  get(id) {
    var index = this.getIndex(id);
    if (index != null) {
      return this.members[index];
    }
    return null;
  }

  getAll() {
    return this.members;
  }

  set(members) {
    this.members = members.slice();
  }

  add(member) {
    this.members.push(member);
  }

  remove(id) {
    this.members.splice(this.getIndex(id), 1);
  }

  edit(id, params, values) {
    for (var iii = 0; iii < params.length; iii++) {
      var index = this.getIndex(id);
      this.members[index][params[iii]] = values[iii];
    }
  }

  clone() {
    var membersClone = [];
    for (var iii = 0; iii < this.members.length; iii++) {
      membersClone.push(this.members[iii]);
    }
    return membersClone;
  }
}