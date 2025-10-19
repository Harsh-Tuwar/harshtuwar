"use client"

import { SiSpotify } from "react-icons/si"
import { cn } from "@/lib/utils"
import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { siteConfig } from '@/lib/metadata'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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

const MotionCard = motion.create(Card)
const DRIFT_MS = 1500 // only re-anchor if drift is larger than this

export default function SpotifyWidget() {
  const { data: song } = useSWR<SpotifySong>("/api/spotify", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false, // avoid sudden jumps on tab focus
    dedupingInterval: 4000,
  })

  // Anchor model: display = baseProgress + (now - baseTs)
  const [baseProgress, setBaseProgress] = useState(0)
  const [baseTs, setBaseTs] = useState(0)
  const [duration, setDuration] = useState(0)
  const [title, setTitle] = useState<string>("")
  const [displayProgress, setDisplayProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  // Start / update RAF loop
  useEffect(() => {
    const tick = () => {
      const now = performance.now()
      const next = Math.min(baseProgress + Math.max(0, now - baseTs), duration || Infinity)
      setDisplayProgress(next)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (duration > 0) {
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [baseProgress, baseTs, duration])

  // Re-anchor when a NEW track arrives (hard reset).
  useEffect(() => {
    if (!song?.isPlaying || song.progress == null || !song.duration) {
      setDisplayProgress(0)
      setDuration(0)
      return
    }

    const now = performance.now()

    // Track changed
    if (song.title !== title) {
      setTitle(song.title)
      setDuration(song.duration)
      setBaseProgress(song.progress)
      setBaseTs(now)
      return
    }

    // Same track: compute current displayed, then softly re-anchor if drift is large
    const currentDisplayed = Math.min(baseProgress + Math.max(0, now - baseTs), duration || song.duration)
    const drift = song.progress - currentDisplayed

    if (Math.abs(drift) > DRIFT_MS) {
      // Re-anchor WITHOUT visual jump: keep currentDisplayed the same
      // Choose new base so that: song.progress + (now - newBaseTs) = currentDisplayed
      const newBaseTs = now - (currentDisplayed - song.progress)
      setDuration(song.duration)
      setBaseProgress(song.progress)
      setBaseTs(newBaseTs)
    } else {
      // Tiny drift: ignore to keep it buttery smooth
      if (duration !== song.duration) setDuration(song.duration)
    }
  }, [song?.title, song?.progress, song?.duration, song?.isPlaying])

  const progressPercent = song?.isPlaying && duration
    ? Math.min(100, (displayProgress / duration) * 100)
    : 0

  return (
    <section className="bg-gradient-to-br from-background via-muted/50 to-background py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
        {/* Image (1/4 width on desktop) */}
        <div className="flex justify-center mr-3 md:justify-end">
          <Image
            src={siteConfig.images.manCoding}
            alt="Music vibes"
            width={400}
            height={400}
          />
        </div>
        {/* Spotify Widget (3/4 width on desktop) */}
        <div className="md:col-span-3">
          <MotionCard
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={cn(
              "relative border bg-card overflow-hidden group shadow-lg",
              song?.isPlaying ? "hover:border-green-500" : "hover:border-muted-foreground"
            )}
          >
            <Link
              href={song?.isPlaying && song?.songUrl ? song.songUrl : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardContent className="p-6 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <SiSpotify size={22} color="#1ED760" className={cn(song?.isPlaying && "animate-pulse")} />
                  <span className="text-sm tracking-wide">
                    {song?.isPlaying ? "Now Playing on Spotify" : "Spotify"}
                  </span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                  {/* Album Art */}
                  {song?.isPlaying ? (
                    <div className="relative">
                      <Image
                        src={song.albumImageUrl}
                        alt={song.album}
                        width={140}
                        height={140}
                        className="rounded-xl shadow-md ring-2 ring-green-500/50 group-hover:ring-green-500 transition"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-[140px] h-[140px] rounded-xl bg-muted">
                      <SiSpotify size={60} color="#1ED760" />
                    </div>
                  )}

                  {/* Song Info */}
                  <div className="flex flex-col mt-4 sm:mt-0 sm:flex-1">
                    <h2 className="text-xl font-bold text-foreground truncate text-center sm:text-left">
                      {song?.isPlaying ? song.title : "Not Listening"}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm text-center sm:text-left">
                      {song?.isPlaying ? song.artist : "Spotify"}
                    </p>
                    {song?.isPlaying && (
                      <>
                        <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
                          {song.album} {song.releaseDate && `• ${song.releaseDate.slice(0, 4)}`}
                        </p>

                        {/* Progress Bar */}
                        {duration ? (
                          <div className="mt-4">
                            <div className="relative h-1 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-green-500"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>{msToTime(displayProgress)}</span>
                              <span>{msToTime(duration)}</span>
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Link>
          </MotionCard>
        </div>
      </div>
    </section>
  )
}

// helper: convert ms -> mm:ss
function msToTime(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}