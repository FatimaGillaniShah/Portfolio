import { useEffect, useState } from 'react'

interface RoleSwitcherOptions {
  roles: string[]
  typingSpeed?: number
  pauseBetweenRoles?: number
}

function useRoleSwitcher({
  roles,
  typingSpeed = 100,
  pauseBetweenRoles = 3000,
}: RoleSwitcherOptions): string {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentRole = roles[roleIndex]

    if (charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + currentRole[charIndex])
        setCharIndex((prev) => prev + 1)
      }, typingSpeed)
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setText('')
        setCharIndex(0)
      }, pauseBetweenRoles)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, roleIndex, roles, typingSpeed, pauseBetweenRoles])

  return text
}

export default useRoleSwitcher
