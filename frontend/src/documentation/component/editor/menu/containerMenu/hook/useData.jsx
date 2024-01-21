import { useCallback, useState } from 'react'

export const useData = () => {
  const [currentNode, setCurrentNode] = useState(null)
  const [currentNodePos, setCurrentNodePos] = useState(-1)

  const handleNodeChange = useCallback(
      (data) => {
        if (data.node) {
          setCurrentNode(data.node)
        }

        setCurrentNodePos(data.pos)
      },
      [setCurrentNodePos, setCurrentNode],
  )

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
    handleNodeChange,
  }
}
