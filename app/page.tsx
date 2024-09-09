import ImageSlideshow from "@/components/images/imagesSlideShow";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex max-w-[75rem] gap-4 w-[90%] mx-auto my-16">
        <aside className=" h-96 w-[40rem]">
          <ImageSlideshow />
        </aside>
        <aside>
          <div className=" text-2xl !text-[#ddd6cb] hero">
            <h1 className=" text-[2rem] font-bold tracking-[.15rem] uppercase !bg-clip-text">
              NextLevel Food for NextLevel Foodies
            </h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className="cta">
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </aside>
      </header>
      <main className="">
        <section className="section">
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className="section">
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
