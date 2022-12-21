import path from 'path';

export function isGoodPath(pathLike) {
    if (path.sep == '/') return path.join(pathLike).match(/[a-zA-Z]:\//);
    if (path.sep == '\\') return path.join(pathLike).match(/[a-zA-Z]:\\/);
}