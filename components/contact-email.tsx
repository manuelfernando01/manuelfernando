const CONTACT_EMAIL = "manugamboa677@gmail.com"
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`

export default function ContactEmail() {
  return (
    <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
      {CONTACT_EMAIL}
    </a>
  )
}
