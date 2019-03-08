
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
  getNoteCount: state => state.length
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
  data () {
    return {
      noteCount: 0
    }
  },
  created() {
    EventBus.$on('add-note', event => this.noteCount++);
  }
};

new Vue({
  el: "#app",
  store,     // substitui o store: store em ES6
  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Enter a note'
  },
  methods: {
    addNote(event) {
        this.notes.push(event.note);
        this.timestamps.push(event.timestamp);
    }
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  },
  created() {
    EventBus.$on('add-note', event => this.addNote(event));
  }
});
