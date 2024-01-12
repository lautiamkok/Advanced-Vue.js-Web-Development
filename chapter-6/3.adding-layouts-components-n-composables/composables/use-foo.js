export function useA () {
  return 'a'
}

function useB () {
  return 'b'
}

function useC () {
  return 'c'
}

export const useD = () => {
  return 'd'
}

export { useB, useC }

export default function () {
  return 'bar'
}
