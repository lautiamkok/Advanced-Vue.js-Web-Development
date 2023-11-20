'use strict'

// Check if an object is empty.
export default (data) => {
  // Use `Object.keys` to make sure the data is not empty:
  // Object.keys(obj).length === 0 // true => empty
  return  data // 👈 null and undefined check
    && Object.keys(data).length === 0 && data.constructor === Object

  // Or use `JSON.stringify`:
  // JSON.stringify(obj) === '{}' // true => empty
  // return  data // 👈 null and undefined check
  //   && JSON.stringify(data) === '{}' 
}
