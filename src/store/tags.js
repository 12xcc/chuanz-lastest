// src/stores/tags.js
import { defineStore } from 'pinia';

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tagsList: [],
  }),

  actions: {
    addTag(tag) {
      // 检查是否已经存在该标签，避免重复添加
      const exists = this.tagsList.find(t => t.path === tag.path);
      if (!exists) {
        this.tagsList.push(tag);
      }
    },

    removeTag(path) {
      // 通过路径删除标签
      this.tagsList = this.tagsList.filter(tag => tag.path !== path);

      // 如果删除后没有标签，则确保个人密码修改标签存在
      if (this.tagsList.length === 0) {
        this.addTag({ title: '个人密码修改', path: '/user/password' }); 
      }
    },

    getPreviousTag(currentIndex) {
      // 返回当前索引之前的标签
      return currentIndex > 0 ? this.tagsList[currentIndex - 1] : null;
    },

    removeAllTag(){
      this.tagsList=[];
      
      // 如果删除后没有标签，则确保个人密码修改标签存在
      if (this.tagsList.length === 0) {
        this.addTag({ title: '个人密码修改', path: '/user/password' }); 
      }
    },
  },
});
