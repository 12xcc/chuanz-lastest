import { defineStore } from 'pinia';

export const useDiseaseStore = defineStore('disease', {
  state: () => ({
    diseaseData: []
  }),
  actions: {
    setDiseaseData(data) {
      this.diseaseData = data;
    }
  }
});
