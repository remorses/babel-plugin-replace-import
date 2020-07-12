export default function replaceImportPath({ types: t }) {
    return {
        name: 'replace-import',
        visitor: {
            ImportDeclaration(path, { opts = {} }) {
                if (Array.isArray(opts)) {
                    opts.forEach((opt) => {
                        replaceImport(path, t, opt)
                    })
                } else {
                    replaceImport(path, t, opts)
                }
            },
            CallExpression(path, { opts = {} }) {
                if (path.node.callee.name === 'require') {
                    const [specifier] = path.node.arguments
                    if (specifier && specifier.type === 'StringLiteral') {
                        if (Array.isArray(opts)) {
                            opts.forEach((opt) => {
                                replaceRequire(specifier, opt)
                            })
                        } else {
                            replaceRequire(specifier, opts)
                        }
                    }
                }
            },
        },
    }
}

// for (const extension in extensions) {
//     const regExp = new RegExp(`${extension}$`)
//     if (regExp.test(specifier.value)) {
//         specifier.value = specifier.value.replace(regExp, extensions[extension])
//         break
//     }
// }

function replaceImport(path, t, opts) {
    const { src, dest } = opts
    if (!src || !dest) {
        console.error(
            'src & dest should be provided in babel-plugin-replace-import-path',
        )
        return
    }
    const node = path.node
    if (!node || !src) {
        return
    }
    if (typeof src === 'string') {
        if (node.source.value === src) {
            node.source.value = dest
        }
    } else {
        // src is a regex
        node.source.value = node.source.value.replace(src, dest)
    }
}

function replaceRequire(specifier, opts) {
    const { src, dest } = opts
    if (!specifier || !src) {
        return
    }
    if (typeof src === 'string') {
        if (specifier.value === src) {
            specifier.value = dest
        }
    } else {
        // src is a regex
        specifier.value = specifier.value.replace(src, dest)
    }
}
