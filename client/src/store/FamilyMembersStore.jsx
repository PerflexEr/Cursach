import { makeAutoObservable } from "mobx";

import { allfamilymembers } from "../services/familymemberAPI";

export default class FamilyStore {
  constructor() {
    this._familyMembers = [];
    makeAutoObservable(this);
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
      this._familyMembers = data
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
