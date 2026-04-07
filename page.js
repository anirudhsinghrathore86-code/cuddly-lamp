"use client";
import { useState, useEffect } from "react";

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState({});
  const [views, setViews] = useState({});

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Dummy blog data (replace later with Notion)
  const posts = [
    {
      id: 1,
      title: "Why my life feels messed up",
      tag: "life",
    },
    {
      id: 2,
      title: "How I think differently",
      tag: "thoughts",
    },
  ];

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLike = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  const handleView = (id) => {
    setViews({ ...views, [id]: (views[id] || 0) + 1 });
  };

  return (
    <main className="min-h-screen p-5 bg-gradient-to-br from-white to-blue-100 dark:from-black dark:to-blue-950 text-black dark:text-white">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/20 p-4 flex justify-between items-center">
        <div className="font-bold text-lg">Anirudh</div>

        <div className="flex gap-3 text-sm">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("blog")}>Blog</button>
          <button onClick={() => setPage("contact")}>Contact</button>
          <button onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* HOME */}
      {page === "home" && (
        <div className="mt-32 text-center">
          <h1 className="text-4xl font-bold">Anirudh</h1>
          <p className="mt-3 text-lg">I build, I think, I write</p>

          <button
            onClick={() => setPage("blog")}
            className="mt-6 px-6 py-3 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-black/30 border"
          >
            Read my thoughts
          </button>
        </div>
      )}

      {/* BLOG */}
      {page === "blog" && (
        <div className="mt-24">
          <h1 className="text-2xl font-bold">मेरी L ज़िंदगी</h1>

          <input
            placeholder="Search..."
            className="mt-4 p-2 w-full rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-black/30 border"
                onClick={() => handleView(post.id)}
              >
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm opacity-70">#{post.tag}</p>

                <div className="mt-2 flex gap-4 text-sm">
                  <button onClick={() => handleLike(post.id)}>
                    ❤️ {likes[post.id] || 0}
                  </button>
                  <span>👁 {views[post.id] || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div className="mt-24">
          <h1 className="text-2xl font-bold">Contact</h1>

          <div className="mt-4 space-y-2 text-sm">
            <p>Instagram: anrdh86</p>
            <p>GitHub: anirudhsinghrathore86</p>
            <p>Email: anirudh86@gmail.com</p>
          </div>
        </div>
      )}

    </main>
  );
}
