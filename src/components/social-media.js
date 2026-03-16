import React from "react"
import Share from "./share"

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77C14.56 7.45 20 7.3 20 12.5V19z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
  </svg>
)

const FlickrIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <rect x="1" y="1" width="22" height="22" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="12" r="3.5"/>
    <circle cx="16" cy="12" r="3.5"/>
  </svg>
)

const MastodonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M21.33 8.57c0-4.34-2.84-5.61-2.84-5.61C16.9 2.25 14.58 2 12.06 2h-.06C9.49 2 7.17 2.25 5.57 2.96c0 0-2.84 1.27-2.84 5.61 0 .99-.02 2.18.01 3.44.1 4.24.78 8.43 4.7 9.46 1.81.48 3.36.58 4.61.51 2.27-.13 3.54-.81 3.54-.81l-.08-1.65s-1.62.51-3.44.45c-1.8-.06-3.7-.19-4-2.41a4.5 4.5 0 0 1-.04-.62s1.77.43 4.01.54c1.37.06 2.66-.08 3.97-.24 2.5-.3 4.69-1.84 4.96-3.25.43-2.22.4-5.42.4-5.42zm-3.35 5.59h-2.08V9.06c0-1.07-.45-1.62-1.36-1.62-1 0-1.5.65-1.5 1.93v2.79H10.96V9.37c0-1.28-.5-1.93-1.5-1.93-.91 0-1.36.55-1.36 1.62v5.1H6.03V8.9c0-1.07.27-1.93.82-2.56.57-.63 1.31-.95 2.23-.95 1.07 0 1.87.41 2.4 1.23l.52.87.52-.87c.53-.82 1.34-1.23 2.4-1.23.92 0 1.66.32 2.23.95.55.63.82 1.49.82 2.56v5.26z"/>
  </svg>
)

const RSSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M4 11a9 9 0 0 1 9 9"/>
    <path d="M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const socialMediaArray = [
  { name: "LinkedIn",  link: "https://www.linkedin.com/in/timothy-jabez-newman/", Icon: LinkedInIcon  },
  { name: "GitHub",    link: "https://github.com/TimothyJNewman",                 Icon: GitHubIcon    },
  { name: "Instagram", link: "https://www.instagram.com/newmanphotog/",           Icon: InstagramIcon },
  { name: "Flickr",    link: "https://www.flickr.com/photos/147665150@N06/",      Icon: FlickrIcon    },
  { name: "Mastodon",  link: "https://mastodonapp.uk/@timothynewman",             Icon: MastodonIcon  },
  { name: "RSS Feed",  link: "/rss.xml",                                           Icon: RSSIcon       },
]

const SocialMedias = () => (
  <div className="flex items-center gap-1.5 my-4" style={{ color: 'var(--color-dategrey)' }}>
    {socialMediaArray.map(({ name, link, Icon }) => (
      <a
        rel="me"
        href={link}
        key={name}
        aria-label={name}
        className="opacity-60 hover:opacity-100 transition-opacity"
      >
        <Icon />
      </a>
    ))}
    <Share
      label="Share link!"
      text="Personal Website with projects, blog and photos"
      title="Timothy Newman Site"
    />
  </div>
)

export default SocialMedias
