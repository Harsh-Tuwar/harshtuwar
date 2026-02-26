"use client"

import { motion } from "framer-motion"
import { SiSpotify } from "react-icons/si"
import { Music } from "lucide-react"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { SPOTIFY_REFRESH_INTERVAL } from "@/lib/spotify"

interface SpotifySong {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
  duration?: number // ms
  progress?: number // ms
  releaseDate?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// 🎵 custom hook for smooth playback progress
function useSmoothProgress(song?: SpotifySong) {
  const [progress, setProgress] = useState(song?.progress ?? 0)
  const rafRef = useRef<number | null>(null)
  const [base, setBase] = useState({ ts: performance.now(), value: song?.progress ?? 0 })

  useEffect(() => {
    if (!song?.isPlaying || !song.duration) {
      setProgress(0)
      return
    }

    const now = performance.now()
    setBase({ ts: now, value: song.progress ?? 0 })

    const update = () => {
      const elapsed = performance.now() - base.ts
      const next = Math.min(base.value + elapsed, song.duration!)
      setProgress(next)
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [song?.title, song?.isPlaying])

  return {
    progress,
    progressPercent: song?.duration ? (progress / song.duration) * 100 : 0,
  }
}

export default function SpotifyWidget() {
  const { data: song } = useSWR<SpotifySong>("/api/spotify", fetcher, {
    refreshInterval: SPOTIFY_REFRESH_INTERVAL,
    revalidateOnFocus: false,
  })

  const { progress, progressPercent } = useSmoothProgress(song)

  return (
    <section className="relative py-20 bg-linear-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-green-500/20 to-green-500/5 mb-4 shadow-md">
            <Music className="w-7 h-7 text-green-500" />
          </div>
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Now Playing
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-linear-to-r from-transparent to-border" />
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
              Live from Spotify
            </p>
            <div className="h-px w-8 bg-linear-to-l from-transparent to-border" />
          </div>
        </div>

        {/* Spotify Card */}
        <motion.article
          className="group relative animate-in fade-in slide-in-from-bottom-4"
          whileHover={{ scale: 1.01, y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Link
            href={song?.songUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className={cn(
              "relative bg-linear-to-br from-card via-card to-muted/5 rounded-3xl border border-border/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
              song?.isPlaying && "hover:border-green-500/40 ring-2 ring-green-500/20"
            )}>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Spotify Brand Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <SiSpotify size={16} color="#1ED760" className={cn(song?.isPlaying && "animate-pulse")} />
                <span className="text-xs font-medium text-white">Spotify</span>
              </div>

              {/* Card Content */}
              <div className="relative p-7 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Album Art */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0">
                    {song?.albumImageUrl ? (
                      <div className="relative w-full h-full bg-background rounded-2xl border border-border/50 p-2 shadow-md ring-1 ring-border/10 group-hover:shadow-lg transition-shadow duration-300">
                        <Image
                          src={song.albumImageUrl}
                          alt={song.album}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-2xl bg-muted border border-border/50">
                        <SiSpotify size={60} color="#1ED760" />
                      </div>
                    )}

                    {/* Playing indicator */}
                    {song?.isPlaying && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <div className="flex gap-0.5 items-end h-4">
                          <motion.div
                            className="w-1 bg-white rounded-full"
                            animate={{ height: ["40%", "100%", "60%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className="w-1 bg-white rounded-full"
                            animate={{ height: ["100%", "40%", "80%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1 bg-white rounded-full"
                            animate={{ height: ["60%", "80%", "40%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="flex flex-col flex-1 text-center sm:text-left min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        song?.isPlaying ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
                      )} />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {song?.isPlaying ? "Now Playing" : "Not Listening"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2 truncate">
                      {song?.isPlaying ? song.title : "Waiting for music..."}
                    </h3>

                    {song?.isPlaying && (
                      <>
                        <p className="text-lg font-semibold text-muted-foreground truncate mb-1">
                          {song.artist}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {song.album} {song.releaseDate && `• ${song.releaseDate.slice(0, 4)}`}
                        </p>

                        {/* Progress bar */}
                        {song.duration && (
                          <div className="mt-6">
                            <div className="relative h-2 w-full bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                              <motion.div
                                className="absolute left-0 top-0 h-full bg-linear-to-r from-green-500 to-green-400 shadow-lg shadow-green-500/30"
                                style={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <div className="flex justify-between text-xs font-medium text-muted-foreground mt-2">
                              <span>{msToTime(progress)}</span>
                              <span>{msToTime(song.duration)}</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={cn(
                "h-1 bg-linear-to-r from-transparent via-green-500 to-transparent transition-transform duration-700",
                song?.isPlaying ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  )
}

function msToTime(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}
