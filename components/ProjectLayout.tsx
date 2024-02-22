'use client'
import React, { useEffect, useMemo, useState } from 'react'

import Prose from './Prose'

import { Gallery } from './Gallery'

import { filterOutCurrentProject } from '@/lib/helpers'
import PortfolioNavigator from './PortfolioNavigator'

import Link from 'next/link'

import ImageBox from './shared/ImageBox'
import { CustomPortableText } from './CustomPortableText'
import useMouse from '@react-hook/mouse-position'
import { motion, useTransform } from 'framer-motion'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const {
    title,
    summary,
    credits,
    content,
    gallery,
    details,
    portfolio,
    language,
    slug,
    text,
    slugPage,
    currentLanguage,
  } = props.data ?? {}
  const { projects } = portfolio ?? {}

  const otherProjects = useMemo(
    () => filterOutCurrentProject(projects, slug.current, language),
    [projects, slug, language],
  )
  const coverImage = portfolio.projects[0].coverImage
  // console.log('coverImage', coverImage)

  const [isCoverImageShown, setIsCoverImageShown] = useState(true)
  const [isLightGallery, setLightGallery] = useState(true)
  const toggleCoverImage = () => {
    setIsCoverImageShown(!isCoverImageShown)
  }
  // const coverImageClass = isCoverImageShown ? 'coverImageShown' : 'coverImageHidden';

  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const ref = React.useRef(null)
  const mouse = useMouse(ref)

  let mouseXPosition = 0
  let mouseYPosition = 0

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX ?? 0
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY ?? 0
  }

  const variants = {
    default: {
      x: mouseXPosition,
      y: mouseYPosition,
      // opacity: 0, // Make the element fully transparent
    },
    project: {
      fontSize: '12px',
      x: mouseXPosition,
      y: mouseYPosition - 40,
    },
    gallery: {
      opacity: 1,
      backgroundColor: '#FFBCBC',
      color: '#000',
      height: 64,
      width: 64,
      fontSize: '32px',
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
    },
  }

  function projectEnter(event) {
    setCursorText('→ GALLERY')
    setCursorVariant('project')
    setLightGallery(true)
  }

  function projectLeave(event) {
    setCursorText('')
    setCursorVariant('default')
    setLightGallery(false)
  }

  function contactEnter(event) {
    setCursorText('👋')
    setCursorVariant('gallery')
  }

  function contactLeave(event) {
    setCursorText('')
    setCursorVariant('default')
  }

  return (
    <>
      <section
        ref={ref}
        className="py-mobileSpace  md:overflow-hidden  mx-auto px-6 flex flex-col gap-12 text-sm  lg:items-end lg:py-0"
      >
        <motion.div
          variants={variants}
          className="fixed pointer-events-none z-[100] flex flex-row justify-center items-center top-0 left-0 h-[10px] w-[10px] text-white mix-blend-difference"
          animate={cursorVariant}
          transition={{ type: 'Interim', stiffness: 50, delay: 0 }}
        >
          <span className="cursorText pointer-events-none m-auto flex-auto font-medium ">
            {cursorText}
          </span>
        </motion.div>
        {/* Desktop Cover image */}
        {coverImage && (
          <div
            className={`hidden lg:block fixed top-0 left-0 h-screen w-[60vw] pr-[16vw] z-[2] transition-all duration-500 hover:cursor-pointer  ${isCoverImageShown ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={toggleCoverImage}
            onMouseEnter={projectEnter}
            onMouseLeave={projectLeave}
          >
            <ImageBox
              classesWrapper="w-full h-screen "
              width={1000}
              height={1000}
              size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
              classesImage="object-cover  object-center lg:h-full lg:min-w-full "
              image={coverImage}
              alt={coverImage.alt || 'Project image'}
            />
          </div>
        )}
        <div className="text-center lg:hidden">
          <Link href={`/${language}/works`} className="underline ">
            back to works
          </Link>
        </div>

        {/* Desktop gallery */}
        {gallery && (
          <div
            className={`hidden lg:block fixed left-0 top-[25vh] z-[0] transition-all duration-700 w-[59vw]  ${isCoverImageShown ? 'opacity-10 translate-x-[44vw]' : 'opacity-100 translate-x-0'} ${isLightGallery && 'opacity-30'} `}
          >
            <Gallery gallery={gallery} />
          </div>
        )}

        <div className=" lg:bg-white lg:w-[40vw] lg:z-[10] lg:-mr-6 lg:pl-8 lg:pr-12 lg:py-desktopSpace lg:shadow-shadowProject">
          <div className="lg:max-w-screen-sm flex flex-col gap-12">
            <div className="my-8 flex flex-col gap-y-4 w-3/4 text-center mx-auto md:max-w-screen-md lg:text-left lg:w-1/2 lg:mx-0 ">
              <h1 className="text-3xl ">{portfolio.title[language]}</h1>
              {/* Reference from the portfolio that is a group */}
              {portfolio.projects.length > 1 && (
                <PortfolioNavigator
                  portfolio={portfolio}
                  title={title}
                  language={language}
                  otherProjects={otherProjects}
                  slugPage={slugPage}
                />
              )}
            </div>
            <div className="font-medium space-y-2 md:max-w-screen-md md:mx-auto lg:text-sm lg:w-3/4 lg:mx-0 lg:mb-16">
              <span className="opacity-50">2023</span>
              {details?.length > 0 && <Prose value={details} />}
            </div>
            {coverImage && (
              <div className="flex justify-center lg:hidden">
                <ImageBox
                  classesWrapper="-mx-6 w-screen max-w-lg h-auto max-h-screen overflow-hidden "
                  size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
                  classesImage="object-cover  object-center lg:h-full lg:w-auto "
                  image={coverImage}
                  alt={coverImage.alt || 'Project image'}
                />
              </div>
            )}
            <div className="lg:hidden sticky top-headerSmallSpace z-[10] left-0 w-screen -mx-6 flex flex-row gap-2 text-xs font-medium justify-center items-center bg-white py-4 opacity-80 ">
              <p className="">{portfolio.title[language]}</p>
              <span className="text-base font-normal">↑</span>
            </div>
            {text?.length > 0 && (
              <div className="font-medium  space-y-6 md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-8">
                <p className="opacity-50 lg:text-xs">TEXT</p>
                <CustomPortableText value={text} />
              </div>
            )}
            {/* Mobile&Tablet gallery */}
            {gallery && (
              <div className="w-screen md:w-full -mx-6 lg:hidden">
                <Gallery gallery={gallery} />
              </div>
            )}

            {credits?.length > 0 && (
              <div className="font-medium space-y-6 md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base">
                <p className="opacity-50 lg:text-xs">CREDITS</p>
                <CustomPortableText value={credits} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
