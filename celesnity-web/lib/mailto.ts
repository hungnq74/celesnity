const CONTACT_EMAIL = 'start@celesnity.com'
const CONTACT_SUBJECT = 'See Minder on our floor'

export function buildContactMailto(): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`
}

export { CONTACT_EMAIL, CONTACT_SUBJECT }
