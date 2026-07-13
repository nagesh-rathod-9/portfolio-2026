// Projects.jsx (updated with proper links)
import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

gsap.registerPlugin(ScrollTrigger);

const HEADING_FONT = "'Sora', sans-serif";
const BODY_FONT = "'Inter', sans-serif";

const PROJECTS = [
  {
    name: "Rudraksh.kar",
    logo: "src\\assets\\projects\\rudraksh.png",
    category: "Portfolio Website",
    tagline: "A portfolio built around a photographer's eye for detail.",
    description:
      "Rudraksh.kar is a personal portfolio built for a professional photographer who needed the work itself to do the talking. Every layout decision — from spacing to how images are grouped — was made to keep the focus on the photography, not the interface around it.",
    features: [
      "Full-bleed, image-first gallery layout",
      "Smooth-scroll browsing with lightbox viewing",
      "Optimized image loading so large photo sets stay fast",
      "Fully responsive across phone, tablet, and desktop",
    ],
    tags: ["React", "Portfolio", "Photography"],
    liveUrl: "http://rudraksh-portfolio.vercel.app/",
  },
  {
    name: "SN Joshi Consultants",
    logo: "src\\assets\\projects\\snjoshi.png",
    category: "Web Application",
    tagline: "A calculation engine built for consulting engineers.",
    description:
      "An ongoing build for SN Joshi Consultants — a web application that automates water demand calculations for consulting projects. Instead of engineers running these numbers manually for every project, the platform standardizes the inputs and generates consistent, auditable outputs.",
    features: [
      "Automated water demand calculations from project inputs",
      "Structured, repeatable workflow for consulting engineers",
      "Web-based — accessible from office or site",
      "Actively expanding with new calculation modules",
    ],
    tags: ["Engineering Tool", "Automation", "Ongoing"],
    liveUrl: "#",
  },
  {
    name: "Aquasoft",
    logo: "src\\assets\\projects\\aquasoft.png",
    category: "Web & Mobile Application",
    tagline: "AMC lifecycle management for filtration & water plants.",
    description:
      "Aquasoft manages the full Annual Maintenance Contract (AMC) lifecycle for installed filtration and water treatment equipment. Field teams log service visits from a mobile app while a web dashboard gives management visibility into every unit's contract status and history.",
    features: [
      "Tracks every installed filter/plant under an active AMC",
      "Field engineers log daily service visits from the mobile app",
      "Remaining AMC duration and renewal alerts",
      "Complete service history per installed unit",
      "Separate web dashboard for admin oversight",
    ],
    tags: ["Web App", "Mobile App", "Service Management"],
    liveUrl: "https://amc.techprimelab.com/authentication/login",
  },
  {
    name: "KirloSmart",
    logo: "src\\assets\\projects\\kirloskar.png",
    category: "IoT Platform — Web & App",
    tagline: "IoT-based remote monitoring for pumps & motors.",
    description:
      "KirloSmart is an IoT product built for Kirloskar that measures and transmits real-time field parameters from pumps and motors to a cloud-based web portal for remote monitoring. It continuously senses the critical health and operational parameters of the equipment, flagging the probable causes behind pump or motor failure before they become costly breakdowns. Data reaches the cloud over wired Ethernet or mobile data (GPRS), and is available through both a web portal and a mobile app.",
    features: [
      "Real-time sensing of pressure, flow, power, voltage, current, and frequency",
      "Motor winding & bearing temperature monitoring",
      "Pump & motor bearing vibration analysis",
      "Power factor and pump run-hour tracking",
      "Cloud analytics with predictive failure alerts",
      "Data transmission via Ethernet or GPRS",
      "Remote access through web portal and mobile app",
    ],
    tags: ["IoT", "Remote Monitoring", "Predictive Alerts"],
    liveUrl: "https://www.kirlosmart.com/#/auth/login",
  },
  {
    name: "Haier",
    logo: "src\\assets\\projects\\hair.png",
    category: "Internal Workflow Tool",
    tagline: "From idea to approval, in one structured flow.",
    description:
      "An idea-management platform built for Haier's internal team. Employees submit ideas directly into the system, which routes each one through a structured, multi-stage review before a decision is made on whether and how it moves forward.",
    features: [
      "Structured idea submission for all employees",
      "Multi-stage team review and approval workflow",
      "Full visibility into an idea's status at every stage",
      "Clear path from idea to greenlit project",
    ],
    tags: ["Workflow", "Approvals", "Internal Tool"],
    liveUrl: "https://www.haier.com/global/",
  },
  {
    name: "HRMS — Techprimelab",
    logo: "src\\assets\\projects\\hrms.png",
    category: "Internal Product",
    tagline: "The company's own system for CRM and daily operations.",
    description:
      "Techprimelab's in-house HRMS — built and maintained fully in-house to run the company's day-to-day operations. It centralizes CRM data and core operational workflows into a single system used across the team.",
    features: [
      "Centralized CRM for client and lead management",
      "Core operational workflows in one place",
      "Role-based access across teams",
      "Built, owned, and maintained entirely in-house",
    ],
    tags: ["HRMS", "CRM", "Company Product"],
    liveUrl: "#",
  },
  {
    name: "Techprimelab LMS",
    logo: "src\\assets\\projects\\techprimelab.png",
    category: "Internal Product",
    tagline: "Leave management, from application to email approval.",
    description:
      "A Leave Management System paired with a companion app. Employees apply for leave directly from the app, and admins approve or reject requests straight from email — no separate admin login required to act fast.",
    features: [
      "Apply for leave directly from the mobile app",
      "Admin approval handled via email",
      "Real-time leave balance and history",
      "Fast turnaround with minimal admin overhead",
    ],
    tags: ["LMS", "Mobile App", "Approvals"],
    liveUrl: "https://lms.techprimelab.com/login",
  },
  {
    name: "Toyo Engineering",
    logo: "src\\assets\\projects\\toyo.png",
    category: "Enterprise Integration",
    tagline: "Closing the loop between Revit and STAAD teams.",
    description:
      "A Revit–STAAD integration built for Toyo Engineering. The system extracts objects and metadata directly from a Revit model and sends them through a custom API, which converts the data into a STAAD file. Structural engineers redesign in STAAD, and the updated design flows back to the Revit team — keeping architectural and structural teams in sync throughout the process.",
    features: [
      "Extracts model objects & metadata directly from Revit",
      "Custom API bridges Revit data into STAAD format",
      "Structural engineers redesign directly within STAAD",
      "Updated designs sync back to the Revit team",
      "Closes the loop between architecture and structural workflows",
    ],
    tags: ["Revit API", "STAAD", "BIM Integration"],
    liveUrl: "#",
  },
];

