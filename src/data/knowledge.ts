import type {
  KnowledgeCard,
  KnowledgeCategory,
  KnowledgeIcon,
} from '../types/knowledge';

const iconFor = (category: KnowledgeCategory): KnowledgeIcon => {
  switch (category) {
    case 'Electrical':
      return 'bolt';
    case 'Cooling':
    case 'Fuel Systems':
      return 'drop';
    case 'Exhaust':
    case 'Emissions':
    case 'Comfort':
      return 'wind';
    case 'Electric':
    case 'Hybrid':
      return 'battery';
    case 'Diesel':
      return 'flame';
    case 'Braking':
    case 'Steering':
      return 'wrench';
    case 'Engine':
      return 'swirl';
    default:
      return 'gear';
  }
};

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

type CardSeed = [string, KnowledgeCategory, string, string, KnowledgeIcon?];

const SEEDS: CardSeed[] = [
  [
    'Turbocharger',
    'Engine',
    'A small turbine driven by exhaust gases, connected to a compressor on the intake side.',
    'Forces more air into the cylinders so the engine can burn more fuel and produce more power.',
    'swirl',
  ],
  [
    'Alternator',
    'Electrical',
    'A belt-driven generator attached to the engine.',
    'Produces electricity while the engine runs and helps recharge the battery.',
    'bolt',
  ],
  [
    'Radiator',
    'Cooling',
    'A heat exchanger located at the front of the vehicle.',
    'Removes heat from the coolant so the engine stays within a safe temperature range.',
  ],
  [
    'Thermostat',
    'Cooling',
    'A temperature-controlled valve inside the cooling system.',
    'Regulates coolant flow to help the engine warm up quickly and avoid overheating.',
  ],
  [
    'Fuel Injector',
    'Fuel Systems',
    'A precision valve that sprays fuel into the intake port or combustion chamber.',
    'Delivers the right amount of fuel at the right moment for efficient combustion.',
  ],
  [
    'Spark Plug',
    'Engine',
    'A small ignition device installed in petrol engines.',
    'Creates the spark that ignites the air-fuel mixture inside the cylinder.',
  ],
  [
    'Glow Plug',
    'Diesel',
    'A heating element used in diesel engines.',
    'Helps warm the combustion chamber for easier cold starts.',
    'flame',
  ],
  [
    'Catalytic Converter',
    'Exhaust',
    'An emissions-control device in the exhaust system.',
    'Converts harmful exhaust gases into less harmful substances before they leave the tailpipe.',
  ],
  [
    'DPF',
    'Diesel',
    'A Diesel Particulate Filter installed in the exhaust.',
    'Traps soot particles and burns them off during regeneration.',
    'flame',
  ],
  [
    'EGR Valve',
    'Emissions',
    'An Exhaust Gas Recirculation valve.',
    'Sends a small amount of exhaust gas back into the engine to help reduce emissions.',
  ],
  [
    'Air Filter',
    'Engine',
    'A filter placed in the engine’s air intake path.',
    'Keeps dust and debris out of the engine while allowing clean air to enter.',
  ],
  [
    'Oil Filter',
    'Engine',
    'A filter in the engine lubrication system.',
    'Removes dirt and particles from engine oil to help protect moving parts.',
  ],
  [
    'Fuel Pump',
    'Fuel Systems',
    'A pump that moves fuel from the tank to the engine.',
    'Maintains fuel flow and pressure so the engine gets the fuel it needs.',
  ],
  [
    'Battery',
    'Electrical',
    'A rechargeable power source in the vehicle.',
    'Supplies electricity for starting, electronics, lights, and control systems.',
    'battery',
  ],
  [
    'Starter Motor',
    'Electrical',
    'An electric motor used during engine start-up.',
    'Turns the engine over so combustion can begin.',
    'bolt',
  ],
  [
    'Brake Caliper',
    'Braking',
    'A housing that holds brake pads and pistons around the brake disc.',
    'Squeezes the pads against the disc to slow the wheel down.',
  ],
  [
    'Brake Disc',
    'Braking',
    'A metal disc attached to the wheel hub.',
    'Works with the brake pads to create friction and reduce speed.',
  ],
  [
    'ABS Sensor',
    'Braking',
    'A wheel-speed sensor used by the braking system.',
    'Monitors wheel rotation so ABS can help prevent wheel lock during hard braking.',
  ],
  [
    'Suspension Spring',
    'Suspension',
    'A spring that supports the weight of the vehicle.',
    'Absorbs road impacts and helps keep the car stable and balanced.',
  ],
  [
    'Shock Absorber',
    'Suspension',
    'A damping component paired with the suspension.',
    'Controls spring movement to improve comfort, grip, and stability.',
  ],
  [
    'Control Arm',
    'Suspension',
    'A suspension link connecting the wheel assembly to the vehicle body.',
    'Helps the wheel move in a controlled path while maintaining alignment.',
  ],
  [
    'CV Joint',
    'Drivetrain',
    'A Constant Velocity joint on a drive axle.',
    'Transfers power to the wheels while allowing suspension movement and steering angle.',
  ],
  [
    'Differential',
    'Drivetrain',
    'A gear mechanism between the driven wheels.',
    'Lets the wheels rotate at different speeds while turning.',
    'gear',
  ],
  [
    'Clutch',
    'Transmission',
    'A friction-based connection between the engine and gearbox in manual cars.',
    'Engages or disconnects engine power so the driver can start smoothly and change gears.',
  ],
  [
    'Torque Converter',
    'Transmission',
    'A fluid-based coupling used in many automatic transmissions.',
    'Transfers engine power to the transmission and allows smooth take-off.',
  ],
  [
    'Intercooler',
    'Engine',
    'A heat exchanger used on turbocharged engines.',
    'Cools compressed intake air so it becomes denser and more effective for combustion.',
  ],
  [
    'Timing Belt',
    'Engine',
    'A toothed belt that synchronizes the crankshaft and camshaft.',
    'Keeps the valves opening and closing at the correct time.',
  ],
  [
    'Timing Chain',
    'Engine',
    'A metal chain used instead of a timing belt in some engines.',
    'Performs the same timing job, linking engine rotation to valve operation.',
  ],
  [
    'Muffler',
    'Exhaust',
    'A chambered part of the exhaust system.',
    'Reduces engine noise before exhaust gases exit the vehicle.',
  ],
  [
    'Oxygen Sensor',
    'Fuel Systems',
    'A sensor placed in the exhaust stream.',
    'Measures oxygen content so the engine can adjust the air-fuel mixture more accurately.',
  ],
  [
    'EV Battery Pack',
    'Electric',
    'A large high-voltage battery used in electric vehicles.',
    'Stores electrical energy and powers the electric motor.',
    'battery',
  ],
  [
    'Regenerative Braking System',
    'Electric',
    'A braking method used in hybrids and EVs.',
    'Slows the vehicle while sending some energy back to the battery.',
  ],
  [
    'Charging Port',
    'Electric',
    'The connector point where an EV is plugged in.',
    'Allows electricity to flow from the charger into the battery.',
  ],
  [
    'Inverter',
    'Electric',
    'An electronic power-control unit in hybrid and electric vehicles.',
    'Converts battery power into the form needed by the electric motor.',
    'chip',
  ],
  [
    'Cabin Air Filter',
    'Comfort',
    'A filter placed in the ventilation and air-conditioning system.',
    'Cleans the air entering the cabin by trapping dust, pollen, and particles.',
  ],
  [
    'Water Pump',
    'Cooling',
    'A pump that circulates coolant through the engine and radiator.',
    'Keeps coolant moving so heat can be carried away from the engine.',
  ],
  [
    'Serpentine Belt',
    'Engine',
    'A long drive belt connected to several engine accessories.',
    'Transfers engine rotation to components such as the alternator, water pump, and air-conditioning compressor.',
  ],
  [
    'Mass Air Flow Sensor',
    'Fuel Systems',
    'A sensor located in the intake system.',
    'Measures the amount of air entering the engine so fuel delivery can be adjusted correctly.',
  ],
  [
    'Throttle Body',
    'Engine',
    'A valve located in the engine intake system.',
    'Controls how much air enters the engine when the driver requests more or less power.',
  ],
  [
    'Intake Manifold',
    'Engine',
    'A network of passages that distributes intake air to the cylinders.',
    'Helps deliver an even supply of air to each cylinder.',
  ],
  [
    'Exhaust Manifold',
    'Exhaust',
    'A set of passages attached to the engine’s exhaust ports.',
    'Collects exhaust gases from multiple cylinders and directs them into the exhaust system.',
  ],
  [
    'PCV Valve',
    'Engine',
    'A valve used in the Positive Crankcase Ventilation system.',
    'Redirects gases from inside the engine back into the intake instead of releasing them directly into the atmosphere.',
  ],
  [
    'MAP Sensor',
    'Fuel Systems',
    'A Manifold Absolute Pressure sensor.',
    'Measures intake manifold pressure to help the engine calculate load and fuel requirements.',
  ],
  [
    'Knock Sensor',
    'Engine',
    'A vibration sensor mounted on the engine.',
    'Detects abnormal combustion and allows the engine computer to adjust ignition timing.',
  ],
  [
    'Camshaft',
    'Engine',
    'A rotating shaft with specially shaped lobes.',
    'Opens and closes the engine’s intake and exhaust valves at precise times.',
  ],
  [
    'Crankshaft',
    'Engine',
    'A rotating shaft connected to the pistons through connecting rods.',
    'Converts piston movement into rotation that can be sent toward the transmission.',
  ],
  [
    'Piston',
    'Engine',
    'A cylindrical component that moves up and down inside the engine cylinder.',
    'Receives force from combustion and transfers it to the crankshaft.',
  ],
  [
    'Connecting Rod',
    'Engine',
    'A strong metal link between a piston and the crankshaft.',
    'Transfers the force of piston movement into crankshaft rotation.',
  ],
  [
    'Cylinder Head',
    'Engine',
    'The upper section of the engine that sits above the cylinders.',
    'Houses valves, combustion chambers, and often camshafts and fuel components.',
  ],
  [
    'Head Gasket',
    'Engine',
    'A sealing layer between the engine block and cylinder head.',
    'Keeps combustion pressure, coolant, and engine oil separated.',
  ],
  [
    'Engine Mount',
    'Engine',
    'A rubber, hydraulic, or electronically controlled support connecting the engine to the body.',
    'Holds the engine in place while reducing vibration transferred into the cabin.',
  ],
  [
    'Flywheel',
    'Transmission',
    'A heavy rotating disc attached to the engine crankshaft.',
    'Smooths engine rotation and provides a working surface for the clutch in manual vehicles.',
  ],
  [
    'Dual-Mass Flywheel',
    'Transmission',
    'A flywheel made from two rotating sections connected by damping elements.',
    'Reduces engine vibration before it reaches the transmission.',
  ],
  [
    'Driveshaft',
    'Drivetrain',
    'A rotating shaft that carries torque between drivetrain components.',
    'Transfers power from the transmission or transfer case toward the driven axle.',
  ],
  [
    'Wheel Bearing',
    'Suspension',
    'A bearing assembly located inside the wheel hub.',
    'Allows the wheel to rotate smoothly while supporting vehicle loads.',
    'gear',
  ],
  [
    'Tie Rod',
    'Steering',
    'A steering linkage connecting the steering mechanism to the wheel hub.',
    'Transfers steering movement so the front wheels can change direction.',
  ],
  [
    'Steering Rack',
    'Steering',
    'A mechanism that converts steering-wheel rotation into side-to-side movement.',
    'Moves the steering linkages that turn the front wheels.',
  ],
  [
    'Power Steering Pump',
    'Steering',
    'A hydraulic pump used in some power-steering systems.',
    'Creates hydraulic pressure that reduces the effort needed to turn the steering wheel.',
  ],
  [
    'Stabilizer Bar',
    'Suspension',
    'A metal bar connecting the left and right sides of the suspension.',
    'Helps reduce body roll when the vehicle corners.',
  ],
  [
    'Ball Joint',
    'Suspension',
    'A flexible joint connecting suspension components to the wheel assembly.',
    'Allows steering and suspension movement at the same time.',
  ],
  [
    'Brake Booster',
    'Braking',
    'A device mounted between the brake pedal and master cylinder.',
    'Amplifies pedal force so the driver does not need to press as hard to brake.',
  ],
  [
    'Master Cylinder',
    'Braking',
    'The main hydraulic cylinder connected to the brake pedal.',
    'Converts pedal movement into hydraulic pressure for the brakes.',
  ],
  [
    'Brake Pad',
    'Braking',
    'A friction material fitted inside the brake caliper.',
    'Presses against the brake disc to create the friction that slows the vehicle.',
  ],
  [
    'Parking Brake',
    'Braking',
    'A separate braking system used to keep a stationary vehicle from moving.',
    'Holds the vehicle in place when parked, mechanically or electronically.',
  ],
  [
    'Transfer Case',
    'Drivetrain',
    'A gearbox used in many four-wheel-drive and all-wheel-drive vehicles.',
    'Distributes engine torque between the front and rear axles.',
  ],
  [
    'Wheel Hub',
    'Suspension',
    'The central assembly that connects the wheel to the suspension.',
    'Supports the wheel and provides a rotating mounting point around the wheel bearing.',
  ],
  [
    'AC Compressor',
    'Comfort',
    'The main pump of the air-conditioning system.',
    'Compresses refrigerant so the climate system can remove heat from the cabin.',
  ],
  [
    'Evaporator',
    'Comfort',
    'A heat exchanger located inside the vehicle’s climate system.',
    'Absorbs heat from cabin air and helps produce cool air.',
  ],
  [
    'Condenser',
    'Comfort',
    'A heat exchanger located near the front of the vehicle.',
    'Releases heat from the air-conditioning refrigerant into the outside air.',
  ],
  [
    'EV Motor',
    'Electric',
    'An electric machine connected to the drivetrain.',
    'Converts electrical energy from the battery into torque that turns the wheels.',
  ],
  [
    'DC-DC Converter',
    'Electric',
    'An electronic device that changes one DC voltage level into another.',
    'Converts high-voltage battery power into low-voltage electricity for lights, control units, and accessories.',
  ],
  [
    'Onboard Charger',
    'Electric',
    'A power electronics unit built into an EV or plug-in hybrid.',
    'Converts AC electricity from a charger into DC electricity that can be stored in the traction battery.',
  ],
  [
    'Battery Management System',
    'Electric',
    'An electronic system that monitors the traction battery.',
    'Controls charging, temperature, voltage, and battery protection.',
  ],
  [
    'Heat Pump',
    'Electric',
    'A climate-control system that transfers heat rather than creating it directly.',
    'Heats or cools the cabin efficiently and can help reduce energy use in an EV.',
  ],
  [
    'Hybrid Motor-Generator',
    'Hybrid',
    'An electric machine used in hybrid powertrains.',
    'Can drive the vehicle, assist the engine, generate electricity, and recover energy while slowing down.',
  ],
];

export const BUILTIN_CARDS: KnowledgeCard[] = SEEDS.map(
  ([title, category, what, does, icon]) => ({
    id: slug(title),
    title,
    category,
    icon: icon ?? iconFor(category),
    what,
    does,
  }),
);

export const CATEGORY_TINT: Record<KnowledgeCategory, string> = {
  Engine: '#ffb23f',
  Electrical: '#5aa7ff',
  Cooling: '#2fd3c6',
  'Fuel Systems': '#ff7a2f',
  Diesel: '#ff9a3c',
  Exhaust: '#c5c9d4',
  Emissions: '#8fd18a',
  Braking: '#ff6b6f',
  Suspension: '#b388ff',
  Drivetrain: '#9b7bff',
  Transmission: '#ffb23f',
  Electric: '#3ddc84',
  Comfort: '#7ec8ff',
  Steering: '#ffb23f',
  Hybrid: '#5aa7ff',
};

export const SEEDED_KNOWN = ['alternator', 'differential', 'ev-battery-pack'];
export const SEEDED_LEARN = ['glow-plug', 'dpf'];
