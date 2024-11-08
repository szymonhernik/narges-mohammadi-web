import type { Image, PortableTextBlock } from 'sanity'

interface PortfolioProjectHome {
  title: string
  slug: string
  projectsCount: number
}

interface Slug {
  current: string
  _type: 'slug'
}
interface TranslationHome {
  path: string
  language: string
  title: string
  slug: Slug
}

export interface ShowcaseWorksPageExtended extends ShowcaseHomeProject {
  currentTitle: string
  currentSlug: string
}

export interface ShowcaseHomeProject {
  language: string
  title: string
  year: string
  slug: string
  portfolio?: PortfolioProjectHome
  coverImage?: {
    alt?: string
    asset: {
      _id: string
      url: string
      lqip?: string
      aspectRatio?: number
    }
  }
  coverImageOptional?: {
    alt?: string
    asset: {
      _id: string
      url: string
      lqip?: string
    }
  }
  translations: TranslationHome[]
}

export interface HomeQueryResult {
  home: {
    ogImage: Image
    text: Text
    showcaseHome?: ShowcaseHomeProject[]
  }
}
export interface WorksQueryResult {
  projects: {
    showcaseWorks?: ShowcaseHomeProject[]
  }
}
export interface SettingsQueryResult {
  ogImage: Image
  text: Text
}

export interface AboutPagePayload {
  ogImage?: Image
  overview?: string

  _id: string
  title: string
  slug: string
  content: PortableTextBlock[]
  text: PortableTextBlock[]
  language: string
  profilePicture: {
    photographerArray: {
      _id: string
      displayName: string
      collaboratorUrl: string
    }
    alt: string
    asset: {
      _id: string
      url: string
      lqip: string
      aspectRatio: number
      width: number
      height: number
    }
  }
  highlightedContent: string
  fileAssets: FileItem[]
}
interface FileItem {
  _key: string
  fileTitle: string
  fileAbout: FileAbout
}
interface FileAbout {
  _type: 'file'
  asset: {
    url: string
    originalFilename?: string
  }
}

interface GalleryImage {
  _key?: string
  _type?: 'image'
  alt?: string
  asset: {
    _id: string
    url: string
    lqip: string
    aspectRatio: number
    width: number
    height: number
  }
}

interface Gallery {
  _key?: string
  _type: 'gallery'
  galleryTitle: string
  images: GalleryImage[]
}

export interface PageBuilderItem {
  _type: 'gallery'
  gallery: Gallery
}

export interface LocalizedProject {
  currentTitle: string
  currentSlug: string
  year?: string
  language: string
  title: string
  slug: string
  relatedProject: [
    {
      title: string
      slug: string
      _id: string
    },
  ]
  relatedImageGallery: [
    {
      title: string
      slug: string
      _id: string
    },
  ]
  defaultLangDocument?: {
    galleryArrays?: {
      _type: 'singleProjectGallery'
      _key: string
      photoCredits: [
        { _id: string; displayName: string; collaboratorUrl: string },
      ]
      images: GalleryImage[]
    }[]
  }
  projectGallery?: {
    _type: 'gallery'
    gallery: Gallery
  }
  pageContent?: [
    PDFEmbedModule | TextBoxModule | ImageInlineModule | VideoModule,
  ]
  // projectGallery: any
  details: PortableTextBlock[]
  text: PortableTextBlock[]
  pageExtraMaterials?: [
    | {
        _type: 'video'
      }
    | {
        _type: 'audio'
      }
    | {
        _type: 'file'
      },
  ]
  portfolio?: any
  coverImage: {
    alt?: string
    asset: any
  }
  coverImageOptional?: {
    alt?: string
    asset: any
  }
  translations: TranslationHome[]
}
export interface PDFEmbedModule {
  _key: string
  _type: 'pdfEmbed'
  pdfFile: {
    _type: 'file'
    asset: {
      url: string
      originalFilename: string
    }
  }
}
export interface TextBoxModule {
  _key: string
  _type: 'textBox'
  headline: string
  contents: PortableTextBlock[]
}

export interface VideoModule {
  _key: string
  _type: 'video'
  videoLabel: string
  video: {
    asset: {
      playbackId: string
      data: {
        aspect_ratio: string
      }
    }
  }
}
export interface ImageInlineModule {
  _key: string
  _type: 'imageInline'
  caption?: string
  alt?: string
  asset: {
    _id: string
    url: string
    aspectRatio: number
    lqip: string
    width: number
    height: number
  }
}

export interface MusicPagePayload {
  ogImage?: Image
  overview: string
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  summary: string
  content: PortableTextBlock[]
  language: string
  videoBanner: {
    _type: 'mux.video'
    video: {
      asset: {
        _weak: boolean
        _ref: string
        _type: 'reference'
        playbackId: string
      }
    }
  }
  link: {
    linkTitle: string
    href: string
    _id: string
  }
}

export interface ContactPagePayload {
  ogImage?: Image
  overview: string
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  contactLink: [
    {
      _key: string
      title: string
      handle: string
      url: string
    },
  ]
  colophon: PortableTextBlock[]
}
