import { Link, Mail, MessageCircle } from 'lucide-react'
import { Container } from '../ui/Container'
import { H4, H3, P, Text, Small } from '../ui/Typography'
import { footer } from '../../data/footer'

const iconMap = {
  MessageCircle,
  Link,
  Mail,
}

export function Footer() {
  const socialLinks = footer.socialLinks.map((socialItem) => ({
    ...socialItem,
    icon: iconMap[socialItem.icon],
  }))

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <H3 className="font-bold text-2xl text-primary-600 mb-4">
                {footer.logo}
              </H3>
              <P className="mb-6 max-w-sm">
                {footer.description}
              </P>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footer.links).map(([title, links]) => (
              <div key={title}>
                <H4 className="font-semibold mb-4 capitalize">
                  {title}
                </H4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-primary-600 transition-colors"
                      >
                        <Text className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                          {link.label}
                        </Text>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-gray-100 dark:border-gray-800">
          <Small className="text-center">
            {footer.copyright(new Date().getFullYear())}
          </Small>
        </div>
      </Container>
    </footer>
  )
}
