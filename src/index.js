function replaceImportPathPlugin (path, t, opts) {
    const { src, dest } = opts;
    if (!src || !dest) {
        console.error('src & dest should be provided in babel-plugin-replace-import-path');
        return;
    }

    const node = path.node;
    if (!node || !src) {
        return;
    }
    if (typeof src === 'string') {
        if (node.source.value === src) {
            node.source.value = dest;
        }
    } else { // src is a regex
        node.source.value = node.source.value.replace(src, dest);
    }
}

export default function replaceImportPath ({types: t}) {
    return {
        name: 'replace-import',
        visitor: {
            ImportDeclaration (path, { opts = {} }) {
                if (Object.prototype.toString.call(opts) === '[object Array]') {
                    opts.forEach(opt => {
                        replaceImportPathPlugin(path, t, opt);
                    });
                } else {
                    replaceImportPathPlugin(path, t, opts);
                }
            }
        }
    };
};
