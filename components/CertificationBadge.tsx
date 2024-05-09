import Image from "next/image"
import Link  from "next/link"


interface CertificationBadgeProps {
  badgeSize?: number
  imageSrc:   string
  proofUrl:   string
  title:      string
}
export default function CertificationBadge({
  badgeSize = 180,
  imageSrc,
  proofUrl,
  title,
}: CertificationBadgeProps) {
  return (
    <div className="certification-badge">
      <Link href={proofUrl} title={title} target="_blank" passHref>
        <Image src={imageSrc} width={badgeSize} height={badgeSize} alt={title} />
        {/*<p className="text-xs">{title}</p>*/}
      </Link>
    </div>
  )
}
