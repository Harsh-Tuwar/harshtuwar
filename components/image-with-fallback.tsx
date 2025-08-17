"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallback?: string
}

export function ImageWithFallback({ fallback = "/placeholder.svg", alt, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  return (
    <Image
      {...props}
      alt={alt}
      src={error ? fallback : props.src}
      onError={() => setError(true)}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  )
}
