// Contact.jsx (left-aligned content)
import { Box, Typography, TextField, Button, IconButton, Snackbar, Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SendIcon from "@mui/icons-material/Send";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: EmailOutlinedIcon,
    label: "Email",
    value: "nagesh13212@gmail.com",
    href: "mailto:nagesh13212@gmail.com",
  },
  {
    icon: PhoneOutlinedIcon,
    label: "Phone",
    value: "+91 7666969836",
    href: "tel:+917666969836",
  },
  {
    icon: LocationOnOutlinedIcon,
    label: "Location",
    value: "Maharashtra, India",
    href: "#",
  },
];

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/nageshrathod", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/in/nagesh-rathod-580383283", label: "LinkedIn" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading animations
      gsap.fromTo(
        ".contact-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Left content animation
      gsap.fromTo(
        ".contact-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-left",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Contact info cards
      gsap.fromTo(
        ".contact-info-card",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".contact-info-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form fields stagger animation
      gsap.fromTo(
        ".form-field",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Social icons animation
      gsap.fromTo(
        ".social-icon",
        { scale: 0, opacity: 0, rotation: -30 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background blob animations
      gsap.to(".contact-blob-1", {
        x: 80,
        y: -40,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".contact-blob-2", {
        x: -60,
        y: 30,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".contact-blob-3", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
      });
      return;
    }

    // Animate form on submit
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Simulate form submission
        setSnackbar({
          open: true,
          message: "Message sent successfully! I'll get back to you soon.",
          severity: "success",
        });
        
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      },
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      id="contact"
      ref={sectionRef}
      sx={{
        minHeight: "100vh",
        bgcolor: "#040811",
        position: "relative",
        overflow: "hidden",
        py: { xs: 10, md: 15 },
        px: { xs: 3, md: 10 },
      }}
    >
      {/* Background Blobs */}
      <Box
        className="contact-blob-1"
        sx={{
          position: "absolute",
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          borderRadius: "50%",
          background: "radial-gradient(circle, #0084ff 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.08,
          top: { xs: -50, md: -100 },
          right: { xs: -50, md: -100 },
          pointerEvents: "none",
        }}
      />
      <Box
        className="contact-blob-2"
        sx={{
          position: "absolute",
          width: { xs: 250, md: 500 },
          height: { xs: 250, md: 500 },
          borderRadius: "50%",
          background: "radial-gradient(circle, #00c6ff 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.06,
          bottom: { xs: -50, md: -100 },
          left: { xs: -50, md: -100 },
          pointerEvents: "none",
        }}
      />
      <Box
        className="contact-blob-3"
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #0084ff 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.04,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section Heading - Left Aligned */}
      <Box className="contact-heading" sx={{ mb: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            color: "#0084ff",
            letterSpacing: { xs: 4, md: 8 },
            mb: 2,
            fontSize: { xs: 12, md: 14 },
            fontWeight: 600,
          }}
        >
          GET IN TOUCH
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 40, sm: 60, md: 80 },
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Let's Work{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #0084ff, #00c6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Together
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#AAB3C5",
            mt: 3,
            maxWidth: 600,
            fontSize: { xs: 15, md: 18 },
            lineHeight: 1.8,
          }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you. 
          Fill out the form below and I'll get back to you within 24 hours.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 6, lg: 8 },
          position: "relative",
          zIndex: 1,
          maxWidth: 1400,
        }}
      >
        {/* Left Side - Contact Info */}
        <Box
          className="contact-left"
          sx={{
            flex: { xs: "1 1 100%", lg: "1 1 40%" },
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              mb: 1,
            }}
          >
            Contact Information
          </Typography>
          <Typography
            sx={{
              color: "#AAB3C5",
              fontSize: 16,
              lineHeight: 1.6,
              mb: 5,
            }}
          >
            Feel free to reach out through any of these channels
          </Typography>

          {/* Contact Info Cards */}
          <Box className="contact-info-cards" sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 6 }}>
            {contactInfo.map((info, index) => (
              <Box
                key={index}
                className="contact-info-card"
                component="a"
                href={info.href}
                target={info.href.startsWith("mailto") || info.href.startsWith("tel") ? "_self" : "_blank"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 3,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,.06)",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: info.href !== "#" ? "pointer" : "default",
                  "&:hover": {
                    background: "rgba(0,132,255,.08)",
                    border: "1px solid rgba(0,132,255,.2)",
                    transform: "translateX(8px)",
                    boxShadow: "0 10px 30px rgba(0,132,255,.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(0,132,255,0.1), rgba(0,198,255,0.1))",
                    border: "1px solid rgba(0,132,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    ".contact-info-card:hover &": {
                      background: "linear-gradient(135deg, #0084ff, #00c6ff)",
                      boxShadow: "0 0 30px rgba(0,132,255,.4)",
                    },
                  }}
                >
                  <info.icon
                    sx={{
                      color: "#0084ff",
                      fontSize: 24,
                      transition: "color 0.3s ease",
                      ".contact-info-card:hover &": { color: "#fff" },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#AAB3C5",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    {info.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: { xs: 15, md: 17 },
                      fontWeight: 600,
                    }}
                  >
                    {info.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Side - Contact Form */}
        <Box
          className="contact-form"
          ref={formRef}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: { xs: "1 1 100%", lg: "1 1 60%" },
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: "28px",
            background: "linear-gradient(160deg, rgba(255,255,255,.03), rgba(255,255,255,.01))",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Form background gradient */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,132,255,0.3), transparent)",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Name & Email Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              <Box className="form-field">
                <Typography
                  sx={{
                    color: "#AAB3C5",
                    fontSize: 13,
                    fontWeight: 600,
                    mb: 1,
                    letterSpacing: 0.5,
                  }}
                >
                  Full Name *
                </Typography>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.08)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      "& fieldset": { border: "none" },
                      "&:hover": {
                        background: "rgba(255,255,255,.05)",
                      },
                      "&.Mui-focused": {
                        background: "rgba(0,132,255,.05)",
                        border: "1px solid rgba(0,132,255,.3)",
                        boxShadow: "0 0 20px rgba(0,132,255,.1)",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      py: 1.8,
                      "&::placeholder": {
                        color: "rgba(255,255,255,.3)",
                      },
                    },
                  }}
                />
              </Box>

              <Box className="form-field">
                <Typography
                  sx={{
                    color: "#AAB3C5",
                    fontSize: 13,
                    fontWeight: 600,
                    mb: 1,
                    letterSpacing: 0.5,
                  }}
                >
                  Email Address *
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.08)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      "& fieldset": { border: "none" },
                      "&:hover": {
                        background: "rgba(255,255,255,.05)",
                      },
                      "&.Mui-focused": {
                        background: "rgba(0,132,255,.05)",
                        border: "1px solid rgba(0,132,255,.3)",
                        boxShadow: "0 0 20px rgba(0,132,255,.1)",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      py: 1.8,
                      "&::placeholder": {
                        color: "rgba(255,255,255,.3)",
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Subject */}
            <Box className="form-field">
              <Typography
                sx={{
                  color: "#AAB3C5",
                  fontSize: 13,
                  fontWeight: 600,
                  mb: 1,
                  letterSpacing: 0.5,
                }}
              >
                Subject
              </Typography>
              <TextField
                fullWidth
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Collaboration"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.08)",
                    color: "#fff",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "& fieldset": { border: "none" },
                    "&:hover": {
                      background: "rgba(255,255,255,.05)",
                    },
                    "&.Mui-focused": {
                      background: "rgba(0,132,255,.05)",
                      border: "1px solid rgba(0,132,255,.3)",
                      boxShadow: "0 0 20px rgba(0,132,255,.1)",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1.8,
                    "&::placeholder": {
                      color: "rgba(255,255,255,.3)",
                    },
                  },
                }}
              />
            </Box>

            {/* Message */}
            <Box className="form-field">
              <Typography
                sx={{
                  color: "#AAB3C5",
                  fontSize: 13,
                  fontWeight: 600,
                  mb: 1,
                  letterSpacing: 0.5,
                }}
              >
                Message *
              </Typography>
              <TextField
                fullWidth
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                variant="outlined"
                multiline
                rows={5}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.08)",
                    color: "#fff",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "& fieldset": { border: "none" },
                    "&:hover": {
                      background: "rgba(255,255,255,.05)",
                    },
                    "&.Mui-focused": {
                      background: "rgba(0,132,255,.05)",
                      border: "1px solid rgba(0,132,255,.3)",
                      boxShadow: "0 0 20px rgba(0,132,255,.1)",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1.8,
                    "&::placeholder": {
                      color: "rgba(255,255,255,.3)",
                    },
                  },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Box className="form-field" sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                endIcon={<SendIcon />}
                sx={{
                  py: 2.2,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #0084ff, #00c6ff)",
                  color: "#fff",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "none",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "left 0.5s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 20px 40px rgba(0,132,255,.3)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          icon={snackbar.severity === "success" ? <CheckCircleIcon /> : undefined} 
          sx={{
            width: "100%",
            borderRadius: "12px",
            background: snackbar.severity === "success"
              ? "linear-gradient(135deg, #0084ff, #00c6ff)"
              : "linear-gradient(135deg, #ff4757, #ff6b81)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 10px 30px rgba(0,0,0,.3)",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}