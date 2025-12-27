// src/components/profile/ExperienceSection.tsx
import ExperienceItem from "./ExperienceItem";
import MultiRoleExperienceItem from "./MultiRoleExperienceItem";

export default function ExperienceSection() {
  return (
    <section className="card p-6">
      <h3 className="font-semibold mb-4 text-xl">Experience</h3>

      <div className="space-y-6">
        <ExperienceItem
          company="Capital One"
          logoSrc="/assets/logos/capital-one.png"
          role="Software Developer Intern"
          startDate="June 2025"
          endDate="August 2025"
          location="McLean, VA"
          employmentType="Internship"
          bullets={[
            "Built a full-stack event-driven notification system using React, DynamoDB, AWS Lambda, and Kinesis",
            "Wrote 80+ unit and integration tests to improve backend and UI reliability",
            "Worked in Agile sprints using Jenkins CI/CD and Jira",
          ]}
        />

        <ExperienceItem
          company="SHI International"
          logoSrc="/assets/logos/shi_international.jpeg"
          role="Software Developer Intern"
          startDate="May 2024"
          endDate="August 2024"
          location="Somerset, NJ"
          employmentType="Internship"
          bullets={[
            "Automated AX account mapping for cXML orders, reducing processing time by 96%",
            "Built a Power BI dashboard aggregating data from 25+ internal tools",
            "Improved feature click-through by 23% through data-driven UI/UX changes",
          ]}
        />

        <MultiRoleExperienceItem
          company="ChangePlusPlus"
          location="Nashville, TN"
          logoSrc="/assets/logos/changeplusplus.png"
          roles={[
            {
              title: "Engineering Manager",
              startDate: "Aug 2024",
              endDate: "May 2025",
              bullets: [
                "Led a 10-person Agile team delivering a booking system serving 1,000+ Miracle Flights clients annually",
                "Rebuilt platform from legacy system, improving scalability and accelerating feature delivery by 40%",
                "Reduced rework by 25% through improved stakeholder syncs and peer review processes",
              ],
            },
            {
              title: "Software Developer",
              startDate: "Aug 2023",
              endDate: "Aug 2024",
              bullets: [
                "Built core user experiences including a Twitter-style feed and admin dashboard using Express.js, React Native, and MongoDB",
                "Helped ship a production internal app replacing manual outreach workflows, improving operations by 30–40%",
              ],
            },
          ]}
        />

        <ExperienceItem
          company="Vanderbilt University – HRLB Lab"
          role="Undergraduate ML Researcher"
          logoSrc="/assets/logos/hrlblab.png"
          startDate="April 2023"
          endDate="May 2024"
          location="Nashville, TN"
          employmentType="Research"
          bullets={[
            "Co-authored SPIE-published research on CNN-based renal microvascular segmentation",
            "Achieved 82.30% median DSC, outperforming U-Net baselines",
            "Prepared and curated 1,000+ kidney tissue images for model training",
          ]}
        />
      </div>
    </section>
  );
}
