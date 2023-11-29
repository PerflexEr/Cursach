import { makeAutoObservable } from "mobx";

import { allIllneses } from "../services/illnesAPI";

export default class IllnesesStore {
  constructor() {
    this._illneses = [];
    makeAutoObservable(this);
    this.fetchIllneses()
  }

  async fetchIllneses() {
    try {
      let data; 
      data = await allIllneses();
      this._illneses = data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
