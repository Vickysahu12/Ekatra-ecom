import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HeroSlider } from '../sections/home/HeroSlider'
import { TrustStrip } from '../sections/home/TrustStrip'
import { ShopByOccasion } from '../sections/home/ShopByOccasion'
import { ArtisanSpotlight } from '../sections/home/ArtisanSpotlight'
import { CuratedCollections } from '../sections/home/CuratedCollections'
import { PromoTiles } from '../sections/home/PromoTiles'
import { CompleteTheLook } from '../sections/home/CompleteTheLook'
import { StylingGuide } from '../sections/home/StylingGuide'
import { OfferStrip } from '../sections/home/OfferStrip'
import { Testimonials } from '../sections/home/Testimonials'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <ShopByOccasion />
      <CuratedCollections />
      <ArtisanSpotlight />
      <PromoTiles />
      <CompleteTheLook />
      <StylingGuide />
      <OfferStrip />
      <Testimonials />
    </>
  )
}
