import SpotifyRecentEmbed from "@/components/SpotifyRecentEmbed";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Will Kusch</h1>

      <div className={styles.prose}>
        <p>
          I'm Will. I build mobile and web apps for consumers and businesses. Lately I've been working on{" "}
          <a href="https://convuu.com" target="_blank" rel="noreferrer">
            Convuu
          </a>
          , a widget that adds FaceTime functionality to any site. In addition I've been building a development agency
          with{" "}
          <a href="https://www.instagram.com/nocode.alex/" target="_blank" rel="noreferrer">
            Alex Heiden
          </a>
          , and working on a new mobile app (shhh).
        </p>
        <p>
          Things I've learned: it's really easy to just build, build, build, but hard to stop and listen to users. What's
          the point of building anything if no one is asking for it? Talking to people beats intuition most of the time
          when building products. One of my more useful lessons was how fast high-value iteration is. Many of my projects
          see elements or functions go through 5-6 revisions before they even go live. Mostly because I had no clue what I
          want, but with each iteration I go back to the drawing board with a far better idea. Some of our
          agency clients are blown away when I do our mockups in code compared to Figma. I guess what I'm saying is if
          there is a quicker way to iterate, use that method. I could probably ramble more about things I've learned but
          you can just see that on{" "}
          <a href="https://x.com/hellakusch" target="_blank" rel="noreferrer">
            X
          </a>
          .
        </p>
        <p>
          I have a few long-running threads I'm focused on for this year. The biggest being: how can I create a better
          creative and brand identity? This has been a question I've been exploring for a while and it just now feels like
          I'm gaining traction. Outside of design, my main focus lies in creating unique experiences no one thought
          possible (remember that mobile app from earlier...). I'm sure in a few months I'll have another idea worth adding
          here but for now that's where my focus lies this year. If any of that sounds interesting, be a friend and reach
          out. Oh, and here's what I'm listening to right now.
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.embed}>
          <SpotifyRecentEmbed />
        </div>
      </section>

      <p className={styles.footerLead}>
        If you somehow made it all the way down here and want to chat, reach me{" "}
        <a href="mailto:will@relativecompanies.com">here</a>. You can also find me on{" "}
        <a href="https://github.com/will4381" target="_blank" rel="noreferrer">
          GitHub
        </a>
        ,{" "}
        <a href="https://www.linkedin.com/in/willkusch/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        ,{" "}
        <a href="https://x.com/hellakusch" target="_blank" rel="noreferrer">
          X
        </a>
        , and{" "}
        <a href="https://huggingface.co/will4381" target="_blank" rel="noreferrer">
          Hugging Face
        </a>
        . Goodbye, for now!
      </p>
      <p className={`${styles.footerLead} ${styles.lastUpdated}`}>
        Last updated: January 25th, 2026
      </p>
    </main>
  );
}
