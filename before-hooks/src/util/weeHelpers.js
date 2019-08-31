import moment from 'moment-timezone';

/**
 * A wee function for grabbing the local time for a given timezone
 * @param {String} timezone - an tz database timezone - See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @returns {String} time in HH:mm format - E.g. 14:30
 */
export const getLocalTimeForTimezone = timezone => {
  return moment()
    .tz(timezone)
    .format('HH:mm');
};

/**
 * A wee function for removing the full stop at the end of weather summary
 * cause I couldn't get .trimRight() to work properly :\
 * So instead of: 'Humid and partly cloudy throughout the day.'
 * we get:        'Humid and partly cloudy throughout the day'
 * @param {String} summary
 * @returns {String}
 */
export const formatSummary = summary => {
  const summarySplit = summary.split('.');

  if (summarySplit[summarySplit.length - 1].length === 0) {
    summarySplit.pop();
  }
  return summarySplit.join();
};

/**
 * A wee function for converting the temperature returned from
 * the api into whatever the global temperature scale is at that time
 * e.g. celcius (C) / fahrenheit (F)
 * NOTE: the temperature is returned as fahrenheit by default so no need to
 * convert if F is the global scale
 * @param {number} value
 * @param {number} scale
 * @returns {number}
 */
export const getTemperatureForScale = (value, scale) => {
  switch (scale) {
    case 'C':
      return (((value - 32) * 5) / 9).toFixed(0);
    case 'F':
      return value.toFixed(0);
    /* TODO: We could add a dropdown to select other scales in the future, e.g.
      case 'kelvin':
        return ...;
    */
    default:
      throw Error(`temperature scale ${scale} is not recognized`);
  }
};
