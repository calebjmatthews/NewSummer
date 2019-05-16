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

  getByProperty(propName, propValue) {
    let match = null;
    this.members.map((member) => {
      if (member[propName] == propValue) {
        match = member;
      }
    })
    return match;
  }

  getAll() {
    return this.members.slice();
  }

  getAllMatching(propName, propValue) {
    let matches = [];
    this.members.map((member) => {
      if (member[propName] == propValue) {
        matches.push(member);
      }
    });
    return matches;
  }

  getLength() {
    return this.members.length;
  }

  set(members) {
    this.members = members.slice();
  }

  add(member) {
    this.members.push(member);
  }

  remove(member) {
    this.members.splice(this.getIndex(member.id), 1);
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

  fromCache(aCache) {
    this.members = [];
    aCache.members.map((member) => {
      this.add(member);
    })
  }
}
