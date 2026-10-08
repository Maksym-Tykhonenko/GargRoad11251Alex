import type {
  ChecklistCategory,
  ChecklistCategoryId,
  FuelType,
} from '../types/vehicle';

type ChecklistSection = {
  title: string;
  fuels?: FuelType[];
  items: string[];
};

const PRE_TRIP: ChecklistSection[] = [
  {
    title: 'Common Checks',
    items: [
      'Check tire pressure',
      'Inspect tires for cuts or damage',
      'Check headlights and brake lights',
      'Check windshield washer fluid',
      'Check wiper condition',
      'Check brake response',
      'Look for leaks under the vehicle',
      'Check dashboard warning lights',
      'Make sure mirrors are clean and adjusted',
      'Check emergency kit',
      'Check spare tire or repair kit',
      'Confirm sufficient range for the trip',
    ],
  },
  {
    title: 'Petrol',
    fuels: ['Petrol'],
    items: [
      'Check engine oil level',
      'Check coolant level',
      'Check fuel level',
      'Listen for unusual engine sounds',
    ],
  },
  {
    title: 'Diesel',
    fuels: ['Diesel'],
    items: [
      'Check engine oil',
      'Check coolant',
      'Check diesel level',
      'Check AdBlue level',
      'Check for DPF warnings',
    ],
  },
  {
    title: 'LPG',
    fuels: ['LPG'],
    items: [
      'Check petrol level',
      'Check LPG level',
      'Inspect for unusual gas smell',
      'Check LPG system warning indicators',
      'Make sure petrol reserve is sufficient',
    ],
  },
  {
    title: 'Hybrid',
    fuels: ['Hybrid'],
    items: [
      'Check engine oil',
      'Check coolant',
      'Check fuel level',
      'Check hybrid system warnings',
      'Check battery charge/status',
    ],
  },
  {
    title: 'Plug-in Hybrid',
    fuels: ['Plug-in Hybrid'],
    items: [
      'Check fuel level',
      'Check traction battery charge',
      'Check charging cable',
      'Check charging port',
      'Check engine fluids',
    ],
  },
  {
    title: 'Electric',
    fuels: ['Electric'],
    items: [
      'Check battery charge',
      'Estimate remaining driving range',
      'Check charging cable',
      'Inspect charging connector',
      'Check battery/cooling warnings',
      'Plan charging stops if needed',
    ],
  },
];

const SEASONAL: ChecklistSection[] = [
  {
    title: 'Common Checks',
    items: [
      'Check tire condition',
      'Check tire pressure',
      'Inspect brakes',
      'Check windshield wipers',
      'Top up seasonal washer fluid',
      'Check exterior lights',
      'Inspect door and window seals',
      'Check 12V battery condition',
      'Clean ventilation intakes',
      'Inspect underbody for damage',
    ],
  },
  {
    title: 'Winter',
    items: [
      'Install appropriate winter tires',
      'Check tire tread depth',
      'Use winter washer fluid',
      'Check heater and defroster',
      'Check ice scraper / snow equipment',
      'Inspect battery performance in cold weather',
    ],
  },
  {
    title: 'Summer',
    items: [
      'Check air conditioning',
      'Inspect coolant system',
      'Check tire pressure for hot weather',
      'Check sun protection accessories',
      'Inspect cooling fans',
    ],
  },
  {
    title: 'Petrol',
    fuels: ['Petrol'],
    items: [
      'Check engine coolant',
      'Check engine oil condition',
      'Inspect belts and hoses',
    ],
  },
  {
    title: 'Hybrid',
    fuels: ['Hybrid'],
    items: [
      'Check engine coolant',
      'Check engine oil condition',
      'Inspect belts and hoses',
    ],
  },
  {
    title: 'Plug-in Hybrid',
    fuels: ['Plug-in Hybrid'],
    items: [
      'Check engine coolant',
      'Check engine oil condition',
      'Inspect belts and hoses',
    ],
  },
  {
    title: 'Diesel',
    fuels: ['Diesel'],
    items: [
      'Check glow plug warnings',
      'Check AdBlue',
      'Inspect DPF status',
      'Use appropriate seasonal diesel where required',
    ],
  },
  {
    title: 'LPG',
    fuels: ['LPG'],
    items: [
      'Inspect LPG system condition',
      'Check tank and filling connector',
      'Check system switching between LPG and petrol',
    ],
  },
  {
    title: 'Electric',
    fuels: ['Electric'],
    items: [
      'Check battery thermal management',
      'Inspect charging cable',
      'Check charging port seals',
      'Review cold-weather or hot-weather range',
      'Check cabin preconditioning settings',
    ],
  },
];

