import { makeAutoObservable } from "mobx";

import { allIllneses } from "../services/illnesAPI";

export default class IllnesesStore {
  constructor() {
    this._illneses = [];
    this.fetchIllneses();
    makeAutoObservable(this);
  }

  async fetchIllneses() {
    try {
      let data;
      data = await allIllneses();
      this._illneses = data.map((illness) => ({
        ...illness,
        period_of_illness: `${new Date(illness.period_of_illness).toLocaleDateString()} - ${new Date(illness.createdAt).toLocaleDateString()}`,
      }));
    } catch (e) {
      alert(e.response?.data?.message || "An error occurred");
    }
  }
}
