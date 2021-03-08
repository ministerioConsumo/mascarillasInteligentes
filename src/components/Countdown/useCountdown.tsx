import { useState, useEffect } from 'react'
import { Mask } from 'src/store/types'

const useCountdown = (mask: Mask): number => {
  const [remainingTime, setRemainingTime] = useState(getMaskRemainingTime(mask))
  useEffect(() => {
    const t = setInterval(() => {
      setRemainingTime(getMaskRemainingTime(mask))
    }, 1000)
    return () => clearInterval(t)
  }, [mask])

  return remainingTime
}

const getMaskRemainingTime = (mask: Mask): number => {
  if (!mask) return 0
  let remainingTime = mask.maxUsageTime - mask.usageTime
  if (mask.currentUsageStart) {
    remainingTime -= Date.now() - mask.currentUsageStart
  }
  if (remainingTime < 0) remainingTime = 0

  return remainingTime
}

export default useCountdown
