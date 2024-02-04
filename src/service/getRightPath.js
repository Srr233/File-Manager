import path from "path";

function getRightPath(arg, workDir) {
  if (!arg) return;
  const parsed = path.parse(arg);

  if (parsed.root) {
    return parsed;
  } else {
    return path.parse(
      path.normalize(path.join(workDir.dir, workDir.base, arg))
    );
  }
}

export default getRightPath;
