// About.jsx (final version with journey progress bar - corrected order)
import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import reactLogo from "../assets/react.png";
import typescriptLogo from "../assets/typescript.png";
import sqlLogo from "../assets/sql.png";
import csharpLogo from "../assets/c-sharp.png";
import mongoLogo from "../assets/mongo-db.png";
import tailwindLogo from "../assets/tailwind.png";
import gitLogo from "../assets/git.png";
import net from "../assets/net.png";
import js from "../assets/js.png";
import gsaplogo from "../assets/gsap.png";
import mui from "../assets/mui.png";
import three from "../assets/three.png";
import Next from "../assets/next.png";
import node from "../assets/node.png";
import express from "../assets/express.png";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  "RESTful APIs",
  "Microservices Architecture",
  "Database Optimization",
  "CI/CD Pipelines",
  "Cloud Deployment (AWS/Azure)",
  "Unit Testing",
  "Agile/Scrum",
  "Code Review & Mentoring",
  "Performance Optimization",
  "Security Best Practices",
];

const technologies = [
  {
    name: "React",
    icon: reactLogo,
  },
  {
    name: "Next.js",
    icon: Next,
  },
  {
    name: "JavaScript",
    icon: js,
  },
  {
    name: "TypeScript",
    icon: typescriptLogo,
  },
  {
    name: "Tailwind",
    icon: tailwindLogo,
  },
  {
    name: "MUI",
    icon: mui,
  },
  {
    name: "GSAP",
    icon: gsaplogo,
  },
  {
    name: "Three.js",
    icon: three,
  },
  {
    name: ".NET",
    icon: net,
  },
  {
    name: "C#",
    icon: csharpLogo,
  },
  {
    name: "Node Js",
    icon: node,
  },
  {
    name: "Express Js",
    icon: express,
  },
  {
    name: "SQL",
    icon: sqlLogo,
  },
  {
    name: "MongoDB",
    icon: mongoLogo,
  },
  {
    name: "Git",
    icon: gitLogo,
  },
];

