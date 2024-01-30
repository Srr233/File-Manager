function getArgs(argsArr) {
  const onlyArgs = argsArr.slice(2);
  const obj = {};

  onlyArgs.forEach((arg) => {
    if (arg.includes("--") && arg.includes("=")) {
      const [argName, value] = arg.split("=");
      obj[argName.slice(2)] = value;
    }
  });

  return obj;
}

export default getArgs;
