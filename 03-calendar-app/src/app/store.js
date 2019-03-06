import { seedData } from "./seed.js";

export const store = {
  state: {
    seedData: seedData
  },
  getActiveDay: function() {
      return this.state.seedData.find((day) => day.active);
  },
  setActiveDay (dayId) {
      this.state.seedData.map((dayObj) => {
          dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
      });
  },
  submitEvent: function(eventDetails) {
      const activeDay = this.getActiveDay();
      activeDay.events.push({ "details": eventDetails, "edit": false});
  }
};
