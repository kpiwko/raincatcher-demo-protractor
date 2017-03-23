var params = {
  WORKER_TCRUDL1: 'wrk-crudl-1',
  WORKER_TCRUDL2: 'wrk-crudl-2',
  WORKFLOW_TCRUDL1: 'wfw-crudl-1',
  WORKFLOW_TCRUDL2: 'wfw-crudl-2',
  WORKORDER_TCREATE: 'wor-crudl-create',
  WORKORDER_TCANCEL: 'wor-crudl-cancel',
  WORKORDER_TUPDATE1: 'wor-crudl-update-1',
  WORKORDER_TUPDATE2: 'wor-crudl-update-2',
  WORKORDER_TDELETE: 'wor-crudl-delete',
  WORKORDER_TSEARCH: 'wor-crudl-search'
};
var workorders = {
  CREATE: {
    workflow: params.WORKFLOW_TCRUDL1,
    assignee: params.WORKER_TCRUDL1,
    title: params.WORKORDER_TCREATE,
    address: 'Create Street 11',
    latitude: '412412.2',
    longitude: '21026.5',
    finishDate: '2017-11-11',
    finishDateEdit: '11112017',
    finishTime: '09:52AM',
    summary: 'test5create',
    status: 'New'
  },
  SEARCH: {
    workflow: params.WORKFLOW_TCRUDL1,
    assignee: params.WORKER_TCRUDL1,
    title: params.WORKORDER_TSEARCH,
    address: 'Search Street 10',
    latitude: '412412.2',
    longitude: '21026.5',
    finishDate: '2017-11-11',
    finishDateEdit: '11112017',
    finishTime: '09:52AM',
    summary: 'test5search',
    status: 'New'
  },
  UPDATE1: {
    workflow: params.WORKFLOW_TCRUDL1,
    assignee: params.WORKER_TCRUDL1,
    title: params.WORKORDER_TUPDATE1,
    address: 'Update Street 17',
    latitude: '412412.2',
    longitude: '21026.5',
    finishDate: '2017-11-11',
    finishDateEdit: '11112017',
    finishTime: '09:52AM',
    summary: 'test5update1',
    status: 'New'
  },
  UPDATE2: {
    workflow: params.WORKFLOW_TCRUDL2,
    assignee: params.WORKER_TCRUDL2,
    title: params.WORKORDER_TUPDATE2,
    address: 'Update Street 18',
    latitude: '789789.8',
    longitude: '35687.7',
    finishDate: '2017-12-12',
    finishDateEdit: '12122017',
    finishTime: '10:00AM',
    summary: 'test5update2',
    status: 'New'
  },
  CANCEL: {
    workflow: params.WORKFLOW_TCRUDL2,
    assignee: params.WORKER_TCRUDL2,
    title: params.WORKORDER_TCANCEL,
    address: 'Cancel Street 18',
    latitude: '412412.2',
    longitude: '21026.5',
    finishDate: '2017-11-11',
    finishDateEdit: '11112017',
    finishTime: '09:52AM',
    summary: 'test5cancel',
    status: 'New'
  },
  DELETE: {
    workflow: params.WORKFLOW_TCRUDL1,
    assignee: params.WORKER_TCRUDL1,
    title: params.WORKORDER_TDELETE,
    address: 'Delete Street 18',
    latitude: '412412.2',
    longitude: '21026.5',
    finishDate: '2017-11-11',
    finishDateEdit: '11112017',
    finishTime: '09:52AM',
    summary: 'test5delete',
    status: 'New'
  }
};
var workers = {
  WORKER1: {
    name: params.WORKER_TCRUDL1,
    username: params.WORKER_TCRUDL1,
    banner: 'http://' + params.WORKER_TCRUDL1 + '.banners.com',
    avatar: 'http://' + params.WORKER_TCRUDL1 + '.avatars.com',
    phonenumber: '+420777777777',
    email: params.WORKER_TCRUDL1 + '@example.com',
    position: 'Driver',
    group: 'Drivers'
  },
  WORKER2: {
    name: params.WORKER_TCRUDL2,
    username: params.WORKER_TCRUDL2,
    banner: 'http://' + params.WORKER_TCRUDL2 + '.banners.com',
    avatar: 'http://' + params.WORKER_TCRUDL2 + '.avatars.com',
    phonenumber: '+420777777777',
    email: params.WORKER_TCRUDL2 + '@example.com',
    position: 'Driver',
    group: 'Drivers'
  }
};

var workflows = {
  WORKFLOW1: {
    title: params.WORKFLOW_TCRUDL1
  },
  WORKFLOW2: {
    title: params.WORKFLOW_TCRUDL2
  }
};

module.exports = {
  params,
  workorders,
  workers,
  workflows
};