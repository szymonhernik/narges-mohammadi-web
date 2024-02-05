'use client'

import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { Translation } from '../../lib/types'
import { ListLink } from './ListLink'

const buttonClasses = {
  default: `rounded-md flex w-full items-center p-3 transition-colors duration-300 border`,
  current: `bg-cyan-100/80 border-cyan-200/80 text-cyan-900`,
  notCurrent: `bg-white/80 border-white hover:underline`,
  active: `border-red-500`,
  notActive: ``,
}

type ProjectLinksProps = {
  projects: Translation[][]
  openByDefault?: boolean
}

export default function ProjectLinks(props: ProjectLinksProps) {
  const { projects, openByDefault = false } = props
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  const localeProjects = useMemo(
    () =>
      projects
        // Filter list down to just the current locale
        .map((projectGroup) =>
          projectGroup.find((project) => project.language === language),
        ),
    [language, projects],
  )

  const { width } = useWindowSize()

  const [menuOpen, setMenuOpen] = useState(openByDefault || width >= 768)

  useEffect(() => {
    if (!menuOpen && width >= 768) {
      setMenuOpen(true)
    }
  }, [width, menuOpen])

  if (!localeProjects?.length) {
    return null
  }

  const toggleClassNames = [
    `md:hidden`,
    buttonClasses.default,
    buttonClasses.current,
  ].join(` `)

  return (
    <Menu as="div" className="">
      {openByDefault ? null : (
        <button
          type="button"
          className={toggleClassNames}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="">
            <span className="text-pink-400 w-6">
              <ChevronDownIcon className="w-6 h-auto" />
            </span>
            <span className="font-medium">
              {localeProjects.length} Projects
            </span>
          </span>
        </button>
      )}

      <Menu.Items static as="ul" className="">
        {menuOpen &&
          localeProjects.map((project, index) =>
            project ? (
              <Menu.Item
                as="li"
                key={project.path}
                className="flex items-center"
              >
                {({ active }) => (
                  <ListLink
                    href={project.path}
                    locale={project.language}
                    className={[
                      buttonClasses.default,
                      buttonClasses.notCurrent,
                      active ? buttonClasses.active : buttonClasses.notActive,
                    ].join(` `)}
                  >
                    <span className="flex-1 flex items-center gap-x-2">
                      <span className="font-bold text-sm  w-6">
                        {String(index + 1).padEnd(2, '.')}
                      </span>
                      <span>{project.title}</span>
                    </span>
                  </ListLink>
                )}
              </Menu.Item>
            ) : null,
          )}
      </Menu.Items>
    </Menu>
  )
}
