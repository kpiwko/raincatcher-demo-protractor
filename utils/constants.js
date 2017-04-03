module.exports = {
  HASH: '#',
  login: {
    URL: '/login',
    AUTH_FAIL_MSG: 'Authentication Failed! Try Again.',
    VALUE_ATTRIBUTE: 'value'
  },
  schedule: {
    URL: '/schedule'
  },
  groups: {
    URL: '/groups',
    URL_NEW: '/groups/new'
  },
  workers: {
    URL: '/workers',
    URL_NEW:'/workers/new'
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
  }
};
