// Set data to localstorage
export const setDataToLocal = (name, data) => {
  localStorage.setItem(name, data);
};

// Retrieve data from localstorage
export const retrieveData = name => {
  return localStorage.getItem(name);
};

// Remove data from localstorage
export const removeData = name => {
  return localStorage.removeItem(name);
};
