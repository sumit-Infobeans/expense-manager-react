export const formatDate = (date, format) => {
  if (date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let formattedDate = "";
    if (format === "yyyy-mm-dd") {
      formattedDate = `${yyyy}-${mm}-${dd}`;
    } else if (format === "dd.mm.yyyy") {
      formattedDate = `${dd}.${mm}.${yyyy}`;
    } else {
      formattedDate = `${dd}-${mm}-${yyyy}`;
    }
    return formattedDate;
  }
  return null;
};

export const formatAmount = string => {
  return string.replace(/(\d{3})/g, "$1 ").replace(/(^\s+|\s+$)/, "");
};
