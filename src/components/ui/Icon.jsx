// Single place that maps icon names to Phosphor glyphs, so the whole site uses one family.
import {
  ArrowRight,
  ArrowUpRight,
  ArrowCounterClockwise,
  CaretLeft,
  CaretRight,
  ChatCircleDots,
  Handbag,
  Heart,
  House,
  InstagramLogo,
  List,
  MagnifyingGlass,
  Minus,
  Money,
  PinterestLogo,
  Plus,
  SealCheck,
  SquaresFour,
  Star,
  Truck,
  User,
  X,
  YoutubeLogo,
  CornersOut,
} from '@phosphor-icons/react'

const icons = {
  arrow: ArrowRight,
  'arrow-up-right': ArrowUpRight,
  bag: Handbag,
  'caret-left': CaretLeft,
  'caret-right': CaretRight,
  cash: Money,
  chat: ChatCircleDots,
  close: X,
  expand: CornersOut,
  grid: SquaresFour,
  heart: Heart,
  home: House,
  instagram: InstagramLogo,
  menu: List,
  minus: Minus,
  pinterest: PinterestLogo,
  plus: Plus,
  returns: ArrowCounterClockwise,
  search: MagnifyingGlass,
  star: Star,
  truck: Truck,
  user: User,
  verified: SealCheck,
  youtube: YoutubeLogo,
}

export function Icon({ name, size = 20, weight = 'regular', ...props }) {
  const Glyph = icons[name]
  return <Glyph size={size} weight={weight} aria-hidden="true" {...props} />
}
