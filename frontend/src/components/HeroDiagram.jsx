import React from 'react';

/**
 * HeroDiagram: A technical, minimalist geometric abstraction of an intelligent
 * pipeline (input tensors -> latent space transformation -> inference layer -> runtime output).
 * Designed with precise lines, monospace data labels, and restrained acid-lime coordinates.
 */
export default function HeroDiagram() {
  return (
    <div
      className="w-full border border-[#1e2029] bg-[#0d0e13]/80 p-5 rounded-sm font-mono relative overflow-hidden"
      aria-label="Abstract neural architecture system diagram"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1e2029] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#cbfb45]/80" />
          <span className="text-[0.72rem] text-[#9699a6] tracking-wide">
            SYS_ARCH // LATENT_PIPELINE.v2
          </span>
        </div>
        <span className="text-[0.68rem] text-[#626573]">
          EPOCH: 0x4F // CSE_AIML
        </span>
      </div>

      {/* SVG Circuit / Neural Vector Graph */}
      <div className="relative py-2">
        <svg
          viewBox="0 0 540 180"
          className="w-full h-auto text-[#626573]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Points */}
          <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#20222b" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-dots)" />

          {/* Connection Lines */}
          <path
            d="M 60 90 L 160 50 L 270 90 L 380 40 L 480 90"
            stroke="#282a36"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 60 90 L 160 130 L 270 90 L 380 140 L 480 90"
            stroke="#282a36"
            strokeWidth="1.5"
          />
          <path
            d="M 160 50 L 160 130"
            stroke="#1e2029"
            strokeWidth="1"
          />
          <path
            d="M 380 40 L 380 140"
            stroke="#1e2029"
            strokeWidth="1"
          />

          {/* Highlighting Active Signal Path */}
          <path
            d="M 60 90 Q 200 30, 270 90 T 480 90"
            stroke="#cbfb45"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Node 1: Input Tensor */}
          <g>
            <rect x="25" y="72" width="70" height="36" rx="2" fill="#121318" stroke="#2c2f3c" />
            <text x="60" y="87" fill="#f5f5f3" fontSize="9" textAnchor="middle" fontWeight="500">
              INPUT
            </text>
            <text x="60" y="99" fill="#cbfb45" fontSize="7.5" textAnchor="middle">
              ℝ^(d_model)
            </text>
            <circle cx="60" cy="90" r="3" fill="#cbfb45" />
          </g>

          {/* Node 2A: Attention Head A */}
          <g>
            <rect x="125" y="32" width="70" height="34" rx="2" fill="#121318" stroke="#282a36" />
            <text x="160" y="47" fill="#9699a6" fontSize="8" textAnchor="middle">
              Q / K / V
            </text>
            <text x="160" y="58" fill="#626573" fontSize="7" textAnchor="middle">
              DIM: 512
            </text>
          </g>

          {/* Node 2B: Attention Head B */}
          <g>
            <rect x="125" y="112" width="70" height="34" rx="2" fill="#121318" stroke="#282a36" />
            <text x="160" y="127" fill="#9699a6" fontSize="8" textAnchor="middle">
              EMBED_MAP
            </text>
            <text x="160" y="138" fill="#626573" fontSize="7" textAnchor="middle">
              VOCAB_SIZE
            </text>
          </g>

          {/* Node 3: Core Latent Space */}
          <g>
            <rect x="235" y="70" width="70" height="40" rx="2" fill="#181921" stroke="#cbfb45" strokeOpacity="0.7" />
            <text x="270" y="86" fill="#f5f5f3" fontSize="8.5" textAnchor="middle" fontWeight="600">
              LATENT_z
            </text>
            <text x="270" y="99" fill="#cbfb45" fontSize="7" textAnchor="middle">
              p(z|x) ~ 𝒩(0, I)
            </text>
          </g>

          {/* Node 4A: Feed Forward */}
          <g>
            <rect x="345" y="24" width="70" height="34" rx="2" fill="#121318" stroke="#282a36" />
            <text x="380" y="39" fill="#9699a6" fontSize="8" textAnchor="middle">
              GELU / MLP
            </text>
            <text x="380" y="50" fill="#626573" fontSize="7" textAnchor="middle">
              HIDDEN: 2048
            </text>
          </g>

          {/* Node 4B: Residual Sum */}
          <g>
            <rect x="345" y="122" width="70" height="34" rx="2" fill="#121318" stroke="#282a36" />
            <text x="380" y="137" fill="#9699a6" fontSize="8" textAnchor="middle">
              NORM + RES
            </text>
            <text x="380" y="148" fill="#626573" fontSize="7" textAnchor="middle">
              RMS_LAYER
            </text>
          </g>

          {/* Node 5: Output Tensor / Softmax */}
          <g>
            <rect x="445" y="72" width="70" height="36" rx="2" fill="#121318" stroke="#2c2f3c" />
            <text x="480" y="87" fill="#f5f5f3" fontSize="9" textAnchor="middle" fontWeight="500">
              OUTPUT
            </text>
            <text x="480" y="99" fill="#cbfb45" fontSize="7.5" textAnchor="middle">
              SOFTMAX(logits)
            </text>
            <circle cx="480" cy="90" r="3" fill="#cbfb45" />
          </g>
        </svg>
      </div>

      {/* System Telemetry Footer */}
      <div className="pt-3 border-t border-[#1e2029] flex items-center justify-between text-[0.7rem] text-[#626573]">
        <div className="flex items-center gap-4">
          <span>PRECISION: FP16</span>
          <span className="hidden sm:inline">KERNEL: NATIVE_OPS</span>
        </div>
        <div className="flex items-center gap-2 text-[#9699a6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cbfb45]" />
          <span>STATUS: COMPILED</span>
        </div>
      </div>
    </div>
  );
}
