var params = {
  WORKFLOW_TCREATE: 'wfw-crudl-create',
  WORKFLOW_TUPDATE1: 'wfw-crudl-update-1',
  WORKFLOW_TUPDATE2: 'wfw-crudl-update-2',
  WORKFLOW_TCANCEL: 'wfw-crudl-cancel',
  WORKFLOW_TDELETE: 'wfw-crudl-delete',
  WORKFLOW_TSEARCH: 'wfw-crudl-search'
};

var workflows = {
  CREATE: {
    title: params.WORKFLOW_TCREATE
  },
  UPDATE1: {
    title: params.WORKFLOW_TUPDATE1
  },
  UPDATE2: {
    title: params.WORKFLOW_TUPDATE2
  },
  CANCEL: {
    title: params.WORKFLOW_TCANCEL
  },
  DELETE: {
    title: params.WORKFLOW_TDELETE
  },
  SEARCH: {
    title: params.WORKFLOW_TSEARCH
  }
};

module.exports = {
  params, workflows
};
