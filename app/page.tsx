import LetterboxdRecent from "@/components/LetterboxdRecent";
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
          , working on a new mobile app (shhh), and writing movie reviews. Here is my most recent review!
        </p>
      </div>

      <section className={styles.section}>
        <LetterboxdRecent />
      </section>

      <div className={styles.prose}>
        <p>
          Things I've learned: it's really easy to just build, build, build, but hard to stop and listen to users. What's
          the point of building anything if no one is asking for it? Talking to people beats intuition most of the time
          when building products. One of my more useful lessons was how fast high-value iteration is. Many of my projects
          see elements or functions go through 5-6 revisions before they even go live. Mostly because I have no clue what I
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
          here, but for now that's where my focus lies. If any of that sounds interesting, be a friend and reach
          out. Oh, and here's what I'm listening to right now.
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.embed}>
          <SpotifyRecentEmbed />
        </div>
      </section>

      <div className={styles.prose}>
        <p>
          I think it makes sense to keep a section here about the music I&apos;m into, so I&apos;m going to. I listen to just
          about every genre under the sun, but lately I&apos;ve mostly been playing London Underground, the{" "}
          <a href="https://open.spotify.com/album/0K3VFgeCSeUuQSGIftNUJn" target="_blank" rel="noreferrer">
            Hamnet soundtrack
          </a>
          , the{" "}
          <a href="https://open.spotify.com/album/4oniyB3TRFhjglVSqVgy9e" target="_blank" rel="noreferrer">
            Wuthering Heights soundtrack
          </a>
          , and a lot of house. Some of my favorite artists right now are{" "}
          <a href="https://open.spotify.com/artist/0qc4BFxcwRFZfevTck4fOi" target="_blank" rel="noreferrer">
            fakemink
          </a>
          ,{" "}
          <a href="https://open.spotify.com/artist/3qVtytP9k1Xy8GD4HV9C6W" target="_blank" rel="noreferrer">
            Llondon actress
          </a>
          ,{" "}
          <a href="https://open.spotify.com/artist/5x0R3zoC09GMiRJomoexLV" target="_blank" rel="noreferrer">
            nimino
          </a>
          , and{" "}
          <a href="https://open.spotify.com/artist/0YC192cP3KPCRWx8zr8MfZ" target="_blank" rel="noreferrer">
            Hans Zimmer
          </a>
          . That last one will never change.
        </p>
      </div>

      <div className={styles.footerSection}>
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
          Last updated: March 14th, 2026
        </p>
      </div>
    </main>
  );
}
