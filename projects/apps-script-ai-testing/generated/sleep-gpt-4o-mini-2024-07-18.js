function sleep(milliseconds) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + milliseconds) {
    // Do nothing
  }
}

function sleepFor10Seconds() {
  sleep(10000);
}