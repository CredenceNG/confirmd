import { baseUrl } from '../api/BaseUrl'

export function prependApiUrl(path: string) {
  if (!path) return ''

  // If it's a data URL, return it unchanged
  if (path.startsWith('data:')) {
    return path
  }

  // Handle relative paths correctly
  if (path.startsWith('/')) {
    // Remove the leading slash from path to avoid double slashes
    path = path.substring(1)
  }

  // Ensure baseUrl ends with a slash
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  return `${base}${path}`
}
