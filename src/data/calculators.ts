import type {CalculatorToolId} from '../navigation/types';

export type FieldKind = 'number';

export type CalculatorField = {
  id: string;
  label: string;
  unit: string;
  defaultValue: string;
  slider?: {min: number; max: number; step: number};
};

export type CalculatorSegment = {
  id: string;
  options: Array<{id: string; label: string}>;
  defaultValue: string;
};

export type CalculatorStat = {
  label: string;
  value: string;
};

export type CalculatorResult = {
  eyebrow: string;
  value: string;
  suffix?: string;
  stats: CalculatorStat[];
  tip: string;
  summary: string;
  metricLabel: string;
};

export type CalculatorTool = {
  id: CalculatorToolId;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  badge: string;
  wide?: boolean;
  segment?: CalculatorSegment;
  fields: CalculatorField[];
};

export const CALCULATOR_TOOLS: CalculatorTool[] = [
  {
    id: 'tripFuel',
    title: 'Trip Fuel',
    description:
      'Fuel and cost needed for a planned journey, split between passengers.',
    accent: '#3d9bff',
    accentSoft: 'rgba(61,155,255,0.13)',
    badge: 'L · €',
    wide: true,
    segment: {
      id: 'trip',
      defaultValue: 'oneWay',
      options: [
        {id: 'oneWay', label: 'One way'},
        {id: 'round', label: 'Round trip'},
      ],
    },
    fields: [
      {
        id: 'distance',
        label: 'Trip distance',
        unit: 'km',
        defaultValue: '480',
        slider: {min: 10, max: 2000, step: 10},
      },
      {
        id: 'consumption',
        label: 'Consumption',
        unit: 'L/100 km',
        defaultValue: '6.8',
        slider: {min: 2, max: 20, step: 0.1},
      },
      {id: 'price', label: 'Fuel price', unit: '€/L', defaultValue: '1.79'},
      {
        id: 'passengers',
        label: 'Passengers sharing',
        unit: 'people',
        defaultValue: '2',
        slider: {min: 1, max: 8, step: 1},
      },
    ],
  },
  {
    id: 'fuelConsumption',
    title: 'Fuel Consumption',
    description: 'Real-world consumption from a full-to-full fill-up.',
    accent: '#ff7a2f',
    accentSoft: 'rgba(255,122,47,0.13)',
    badge: 'L/100 km',
    fields: [
      {id: 'distance', label: 'Distance driven', unit: 'km', defaultValue: '612'},
      {id: 'fuel', label: 'Fuel added', unit: 'L', defaultValue: '41.3'},
    ],
  },
  {
    id: 'fuelCost',
    title: 'Fuel Cost',
    description: 'What your driving costs per month and per year.',
    accent: '#3ddc84',
    accentSoft: 'rgba(61,220,132,0.13)',
    badge: '€/month',
    segment: {
      id: 'period',
      defaultValue: 'monthly',
      options: [
        {id: 'monthly', label: 'Monthly'},
        {id: 'yearly', label: 'Yearly'},
      ],
    },
    fields: [
      {
        id: 'consumption',
        label: 'Consumption',
        unit: 'L/100 km',
        defaultValue: '7.2',
        slider: {min: 2, max: 20, step: 0.1},
      },
      {
        id: 'distance',
        label: 'Monthly distance',
        unit: 'km',
        defaultValue: '1400',
        slider: {min: 100, max: 5000, step: 10},
      },
      {id: 'price', label: 'Fuel price', unit: '€/L', defaultValue: '1.79'},
    ],
  },
  {
    id: 'motoHours',
    title: 'Moto Hours Tracker',
    description: 'Engine hours, equivalent distance and service timing.',
    accent: '#ffb23f',
    accentSoft: 'rgba(255,178,63,0.13)',
    badge: 'Engine h',
    fields: [
      {id: 'start', label: 'Start reading', unit: 'h', defaultValue: '1240'},
      {id: 'current', label: 'Current reading', unit: 'h', defaultValue: '1312.5'},
      {
        id: 'speed',
        label: 'Average speed',
        unit: 'km/h',
        defaultValue: '38',
        slider: {min: 5, max: 120, step: 1},
      },
      {
        id: 'interval',
        label: 'Service interval',
        unit: 'h',
        defaultValue: '250',
        slider: {min: 25, max: 1000, step: 5},
      },
      {id: 'last', label: 'Last service at', unit: 'h', defaultValue: '1150'},
    ],
  },
  {
    id: 'lpg',
    title: 'LPG Savings',
    description: 'Monthly savings and payback of an autogas conversion.',
    accent: '#2fd3c6',
    accentSoft: 'rgba(47,211,198,0.13)',
    badge: 'Payback',
    fields: [
      {id: 'petrolUse', label: 'Petrol consumption', unit: 'L/100 km', defaultValue: '8'},
      {id: 'petrolPrice', label: 'Petrol price', unit: '€/L', defaultValue: '1.79'},
      {id: 'lpgUse', label: 'LPG consumption', unit: 'L/100 km', defaultValue: '9.6'},
      {id: 'lpgPrice', label: 'LPG price', unit: '€/L', defaultValue: '0.89'},
      {
        id: 'distance',
        label: 'Monthly distance',
        unit: 'km',
        defaultValue: '1800',
        slider: {min: 100, max: 5000, step: 10},
      },
      {id: 'conversion', label: 'Conversion cost', unit: '€', defaultValue: '1400'},
    ],
  },
  {
    id: 'ev',
    title: 'EV Consumption',
    description: 'Energy use and charging cost including losses.',
    accent: '#8b7cff',
    accentSoft: 'rgba(139,124,255,0.13)',
    badge: 'kWh/100 km',
    fields: [
      {id: 'distance', label: 'Distance', unit: 'km', defaultValue: '320'},
      {id: 'energy', label: 'Energy used', unit: 'kWh', defaultValue: '54.4'},
      {id: 'price', label: 'Electricity price', unit: '€/kWh', defaultValue: '0.28'},
      {
        id: 'losses',
        label: 'Charging losses',
        unit: '%',
        defaultValue: '10',
        slider: {min: 0, max: 30, step: 1},
      },
    ],
  },
  {
    id: 'hybrid',
    title: 'Hybrid Cost',
    description: 'Blended cost of fuel and electric driving.',
    accent: '#ff6b8b',
    accentSoft: 'rgba(255,107,139,0.13)',
    badge: '€/100 km',
    fields: [
      {
        id: 'distance',
        label: 'Distance',
        unit: 'km',
        defaultValue: '1000',
        slider: {min: 50, max: 3000, step: 10},
      },
      {
        id: 'share',
        label: 'Electric share',
        unit: '%',
        defaultValue: '45',
        slider: {min: 0, max: 100, step: 1},
      },
      {id: 'fuelUse', label: 'Fuel consumption', unit: 'L/100 km', defaultValue: '5.2'},
      {id: 'elecUse', label: 'Electric consumption', unit: 'kWh/100 km', defaultValue: '16'},
      {id: 'fuelPrice', label: 'Fuel price', unit: '€/L', defaultValue: '1.79'},
      {id: 'elecPrice', label: 'Electricity price', unit: '€/kWh', defaultValue: '0.28'},
    ],
  },
];

