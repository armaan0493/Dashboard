# ShopSmart E-commerce Components

This directory contains all the reusable components for the ShopSmart e-commerce home page.

## Components

### Header
The main navigation header with:
- ShopSmart logo
- Search bar (desktop and mobile variants)
- Login button
- Shopping cart icon with counter badge

### HeroBanner
Hero section featuring:
- Gradient background with primary blue color
- Promotional messaging
- Call-to-action buttons
- Decorative background elements

### CategoryRow
Grid of clickable category cards:
- Electronics, Fashion, Home, Beauty, Sports, Grocery
- Interactive hover effects
- Responsive layout (3 columns mobile, 6 columns desktop)

### DealCard
Individual deal product card with:
- Discount badge
- Countdown timer
- Product image with zoom effect
- Rating and review count
- Price display (current and original)
- "Sold" counter
- Add to cart button

### DealsSection
Container for "Today's Top Deals":
- Section header with subtitle
- Grid of deal cards
- "View All" link

### ProductCard
Standard product card with:
- Optional discount badge
- Product image with hover effect
- Rating and reviews
- Price display
- Add to cart button

### ProductCollection
Reusable product collection section:
- Customizable title and subtitle
- Configurable background color
- Grid layout for products
- "View All" link

### Footer
Full site footer with:
- ShopSmart branding
- Navigation links (Shop, Customer Service)
- Newsletter signup
- Copyright information

## Design System

**Colors:**
- Primary Blue: `#1A73E8`
- Primary Blue Dark: `#1557B0`
- Yellow Accent: `#F8B400`
- Background: `#F2F2F2` (sections)
- White: `#FFFFFF`

**Typography:**
- Uses Tailwind's default font stack
- Responsive text sizing with `sm:` variants

**Spacing:**
- Consistent padding and margins
- Max-width of 7xl (1280px) for content containers

## Mock Data

Product and deal data is stored in `/src/lib/mockData.ts` with TypeScript interfaces for:
- Product
- Deal
- Categories

## Usage

```tsx
import {
  Header,
  HeroBanner,
  CategoryRow,
  DealsSection,
  ProductCollection,
  Footer
} from "@/components/shopsmart";
```

All components are fully responsive and follow mobile-first design principles.
