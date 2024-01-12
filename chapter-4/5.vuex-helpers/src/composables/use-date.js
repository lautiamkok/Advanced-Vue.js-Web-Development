import moment from 'moment'

// Set `2021-09-23T16:29:51.022Z `to a readable date.
// https://momentjs.com/docs/#/displaying/
export default dateTime => {
  return moment(dateTime).format('D MMMM YYYY')
}
