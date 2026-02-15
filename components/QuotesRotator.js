"use client";

import { useEffect, useState } from "react";

const FALLBACK_QUOTES = [
  {
    text: "I don't think about fashion, I think about culture.",
    author: "Virgil Abloh",
  },
  {
    text: "Fashion fades, only style remains the same.",
    author: "Coco Chanel",
  },
  {
    text: "Fashions fade, style is eternal.",
    author: "Yves Saint Laurent",
  },
  {
    text: "One is never over-dressed or underdressed with a Little Black Dress.",
    author: "Karl Lagerfeld",
  },
  {
    text: "I think there is beauty in everything. What 'normal' people would perceive as ugly, I can usually see something of beauty in it.",
    author: "Alexander McQueen",
  },
];

export default function QuotesRotator({ interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState(FALLBACK_QUOTES);

  useEffect(() => {
    // Load quotes.json from public folder
    let mounted = true;
    fetch("/quotes.json")
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) setQuotes(data);
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, quotes]);

  const { text, author } = quotes[index] || { text: "", author: "" };

  return (
    <div className="mt-12 pb-12">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 transition-opacity duration-500">
          “{text}”
        </blockquote>
        <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300 font-semibold">— {author}</p>
        {quotes[index] && quotes[index].bio && (
          <p className="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">(
            <strong className="font-semibold text-gray-600 dark:text-gray-200">{quotes[index].bio}</strong>
          )</p>
        )}
      </div>
    </div>
  );
}
