var messages = {
  CREATE: {
    sender: "Trever Smith",
    receiver: " Daisy Dialer",
    subject: "New message subject",
    content: "New message content",
    status: "read",
    numExpectedMessages: 1,
    index: 0
  },
  CREATE_INVALID_RECEIVER: {
    receiver: "",
    content: "testing content",
    subject: "testing subject"
  },
  CREATE_INVALID_SUBJECT: {
    receiver: "Daisy Dialer",
    content: "testing content",
    subject: ""
  },
  CREATE_INVALID_NO_CONTENT: {
    receiver: "Daisy Dialer",
    subject: "testing subject",
    content: "",
    charCounter: "0/350"
  },
  CREATE_INVALID_EXCESSIVE_CONTENT: {
    receiver: "Daisy Dialer",
    subject: "testing subject",
    charCounter: "388/350",
    content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
      " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque" +
      " penatibus et magnis dis parturient montes, nascetur ridiculus mus. " +
      "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. " +
      "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, " +
      "aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut"
  },
  SEARCH: {
    subject: "Adress change w41",
    sender: "Trever Smith",
    receiver: "",
    status: "read",
    content: "hallo hallo",
    numExpectedMessages: 1,
    index: 0
  }
};

module.exports = {
  messages
};