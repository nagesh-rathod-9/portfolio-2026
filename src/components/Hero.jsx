import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const glowRef = useRef(null);
  const expRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Resolve blur value in JS instead of an invalid string-interpolated
  // sx breakpoint object (the original `blur({xs:60,...}px)` is not
  // valid CSS and gets silently dropped by the browser).
  const glowBlur = isMobile ? 60 : isTablet ? 100 : 150;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );

      tl.fromTo(
        imageRef.current,
        {
          x: isMobile ? 0 : -150,
          y: isMobile ? -50 : 0,
          opacity: 0,
        },
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      tl.fromTo(
        titleRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" },
        "-=0.7"
      );

      // Floating Glow
      gsap.to(glowRef.current, {
        x: 40,
        y: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating Experience Card
      gsap.to(expRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });

      // Image Parallax on Scroll (disabled on mobile for performance)
      if (!isMobile) {
        gsap.to(imageRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Text Parallax on Scroll (disabled on mobile)
        gsap.to(titleRef.current, {
          x: -100,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // Custom Cursor Follower (disabled on mobile)
      if (!isMobile) {
        const moveCursor = (e) => {
          gsap.to(cursorFollowerRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
          window.removeEventListener("mousemove", moveCursor);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Image Spotlight Effect (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

    const imageContainer = imageContainerRef.current;
    const spotlight = spotlightRef.current;

    if (!imageContainer || !spotlight) return;

    const handleMouseMove = (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(spotlight, {
        x: x - 100,
        y: y - 100,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      setIsHoveringImage(true);
      gsap.to(spotlight, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(cursorFollowerRef.current, {
        scale: 1.5,
        borderColor: "rgba(0, 132, 255, 0.8)",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      setIsHoveringImage(false);
      gsap.to(spotlight, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(cursorFollowerRef.current, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.5)",
        duration: 0.3,
      });
    };

    imageContainer.addEventListener("mousemove", handleMouseMove);
    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <Box
      ref={heroRef}
      sx={{
        minHeight: "100vh",
        bgcolor: "#040811",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.5, sm: 3, md: 4 },
        pt: { xs: 12, sm: 12, md: 0 }, // room for fixed navbar on mobile
        cursor: isMobile ? "auto" : "none",
      }}
    >
      {/* Custom Cursor Follower - Hidden on mobile */}
      {!isMobile && (
        <Box
          ref={cursorFollowerRef}
          sx={{
            position: "fixed",
            top: 0,
            left: -16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.5)",
            pointerEvents: "none",
            zIndex: 1000,
            transition: "border-color 0.3s, transform 0.3s",
            mixBlendMode: "difference",
          }}
        />
      )}

      {/* Glow - Responsive sizing (blur now resolved in JS, not a broken string template) */}
      <Box
        ref={glowRef}
        sx={{
          position: "absolute",
          width: { xs: 260, sm: 500, md: 700, lg: 900 },
          height: { xs: 260, sm: 500, md: 700, lg: 900 },
          borderRadius: "50%",
          background: "radial-gradient(circle,#0084ff 0%,transparent 70%)",
          filter: `blur(${glowBlur}px)`,
          opacity: 0.25,
          right: { xs: -80, sm: -150, md: -250 },
          top: { xs: -40, sm: -150, md: -250 },
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <Box
        ref={cardRef}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          minHeight: { xs: "100vh", md: "720px" },
          borderRadius: { xs: "20px", sm: "28px", md: "32px" },
          background: "linear-gradient(135deg,#070d18,#0d1728)",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* IMAGE */}
        <Box
          ref={imageContainerRef}
          sx={{
            width: { xs: "100%", md: "38%" },
            height: { xs: "50vh", sm: "400px", md: "auto" },
            position: "relative",
            overflow: "hidden",
            cursor: isMobile ? "auto" : "none",
            order: { xs: -1, md: 0 },
            flexShrink: 0,
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }} />

          <img
            ref={imageRef}
            src="/profile.jpg"
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
          />

          {/* Spotlight Effect - Hidden on mobile */}
          {!isMobile && (
            <Box
              ref={spotlightRef}
              sx={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)",
                boxShadow: "0 0 40px 20px rgba(0,132,255,0.3)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                pointerEvents: "none",
                transform: "scale(0.8)",
                opacity: 0,
                left: 0,
                top: 0,
                zIndex: 5,
              }}
            />
          )}
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            pl: { xs: 2.5, sm: 4, md: 6, lg: 10 },
            pr: { xs: 2.5, sm: 4, md: 6, lg: 0 },
            py: { xs: 4, sm: 6, md: 8 },
            zIndex: 5,
            minWidth: 0, // prevents flex overflow on small screens
          }}
        >
          <Typography
            sx={{
              color: "#0084ff",
              letterSpacing: { xs: 2, sm: 4, md: 6 },
              mb: { xs: 1.2, sm: 2 },
              fontSize: { xs: 10, sm: 12, md: 14 },
              fontWeight: 600,
            }}
          >
            FULL STACK DEVELOPER
          </Typography>

          <Box ref={titleRef} sx={{ maxWidth: "100%", overflow: "hidden" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "clamp(2.2rem, 12vw, 2.8rem)",
                  sm: "60px",
                  md: "90px",
                  lg: "120px",
                  xl: "140px",
                },
                color: "#fff",
                fontWeight: 900,
                lineHeight: 0.9,
                fontFamily: "Anton, sans-serif",
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
              }}
            >
              NAGESH
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "clamp(2.2rem, 12vw, 2.8rem)",
                  sm: "60px",
                  md: "90px",
                  lg: "120px",
                  xl: "140px",
                },
                color: "#394150",
                fontWeight: 900,
                lineHeight: 0.9,
                fontFamily: "Anton, sans-serif",
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
              }}
            >
              RATHOD
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: { xs: 2.5, sm: 4 },
              color: "#AAB3C5",
              maxWidth: { xs: "100%", md: 450, lg: 550 },
              lineHeight: 1.8,
              fontSize: { xs: "13.5px", sm: "15px", md: "16px" },
            }}
          >
            Building scalable web applications using React, TypeScript, .NET,
            SQL Server and modern UI technologies.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 2 }}
            sx={{ mt: { xs: 3.5, sm: 5 } }}
          >
            <Button
              endIcon={<ArrowOutwardIcon />}
              fullWidth={isMobile}
              sx={{
                bgcolor: "#0084ff",
                color: "#fff",
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                "&:hover": { bgcolor: "#0066cc" },
              }}
            >
              Download Resume
            </Button>
          </Stack>
        </Box>

        {/* Experience Card - Responsive positioning */}
        <Box
          ref={expRef}
          sx={{
            position: "absolute",
            bottom: { xs: "auto", md: 50 },
            top: { xs: 16, sm: 24, md: "auto" },
            right: { xs: 16, sm: 24, md: "auto" },
            left: { xs: "auto", md: "34%" },
            p: { xs: 1.5, sm: 2.5, md: 3 },
            borderRadius: { xs: "12px", sm: "20px" },
            bgcolor: "rgba(10,16,26,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.12)",
            zIndex: 10,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "13px", sm: "16px", md: "18px" },
            }}
          >
            2.5+ Years
          </Typography>

          <Typography
            sx={{
              color: "#9AA4B2",
              fontSize: { xs: "10px", sm: "13px", md: "14px" },
            }}
          >
            Experience
          </Typography>
        </Box>

        {/* Background Text - Responsive */}
        <Typography
          sx={{
            position: "absolute",
            right: { xs: 10, sm: 20, md: 30 },
            bottom: { xs: -20, sm: -35, md: -50 },
            fontSize: { xs: "80px", sm: "140px", md: "200px", lg: "260px" },
            fontWeight: 900,
            color: "rgba(255,255,255,.03)",
            userSelect: "none",
            display: { xs: "none", sm: "block" },
            pointerEvents: "none",
          }}
        >
          2026
        </Typography>
      </Box>
    </Box>
  );
}