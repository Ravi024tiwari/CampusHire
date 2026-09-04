import { Navbar } from "@/components/Navbar";
import { HeroParallaxContainer } from "@/components/HeroParallaxContainer";
import { CompanyLogos } from "@/components/CompanyLogos";
import { PlacementStatsKPI } from "@/components/PlacementStatsKPI";
import { CollegeAffiliationSection } from "@/components/CollegeAffiliationSection";
import { PlacementWorkflowSection } from "@/components/PlacementWorkflowSection";
import { EnterpriseCapabilitiesSection } from "@/components/EnterpriseCapabilitiesSection";
import { PlacementWallOfLove } from "@/components/PlacementWallOfLove";
import { StakeholderRolesSection } from "@/components/StakeholderRolesSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050B14]">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Pinned Sticky Parallax Hero & Overlapping Curtain Sheet Layer */}
      <HeroParallaxContainer>
        {/* 1. Trusted Hiring Companies Dual-Track Marquee */}
        <CompanyLogos />

        {/* 2. Deep-Dive Placement KPIs & Company Affiliation Insights */}
        <PlacementStatsKPI />

        {/* 3. Affiliated Colleges, Campus Placement Average & Growth Intelligence */}
        <CollegeAffiliationSection />

        {/* 4. Interactive 4-Step Placement Workflow */}
        <PlacementWorkflowSection />

        {/* 5. Enterprise Placement Capabilities & Student Career Acceleration */}
        <EnterpriseCapabilitiesSection />

        {/* 6. Social Proof, Tweets & Verified Placement Reviews (Wall of Love) */}
        <PlacementWallOfLove />

        {/* 7. Dedicated Experience for Every Role (Four Stakeholders) */}
        <StakeholderRolesSection />

        {/* 8. Cinematic Celestial Event Horizon Footer & Access Hub */}
        <SiteFooter />
      </HeroParallaxContainer>
    </div>
  );
}
