import { DocumentNode, DefinitionNode } from 'graphql'
import { OperationIR, transformOperation } from './OperationIR'

export interface DocumentIR {
  operations: OperationIR[]
}

export function transformDocument(T: DocumentNode): DocumentIR {
  return { operations: T.definitions.map(transformDefinition) }
}

export function transformDefinition(T: DefinitionNode): OperationIR {
  switch (T.kind) {
    case 'OperationDefinition':
      return transformOperation(T)
    default: {
      throw `Unhandled DefinitionNode.kind '${T.kind}'`
    }
  }
}
