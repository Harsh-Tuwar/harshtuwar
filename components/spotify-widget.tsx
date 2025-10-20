"use client"

import { motion } from "framer-motion"
import { SiSpotify } from "react-icons/si"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
      const next = Math.min(base.value + elapsed, song.duration)
      setProgress(next)
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [song?.title, song?.isPlaying])

  return {
    progress,
    progressPercent: song?.duration ? (progress / song.duration) * 100 : 0,
  }
}

export default function SpotifyWidget() {
  const { data: song } = useSWR<SpotifySong>("/api/spotify", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  })

  const { progress, progressPercent } = useSmoothProgress(song)

  return (
    <section className="bg-gradient-to-b from-background via-muted/40 to-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Card
            className={cn(
              "relative overflow-hidden rounded-2xl backdrop-blur-xl border border-muted/50 bg-card/70 shadow-lg transition-all",
              song?.isPlaying && "ring-2 ring-green-500/40"
            )}
          >
            <Link
              href={song?.songUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
                {/* Album Art */}
                <div className="relative w-[120px] h-[120px] flex-shrink-0">
                  {song?.albumImageUrl ? (
                    <Image
                      src={song.albumImageUrl}
                      alt={song.album}
                      fill
                      className="rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-xl bg-muted">
                      <SiSpotify size={50} color="#1ED760" />
                    </div>
                  )}
                </div>

                {/* Song Info */}
                <div className="flex flex-col flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-2">
                    <SiSpotify
                      size={20}
                      color="#1ED760"
                      className={cn(song?.isPlaying && "animate-pulse")}
                    />
                    <span className="text-xs tracking-wide">
                      {song?.isPlaying ? "Now Playing" : "Spotify"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground truncate">
                    {song?.isPlaying ? song.title : "Not Listening"}
                  </h2>
                  <p className="text-sm text-muted-foreground truncate">
                    {song?.isPlaying ? song.artist : ""}
                  </p>
                  {song?.isPlaying && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {song.album} {song.releaseDate && `• ${song.releaseDate.slice(0, 4)}`}
                    </p>
                  )}

                  {/* Progress bar */}
                  {song?.isPlaying && song.duration && (
                    <div className="mt-4">
                      <div className="relative h-1 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-green-500"
                          style={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{msToTime(progress)}</span>
                        <span>{msToTime(song.duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function msToTime(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}
