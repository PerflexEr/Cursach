import { makeAutoObservable } from "mobx";

import { allfamilymembers } from "../services/familymemberAPI";

export default class FamilyStore {
  constructor() {
    this._familyMembers = [];
    this._familyMembersNames = [];
    makeAutoObservable(this);
    this.getNamesList();
  }

  setFamilyMembers(members) {
    this._familyMembers = members;
  }

  get familyMembers() {
    return this._familyMembers;
  }

  
  async fetchFamilyMembers() {
    try {
      let data; 
      data = await allfamilymembers();
      this._familyMembers = data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  async getNamesList() {
    try {
      const data = await allfamilymembers();
      this._familyMembers = data;
      this._familyMembersNames = data.map(member => member.name);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
