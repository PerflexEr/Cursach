import { makeAutoObservable } from "mobx";

import { allfamilymembers } from "../services/familymemberAPI";

export default class FamilyStore {
  constructor() {
    this._familyMembers = [];
    this._familyMembersNames = [];
    this._familyMembersWithIdAndName = [];
    this.getNamesList();
    this.getIdAndNamesList();
    makeAutoObservable(this);
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

  async getIdAndNamesList() {
    try {
      const data = await allfamilymembers();
      this._familyMembers = data;
      this._familyMembersWithIdAndName = data.map((member) => ({
        id: member.id,
        name: member.name,
      }));
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
