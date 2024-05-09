import CertificationCarouselBadges from "@/components/CertificationCarouselBadges"

import "@/styles/certifications-carousel.css"


/* https://www.youtube.com/watch?v=nAjR0Oj0J8E */
export default function CertificationCarousel() {
  return (
    <div className="min-w-full flex overflow-x-auto certifications-carousel">
      <div className="flex items-center flex-nowrap space-x-4">
        <CertificationCarouselBadges key="1" />
        <CertificationCarouselBadges key="2" />
      </div>
    </div>
  )
}
