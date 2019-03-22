import { DocumentNode, DefinitionNode } from 'graphql'
import { zipObj } from 'rambda'
import { OperationIR, transformOperation } from './OperationIR'

export interface DocumentIR {
  operations: Record<string, OperationIR>
}

export function transformDocument(T: DocumentNode): DocumentIR {
  const ops = T.definitions.map(transformDefinition)

  const operations = zipObj(ops.map((it) => it.kind), ops)

  return { operations }
}

export function transformDefinition(T: DefinitionNode): OperationIR {
  switch (T.kind) {
    case 'OperationDefinition':
      return transformOperation(T)
    default: {
      console.warn(`Unhandled DefinitionNode.kind '${T.kind}'`)
    }
  }
}
