'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

import { Translation } from '@/lib/types'

import { clean } from './Clean'
import { i18n } from '@/languages'

type TranslationLinksProps = {
  translations: Translation[]
}

export default function TranslationLinks(props: TranslationLinksProps) {
  const { translations = [] } = props
  const pathname = usePathname()

  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  // Temporarily initialize availableTranslations with 'en' and 'nl'
  const initialTranslations: Translation[] = useMemo(
    () => [
      { language: 'en', path: '/en' }, // Assume default paths or null if not available
      { language: 'nl', path: '/nl' },
    ],
    [],
  )

  const availableTranslations = useMemo<Translation[]>(() => {
    // If translations are loaded, use them to override initial ones
    const loadedTranslations = i18n.languages.reduce<Translation[]>(
      (acc, cur) => {
        const availableTranslation = translations.find(
          (translation) => translation.language === cur.id,
        )
        if (availableTranslation) {
          return [...acc, availableTranslation]
        }
        // Check if the language is 'en' or 'nl' and keep them if not found in loaded translations
        const initialTranslation = initialTranslations.find(
          (t) => t.language === cur.id,
        )
        return initialTranslation ? [...acc, initialTranslation] : acc
      },
      [],
    )
    return loadedTranslations.length > 0
      ? loadedTranslations
      : initialTranslations
  }, [translations, initialTranslations])

  return (
    <ul className="inline-flex items-center z-[20]">
      {availableTranslations.map((version) => (
        <li
          key={version.language}
          className={clsx(
            version.language === language
              ? `pointer-events-none text-white`
              : `text-gray-400 hover:text-white`,
          )}
        >
          {version?.path ? (
            <Link
              href={clean(version.path)}
              locale={version.language}
              className="flex items-center group"
            >
              <span className="block uppercase font-mono tracking-widest px-1">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </Link>
          ) : (
            <span className="flex items-center group opacity-25 pointer-events-none">
              <span className="block uppercase font-mono tracking-widest px-1">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
