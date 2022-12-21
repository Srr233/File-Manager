import path from 'path';

export function isGoodPath(pathLike) {
    if (pathLike.match(/[a-zA-Z]:/)) return true;
    return false;
}