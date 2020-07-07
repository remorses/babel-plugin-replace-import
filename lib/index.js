'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = replaceImportPath;
function replaceImportPathPlugin(path, t, opts) {
    var src = opts.src,
        dest = opts.dest;

    if (!src || !dest) {
        console.error('src & dest should be provided in babel-plugin-replace-import-path');
        return;
    }

    var node = path.node;
    if (!node || !src) {
        return;
    }
    if (typeof src === 'string') {
        if (node.source.value === src) {
            node.source.value = dest;
        }
    } else {
        // src is a regex
        node.source.value = node.source.value.replace(src, dest);
    }
}

function replaceImportPath(_ref) {
    var t = _ref.types;

    return {
        name: 'replace-import',
        visitor: {
            ImportDeclaration: function ImportDeclaration(path, _ref2) {
                var _ref2$opts = _ref2.opts,
                    opts = _ref2$opts === undefined ? {} : _ref2$opts;

                if (Object.prototype.toString.call(opts) === '[object Array]') {
                    opts.forEach(function (opt) {
                        replaceImportPathPlugin(path, t, opt);
                    });
                } else {
                    replaceImportPathPlugin(path, t, opts);
                }
            }
        }
    };
};