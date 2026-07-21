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

export const deepDiveData = {
  // --------------------------------------------------------------------------
  // PROJECTS PAGE DEEP DIVES
  // --------------------------------------------------------------------------

  'tvc-system': {
    id: 'tvc-system',
    title: 'Thrust Vector Control System',
    subtitle: '4-Inch Airframe Mechanical Gyro & Gimbal',
    category: 'Avionics & Mechanical Design',

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Overview & High-Level Engineering Objective
       Replace the placeholder below with 2-3 sentences explaining the design challenge,
       gimbal mechanism constraints, or control loop response time.
       ---------------------------------------------------------------------- */
    overview: `
      [YOUR OVERVIEW HERE]: Describe the TVC system architecture. For example:
      "Designed a 2-DOF TVC gimbal mechanism for a 4-inch airframe rocket. Used dual digital servos driven by an RP2040 microcontroller executing a PID loop based on IMU sensor feedback."
    `,

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Key Technical Specifications
       Add or edit specs below (e.g., servo torque, gimbal deflection angle, loop frequency).
       ---------------------------------------------------------------------- */
    specs: [
      { label: 'Degrees of Freedom', value: '2-DOF (Pitch & Yaw ±10°)' },
      { label: 'Microcontroller', value: 'Raspberry Pi RP2040 (CircuitPython / C++)' },
      { label: 'Actuators', value: '[ADD SERVO MODEL, e.g., KST X10 Mini Servos]' },
      { label: 'Power Supply', value: '[ADD POWER SPECS, e.g., 2S LiPo + 5V 5A Buck Converter]' },
      { label: 'CAD Platform', value: 'SolidWorks (Parametric Toleranced Model)' },
      { label: 'Sensors Used', value: '[ADD IMU MODEL, e.g., MPU-6050 / BNO055 9-DOF]' },
    ],

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Interactive Chart Data (e.g., Servo Response or Tilt vs Time)
       Enter data points below. 
       - xKey: label for X axis (e.g. 'Time (s)' or 'Set Angle (°)')
       - data: Array of objects with x and y values
       ---------------------------------------------------------------------- */
    charts: [
      {
        chartTitle: 'Gimbal Angle Deflection vs Sensor Pitch Rate',
        xAxisLabel: 'Time (seconds)',
        yAxisLabel: 'Deflection Angle (degrees)',
        note: '[LUKE NOTE]: Add your gyro test benchmark data here (e.g., target vs actual deflection angle).',
        series: [
          {
            name: 'Target Pitch Angle (°)',
            data: [
              { x: 0.0, y: 0.0 },
              { x: 0.5, y: 2.5 },
              { x: 1.0, y: 5.0 },
              { x: 1.5, y: 8.0 },
              { x: 2.0, y: 5.0 },
              { x: 2.5, y: 0.0 },
            ],
          },
          {
            name: 'Measured Servo Gimbal (°)',
            data: [
              { x: 0.0, y: 0.1 },
              { x: 0.5, y: 2.3 },
              { x: 1.0, y: 4.8 },
              { x: 1.5, y: 7.9 },
              { x: 2.0, y: 5.1 },
              { x: 2.5, y: 0.2 },
            ],
          },
        ],
      },
    ],

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Code Snippets (Paste your PID loop or Servo code here)
       ---------------------------------------------------------------------- */
    codeSnippets: [
      {
        filename: 'tvc_control_loop.py',
        language: 'python',
        description: '[LUKE NOTE]: Paste your CircuitPython or Python code for reading IMU pitch/yaw and translating to servo pulse width output.',
        code: `# TVC Control Loop - RP2040 CircuitPython
# [LUKE NOTE: REPLACE THIS WITH YOUR ACTUAL CODE]

import time
import board
import pwmio
from adafruit_motor import servo

# Initialize Servos for Pitch & Yaw
servo_pitch = servo.Servo(pwmio.PWMOut(board.GP16, frequency=50), min_pulse=750, max_pulse=2250)
servo_yaw   = servo.Servo(pwmio.PWMOut(board.GP17, frequency=50), min_pulse=750, max_pulse=2250)

# PID Coefficients
Kp = 1.2
Ki = 0.05
Kd = 0.3

def update_tvc(pitch_error, yaw_error, dt):
    # Calculate PID control signal
    pitch_output = (Kp * pitch_error) + (Kd * (pitch_error / dt))
    # Clamp output to max gimbal deflection range (+/- 10 degrees)
    pitch_angle = max(80.0, min(100.0, 90.0 + pitch_output))
    servo_pitch.angle = pitch_angle

# Main execution loop placeholder
print("TVC System Initialized. Awaiting IMU feed...")
`,
      },
    ],

    /* ----------------------------------------------------------------------
       NOTE FOR LUKE: Design Notes, CAD Screenshots, & Schematics
       Add bullet points or description notes for hardware/assembly.
       ---------------------------------------------------------------------- */
    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: List 3D printing parameters (e.g. PETG / ABS, 100% infill for gimbal rings, heat-set inserts size M3).',
      '[LUKE NOTE - ADD YOUR DETAILS]: Mention tolerance stack-up analysis conducted in SolidWorks for servo linkage arms.',
      '[LUKE NOTE - ADD YOUR DETAILS]: Describe electrical schematic (breadboard setup vs custom PCB).',
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
      { label: 'Propellant Type', value: 'KNO3 / Sucrose (R-Candy Solid Fuel)' },
      { label: 'Oxidizer/Fuel Ratio', value: '[ADD RATIO, e.g. 65% KNO3 / 35% Sugar]' },
      { label: 'Instrumentation', value: '50kg S-Type Load Cell + HX711 Amplifier' },
      { label: 'Sampling Rate', value: '[ADD SAMPLING RATE, e.g. 80 Hz / 100 Hz]' },
      { label: 'Simulation Tool', value: 'OpenMotor (Burn rate & pressure modeling)' },
      { label: 'Measured Parameters', value: 'Thrust (N), Burn Duration (s), Total Impulse (N·s)' },
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
      [YOUR OVERVIEW HERE]: Summarize your thesis research.
      "Investigated the aerodynamic viability of grid fin configurations functioning as high-lift surfaces for subsonic and transonic flight regimes. Conducted high-resolution CFD grid dependence studies and automated angle-of-attack sweeps on HPC clusters."
    `,

    specs: [
      { label: 'Thesis Scope', value: '65-Page Comprehensive Honors Thesis' },
      { label: 'CFD Solver', value: 'ANSYS Fluent (Density-Based / Pressure-Based)' },
      { label: 'Mesh Topology', value: 'Structured, Quad-Dominated Mesh with Boundary Layer Inflation' },
      { label: 'Automation Tool', value: 'Python + ParaView Macro Execution Script' },
      { label: 'HPC Platform', value: 'High-Performance Computing Cluster Automated Parameter Sweeps' },
      { label: 'Angle of Attack Range', value: '[ADD RANGE, e.g. 0° to 25° AoA]' },
    ],

    charts: [
      {
        chartTitle: 'Coefficient of Lift (CL) and Drag (CD) vs Angle of Attack (α)',
        xAxisLabel: 'Angle of Attack α (degrees)',
        yAxisLabel: 'Coefficient (CL / CD)',
        note: '[LUKE NOTE]: Input data from your 65-page thesis table comparing baseline vs grid fin deployed modes.',
        series: [
          {
            name: 'Lift Coefficient (CL)',
            data: [
              { x: 0, y: 0.10 },
              { x: 5, y: 0.45 },
              { x: 10, y: 0.85 },
              { x: 15, y: 1.20 },
              { x: 20, y: 1.15 },
              { x: 25, y: 0.95 },
            ],
          },
          {
            name: 'Drag Coefficient (CD)',
            data: [
              { x: 0, y: 0.05 },
              { x: 5, y: 0.08 },
              { x: 10, y: 0.18 },
              { x: 15, y: 0.35 },
              { x: 20, y: 0.55 },
              { x: 25, y: 0.78 },
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
        code: `# Automated CFD Data Processing Script for ParaView
# [LUKE NOTE: REPLACE WITH YOUR ACTUAL PYTHON SCRIPT]

import paraview.simple as pv
import os

def process_cfd_case(file_path, output_dir):
    print(f"Loading Fluent Case: {file_path}")
    data = pv.OpenDataFile(file_path)
    
    # Generate Pressure & Velocity Slice Views
    slice1 = pv.Slice(Input=data)
    slice1.SliceType.Normal = [0.0, 1.0, 0.0] # Y-Plane Slice
    
    # Save Contour Plots
    renderView = pv.GetActiveViewOrCreate('RenderView')
    pv.SaveScreenshot(os.path.join(output_dir, 'pressure_contour.png'), renderView)
    print("Contour screenshot saved successfully.")

# [LUKE NOTE: Add your batch loop over angles of attack here]
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
      [YOUR OVERVIEW HERE]: Summarize your casing thermal CFD research.
      "Modeled transient heat transfer through phenolic liners and aluminum/composite motor casings during active propellant burn. Authored a 10-page report detailing temperature gradients and thermal soak times."
    `,

    specs: [
      { label: 'Report Length', value: '10-Page Research & CFD Report' },
      { label: 'Simulation Software', value: 'ANSYS Fluent & ANSYS Meshing' },
      { label: 'Heat Transfer Mode', value: 'Conduction through Liner + Convection from Gas Stream' },
      { label: 'Boundary Conditions', value: '[ADD GAS TEMP & PRESSURE, e.g. 2800 K, 4.5 MPa]' },
      { label: 'Casing Material', value: '[ADD CASING MAT, e.g. 6061-T6 Aluminum / Carbon Composite]' },
      { label: 'Liner Material', value: 'Phenolic Resin / EPDM Rubber Liner' },
    ],

    charts: [
      {
        chartTitle: 'Casing Temperature vs Distance along Motor Axis',
        xAxisLabel: 'Axial Position (in)',
        yAxisLabel: 'Temperature (°F)',
        note: '[LUKE NOTE]: Add temperature profile data points along the motor length.',
        series: [
          {
            name: 'Inner Liner Temperature (°F)',
            data: [
              { x: 0, y: 2200 },
              { x: 2, y: 2400 },
              { x: 4, y: 2350 },
              { x: 6, y: 2100 },
              { x: 8, y: 1800 },
            ],
          },
          {
            name: 'Outer Casing Wall (°F)',
            data: [
              { x: 0, y: 110 },
              { x: 2, y: 145 },
              { x: 4, y: 160 },
              { x: 6, y: 135 },
              { x: 8, y: 115 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'thermal_properties.jou',
        language: 'bash',
        description: '[LUKE NOTE]: Paste your ANSYS Fluent journal script or UDF (User Defined Function) for temperature dependent properties.',
        code: `; ANSYS Fluent Journal Script for Transient Thermal Analysis
; [LUKE NOTE: REPLACE WITH YOUR ACTUAL JOURNAL SCRIPT]

/file/read-case-data "rocket_casing.cas.h5"
/define/models/unsteady-1st-order? yes
/solve/set/time-step 0.05
/solve/dual-time-iterate 70 20

/plot/write-to-file "temperature_profile.txt"
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Explain liner erosion assumptions or thermal conductivity values used in ANSYS.',
      '[LUKE NOTE - ADD YOUR DETAILS]: Document safety margins before material yield limit was reached.',
    ],
  },

  'pymechanical-ai': {
    id: 'pymechanical-ai',
    title: 'PyMechanical and AI Integration',
    subtitle: 'Automated ANSYS Simulation Workflows via Python & Generative AI',
    category: 'Automation & Computational Modeling',

    overview: `
      [YOUR OVERVIEW HERE]: Summarize your AI + PyMechanical research.
      "Investigated integration of Python scripting (PyMechanical API) with Generative AI to automate mesh generation, boundary condition setup, and post-processing evaluation in ANSYS Mechanical."
    `,

    specs: [
      { label: 'API Framework', value: 'PyMechanical (Ansys Python Developer Community)' },
      { label: 'Primary Goal', value: 'Mesh Optimization & Execution Automation' },
      { label: 'AI Model Integration', value: 'LLM Prompt Engineering to PyMechanical Syntax' },
      { label: 'Time Reduction', value: '[ADD PERCENTAGE, e.g. 40% mesh setup time reduction]' },
    ],

    charts: [
      {
        chartTitle: 'Mesh Quality Score vs Execution Iteration',
        xAxisLabel: 'Iteration Index',
        yAxisLabel: 'Orthogonal Quality Index (0-1)',
        note: '[LUKE NOTE]: Add iteration benchmark data showing mesh improvement.',
        series: [
          {
            name: 'AI-Guided Script Mesh Quality',
            data: [
              { x: 1, y: 0.52 },
              { x: 2, y: 0.68 },
              { x: 3, y: 0.79 },
              { x: 4, y: 0.88 },
              { x: 5, y: 0.93 },
            ],
          },
        ],
      },
    ],

    codeSnippets: [
      {
        filename: 'pymechanical_mesh_opt.py',
        language: 'python',
        description: '[LUKE NOTE]: Paste your PyMechanical script snippet connecting python to ANSYS Mechanical.',
        code: `# PyMechanical ANSYS Automation Snippet
# [LUKE NOTE: REPLACE WITH YOUR ACTUAL SCRIPT]

import ansys.mechanical.core as pymechanical

# Connect to PyMechanical Instance
mechanical = pymechanical.launch_mechanical(batch=True)
print("Connected to ANSYS Mechanical Instance.")

# Add mesh refinement controls programmatically
script = """
mesh = ExtAPI.DataModel.Project.Model.Mesh
mesh.ElementSize = Quantity("2.0 [mm]")
mesh.GenerateMesh()
"""
mechanical.run_python_script(script)
print("Mesh generated automatically.")
`,
      },
    ],

    cadNotes: [
      '[LUKE NOTE - ADD YOUR DETAILS]: Document setup steps for configuring PyMechanical environment.',
      '[LUKE NOTE - ADD YOUR DETAILS]: Explain key prompt templates used for generating valid PyMechanical Python syntax.',
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
