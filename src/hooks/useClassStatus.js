import { useState, useEffect, useCallback } from 'react'
import { getAllCourseStatuses, getDiscordChannelUrl } from '../services/discordService'

export function useClassStatus(enrolledCourses = []) {
  const [classStatuses, setClassStatuses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClassStatuses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const statuses = await getAllCourseStatuses()
      
      // Only include statuses for enrolled courses
      const enrolledStatuses = {}
      enrolledCourses.forEach(courseId => {
        if (statuses[courseId]) {
          enrolledStatuses[courseId] = statuses[courseId]
        }
      })
      
      setClassStatuses(enrolledStatuses)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch class statuses:', err)
    } finally {
      setLoading(false)
    }
  }, [enrolledCourses])

  useEffect(() => {
    if (enrolledCourses.length === 0) {
      setLoading(false)
      return
    }

    fetchClassStatuses()
    
    // Refresh every 30 seconds to get real-time updates
    const interval = setInterval(fetchClassStatuses, 30000)
    
    return () => clearInterval(interval)
  }, [enrolledCourses, fetchClassStatuses])

  const getChannelUrl = useCallback((courseId) => {
    return getDiscordChannelUrl(courseId)
  }, [])

  return {
    classStatuses,
    loading,
    error,
    refreshStatuses: fetchClassStatuses,
    getChannelUrl
  }
}