// Experiences ordered from oldest (top) to current (bottom)
const experiences = [
  {
    title: "Software Developer Intern",
    company: "A2Z IT Hub",
    period: "6 Months",
    type: "Internship",
    description: "Gained hands-on experience in web development and software engineering practices.",
    highlights: [
      "Developed responsive web applications",
      "Collaborated with cross-functional teams",
      "Implemented RESTful APIs",
      "Participated in code reviews and agile processes"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Techprimelab",
    period: "June 2024 - Present",
    type: "Full-time",
    description: "Building enterprise-grade web applications and internal products using React, .NET Core, and cloud technologies.",
    highlights: [
      "Developing scalable full-stack applications",
      "Implementing microservices architecture",
      "Optimizing database performance",
      "Mentoring junior developers"
    ]
  }
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animations
      gsap.fromTo(
        ".about-content",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Journey progress bar animation
      gsap.fromTo(
        ".journey-bar",
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".journey-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".journey-step",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journey-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Tech stack animations
      gsap.fromTo(
        ".tech-card",
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating animation for tech cards
      gsap.to(".tech-card", {
        y: -8,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });

      // Expertise tags animation
      gsap.fromTo(
        ".expertise-tag",
        {
          scale: 0,
          opacity: 0,
          rotation: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".expertise-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stats counter animation
      gsap.fromTo(
        ".stat-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Background parallax effect
      gsap.to(".bg-dev", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="about"
      sx={{
        minHeight: "100vh",
        bgcolor: "#040811",
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 15 },
        px: { xs: 3, md: 10 },
      }}
    >
      {/* BLUE GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "#0084ff",
          filter: "blur(220px)",
          opacity: 0.12,
          left: -300,
          top: -100,
        }}
      />

      {/* BACKGROUND TEXT */}
      <Typography
        className="bg-dev"
        sx={{
          position: "absolute",
          right: -50,
          top: 100,
          fontSize: "320px",
          fontWeight: 900,
          color: "rgba(255,255,255,.02)",
          userSelect: "none",
          pointerEvents: "none",
          display: { xs: "none", lg: "block" },
        }}
      >
        DEV
      </Typography>

      {/* ABOUT ME SECTION WITH JOURNEY SIDE BY SIDE */}
      <Box className="about-content" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            color: "#0084ff",
            letterSpacing: 6,
            fontSize: 14,
            mb: 3,
            fontWeight: 600,
          }}
        >
          ABOUT ME
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 8 },
            alignItems: { xs: "stretch", md: "flex-start" },
          }}
        >
          {/* LEFT SIDE - Heading and Description */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "baseline" }}>
              <Typography
                sx={{
                  fontSize: { xs: "40px", sm: "60px", md: "80px", lg: "110px" },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "#fff",
                }}
              >
                I BUILD
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "40px", sm: "60px", md: "80px", lg: "110px" },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "#38404d",
                }}
              >
                SCALABLE
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "40px", sm: "60px", md: "80px", lg: "110px" },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "#fff",
                }}
              >
                PRODUCTS
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#AAB3C5",
                fontSize: { xs: 15, md: 18 },
                lineHeight: 2,
                mt: 4,
              }}
            >
              Full Stack Developer with 2+ years of experience building
              enterprise-grade applications using React, TypeScript, .NET Core,
              and SQL Server. Passionate about creating high-performance,
              user-centric solutions with clean, maintainable code.
              <br />
              <br />I specialize in building robust backend systems with
              microservices architecture, designing efficient databases, and
              creating seamless frontend experiences. My approach combines
              technical excellence with a deep understanding of business
              requirements to deliver scalable, production-ready applications.
            </Typography>

            {/* STATS */}
            <Box className="stats-section" sx={{ display: "flex", gap: 3, mt: 6, flexWrap: "wrap" }}>
              {[
                ["2.5+", "Years Experience"],
                ["7+", "Worked On Projects"],
              ].map((item) => (
                <Box
                  key={item[0]}
                  className="stat-card"
                  sx={{
                    p: 4,
                    flex: 1,
                    minWidth: 160,
                    borderRadius: "24px",
                    background: "rgba(255,255,255,.04)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(0,132,255,.08)",
                      border: "1px solid rgba(0,132,255,.2)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: { xs: 36, md: 48 },
                      fontWeight: 900,
                    }}
                  >
                    {item[0]}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#AAB3C5",
                      fontSize: { xs: 12, md: 14 },
                      mt: 1,
                    }}
                  >
                    {item[1]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* RIGHT SIDE - Journey Progress Bar */}
          <Box
            className="journey-section"
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 400px" },
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <WorkHistoryIcon sx={{ color: "#0084ff", fontSize: 40 }} />
              My Journey
            </Typography>

            <Box sx={{ position: "relative", pl: { xs: 4, md: 6 } }}>
              {/* Vertical Background Track */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 16, md: 24 },
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                }}
              />
              {/* Animated Progress Bar */}
              <Box
                className="journey-bar"
                sx={{
                  position: "absolute",
                  left: { xs: 16, md: 24 },
                  top: 0,
                  height: "100%",
                  width: 3,
                  background: "linear-gradient(180deg, #0084ff 0%, #00c6ff 100%)",
                  borderRadius: "2px",
                  boxShadow: "0 0 20px rgba(0,132,255,0.5)",
                  transformOrigin: "top",
                }}
              />

              {experiences.map((exp, index) => (
                <Box
                  key={index}
                  className="journey-step"
                  sx={{
                    position: "relative",
                    mb: 8,
                    pl: { xs: 6, md: 6 },
                  }}
                >
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: -28, md: -36 },
                      top: 8,
                      width: index === experiences.length - 1 ? 24 : 20,
                      height: index === experiences.length - 1 ? 24 : 20,
                      borderRadius: "50%",
                      background: index === experiences.length - 1 
                        ? "linear-gradient(135deg, #00c6ff, #0084ff)" 
                        : "linear-gradient(135deg, #0084ff, #00c6ff)",
                      border: index === experiences.length - 1 
                        ? "4px solid #040811" 
                        : "4px solid #040811",
                      boxShadow: index === experiences.length - 1 
                        ? "0 0 30px rgba(0,132,255,0.6), 0 0 60px rgba(0,198,255,0.3)" 
                        : "0 0 20px rgba(0,132,255,0.3)",
                      zIndex: 2,
                      animation: index === experiences.length - 1 
                        ? "pulse 2s infinite" 
                        : "none",
                      "@keyframes pulse": {
                        "0%": {
                          boxShadow: "0 0 20px rgba(0,132,255,0.4)",
                        },
                        "50%": {
                          boxShadow: "0 0 40px rgba(0,132,255,0.8), 0 0 80px rgba(0,198,255,0.4)",
                        },
                        "100%": {
                          boxShadow: "0 0 20px rgba(0,132,255,0.4)",
                        },
                      },
                    }}
                  />

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      background: index === experiences.length - 1 
                        ? "rgba(0,132,255,.06)" 
                        : "rgba(255,255,255,.04)",
                      backdropFilter: "blur(20px)",
                      border: index === experiences.length - 1 
                        ? "1px solid rgba(0,132,255,.15)" 
                        : "1px solid rgba(255,255,255,.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(0,132,255,.08)",
                        border: "1px solid rgba(0,132,255,.2)",
                        transform: "translateX(5px)",
                        boxShadow: "0 10px 30px rgba(0,132,255,.15)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography
                        sx={{
                          color: "#0084ff",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {exp.period}
                      </Typography>
                      {index === experiences.length - 1 && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.3,
                            borderRadius: "50px",
                            background: "linear-gradient(135deg, rgba(0,132,255,0.2), rgba(0,198,255,0.2))",
                            border: "1px solid rgba(0,132,255,0.3)",
                            color: "#00c6ff",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                          }}
                        >
                          CURRENT
                        </Box>
                      )}
                    </Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 18, md: 22 },
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#0084ff",
                        fontSize: 14,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      {exp.company}
                      {index === 0 && <SchoolIcon sx={{ fontSize: 16, opacity: 0.8 }} />}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#AAB3C5",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* EXPERTISE SECTION - Full Width */}
      <Box className="expertise-section" sx={{ mt: 4, position: "relative", zIndex: 1,p: { xs: 2, md: 0 }, pr: { xs: 3, md: 10 } }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 36, md: 48 },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Core Expertise
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {expertise.map((item) => (
            <Box
              key={item}
              className="expertise-tag"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: "50px",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "#AAB3C5",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontWeight: 500,
                letterSpacing: "0.3px",
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, rgba(0,132,255,0.05), rgba(0,198,255,0.05))",
                  opacity: 0,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  border: "1px solid rgba(0,132,255,0.4)",
                  background: "rgba(0,132,255,0.08)",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(0,132,255,0.12)",
                  color: "#fff",
                  "&::before": {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#0084ff",
                  opacity: 0.6,
                  mr: 1,
                }}
              />
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      {/* TECH STACK SECTION - Full Width */}
      <Box sx={{ mt: 12, position: "relative", zIndex: 1 , p: { xs: 2, md: 0 }}}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 36, md: 48 },
            fontWeight: 700,
            mb: 5,
          }}
        >
          Tech Stack
        </Typography>

        <Box
          className="skills-grid"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(4, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(6, 1fr)",
              lg: "repeat(8, 1fr)",
            },
            gap: 3,
          }}
        >
          {technologies.map((skill) => (
            <Box
              key={skill.name}
              className="tech-card"
              sx={{
                height: { xs: 100, md: 110 },
                borderRadius: "24px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px) scale(1.02)",
                  border: "1px solid #0084ff",
                  boxShadow: "0 20px 40px rgba(0,132,255,.15)",
                  background: "rgba(0,132,255,.05)",
                },
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                }}
              />
              <Typography
                sx={{
                  mt: 2,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: { xs: 13, md: 16 },
                }}
              >
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}