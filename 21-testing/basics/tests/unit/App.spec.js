import Vue from 'vue';
import App from '@/App';
import { expect } from 'chai';

describe('App.vue', () => {
  it('should run the correct contents', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    expect(
      vm.$el.querySelector('.ui.selectable thead tr th').textContent
    ).to.contain('Items');

    expect(
      vm.$el.querySelector('.ui.button').textContent
    ).to.contain('Add');
    expect(
      vm.$el.querySelector('.ui.label').textContent
    ).to.contain('Remove all');
  });
});
