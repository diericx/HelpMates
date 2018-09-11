// validates that the given arguments exist, if not prints given error message
export function validate(errorMessage, ...args) {
  args.forEach((arg, index) => {
    if (!arg) {
      console.error(`ERROR: ${errorMessage}, index: ${index}`);
    }
  });
}
