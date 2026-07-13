// Navbar.jsx (fixed navigation)
import { Box, Button, Typography, IconButton } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "Profile", icon: PersonOutlineRoundedIcon, sectionId: "about" },
  { label: "Projects", icon: WorkOutlineRoundedIcon, sectionId: "projects" },
  { label: "Contact", icon: MailOutlineRoundedIcon, sectionId: "contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Profile");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const overlayRef = useRef(null);
  const backdropRef = useRef(null);

  // --- Navbar entrance / ambient animations ---
  useEffect(() => {
    gsap.fromTo(
      ".navbar-container",
      { y: -100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    gsap.to(".logo-icon", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(".status-dot", {
      scale: 1.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(".glow-effect", {
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // --- Update active item based on scroll position ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      const sections = NAV_ITEMS.map(item => {
        const element = document.getElementById(item.sectionId);
        if (element) {
          return {
            label: item.label,
            offsetTop: element.offsetTop,
            offsetBottom: element.offsetTop + element.offsetHeight,
          };
        }
        return null;
      }).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          setActiveItem(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Mobile menu open/close choreography ---
  useEffect(() => {
    if (mobileOpen) setRenderMenu(true);
  }, [mobileOpen]);

  useEffect(() => {
    if (!renderMenu) return;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(overlayRef.current, { pointerEvents: "auto" });

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        ".mobile-menu-panel",
        { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
        {
          clipPath: "circle(150% at calc(100% - 40px) 40px)",
          duration: 0.7,
          ease: "power3.inOut",
        }
      );

      gsap.fromTo(
        ".mobile-menu-blob",
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );

      gsap.fromTo(
        ".mobile-nav-row",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          delay: 0.25,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".mobile-menu-footer",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.55, ease: "power3.out" }
      );
    } else {
      gsap.to(".mobile-nav-row", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });

      gsap.to(".mobile-menu-footer", {
        y: 10,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });

      gsap.to(".mobile-menu-panel", {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.5,
        delay: 0.05,
        ease: "power3.inOut",
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          setRenderMenu(false);
          document.body.style.overflow = "";
        },
      });
    }
  }, [mobileOpen, renderMenu]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = (label) => {
    setActiveItem(label);
    setMobileOpen(false);
    
    // Find the section ID for this nav item
    const navItem = NAV_ITEMS.find(item => item.label === label);
    const sectionId = navItem ? navItem.sectionId : label.toLowerCase();
    
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, mobileOpen ? 350 : 100); // Wait for menu close animation only on mobile
    }
  };

  return (
    <>
      <Box
        className="navbar-container"
        sx={{
          position: "fixed",
          top: { xs: 12, sm: 20, md: 30 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1200,

          width: {
            xs: "92%",
            sm: "92%",
            md: "1100px",
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          px: { xs: 2, md: 4 },
          py: { xs: 1.2, md: 2 },

          borderRadius: { xs: "18px", md: "24px" },

          background:
            "linear-gradient(135deg, rgba(8,15,25,0.95), rgba(15,25,40,0.85))",

          backdropFilter: "blur(30px)",

          border: "1px solid rgba(255,255,255,.08)",

          boxShadow: `
            0 15px 60px rgba(0,0,0,.6),
            inset 0 1px 0 rgba(255,255,255,.05)
          `,

          transition: "all 0.3s ease",

          "&:hover": {
            border: "1px solid rgba(0,132,255,.2)",
            boxShadow: `
              0 15px 60px rgba(0,0,0,.6),
              0 0 40px rgba(0,132,255,.05),
              inset 0 1px 0 rgba(255,255,255,.05)
            `,
          },
        }}
      >
        {/* Glow effect behind navbar */}
        <Box
          className="glow-effect"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "120%",
            background: "radial-gradient(circle, rgba(0,132,255,0.06), transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            opacity: 0.3,
          }}
        />

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 1.5 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            className="logo-icon"
            sx={{
              width: { xs: 38, sm: 42, md: 48 },
              height: { xs: 38, sm: 42, md: 48 },
              borderRadius: { xs: "10px", md: "14px" },
              background: "linear-gradient(135deg,#0084ff,#00c6ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 30px rgba(0,132,255,.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(10deg)",
                boxShadow: "0 0 50px rgba(0,132,255,.6)",
              },
            }}
          >
            <CodeIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 24, md: 28 } }} />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "0.78rem", sm: "0.95rem", md: "1.1rem" },
                letterSpacing: { xs: 1, md: 1.5 },
                background: "linear-gradient(135deg, #fff, #a8c8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                whiteSpace: "nowrap",
              }}
            >
              NAGESH RATHOD
            </Typography>

            <Typography
              sx={{
                color: "#7f8c9d",
                fontSize: { xs: "0.52rem", sm: "0.6rem", md: "0.7rem" },
                letterSpacing: { xs: 1, md: 2 },
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Full Stack Dev
            </Typography>
          </Box>
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 0.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {NAV_ITEMS.map(({ label }) => (
            <Button
              key={label}
              onClick={() => handleNavClick(label)}
              sx={{
                color: activeItem === label ? "#fff" : "#cfd8dc",
                px: 3,
                py: 1.2,
                borderRadius: "16px",
                position: "relative",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "0.9rem",
                fontWeight: activeItem === label ? 700 : 500,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  background:
                    activeItem === label
                      ? "linear-gradient(135deg, rgba(0,132,255,0.2), rgba(0,198,255,0.1))"
                      : "transparent",
                  border:
                    activeItem === label
                      ? "1px solid rgba(0,132,255,0.3)"
                      : "1px solid transparent",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: activeItem === label ? 1 : 0,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 6,
                  left: "50%",
                  transform:
                    activeItem === label
                      ? "translateX(-50%) scaleX(1)"
                      : "translateX(-50%) scaleX(0)",
                  width: "20px",
                  height: "3px",
                  borderRadius: "3px",
                  background: "linear-gradient(90deg, #0084ff, #00c6ff)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 0 20px rgba(0,132,255,.5)",
                },
                "&:hover": {
                  color: "#fff",
                  transform: "translateY(-2px)",
                  background:
                    activeItem === label
                      ? "linear-gradient(135deg, rgba(0,132,255,0.2), rgba(0,198,255,0.1))"
                      : "rgba(255,255,255,0.05)",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right side: status (desktop) + mobile hamburger */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: "50px",
              background: "rgba(0,255,136,0.05)",
              border: "1px solid rgba(0,255,136,0.1)",
            }}
          >
            <Box
              className="status-dot"
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#00ff88",
                boxShadow: "0 0 20px rgba(0,255,136,.4)",
              }}
            />
            <Typography
              sx={{ color: "#b0bec5", fontSize: "0.8rem", fontWeight: 500, letterSpacing: 0.5 }}
            >
              Available for work
            </Typography>
          </Box>

          <Box
            className="status-dot"
            sx={{
              display: { xs: "block", md: "none" },
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#00ff88",
              boxShadow: "0 0 15px #00ff88",
            }}
          />

          {/* Mobile hamburger / close toggle */}
          <IconButton
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            sx={{
              display: { xs: "flex", md: "none" },
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: mobileOpen ? "rgba(0,132,255,.15)" : "rgba(255,255,255,.05)",
              border: mobileOpen
                ? "1px solid rgba(0,132,255,.35)"
                : "1px solid rgba(255,255,255,.08)",
              transition: "all 0.3s ease",
              zIndex: 1300,
              "&:hover": {
                background: "rgba(0,132,255,.1)",
                border: "1px solid rgba(0,132,255,.3)",
              },
            }}
          >
            <Box sx={{ position: "relative", width: 20, height: 14 }}>
              <Box
                sx={{
                  position: "absolute",
                  top: mobileOpen ? "6px" : "0px",
                  left: 0,
                  width: 20,
                  height: 2,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "6px",
                  left: 0,
                  width: 20,
                  height: 2,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "translateX(-8px)" : "translateX(0)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: mobileOpen ? "6px" : "12px",
                  left: 0,
                  width: 20,
                  height: 2,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
                }}
              />
            </Box>
          </IconButton>
        </Box>
      </Box>

      {/* ---------------- Advanced Full-Screen Mobile Menu ---------------- */}
      {renderMenu && (
        <Box
          ref={overlayRef}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            display: { xs: "block", md: "none" },
          }}
        >
          {/* Backdrop */}
          <Box
            ref={backdropRef}
            onClick={() => setMobileOpen(false)}
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(2,5,10,0.55)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Panel (clip-path circle reveal) */}
          <Box
            className="mobile-menu-panel"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 90% 5%, #0d1a2e 0%, #060a12 55%, #030509 100%)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              px: 3.5,
              pt: { xs: 12, sm: 14 },
              pb: 4,
            }}
          >
            {/* Decorative glow blobs */}
            <Box
              className="mobile-menu-blob"
              sx={{
                position: "absolute",
                width: 260,
                height: 260,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,132,255,0.35), transparent 70%)",
                top: -60,
                right: -60,
                filter: "blur(10px)",
                pointerEvents: "none",
              }}
            />
            <Box
              className="mobile-menu-blob"
              sx={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,198,255,0.2), transparent 70%)",
                bottom: 40,
                left: -60,
                filter: "blur(10px)",
                pointerEvents: "none",
              }}
            />

            {/* Nav rows */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                position: "relative",
                zIndex: 1,
                flex: 1,
              }}
            >
              {NAV_ITEMS.map(({ label, icon: Icon }, idx) => {
                const isActive = activeItem === label;
                return (
                  <Box
                    key={label}
                    className="mobile-nav-row"
                    onClick={() => handleNavClick(label)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 2.2,
                      borderBottom: "1px solid rgba(255,255,255,.08)",
                      cursor: "pointer",
                      transition: "padding-left 0.3s ease",
                      "&:active": { pl: 1 },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: isActive ? "#0084ff" : "rgba(255,255,255,0.25)",
                          fontVariantNumeric: "tabular-nums",
                          transition: "color 0.3s ease",
                        }}
                      >
                        0{idx + 1}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "1.9rem",
                          fontWeight: 800,
                          letterSpacing: "-0.01em",
                          background: isActive
                            ? "linear-gradient(135deg, #fff, #7fc4ff)"
                            : "none",
                          color: isActive ? "transparent" : "#e6ebf2",
                          WebkitBackgroundClip: isActive ? "text" : "unset",
                          backgroundClip: isActive ? "text" : "unset",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isActive
                          ? "linear-gradient(135deg,#0084ff,#00c6ff)"
                          : "rgba(255,255,255,0.06)",
                        border: isActive
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isActive ? "0 0 25px rgba(0,132,255,.5)" : "none",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: "#fff", fontSize: 20 }} />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Footer: CTA + status + socials */}
            <Box
              className="mobile-menu-footer"
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                pt: 3,
              }}
            >
              <Button
                fullWidth
                endIcon={<ArrowOutwardIcon />}
                onClick={() => handleNavClick("Contact")}
                sx={{
                  bgcolor: "#0084ff",
                  color: "#fff",
                  py: 1.4,
                  borderRadius: "50px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#0066cc" },
                }}
              >
                Let's Talk
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.8,
                    py: 0.7,
                    borderRadius: "50px",
                    background: "rgba(0,255,136,0.06)",
                    border: "1px solid rgba(0,255,136,0.15)",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#00ff88",
                      boxShadow: "0 0 12px #00ff88",
                    }}
                  />
                  <Typography sx={{ color: "#b0bec5", fontSize: "0.72rem", fontWeight: 500 }}>
                    Available for work
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    href="https://github.com/nageshrathod"
                    target="_blank"
                    sx={{
                      color: "#cfd8dc",
                      border: "1px solid rgba(255,255,255,.1)",
                      "&:hover": { color: "#0084ff", borderColor: "rgba(0,132,255,.3)" },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    href="https://linkedin.com/in/nageshrathod"
                    target="_blank"
                    sx={{
                      color: "#cfd8dc",
                      border: "1px solid rgba(255,255,255,.1)",
                      "&:hover": { color: "#0084ff", borderColor: "rgba(0,132,255,.3)" },
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}