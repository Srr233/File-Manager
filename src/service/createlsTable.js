function createlsTable(data) {
  const startTable = getINT();

  let res = startTable;
  for (let i = 0; i < data.length; i++) {
    res += createRow(data[i].index, data[i].name, data[i].type);
  }
  return res;
}

function getINT() {
  return (
    " ".repeat(3) +
    "Index" +
    " ".repeat(15) +
    "Name" +
    " ".repeat(15) +
    "Type" +
    "\n"
  );
}

function createRow(index, name, type) {
  const lengthOfName = name.length;
  const iterationsForName = Math.ceil(lengthOfName / 10);
  let result = "";

  if (iterationsForName > 1) {
    for (let i = 0; i < iterationsForName; i++) {
      const slicedName = name.slice(i * 10, (i + 1) * 10);
      if (Math.floor(iterationsForName / 2) === i) {
        if (i === 0) {
          result +=
            " ".repeat(3) +
            index +
            " ".repeat(15 - index.toString().length) +
            '"' +
            slicedName +
            " ".repeat(15 - slicedName.length + 1) +
            type +
            "\n";
        } else if (iterationsForName === i + 1) {
          result +=
            " ".repeat(3) +
            index +
            " ".repeat(15 - index.toString().length) +
            slicedName +
            '"' +
            " ".repeat(15 - slicedName.length + 1) +
            type +
            "\n";
        }
      } else {
        if (i === 0) {
          result += " ".repeat(18) + '"' + slicedName + "\n";
        }
      }
    }
  } else {
    result =
      " ".repeat(3) +
      index +
      " ".repeat(15 - index.toString().length) +
      '"' +
      name +
      '"' +
      " ".repeat(15 - name.length) +
      type +
      "\n";
  }

  return result;
}

export default createlsTable;
