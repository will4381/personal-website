import LetterboxdRecent from "@/components/LetterboxdRecent";
import SpotifyRecentEmbed from "@/components/SpotifyRecentEmbed";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Will Kusch</h1>

      <div className={styles.prose}>
        <p>
          I&apos;m Will. I build mobile and web apps for consumers and businesses. Lately I&apos;ve been working on{" "}
          <a href="https://onlucra.com" target="_blank" rel="noreferrer">
            Lucra
          </a>
          {" "}and{" "}
          <a href="https://withrunes.com" target="_blank" rel="noreferrer">
            Runes
          </a>
          , building a development agency with{" "}
          <a href="https://www.instagram.com/nocode.alex/" target="_blank" rel="noreferrer">
            Alex Heiden
          </a>
          , and writing movie reviews. Here is my most recent review!
        </p>
      </div>

      <section className={styles.section}>
        <LetterboxdRecent />
      </section>

      <div className={styles.prose}>
        <p>
          Things I&apos;ve learned: it&apos;s really easy to just build, build, build, but hard to stop and listen to
          users. What&apos;s the point of building anything if no one is asking for it? Talking to people beats intuition
          most of the time when building products. One of my more useful lessons was how fast high-value iteration is.
          Many of my projects see elements or functions go through 5-6 revisions before they even go live. Mostly
          because I have no clue what I want, but with each iteration I go back to the drawing board with a far better
          idea. Some of our agency clients are blown away when I do our mockups in code compared to Figma. I guess what
          I&apos;m saying is if there is a quicker way to iterate, use that method. I could probably ramble more about
          things I&apos;ve learned but you can just see that on{" "}
          <a href="https://x.com/hellakusch" target="_blank" rel="noreferrer">
            X
          </a>
          .
        </p>
        <p>
          I have a few long-running threads I&apos;m focused on for this year. The biggest is figuring out how to create a
          better creative and brand identity. I&apos;ve been exploring that for a while and it finally feels like I&apos;m
          gaining traction. Outside of design, my main focus is building internet experiences that feel distinct and
          memorable. I&apos;m sure in a few months I&apos;ll have another idea worth adding here, but for now that&apos;s
          where my focus lies. If any of that sounds interesting, be a friend and reach out. Oh, and here&apos;s what
          I&apos;m listening to right now.
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

      <div className={`${styles.prose} ${styles.spacedSection}`}>
        <p>
          If you&apos;re here to see some of my work, you&apos;re in luck. Here are a few things I&apos;ve built for clients
          and for myself.
        </p>
        <p>
          A few examples:{" "}
          <a href="https://convuu.com" target="_blank" rel="noreferrer">
            Convuu
          </a>
          ,{" "}
          <a href="https://onlucra.com" target="_blank" rel="noreferrer">
            Lucra
          </a>
          ,{" "}
          <a href="https://withrunes.com" target="_blank" rel="noreferrer">
            Runes
          </a>
          ,{" "}
          <a href="https://tryscrollapp.com" target="_blank" rel="noreferrer">
            Scroll
          </a>
          ,{" "}
          <a href="https://tryproofs.app" target="_blank" rel="noreferrer">
            Proofs
          </a>
          ,{" "}
          <a href="https://flagship.foundr.com" target="_blank" rel="noreferrer">
            Foundr Flagship
          </a>
          ,{" "}
          <a href="https://operators.foundr.com" target="_blank" rel="noreferrer">
            Foundr Operators
          </a>
          ,{" "}
          <a href="https://reels.relativecompanies.com" target="_blank" rel="noreferrer">
            Reels
          </a>
          ,{" "}
          <a href="https://paidinfull.vip" target="_blank" rel="noreferrer">
            Paid in Full
          </a>
          ,{" "}
          <a href="https://fivemin.app" target="_blank" rel="noreferrer">
            Five Min
          </a>
          ,{" "}
          <a href="https://statglide.com" target="_blank" rel="noreferrer">
            Statglide
          </a>
          , and more.
        </p>
      </div>

      <div className={styles.spacedSection}>
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
      </div>
    </main>
  );
}
