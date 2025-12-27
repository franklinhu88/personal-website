// src/components/profile/ProjectsSection.tsx
import ProjectItem from "./ProjectItem";

export default function ProjectsSection() {
  return (
    <section className="card p-6">
      <h3 className="font-semibold mb-4 text-xl">Projects</h3>

      <div className="space-y-6">
        <ProjectItem
          name="Personal Portfolio Website"
          description="A personal website and portfolio built to showcase projects, experience, and technical skills as well as to just tinker and have fun."
          motivation="Designed to experiment with Next.js, TypeScript, Tailwind CSS, and frontend/backend integration with many public APIs."
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
  );
}
