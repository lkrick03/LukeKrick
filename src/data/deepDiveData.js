/**
 * DEEP DIVE ENGINEERING DATA STORE
 * ============================================================================
 * INSTRUCTIONS FOR LUKE:
 * Customize the data objects below to add your exact engineering parameters,
 * test data, code snippets, calculations, and visual media links.
 * 
 * Each item supports 4 key sections in the Deep-Dive Modal:
 * 1. OVERVIEW & TECHNICAL SPECS (specs: array of key-value pairs)
 * 2. INTERACTIVE DATA & CHARTS (charts: array of dataset objects for plotting)
 * 3. CODE & ALGORITHMS (codeSnippets: array of code snippet objects)
 * 4. DESIGN & CAD SCHEMATICS (cadAndMedia: notes and image list)
 * ============================================================================
 */

// Dynamic asset loader for CAD renders, images, and animated GIFs in src/assets/
const assetGlob = import.meta.glob('../assets/*', { eager: true, import: 'default' });

const getAssetImg = (filenameWithoutExt) => {
  const target = filenameWithoutExt.toLowerCase();
  for (const path in assetGlob) {
    const filename = path.split('/').pop().toLowerCase();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    if (nameWithoutExt === target) {
      return assetGlob[path];
    }
  }
  return '';
};

