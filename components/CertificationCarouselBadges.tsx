import CertificationBadge from "@/components/CertificationBadge";

export default function CertificationCarouselBadges() {
  return (
    <ul className="flex items-center flex-nowrap space-x-4 min-w-max certifications-slider">
      <li className="shrink-0">
        <CertificationBadge
          title="AWS Certified Solutions Architect"
          imageSrc={"/images/certifications/badge-aws-solutions_architect.png"}
          proofUrl="https://www.credly.com/badges/3808fdb5-4b1f-4814-ab9c-161b00f8ee4d"
        />
      </li>
      <li className="shrink-0">
        <CertificationBadge
          title="AWS Certified SysOps Administrator Associate"
          imageSrc={"/images/certifications/badge-aws-sysops.png"}
          proofUrl="https://www.credly.com/badges/649968a4-6068-4f83-b9bc-9f68ab22abfe"
        />
      </li>
      <li className="shrink-0">
        <CertificationBadge
          title="AWS Certified Developer"
          imageSrc={"/images/certifications/badge-aws-developer.png"}
          proofUrl="https://www.credly.com/badges/3a2c4201-14fa-44e0-bcf8-e5d8948a5f62"
        />
      </li>
      <li className="shrink-0">
        <CertificationBadge
          title="AWS Certified Cloud Practitioner"
          imageSrc={"/images/certifications/badge-aws-cloud_practitioner.png"}
          proofUrl="https://www.credly.com/badges/889f29b6-5ab6-40f9-8261-1c6dbedf2311"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="Azure Administrator Associate"
          imageSrc={"/images/certifications/badge-azure-az104.png"}
          proofUrl="https://learn.microsoft.com/api/credentials/share/en-us/CoreyRegan-3565/9B60A1FB6B539B1A?sharingId=B9BF0DA8EE92DBD1"
        />
      </li>
      <li className="shrink-0">
        <CertificationBadge
          title="Azure Fundamentals"
          imageSrc={"/images/certifications/badge-azure-az900.svg"}
          proofUrl="https://learn.microsoft.com/api/credentials/share/en-us/CoreyRegan-3565/12E082874156D593?sharingId=B9BF0DA8EE92DBD1"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="HashiCorp Terraform Associate"
          imageSrc={"/images/certifications/badge-hashicorp-terraform.png"}
          proofUrl="https://www.credly.com/badges/f3eb97d2-aded-4f73-8174-43b8084b3979"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="Kubernetes and Cloud Native Associate"
          imageSrc={"/images/certifications/badge-k8s-kcna.png"}
          proofUrl="https://www.credly.com/badges/4a319649-1c22-4837-a975-db47e048f7a7"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="Linux Professional Institute Linux Essentials"
          imageSrc={"/images/certifications/badge-lpi-linux_essentials.png"}
          proofUrl="https://cs.lpi.org/caf/Xamman/certification/verify/LPI000585267/5ewvmvb6j3"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="CompTIA A+ ce"
          imageSrc={"/images/certifications/badge-comptia-a+.png"}
          proofUrl="https://www.credly.com/badges/d60b5598-2aa1-4f5a-985d-f960a8b42de8"
        />
      </li>

      <li className="shrink-0">
        <CertificationBadge
          title="Google IT Support Professional"
          imageSrc={"/images/certifications/badge-google-it_support_professional.png"}
          proofUrl="https://www.credly.com/badges/abafa8bc-9d60-4b40-ae33-cd773ca07a36"
        />
      </li>
    </ul>
  )
}
