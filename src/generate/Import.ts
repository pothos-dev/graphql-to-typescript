import ts from 'typescript'

export function generateImport(
  sourceModule: string,
  defaultImport: string | undefined,
  ...namedImports: string[]
) {
  const defaultImportAST = defaultImport && ts.createIdentifier(defaultImport)
  const namedImportAST =
    namedImports.length &&
    ts.createNamedImports(
      namedImports.map((it) =>
        ts.createImportSpecifier(undefined, ts.createIdentifier(it))
      )
    )

  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(defaultImportAST, namedImportAST),
    ts.createStringLiteral(sourceModule)
  )
}
