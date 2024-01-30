function getCommandArg(strCommand) {
  const splited = strCommand.split(" ");

  return {
    command: splited[0].includes(".") ? "exit" : splited[0],
    args: splited.slice(1),
  };
}

export default getCommandArg;
