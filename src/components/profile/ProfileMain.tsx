import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";
import ExperienceItem from "@/components/profile/ExperienceItem";
import MultiRoleExperienceItem from "./MultiRoleExperienceItem";
import ProjectItem from "./ProjectItem";

export default function ProfileMain() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <AboutSection />

      <section className="card p-6">
        <h3 className="font-semibold mb-2">Blog</h3>
        <p className="text-sm">Blog section coming soon.</p>
      </section>

      <section className="card p-6">
        <h3 className="font-semibold mb-4">Experience</h3>

        <div className="space-y-6">
          <ExperienceItem
            company="Capital One"
            logoSrc="/assets/capital-one.png"
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
            logoSrc="/assets/shi_international.jpeg"
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
            logoSrc="/assets/changeplusplus.png"
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
            logoSrc="/assets/hrlblab.png"
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

      <section className="card p-6">
        <h3 className="font-semibold mb-4">Projects</h3>

        <div className="space-y-6">
          <ProjectItem
            name="Personal Portfolio Website"
            description="A personal website and portfolio built to showcase projects, experience, and technical skills in a polished, recruiter-ready format."
            motivation="Designed to experiment with Next.js, TypeScript, Tailwind CSS, and frontend/backend integration while creating a professional online presence."
            tools={["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"]}
            githubUrl="https://github.com/franklinhu88/personal-website"
          />

          <ProjectItem
            name="SnakeGameRL"
            description="A reinforcement learning framework for training agents to play the classic Snake game using multiple RL algorithms."
            motivation="Built as a final project for CS4260 (Artificial Intelligence) to explore reinforcement learning algorithms and environment design in a game setting."
            tools={[
              "Python",
              "Reinforcement Learning",
              "Q-Learning",
              "SARSA",
              "Linear Function Approximation",
              "OpenAI-style environment",
            ]}
            githubUrl="https://github.com/franklinhu88/snake-game-rl"
          />

          <ProjectItem
            name="Blackjack RL Environment"
            description="A customized reinforcement learning environment for the Blackjack card game, extending OpenAI/Gymnasium to support split and double‑down actions."
            motivation="Created for a reinforcement learning research project to provide a flexible Blackjack environment compatible with multiple RL algorithms."
            tools={[
              "Python",
              "Reinforcement Learning",
              "Gymnasium",
              "SARSA",
              "PPO",
              "Monte‑Carlo",
              "Q‑Learning",
            ]}
            githubUrl="https://github.com/franklinhu88/blackjack-rl-env"
          />

          <ProjectItem
            name="Rust CLI Calculator"
            description="A command‑line calculator written in Rust that evaluates expressions with variables and provides an interactive REPL interface."
            motivation="Built to deepen systems programming knowledge in Rust, including parsing, error handling, and interactive CLI design."
            tools={["Rust", "CLI", "Parsing", "REPL"]}
            githubUrl="https://github.com/franklinhu88/rust-calculator-cli"
          />

          <ProjectItem
            name="Spotify Catalog Searcher"
            description="An Angular application for searching the Spotify catalog via the Web API, built to experiment with frontend API integration."
            motivation="Created to explore Angular, API integration, and interactive search UI with real data from the Spotify Web API."
            tools={["Angular", "TypeScript", "Spotify Web API", "Frontend"]}
            githubUrl="https://github.com/franklinhu88/spotify-catalog-searcher"
          />

          <ProjectItem
            name="Twitter Sentiment Analysis"
            description="A Python project for Twitter sentiment classification with model training, inference utilities, and data pipelines."
            motivation="Built to practice NLP workflows including preprocessing, modeling, and inference for real‑world social media text."
            tools={["Python", "NLP", "Machine Learning", "Data Processing"]}
            githubUrl="https://github.com/franklinhu88/twitter_sentiment_analysis"
          />
        </div>
      </section>
    </div>
  );
}
