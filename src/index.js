import Main from "./classes/Main.js";
import getArgs from "./service/getArgs.js";

function main() {
  new Main(getArgs(process.argv));
}

main();
