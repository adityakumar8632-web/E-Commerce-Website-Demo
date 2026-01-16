const products = {
    // SURVEILLANCE
    "security-camera": {
        id: "security-camera",
        name: "ProView Smart Security Camera",
        tagline: "Ultra-HD monitoring with proactive AI protection.",
        price: "$89.99",
        category: "Surveillance",
        rating: 4.9,
        ratingCount: 520,
        mainImage: "images/camera-main.png",
        thumbnails: ["images/camera-1.png", "images/camera-2.png"],
        description: [
            "Keep a watchful eye on your home with the ProView Smart Camera. Featuring 4K resolution and advanced AI human detection, it alerts you only when it matters.",
            "Equipped with color night vision and two-way audio, you can communicate with visitors or deter intruders directly from your smartphone."
        ],
        features: [
            { icon: "video", title: "4K Resolution", desc: "Crystal clear ultra-high-definition video day and night." },
            { icon: "user-check", title: "AI Detection", desc: "Smart sensors distinguish between people, pets, and vehicles." },
            { icon: "shield-check", title: "Privacy Mode", desc: "Physical privacy shutter for when you are home." }
        ],
        specifications: {
            "Resolution": "3840 x 2160 (4K)",
            "Night Vision": "Color LED up to 30ft",
            "Weatherproof": "IP67 Rated",
            "Connectivity": "Wi-Fi 6 / Ethernet"
        },
        reviews: [
            { user: "JD", name: "John D.", rating: 5, date: "2 days ago", comment: "The AI detection is spot on. No more false alarms from my dog!" }
        ]
    },
    "door-lock": {
        id: "door-lock",
        name: "GuardSafe Smart Door Lock",
        tagline: "Your fingerprint is your key.",
        price: "$199.00",
        category: "Surveillance",
        rating: 4.7,
        ratingCount: 215,
        mainImage: "images/lock-main.png",
        thumbnails: ["images/lock-1.png"],
        description: [
            "Replaces traditional keys with keyless entry via fingerprints, PIN codes, or smartphone apps.",
            "Issue temporary digital keys to guests and receive notifications whenever someone enters or exits."
        ],
        features: [
            { icon: "fingerprint", title: "Biometric Entry", desc: "Unlock in less than 0.3 seconds with 3D sensing." },
            { icon: "key", title: "Virtual Keys", desc: "Send temporary access codes to guests via the app." }
        ],
        specifications: {
            "Material": "Zinc Alloy / Stainless Steel",
            "Battery Life": "12 Months (AA Batteries)",
            "Emergency Power": "USB-C Port Jumpstart"
        },
        reviews: [
            { user: "AM", name: "Alice M.", rating: 5, date: "1 week ago", comment: "I haven't carried a house key in months. Life-changing." }
        ]
    },
    "video-doorbell": {
        id: "video-doorbell",
        name: "DoorSight AI Video Doorbell",
        tagline: "See who's there, from anywhere.",
        price: "$129.00",
        category: "Surveillance",
        rating: 4.8,
        ratingCount: 340,
        mainImage: "images/doorbell-main.png",
        thumbnails: ["images/doorbell-1.png"],
        description: [
            "Acts as your front door's digital eyes with AI package detection and instant alerts.",
            "Communicate with delivery drivers or guests with noise-canceling two-way talk."
        ],
        features: [
            { icon: "package", title: "Package Detect", desc: "Get notified specifically when a parcel is delivered." },
            { icon: "mic-2", title: "Two-Way Talk", desc: "Crystal clear audio for front-door conversations." }
        ],
        specifications: {
            "Aspect Ratio": "1:1 Head-to-Toe View",
            "Chime": "Wireless Chime Included",
            "Power": "Battery or Hardwired"
        },
        reviews: [
            { user: "TB", name: "Tom B.", rating: 5, date: "3 days ago", comment: "The package detection is a lifesaver for deliveries." }
        ]
    },

    // LIGHTING
    "smart-bulbs": {
        id: "smart-bulbs",
        name: "Aura Smart LED Bulb",
        tagline: "16 million colors to match every mood.",
        price: "$24.99",
        category: "Lighting",
        rating: 4.8,
        ratingCount: 342,
        mainImage: "images/bulb-main.png",
        thumbnails: ["images/bulb-1.png"],
        description: [
            "Fully customizable bulbs that offer 16 million colors and adjustable white temperatures.",
            "Sync with music or schedule lights to mimic natural sunlight throughout the day."
        ],
        features: [
            { icon: "palette", title: "Full RGB Spectrum", desc: "16 million colors and tunable white light." },
            { icon: "zap", title: "Energy Savings", desc: "Uses 80% less energy than incandescent bulbs." }
        ],
        specifications: {
            "Brightness": "800 Lumens",
            "Power": "9W (60W Equivalent)",
            "Connectivity": "Wi-Fi 2.4GHz"
        },
        reviews: [
            { user: "SM", name: "Sarah M.", rating: 5, date: "4 days ago", comment: "The colors are incredibly vibrant." }
        ]
    },
    "led-strips": {
        id: "led-strips",
        name: "VividStream LED Strips",
        tagline: "Immersive accent lighting for any space.",
        price: "$49.99",
        category: "Lighting",
        rating: 4.6,
        ratingCount: 180,
        mainImage: "images/strip-main.png",
        thumbnails: ["images/strip-1.png"],
        description: [
            "Flexible light strips perfect for under-cabinets, behind TVs, or along ceilings.",
            "Syncs with your screen content or music for a home theater experience."
        ],
        features: [
            { icon: "music", title: "Audio Sync", desc: "Lights pulse in time with your favorite tracks." },
            { icon: "scissors", title: "Cut-to-Fit", desc: "Adjustable length for any furniture or corner." }
        ],
        specifications: {
            "Length": "5 Meters (Extendable)",
            "LED Type": "Addressable RGBIC",
            "Backing": "3M Industrial Adhesive"
        },
        reviews: [
            { user: "KC", name: "Kevin C.", rating: 5, date: "2 weeks ago", comment: "The music sync mode is a party favorite." }
        ]
    },
    "smart-lamps": {
        id: "smart-lamps",
        name: "GlowDesk Smart Lamp",
        tagline: "Intelligent eye-care desk lighting.",
        price: "$75.00",
        category: "Lighting",
        rating: 4.7,
        ratingCount: 95,
        mainImage: "images/lamp-main.png",
        thumbnails: ["images/lamp-1.png"],
        description: [
            "A sleek tabletop lamp with integrated sensors that adjust brightness based on ambient light.",
            "Includes a built-in wireless charger for your smartphone on the base."
        ],
        features: [
            { icon: "eye", title: "Eye-Care Tech", desc: "Blue light filtering to prevent digital eye strain." },
            { icon: "battery-charging", title: "Qi Charging", desc: "15W wireless charging built into the lamp base." }
        ],
        specifications: {
            "Charging Speed": "15W Wireless",
            "Light Temp": "2700K - 6500K",
            "Material": "Anodized Aluminum"
        },
        reviews: [
            { user: "EL", name: "Eric L.", rating: 4, date: "1 month ago", comment: "The auto-dimming works perfectly for long work sessions." }
        ]
    },

    // KITCHEN
    "smart-coffee-maker": {
        id: "smart-coffee-maker",
        name: "BrewMaster Wi-Fi Coffee Maker",
        tagline: "Schedule your morning aroma.",
        price: "$149.00",
        category: "Kitchen",
        rating: 4.8,
        ratingCount: 280,
        mainImage: "images/coffee-main.png",
        thumbnails: ["images/coffee-1.png"],
        description: [
            "Start your brew from bed using your phone. This 12-cup maker remembers your exact strength preference."
        ],
        features: [
            { icon: "clock", title: "Auto-Brew", desc: "Wake up to fresh coffee with smart scheduling." },
            { icon: "droplets", title: "Strength Control", desc: "Choose from Light, Medium, or Bold profiles." }
        ],
        specifications: {
            "Capacity": "12 Cups",
            "Filter": "Permanent Gold-Tone Mesh",
            "Voice": "Alexa & Google Support"
        },
        reviews: [
            { user: "SH", name: "Sarah H.", rating: 5, date: "1 week ago", comment: "Best smart appliance I own!" }
        ]
    },
    "smart-fridge": {
        id: "smart-fridge",
        name: "EverFresh Smart Refrigerator",
        tagline: "The hub of your intelligent kitchen.",
        price: "$2199.00",
        category: "Kitchen",
        rating: 4.6,
        ratingCount: 89,
        mainImage: "images/fridge-main.png",
        thumbnails: ["images/fridge-1.png"],
        description: [
            "Equipped with internal cameras to check your groceries from the store and a touchscreen for family notes."
        ],
        features: [
            { icon: "camera", title: "Inside View", desc: "See what's inside your fridge from your phone." },
            { icon: "layout", title: "Family Hub", desc: "Sync calendars and photos on the door screen." }
        ],
        specifications: {
            "Volume": "28 Cu. Ft.",
            "Screen": "21-inch LCD Touch",
            "Energy": "Energy Star Certified"
        },
        reviews: [
            { user: "MK", name: "Mike K.", rating: 5, date: "3 weeks ago", comment: "The grocery camera is genuinely useful." }
        ]
    },
    "smart-dishwasher": {
        id: "smart-dishwasher",
        name: "EcoWash Smart Dishwasher",
        tagline: "Silent, efficient, and connected.",
        price: "$699.00",
        category: "Kitchen",
        rating: 4.7,
        ratingCount: 112,
        mainImage: "images/dishwasher-main.png",
        thumbnails: ["images/dish-1.png"],
        description: [
            "A high-performance dishwasher with remote start and AI-driven leak detection sensors."
        ],
        features: [
            { icon: "wind", title: "Auto-Dry", desc: "Door opens slightly at the end to vent steam." },
            { icon: "alert-circle", title: "Leak Detect", desc: "Instant mobile alerts if water is detected outside." }
        ],
        specifications: {
            "Noise Level": "42dB",
            "Capacity": "14 Place Settings",
            "Cycles": "8 Specialty Modes"
        },
        reviews: [
            { user: "LW", name: "Lisa W.", rating: 5, date: "5 days ago", comment: "So quiet I can't even tell it's on." }
        ]
    },
    "chimney-exhaust": {
        id: "chimney-exhaust",
        name: "AeroPure Smart Chimney",
        tagline: "Automated air purification for chefs.",
        price: "$450.00",
        category: "Kitchen",
        rating: 4.5,
        ratingCount: 64,
        mainImage: "images/chimney-main.png",
        thumbnails: ["images/chimney-1.png"],
        description: [
            "Automatically activates when it senses heat or smoke, adjusting suction speed dynamically."
        ],
        features: [
            { icon: "thermometer", title: "Heat Sensing", desc: "Auto-activation when the stove is in use." },
            { icon: "wifi", title: "Gesture Control", desc: "Adjust speed with a hand wave." }
        ],
        specifications: {
            "Suction": "1200 m³/hr",
            "Filter": "Baffle Filter (Easy Clean)",
            "Lighting": "LED Task Lights"
        },
        reviews: [
            { user: "AP", name: "Amit P.", rating: 4, date: "2 months ago", comment: "The gesture control is great when hands are messy." }
        ]
    },

    // HOME AUTOMATION
    "fan-ac-controller": {
        id: "fan-ac-controller",
        name: "ClimateHub AC Controller",
        tagline: "Make any traditional AC smart.",
        price: "$55.00",
        category: "Automation",
        rating: 4.8,
        ratingCount: 140,
        mainImage: "images/climate-main.png",
        thumbnails: ["images/climate-1.png"],
        description: [
            "A universal remote that turns any infrared-controlled fan or AC into a smart device."
        ],
        features: [
            { icon: "thermometer", title: "Auto-Cool", desc: "Turns on AC when room hits a set temp." },
            { icon: "zap", title: "Energy Usage", desc: "Track power consumption in the app." }
        ],
        specifications: {
            "Range": "15 Meters (360°)",
            "Sensors": "Temp & Humidity",
            "Compatibility": "Universal IR Support"
        },
        reviews: [
            { user: "RN", name: "Ryan N.", rating: 5, date: "1 week ago", comment: "My old window AC is now a smart AC!" }
        ]
    },
    "air-purifier": {
        id: "air-purifier",
        name: "PureFlow AI Air Purifier",
        tagline: "Breathe easier with AI filtration.",
        price: "$210.00",
        category: "Automation",
        rating: 4.9,
        ratingCount: 310,
        mainImage: "images/purifier-main.png",
        thumbnails: ["images/purifier-1.png"],
        description: [
            "Monitors AQI in real-time and ramps up filtration automatically for dust or smoke."
        ],
        features: [
            { icon: "wind", title: "HEPA-13", desc: "Captures 99.9% of allergens and fine dust." },
            { icon: "bar-chart-2", title: "AQI Reports", desc: "Detailed air quality stats on your phone." }
        ],
        specifications: {
            "CADR": "400 m³/hr",
            "Coverage": "Up to 500 sq ft",
            "Noise": "Sleep Mode at 22dB"
        },
        reviews: [
            { user: "GW", name: "Grace W.", rating: 5, date: "4 days ago", comment: "Noticeable difference in my allergies." }
        ]
    },
    "robot-cleaner": {
        id: "robot-cleaner",
        name: "MopBot AI Vacuum",
        tagline: "Hands-free cleaning, total precision.",
        price: "$499.00",
        category: "Automation",
        rating: 4.9,
        ratingCount: 156,
        mainImage: "images/vacuum-main.png",
        thumbnails: ["images/vacuum-1.png"],
        description: [
            "A hands-free vacuum and mop that maps your home using LiDAR and avoids obstacles like shoes."
        ],
        features: [
            { icon: "map", title: "LiDAR Mapping", desc: "Creates 3D maps for the most efficient path." },
            { icon: "home", title: "Self-Empty", desc: "Returns to base and empties itself for 60 days." }
        ],
        specifications: {
            "Suction": "5000Pa",
            "Runtime": "180 Minutes",
            "Climbing": "20mm Obstacles"
        },
        reviews: [
            { user: "MD", name: "Mark D.", rating: 5, date: "1 week ago", comment: "It actually avoids my cables!" }
        ]
    }
};