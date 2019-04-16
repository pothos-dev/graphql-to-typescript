import ts from 'typescript'

export function generateHelperTypes() {
  return [
    ts.createTypeAliasDeclaration(
      undefined,
      [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
      ts.createIdentifier('Nullable'),
      [
        ts.createTypeParameterDeclaration(
          ts.createIdentifier('T'),
          undefined,
          undefined
        ),
      ],
      ts.createUnionTypeNode([
        ts.createTypeReferenceNode(ts.createIdentifier('T'), undefined),
        ts.createNull(),
      ])
    ),
    // ts.createTypeAliasDeclaration(
    //   undefined,
    //   [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //   ts.createIdentifier('__Operation'),
    //   [
    //     ts.createTypeParameterDeclaration(
    //       ts.createIdentifier('Kind'),
    //       undefined,
    //       undefined
    //     ),
    //     ts.createTypeParameterDeclaration(
    //       ts.createIdentifier('Variables'),
    //       undefined,
    //       undefined
    //     ),
    //     ts.createTypeParameterDeclaration(
    //       ts.createIdentifier('Data'),
    //       undefined,
    //       undefined
    //     ),
    //   ],
    //   ts.createTypeLiteralNode([])
    // ),
    //   ts.createTypeAliasDeclaration(
    //     undefined,
    //     [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //     ts.createIdentifier('__Operations'),
    //     undefined,
    //     ts.createTypeQueryNode(ts.createIdentifier('__operations'))
    //   ),
    //   ts.createTypeAliasDeclaration(
    //     undefined,
    //     [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //     ts.createIdentifier('__OperationName'),
    //     undefined,
    //     ts.createTypeOperatorNode(
    //       ts.SyntaxKind.KeyOfKeyword,
    //       ts.createTypeReferenceNode(
    //         ts.createIdentifier('__Operations'),
    //         undefined
    //       )
    //     )
    //   ),
    //   ts.createTypeAliasDeclaration(
    //     undefined,
    //     [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //     ts.createIdentifier('__OperationKind'),
    //     [
    //       ts.createTypeParameterDeclaration(
    //         ts.createIdentifier('Name'),
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__OperationName'),
    //           undefined
    //         ),
    //         undefined
    //       ),
    //     ],
    //     ts.createConditionalTypeNode(
    //       ts.createIndexedAccessTypeNode(
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__Operations'),
    //           undefined
    //         ),
    //         ts.createTypeReferenceNode(ts.createIdentifier('Name'), undefined)
    //       ),
    //       ts.createTypeReferenceNode(ts.createIdentifier('__Operation'), [
    //         ts.createInferTypeNode(
    //           ts.createTypeParameterDeclaration(
    //             ts.createIdentifier('Kind'),
    //             undefined,
    //             undefined
    //           )
    //         ),
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //       ]),
    //       ts.createTypeReferenceNode(ts.createIdentifier('Kind'), undefined),
    //       ts.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)
    //     )
    //   ),
    //   ts.createTypeAliasDeclaration(
    //     undefined,
    //     [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //     ts.createIdentifier('OperationVariables'),
    //     [
    //       ts.createTypeParameterDeclaration(
    //         ts.createIdentifier('Name'),
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__OperationName'),
    //           undefined
    //         ),
    //         undefined
    //       ),
    //     ],
    //     ts.createConditionalTypeNode(
    //       ts.createIndexedAccessTypeNode(
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__Operations'),
    //           undefined
    //         ),
    //         ts.createTypeReferenceNode(ts.createIdentifier('Name'), undefined)
    //       ),
    //       ts.createTypeReferenceNode(ts.createIdentifier('__Operation'), [
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //         ts.createInferTypeNode(
    //           ts.createTypeParameterDeclaration(
    //             ts.createIdentifier('Variables'),
    //             undefined,
    //             undefined
    //           )
    //         ),
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //       ]),
    //       ts.createTypeReferenceNode(ts.createIdentifier('Variables'), undefined),
    //       ts.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)
    //     )
    //   ),
    //   ts.createTypeAliasDeclaration(
    //     undefined,
    //     [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    //     ts.createIdentifier('OperationData'),
    //     [
    //       ts.createTypeParameterDeclaration(
    //         ts.createIdentifier('Name'),
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__OperationName'),
    //           undefined
    //         ),
    //         undefined
    //       ),
    //     ],
    //     ts.createConditionalTypeNode(
    //       ts.createIndexedAccessTypeNode(
    //         ts.createTypeReferenceNode(
    //           ts.createIdentifier('__Operations'),
    //           undefined
    //         ),
    //         ts.createTypeReferenceNode(ts.createIdentifier('Name'), undefined)
    //       ),
    //       ts.createTypeReferenceNode(ts.createIdentifier('__Operation'), [
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //         ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    //         ts.createInferTypeNode(
    //           ts.createTypeParameterDeclaration(
    //             ts.createIdentifier('Data'),
    //             undefined,
    //             undefined
    //           )
    //         ),
    //       ]),
    //       ts.createTypeReferenceNode(ts.createIdentifier('Data'), undefined),
    //       ts.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)
    //     )
    //   ),
  ]
}
