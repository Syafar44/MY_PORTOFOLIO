"use client"

import type React from "react"

import { motion } from "framer-motion"

// Add the necessary imports at the top
import { useRef, useEffect, useState } from "react"
import type { Ball } from "./glass-ball"
import type { BadgeConfig } from "./types/badge-config"

interface BadgeProps {
  x: any // MotionValue<number>
  y: any // MotionValue<number>
  rotation: any // MotionValue<number>
  isMobile: boolean
  handlePointerDown: (e: React.PointerEvent) => void
  holeX: any // MotionValue<number>
  holeY: any // MotionValue<number>
  stringWidth: any // MotionValue<number>
  stringColor: any // MotionValue<number>
  anchor: { x: number; y: number }
  config: BadgeConfig
}

// Update the Badge component to include the glass ball animation
export default function Badge({
  x,
  y,
  rotation,
  isMobile,
  handlePointerDown,
  holeX,
  holeY,
  stringWidth,
  stringColor,
  anchor,
  config,
}: BadgeProps) {
  // Add refs for the container and balls
  const badgeRef = useRef<HTMLDivElement>(null)
  const ballsContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const ballsRef = useRef<Ball[]>([])
  const containerSizeRef = useRef({ width: 0, height: 0 })
  const velocityXRef = useRef(0)
  const velocityYRef = useRef(0)
  const lastRotation = useRef(0)

  // State to store the balls for rendering
  const [balls, setBalls] = useState<Ball[]>([])

  // Add a scroll velocity ref after the other refs
  const scrollVelocityRef = useRef(0)
  const lastScrollY = useRef(0)
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize balls and container size
  useEffect(() => {
    if (!badgeRef.current || !ballsContainerRef.current) return

    const badge = badgeRef.current
    const { width, height } = badge.getBoundingClientRect()
    containerSizeRef.current = { width, height }

    // Create balls - adjust count for badge size
    const ballCount = Math.floor((width * height) / 12000)
    const newBalls: Ball[] = []

    for (let i = 0; i < ballCount; i++) {
      newBalls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        radius: 10 + Math.random() * 10,
        deformation: 0,
      })
    }

    ballsRef.current = newBalls
    setBalls([...newBalls])

    startAnimation()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current

      scrollVelocityRef.current = scrollDelta * 0.2

      if (ballsRef.current.length > 0 && Math.abs(scrollDelta) > 2) {
        ballsRef.current.forEach((ball) => {
          ball.vy += scrollVelocityRef.current
          ball.vx += (Math.random() - 0.5) * Math.abs(scrollVelocityRef.current) * 0.5
        })
      }

      lastScrollY.current = currentScrollY

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }

      scrollTimerRef.current = setTimeout(() => {
        scrollVelocityRef.current = 0
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    }
  }, [isMobile])

  const startAnimation = () => {
    if (!badgeRef.current || !ballsContainerRef.current) return

    const badge = badgeRef.current
    const { width, height } = badge.getBoundingClientRect()

    const balls = ballsRef.current
    for (let i = 0; i < balls.length; i++) {
      balls[i].y = Math.random() * height
    }

    const animate = () => {
      const currentRotation = rotation.get()
      const rotationDelta = currentRotation - lastRotation.current
      lastRotation.current = currentRotation

      velocityXRef.current = x.getVelocity() * 0.08
      velocityYRef.current = y.getVelocity() * 0.08

      const balls = ballsRef.current
      const maxY = height - 10

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]

        ball.vx += rotationDelta * 0.3
        ball.vy += 0.03

        if (Math.random() < 0.1) {
          ball.vy -= 0.05 + Math.random() * 0.1
        }

        ball.vx += velocityXRef.current * 0.15
        ball.vy += velocityYRef.current * 0.15

        ball.x += ball.vx
        ball.y += ball.vy

        ball.deformation = Math.min(Math.abs(ball.vx) + Math.abs(ball.vy), 5) * 0.002

        ball.vx *= 0.995
        ball.vy *= 0.995

        const margin = ball.radius * 1.05

        if (ball.y > maxY) {
          ball.y = maxY
          ball.vy = -Math.abs(ball.vy) * 0.92
          ball.vx += (Math.random() - 0.5) * 0.5
        }

        if (ball.y < margin) {
          ball.y = margin
          ball.vy *= -0.92
          ball.vx += (Math.random() - 0.5) * 0.5
        }

        if (ball.x < margin) {
          ball.x = margin
          ball.vx *= -0.92
          ball.vy += (Math.random() - 0.5) * 0.5
        }

        if (ball.x > width - margin) {
          ball.x = width - margin
          ball.vx *= -0.92
          ball.vy += (Math.random() - 0.5) * 0.5
        }

        for (let j = i + 1; j < balls.length; j++) {
          const ball2 = balls[j]
          const dx = ball2.x - ball.x
          const dy = ball2.y - ball.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDist = ball.radius + ball2.radius

          if (distance < minDist) {
            const angle = Math.atan2(dy, dx)
            const targetX = ball.x + Math.cos(angle) * minDist
            const targetY = ball.y + Math.sin(angle) * minDist
            const ax = (targetX - ball2.x) * 0.08
            const ay = (targetY - ball2.y) * 0.08

            const energyBoost = 1.15

            ball.vx -= ax * energyBoost
            ball.vy -= ay * energyBoost
            ball2.vx += ax * energyBoost
            ball2.vy += ay * energyBoost

            ball.vx += (Math.random() - 0.5) * 0.2
            ball.vy += (Math.random() - 0.5) * 0.2
            ball2.vx += (Math.random() - 0.5) * 0.2
            ball2.vy += (Math.random() - 0.5) * 0.2
          }
        }

        if (Math.random() < 0.02) {
          ball.vx += (Math.random() - 0.5) * 1.0
          ball.vy += (Math.random() - 0.5) * 1.0 - 0.2
        }
      }

      setBalls([...balls])

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <>
      {/* Elastic string - only for desktop */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          {/* Shadow for the band to add depth */}
          <motion.line
            x1={anchor.x}
            y1={anchor.y}
            x2={holeX}
            y2={holeY}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={stringWidth}
            strokeLinecap="round"
            style={{
              filter: "blur(4px)",
              opacity: 0.5,
              transform: "translate(3px, 3px)",
            }}
          />

          {/* Main band */}
          <motion.line
            x1={anchor.x}
            y1={anchor.y}
            x2={holeX}
            y2={holeY}
            stroke={stringColor}
            strokeWidth={stringWidth}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Badge - draggable on desktop, static on mobile */}
      <motion.div
        ref={badgeRef}
        className={`${isMobile ? "relative mx-auto" : "absolute"} flex flex-col ${isMobile ? "w-[320px] h-[440px]" : "w-[380px] h-[500px]"} rounded-2xl overflow-hidden ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{
          x: isMobile ? 0 : x,
          y: isMobile ? 0 : y,
          translateX: isMobile ? undefined : "-50%",
          translateY: isMobile ? undefined : "-40px",
          rotate: isMobile ? 0 : rotation,
          boxShadow:
            "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 20px 60px -10px rgba(0, 0, 0, 0.4), 0 1px 5px rgba(0, 0, 0, 0.1), 0 -1px 1px rgba(255, 255, 255, 0.08) inset",
          transform: isMobile ? undefined : "perspective(1000px)",
          margin: isMobile ? "0 auto 24px" : undefined,
        }}
        onPointerDown={!isMobile ? handlePointerDown : undefined}
        whileTap={!isMobile ? { scale: 1.02 } : undefined}
      >
        {/* Badge hole for lanyard - only for desktop */}
        {!isMobile && (
          <div
            className="absolute w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-800"
            style={{
              left: "50%",
              top: "-3px",
              transform: "translateX(-50%)",
              zIndex: 20,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3) inset",
            }}
          />
        )}

        {/* Badge top section — Profile Image area */}
        <div
          className="text-white flex-1 relative overflow-hidden flex flex-col"
          style={{
            zIndex: 1,
            backgroundColor: '#F9F6C4',
          }}
        >
          {/* Event name - Vertical text */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center" style={{ zIndex: 10 }}>
            <div
              className="transform -rotate-90 origin-center whitespace-nowrap"
              style={{
                position: "absolute",
                left: "-30px",
                width: "100%",
                transformOrigin: "center",
              }}
            >
            </div>
          </div>

          {/* Event name - Top text */}
          <div className="pt-6 pb-3 text-center" style={{ zIndex: 10 }}>
            <h3 className="text-lg text-black font-semibold tracking-wider uppercase">{config.eventName}</h3>
          </div>

          {/* Profile Image - replaces name */}
          <div className="flex-1 flex items-center justify-center px-8 pb-4" style={{ zIndex: 10 }}>
            {config.profileImage ? (
              <div
                className="w-full rounded-xl overflow-hidden"
                style={{
                  height: isMobile ? "220px" : "260px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={config.profileImage}
                  alt={`${config.role}`}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
            ) : (
              <div
                className="w-full rounded-xl flex items-center justify-center"
                style={{
                  height: isMobile ? "220px" : "260px",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  className="font-bold text-white/80"
                  style={{ fontSize: isMobile ? "4rem" : "5rem" }}
                >
                  {config.firstName?.[0]}{config.lastName?.[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Badge bottom section — Name & Role */}
        <div
          className="relative"
          style={{
            zIndex: 1,
            backgroundColor: config.badgeBottomColor,
            minHeight: isMobile ? "130px" : "150px",
          }}
        >
          {/* Wavy border between sections */}
          <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden" style={{ zIndex: 2 }}>
            <div
              className="w-full h-12 rounded-[50%] translate-y-[-50%]"
              style={{ backgroundColor: '#F9F6C4' }}
            ></div>
          </div>

          {/* Name & Role details */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 pt-4" style={{ zIndex: 10 }}>
            {/* Full Name (role field repurposed) */}
            <p
              className="text-white/70 mt-1 tracking-wide"
              style={{ fontSize: isMobile ? "0.85rem" : "0.95rem" }}
            >
              {config.badgeId}
            </p>
            <p
              className="font-bold text-white leading-tight"
              style={{ fontSize: isMobile ? "1.4rem" : "1.6rem" }}
            >
              {config.role}
            </p>

            {/* Job title (badgeId field repurposed) */}

            {/* Company */}
            {config.company && (
              <p
                className="text-white/50 mt-1 text-sm font-mono tracking-widest"
              >
                {config.company}
              </p>
            )}
          </div>
        </div>

        {/* Container for CSS bubble balls */}
        <div
          ref={ballsContainerRef}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{ zIndex: 5 }}
        >
          {balls.map((ball, index) => (
            <div
              key={index}
              className="absolute stage"
              style={{
                width: `${ball.radius * 2}px`,
                height: `${ball.radius * 2}px`,
                transform: `translate(${ball.x - ball.radius}px, ${ball.y - ball.radius}px)`,
                margin: 0,
                padding: 0,
              }}
            >
              <figure
                className="ball bubble"
                style={{
                  transform: `scaleX(${1 + ball.deformation}) scaleY(${1 - ball.deformation})`,
                }}
              ></figure>
            </div>
          ))}
        </div>

        {/* Glass overlay effect for the entire badge */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"
          style={{ zIndex: 6 }}
        />
        <div
          className="absolute top-0 left-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-md transform translate-x-1/4 translate-y-1/4"
          style={{ zIndex: 6 }}
        />
      </motion.div>
    </>
  )
}