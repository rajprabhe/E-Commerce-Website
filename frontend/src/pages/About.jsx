import React from "react";

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #09090b 0%, #111827 50%, #18181b 100%)",
        color: "#fff",
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <span
            style={{
              background: "#f97316",
              padding: "8px 18px",
              borderRadius: "25px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ABOUT US
          </span>

          <h1
            style={{
              fontSize: "56px",
              marginTop: "25px",
              marginBottom: "20px",
            }}
          >
            Building Modern Shopping Experiences
          </h1>

          <p
            style={{
              color: "#a1a1aa",
              fontSize: "18px",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Shop is a modern e-commerce application built to demonstrate
            scalable web development practices using React, Node.js, MongoDB,
            and modern UI technologies. Our mission is to create fast,
            beautiful, and reliable shopping experiences.
          </p>
        </div>

        {/* Our Story */}
        <div
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ color: "#f97316", marginBottom: "20px" }}>
            Our Story
          </h2>

          <p
            style={{
              color: "#c4c4c4",
              lineHeight: "1.9",
              fontSize: "17px",
            }}
          >
            This project was created to explore modern full-stack web
            development. It showcases authentication, product management,
            shopping carts, secure payments, order tracking, and responsive UI
            while following industry best practices.
          </p>
        </div>

        {/* Mission & Vision */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,.04)",
              borderRadius: "18px",
              padding: "35px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2 style={{ color: "#f97316", marginBottom: "15px" }}>
              Our Mission
            </h2>

            <p style={{ color: "#c4c4c4", lineHeight: "1.8" }}>
              To demonstrate how scalable, secure, and user-friendly
              e-commerce platforms are designed using modern web technologies.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.04)",
              borderRadius: "18px",
              padding: "35px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2 style={{ color: "#f97316", marginBottom: "15px" }}>
              Our Vision
            </h2>

            <p style={{ color: "#c4c4c4", lineHeight: "1.8" }}>
              To inspire developers by providing a clean, maintainable, and
              production-ready architecture for modern web applications.
            </p>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            background: "rgba(255,255,255,.04)",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "40px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              color: "#f97316",
              marginBottom: "30px",
            }}
          >
            What We Offer
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
            }}
          >
            {[
              "Secure Authentication",
              "Product Catalog",
              "Shopping Cart",
              "Order Management",
              "Responsive Design",
              "Online Payments",
              "Admin Dashboard",
              "Fast Performance",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "#1f2937",
                  padding: "25px",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
              >
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div
          style={{
            background: "rgba(255,255,255,.04)",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "40px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2 style={{ color: "#f97316", marginBottom: "20px" }}>
            Why Choose Shop?
          </h2>

          <p
            style={{
              color: "#c4c4c4",
              lineHeight: "1.9",
              fontSize: "17px",
            }}
          >
            Our application focuses on performance, security, simplicity, and
            clean user experience. Every feature is designed to reflect
            real-world e-commerce workflows while maintaining modern design
            standards and responsive layouts.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {[
            {
              number: "100%",
              title: "Responsive",
            },
            {
              number: "24/7",
              title: "Availability",
            },
            {
              number: "Modern",
              title: "Technology",
            },
            {
              number: "Secure",
              title: "Payments",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                textAlign: "center",
                background: "#18181b",
                padding: "35px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h1
                style={{
                  color: "#f97316",
                  fontSize: "42px",
                }}
              >
                {item.number}
              </h1>

              <p
                style={{
                  color: "#a1a1aa",
                }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            color: "#71717a",
            fontSize: "15px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "30px",
          }}
        >
          © {new Date().getFullYear()} Shop • Built with React, Node.js &
          MongoDB
        </div>
      </div>
    </div>
  );
};

export default About;