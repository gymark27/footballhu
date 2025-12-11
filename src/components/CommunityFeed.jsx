import React from "react";

const POSTS = [
  {
    id: 1,
    type: "video",
    badge: "VIDEÓ",
    time: "3 órája",
    title: "Art of Predator – első videó kint 🎯",
    text: "Megérkezett az első rövid videó a Predatorról. Nézd meg, hogyan dolgozik a cipő éles szitukban.",
    cta: "Videó megnyitása TikTokon ↗",
    tags: ["#Predator", "#control", "#újvideó"],
  },
  {
    id: 2,
    type: "hír",
    badge: "HÍR",
    time: "6 órája",
    title: "Mercurial fókuszban – készül a következő anyag ⚡",
    text: "Úton a következő Mercurial-videó, közben gyűjtjük a tapasztalatokat különböző pályatípusokról.",
    cta: "Kövesd TikTokon ↗",
    tags: ["#Mercurial", "#speed", "#következő"],
  },
  {
    id: 3,
    type: "hír",
    badge: "HÍR",
    time: "1 napja",
    title: "Közösségi teszt – melyik pályára viszed először az új csukát?",
    text: "Hamarosan érkezik egy szavazás: műfű, füves pálya vagy ketrec? Figyeld a sztorikat.",
    cta: "Szavazz majd a sztoriban ↗",
    tags: ["#poll", "#community", "#boots"],
  },
];

const typeLabel = {
  video: "Videó",
  hír: "Hír",
};

function PostCard({ post }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/55 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
      <header className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-200">
            {post.badge}
          </span>
          <span className="text-xs text-gray-400">
            {typeLabel[post.type] ?? "Poszt"} • {post.time}
          </span>
        </div>
      </header>

      <h3 className="mb-1 text-sm font-semibold text-white sm:text-base">
        {post.title}
      </h3>
      <p className="mb-3 text-xs text-gray-300 sm:text-sm">{post.text}</p>

      <button className="mb-3 text-xs font-semibold text-indigo-300 hover:text-indigo-200">
        {post.cta}
      </button>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function CommunityFeed() {
  return (
    <section
      id="feed"
      className="relative border-t border-white/5 pt-14 md:pt-16"
    >
      {/* Feed körüli glow – itt legyen erősebb az alsó fény */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/26 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute bottom-[-160px] right-[-140px] h-80 w-80 rounded-full bg-fuchsia-600/28 blur-[120px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Közösségi feed
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300 md:text-base">
              Itt jelennek meg a FootballHu hírei, rövid videói és friss
              updatejei. Később innen indulnak majd a nyereményjátékok is.
            </p>
          </div>

          <div className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-[11px] text-gray-200">
            Próba verzió – egyelőre a posztokat csak a FootballHu szerkeszti.
          </div>
        </header>

        <div className="space-y-4">
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
