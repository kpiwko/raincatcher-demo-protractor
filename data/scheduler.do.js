/**
 * Workers names represented in numerical format to assist in targeting the column
 * containing their time slots in the scheduler table. Commonly used where
 * workerIndex
 */
var workers = {
  TREVER_SMITH: 2,
  DAISEY_DIALER: 3,
  MAX_A_MILLION: 4,
  PHYLIS_LEXI: 5,
  JOHNNY_FIZALL: 6,
  BILLY_BALLER: 7,
  SALLY_SHORER: 8,
  DANNY_DOORMAN: 9
};

/**
 * Times specified represented in numerical format for assisting in targeting
 * the scheduler table time columns. Commonly used where timeIndex is a specified
 * input of a function
 */
var times = {
  SEVEN_AM: 1,
  EIGHT_AM: 2,
  NINE_AM: 3,
  TEN_AM: 4,
  ELEVEN_AM: 5,
  TWELVE_PM: 6,
  ONE_PM: 7,
  TWO_PM: 8,
  THREE_PM: 9,
  FOUR_PM: 10,
  FIVE_PM: 11,
  SIX_PM: 12,
  SEVEN_PM: 13
};

/**
 * Id's of workorder id to be used with scheduler drag and drop workorder tests
 */
var workorder = {
  NAME: 'Job Order - Sink in disrepair',
  ID: 'BkuXajsIB'
};

module.exports = {
  workers, times, workorder
};