export function getCalculatorTool(id: CalculatorToolId) {
  const tool = CALCULATOR_TOOLS.find(item => item.id === id);
  if (!tool) {
    throw new Error(`Unknown calculator ${id}`);
  }
  return tool;
}

export function defaultValues(tool: CalculatorTool) {
  return Object.fromEntries(tool.fields.map(field => [field.id, '']));
}

const num = (values: Record<string, string>, id: string) => {
  const parsed = Number(String(values[id] ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : NaN;
};

const money = (value: number) =>
  `€${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fixed = (value: number, digits: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export function computeCalculator(
  tool: CalculatorTool,
  values: Record<string, string>,
  segmentValue: string,
): CalculatorResult | null {
  if (tool.id === 'tripFuel') {
    const distance = num(values, 'distance');
    const consumption = num(values, 'consumption');
    const price = num(values, 'price');
    const passengers = num(values, 'passengers');
    if ([distance, consumption, price, passengers].some(value => !(value > 0))) {
      return null;
    }
    const totalDistance = segmentValue === 'round' ? distance * 2 : distance;
    const litres = (totalDistance * consumption) / 100;
    const cost = litres * price;
    const perPerson = cost / passengers;
    const perKm = cost / totalDistance;
    return {
      eyebrow: 'Total fuel cost',
      value: money(cost),
      stats: [
        {label: 'Fuel needed', value: `${fixed(litres, 1)} L`},
        {label: 'Per passenger', value: money(perPerson)},
        {label: 'Cost per km', value: money(perKm)},
        {label: 'Total distance', value: `${fixed(totalDistance, 0)} km`},
      ],
      tip: `At ${fixed(consumption, 1)} L/100 km you will burn about ${fixed(litres, 1)} L over ${fixed(totalDistance, 0)} km. Split ${fixed(passengers, 0)} ways, each passenger pays ${money(perPerson)}. Add 5–10% for traffic, hills and A/C.`,
      summary: `${fixed(totalDistance, 0)} km · ${fixed(consumption, 1)} L/100 km · ${money(price)}/L · ${segmentValue === 'round' ? 'Round trip' : 'One way'}`,
      metricLabel: 'Total fuel cost',
    };
  }

  if (tool.id === 'fuelConsumption') {
    const distance = num(values, 'distance');
    const fuel = num(values, 'fuel');
    if (!(distance > 0) || !(fuel > 0)) {
      return null;
    }
    const lPer100 = (fuel / distance) * 100;
    const kmPerL = distance / fuel;
    const mpgUs = 235.215 / lPer100;
    const mpgUk = 282.481 / lPer100;
    const range = (50 / lPer100) * 100;
    return {
      eyebrow: 'Average consumption',
      value: fixed(lPer100, 2),
      suffix: 'L/100 km',
      stats: [
        {label: 'Kilometres per litre', value: `${fixed(kmPerL, 1)} km/L`},
        {label: 'MPG (US)', value: fixed(mpgUs, 1)},
        {label: 'MPG (UK)', value: fixed(mpgUk, 1)},
        {label: 'Range on 50 L', value: `${fixed(range, 0)} km`},
      ],
      tip: 'Fill to the brim, reset the trip meter, and at the next full fill-up enter the distance and litres added. Averaging several fill-ups gives the most reliable figure.',
      summary: `${fixed(distance, 0)} km · ${fixed(fuel, 1)} L`,
      metricLabel: 'Average consumption',
    };
  }

  if (tool.id === 'fuelCost') {
    const consumption = num(values, 'consumption');
    const distance = num(values, 'distance');
    const price = num(values, 'price');
    if ([consumption, distance, price].some(value => !(value > 0))) {
      return null;
    }
    const yearly = segmentValue === 'yearly';
    const monthDistance = yearly ? distance / 12 : distance;
    const yearDistance = yearly ? distance : distance * 12;
    const monthFuel = (monthDistance * consumption) / 100;
    const monthCost = monthFuel * price;
    const yearCost = monthCost * 12;
    const headline = yearly ? yearCost : monthCost;
    const saving = ((0.5 / 100) * yearDistance * price);
    return {
      eyebrow: yearly ? 'Fuel cost per year' : 'Fuel cost per month',
      value: money(headline),
      stats: [
        {label: 'Per year', value: money(yearCost)},
        {label: 'Per 100 km', value: money(consumption * price)},
        {label: 'Per day', value: money(monthCost / 30)},
        {label: 'Fuel per month', value: `${fixed(monthFuel, 1)} L`},
      ],
      tip: `Driving ${fixed(monthDistance, 0)} km a month at ${fixed(consumption, 1)} L/100 km. Every 0.5 L/100 km you save through smoother driving is worth ${money(saving)} a year.`,
      summary: `${fixed(distance, 0)} km · ${fixed(consumption, 1)} L/100 km · ${money(price)}/L`,
      metricLabel: yearly ? 'Fuel cost per year' : 'Fuel cost per month',
    };
  }

  if (tool.id === 'motoHours') {
    const start = num(values, 'start');
    const current = num(values, 'current');
    const speed = num(values, 'speed');
    const interval = num(values, 'interval');
    const last = num(values, 'last');
    if ([start, current, speed, interval, last].some(value => !Number.isFinite(value) || value < 0)) {
      return null;
    }
    if (!(current >= start) || !(interval > 0) || !(speed > 0)) {
      return null;
    }
    const used = current - start;
    const sinceService = Math.max(0, current - last);
    const nextIn = interval - sinceService;
    const dueAt = last + interval;
    const usedPct = (sinceService / interval) * 100;
    return {
      eyebrow: 'Engine hours used',
      value: fixed(used, 1),
      suffix: 'h',
      stats: [
        {label: 'Equivalent distance', value: `${fixed(used * speed, 0)} km`},
        {label: 'Next service in', value: `${fixed(nextIn, 1)} h`},
        {label: 'Service due at', value: `${fixed(dueAt, 1)} h`},
        {label: 'Interval used', value: `${fixed(usedPct, 0)}%`},
      ],
      tip: `Engine hours measure running time, not distance. At ${fixed(speed, 0)} km/h average, ${fixed(used, 1)} h equals roughly ${fixed(used * speed, 0)} km of wear — ideal for idling-heavy use, motorcycles and boats.`,
      summary: `${fixed(start, 1)} h → ${fixed(current, 1)} h · ${fixed(speed, 0)} km/h`,
      metricLabel: 'Engine hours used',
    };
  }

  if (tool.id === 'lpg') {
    const petrolUse = num(values, 'petrolUse');
    const petrolPrice = num(values, 'petrolPrice');
    const lpgUse = num(values, 'lpgUse');
    const lpgPrice = num(values, 'lpgPrice');
    const distance = num(values, 'distance');
    const conversion = num(values, 'conversion');
    if ([petrolUse, petrolPrice, lpgUse, lpgPrice, distance, conversion].some(value => !(value > 0))) {
      return null;
    }
    const petrolPer100 = petrolUse * petrolPrice;
    const lpgPer100 = lpgUse * lpgPrice;
    const monthly = ((petrolPer100 - lpgPer100) * distance) / 100;
    const yearly = monthly * 12;
    const payback = monthly > 0 ? conversion / monthly : Infinity;
    return {
      eyebrow: 'Monthly savings',
      value: money(monthly),
      suffix: '/ month',
      stats: [
        {label: 'Yearly savings', value: money(yearly)},
        {label: 'Payback period', value: `${fixed(payback, 1)} months`},
        {label: 'Petrol per 100 km', value: money(petrolPer100)},
        {label: 'LPG per 100 km', value: money(lpgPer100)},
      ],
      tip: 'LPG burns about 15–20% more volume than petrol but costs roughly half per litre. After the payback period, the savings are pure gain — factor in annual system checks.',
      summary: `${fixed(distance, 0)} km/month · ${money(conversion)} conversion`,
      metricLabel: 'Monthly savings',
    };
  }

  if (tool.id === 'ev') {
    const distance = num(values, 'distance');
    const energy = num(values, 'energy');
    const price = num(values, 'price');
    const losses = num(values, 'losses');
    if ([distance, energy, price].some(value => !(value > 0)) || !(losses >= 0)) {
      return null;
    }
    const efficiency = (energy / distance) * 100;
    const fromGrid = energy * (1 + losses / 100);
    const tripCost = fromGrid * price;
    const per100 = (tripCost / distance) * 100;
    const petrolEq = efficiency / 8.9;
    return {
      eyebrow: 'Efficiency',
      value: fixed(efficiency, 1),
      suffix: 'kWh/100 km',
      stats: [
        {label: 'Trip cost', value: money(tripCost)},
        {label: 'Cost per 100 km', value: money(per100)},
        {label: 'Energy from grid', value: `${fixed(fromGrid, 1)} kWh`},
        {label: 'Petrol equivalent', value: `${fixed(petrolEq, 1)} L/100 km`},
      ],
      tip: `Charging losses of ${fixed(losses, 0)}% mean you paid for ${fixed(fromGrid, 1)} kWh to put ${fixed(energy, 1)} kWh into the battery. Cold weather and motorway speeds typically raise consumption by 15–30%.`,
      summary: `${fixed(distance, 0)} km · ${fixed(energy, 1)} kWh · ${money(price)}/kWh`,
      metricLabel: 'Efficiency',
    };
  }

  const distance = num(values, 'distance');
  const share = num(values, 'share');
  const fuelUse = num(values, 'fuelUse');
  const elecUse = num(values, 'elecUse');
  const fuelPrice = num(values, 'fuelPrice');
  const elecPrice = num(values, 'elecPrice');
  if ([distance, fuelUse, elecUse, fuelPrice, elecPrice].some(value => !(value > 0)) || !(share >= 0)) {
    return null;
  }
  const electricKm = distance * (share / 100);
  const fuelKm = distance - electricKm;
  const fuelUsed = (fuelKm * fuelUse) / 100;
  const elecUsed = (electricKm * elecUse) / 100;
  const total = fuelUsed * fuelPrice + elecUsed * elecPrice;
  const per100 = (total / distance) * 100;
  const petrolOnly = ((distance * fuelUse) / 100) * fuelPrice;
  const saved = petrolOnly - total;
  return {
    eyebrow: 'Blended cost',
    value: money(per100),
    suffix: '/ 100 km',
    stats: [
      {label: 'Total cost', value: money(total)},
      {label: 'Fuel used', value: `${fixed(fuelUsed, 1)} L`},
      {label: 'Electricity used', value: `${fixed(elecUsed, 1)} kWh`},
      {label: 'Saved vs petrol-only', value: money(saved)},
    ],
    tip: `With ${fixed(share, 0)}% of ${fixed(distance, 0)} km driven electrically, your blended cost is ${money(per100)} per 100 km. Charging more often raises the electric share and lowers the cost further.`,
    summary: `${fixed(distance, 0)} km · ${fixed(share, 0)}% electric`,
    metricLabel: 'Blended cost',
  };
}

export function fieldLabel(tool: CalculatorTool, field: CalculatorField, segmentValue: string) {
  if (tool.id === 'fuelCost' && field.id === 'distance') {
    return segmentValue === 'yearly' ? 'Yearly distance' : 'Monthly distance';
  }
  return field.label;
}
