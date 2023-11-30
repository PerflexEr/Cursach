import { makeAutoObservable } from "mobx";

import { allmedicines } from "../services/medicinesAPI";

export default class MedicinesStore {
  constructor() {
    this._medicines = [];
    this._medicinesNames = []
    this._medicinesWithIdAndName = []
    this._medicinesWithIdAndNameAndExpDate = []
    makeAutoObservable(this);
    this.fetchMedicines()
    this.getNamesList()
    this.getMedicinesIdAndNamesList()
    this.getMedicinesIdAndNamesAndExpDatesList()
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
  async getMedicinesIdAndNamesAndExpDatesList() {
    try {
      const data = await allmedicines();
      this._medicines = data;
      this._medicinesWithIdAndNameAndExpDate = data.map((medicine) => ({
        id: medicine.id,
        name: medicine.name,
        type: medicine.type,
        cost: medicine.cost,
        expDate: medicine.expiration_date
      }));
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
