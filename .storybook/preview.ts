import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../src/styles/main.css'

// Add ReactCraft custom viewports
const CUSTOM_VIEWPORTS = {
  reactcraftXs: {
    name: 'ReactCraft XS',
    styles: {
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },
  reactcraftSm: {
    name: 'ReactCraft SM',
    styles: {
      width: '640px',
      height: '1024px',
    },
    type: 'tablet',
  },
  reactcraftMd: {
    name: 'ReactCraft MD',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  reactcraftLg: {
    name: 'ReactCraft LG',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },
  reactcraftXl: {
    name: 'ReactCraft XL',
    styles: {
      width: '1280px',
      height: '800px',
    },
    type: 'desktop',
  },
  // New iPhone devices
  iphone15ProMax: {
    name: 'iPhone 15 Pro Max',
    styles: {
      width: '430px',
      height: '932px',
    },
    type: 'mobile',
  },
  iphone15Pro: {
    name: 'iPhone 15 Pro',
    styles: {
      width: '393px',
      height: '852px',
    },
    type: 'mobile',
  },
  iphone15: {
    name: 'iPhone 15',
    styles: {
      width: '390px',
      height: '844px',
    },
    type: 'mobile',
  },
  iphone15Plus: {
    name: 'iPhone 15 Plus',
    styles: {
      width: '428px',
      height: '926px',
    },
    type: 'mobile',
  },
  iphoneSE: {
    name: 'iPhone SE (2022)',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  // New iPad devices
  iPadPro13: {
    name: 'iPad Pro 13"',
    styles: {
      width: '1032px',
      height: '1376px',
    },
    type: 'tablet',
  },
  iPadPro12_9: {
    name: 'iPad Pro 12.9" / Air 13"',
    styles: {
      width: '1024px',
      height: '1366px',
    },
    type: 'tablet',
  },
  iPadPro11: {
    name: 'iPad Pro 11"',
    styles: {
      width: '834px',
      height: '1194px',
    },
    type: 'tablet',
  },
  iPadAir10_9: {
    name: 'iPad Air (gen 4-5)',
    styles: {
      width: '820px',
      height: '1180px',
    },
    type: 'tablet',
  },
  iPad10_9: {
    name: 'iPad (gen 10-11)',
    styles: {
      width: '810px',
      height: '1080px',
    },
    type: 'tablet',
  },
  iPad10_2: {
    name: 'iPad (gen 7-9)',
    styles: {
      width: '810px',
      height: '1080px',
    },
    type: 'tablet',
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...CUSTOM_VIEWPORTS,
      },
      defaultViewport: 'responsive',
    },
  },
}

export default preview
