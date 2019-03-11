
const state = {
  notes: [],
  timestamps: []
}

const mutations = {
  ADD_NOTE (state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP (state, payload) {
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  }
}

const actions = {
  addNote (context, payload) {
    context.commit('ADD_NOTE', payload);
  },
  addTimestamp (context, payload) {
    context.commit('ADD_TIMESTAMP', payload);
  }
}

const getters = {
  /*
  getNotes (state) {
    return state.notes;
  },
  getTimestamps (state) {
    return state.timestamps;
  },
  getNoteCount () {
    return state.notes.length;
  }
  * substituindo por arrow functions já que possuem somente um linha (ES6)
  */
  getNotes: state => state.notes,
  getTimestamps: state => state.timestamps,
  getNoteCount: state => state.notes.length
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//const EventBus = new Vue();

const inputComponent = {
  template: `<input class="input is-small" type="text" 
                v-model="input" 
                :placeholder="placeholder"
                 @keyup.enter="monitorEnterKey"/>`,
  props: ['placeholder'],
  data () {
    return {
        input: ''
    }
  },
  methods: {
    monitorEnterKey() {
      this.$store.dispatch('addNote', this.input);
      this.$store.dispatch('addTimestamp', new Date().toLocaleString());
      this.input = ''; // set input field back to blank
    }
  }
};

const noteCountComponent = {
  template:
    `<div class="note-count">Note count: <strong>{{ noteCount }}</strong></div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount;
    }
  }
};

new Vue({
  el: "#app",
  store,     // substitui o store: store em ES6
  data: {
    placeholder: 'Enter a note'
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimestamps;
    }
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  }
});
