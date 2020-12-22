export interface CreateGraphDto {
  name: string
}

export interface Edge {
  id: string
  source: string
  target: string
}

export interface Node {
  id: string
  kind: string
  label: string
}

export interface Graph {
  id: string
  name: string
  location: string
  nodes: Node[]
  edges: Edge[]
}
