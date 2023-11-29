import { makeAutoObservable } from "mobx";

import { allmedicines } from "../services/medicinesAPI";

export default class MedicinesStore {
  constructor() {
    this._medicines = [];
    this._medicinesNames = []
    this._medicinesWithIdAndName = []
    makeAutoObservable(this);
    this.fetchMedicines()
    this.getNamesList()
    this.getMedicinesIdAndNamesList()
  }
  
  async fetchMedicines() {
    try {
      let data; 
      data = await allmedicines();
      this._medicines = data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async getNamesList() {
    try {
      const data = await allmedicines();
      this._medicines = data;
      this._medicinesNames = data.map(medicine => medicine.name);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async getMedicinesIdAndNamesList() {
    try {
      const data = await allmedicines();
      this._medicines = data;
      this._medicinesWithIdAndName = data.map((medicine) => ({
        id: medicine.id,
        name: medicine.name,
      }));
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
