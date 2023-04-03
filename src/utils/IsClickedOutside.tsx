import { useEffect, useState } from 'react'

const useClickedOutside = ({ ref }: any) => {
  const [isOutside, setIsOutside] = useState(false)
  useEffect(() => {
    function handleClickOutside(event: any) {
      const form = ref?.current
      const isClickedOutside = form && !form.contains(event.target)
      if (isClickedOutside) {
        setIsOutside(true)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
  return isOutside
}

export default useClickedOutside
