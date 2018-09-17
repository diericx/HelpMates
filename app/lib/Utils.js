/**
 * validates that the given arguments exist, if not prints given error message
 * @param {String} errorMessage - message to pring on validation error
 * @param  {...any} args - values to validate
 */
export function validate(errorMessage, ...args) {
  args.forEach((arg, index) => {
    if (!arg) {
      console.error(`ERROR: ${errorMessage}, index: ${index}`);
    }
  });
}
