class OperationFailed extends Error {
  constructor(message) {
    super(message);
    this.name = "Operation failed";
  }
}

export default OperationFailed;