function ProjectCard({ project, onOpen, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(el.querySelector(".card-glow"), {
      opacity: 1,
      x: x - 100,
      y: y - 100,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(el.querySelector(".card-glow"), { opacity: 0, duration: 0.4 });
  };

  return (
    <Box
      ref={cardRef}
      className="project-card"
      data-index={index}
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        borderRadius: "26px",
        background: "linear-gradient(160deg, #0b1424, #070d17)",
        border: "1px solid rgba(255,255,255,.08)",
        p: { xs: 4, sm: 2 },
        pt:{ xs: 5, sm: 2 },
        display: "flex",
        flexDirection: "column",
        gap: 1.8,
        cursor: "pointer",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        "&:hover": {
          borderColor: "rgba(0,132,255,.35)",
          boxShadow: "0 24px 70px rgba(0,0,0,.55), 0 0 45px rgba(0,132,255,.1)",
        },
      }}
    >
      {/* Cursor-follow glow */}
      <Box
        className="card-glow"
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,132,255,0.18), transparent 70%)",
          opacity: 0,
          pointerEvents: "none",
          top: 0,
          left: 0,
        }}
      />

      {/* Logo plate */}
      <Box
        sx={{
          width: { xs: 92, sm: 104 },
          height: { xs: 58, sm: 66 },
          borderRadius: "14px",
          bgcolor: "#f4f6f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1.2,
          boxShadow: "0 10px 26px rgba(0,0,0,.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          component="img"
          src={project.logo}
          alt={`${project.name} logo`}
          sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </Box>

      <Typography
        sx={{
          color: "#0084ff",
          fontFamily: BODY_FONT,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        {project.category}
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontFamily: HEADING_FONT,
          fontWeight: 700,
          fontSize: { xs: "1.15rem", sm: "1.25rem" },
          lineHeight: 1.25,
          position: "relative",
          zIndex: 1,
        }}
      >
        {project.name}
      </Typography>

      <Typography
        sx={{
          color: "#9AA4B2",
          fontFamily: BODY_FONT,
          fontSize: "0.85rem",
          lineHeight: 1.65,
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {project.tagline}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 0.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
          {project.tags.slice(0, 2).map((tag) => (
            <Box
              key={tag}
              sx={{
                px: 1.2,
                py: 0.45,
                borderRadius: "8px",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#cfd8dc",
                fontFamily: BODY_FONT,
                fontSize: "0.66rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        <Box
          className="view-arrow"
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#0084ff,#00c6ff)",
            flexShrink: 0,
            transition: "transform 0.3s ease",
            ".project-card:hover &": { transform: "rotate(45deg)" },
          }}
        >
          <ArrowOutwardIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
      </Box>
    </Box>
  );
}

function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState("overview");
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".modal-tab-content > *",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [tab]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.05,
      onComplete: onClose,
    });
  };

  if (!project) return null;

  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 2000 }}>
      <Box
        ref={backdropRef}
        onClick={handleClose}
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(2,5,10,0.7)",
          backdropFilter: "blur(10px)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: { xs: "flex-end", sm: "center" },
          justifyContent: "center",
          p: { xs: 0, sm: 3 },
        }}
      >
        <Box
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: "100%",
            maxWidth: 720,
            maxHeight: { xs: "88vh", sm: "85vh" },
            overflowY: "auto",
            background: "linear-gradient(165deg, #0d1728, #070d17)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: { xs: "28px 28px 0 0", sm: "28px" },
            boxShadow: "0 40px 100px rgba(0,0,0,.6)",
            position: "relative",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "linear-gradient(165deg, #0d1728, #0d1728)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              p: { xs: 3, sm: 4 },
              pb: 2,
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: { xs: 64, sm: 76 },
                  height: { xs: 48, sm: 56 },
                  borderRadius: "12px",
                  bgcolor: "#f4f6f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={project.logo}
                  alt={`${project.name} logo`}
                  sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#0084ff",
                    fontFamily: BODY_FONT,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    mb: 0.4,
                  }}
                >
                  {project.category}
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: HEADING_FONT,
                    fontWeight: 700,
                    fontSize: { xs: "1.2rem", sm: "1.4rem" },
                  }}
                >
                  {project.name}
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={handleClose}
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.25s ease",
                "&:hover": { bgcolor: "rgba(255,80,80,.15)", borderColor: "rgba(255,80,80,.3)" },
              }}
            >
              <CloseRoundedIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
          </Box>

          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              px: { xs: 3, sm: 4 },
              pt: 2.5,
            }}
          >
            {["overview", "features"].map((t) => (
              <Box
                key={t}
                onClick={() => setTab(t)}
                sx={{
                  px: 2.2,
                  py: 0.9,
                  borderRadius: "50px",
                  fontFamily: BODY_FONT,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color: tab === t ? "#fff" : "#8b96a5",
                  background:
                    tab === t
                      ? "linear-gradient(135deg,#0084ff,#00c6ff)"
                      : "rgba(255,255,255,.05)",
                  border: tab === t ? "none" : "1px solid rgba(255,255,255,.08)",
                  transition: "all 0.3s ease",
                }}
              >
                {t === "overview" ? "Overview" : "Key Features"}
              </Box>
            ))}
          </Box>

          {/* Content */}
          <Box className="modal-tab-content" sx={{ p: { xs: 3, sm: 4 }, pt: 3 }}>
            {tab === "overview" && (
              <Typography
                sx={{
                  color: "#AAB3C5",
                  fontFamily: BODY_FONT,
                  fontSize: "0.92rem",
                  lineHeight: 1.9,
                }}
              >
                {project.description}
              </Typography>
            )}

            {tab === "features" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
                {project.features.map((feature) => (
                  <Box key={feature} sx={{ display: "flex", gap: 1.4, alignItems: "flex-start" }}>
                    <FiberManualRecordIcon sx={{ color: "#0084ff", fontSize: 8, mt: "8px" }} />
                    <Typography
                      sx={{
                        color: "#cfd8dc",
                        fontFamily: BODY_FONT,
                        fontSize: "0.88rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 4 }}>
              {project.tags.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.6,
                    py: 0.6,
                    borderRadius: "8px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#cfd8dc",
                    fontFamily: BODY_FONT,
                    fontSize: "0.72rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            {/* Live link */}
            <Box sx={{ mt: 4 }}>
              {project.liveUrl && project.liveUrl !== "#" ? (
                <Box
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 3,
                    py: 1.3,
                    borderRadius: "50px",
                    background: "linear-gradient(135deg,#0084ff,#00c6ff)",
                    color: "#fff",
                    fontFamily: BODY_FONT,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "opacity 0.3s ease",
                    "&:hover": { opacity: 0.88 },
                  }}
                >
                  Visit Live Project
                  <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 3,
                    py: 1.3,
                    borderRadius: "50px",
                    bgcolor: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "#6b7684",
                    fontFamily: BODY_FONT,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Live link coming soon
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
        }
      );

      gsap.to(".projects-blob-1", {
        x: 60,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".projects-blob-2", {
        x: -50,
        y: -30,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="projects"
      ref={sectionRef}
      sx={{
        minHeight: "100vh",
        bgcolor: "#04070d",
        position: "relative",
        overflow: "hidden",
        px: { xs: 4, sm: 5, md: 8, lg: 10 },
        py: { xs: 10, sm: 12, md: 14 },
      }}
    >
      {/* Ambient glow blobs */}
      <Box
        className="projects-blob-1"
        sx={{
          position: "absolute",
          width: { xs: 280, md: 650 },
          height: { xs: 280, md: 650 },
          borderRadius: "50%",
          background: "radial-gradient(circle,#0084ff 0%,transparent 70%)",
          filter: "blur(110px)",
          opacity: 0.14,
          left: { xs: -100, md: -200 },
          top: { xs: 80, md: 150 },
          pointerEvents: "none",
        }}
      />
      <Box
        className="projects-blob-2"
        sx={{
          position: "absolute",
          width: { xs: 220, md: 500 },
          height: { xs: 220, md: 500 },
          borderRadius: "50%",
          background: "radial-gradient(circle,#00c6ff 0%,transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.1,
          right: { xs: -80, md: -150 },
          bottom: { xs: 60, md: 100 },
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <Box className="projects-heading" sx={{ mb: { xs: 6, sm: 7, md: 9 }, position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            color: "#0084ff",
            fontFamily: BODY_FONT,
            letterSpacing: { xs: 3, md: 6 },
            mb: 1.5,
            fontSize: { xs: 11, md: 14 },
            fontWeight: 600,
          }}
        >
          SELECTED WORK
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontFamily: HEADING_FONT,
            fontSize: { xs: 40, sm: 54, md: 66 },
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Worked On Projects
        </Typography>

        <Typography
          sx={{
            color: "#AAB3C5",
            fontFamily: BODY_FONT,
            mt: 2,
            maxWidth: 580,
            fontSize: { xs: "13.5px", sm: "15px", md: "16px" },
            lineHeight: 1.8,
          }}
        >
          A mix of client platforms and internal company products — spanning
          web apps, mobile apps, IoT, workflow automation, and system
          integrations. Tap any project to see the full breakdown.
        </Typography>
      </Box>

      {/* Grid */}
      <Box
        className="projects-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: { xs: 2.5, sm: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} onOpen={setActiveProject} />
        ))}
      </Box>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </Box>
  );
}