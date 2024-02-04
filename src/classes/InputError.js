class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = "Invalid input";
  }
}

export default InputError;
