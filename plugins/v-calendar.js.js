import Vue from 'vue';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
  locales: {
    'vi': {
      masks: {
        L: 'DD-MM-YYYY',
        title: 'MM YYYY' 
        // ...optional `title`, `weekdays`, `navMonths`, etc
      }
    }
  }
});