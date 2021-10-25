
export const resParser = (responseData) => {
  if (responseData.data.result) {
    return responseData.data.result
  } else {
    return false
  }
}


export const ifnotEmptyObj = (value) => {
  return  Object.keys(value).length === 0 ? false : true;
}