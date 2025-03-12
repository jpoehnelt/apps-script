function getCurrentDate() {
  var today = new Date();
  var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
  return date
}