// module "Utils.js"

const log = function(...args) {
  console.log(args);
};

function Utils() {
  // usage: log('inside coolFunc',this,arguments);
  // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  window.log = function(...args) {
    // store logs to an array for reference
    log.history = log.history || [];
    log.history.push(args);
    if (window.console) {
      console.log(Array.prototype.slice.call(args));
    }
  };
}

export { Utils, log };
