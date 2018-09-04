// validates that the given arguments exist, if not prints given error message
export function validate(errorMessage, ...args) {
  args.forEach(arg => {
    if (!arg) {
      console.error(`ERROR: ${errorMessage}`);
    }
  });
}
