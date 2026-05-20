import type { Metadata } from 'next';
import DesignListContent from '@/components/design-list-content';

export const metadata: Metadata = {
  title: 'Free Design Assets — Icons, Illustrations, UI Kits & More | Zenvoora',
  description: 'Download 46+ free design asset collections including icon packs, illustrations, gradients, textures, UI kits, mockups, templates, fonts, 3D assets, and social media graphics on Zenvoora.',
  openGraph: {
    title: 'Free Design Assets | Zenvoora',
    description: 'Download free design assets including icons, illustrations, gradients, UI kits, and more.',
  },
};

export default function DesignPage() {
  return <DesignListContent />;
}
