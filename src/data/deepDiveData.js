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

// Dynamic asset loader for CAD renders and images in src/assets/
const allAssets = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,svg}', { eager: true, import: 'default' });
const getAssetImg = (filenameWithoutExt) => {
  const matchingKey = Object.keys(allAssets).find(k => k.match(new RegExp(`/${filenameWithoutExt}\\.(jpg|jpeg|png|webp|svg)$`, 'i')));
  return matchingKey ? allAssets[matchingKey] : '';
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
      [YOUR OVERVIEW HERE]: Describe your custom propellant mixing, safety protocol, and load cell test stand setup.
      "Developed an experimental solid propellant formulation utilizing KNO3 and sucrose. Built an instrumented test stand with load cells and an Arduino microcontroller to capture thrust curves and total impulse."
    `,

    specs: [
      { label: 'Propellant Type', value: 'KNO3 + Sugar' },
      { label: 'Oxidizer/Fuel Ratio', value: '[ADD RATIO, e.g. 65% KNO3 / 35% Sugar]' },
      { label: 'Instrumentation', value: 'Load Cell + HX711 Amplifier' },
      { label: 'Sampling Rate', value: '[ADD SAMPLING RATE, e.g. 80 Hz / 100 Hz]' },
      { label: 'Simulation Tool', value: 'OpenMotor (Burn rate & pressure modeling)' },
      { label: 'Measured Parameters', value: 'Thrust (N), Burn Duration (s), Total Impulse (N·s), Used Ardunio Code plus Excel Integration to Collect Data' },
    ],

    charts: [
      {
        chartTitle: 'Static Firing Thrust vs Time Curve',
        xAxisLabel: 'Time (s)',
        yAxisLabel: 'Thrust (N)',
        note: '[LUKE NOTE]: Replace values below with your actual recorded test stand load cell data.',
        series: [
          {
            name: 'Measured Thrust (N)',
            data: [
              { x: 0.0, y: 0 },
              { x: 0.2, y: 120 },
              { x: 0.5, y: 380 },
              { x: 0.8, y: 440 },
              { x: 1.2, y: 420 },
              { x: 1.8, y: 390 },
              { x: 2.2, y: 210 },
              { x: 2.5, y: 0 },
            ],
          },
          {
            name: 'OpenMotor Simulated Thrust (N)',
            data: [
              { x: 0.0, y: 0 },
              { x: 0.2, y: 135 },
              { x: 0.5, y: 400 },
              { x: 0.8, y: 450 },
              { x: 1.2, y: 430 },
              { x: 1.8, y: 400 },
              { x: 2.2, y: 200 },
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
        description: '[LUKE NOTE]: Paste your Arduino sketch for reading HX711 load cell serial stream.',
        code: `// Load Cell Serial Data Logger (Arduino + HX711)
// [LUKE NOTE: REPLACE WITH YOUR EXACT SKETCH]

#include "HX711.h"

#define DOUT  3
#define CLK   2

HX711 scale;
float calibration_factor = 2280.0; // Scale calibration factor

void setup() {
  Serial.begin(115200);
  scale.begin(DOUT, CLK);
  scale.set_scale(calibration_factor);
  scale.tare(); // Reset scale to 0
  Serial.println("Time_ms,Thrust_N");
}

void loop() {
  if (scale.is_ready()) {
    float reading_kg = scale.get_units(1);
    float thrust_N = reading_kg * 9.81; // Convert to Newtons
    Serial.print(millis());
    Serial.print(",");
    Serial.println(thrust_N, 2);
  }
}
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Describe the mechanical construction of the test stand (e.g., steel angle frame, linear bearings).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Document safety distance, ignition system (e.g., electronic match + relay module).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Detail OpenMotor core geometry (e.g. BATES grain geometry, core diameter, grain count).',
    ],
  },

  // --------------------------------------------------------------------------
  // RESEARCH PAGE DEEP DIVES
  // --------------------------------------------------------------------------

  'grid-fins-thesis': {
    id: 'grid-fins-thesis',
    title: 'Grid Fins as a High Lift Device',
    subtitle: 'Honors Thesis — Comprehensive CFD Study (65 Pages)',
    category: 'Aerodynamics & Computational Fluid Dynamics',

    overview: `
      "Investigated the aerodynamic viability of grid fin configurat"
    `,

    specs: [
      { label: 'Thesis Scope', value: '65-Page Comprehensive Honors Thesis' },
      { label: 'CFD Solver', value: 'ANSYS Fluent' },
      { label: 'Mesh Topology', value: 'Custom Structured Quad Dominated Mesh. Over 1.2 millions cells with custom edge sizing controls.' },
      { label: 'Automation Tool', value: 'Python + ParaView Script' },
      { label: 'HPC Platform', value: 'High-Performance Computing on a GPU Machine Allowed Hundreds of Runs at Differing Angles of Attack' },
      { label: 'Angle of Attack Range', value: '-25° to 25° AoA' },
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
    ],

    codeSnippets: [
      {
        filename: 'paraview_cfd_export.py',
        language: 'python',
        description: '[LUKE NOTE]: Paste your Python script for ParaView data export or Fluent batch execution.',
        code: `# Automated CFD Data Processing Script 
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

; (ti-menu-load-string "/exit yes") ; Uncomment to close Fluent automatically
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Detail mesh quality metrics (e.g. Max Skewness < 0.7, Orthogonal Quality > 0.85, Y+ < 1 for viscous wall resolution).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Summarize major conclusions from your 65-page report (e.g. lift enhancement percentage, drag penalty, flow separation delay).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Add reference link or citation to your honors thesis document.',
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
