# 3D Portfolio Upgrade

## What will change
- **3D hero:** an interactive abstract neural network (glowing-free, matte nodes and fine connection lines in navy and warm grey) floats behind your centered name. It slowly rotates, gently follows the mouse, and pulses signals along connections.
- **Tilting project cards:** the three project cards tilt in 3D toward the cursor with a soft light sheen; edit buttons and links keep working.
- **Depth on scroll:** sections, timeline entries, and skill groups rise in with subtle 3D perspective; the hero network drifts back as you scroll.
- Everything else (content, palette, fonts, contact form, résumé download, editor) stays as-is.

## Performance and accessibility
- Fewer nodes and lower detail on phones; touch devices skip cursor tilt.
- Reduced-motion users get a still network and no tilt/depth motion.
- The name and buttons stay fully readable over the 3D scene; a plain fallback shows if 3D can't load.

## Technical details
- Add three, @react-three/fiber v9, @react-three/drei v10; the scene loads client-only (lazy + ClientOnly) so server rendering is unaffected.
- Network built from instanced spheres + line segments, capped pixel ratio, local Lightformer environment (no CDN presets).
- Card tilt via a lightweight pointer-driven CSS transform; scroll depth via existing IntersectionObserver reveal classes extended with perspective.
- Verify with screenshots on desktop and mobile, console clean.
