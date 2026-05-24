"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
  download?: string | boolean;
}

export function LiquidButton({ children, className = "", asLink, href, download, ...props }: LiquidButtonProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const rect = mountRef.current.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(rect.width, rect.height) },
      u_hover: { value: 0.0 }
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform float u_hover;
      varying vec2 vUv;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse;
        mouse.x *= u_resolution.x / u_resolution.y;

        float dist = distance(st, mouse);
        float interaction = exp(-dist * 4.0) * u_hover;

        vec2 uv = vUv;
        uv.y += sin(uv.x * 10.0 + u_time * 2.0) * 0.05 * u_hover;
        uv.x += cos(uv.y * 10.0 + u_time * 2.0) * 0.05 * u_hover;

        vec3 color1 = vec3(0.83, 0.68, 0.21); // Warm Gold
        vec3 color2 = vec3(0.29, 0.08, 0.11); // Deep Burgundy

        vec3 color = mix(color1, color2, uv.y + interaction);
        float alpha = u_hover * 0.8;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    let targetHover = 0;
    let currentHover = 0;

    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - ((e.clientY - rect.top) / rect.height);
    };

    const handleMouseEnter = () => {
      targetHover = 1;
    };
    const handleMouseLeave = () => {
      targetHover = 0;
    };

    mountRef.current.addEventListener("mousemove", handleMouseMove);
    mountRef.current.addEventListener("mouseenter", handleMouseEnter);
    mountRef.current.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      uniforms.u_time.value += delta;

      currentHover += (targetHover - currentHover) * 0.1;
      uniforms.u_hover.value = currentHover;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1;
      uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);

      // Only render if hovered or fading out
      if (currentHover > 0.01) {
        renderer.render(scene, camera);
      } else {
        renderer.clear();
      }
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.u_resolution.value.set(rect.width, rect.height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.removeEventListener("mousemove", handleMouseMove);
        mountRef.current.removeEventListener("mouseenter", handleMouseEnter);
        mountRef.current.removeEventListener("mouseleave", handleMouseLeave);
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const BaseElement = asLink ? "a" : "button";

  return (
    <BaseElement
      href={href}
      download={download}
      className={`relative overflow-hidden group rounded-full border border-border/50 bg-background/50 backdrop-blur-md px-6 py-3 font-medium transition-all hover:border-primary/50 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props as any}
    >
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </BaseElement>
  );
}