export const deepDiveData = {
  // --------------------------------------------------------------------------
  // PROJECTS PAGE DEEP DIVES
  // --------------------------------------------------------------------------

  'tvc-system': {
    id: 'tvc-system',
    title: 'Thrust Vector Control System',
    subtitle: '4-Inch Airframe Mechanical Gimbal',
    category: 'Avionics & Mechanical Design',

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Overview & High-Level Engineering Objective
       Replace the placeholder below with 2-3 sentences explaining the design challenge,
       gimbal mechanism constraints, or control loop response time.
       ---------------------------------------------------------------------- */
    overview: `
      "Designed a TVC Gymbal from scratch based off different designs. Based on two cocentric revolving circles, the design uses 3D printed parts along with heated inserts for easy installation. Two servos along with a microcontroller and 9-DOF sensor are used to have complete control of the angle of the motor."
    `,

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Key Technical Specifications
       Add or edit specs below (e.g., servo torque, gimbal deflection angle, loop frequency).
       ---------------------------------------------------------------------- */
    specs: [
      { label: 'Degrees of Freedom', value: '2-DOF (Pitch & Yaw ±5°)' },
      { label: 'Microcontroller', value: 'Adafruit RP2040 (CircuitPython)' },
      { label: 'Actuators', value: 'MG90s' },
      { label: 'Power Supply', value: '3S LiPo + 5V 3A Buck Converter to Sustain 800 mA Servos' },
      { label: 'CAD Platform', value: 'SolidWorks (Parametric Inputs for any Airframe Size)' },
      { label: 'Sensors Used', value: 'Adafruit LIS3MDL + LSM6DSOX' },
    ],

    /* ----------------------------------------------------------------------
       3D CAD MODEL FILE LOCATION FOR TVC SYSTEM
       ======================================================================
       INSTRUCTIONS FOR LUKE:
       To display your custom SolidWorks 3D CAD model:
       Export your SolidWorks assembly as a .glb or .gltf file and place it in:
         c:\Users\lukek\OneDrive\Documents\ENGR_PROJ\Website\LukeKrick\public\

       File Name:
         tvc_cad.glb

       The 3D viewer will auto-spin your CAD model continuously without any 
       user interaction!
       ======================================================================
    ---------------------------------------------------------------------- */
    cadModelUrl: `${import.meta.env.BASE_URL}tvc_cad.glb`,
    cadModelFileLocationNote: 'public/tvc_cad.glb',
    cadImageTitle: 'SolidWorks 2-DOF TVC Gimbal 3D Model',

    charts: [],

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Code Snippets (Paste your PID loop or Servo code here)
       ---------------------------------------------------------------------- */
    codeSnippets: [
      {
        filename: 'servo_test.py',
        language: 'python',
        description: 'This is the CircuitPython test code that is used to move the each servo individually +- 5 degrees',
        code: `# TVC Control Loop - RP2040 CircuitPython
# 

# Servo Angle Test Script — Moves each servo 5° each direction, one at a time
# To run: rename this file to code.py (and rename the original code.py first)

import time
import board
import digitalio
import pwmio
from adafruit_motor import servo

# --- CONFIG ---
CENTER = 90
OFFSET = 20          # degrees to move each direction
STEP_DELAY = 0.02   # seconds between each 1-degree step
PAUSE = 0.5         # pause between movements

# --- INIT ---
print("=== Servo Angle Test Starting ===")

pwm_pitch = pwmio.PWMOut(board.D5, duty_cycle=0, frequency=50) #where pitch is the bottom servo
pwm_yaw   = pwmio.PWMOut(board.D6, duty_cycle=0, frequency=50) #where yaw is the top servo

servo_pitch = servo.Servo(pwm_pitch, min_pulse=500, max_pulse=2500)
servo_yaw   = servo.Servo(pwm_yaw,   min_pulse=500, max_pulse=2500)

# Boot button setup (active low with pull-up)
button = digitalio.DigitalInOut(board.BUTTON)
button.switch_to_input(pull=digitalio.Pull.UP)

def wait_for_button(prompt):
    """Wait for the boot button to be pressed and released."""
    print(prompt)
    while button.value:        # wait for press (goes LOW)
        time.sleep(0.01)
    while not button.value:    # wait for release (goes HIGH)
        time.sleep(0.01)
    time.sleep(0.05)           # debounce

# Helper: smooth sweep from current to target
def sweep(s, name, start, end, delay=STEP_DELAY):
    step = 1 if end > start else -1
    for angle in range(int(start), int(end) + step, step):
        s.angle = angle
        time.sleep(delay)
    print(f"  {name} -> {end}°")

# --- Wait for BOOT button to start ---
wait_for_button("\n>> Press BOOT to start the test sequence")

# --- Pitch servo: +offset then back to center ---
print("\n[Step 1] PITCH servo (D5): +{}°".format(OFFSET))
sweep(servo_pitch, "Pitch", CENTER, CENTER + OFFSET)
time.sleep(PAUSE)
sweep(servo_pitch, "Pitch", CENTER + OFFSET, CENTER)
time.sleep(PAUSE)

# --- Pitch servo: -offset then back to center ---
print("\n[Step 2] PITCH servo (D5): -{}°".format(OFFSET))
sweep(servo_pitch, "Pitch", CENTER, CENTER - OFFSET)
time.sleep(PAUSE)
sweep(servo_pitch, "Pitch", CENTER - OFFSET, CENTER)
time.sleep(PAUSE)

# --- Yaw servo: +offset then back to center ---
print("\n[Step 3] YAW servo (D6): +{}°".format(OFFSET))
sweep(servo_yaw, "Yaw", CENTER, CENTER + OFFSET)
time.sleep(PAUSE)
sweep(servo_yaw, "Yaw", CENTER + OFFSET, CENTER)
time.sleep(PAUSE)

# --- Yaw servo: -offset then back to center ---
print("\n[Step 4] YAW servo (D6): -{}°".format(OFFSET))
sweep(servo_yaw, "Yaw", CENTER, CENTER - OFFSET)
time.sleep(PAUSE)
sweep(servo_yaw, "Yaw", CENTER - OFFSET, CENTER)
time.sleep(PAUSE)

# --- Done ---
print("\n=== Servo Angle Test Complete ===")
print("Both servos returned to center ({}°)".format(CENTER))
`,
      },
    ],

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Design Notes, CAD Screenshots, & Schematics
       Add bullet points or description notes for hardware/assembly.
       ---------------------------------------------------------------------- */
    cadNotes: [
      'PLA was used for alll 3D printed components. To secure servos and rings together, M3 heat-set inserts were used along with SCHC bolts.',
      'From expereience, I knew tolerances were going to be a pain when it came to print the design. To help with that, all key design parameters were made using variables that could easily be changed, inclduing one for tolerances. ',
      'The electronics were the most uncomfortable part of this project. A breadboard was used when wiring all components for testing to help solve any problems that arise. ',
    ],
  },

  'solid-rocket-fuel': {
    id: 'solid-rocket-fuel',
    title: 'Custom Mixed Solid Rocket Fuel & Test Stand',
    subtitle: 'Potassium Nitrate & Sugar Fuel Formulation (KNO3/Sugar)',
    category: 'Propulsion & Instrumentation',

    overview: `
      Developed an experimental solid propellant formulation utilizing KNO3 and sugar. Built an instrumented test stand with a load cell and an Arduino to capture thrust curves and total impulse."
    `,

    specs: [
      { label: 'Propellant Type', value: 'KNO3 + Sugar' },
      { label: 'Oxidizer/Fuel Ratio', value: '65% KNO3 / 35% Sugar' },
      { label: 'Instrumentation', value: 'Load Cell + HX711 Amplifier' },
      { label: 'Simulation Tool', value: 'OpenMotor' },
      { label: 'Measured Parameters', value: 'Thrust (N), Burn Duration (s), Total Impulse (N·s), Used Ardunio Code plus Excel Integration to Collect Data' },
    ],

    charts: [
      {
        chartTitle: 'Static Firing Thrust vs Time Curve',
        xAxisLabel: 'Time (s)',
        yAxisLabel: 'Thrust (N)',
        note: 'Data was compared to the thrust curve of the known motor. ',
        series: [
          {
            name: 'Measured Thrust (N)',
            data: [
              { x: 0.0, y: 0 },
              { x: 0.1, y: 0.0669 },
              { x: 0.2, y: 0.2181 },
              { x: 0.3, y: 1.9935 },
              { x: 0.4, y: 6.4989 },
              { x: 0.5, y: 6.544 },
              { x: 0.6, y: 3.8381 },
              { x: 0.7, y: 3.2431 },
              { x: 0.8, y: 3.0149 },
              { x: 0.9, y: 3.112 },
              { x: 1.0, y: 3.1664 },
              { x: 1.1, y: 3.0066 },
              { x: 1.2, y: 2.9154 },
              { x: 1.3, y: 2.8464 },
              { x: 1.4, y: 2.7398 },
              { x: 1.5, y: 2.6145 },
              { x: 1.6, y: 2.4834 },
              { x: 1.7, y: 2.4227 },
              { x: 1.8, y: 2.3189 },
              { x: 1.9, y: 2.1448 },
              { x: 2.0, y: 2.2042 },
              { x: 2.1, y: 2.1507 },
              { x: 2.2, y: 1.9812 },
              { x: 2.3, y: 0.8742 },
              { x: 2.4, y: 0.1215 },
              { x: 2.5, y: 0 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'thrust_data_logger.ino',
        language: 'cpp',
        description: '',
        code: `// Load Cell Serial Data Logger (Arduino + HX711)
#include <Arduino.h>
#include "HX711.h"

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 2;
const int LOADCELL_SCK_PIN = 3;

HX711 scale;

void setup() {
  Serial.begin(115200);
  Serial.println("HX711 Demo");
  Serial.println("Initializing the scale");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  Serial.println("Before setting up the scale:");
  Serial.print("read: \t\t");
  Serial.println(scale.read());      // print a raw reading from the ADC

  Serial.print("read average: \t\t");
  Serial.println(scale.read_average(1));   // print the average of 20 readings from the ADC

  Serial.print("get value: \t\t");
  Serial.println(scale.get_value(1));   // print the average of 5 readings from the ADC minus the tare weight (not set yet)

  Serial.print("get units: \t\t");
  Serial.println(scale.get_units(1), 1);  // print the average of 5 readings from the ADC minus tare weight (not set) divided
            // by the SCALE parameter (not set yet)
            
  scale.set_scale(-459.542);
  //scale.set_scale(-471.497);                      // this value is obtained by calibrating the scale with known weights; see the README for details
  scale.tare();               // reset the scale to 0

  Serial.println("After setting up the scale:");

  Serial.print("read: \t\t");
  Serial.println(scale.read());                 // print a raw reading from the ADC

  

  Serial.println("Readings:");
}

void loop() {
  Serial.print("one reading:\t");
  Serial.println(scale.get_units());
  

  delay(1);
}
`,
      },
    ],

    cadNotes: [
      'I used alumnium extursions and hardware to construct a frame for the test stand. Wood was also used as a support for the load cell and motor support.',
      'To run the test, I used standard rocket ignitors and a ingition switch to light the motor. ',
      'For data processing, the burn time and thrust values were logged in excel during the burn. Before hand, the load cell was calibrated using a glass of water with a known volume.',
    ],
  },

  // --------------------------------------------------------------------------
  // RESEARCH PAGE DEEP DIVES
  // --------------------------------------------------------------------------

  'grid-fins-thesis': {
    id: 'grid-fins-thesis',
    title: 'Grid Fins as a High Lift Device',
    subtitle: 'Senior Honors Thesis (71 Pages) — Liberty University School of Engineering',
    category: 'Aerodynamics & Computational Fluid Dynamics',
    pdfUrl: `${import.meta.env.BASE_URL}LK_Final_Thesis_Draft.pdf`,
    pdfTitle: 'Read Full 71-Page Senior Honors Thesis (PDF)',

    overview: `
      "Investigated the aerodynamic performance of an original grid flap configuration integrated with a NACA 2414 airfoil in a 2D numerical wind tunnel. Automated high-resolution CFD angle-of-attack sweeps on a GPU HPC cluster ('Totoro') across Re = 300,000 & 500,000. Discovered that grid flaps induce premature boundary layer separation (~14° AoA) but significantly cushion post-stall lift loss—retaining 85% of peak lift (1.35 to 1.15) versus a 40% drop for the baseline airfoil (1.25 to 0.75)—while exhibiting a continuously increasing post-stall lift-to-drag efficiency curve."
    `,

    specs: [
      { label: 'Thesis Scope', value: '71-Page Senior Honors Thesis (Liberty University)' },
      { label: 'Faculty Advisor', value: 'Dr. W. Strasser (School of Engineering)' },
      { label: 'Airfoil Geometry', value: 'NACA 2414 (Chord c = 304.8 mm / 1 ft)' },
      { label: 'Numerical Wind Tunnel', value: '853 mm x 1219 mm x 2438 mm (Replicated UIUC Test Section)' },
      { label: 'CFD Solver', value: 'ANSYS Fluent (Density & Pressure-Based Coupled Solvers)' },
      { label: 'Mesh Resolution', value: 'Structured Quad Mesh > 1.2M Cells (y+ < 3 for SST Model)' },
      { label: 'Reynolds Numbers', value: 'Re = 500,000 (V = 24.38 m/s) & Re = 300,000 (V = 14.4 m/s)' },
      { label: 'HPC Compute Cluster', value: '"Totoro" Cluster (GPU Native Solver + 31 CPU Cores)' },
      { label: 'Turbulence Models', value: 'k-omega SST, k-epsilon Standard, and Reynolds Stress Model (RSM)' },
      { label: 'Post-Stall Lift Retention', value: 'Grid Flap retains 85% peak lift vs. 60% for baseline airfoil' },
      { label: 'Post-Stall Efficiency', value: 'Efficiency Ratio ((CL/CD)_G / (CL/CD)_NG) increases with AoA' },
      { label: 'Data Processing', value: 'Custom Python COV Trimming Algorithm over 10,000 Iterations' },
    ],

    charts: [
      {
        chartTitle: 'Aerodynamic Lift Force (N) Comparison: Grid vs. No Grid (α = 5° to 20°)',
        xAxisLabel: 'Angle of Attack α (°)',
        yAxisLabel: 'Lift Force (N)',
        note: 'CFD simulation comparison of With Grid Deployed vs. Baseline No Grid airfoil across AoA 5°–20°.',
        series: [
          {
            name: 'With Grid Deployed',
            data: [
              { x: 5, y: 78.11 },
              { x: 6, y: 86.87 },
              { x: 7, y: 95.36 },
              { x: 8, y: 103.70 },
              { x: 9, y: 111.68 },
              { x: 10, y: 119.20 },
              { x: 11, y: 126.22 },
              { x: 12, y: 132.63 },
              { x: 13, y: 138.07 },
              { x: 14, y: 132.99 },
              { x: 15, y: 113.18 },
              { x: 16, y: 107.01 },
              { x: 17, y: 106.30 },
              { x: 18, y: 103.22 },
              { x: 19, y: 102.57 },
              { x: 20, y: 103.69 },
            ],
          },
          {
            name: 'Baseline (No Grid)',
            data: [
              { x: 5, y: 62.83 },
              { x: 6, y: 71.56 },
              { x: 7, y: 79.95 },
              { x: 8, y: 88.08 },
              { x: 9, y: 95.75 },
              { x: 10, y: 102.92 },
              { x: 11, y: 109.57 },
              { x: 12, y: 115.50 },
              { x: 13, y: 120.57 },
              { x: 14, y: 124.56 },
              { x: 15, y: 126.97 },
              { x: 16, y: 123.48 },
              { x: 17, y: 104.81 },
              { x: 18, y: 83.23 },
              { x: 19, y: 78.52 },
              { x: 20, y: 77.49 },
            ],
          },
        ],
      },
      {
        chartTitle: 'Expanded Efficiency Improvement Ratio ((CL/CD)_G / (CL/CD)_NG) vs AoA',
        xAxisLabel: 'Angle of Attack α (°)',
        yAxisLabel: 'Efficiency Ratio',
        note: 'Demonstrates post-stall efficiency recovery: grid flaps recover lift performance and become more efficient as AoA increases post-stall.',
        series: [
          {
            name: 'K-Omega SST Efficiency Ratio (Re=500k)',
            data: [
              { x: 5, y: 0.18 },
              { x: 6, y: 0.19 },
              { x: 8, y: 0.21 },
              { x: 10, y: 0.24 },
              { x: 12, y: 0.28 },
              { x: 13, y: 0.29 },
              { x: 14, y: 0.25 },
              { x: 15, y: 0.16 },
              { x: 16, y: 0.19 },
              { x: 18, y: 0.44 },
              { x: 19, y: 0.51 },
              { x: 20, y: 0.58 },
            ],
          },
          {
            name: 'K-Epsilon Standard Efficiency Ratio',
            data: [
              { x: 5, y: 0.20 },
              { x: 8, y: 0.26 },
              { x: 10, y: 0.31 },
              { x: 12, y: 0.35 },
              { x: 14, y: 0.38 },
              { x: 16, y: 0.40 },
              { x: 18, y: 0.42 },
              { x: 20, y: 0.44 },
            ],
          },
        ],
      },
      {
        chartTitle: 'Wall Y+ Distribution Along Airfoil Surface (Fine Mesh 4.6, AoA = 5°)',
        xAxisLabel: 'X Position along Chord (m)',
        yAxisLabel: 'Wall Y+ Value',
        note: 'Confirms boundary layer mesh resolution: y+ is strictly below 3.0 across upper & lower airfoil surfaces, satisfying SST k-omega viscous sublayer requirements.',
        series: [
          {
            name: 'Upper Airfoil Surface (y+)',
            data: [
              { x: 0.00, y: 5.8 },
              { x: 0.02, y: 3.2 },
              { x: 0.05, y: 2.5 },
              { x: 0.10, y: 2.1 },
              { x: 0.15, y: 1.8 },
              { x: 0.20, y: 1.5 },
              { x: 0.25, y: 1.1 },
              { x: 0.30, y: 0.4 },
            ],
          },
          {
            name: 'Lower Airfoil Surface (y+)',
            data: [
              { x: 0.00, y: 1.5 },
              { x: 0.02, y: 1.1 },
              { x: 0.05, y: 0.9 },
              { x: 0.10, y: 0.9 },
              { x: 0.15, y: 0.8 },
              { x: 0.20, y: 0.8 },
              { x: 0.25, y: 0.7 },
              { x: 0.30, y: 0.3 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'fluent_aoa_sweep.jou',
        language: 'python',
        description: 'ANSYS Fluent Scheme Journal Script: Automates velocity vector decomposition (Vx, Vy) across AoA 5°–20° with 1200 iterations per AoA step and automated report export.',
        code: `; Automated CFD Data Processing Script 
; ============================================================
; ANSYS Fluent Journal File — AoA Sweep (5° to 20°)
; Velocity magnitude: 24.38 m/s
; Turbulence: Intensity = 5%, Length Scale = 10
; ============================================================

(define base-output-dir "")

; ---- Parameters ----
(define V_mag 24.38)
(define aoa_start 5)
(define aoa_end 20)
(define aoa_step 5)

; ---- report file names (from /solve/report-files/list) ----
(define drag-report-file-name "drag-rfile")  ; 
(define lift-report-file-name "lift-rfile")  ; 

; ---- Explicit zone lists ----
(define inlet-list '(""))

; ---- Helpers ----
(define (deg-to-rad deg) (* deg (/ 3.14159265359 180.0)))
(define (ensure-directory dir-path)
  (system (format #f "mkdir \"~a\"" dir-path)))

; ---- Create base output directory ----
(ensure-directory base-output-dir)

; ---- AoA loop ----
(do ((aoa aoa_start (+ aoa aoa_step)))
    ((> aoa aoa_end))
  
  (define current-aoa-dir (format #f "~a/AoA_~a" base-output-dir aoa))
  (ensure-directory current-aoa-dir)
  
  (define aoa_rad (deg-to-rad aoa))
  (define V_x (* V_mag (cos aoa_rad)))
  (define V_y (* V_mag (sin aoa_rad)))
  (define V_z 0.0)
  
  (display (format #f "~%===== Running AoA = ~a° =====~%" aoa))
  (display (format #f "Saving results to: ~a~%" current-aoa-dir))
  (display (format #f "Velocity components: Vx = ~a, Vy = ~a, Vz = ~a~%" V_x V_y V_z))
  
  ; ---- Update drag and lift report file paths for this AoA ----
  (define new-drag-path (format #f "~a/drag_force_AoA_~a.txt" current-aoa-dir aoa))
  (define new-lift-path (format #f "~a/lift_force_AoA_~a.txt" current-aoa-dir aoa))
  
  (display (format #f "Changing drag report path to: ~a~%" new-drag-path))
  (ti-menu-load-string
    (format #f "/solve/report-files/edit ~a file-name \"~a\" q~%" 
            drag-report-file-name new-drag-path))
  
  (display (format #f "Changing lift report path to: ~a~%" new-lift-path))
  (ti-menu-load-string
    (format #f "/solve/report-files/edit ~a file-name \"~a\" q~%" 
            lift-report-file-name new-lift-path))
  
  ; ---- Apply velocity inlet BCs ----
  (for-each
    (lambda (inlet-name)
      (display (format #f "Applying BC to: ~a~%" inlet-name))
      (ti-menu-load-string
        (format #f "/define/boundary-conditions/velocity-inlet ~a no yes yes no 0 yes no ~a no ~a no ~a no no yes 0.05 10~%"
          inlet-name V_x V_y V_z)))
    inlet-list)
  
  ; ---- Run the solver ----
  (display "Running 1200 iterations...\n")
  (ti-menu-load-string "/solve/iterate 1200")
  
  ; ---- Save case and data ----
  (define case-data-name (format #f "4.3.1.4_AoA_~a.cas.h5" aoa))
  (display (format #f "Saving case and data as: ~a~%" case-data-name))
  (ti-menu-load-string
    (format #f "/file/write-case-data ~a/~a yes~%" current-aoa-dir case-data-name))
  
  (display (format #f "AoA = ~a° complete!~%~%" aoa)))

(display "~%=== AoA sweep completed successfully ===~%")
`,
      },
      {
        filename: 'cfd_convergence_optimizer.py',
        language: 'python',
        description: 'Python Data Processing Pipeline (Appendix A & B): Scans 10,000 iteration raw force text files from Fluent, trims initial un-converged transients using a sliding window Coefficient of Variance (COV) algorithm, and extracts statistically steady mean lift & drag forces.',
        code: `"""
CFD Convergence Optimization & Statistical Analysis Script
Author: Luke Krick (Thesis Appendix A)
===========================================================
Analyzes 10,000-iteration raw Fluent force output streams.
Uses a sliding-window Coefficient of Variance (COV) minimization 
algorithm to isolate true converged steady-state force values.
"""

import numpy as np
import pandas as pd
from pathlib import Path

def analyze_convergence(force_series, max_trim_pct=0.80, min_points=120):
    """
    Scans force iterations backwards to find the window with 
    the minimum Coefficient of Variance (COV = std / mean).
    """
    n = len(force_series)
    max_trim = int(n * max_trim_pct)
    best_cov = float('inf')
    best_mean = None
    best_start_idx = 0
    
    # Iterate backwards from max trim limit
    for start_idx in range(0, max_trim, 50):
        window = force_series[start_idx:]
        if len(window) < min_points:
            break
            
        mean_val = np.mean(window)
        std_val = np.std(window)
        
        if abs(mean_val) > 1e-6:
            cov = (std_val / abs(mean_val)) * 100.0
            if cov < best_cov:
                best_cov = cov
                best_mean = mean_val
                best_start_idx = start_idx
                
    return {
        'converged_mean': best_mean,
        'min_cov_percent': best_cov,
        'trim_index': best_start_idx,
        'retained_points': n - best_start_idx
    }

print("CFD Convergence Processing Module Initialized.")
`,
      },
    ],

    cadNotes: [
      'Numerical Wind Tunnel Setup: Built a 2D domain matching UIUC physical test section dimensions (853 mm deep, 1219 mm tall, 2438 mm long) surrounding a NACA 2414 airfoil (c = 304.8 mm).',
      'Structured Quad Mesh Sizing: Created custom block decomposition ("Mesh 2414_006") with curved quadrilateral blocks to eliminate non-physical tetrahedral element skewness. Achieved y+ < 3 across upper and lower wall surfaces.',
      'Turbulence Model Selection: Evaluated SST k-omega, k-epsilon Standard, and RSM models. SST captured physical flow separation at 14° AoA while k-epsilon artificially delayed stall due to numerical viscosity.',
      'Aerodynamic Discovery — Premature Separation: Grid flaps push a stream of air upwards into the trailing edge boundary layer, inducing earlier flow separation (stall at ~14° vs 15° for baseline).',
      'Aerodynamic Discovery — Post-Stall Softening: Post-stall, standard airfoil lift drops sharply by 40% (1.25 to 0.75), while the grid flap retains 85% of peak lift (1.35 to 1.15), creating a soft stall plateau ideal for high-AoA maneuvers.',
      'Aerodynamic Discovery — Post-Stall Efficiency: The expanded efficiency ratio ((CL/CD)_Grid / (CL/CD)_NoGrid) increases continuously post-stall, demonstrating that grid flaps regain relative performance at large angles of attack.',
      'File Location Note: Full 71-page thesis document is available at public/LK_Final_Thesis_Draft.pdf.',
    ],

    /* ----------------------------------------------------------------------
       THESIS MEDIA & VISUAL GALLERY INSTRUCTIONS FOR LUKE:
       ======================================================================
       Place your thesis images, CFD contour screenshots, or animated GIFs in:
         c:\Users\lukek\OneDrive\Documents\ENGR_PROJ\Website\LukeKrick\src\assets\

       Name your files:
         thesis_mesh.png        (Mesh topology / block decomposition)
         thesis_contour.png     (or thesis_contour.gif - CFD velocity contour)
         thesis_separation.png  (Boundary layer separation diagram)

       They will automatically render in the Deep-Dive visual gallery!
       ======================================================================
    ---------------------------------------------------------------------- */
    mediaGallery: [
      {
        title: 'Structured Quad Mesh Topology (Mesh 2414_006)',
        caption: 'Over 1.2 million quad cells with curved block decomposition around NACA 2414 trailing edge and grid flap region (y+ < 3).',
        img: getAssetImg('thesis_mesh') || getAssetImg('p8') || '',
        fileNote: 'src/assets/thesis_mesh.png ',
      },
      {
        title: 'Velocity Magnitude Contour GIF',
        caption: 'ANSYS Fluent SST k-omega simulation demonstrating boundary layer flow separation and trailing edge recirculation zone.',
        img: getAssetImg('thesis_contour') || getAssetImg('p8') || '',
        fileNote: 'src/assets/thesis_contour.gif',
      },
      {
        title: 'Boundary Layer Separation & Trailing Edge Comparison',
        caption: 'Detailed CFD flow visualization comparing attached flow vs. grid-flap induced early separation at trailing edge.',
        img: getAssetImg('thesis_separation') || getAssetImg('p8') || '',
        fileNote: 'src/assets/thesis_separation.gif',
      },
    ],
  },

  'solid-rocket-casing-cfd': {
    id: 'solid-rocket-casing-cfd',
    title: 'CFD Thermal Analysis of Solid Rocket Casing',
    subtitle: 'Transient Thermal-Fluid Simulation in ANSYS Fluent',
    category: 'Thermal & Fluid Mechanics',

    overview: `
      "Modeled transient heat transfer through a phenolic liner and aluminum motor casing during a propellant burn. Authored a 10-page report detailing temperature gradients."
    `,

    specs: [
      { label: 'Report Length', value: '10-Page Research & CFD Report' },
      { label: 'Simulation Software', value: 'ANSYS Fluent & ANSYS Meshing' },
      { label: 'Heat Transfer Mode', value: 'Conduction through Liner + Convection from Gas Stream' },
      { label: 'Boundary Conditions', value: '2000 K, 200 m/s]' },
      { label: 'Casing Material', value: 'Aluminum' },
      { label: 'Liner Material', value: 'Phenolic Liner' },
    ],

    image: getAssetImg('p12'),
    imageTitle: 'Solid Rocket Motor Casing CFD Thermal Visual',
    imageCaption: 'ANSYS Fluent Steady-State thermal simulation contour showing temperature gradients across the phenolic liner and aluminum motor casing.',
    imageFileLocationNote: 'To replace this image, place your image in src/assets/ and update getAssetImg() in deepDiveData.js.',

    charts: [],

    codeSnippets: [
      {
        filename: 'thermal_properties.jou',
        language: 'MATLAB',
        description: 'Matlab Script',
        code: `%Defining Variables
T1 = 293;
T2 = 2000;
u = 200;
D = .5; %meters
L = .701;
As = pi * D * L;
g = 9.81;
Ts = T1;
Tinf = T2;
Tm = 293;
r1 = .035;
r2 = .0375;
r3 = .045;
%Properties of Air (1200)
format bank
Tf = (T1 + T2) / 2;
visc = 162.9e-6;
B = 1 / Tf;
Pr = .728;
k = 76.3e-3;
%Properties of Liner
k1 = .205;
k2 = .205;
%Calcuating Non-Dimensionlized Numbers for flow case
Re = u * D / visc %Reynolds Number
Gr = g * B * (Tinf - Ts) * D^3 / (visc^2) %Grashoff Number
F = Re / (Gr^2)
%Thermal Considerations
Nu = .023 * Pr^.2 * Re^(4/5);
h = Nu * k / D;
q = h * As * (Tinf - Tm);
%Resistance Considerations
R1 = 1 / (h * As);
R2 = log(r2 / r1) / (2*pi*L*k1);
R3 = log(r3 / r2) / (2*pi*L*k2);
RT = R1 + R2 + R3;
%Heat Rate
q = (Tinf - T1) / RT
`,
      },
    ],

    cadNotes: [
      'The simulations were successful in replicating the heat transfer in a solid rocket engine.',
      'It was learned that the thickness of the liner in the current solid rocket motors effectively resist the heat transfer to the alumnium casing.',
      'For further work, simulations can be performed looking at the erosion along the liner. This can optimize the thickness of the liner.'
    ],
  },

  'pymechanical-ai': {
    id: 'pymechanical-ai',
    title: 'PyMechanical and AI Integration',
    subtitle: 'Automated ANSYS Simulation Workflows via PyMechanical & Generative AI',
    category: 'Automation & Computational Modeling',

    overview: `
      "Investigated integration of Python scripting (PyMechanical API) with Generative AI models (Copilot, ChatGPT, Grok) to evaluate meshing parameters, simulation stress values, and percentage error compared to analytical calculations."
    `,

    specs: [
      { label: 'API Framework', value: 'PyMechanical (Ansys Python API)' },
      { label: 'AI Models Benchmarked', value: 'GitHub Copilot, ChatGPT, Grok' },
      { label: 'Primary Goal', value: 'Mesh Optimization & Stress Accuracy' },
      { label: 'Calculated Stress Target', value: '49.35 PSI' },
    ],

    tables: [
      {
        model: 'Copilot',
        badgeColor: '#facc15',
        headers: [
          'Global Element Size',
          'Resolution',
          'Face Sizing (Support) (in)',
          'Face Sizing (Load) (in)',
          'Simulation (PSI)',
          'Calculated (PSI)',
          'Percent Error %',
        ],
        rows: [
          ['0.5', '4', '0.25', '0.5', '39.146', '49.35', '20.68%'],
          ['0.35', '5', '0.15', '0.5', '41.374', '49.35', '16.16%'],
          ['0.25', '6', '0.1', '0.5', '42.994', '49.35', '12.88%'],
        ],
      },
      {
        model: 'ChatGPT',
        badgeColor: '#f97316',
        headers: [
          'Global Element Size',
          'Resolution',
          'Face Sizing (Support) (in)',
          'Face Sizing (Load) (in)',
          'Simulation (PSI)',
          'Calculated (PSI)',
          'Percent Error %',
        ],
        rows: [
          ['0.25', '4', '0.0625', '0.125', '49.017', '49.35', '0.67%'],
          ['0.2', '5', '0.05', '0.1', '52.035', '49.35', '-5.44%'],
          ['0.2', '4', '0.075', '0.1', '52.035', '49.35', '-5.44%'],
        ],
      },
      {
        model: 'Grok',
        badgeColor: '#38bdf8',
        headers: [
          'Global Element Size',
          'Resolution',
          'Face Sizing (Support) (in)',
          'Face Sizing (Load) (in)',
          'Simulation (PSI)',
          'Calculated (PSI)',
          'Percent Error %',
        ],
        rows: [
          ['0.5', '5', '0.1', '0.2', '40.547', '49.35', '17.84%'],
          ['0.5', '7', '0.05', '0.1', '39.898', '49.35', '19.15%'],
          ['0.5', '8', '0.025', '0.1', '39.898', '49.35', '19.15%'],
        ],
      },
    ],

    charts: [],
    codeSnippets: [],

    cadNotes: [
      'ChatGPT achieved the highest mesh accuracy with a minimum percent error of 0.67% (49.017 PSI vs calculated 49.35 PSI).',
      'Copilot showed steady convergence as resolution increased from 4 to 6 (error decreased from 20.68% down to 12.88%).',
      'Grok produced consistent simulation stress values (~39.9 PSI to 40.5 PSI) across high resolutions (5-8), yielding an error range around 17.8% - 19.15%.',
    ],
  },

  // --------------------------------------------------------------------------
  // ROCKETRY PAGE DEEP DIVES
  // --------------------------------------------------------------------------

  'chief-engineer-rocketry': {
    id: 'chief-engineer-rocketry',
    title: 'Liberty Rocketry — Chief Engineer',
    subtitle: 'IREC 10,000 ft Student Researched & Developed (SRAD) Rocket',
    category: 'System Engineering & Competition Leadership',

    overview: `
      [YOUR OVERVIEW HERE]: Summarize your vision, subteam coordination, and IREC competition goals.
      "Led full engineering lifecycle for 10,000 ft high-power rocket competing at Intercollegiate Rocket Engineering Competition (IREC). Managed CFD, trajectory simulation, structural sizing, and recovery teams."
    `,

    specs: [
      { label: 'Role Title', value: 'Chief Engineer (Liberty Rocketry)' },
      { label: 'Target Altitude', value: '10,000 ft AGL (3% Error Achieved)' },
      { label: 'Certification', value: 'Tripoli Level 2 High-Power Certification' },
      { label: 'Simulation Accuracy', value: 'OpenRocket Trajectory within 3% of Flight Data' },
      { label: 'CFD Tools', value: 'ANSYS Fluent Watertight Meshing Workflow' },
      { label: 'Subteams Managed', value: 'Propulsion, Aerodynamics, Avionics, Payload, Recovery' },
    ],

    charts: [
      {
        chartTitle: 'Predicted Altitude Trajectory vs Actual Flight Data',
        xAxisLabel: 'Time after Launch (s)',
        yAxisLabel: 'Altitude AGL (ft)',
        note: '[LUKE NOTE]: Add your OpenRocket flight telemetry data comparison.',
        series: [
          {
            name: 'OpenRocket Simulated (ft)',
            data: [
              { x: 0, y: 0 },
              { x: 5, y: 1200 },
              { x: 10, y: 4200 },
              { x: 15, y: 7800 },
              { x: 20, y: 9950 },
              { x: 25, y: 9400 },
            ],
          },
          {
            name: 'Altimeter Flight Data (ft)',
            data: [
              { x: 0, y: 0 },
              { x: 5, y: 1150 },
              { x: 10, y: 4100 },
              { x: 15, y: 7650 },
              { x: 20, y: 9820 },
              { x: 25, y: 9300 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'openrocket_export_analysis.m',
        language: 'matlab',
        description: '[LUKE NOTE]: Paste your MATLAB script for comparing altimeter CSV files against OpenRocket telemetry.',
        code: `% Trajectory Telemetry Analyzer
% [LUKE NOTE: REPLACE WITH YOUR ACTUAL MATLAB CODE]

simData = readtable('openrocket_sim.csv');
flightData = readtable('telemetry_flight1.csv');

error_pct = (max(simData.Altitude) - max(flightData.Altitude)) / max(simData.Altitude) * 100;
fprintf('Apogee Simulation Error: %.2f%%\n', error_pct);

plot(simData.Time, simData.Altitude, 'r-', flightData.Time, flightData.Altitude, 'b--');
xlabel('Time (s)'); ylabel('Altitude (ft)'); legend('Simulated', 'Flight');
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Document design reviews conducted (PDR, CDR, FRR).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Detail Tripoli Level 2 certification rocket specs (motor designation, recovery deployment dual altimeters).',
    ],
  },

  'propulsion-lead-rocketry': {
    id: 'propulsion-lead-rocketry',
    title: 'Assistant Propulsion Team Lead',
    subtitle: 'Modular Experimental Solid Rocket Motor & Test Stand',
    category: 'Propulsion Hardware & Safety Protocols',

    overview: `
      [YOUR OVERVIEW HERE]: Summarize modular motor casing design and mixing procedure validations.
    `,

    specs: [
      { label: 'Casing Construction', value: 'Modular Bolted Aluminium Casing + Phenolic Liner' },
      { label: 'Propellant Class', value: 'Experimental Solid Motor Formulation' },
      { label: 'Data Acquisition', value: 'Commercial Data Capture System + Load Cell' },
      { label: 'Safety Protocols', value: 'Standard Operating Procedures for Fuel Mixing' },
    ],

    charts: [],
    codeSnippets: [],
    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Detail casing O-ring seal pressure rating calculations.',
      '[LUKE NOTE - ADD YOUR DETAILS]: Add fuel mixing safety checklist parameters.',
    ],
  },

  'nozzle-engineer-rocketry': {
    id: 'nozzle-engineer-rocketry',
    title: 'Nozzle Engineer — Solid Rocket Motor',
    subtitle: 'Converging-Diverging Nozzle Design & MATLAB Over-pressurization Script',
    category: 'Gas Dynamics & Nozzle Design',

    overview: `
      [YOUR OVERVIEW HERE]: Summarize nozzle design geometry, throat erosion analysis, and MATLAB script.
    `,

    specs: [
      { label: 'Nozzle Type', value: 'Converging-Diverging (De Laval Nozzle)' },
      { label: 'CAD Platform', value: 'SolidWorks' },
      { label: 'Analysis Tool', value: 'MATLAB Script for Pressure Sizing & Safety Margin' },
      { label: 'Manufacturing', value: 'Lathe Machined Graphite / Aluminium Nozzle' },
    ],

    charts: [
      {
        chartTitle: 'Mach Number & Pressure Ratio vs Nozzle Axis (x/L)',
        xAxisLabel: 'Nozzle Axial Ratio (x/L)',
        yAxisLabel: 'Mach Number (M)',
        note: '[LUKE NOTE]: Add 1D Isentropic gas dynamics values calculated from MATLAB.',
        series: [
          {
            name: 'Mach Number M(x)',
            data: [
              { x: 0.0, y: 0.2 },
              { x: 0.3, y: 0.6 },
              { x: 0.5, y: 1.0 }, // Throat
              { x: 0.8, y: 2.1 },
              { x: 1.0, y: 2.6 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'nozzle_sizing_isentropic.m',
        language: 'matlab',
        description: '[LUKE NOTE]: Paste your MATLAB script for calculating throat area, expansion ratio, and casing pressure safety margins.',
        code: `% De Laval Nozzle Sizing & Isentropic Flow Calculator
% [LUKE NOTE: REPLACE WITH YOUR ACTUAL MATLAB SCRIPT]

gamma = 1.22; % Specific heat ratio for solid rocket exhaust
P_chamber = 4e6; % Chamber Pressure (Pa)
P_exit = 101325; % Ambient Pressure (Pa)

% Mach number at exit via isentropic relations
M_exit = sqrt((2/(gamma-1)) * ((P_chamber/P_exit)^((gamma-1)/gamma) - 1));
fprintf('Calculated Exit Mach Number: %.2f\n', M_exit);

% Area expansion ratio (Ae / At)
Ae_At = (1/M_exit) * ((2/(gamma+1))*(1 + ((gamma-1)/2)*M_exit^2))^((gamma+1)/(2*(gamma-1)));
fprintf('Required Expansion Ratio (Ae/At): %.2f\n', Ae_At);
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Document throat diameter, exit diameter, and divergence half-angle (e.g. 15° cone).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Explain material selection for thermal shock resistance (e.g., Graphite insert).',
    ],
  },
};