const LONG_TRIP: ChecklistSection[] = [
  {
    title: 'Common Checks',
    items: [
      'Check all tire pressures',
      'Inspect tread depth',
      'Check brakes',
      'Test all exterior lights',
      'Fill washer fluid',
      'Check wipers',
      'Verify emergency equipment',
      'Check insurance and vehicle documents',
      'Pack spare key if appropriate',
      'Check navigation and route',
      'Plan rest stops',
      'Check weather conditions',
      'Verify roadside assistance details',
    ],
  },
  {
    title: 'Petrol',
    fuels: ['Petrol'],
    items: [
      'Check engine oil',
      'Check coolant',
      'Estimate fuel stops',
      'Inspect for leaks',
    ],
  },
  {
    title: 'Diesel',
    fuels: ['Diesel'],
    items: [
      'Check oil and coolant',
      'Fill AdBlue if needed',
      'Check DPF warnings',
      'Plan suitable refueling stops',
    ],
  },
  {
    title: 'LPG',
    fuels: ['LPG'],
    items: [
      'Fill LPG tank',
      'Keep sufficient petrol reserve',
      'Locate LPG stations along the route',
      'Check LPG system operation',
    ],
  },
  {
    title: 'Hybrid',
    fuels: ['Hybrid'],
    items: [
      'Check fuel level',
      'Check hybrid battery status',
      'Check engine fluids',
      'Estimate combined range',
    ],
  },
  {
    title: 'Plug-in Hybrid',
    fuels: ['Plug-in Hybrid'],
    items: [
      'Fully charge battery',
      'Fill fuel tank',
      'Pack charging cable',
      'Plan charging opportunities',
      'Check combined fuel/electric range',
    ],
  },
  {
    title: 'Electric',
    fuels: ['Electric'],
    items: [
      'Charge to appropriate trip level',
      'Check estimated range',
      'Plan fast-charging stops',
      'Verify charging connectors',
      'Pack required charging cables/adapters',
      'Check charger availability along the route',
      'Review expected consumption based on weather',
    ],
  },
];

const USED_CAR: ChecklistSection[] = [
  {
    title: 'Exterior',
    items: [
      'Check body panel alignment',
      'Look for paint color differences',
      'Inspect rust or corrosion',
      'Check windshield for cracks',
      'Inspect headlights and taillights',
      'Check tire wear',
      'Compare tire wear between wheels',
      'Inspect wheels for damage',
    ],
  },
  {
    title: 'Interior',
    items: [
      'Check seat condition',
      'Test windows and locks',
      'Test climate control',
      'Check infotainment system',
      'Test steering wheel controls',
      'Check dashboard warning lights',
      'Inspect for unusual smells or water damage',
    ],
  },
  {
    title: 'Driving',
    items: [
      'Test steering response',
      'Test brakes',
      'Listen for suspension noise',
      'Check vibration at different speeds',
      'Test transmission operation',
      'Check vehicle tracking on a straight road',
    ],
  },
  {
    title: 'Petrol',
    fuels: ['Petrol'],
    items: [
      'Check cold engine start',
      'Look for smoke from exhaust',
      'Check oil condition',
      'Listen for timing/engine noises',
      'Inspect coolant',
    ],
  },
  {
    title: 'Diesel',
    fuels: ['Diesel'],
    items: [
      'Check cold start',
      'Check DPF warnings',
      'Check AdBlue system',
      'Look for excessive exhaust smoke',
      'Listen for injector or turbo noises',
    ],
  },
  {
    title: 'LPG',
    fuels: ['LPG'],
    items: [
      'Verify LPG installation',
      'Check LPG system documentation',
      'Test switching between petrol and LPG',
      'Check LPG tank date/condition',
      'Check for gas smell',
    ],
  },
  {
    title: 'Hybrid',
    fuels: ['Hybrid'],
    items: [
      'Check transition between electric and engine drive',
      'Check hybrid battery warnings',
      'Test regenerative braking',
      'Review battery-related diagnostics if available',
    ],
  },
  {
    title: 'Plug-in Hybrid',
    fuels: ['Plug-in Hybrid'],
    items: [
      'Test charging',
      'Inspect charging port',
      'Check electric-only operation',
      'Check battery range',
      'Test transition between EV and engine modes',
    ],
  },
  {
    title: 'Electric',
    fuels: ['Electric'],
    items: [
      'Check reported battery health',
      'Compare displayed range with expected range',
      'Test AC charging',
      'Test DC fast charging if possible',
      'Inspect charging port',
      'Check battery/drive system warnings',
      'Test regenerative braking',
      'Inspect underside/battery area for damage',
    ],
  },
];

const CATEGORIES: Array<{
  id: ChecklistCategoryId;
  label: string;
  sections: ChecklistSection[];
}> = [
  {id: 'preTrip', label: 'Pre-Trip', sections: PRE_TRIP},
  {id: 'seasonal', label: 'Seasonal', sections: SEASONAL},
  {id: 'longTrip', label: 'Long Trip', sections: LONG_TRIP},
  {id: 'usedCar', label: 'Used Car', sections: USED_CAR},
];

function sectionApplies(section: ChecklistSection, fuel: FuelType) {
  if (!section.fuels) {
    return true;
  }
  return section.fuels.includes(fuel);
}

function buildItems(
  prefix: string,
  categoryId: ChecklistCategoryId,
  sections: ChecklistSection[],
  fuel: FuelType,
  doneCount: number,
) {
  const rows = sections
    .filter(section => sectionApplies(section, fuel))
    .flatMap(section =>
      section.items.map(title => ({
        title,
        section: section.title,
      })),
    );

  return rows.map((row, index) => ({
    id: `${prefix}-${categoryId}-${index}`,
    title: row.title,
    section: row.section,
    done: index < doneCount,
  }));
}

export function createChecklists(
  prefix: string,
  fuel: FuelType,
  done: Partial<Record<ChecklistCategoryId, number>> = {},
): ChecklistCategory[] {
  return CATEGORIES.map(category => ({
    id: category.id,
    label: category.label,
    items: buildItems(
      prefix,
      category.id,
      category.sections,
      fuel,
      done[category.id] ?? 0,
    ),
  }));
}
