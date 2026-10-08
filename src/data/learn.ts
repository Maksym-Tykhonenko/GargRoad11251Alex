import type {LearnArticle, LearnCategory} from '../types/learn';

export const LEARN_CATEGORIES: LearnCategory[] = [
  {id: 'engine', title: 'Engine Basics', color: '#ffc94a', icon: 'settings'},
  {id: 'howItWorks', title: 'How Your Car Works', color: '#5b9dff', icon: 'car'},
  {id: 'fuel', title: 'Fuel Systems', color: '#ff9f3f', icon: 'fuel'},
  {id: 'braking', title: 'Braking Systems', color: '#ff5a5f', icon: 'tire'},
  {id: 'transmission', title: 'Transmission', color: '#b48bff', icon: 'tune'},
  {id: 'cooling', title: 'Cooling Systems', color: '#3ddcbf', icon: 'thermostat'},
];

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'engine-oil',
    categoryId: 'engine',
    title: 'Why Engine Oil Matters More Than Most Drivers Realize',
    level: 'Beginner',
    summary:
      'A thin but durable film of oil separates engine surfaces so they do not grind against one another.',
    paragraphs: [
      'Engine oil does much more than simply make moving parts slippery. Inside a running engine, pistons, bearings, camshafts, crankshafts and many other components move thousands of times every minute while being exposed to high temperatures and considerable mechanical loads. A thin but durable film of oil separates many of these surfaces so they do not continuously grind directly against one another.',
      'Oil also helps remove heat from areas that the cooling system cannot reach directly. As it circulates through the engine, it absorbs heat and carries it toward cooler sections and the oil pan. Modern oils contain additives that help control deposits, keep contaminants suspended, reduce corrosion and maintain useful viscosity across a wide temperature range.',
      'Viscosity is particularly important. Oil must flow quickly when the engine is cold but remain thick enough to provide protection after everything reaches operating temperature. This is why oil grades such as 0W-20, 5W-30 or 5W-40 exist. The correct specification depends on the engine design rather than simply on climate or driver preference.',
      'Oil gradually degrades. Heat, combustion by-products, moisture and fuel contamination can change its properties, while the filter accumulates particles removed from circulation. Allowing oil to remain in service far beyond the recommended interval can increase deposits and wear even if the engine appears to run normally.',
    ],
    keyTakeaway:
      'The correct engine oil protects against friction, heat, deposits and corrosion. Checking the level and following the manufacturer’s oil specification are two of the simplest ways to protect an engine.',
    minutes: 3,
  },
  {
    id: 'accelerator',
    categoryId: 'howItWorks',
    title: 'What Actually Happens When You Press the Accelerator',
    level: 'Beginner',
    summary:
      'Pressing the accelerator is a request for torque — modern vehicles decide how to produce it.',
    paragraphs: [
      'Pressing the accelerator does not simply tell the engine to “go faster.” In a modern vehicle, the accelerator pedal usually contains electronic position sensors. When you move the pedal, those sensors send information to the vehicle’s control system, which determines how much power the driver is requesting.',
      'In a petrol engine, the engine control unit can adjust the throttle opening, fuel injection, ignition timing and other parameters. More air enters the engine, the control system supplies the appropriate amount of fuel, and combustion produces more torque. A diesel engine manages power differently because it normally controls torque primarily by changing the amount of fuel injected while managing turbocharger boost and airflow through additional systems.',
      'Automatic transmissions also participate in the process. A strong accelerator input may cause the transmission to select a lower gear so the engine can operate at a speed where more power is available. This is why pressing the pedal deeply can cause engine RPM to rise suddenly even before the vehicle gains much speed.',
      'Hybrids make the process even more interesting. The control system can combine an internal combustion engine with one or more electric motors. At one moment the motor may provide most of the torque; at another, both systems may work together. In an electric vehicle, accelerator position is interpreted by the power electronics, which control how much electrical energy is delivered to the motor.',
    ],
    keyTakeaway:
      'The accelerator is essentially a request for torque. Modern vehicles decide how to produce that torque using the engine, transmission, electric motors and control electronics available.',
    minutes: 3,
  },
  {
    id: 'fuel-injection',
    categoryId: 'fuel',
    title: 'Fuel Injection: How the Engine Gets Exactly the Fuel It Needs',
    level: 'Intermediate',
    summary:
      'Modern fuel injection supplies carefully controlled quantities of fuel at precisely chosen moments.',
    paragraphs: [
      'A combustion engine needs the right mixture of air and fuel to operate efficiently. Modern fuel injection systems are responsible for supplying that fuel in carefully controlled quantities at precisely chosen moments.',
      'The process begins in the fuel tank. An electric fuel pump usually sends fuel toward the engine through lines and a filtration system. Depending on the engine design, another high-pressure pump may then increase pressure significantly before fuel reaches the injectors. Each injector is an electronically controlled valve capable of opening for extremely short periods.',
      'In port-injected petrol engines, fuel is sprayed into the intake port before entering the combustion chamber. In gasoline direct-injection engines, fuel is injected directly into the cylinder under much higher pressure. Direct injection can provide very precise fuel control, but it also creates different engineering challenges involving pressure, deposits and particulate emissions.',
      'Diesel injection systems typically operate at exceptionally high pressures. A common-rail system maintains pressurized fuel in a shared rail so each injector can perform multiple injections during a single combustion cycle. Instead of one large injection, the system may use small pilot injections followed by a main injection and, in certain operating conditions, additional injections. This can help control noise, emissions and combustion characteristics.',
      'The engine control unit determines injection timing and quantity using information from numerous sensors. Airflow, intake pressure, oxygen content in the exhaust, engine temperature, RPM, throttle demand and many other variables can influence the calculation. The goal is not merely to inject fuel but to deliver an appropriate quantity for the exact operating condition.',
      'A failing injector does not always stop working completely. It may spray poorly, leak, become restricted or deliver a different amount of fuel than expected. Possible symptoms can include rough idle, difficult starting, increased fuel consumption, hesitation, smoke or diagnostic warning lights. Similar symptoms can also have many other causes, so proper diagnosis is important before replacing expensive components.',
    ],
    keyTakeaway:
      'Fuel injection is a precision system. Its job is to deliver the correct amount of fuel, at the correct pressure, at the correct moment, so the engine can produce power efficiently.',
    minutes: 4,
  },
  {
    id: 'brakes-stop',
    categoryId: 'braking',
    title: 'Why Brakes Can Stop a Heavy Car So Quickly',
    level: 'Beginner',
    summary:
      'Friction brakes convert kinetic energy into heat — tires complete the connection to the road.',
    paragraphs: [
      'A moving car contains kinetic energy, and stopping the car requires that energy to be converted into another form. Conventional friction brakes do this mainly by converting motion into heat.',
      'When the driver presses the brake pedal, the braking system creates hydraulic pressure. Brake fluid transfers this pressure through sealed lines toward the wheels. At a disc brake, a caliper squeezes brake pads against a rotating brake disc. Friction between the pads and disc resists rotation and slows the wheel.',
      'The amount of heat involved can be substantial. During repeated braking, discs and pads may become extremely hot. This is why brake components are designed not only to create friction but also to manage and release heat. If temperatures rise too far, braking performance may decrease temporarily, a condition commonly referred to as brake fade.',
      'The tires ultimately determine how much braking force can be transferred to the road. Even powerful brakes cannot create strong deceleration if the tires have very little grip. Wet roads, snow, ice, worn tires and incorrect tire pressures can therefore increase stopping distance even when the braking hardware itself works perfectly.',
      'ABS, or the anti-lock braking system, monitors wheel speeds during hard braking. If a wheel begins to lock, the system can rapidly reduce and restore brake pressure to that wheel. This helps preserve steering control and allows the tires to remain closer to their useful grip range.',
    ],
    keyTakeaway:
      'Brakes create the force needed to slow the wheels, but tires create the connection to the road. Effective stopping depends on both systems working together.',
    minutes: 3,
  },
  {
    id: 'automatic-transmission',
    categoryId: 'transmission',
    title: 'Automatic Transmission: What Happens Between the Engine and the Wheels',
    level: 'Intermediate',
    summary:
      'An automatic transmission provides different gear ratios without requiring the driver to select each gear.',
    paragraphs: [
      'An engine cannot efficiently operate at every possible road speed using a single fixed mechanical ratio. The transmission solves this problem by providing different gear ratios between the engine and the driven wheels.',
      'Lower gears multiply torque more strongly, which helps the vehicle start moving and accelerate. Higher gears reduce engine speed relative to road speed, allowing more efficient cruising. An automatic transmission performs these ratio changes without requiring the driver to manually select each gear.',
      'A traditional torque-converter automatic contains several major systems. The torque converter transfers engine power using transmission fluid and can provide smooth engagement when the vehicle starts moving. Inside the transmission, planetary gearsets create different ratios, while clutches and brakes connect or hold particular components of those gearsets.',
      'Hydraulic pressure is critical. Transmission fluid is directed through internal passages and valves to operate clutches. In modern transmissions, electronic solenoids control much of this hydraulic system, while the transmission control module decides when and how quickly shifts should occur.',
      'The transmission does not base its decisions only on vehicle speed. Throttle demand, engine load, temperature, driving mode, brake input, road gradient and other factors may influence gear selection. During gentle acceleration, the system may upshift early to reduce fuel consumption. During strong acceleration, it can hold a lower gear longer or perform a downshift.',
      'Transmission fluid has multiple jobs: lubrication, cooling, hydraulic operation and, in many designs, operation of the torque converter. Using the wrong fluid can affect shift quality and durability because transmission fluids have specific friction and viscosity characteristics.',
      'Unusual behavior such as delayed engagement, harsh shifts, slipping, vibration or unexpected RPM changes deserves attention. However, symptoms that feel like transmission problems can sometimes originate from the engine, driveline mounts, electronic controls or other systems.',
    ],
    keyTakeaway:
      'An automatic transmission continuously balances torque, engine speed, comfort and efficiency by changing the mechanical relationship between the engine and the wheels.',
    minutes: 4,
  },
  {
    id: 'cooling-system',
    categoryId: 'cooling',
    title: 'The Cooling System: How Your Engine Avoids Overheating',
    level: 'Beginner',
    summary:
      'Cooling keeps the engine within a controlled operating temperature — not ice-cold.',
    paragraphs: [
      'Combustion releases enormous amounts of heat. Only part of that energy becomes useful mechanical work; much of the rest must be controlled. Without an effective cooling system, engine components could quickly reach temperatures high enough to damage seals, lubricants and metal parts.',
      'Coolant circulates through passages inside the engine where it absorbs heat. A water pump keeps the coolant moving, while the radiator provides a large surface area where heat can be transferred to the surrounding air.',
      'The thermostat acts as a temperature-sensitive valve. When the engine is cold, it limits coolant flow through the radiator so the engine can warm up efficiently. Once operating temperature is reached, the thermostat opens progressively and allows greater circulation through the radiator.',
      'When natural airflow is insufficient, especially while the vehicle is stationary or moving slowly, electric radiator fans can pull or push air through the radiator. Temperature sensors and control modules determine when those fans should operate.',
      'The cooling system is pressurized because higher pressure raises the coolant’s boiling point. This is one reason opening a hot cooling system can be dangerous: hot pressurized coolant can suddenly escape. The expansion tank gives coolant room to expand as temperature changes while helping the system maintain the correct fluid volume.',
      'A slowly falling coolant level should not simply be ignored and repeatedly topped up. Coolant is normally contained within a closed system, so continuing loss may indicate an external leak, damaged cap, radiator problem, hose failure or an internal engine issue.',
    ],
    keyTakeaway:
      'Cooling is not about keeping the engine cold. It is about keeping the engine within a controlled operating temperature where lubrication, combustion and component clearances work as intended.',
    minutes: 3,
  },
  {
    id: 'turbochargers',
    categoryId: 'engine',
    title: 'Turbochargers: How a Smaller Engine Can Make More Power',
    level: 'Intermediate',
    summary:
      'A turbocharger uses exhaust energy to push more air into the engine for greater torque.',
    paragraphs: [
      'A turbocharger allows an engine to burn more fuel efficiently by supplying it with more air than atmospheric pressure alone would normally provide. Instead of being driven mechanically from the crankshaft, a turbocharger uses energy contained in the exhaust gases.',
      'The turbo consists primarily of two wheels connected by a shaft. Exhaust gas spins the turbine wheel, which turns the compressor wheel on the intake side. The compressor then forces additional air into the engine.',
      'Compressing air raises its temperature, which is why many turbocharged engines use an intercooler. The intercooler removes some of this heat before the air reaches the engine. Cooler air is denser, allowing more oxygen to enter each cylinder.',
      'Turbo speed can become extremely high, so lubrication is vital. Engine oil flows through the turbocharger bearing system to reduce friction and remove heat. Some modern units also use engine coolant for additional temperature management.',
      'Boost pressure must be controlled. If the turbo simply produced as much pressure as possible, excessive cylinder pressure could damage the engine. Wastegates, bypass valves and electronic control systems regulate how much boost is produced under different operating conditions.',
      'The often-discussed “turbo lag” is the delay between requesting more power and receiving full boost. Modern engine designs reduce this effect through smaller low-inertia turbochargers, sophisticated exhaust routing, variable geometry systems, electric assistance and intelligent transmission control.',
      'Driving habits also affect turbocharger conditions. Heavy engine load creates considerable exhaust and oil temperature. After demanding driving, modern cooling and lubrication systems are designed to manage heat, but following the vehicle manufacturer’s operating and service recommendations remains important.',
    ],
    keyTakeaway:
      'A turbocharger recovers energy from the exhaust and uses it to push more air into the engine, allowing greater torque and power from a given engine size.',
    minutes: 4,
  },
  {
    id: 'regen-braking',
    categoryId: 'braking',
    title: 'Regenerative Braking: When Slowing Down Recharges the Battery',
    level: 'Intermediate',
    summary:
      'Electrified vehicles can slow down by turning motion back into electrical energy.',
    paragraphs: [
      'Electric and hybrid vehicles can slow down in a fundamentally different way from conventional cars. Instead of relying only on friction brakes, they can use the electric drive motor as a generator.',
      'During acceleration, electrical energy from the battery flows to the motor and produces torque at the wheels. During regenerative braking, the process is partially reversed. The rotating wheels drive the motor, the motor generates electricity, and that electrical energy is sent back toward the battery.',
      'Creating electricity produces resistance to rotation, which slows the vehicle. The driver experiences this as braking even though the brake pads may be doing little or no work at that moment.',
      'How much energy can be recovered depends on several factors. Battery charge level, battery temperature, vehicle speed, motor capability and the amount of requested deceleration all matter. If the battery is already close to full, regenerative braking may be reduced because there is less capacity available to accept additional energy.',
      'Strong braking still requires conventional friction brakes. Regeneration has limits, and emergency stops demand much more braking force than the electric motor may be able to provide. Modern vehicles therefore blend regenerative and friction braking automatically.',
      'One consequence is that brake pads on electrified vehicles may wear more slowly. However, lower use of friction brakes can introduce another consideration: brake discs can develop surface corrosion if mechanical braking is rarely used, depending on climate and vehicle design. Manufacturers account for this in different ways, and regular inspection remains important.',
      'Some EVs offer strong one-pedal driving. Releasing the accelerator creates significant regenerative deceleration, allowing the driver to control both acceleration and much of the slowing process using one pedal. It does not eliminate the brake pedal, but it changes the rhythm of everyday driving.',
    ],
    keyTakeaway:
      'Regenerative braking converts part of the vehicle’s motion back into electrical energy instead of turning all of that energy into heat.',
    minutes: 4,
  },
  {
    id: 'differential',
    categoryId: 'howItWorks',
    title: 'Why Your Car Needs a Differential',
    level: 'Beginner',
    summary:
      'The differential lets driven wheels rotate at different speeds while turning.',
    paragraphs: [
      'When a vehicle turns, the wheels on the outside of the corner travel farther than the wheels on the inside. This means they must rotate at different speeds. If two driven wheels were permanently locked together on normal pavement, one tire would have to slip during every turn.',
      'The differential solves this problem. It distributes torque while allowing the driven wheels to rotate at different speeds.',
      'In a basic open differential, a set of gears allows the left and right wheels to rotate independently while still receiving engine torque. This works extremely well during ordinary driving, but there is a limitation: if one driven wheel has very little grip, an open differential may struggle to send useful torque to the wheel that still has traction.',
      'Different technologies address this problem. Limited-slip differentials can restrict the speed difference between wheels. Electronically controlled differentials can adjust torque distribution more actively. Some vehicles achieve a similar effect by applying the brake to a spinning wheel so more useful torque reaches the opposite side.',
      'All-wheel-drive vehicles can have more complex arrangements involving front, rear and center differentials or electronically controlled clutch packs. The purpose remains similar: distribute torque while allowing different wheels or axles to rotate at the speeds required by the vehicle’s movement.',
    ],
    keyTakeaway:
      'The differential allows powered wheels to rotate at different speeds while turning, making smooth cornering possible without unnecessary tire scrub or driveline stress.',
    minutes: 3,
  },
  {
    id: 'air-filter',
    categoryId: 'fuel',
    title: 'Why Engines Need Air Filters — and What Happens When One Gets Dirty',
    level: 'Beginner',
    summary:
      'The air filter gives the engine airflow while keeping abrasive contamination out.',
    paragraphs: [
      'Every combustion engine needs a large supply of air. Even during an ordinary drive, the engine can draw in thousands of liters of air, and that air contains dust, pollen, sand and other particles that should not enter the cylinders.',
      'The engine air filter sits in the intake path and traps contamination before the air reaches sensitive components. A clean filter must achieve two goals at once: capture particles while still allowing enough airflow for the engine to operate normally.',
      'As dirt accumulates, airflow resistance can increase. Modern engine management systems can often compensate for moderate restriction, so a slightly dirty filter does not necessarily produce an obvious change in the way the vehicle drives. Severe restriction, however, can reduce performance and may affect efficiency depending on the engine and control strategy.',
      'The filter also protects components located downstream. Turbocharger compressor blades, airflow sensors, throttle bodies and cylinder surfaces can all be affected by contamination. Fine abrasive particles entering the engine over long periods can contribute to wear.',
      'Replacing the air filter excessively often provides little benefit, while leaving it installed far beyond an appropriate service interval can be counterproductive. Inspection schedules vary because vehicles driven on dusty unpaved roads can contaminate filters much faster than vehicles driven mainly on clean highways.',
    ],
    keyTakeaway:
      'The air filter is a simple component with an important job: give the engine the airflow it needs while keeping abrasive contamination out.',
    minutes: 3,
  },
  {
    id: 'cvt',
    categoryId: 'transmission',
    title: 'CVT Transmission: Why the Engine RPM Can Stay Almost Constant',
    level: 'Advanced',
    summary:
      'A CVT continuously varies ratio so the engine can stay near its ideal RPM.',
    paragraphs: [
      'A continuously variable transmission, or CVT, challenges the traditional idea that a transmission must have a fixed sequence of gears. Instead of selecting first, second, third and so on, many CVTs can continuously vary the transmission ratio within a designed range.',
      'One common automotive CVT uses two variable-diameter pulleys connected by a high-strength belt or chain. Each pulley consists of conical surfaces that can move closer together or farther apart. As the effective diameter of one pulley increases, the other decreases, changing the ratio between engine speed and wheel speed.',
      'This allows the control system to choose an engine RPM that suits the situation. During gentle driving, it can keep RPM low for efficiency. During strong acceleration, it may quickly raise the engine to a speed where useful power is available and then hold the engine near that speed while the transmission ratio continuously changes.',
      'This behavior can feel unusual to drivers accustomed to conventional gear changes. Vehicle speed may continue rising while engine RPM remains almost constant. That does not necessarily indicate slipping; it may simply be the CVT operating as designed.',
      'Some manufacturers program artificial “steps” into CVT behavior to imitate traditional gear shifts. This can make acceleration feel more familiar even though the transmission does not technically require those fixed ratios.',
      'CVT fluid is a highly specialized component of the system. It must lubricate bearings and internal parts while supporting the exact friction characteristics required by the belt, chain and pulley system. Substituting an unsuitable fluid can therefore have serious consequences.',
    ],
    keyTakeaway:
      'A CVT does not need traditional fixed gears. By continuously changing its ratio, it can keep the engine closer to the RPM range that best matches the driver’s demand.',
    minutes: 3,
  },
  {
    id: 'coolant-chemistry',
    categoryId: 'cooling',
    title: 'Why Coolant Is More Than Just Colored Water',
    level: 'Intermediate',
    summary:
      'Coolant chemistry and specification matter more than the liquid’s color.',
    paragraphs: [
      'Coolant is often identified simply by its color, but color alone does not explain its chemistry or compatibility. Engine coolant is normally a mixture based on water and antifreeze combined with corrosion inhibitors and other additives designed to protect the entire cooling system.',
      'Water is excellent at absorbing heat, but pure water creates several problems in a vehicle. It can freeze in cold conditions, boil relatively easily at high temperatures and promote corrosion within metal components. Antifreeze lowers the freezing point and raises the boiling protection of the mixture, while additives protect aluminum, iron, seals, pumps and other materials.',
      'Different coolant specifications use different additive technologies. This is why two coolants that happen to be the same color are not automatically interchangeable. Manufacturers may use dyes for identification, but there is no universal rule saying that every red, blue, green or pink coolant has the same chemical formulation.',
      'Mixing incompatible coolant types can reduce corrosion protection or, in some cases, create deposits and other undesirable reactions. When coolant needs topping up, the safest approach is to follow the vehicle manufacturer’s required specification rather than selecting a product only by appearance.',
      'Coolant condition matters over time because protective additives can gradually degrade. A cooling system can still appear full and function normally while the chemical protection of the coolant is no longer optimal. This is one reason some manufacturers specify coolant replacement intervals even when there is no visible problem.',
    ],
    keyTakeaway:
      'Coolant controls temperature, protects against freezing and boiling, and prevents corrosion. The correct specification matters more than the liquid’s color.',
    minutes: 3,
  },
  {
    id: 'alternator',
    categoryId: 'howItWorks',
    title: 'What the Alternator Actually Does While You Drive',
    level: 'Beginner',
    summary:
      'Once the engine is running, the alternator usually supplies most of the vehicle’s electricity.',
    paragraphs: [
      'The alternator is responsible for generating electrical power while a combustion-engine vehicle is running. Many drivers think the battery powers everything all the time, but once the engine is operating, the alternator usually supplies most of the electricity needed by lights, infotainment, control units, fans, pumps and other electrical systems.',
      'The alternator is driven by the engine through a belt. Inside, a rotating magnetic field produces alternating current, which is then converted into direct current because the vehicle’s electrical system and battery operate on DC power. A voltage regulator controls output so the system receives enough energy without exposing components to excessive voltage.',
      'The battery still plays an important role. It provides the high current needed to start the engine and acts as an electrical buffer when demand changes quickly. After starting, the alternator replenishes the energy that was removed from the battery.',
      'A weak alternator can create symptoms that initially look like a battery problem. Headlights may dim, warning lights may appear, electrical systems may behave unpredictably, and eventually the engine may stop if system voltage falls too low. Replacing the battery alone will not solve the problem if the charging system is the real cause.',
    ],
    keyTakeaway:
      'The battery starts the car, but the alternator keeps the electrical system supplied while the engine is running.',
    minutes: 2,
  },
  {
    id: 'brake-fluid',
    categoryId: 'braking',
    title: 'Why Brake Fluid Needs Attention Even When the Brakes Feel Fine',
    level: 'Intermediate',
    summary:
      'Brake fluid can absorb moisture and lose boiling protection long before symptoms appear.',
    paragraphs: [
      'Brake fluid transfers force from the brake pedal to the braking components at the wheels. Because liquids are nearly incompressible, hydraulic pressure can move efficiently through brake lines and operate calipers or wheel cylinders.',
      'One important characteristic of many brake fluids is that they gradually absorb moisture from the atmosphere. This process occurs over time even though the braking system is sealed. As moisture content increases, the fluid’s boiling point can decrease.',
      'This matters because braking generates heat. Under normal conditions the fluid remains liquid, but during prolonged or repeated heavy braking temperatures can rise significantly. If contaminated brake fluid begins to boil, vapor bubbles can form. Gas compresses much more easily than liquid, so the brake pedal can feel soft and braking effectiveness can deteriorate.',
      'Brake fluid also protects internal components from corrosion and supports systems such as ABS and electronic stability control, which can rapidly modulate hydraulic pressure. Old or contaminated fluid may therefore affect more than just the basic mechanical brakes.',
      'Fluid color alone is not a perfect indicator of condition. Some fluids darken with age, but proper service intervals should be based on manufacturer recommendations or suitable testing rather than appearance alone.',
    ],
    keyTakeaway:
      'Brake fluid can deteriorate without producing obvious symptoms. Its condition is important because hydraulic braking depends on stable fluid performance under heat and pressure.',
    minutes: 3,
  },
  {
    id: 'direct-vs-port',
    categoryId: 'fuel',
    title: 'Direct Injection vs Port Injection: What Is the Difference?',
    level: 'Intermediate',
    summary:
      'Port injection sprays before the valve; direct injection sprays into the cylinder.',
    paragraphs: [
      'Petrol engines can deliver fuel in different ways, and two of the most common systems are port injection and direct injection. Both aim to provide the correct quantity of fuel, but they introduce it at different locations.',
      'In a port-injected engine, fuel is sprayed into the intake port before the intake valve. The fuel mixes with incoming air before entering the cylinder. This design is relatively simple and can help wash deposits from the back of the intake valves as fuel passes over them.',
      'Direct injection sends fuel straight into the combustion chamber. Because injection happens directly inside the cylinder, engineers gain greater control over timing and mixture formation. This can improve efficiency, power output and cold-start behavior, especially when combined with turbocharging and sophisticated engine management.',
      'Direct injection operates at much higher fuel pressure than traditional port injection. High-pressure pumps and specialized injectors are required. These components work with very precise tolerances, which makes fuel quality and system cleanliness important.',
      'One characteristic of some direct-injection engines is that fuel no longer washes over the intake valves. Oil vapors and combustion-related deposits can therefore accumulate in certain designs over long periods. Manufacturers use various strategies to reduce this effect.',
      'Some modern engines combine both systems. Port injectors may be used in certain operating conditions while direct injectors are used in others. This allows engineers to take advantage of the strengths of each method.',
    ],
    keyTakeaway:
      'Port injection sprays fuel before the intake valve, while direct injection sprays it directly into the cylinder. Both systems can work well, but they achieve fuel delivery in different ways.',
    minutes: 3,
  },
  {
    id: 'tire-pressure',
    categoryId: 'howItWorks',
    title: 'Why Tire Pressure Changes With Temperature',
    level: 'Beginner',
    summary:
      'Air expands and contracts with temperature, so tire pressure naturally rises and falls.',
    paragraphs: [
      'Tire pressure is not fixed. The air inside a tire expands and contracts as temperature changes, which means pressure can rise on a hot day and fall during cold weather.',
      'This is why a tire that was correctly inflated during warm weather may show noticeably lower pressure when winter arrives. The tire has not necessarily developed a leak; the colder air simply occupies less volume and produces lower internal pressure.',
      'Driving also warms tires. Flexing of the rubber and friction within the tire generate heat, so pressure typically increases after the vehicle has been moving. For this reason, manufacturers normally specify tire pressure for cold tires rather than immediately after a long drive.',
      'Incorrect pressure affects more than comfort. Underinflation increases tire deformation and rolling resistance, which can raise heat generation and energy consumption. It can also change steering response and accelerate wear near the outer edges of the tread. Excessive pressure can reduce the size and behavior of the contact patch and may lead to greater wear near the center.',
      'The correct pressure depends on the vehicle, load and sometimes the driving situation. The number molded onto the tire sidewall is not usually the recommended operating pressure for the car; vehicle manufacturers provide their own specifications based on suspension, weight and tire size.',
    ],
    keyTakeaway:
      'Tire pressure naturally changes with temperature. Check it when the tires are cold and follow the vehicle manufacturer’s specified values.',
    minutes: 3,
  },
  {
    id: 'timing-belt-chain',
    categoryId: 'engine',
    title: 'Timing Belt vs Timing Chain',
    level: 'Intermediate',
    summary:
      'Belts and chains both synchronize crankshaft and camshaft — with different service needs.',
    paragraphs: [
      'Inside a four-stroke engine, the crankshaft and camshaft must remain synchronized. The crankshaft controls piston movement, while the camshaft opens and closes the intake and exhaust valves. If their timing is incorrect, the engine cannot operate properly.',
      'A timing belt is a reinforced toothed belt designed to maintain this synchronization. It operates relatively quietly and does not require lubrication from the engine oil. However, belts age and wear, so many engines have a specified replacement interval based on time, mileage or both.',
      'A timing chain performs the same basic function using metal links. Chains are often designed to last significantly longer than belts, but they are not automatically maintenance-free. They rely on engine oil for lubrication and usually operate with guides and hydraulic or mechanical tensioners.',
      'Poor lubrication, extended oil intervals or component wear can allow a chain to stretch or its tensioning system to deteriorate. Symptoms may include rattling noises, timing-related fault codes or rough engine operation.',
      'Timing system failure can be extremely serious. In many engines, the pistons and valves occupy overlapping spaces at different moments. If synchronization is lost, they can collide and cause major internal damage.',
      'The best maintenance strategy depends entirely on the engine design. A vehicle with a timing belt may require scheduled preventive replacement, while a chain-driven engine may focus more heavily on correct oil maintenance and monitoring for symptoms.',
    ],
    keyTakeaway:
      'Timing belts and chains perform the same critical synchronization job. Their maintenance requirements differ, but failure of either can cause severe engine damage.',
    minutes: 3,
  },
  {
    id: 'catalytic-converter',
    categoryId: 'fuel',
    title: 'What a Catalytic Converter Does to Exhaust Gases',
    level: 'Intermediate',
    summary:
      'A catalytic converter promotes chemical reactions that reduce harmful exhaust emissions.',
    paragraphs: [
      'Combustion engines produce several undesirable substances in their exhaust gases. A catalytic converter helps transform some of these pollutants into less harmful compounds before they leave the tailpipe.',
      'Inside the converter is a structure with a very large surface area coated with catalytic materials. When the converter reaches operating temperature, chemical reactions occur as exhaust gases pass through it.',
      'In a petrol engine, a three-way catalytic converter can reduce nitrogen oxides while also oxidizing carbon monoxide and unburned hydrocarbons. The engine management system works closely with oxygen sensors to maintain a suitable air-fuel mixture so these reactions can occur efficiently.',
      'A catalytic converter does not behave like a simple filter. It does not primarily trap pollutants; it promotes chemical reactions that convert them into different substances. This distinction is important when comparing it with systems such as diesel particulate filters.',
      'Converters operate at high temperatures. Engine problems that send excessive unburned fuel into the exhaust can overheat and damage them. Misfires are a particularly serious example because fuel that fails to burn inside the cylinder can ignite inside the hot converter instead.',
      'A failed converter can trigger warning lights, reduce performance if exhaust flow becomes restricted and increase emissions. However, replacing the converter without fixing the problem that caused its failure can lead to repeated damage.',
    ],
    keyTakeaway:
      'The catalytic converter uses chemical reactions to reduce harmful exhaust emissions, and its health depends heavily on correct engine operation.',
    minutes: 3,
  },
  {
    id: 'manual-transmission',
    categoryId: 'transmission',
    title: 'What Happens Inside a Manual Transmission',
    level: 'Intermediate',
    summary:
      'A manual gearbox changes ratios mechanically while the clutch and synchronizers smooth the shift.',
    paragraphs: [
      'A manual transmission gives the driver direct control over gear selection. Although the driver simply moves a gear lever and presses a clutch pedal, several mechanical systems work together to change the relationship between engine speed and wheel speed.',
      'The clutch temporarily disconnects the engine from the transmission. When the clutch pedal is pressed, engine torque is interrupted, allowing the driver to select a different gear without forcing heavily loaded components to change speed instantly.',
      'Inside the gearbox, different gear pairs provide different ratios. The gears themselves are typically in constant mesh, meaning they remain engaged with one another. Instead of physically sliding entire gears into contact, synchronizers and locking mechanisms connect the selected gear to the transmission shaft.',
      'Synchronizers help match rotational speeds before engagement. This allows smooth shifting without the grinding that would occur if components rotating at very different speeds were forced together.',
      'Lower gears multiply torque more strongly, making them useful for starting and accelerating. Higher gears reduce engine RPM at a given road speed, improving efficiency and reducing noise during cruising.',
      'Clutch wear depends significantly on driving technique. Holding the vehicle on a hill using partial clutch engagement, resting a foot on the clutch pedal or repeatedly slipping the clutch more than necessary can accelerate wear because friction surfaces are generating heat while partially engaged.',
    ],
    keyTakeaway:
      'A manual gearbox changes gear ratios mechanically, while the clutch and synchronizers allow those ratio changes to happen smoothly.',
    minutes: 3,
  },
  {
    id: 'thermostat',
    categoryId: 'cooling',
    title: 'Why an Engine Has a Thermostat',
    level: 'Beginner',
    summary:
      'The thermostat regulates coolant flow so the engine warms quickly and stays on target.',
    paragraphs: [
      'The thermostat is one of the smallest components in the cooling system, but it has a major influence on engine temperature.',
      'When a cold engine starts, the thermostat remains closed or mostly closed. This restricts coolant flow through the radiator and allows the engine to warm up more quickly. Reaching operating temperature efficiently is important because fuel control, oil performance, emissions systems and cabin heating all work better once the engine is warm.',
      'As coolant temperature rises, the thermostat begins to open. Hot coolant can then flow through the radiator, where heat is transferred to the surrounding air. The thermostat continuously responds to temperature rather than simply switching between fully closed and fully open states.',
      'If a thermostat becomes stuck open, the engine may warm very slowly or fail to reach its intended operating temperature in cold conditions. This can reduce heater performance and may affect fuel efficiency and emissions.',
      'If it becomes stuck closed, coolant may not circulate properly through the radiator, creating a risk of overheating. Temperature may rise rapidly, especially under load.',
      'Because thermostat symptoms can resemble other cooling-system problems, diagnosis should consider coolant level, water pump function, radiator condition, sensors and fan operation rather than assuming the thermostat is always responsible.',
    ],
    keyTakeaway:
      'The thermostat regulates coolant flow so the engine warms quickly and then stays within its intended operating temperature range.',
    minutes: 2,
  },
  {
    id: 'abs-lock',
    categoryId: 'braking',
    title: 'How ABS Knows a Wheel Is About to Lock',
    level: 'Advanced',
    summary:
      'ABS watches wheel speeds and rapidly adjusts pressure near the lockup threshold.',
    paragraphs: [
      'Anti-lock braking systems monitor how quickly each wheel rotates. Wheel-speed sensors generate continuous data that the ABS control unit uses to compare the behavior of individual wheels during braking.',
      'When a driver brakes hard, wheel speed naturally decreases. If one wheel begins slowing much faster than the others, the system can interpret this as an indication that the tire is approaching lockup.',
      'The ABS hydraulic unit can then rapidly reduce brake pressure to that wheel. Once rotation recovers, pressure can be increased again. This cycle can repeat many times per second, which is why the driver may feel pulsing through the brake pedal during strong ABS intervention.',
      'A locked tire generally loses much of its ability to provide directional control. By keeping the wheel rotating near the threshold of lockup, ABS helps the driver maintain steering capability during emergency braking.',
      'Modern braking systems integrate ABS with traction control and electronic stability control. The same wheel-speed information can help detect excessive wheelspin during acceleration or differences between the vehicle’s intended and actual path.',
      'ABS does not override the laws of physics. On surfaces with extremely low grip, braking distances can still be long. Tire condition, road surface and vehicle speed remain fundamental factors.',
    ],
    keyTakeaway:
      'ABS watches wheel speeds and rapidly adjusts brake pressure when it detects that a wheel is approaching lockup.',
    minutes: 3,
  },
  {
    id: 'intercooler',
    categoryId: 'engine',
    title: 'What an Intercooler Does in a Turbocharged Engine',
    level: 'Intermediate',
    summary:
      'An intercooler cools compressed turbo air so the engine gets a denser charge.',
    paragraphs: [
      'A turbocharger compresses intake air before it enters the engine. Compression increases pressure, but it also raises air temperature.',
      'Hot air is less dense than cooler air, which means a given volume contains fewer oxygen molecules. Because engine power depends partly on how much oxygen enters the cylinders, reducing intake temperature can improve the effectiveness of turbocharging.',
      'The intercooler acts as a heat exchanger. Compressed air from the turbo passes through internal passages while cooler external air flows across the intercooler’s surface. Heat moves from the intake air into the surrounding atmosphere.',
      'Many vehicles use air-to-air intercoolers located near the front of the vehicle where they receive significant airflow. Other designs use liquid-cooled intercoolers, where a separate coolant circuit removes heat from the intake charge.',
      'Lower intake temperatures can also help reduce the risk of abnormal combustion in petrol engines. Engine control systems constantly monitor operating conditions and may reduce ignition timing or boost if intake temperatures become too high.',
      'A damaged intercooler or leaking boost hose can reduce performance because pressurized air escapes before reaching the engine. Drivers may notice reduced power, unusual airflow noises or warning lights depending on the severity of the problem.',
    ],
    keyTakeaway:
      'The intercooler cools compressed turbo air so the engine receives a denser, more useful charge.',
    minutes: 3,
  },
  {
    id: 'ev-12v',
    categoryId: 'howItWorks',
    title: 'Why Electric Cars Still Have a 12-Volt Battery',
    level: 'Intermediate',
    summary:
      'The small battery powers electronics that safely bring the traction battery online.',
    paragraphs: [
      'An electric vehicle may have a large high-voltage battery capable of storing tens of kilowatt-hours, yet most EVs still contain a much smaller low-voltage battery, often based around a 12-volt electrical architecture.',
      'The high-voltage battery is mainly responsible for propulsion and other major loads. The low-voltage system powers control units, locks, lights, safety systems, communication modules and many components that evolved from traditional automotive electrical architecture.',
      'One particularly important job of the 12-volt battery is enabling the vehicle to start its electronic systems. Before the high-voltage battery can supply power to the drivetrain, electrically controlled contactors must close and connect the high-voltage system safely. The low-voltage battery provides the energy needed to operate those controls.',
      'This means an EV with a fully charged traction battery can sometimes still fail to “start” if its low-voltage battery is discharged. The energy may be present in the main battery, but the vehicle cannot activate the systems required to access it.',
      'Instead of an engine-driven alternator, EVs use a DC-to-DC converter. This device takes high-voltage DC power from the traction battery and converts it to the lower voltage required by the vehicle’s conventional electrical systems and low-voltage battery.',
      'Some newer vehicles use different low-voltage architectures, but the principle remains similar: propulsion voltage and accessory/control voltage are separated for safety, compatibility and system design reasons.',
    ],
    keyTakeaway:
      'The small battery in an EV powers the electronics that allow the much larger traction battery to be safely brought online.',
    minutes: 3,
  },
  {
    id: 'brake-rust',
    categoryId: 'braking',
    title: 'Why Brake Discs Sometimes Develop Rust',
    level: 'Beginner',
    summary:
      'Light surface rust is often normal; heavier corrosion may need inspection.',
    paragraphs: [
      'Brake discs are typically made from iron-based materials that can develop surface corrosion when exposed to moisture and oxygen. After rain, washing or simply sitting overnight in humid weather, a thin orange layer can appear on the disc surface.',
      'Light surface rust is often normal. The first few brake applications usually cause the pads to contact the disc and remove much of the thin corrosion layer.',
      'Problems arise when corrosion becomes deeper or uneven. Vehicles parked for long periods, driven infrequently or exposed to road salt can develop more substantial rust. This can affect the braking surface and may lead to noise, vibration or uneven pad contact.',
      'Hybrid and electric vehicles can experience an interesting version of this issue because regenerative braking may reduce how often the friction brakes are used. The brake discs still exist for stronger braking and emergency situations, but lighter everyday slowing may be handled largely by the electric motor.',
      'Manufacturers use different control strategies to keep friction brakes functional, and some vehicles periodically apply them automatically. Even so, visual inspection remains useful, especially in wet or salty climates.',
    ],
    keyTakeaway:
      'A small amount of surface rust can be normal, but persistent or heavy corrosion may require inspection.',
    minutes: 2,
  },
  {
    id: 'octane',
    categoryId: 'fuel',
    title: 'What “Octane Rating” Really Means',
    level: 'Advanced',
    summary:
      'Octane measures knock resistance — higher is not automatically better for every engine.',
    paragraphs: [
      'The octane rating of petrol describes its resistance to abnormal combustion, particularly knock. It does not directly measure how much energy the fuel contains and does not mean that higher-octane fuel is automatically more powerful in every engine.',
      'In a normal petrol engine, the spark plug ignites the air-fuel mixture at a controlled moment. The flame front then travels through the combustion chamber in a predictable way.',
      'Knock occurs when part of the remaining mixture auto-ignites unexpectedly due to pressure and temperature. This creates rapid pressure waves that can produce a metallic knocking sound and, under severe conditions, increase mechanical and thermal stress.',
      'High-compression and turbocharged engines are often more prone to knock because cylinder pressures and temperatures are higher. They may therefore be designed to use fuel with greater knock resistance.',
      'Modern engines use knock sensors to detect abnormal combustion. The engine control unit can respond by adjusting ignition timing, boost pressure or other parameters. This provides protection, but repeated operation on fuel below the required specification may reduce performance or efficiency.',
      'If an engine is designed for regular petrol, using significantly higher octane usually provides little benefit unless the manufacturer specifically states otherwise. The engine must be calibrated to take advantage of the greater knock resistance.',
    ],
    keyTakeaway:
      'Octane rating measures resistance to knock. Use the fuel grade specified for the engine rather than assuming a higher number is always better.',
    minutes: 3,
  },
  {
    id: 'crankshaft',
    categoryId: 'engine',
    title: 'What the Crankshaft Does Inside an Engine',
    level: 'Beginner',
    summary:
      'The crankshaft turns piston motion into usable rotation for the drivetrain.',
    paragraphs: [
      'The crankshaft is one of the most important moving parts inside a combustion engine because it converts the up-and-down movement of the pistons into rotational motion that can eventually turn the wheels. Each piston is connected to the crankshaft through a connecting rod. When combustion pushes a piston downward, the connecting rod transfers that force to an offset section of the crankshaft called a crank journal, causing the shaft to rotate.',
      'Because several cylinders fire at different moments, the crankshaft receives repeated pulses of force rather than one continuous push. Its shape is carefully designed to combine those individual power strokes into smoother rotation. Counterweights built into the crankshaft help balance the moving mass of the pistons and connecting rods, reducing vibration and stress.',
      'The crankshaft rotates inside main bearings that are supplied with pressurized engine oil. A stable oil film prevents direct metal-to-metal contact between the crankshaft and its bearings. If oil pressure becomes too low or lubrication fails, bearing surfaces can overheat and wear very quickly.',
      'At one end of the crankshaft, power is transferred toward the transmission through the flywheel or flexplate. At the other end, the crankshaft may drive accessories and engine components through pulleys, belts, chains or gears. A crankshaft position sensor also monitors its rotational position and speed so the engine control unit can precisely manage ignition and fuel injection.',
    ],
    keyTakeaway:
      'The crankshaft transforms piston movement into usable rotation and serves as the mechanical link between combustion inside the cylinders and power delivered to the drivetrain.',
    minutes: 3,
  },
  {
    id: 'brake-pull',
    categoryId: 'braking',
    title: 'Why a Car Pulls to One Side While Braking',
    level: 'Intermediate',
    summary:
      'A strong pull under braking can mean uneven force — or tires, suspension, or road slope.',
    paragraphs: [
      'A vehicle should remain reasonably straight during normal braking. If it consistently pulls strongly to one side when the brake pedal is pressed, the braking force may not be distributed evenly between the left and right wheels, although suspension, tires and road conditions can also contribute.',
      'One possible cause is a sticking brake caliper. The caliper must move freely so the brake pads apply and release correctly. If a piston or sliding mechanism becomes seized, one wheel may produce more or less braking force than the opposite side.',
      'Contaminated or unevenly worn brake pads can create a similar effect. Oil, grease or other contamination on one braking surface may reduce friction. A damaged brake hose can also affect hydraulic pressure. In some cases, a hose can deteriorate internally even though the outside still appears acceptable.',
      'Tire condition should not be ignored. Large differences in pressure, tread depth or grip between the left and right sides can influence how the car behaves under braking. Suspension components and wheel alignment can also cause the vehicle to change direction when weight transfers forward.',
      'The road itself may create a mild pull because many roads are intentionally sloped for drainage. For that reason, diagnosis should focus on a repeatable and noticeable change that occurs primarily during braking rather than a slight tendency on one particular road.',
    ],
    keyTakeaway:
      'Pulling during braking can indicate uneven braking force, but tires, suspension and road slope should also be considered before assuming the brakes are the only cause.',
    minutes: 3,
  },
  {
    id: 'clutch',
    categoryId: 'transmission',
    title: 'How the Clutch Connects and Disconnects the Engine',
    level: 'Beginner',
    summary:
      'The clutch is a controllable friction connection between engine and gearbox.',
    paragraphs: [
      'In a manual-transmission vehicle, the engine continues rotating even when the vehicle is stopped. The clutch allows the driver to temporarily disconnect the engine from the transmission so the car can stop, start moving and change gears without forcing the engine and gearbox to remain mechanically locked together.',
      'The clutch assembly normally includes a flywheel, clutch disc and pressure plate. The flywheel is connected to the engine crankshaft. The clutch disc sits between the flywheel and pressure plate and is connected to the transmission input shaft.',
      'When the clutch pedal is released, the pressure plate firmly clamps the clutch disc against the flywheel. Friction locks the components together, allowing engine torque to flow into the gearbox.',
      'Pressing the clutch pedal operates a release mechanism that removes clamping pressure from the disc. The engine can then continue spinning while the transmission input shaft slows or changes speed independently. This temporary separation allows the driver to select another gear.',
      'Starting from a standstill requires a brief period of controlled slip. As the clutch pedal is released, the disc gradually begins transferring torque. Too little throttle may cause the engine to stall, while excessive throttle combined with prolonged slipping creates unnecessary heat and wear.',
      'Clutch friction material is designed to wear gradually, but driving technique has a major influence on service life. Resting a foot on the clutch pedal, holding the car on a hill using the clutch or repeatedly maintaining the clutch at the biting point can increase wear considerably.',
    ],
    keyTakeaway:
      'The clutch is a controllable friction connection between the engine and transmission, allowing power flow to be smoothly interrupted and restored.',
    minutes: 3,
  },
  {
    id: 'engine-sensors',
    categoryId: 'howItWorks',
    title: 'Why Engines Use Several Different Sensors',
    level: 'Intermediate',
    summary:
      'Sensors give the ECU a live picture of conditions so the engine can adapt.',
    paragraphs: [
      'A modern engine cannot efficiently control fuel, ignition, emissions and power output using only mechanical systems. It relies on a network of sensors that continuously report what is happening inside and around the engine.',
      'The engine control unit receives this information and makes rapid adjustments. A mass airflow sensor may measure incoming air, while a manifold pressure sensor can help determine engine load. Crankshaft and camshaft position sensors tell the computer where the rotating engine components are positioned so fuel injection and ignition can occur at the correct moment.',
      'Coolant temperature is another important input. A cold engine requires different operating strategies from a fully warmed engine. The control unit may adjust fuel delivery, idle speed, cooling fans and emissions systems based partly on temperature.',
      'Oxygen sensors located in the exhaust provide feedback about combustion. By examining oxygen content in exhaust gases, the control system can make fine corrections to the air-fuel mixture and monitor catalytic converter performance.',
      'Knock sensors listen for vibration patterns associated with abnormal combustion. If knock is detected, the engine management system can alter ignition timing or other parameters to reduce the risk of damage.',
      'The accelerator pedal itself is also commonly electronic. Multiple position sensors communicate driver demand to the control unit, which then decides how much throttle opening, fuel delivery or boost is appropriate.',
      'Because so many systems share information, one faulty sensor can sometimes create symptoms that appear unrelated. A bad temperature reading, for example, may affect starting, fuel consumption, cooling fan behavior and engine performance at the same time.',
    ],
    keyTakeaway:
      'Sensors give the engine control unit a constantly updated picture of operating conditions, allowing the engine to adapt instead of running with fixed settings.',
    minutes: 3,
  },
  {
    id: 'coolant-boiling',
    categoryId: 'cooling',
    title: 'What Happens When Coolant Starts Boiling',
    level: 'Intermediate',
    summary:
      'Boiling coolant reduces heat transfer and can make overheating escalate quickly.',
    paragraphs: [
      'Coolant is designed to remain liquid while carrying heat away from the engine, but excessive temperature or insufficient system pressure can eventually cause it to boil. When this happens, cooling efficiency can deteriorate rapidly.',
      'Liquid coolant transfers heat much more effectively than vapor. If vapor pockets begin forming around very hot engine surfaces, those areas may no longer receive adequate cooling. Local temperatures can rise even further, accelerating the overheating process.',
      'The cooling system is pressurized partly to increase the boiling point of the coolant. A functioning pressure cap maintains controlled pressure while allowing excessive pressure to escape safely. If the cap cannot hold the required pressure, coolant may begin boiling at a lower temperature than intended.',
      'Low coolant level is another serious risk. Air entering the system can create pockets where coolant does not circulate correctly. A failing water pump, blocked radiator, stuck thermostat or non-functioning cooling fan can also allow temperature to rise beyond the system’s ability to control it.',
      'Visible steam from the engine compartment is an important warning sign. Opening a hot radiator or pressurized coolant reservoir can be dangerous because releasing pressure suddenly can cause extremely hot coolant to erupt from the system.',
      'Overheating can affect cylinder head gaskets, seals, lubricants and metal components. Aluminum cylinder heads are particularly sensitive to excessive temperature because thermal distortion can alter sealing surfaces.',
    ],
    keyTakeaway:
      'Boiling coolant is not just a symptom of heat; it can reduce the cooling system’s ability to remove heat and cause temperatures to rise even faster.',
    minutes: 3,
  },
  {
    id: 'fuel-pump',
    categoryId: 'fuel',
    title: 'What a Fuel Pump Does Before the Engine Even Starts',
    level: 'Beginner',
    summary:
      'The fuel pump builds pressure so injectors can deliver fuel accurately from the start.',
    paragraphs: [
      'In many modern vehicles, the fuel system begins working before the engine starts rotating. When the driver unlocks the vehicle, opens a door or switches the ignition on, the electric fuel pump may briefly activate to build pressure in the fuel system.',
      'The pump is usually located inside or near the fuel tank. Its job is to move fuel from the tank toward the engine at the pressure required by the system. Petrol engines with port injection may use this supply pressure directly, while direct-injection engines often use an additional mechanically driven high-pressure pump closer to the engine.',
      'Diesel systems may also contain multiple pumping stages. Low-pressure fuel is first delivered from the tank, then a high-pressure pump supplies the common rail at far greater pressure.',
      'Maintaining stable fuel pressure is important because the injectors are calibrated to deliver fuel accurately under known pressure conditions. If pressure falls too low, the engine may struggle to start, hesitate under load or lose power.',
      'A weak fuel pump can sometimes work normally during light driving but fail to maintain sufficient flow when the engine demands more fuel. Heat, electrical resistance, contamination and wear can all affect pump performance.',
      'The fuel itself often helps cool and lubricate an in-tank pump. This is one reason repeatedly operating some vehicles with extremely low fuel levels may not be ideal, although the exact effect varies by design.',
    ],
    keyTakeaway:
      'The fuel pump creates the pressure and flow that allow the injectors to deliver fuel accurately, often beginning its work before the engine starts.',
    minutes: 3,
  },
  {
    id: 'downshift-rpm',
    categoryId: 'transmission',
    title: 'Why Engine RPM Rises When You Downshift',
    level: 'Intermediate',
    summary:
      'A lower gear needs more engine revolutions for the same road speed.',
    paragraphs: [
      'Each gear ratio creates a specific relationship between road speed and engine speed. When a vehicle is travelling at a fixed speed, a lower gear requires the engine to rotate faster than a higher gear.',
      'This is why engine RPM rises during a downshift. Suppose the vehicle is cruising in a high gear at relatively low RPM. Selecting the next lower gear changes the transmission ratio. To maintain the same road speed after the lower gear engages, the engine must accelerate to match the new ratio.',
      'In a manual car, the driver can make this transition smoother by briefly increasing engine speed before releasing the clutch. This technique is known as rev matching. When engine RPM is close to the speed required by the lower gear, the clutch has less rotational difference to absorb.',
      'Automatic transmissions perform this process electronically and hydraulically. During many downshifts, the engine control system and transmission coordinate throttle position, clutch pressure and gear engagement so engine speed rises smoothly before torque is fully transferred.',
      'Downshifting also increases engine braking. With a lower gear selected, the engine rotates faster and creates greater resistance to the vehicle’s motion when the accelerator is released. This can be useful on descents because it reduces continuous reliance on the friction brakes.',
      'However, selecting a gear that is too low for the current road speed can force engine RPM beyond its intended range. Modern automatic transmissions usually prevent inappropriate shifts, but manual drivers must select gears responsibly.',
    ],
    keyTakeaway:
      'RPM rises during a downshift because a lower gear requires more engine revolutions for the same wheel speed.',
    minutes: 3,
  },
  {
    id: 'brake-pedal-heat',
    categoryId: 'braking',
    title: 'Why Your Brake Pedal Can Feel Different After Repeated Hard Stops',
    level: 'Advanced',
    summary:
      'Heat can change pad friction and fluid behavior after repeated hard braking.',
    paragraphs: [
      'Braking converts a vehicle’s kinetic energy into heat. During one ordinary stop, the braking system can absorb a significant amount of energy, but repeated heavy braking can raise temperatures dramatically throughout the pads, discs, calipers and fluid.',
      'As brake pads become very hot, their friction characteristics can change. Some materials produce less friction outside their intended temperature range, meaning the driver must press the pedal harder to achieve the same deceleration. This is one form of brake fade.',
      'Another type of fade involves brake fluid. If fluid temperature becomes high enough for vapor to form, the brake pedal can become soft or unusually long because vapor is compressible while liquid brake fluid is not. Moisture-contaminated brake fluid is more vulnerable because absorbed water can reduce its effective boiling point.',
      'Brake discs also expand with heat. Their temperature may rise unevenly depending on driving conditions, airflow and braking load. Extremely high temperatures can cause temporary vibration, changes in pad behavior or, under severe conditions, permanent component damage.',
      'Long downhill roads are a common situation where heat can accumulate. Continuously holding the brake pedal lightly for several minutes can sometimes generate more sustained heat than using controlled periods of braking combined with an appropriate lower gear or regenerative braking where available.',
      'Vehicle weight matters as well. A heavily loaded vehicle contains more kinetic energy at a given speed, so the brakes must convert more energy into heat during each stop.',
      'Performance braking systems often use larger discs, improved ventilation and materials designed to remain stable at higher temperatures. These features increase thermal capacity but do not make the brakes immune to overheating.',
    ],
    keyTakeaway:
      'A changing brake pedal feel after repeated hard stops can be a sign that heat is affecting the pads, discs or brake fluid. Brakes need time and airflow to release the energy they absorb.',
    minutes: 4,
  },
];

export function getLearnCategory(id: string) {
  return LEARN_CATEGORIES.find(item => item.id === id);
}

export function getLearnArticle(id: string) {
  return LEARN_ARTICLES.find(item => item.id === id);
}

export function getLearnStats() {
  const minutes = LEARN_ARTICLES.reduce((sum, item) => sum + item.minutes, 0);
  return {
    topics: LEARN_ARTICLES.length,
    minutes,
  };
}

export function getNextArticle(id: string) {
  const index = LEARN_ARTICLES.findIndex(item => item.id === id);
  if (index < 0 || index >= LEARN_ARTICLES.length - 1) {
    return undefined;
  }
  return LEARN_ARTICLES[index + 1];
}
