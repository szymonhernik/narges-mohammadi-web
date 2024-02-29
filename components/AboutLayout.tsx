import Image from 'next/image'
import Prose from './Prose'
import ImageBox from './shared/ImageBox'
import { AboutPagePayload } from '@/types'
import { CustomPortableText } from './CustomPortableText'
import { i18n } from '@/languages'
import PageTitle from './PageTitle'
import Photocredits from './Photocredits'
import PDFAsset from './shared/PDFAsset'

type AboutLayoutProps = {
  data: AboutPagePayload | null
  currentLanguage: string
}

export async function AboutLayout({ data, currentLanguage }: AboutLayoutProps) {
  const {
    _id,
    title,
    slug,
    content,
    language,
    profilePicture,
    highlightedContent,
    fileAssets,
  } = data ?? {}
  console.log('fileAssets', fileAssets)

  return (
    <section className="py-mobileSpace lg:pt-desktopSpace lg:pb-16 max-w-screen-3xl mx-auto">
      <PageTitle currentLanguage={currentLanguage} currentPage={'About'} />

      <div className="pt-mobileSpace md:pt-0 p-6 about w-full flex flex-col md:flex-row gap-8 font-medium">
        <div className="lg:w-1/3 space-y-8">
          {highlightedContent && (
            <p className="text-2xl">{highlightedContent}</p>
          )}
          {profilePicture && (
            <div className="w-full flex flex-col lg:hidden justify-center items-center gap-4">
              <ImageBox
                size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 33vw"
                classesWrapper={`w-full max-w-sm`}
                // width={profilePicture.asset.width / 2}
                // height={profilePicture.asset.height / 2}
                classesImage={`object-cover h-full w-full`}
                image={profilePicture}
                alt={`${profilePicture?.alt ?? ''}`}
              />
              <Photocredits profilePicture={profilePicture.photographerArray} />
            </div>
          )}
          {content && <CustomPortableText value={content} />}
          <article className="flex flex-col gap-8 font-normal ">
            {fileAssets &&
              fileAssets.length &&
              fileAssets.map((file) => {
                return (
                  <div key={file._key} className="flex flex-col gap-4">
                    <h3 className="font-medium  ">{file.fileTitle} </h3>
                    <PDFAsset classWrapper={'w-fit'} file={file.fileAbout} />
                  </div>
                )
              })}

            <div className="mt-8 text-sm">
              <p className="font-medium ">Colophon</p>
              <p>
                Design and coding by{' '}
                <a
                  href="https://szymonhernik.com/"
                  target="_blank"
                  className="underline text-violet-400"
                >
                  Szymon Eda Hernik
                </a>
              </p>
            </div>
          </article>
        </div>
        {profilePicture && (
          <div className="w-1/3 hidden lg:flex justify-start flex-col gap-4">
            <ImageBox
              size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 33vw"
              classesWrapper={`w-full mx-auto h-fit max-w-lg   `}
              // width={profilePicture.asset.width / 2}
              // height={profilePicture.asset.height / 2}
              classesImage={`object-cover h-full w-full`}
              image={profilePicture}
              alt={`${profilePicture?.alt ?? ''}`}
            />
            <p className="text-center">
              <Photocredits profilePicture={profilePicture.photographerArray} />
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
