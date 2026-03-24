import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DiscordAuthContext = createContext(null)

// Discord OAuth2 Configuration — IRAI Academy application
const DISCORD_CLIENT_ID = '1483605684691009707'
const REDIRECT_URI = `${window.location.origin}${import.meta.env.BASE_URL}student-portal/`
const GUILD_ID = '1408508528846704794'

// Discord Role IDs from guild
const ROLE_IDS = {
  WEB_DEVELOPMENT: '1485030740155433171',
  MOBILE_APP_BUILDER: '1485030833080504480',
  CONTENT_CREATION: '1485030998457712731',
  BUSINESS_BUILDER: '1485030898696192064',
  IRAI_INSTRUCTOR: '1485034990906638542',
}

const STUDENT_ROLES = [
  ROLE_IDS.WEB_DEVELOPMENT,
  ROLE_IDS.MOBILE_APP_BUILDER,
  ROLE_IDS.CONTENT_CREATION,
  ROLE_IDS.BUSINESS_BUILDER,
]

const ALL_VALID_ROLES = [...STUDENT_ROLES, ROLE_IDS.IRAI_INSTRUCTOR]

const ROLE_LABELS = {
  [ROLE_IDS.WEB_DEVELOPMENT]: 'Web Development Student',
  [ROLE_IDS.MOBILE_APP_BUILDER]: 'Mobile App Builder Student',
  [ROLE_IDS.CONTENT_CREATION]: 'Content Creation Student',
  [ROLE_IDS.BUSINESS_BUILDER]: 'Business Builder Student',
  [ROLE_IDS.IRAI_INSTRUCTOR]: 'IRAI Instructor',
}

function getDiscordOAuthURL() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: 'identify guilds.members.read',
  })
  return `https://discord.com/api/oauth2/authorize?${params.toString()}`
}

function parseHashToken() {
  const hash = window.location.hash.substring(1)
  if (!hash) return null
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  if (accessToken) {
    // Clean the hash from the URL
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    return accessToken
  }
  return null
}

export function DiscordAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useState(() => {
    return sessionStorage.getItem('discord_token') || null
  })

  const isInstructor = roles.includes(ROLE_IDS.IRAI_INSTRUCTOR)
  const hasAccess = roles.some(r => ALL_VALID_ROLES.includes(r))
  const studentRoles = roles.filter(r => STUDENT_ROLES.includes(r))

  const login = useCallback(() => {
    window.location.href = getDiscordOAuthURL()
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('discord_token')
    setAccessToken(null)
    setUser(null)
    setRoles([])
    setError(null)
  }, [])

  useEffect(() => {
    // Check for token in URL hash (OAuth2 implicit flow callback)
    const hashToken = parseHashToken()
    if (hashToken) {
      sessionStorage.setItem('discord_token', hashToken)
      setAccessToken(hashToken)
    }
  }, [])

  useEffect(() => {
    if (!accessToken) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchDiscordData() {
      setLoading(true)
      setError(null)

      try {
        // Fetch user info
        const userRes = await fetch('https://discord.com/api/v10/users/@me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (!userRes.ok) {
          if (userRes.status === 401) {
            sessionStorage.removeItem('discord_token')
            setAccessToken(null)
            setLoading(false)
            return
          }
          throw new Error('Failed to fetch user info')
        }

        const userData = await userRes.json()
        if (cancelled) return
        setUser(userData)

        // Fetch guild member info (roles)
        const memberRes = await fetch(
          `https://discord.com/api/v10/users/@me/guilds/${GUILD_ID}/member`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        if (!memberRes.ok) {
          if (memberRes.status === 404) {
            // User is not a member of the guild
            setRoles([])
          } else {
            throw new Error('Failed to fetch guild membership')
          }
        } else {
          const memberData = await memberRes.json()
          if (cancelled) return
          setRoles(memberData.roles || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchDiscordData()

    return () => {
      cancelled = true
    }
  }, [accessToken])

  const value = {
    user,
    roles,
    loading,
    error,
    isAuthenticated: !!user,
    isInstructor,
    hasAccess,
    studentRoles,
    login,
    logout,
    ROLE_IDS,
    ROLE_LABELS,
    STUDENT_ROLES,
  }

  return (
    <DiscordAuthContext.Provider value={value}>
      {children}
    </DiscordAuthContext.Provider>
  )
}

export function useDiscordAuth() {
  const context = useContext(DiscordAuthContext)
  if (!context) {
    throw new Error('useDiscordAuth must be used within a DiscordAuthProvider')
  }
  return context
}

export { ROLE_IDS, ROLE_LABELS, GUILD_ID }
