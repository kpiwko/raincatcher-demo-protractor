module.exports = {
  auth: {
    DEFAULT_PASSWORD: '123',
    usernames: {
      TREVER_SMITH: 'trever',
      DAISY_DIALER: 'daisy',
      MAX_A_MILLION: 'max',
      PHYLIS_LEXY: 'phylis',
      JOHNNY_FIZAL: 'johnny',
      BILLY_BALLER: 'billy',
      SALLY_SHORER: 'sally',
      DANNY_DOORMAN: 'danny'
    }
  },
  HASH: '#',
  login: {
    URL: '/login',
    AUTH_FAIL_MSG: 'Authentication Failed! Try Again.',
    VALUE_ATTRIBUTE: 'value'
  },
  schedule: {
    URL: '/schedule',
    schedulerCalendarButton: {
      TRIANGLE: 'triangle',
      ICON: 'icon'
    }
  },
  groups: {
    URL: '/groups',
    URL_NEW: '/groups/new'
  },
  workers: {
    URL: '/workers',
    URL_NEW:'/workers/new',
    DEFAULT_HEADING: "No worker selected.",
    DEFAULT_BODY: "Select a worker from the menu, or create a new worker:"
  },
  workflows: {
    URL: '/workflows/list',
    URL_NEW: '/workflows/list/workflows/'
  },
  workorders: {
    URL: '/workorders/list',
    URL_NEW: '/workorders/list/new',
    DEFAULT_HEADING: "No workorder selected.",
    DEFAULT_BODY: "Select a workorder from the menu, or create a new workorder:"
  },
  files: {
    URL: '/files',
    URL_DETAIL: '/files/detail/'
  },
  dateFormat: {
    BIG_ENDIAN: "big-endian", // date format - 2017/01/21
    LITTLE_ENDIAN: "little-endian", // date format - 01/21/2017
    MIDDLE_ENDIAN: "middle-endian" // date format - 21/01/2017
  },
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthsAbbreviations: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
};
