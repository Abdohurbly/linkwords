// ============================================
// LinkWords Puzzle Data
// Each puzzle has 4 groups + a tier (1=easy, 2=medium, 3=hard)
// Difficulty by day: Mon=1, Tue=1, Wed=2, Thu=2, Fri=3, Sat=3, Sun=3
// ============================================

const PUZZLES = [
    // ---- TIER 1: Easy (straightforward categories, less overlap) ----
    {
        tier: 1,
        groups: [
            { name: "Planets", words: ["MARS", "VENUS", "SATURN", "JUPITER"], difficulty: 0 },
            { name: "Chocolate Bars", words: ["BOUNTY", "TWIX", "SNICKERS", "KITKAT"], difficulty: 1 },
            { name: "Card Games", words: ["POKER", "BRIDGE", "SNAP", "HEARTS"], difficulty: 2 },
            { name: "___ King", words: ["LION", "BURGER", "KONG", "DRAG"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Fruits", words: ["MANGO", "LYCHEE", "PAPAYA", "GUAVA"], difficulty: 0 },
            { name: "Musical Instruments", words: ["DRUM", "FLUTE", "HARP", "CELLO"], difficulty: 1 },
            { name: "Greek Letters", words: ["DELTA", "OMEGA", "SIGMA", "ALPHA"], difficulty: 2 },
            { name: "Things With Teeth", words: ["COMB", "SAW", "ZIPPER", "GEAR"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Dog Breeds", words: ["POODLE", "BOXER", "HUSKY", "BEAGLE"], difficulty: 0 },
            { name: "Kitchen Appliances", words: ["BLENDER", "TOASTER", "MIXER", "OVEN"], difficulty: 1 },
            { name: "Dance Styles", words: ["SALSA", "TANGO", "WALTZ", "SWING"], difficulty: 2 },
            { name: "Also a Punch Type", words: ["HOOK", "JAB", "CROSS", "UPPER"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Breakfast Foods", words: ["WAFFLE", "PANCAKE", "OMELET", "BAGEL"], difficulty: 0 },
            { name: "Ocean Creatures", words: ["SQUID", "URCHIN", "CORAL", "STARFISH"], difficulty: 1 },
            { name: "Music Genres", words: ["JAZZ", "BLUES", "PUNK", "SOUL"], difficulty: 2 },
            { name: "Things That Are Pitched", words: ["TENT", "IDEA", "BALL", "VOICE"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Gemstones", words: ["RUBY", "OPAL", "JADE", "PEARL"], difficulty: 0 },
            { name: "Types of Keys", words: ["PIANO", "SKELETON", "CAR", "ANSWER"], difficulty: 1 },
            { name: "Famous Michaels", words: ["JORDAN", "JACKSON", "SCOTT", "PHELPS"], difficulty: 2 },
            { name: "Hidden Trees", words: ["MAPLE", "ASH", "PINE", "BIRCH"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Baby Animals", words: ["KITTEN", "PUPPY", "DUCKLING", "FOAL"], difficulty: 0 },
            { name: "Currencies", words: ["POUND", "FRANC", "CROWN", "MARK"], difficulty: 1 },
            { name: "Things That Tick", words: ["CLOCK", "BOMB", "HEART", "INSECT"], difficulty: 2 },
            { name: "Words After \"Black\"", words: ["BERRY", "SMITH", "BOARD", "BIRD"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Zoo Animals", words: ["GIRAFFE", "PENGUIN", "ZEBRA", "ELEPHANT"], difficulty: 0 },
            { name: "Things That Drip", words: ["FAUCET", "CANDLE", "ICICLE", "PAINT"], difficulty: 1 },
            { name: "Poker Terms", words: ["FOLD", "BLUFF", "RAISE", "FLUSH"], difficulty: 2 },
            { name: "Hidden Colors", words: ["ORANGE", "TAN", "PLUM", "RUST"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Ice Cream Flavors", words: ["VANILLA", "PISTACHIO", "CARAMEL", "MOCHA"], difficulty: 0 },
            { name: "Camping Gear", words: ["TENT", "LANTERN", "COMPASS", "COOLER"], difficulty: 1 },
            { name: "Types of Shot", words: ["FREE THROW", "ESPRESSO", "VACCINE", "HEADSHOT"], difficulty: 2 },
            { name: "Famous Logos", words: ["APPLE", "SHELL", "TARGET", "AMAZON"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Berries", words: ["BLUEBERRY", "RASPBERRY", "CRANBERRY", "STRAWBERRY"], difficulty: 0 },
            { name: "Things With Scales", words: ["FISH", "DRAGON", "JUSTICE", "PIANO"], difficulty: 1 },
            { name: "Textures", words: ["SMOOTH", "ROUGH", "SILKY", "GRAINY"], difficulty: 2 },
            { name: "Words Before \"BOARD\"", words: ["SKATE", "CARD", "KEY", "CUP"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Breakfast Drinks", words: ["COFFEE", "JUICE", "TEA", "MILK"], difficulty: 0 },
            { name: "Things With Layers", words: ["CAKE", "ONION", "LASAGNA", "EARTH"], difficulty: 1 },
            { name: "Golf Terms", words: ["BIRDIE", "BOGEY", "EAGLE", "CADDY"], difficulty: 2 },
            { name: "Hidden Animals", words: ["CROW", "RAM", "ANT", "OWL"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Pasta Types", words: ["SPAGHETTI", "LINGUINE", "RAVIOLI", "MACARONI"], difficulty: 0 },
            { name: "Things You Plug In", words: ["LAMP", "CHARGER", "ROUTER", "IRON"], difficulty: 1 },
            { name: "Emotions", words: ["JOY", "FEAR", "ANGER", "DISGUST"], difficulty: 2 },
            { name: "Words Before \"DAY\"", words: ["BIRTH", "SUN", "PAY", "HOLI"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Vegetables", words: ["BROCCOLI", "SPINACH", "LETTUCE", "CABBAGE"], difficulty: 0 },
            { name: "Toys", words: ["LEGO", "BARBIE", "PUZZLE", "SLINKY"], difficulty: 1 },
            { name: "Types of Ship", words: ["CRUISE", "BATTLE", "FRIEND", "SCHOLAR"], difficulty: 2 },
            { name: "Words After \"SUN\"", words: ["FLOWER", "BURN", "RISE", "SCREEN"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Fairy Tale Characters", words: ["CINDERELLA", "RAPUNZEL", "ALADDIN", "PINOCCHIO"], difficulty: 0 },
            { name: "Tools", words: ["HAMMER", "WRENCH", "PLIERS", "DRILL"], difficulty: 1 },
            { name: "Things That Buzz", words: ["BEE", "PHONE", "RAZOR", "CROWD"], difficulty: 2 },
            { name: "___ Fish", words: ["SWORD", "JELLY", "STAR", "CAT"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Sports With Balls", words: ["TENNIS", "CRICKET", "RUGBY", "HOCKEY"], difficulty: 0 },
            { name: "Furniture", words: ["COUCH", "DRESSER", "SHELF", "STOOL"], difficulty: 1 },
            { name: "Things That Bloom", words: ["ROSE", "TALENT", "ROMANCE", "ALGAE"], difficulty: 2 },
            { name: "Words Before \"LIGHT\"", words: ["SPOT", "DAY", "LIME", "CANDLE"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Countries in Asia", words: ["JAPAN", "KOREA", "THAILAND", "VIETNAM"], difficulty: 0 },
            { name: "Things in a Gym", words: ["TREADMILL", "DUMBBELL", "BENCH", "MAT"], difficulty: 1 },
            { name: "Things That Stick", words: ["GLUE", "TAPE", "VELCRO", "GUM"], difficulty: 2 },
            { name: "Words After \"WATER\"", words: ["FALL", "MELON", "PROOF", "COLOR"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Seafood", words: ["SHRIMP", "LOBSTER", "SALMON", "TUNA"], difficulty: 0 },
            { name: "Board Game Pieces", words: ["DICE", "TOKEN", "CARD", "TIMER"], difficulty: 1 },
            { name: "Things That Roar", words: ["LION", "ENGINE", "THUNDER", "CROWD"], difficulty: 2 },
            { name: "___ Cake", words: ["CUP", "PAN", "CHEESE", "SHORT"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Shapes", words: ["TRIANGLE", "HEXAGON", "OVAL", "DIAMOND"], difficulty: 0 },
            { name: "Cleaning Supplies", words: ["SPONGE", "BROOM", "MOP", "DUSTER"], difficulty: 1 },
            { name: "Things That Click", words: ["MOUSE", "PEN", "CAMERA", "SEAT BELT"], difficulty: 2 },
            { name: "Words Before \"ROOM\"", words: ["BED", "BATH", "CLASS", "SHOW"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Types of Bread", words: ["SOURDOUGH", "RYE", "BAGUETTE", "FOCACCIA"], difficulty: 0 },
            { name: "Things at the Beach", words: ["UMBRELLA", "TOWEL", "SANDCASTLE", "SURFBOARD"], difficulty: 1 },
            { name: "Emotions in Movies", words: ["SADNESS", "ENVY", "ANXIETY", "NOSTALGIA"], difficulty: 2 },
            { name: "Words After \"SNOW\"", words: ["BALL", "FLAKE", "MAN", "STORM"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Planets (Outer)", words: ["NEPTUNE", "URANUS", "PLUTO", "SATURN"], difficulty: 0 },
            { name: "Things in a Backpack", words: ["LAPTOP", "NOTEBOOK", "PENCIL", "CHARGER"], difficulty: 1 },
            { name: "Things That Grow", words: ["TREE", "CHILD", "BUSINESS", "CRYSTAL"], difficulty: 2 },
            { name: "Words Before \"BACK\"", words: ["DRAW", "SET", "FEED", "COME"], difficulty: 3 }
        ]
    },

    {
        tier: 1,
        groups: [
            { name: "Pizza Styles", words: ["MARGHERITA", "PEPPERONI", "HAWAIIAN", "CALZONE"], difficulty: 0 },
            { name: "Things With Wheels", words: ["SKATEBOARD", "SUITCASE", "WAGON", "STROLLER"], difficulty: 1 },
            { name: "Things That Fade", words: ["MEMORY", "JEANS", "TAN", "SUNSET"], difficulty: 2 },
            { name: "Words Before \"STONE\"", words: ["LIME", "KEY", "MILE", "TOMB"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Musical Groups", words: ["BAND", "CHOIR", "ORCHESTRA", "QUARTET"], difficulty: 0 },
            { name: "Things in a Park", words: ["BENCH", "FOUNTAIN", "SWING", "STATUE"], difficulty: 1 },
            { name: "Things That Flash", words: ["LIGHTNING", "CAMERA", "SIREN", "SMILE"], difficulty: 2 },
            { name: "___ Ring", words: ["BOX", "EAR", "SPRING", "WEDDING"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Snack Foods", words: ["POPCORN", "NACHOS", "PRETZELS", "CHIPS"], difficulty: 0 },
            { name: "Things With Straps", words: ["WATCH", "SANDAL", "GUITAR", "BACKPACK"], difficulty: 1 },
            { name: "Things That Beep", words: ["MICROWAVE", "ALARM", "TRUCK", "SCANNER"], difficulty: 2 },
            { name: "Words After \"HAND\"", words: ["WRITING", "RAIL", "CUFF", "STAND"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Tropical Things", words: ["COCONUT", "FLAMINGO", "HAMMOCK", "PINEAPPLE"], difficulty: 0 },
            { name: "Things in a Toolbox", words: ["SCREW", "NAIL", "TAPE", "LEVEL"], difficulty: 1 },
            { name: "Things That Purr", words: ["CAT", "ENGINE", "MACHINE", "BABY"], difficulty: 2 },
            { name: "Words Before \"SHIP\"", words: ["FRIEND", "HARD", "LEADER", "WORK"], difficulty: 3 }
        ]
    },
    {
        tier: 1,
        groups: [
            { name: "Dessert Toppings", words: ["SPRINKLES", "FUDGE", "SYRUP", "CHERRY"], difficulty: 0 },
            { name: "Things With Lids", words: ["JAR", "POT", "TRASH CAN", "EYE"], difficulty: 1 },
            { name: "Things That Hiss", words: ["SNAKE", "STEAM", "CAT", "TIRE"], difficulty: 2 },
            { name: "___ Time", words: ["BED", "HALF", "PRIME", "OVER"], difficulty: 3 }
        ]
    },

    // ---- TIER 2: Medium (more cross-category confusion) ----
    {
        tier: 2,
        groups: [
            { name: "Colors", words: ["CRIMSON", "TEAL", "IVORY", "AMBER"], difficulty: 0 },
            { name: "Things That Spin", words: ["TOP", "WHEEL", "TORNADO", "RECORD"], difficulty: 1 },
            { name: "Email Terms", words: ["SPAM", "DRAFT", "INBOX", "THREAD"], difficulty: 2 },
            { name: "Hidden Body Parts", words: ["ELBOW", "SHIN", "PALM", "CHEST"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Weather", words: ["THUNDER", "HAIL", "SLEET", "FROST"], difficulty: 0 },
            { name: "Board Games", words: ["RISK", "CLUE", "SORRY", "LIFE"], difficulty: 1 },
            { name: "Parts of a Book", words: ["SPINE", "JACKET", "CHAPTER", "INDEX"], difficulty: 2 },
            { name: "Words Before \"Light\"", words: ["FLASH", "MOON", "STAR", "HIGH"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Vegetables", words: ["CARROT", "CELERY", "RADISH", "TURNIP"], difficulty: 0 },
            { name: "Things With Buttons", words: ["SHIRT", "REMOTE", "ELEVATOR", "ARCADE"], difficulty: 1 },
            { name: "Types of Wave", words: ["RADIO", "HEAT", "SOUND", "SHOCK"], difficulty: 2 },
            { name: "Double Letters", words: ["BALLOON", "COFFEE", "PIZZA", "PUPPY"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Olympic Sports", words: ["FENCING", "ROWING", "DIVING", "ARCHERY"], difficulty: 0 },
            { name: "Pasta Shapes", words: ["PENNE", "FUSILLI", "RIGATONI", "ORZO"], difficulty: 1 },
            { name: "Social Media Actions", words: ["SHARE", "FOLLOW", "BLOCK", "TAG"], difficulty: 2 },
            { name: "___ Stone", words: ["ROLLING", "KEY", "MILE", "CORNER"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Herbs", words: ["BASIL", "THYME", "SAGE", "MINT"], difficulty: 0 },
            { name: "Things That Fly", words: ["KITE", "DRONE", "BULLET", "RUMOR"], difficulty: 1 },
            { name: "Movie Genres", words: ["HORROR", "WESTERN", "THRILLER", "NOIR"], difficulty: 2 },
            { name: "Also a Name", words: ["FRANK", "BILL", "GRACE", "MARK"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Citrus Fruits", words: ["LEMON", "LIME", "GRAPEFRUIT", "TANGERINE"], difficulty: 0 },
            { name: "Hairstyles", words: ["MULLET", "PONYTAIL", "BRAIDS", "MOHAWK"], difficulty: 1 },
            { name: "Things in a Wallet", words: ["CASH", "LICENSE", "RECEIPT", "PHOTO"], difficulty: 2 },
            { name: "Words Before \"Work\"", words: ["FRAME", "NET", "FIRE", "HOME"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Pizza Toppings", words: ["OLIVE", "PEPPER", "ONION", "ANCHOVY"], difficulty: 0 },
            { name: "Things With Wings", words: ["AIRPLANE", "ANGEL", "BUTTERFLY", "BUILDING"], difficulty: 1 },
            { name: "Chess Pieces", words: ["ROOK", "BISHOP", "KNIGHT", "PAWN"], difficulty: 2 },
            { name: "___ Ball", words: ["SNOW", "FIRE", "EYE", "BASKET"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Beverages", words: ["LATTE", "SMOOTHIE", "CIDER", "COCOA"], difficulty: 0 },
            { name: "Office Supplies", words: ["STAPLER", "BINDER", "ERASER", "MARKER"], difficulty: 1 },
            { name: "Types of Chart", words: ["BAR", "PIE", "LINE", "SCATTER"], difficulty: 2 },
            { name: "Words After \"FIRE\"", words: ["PLACE", "TRUCK", "WORK", "FLY"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Flowers", words: ["TULIP", "ORCHID", "DAISY", "LILY"], difficulty: 0 },
            { name: "Things That Pop", words: ["BALLOON", "CORN", "BUBBLE", "CHAMPAGNE"], difficulty: 1 },
            { name: "TV Show Formats", words: ["SITCOM", "DRAMA", "REALITY", "GAME SHOW"], difficulty: 2 },
            { name: "Words Before \"HOUSE\"", words: ["WARE", "GREEN", "FIRE", "POWER"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Soup Types", words: ["CHOWDER", "BISQUE", "RAMEN", "GUMBO"], difficulty: 0 },
            { name: "Things That Ring", words: ["BELL", "PHONE", "ALARM", "BOXER"], difficulty: 1 },
            { name: "Art Supplies", words: ["CANVAS", "EASEL", "PALETTE", "CHARCOAL"], difficulty: 2 },
            { name: "Words Before \"POINT\"", words: ["GUN", "CHECK", "VIEW", "POWER"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things at a Concert", words: ["STAGE", "SPEAKER", "CROWD", "TICKET"], difficulty: 0 },
            { name: "Types of Jacket", words: ["LEATHER", "DENIM", "BOMBER", "LIFE"], difficulty: 1 },
            { name: "Things That Crash", words: ["WAVE", "CAR", "COMPUTER", "PARTY"], difficulty: 2 },
            { name: "___ Line", words: ["PUNCH", "DEAD", "BOTTOM", "PICK UP"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Breakfast Cereals", words: ["CHEERIOS", "GRANOLA", "OATMEAL", "MUESLI"], difficulty: 0 },
            { name: "Things With Pedals", words: ["BIKE", "PIANO", "SEWING MACHINE", "GO KART"], difficulty: 1 },
            { name: "Types of Pass", words: ["BOARDING", "MOUNTAIN", "FORWARD", "HALL"], difficulty: 2 },
            { name: "Words After \"HEAD\"", words: ["BAND", "LINE", "PHONES", "QUARTERS"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Carnival Rides", words: ["FERRIS WHEEL", "BUMPER CARS", "CAROUSEL", "ROLLER COASTER"], difficulty: 0 },
            { name: "Things That Leak", words: ["FAUCET", "SECRET", "ROOF", "PEN"], difficulty: 1 },
            { name: "Types of Pool", words: ["SWIMMING", "CAR", "GENE", "DEAD"], difficulty: 2 },
            { name: "Words Before \"FALL\"", words: ["WATER", "DOWN", "RAIN", "NIGHT"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Asian Cuisines", words: ["SUSHI", "PHO", "DIM SUM", "CURRY"], difficulty: 0 },
            { name: "Things That Fold", words: ["PAPER", "CLOTHES", "CHAIR", "HAND"], difficulty: 1 },
            { name: "Types of Drive", words: ["HARD", "TEST", "FUND", "THUMB"], difficulty: 2 },
            { name: "___ Box", words: ["SAND", "MAIL", "JUICE", "TOOL"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things in a Hospital", words: ["GURNEY", "SCALPEL", "NURSE", "MONITOR"], difficulty: 0 },
            { name: "Fabrics", words: ["COTTON", "FLANNEL", "SATIN", "CORDUROY"], difficulty: 1 },
            { name: "Types of Pitch", words: ["SALES", "PERFECT", "ROOFTOP", "CURVE"], difficulty: 2 },
            { name: "Words After \"BREAK\"", words: ["FAST", "THROUGH", "DOWN", "EVEN"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Street Foods", words: ["TACO", "PRETZEL", "KEBAB", "CREPE"], difficulty: 0 },
            { name: "Things That Bloom", words: ["FLOWER", "YOUTH", "LOVE", "MOLD"], difficulty: 1 },
            { name: "Types of Cut", words: ["PAPER", "TAX", "CREW", "SHORT"], difficulty: 2 },
            { name: "Words Before \"OUT\"", words: ["KNOCK", "FALL", "BURN", "CHECK"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Wild Cats", words: ["CHEETAH", "PANTHER", "LEOPARD", "LYNX"], difficulty: 0 },
            { name: "Things With Hooks", words: ["CRANE", "FISHING ROD", "COAT RACK", "PIRATE"], difficulty: 1 },
            { name: "Types of Test", words: ["BLOOD", "STRESS", "CRASH", "LITMUS"], difficulty: 2 },
            { name: "___ Drop", words: ["RAIN", "BACK", "TEAR", "AIR"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Italian Words We Use", words: ["BRAVO", "CIAO", "FIASCO", "GUSTO"], difficulty: 0 },
            { name: "Things That Orbit", words: ["SATELLITE", "MOON", "ELECTRON", "PLANET"], difficulty: 1 },
            { name: "Types of Lock", words: ["PAD", "GRID", "DEAD", "AIR"], difficulty: 2 },
            { name: "Words After \"OVER\"", words: ["TIME", "LOOK", "FLOW", "HAUL"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things at a Picnic", words: ["BLANKET", "BASKET", "SANDWICH", "LEMONADE"], difficulty: 0 },
            { name: "Things That Branch", words: ["TREE", "RIVER", "ROAD", "COMPANY"], difficulty: 1 },
            { name: "Types of Log", words: ["FIRE", "WEB", "CAPTAIN", "BACK"], difficulty: 2 },
            { name: "___ Top", words: ["LAP", "TABLE", "ROOF", "TIP"], difficulty: 3 }
        ]
    },

    {
        tier: 2,
        groups: [
            { name: "Things in a Studio", words: ["EASEL", "TRIPOD", "BACKDROP", "SPOTLIGHT"], difficulty: 0 },
            { name: "Things With Roots", words: ["TREE", "TOOTH", "WORD", "CULTURE"], difficulty: 1 },
            { name: "Types of Wing", words: ["CHICKEN", "HOSPITAL", "AIRPLANE", "BUFFALO"], difficulty: 2 },
            { name: "Words Before \"SHOT\"", words: ["SLAP", "ONE", "SCREEN", "HEAD"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Bakery Items", words: ["CROISSANT", "MUFFIN", "SCONE", "DANISH"], difficulty: 0 },
            { name: "Things That Wobble", words: ["TABLE", "JELLY", "TODDLER", "TOP"], difficulty: 1 },
            { name: "Types of Track", words: ["RACE", "SOUND", "TRAIN", "FAST"], difficulty: 2 },
            { name: "___ Neck", words: ["BOTTLE", "RED", "TURTLE", "CREW"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things at an Airport", words: ["RUNWAY", "TERMINAL", "GATE", "LOUNGE"], difficulty: 0 },
            { name: "Things That Bloom Early", words: ["DAFFODIL", "CROCUS", "TULIP", "CHERRY"], difficulty: 1 },
            { name: "Types of Space", words: ["OUTER", "OFFICE", "PARKING", "PERSONAL"], difficulty: 2 },
            { name: "Words After \"BACK\"", words: ["YARD", "PACK", "LASH", "GROUND"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things in a Garden", words: ["GNOME", "TRELLIS", "HOSE", "WHEELBARROW"], difficulty: 0 },
            { name: "Things That Snap", words: ["TWIG", "FINGERS", "RUBBER BAND", "TEMPER"], difficulty: 1 },
            { name: "Types of Board", words: ["SURF", "DART", "CUTTING", "CIRCUIT"], difficulty: 2 },
            { name: "___ Head", words: ["FIGURE", "DEAD", "BALD", "RED"], difficulty: 3 }
        ]
    },
    {
        tier: 2,
        groups: [
            { name: "Things at a Wedding", words: ["VEIL", "BOUQUET", "TOAST", "AISLE"], difficulty: 0 },
            { name: "Things That Tick", words: ["CLOCK", "BOMB", "CHECKBOX", "INSECT"], difficulty: 1 },
            { name: "Types of Spot", words: ["BLIND", "SWEET", "TROUBLE", "BEAUTY"], difficulty: 2 },
            { name: "Words Before \"WATER\"", words: ["RAIN", "FLOOD", "WHITE", "DISH"], difficulty: 3 }
        ]
    },

    // ---- TIER 3: Hard (tricky overlaps, misdirection, abstract links) ----
    {
        tier: 3,
        groups: [
            { name: "Shoes", words: ["LOAFER", "SANDAL", "SNEAKER", "BOOT"], difficulty: 0 },
            { name: "Things in Space", words: ["COMET", "NEBULA", "QUASAR", "PULSAR"], difficulty: 1 },
            { name: "Computer Parts", words: ["MOUSE", "CHIP", "DRIVER", "BUS"], difficulty: 2 },
            { name: "Types of Run", words: ["HOME", "TRIAL", "BULL", "DRY"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Birds", words: ["ROBIN", "HAWK", "CRANE", "SWIFT"], difficulty: 0 },
            { name: "Things With Handles", words: ["MUG", "DOOR", "SUITCASE", "PAN"], difficulty: 1 },
            { name: "Types of Market", words: ["FLEA", "STOCK", "BLACK", "SUPER"], difficulty: 2 },
            { name: "Also a Verb", words: ["DUCK", "BAT", "BOLT", "TRIP"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Desserts", words: ["BROWNIE", "TIRAMISU", "MOUSSE", "SUNDAE"], difficulty: 0 },
            { name: "Things That Are Round", words: ["GLOBE", "COIN", "PIZZA", "MOON"], difficulty: 1 },
            { name: "Photography Terms", words: ["EXPOSURE", "FLASH", "FRAME", "FILTER"], difficulty: 2 },
            { name: "Double Meanings", words: ["BARK", "MATCH", "SPRING", "DRAFT"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Nuts", words: ["ALMOND", "CASHEW", "WALNUT", "PECAN"], difficulty: 0 },
            { name: "Things That Glow", words: ["EMBER", "NEON", "FIREFLY", "LAVA"], difficulty: 1 },
            { name: "Types of Code", words: ["ZIP", "AREA", "MORSE", "DRESS"], difficulty: 2 },
            { name: "Famous Pairs (One Half)", words: ["ROMEO", "SALT", "BONNIE", "BREAD"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Spices", words: ["CUMIN", "PAPRIKA", "SAFFRON", "TURMERIC"], difficulty: 0 },
            { name: "Things at a Circus", words: ["TRAPEZE", "JUGGLER", "CANNON", "TIGHTROPE"], difficulty: 1 },
            { name: "Video Game Genres", words: ["PLATFORMER", "SHOOTER", "ROGUE", "SANDBOX"], difficulty: 2 },
            { name: "Words That Mean Fast", words: ["SWIFT", "RAPID", "FLEET", "BRISK"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Cheese Types", words: ["BRIE", "GOUDA", "FETA", "CHEDDAR"], difficulty: 0 },
            { name: "Things With Stripes", words: ["ZEBRA", "TIGER", "BARBER POLE", "CANDY CANE"], difficulty: 1 },
            { name: "Ship Parts", words: ["HULL", "MAST", "ANCHOR", "STERN"], difficulty: 2 },
            { name: "___ Way", words: ["HIGH", "RAIL", "STAIR", "GATE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Dances", words: ["RUMBA", "FOXTROT", "CHA-CHA", "SAMBA"], difficulty: 0 },
            { name: "Things That Sting", words: ["BEE", "NETTLE", "JELLYFISH", "COMMENT"], difficulty: 1 },
            { name: "Elements", words: ["NEON", "IRON", "GOLD", "MERCURY"], difficulty: 2 },
            { name: "Also a Planet", words: ["EARTH", "MARS", "PLUTO", "SATURN"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Fabrics", words: ["SILK", "DENIM", "VELVET", "LINEN"], difficulty: 0 },
            { name: "Things That Bounce", words: ["BALL", "CHECK", "TRAMPOLINE", "IDEA"], difficulty: 1 },
            { name: "Film Roles", words: ["LEAD", "EXTRA", "STUNT", "VILLAIN"], difficulty: 2 },
            { name: "Words After \"BACK\"", words: ["FIRE", "BONE", "TRACK", "STAGE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Sandwiches", words: ["CLUB", "WRAP", "PANINI", "HOAGIE"], difficulty: 0 },
            { name: "Things With Strings", words: ["GUITAR", "PUPPET", "KITE", "BOW"], difficulty: 1 },
            { name: "Types of Band", words: ["ROCK", "RUBBER", "WEDDING", "MARCHING"], difficulty: 2 },
            { name: "Words After \"HAND\"", words: ["SHAKE", "BAG", "OUT", "MADE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Hats", words: ["BERET", "FEDORA", "BEANIE", "TURBAN"], difficulty: 0 },
            { name: "Things That Melt", words: ["ICE", "CHEESE", "CANDLE", "HEART"], difficulty: 1 },
            { name: "Magic Words", words: ["PRESTO", "ABRACADABRA", "HOCUS", "VOILA"], difficulty: 2 },
            { name: "___ Man", words: ["SPIDER", "IRON", "BAT", "PAC"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things With Tails", words: ["KITE", "COMET", "COAT", "SHRIMP"], difficulty: 0 },
            { name: "Types of Table", words: ["COFFEE", "POOL", "ROUND", "TIMES"], difficulty: 1 },
            { name: "Words That Mean Money", words: ["BREAD", "DOUGH", "CHEDDAR", "CLAM"], difficulty: 2 },
            { name: "Hidden Countries", words: ["IRAN", "CUBA", "CHILE", "TURKEY"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Crawl", words: ["BABY", "SPIDER", "TRAFFIC", "IVY"], difficulty: 0 },
            { name: "Types of Crown", words: ["ROYAL", "DENTAL", "CLOWN", "TRIPLE"], difficulty: 1 },
            { name: "Music Production", words: ["TRACK", "MIX", "SAMPLE", "DROP"], difficulty: 2 },
            { name: "Words With Silent Letters", words: ["KNIGHT", "PSALM", "GNOME", "WRECK"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Float", words: ["RAFT", "CLOUD", "RUMOR", "STOCK"], difficulty: 0 },
            { name: "Casino Games", words: ["ROULETTE", "CRAPS", "BLACKJACK", "BACCARAT"], difficulty: 1 },
            { name: "Types of Seal", words: ["NAVY", "WAX", "RUBBER", "DEAL"], difficulty: 2 },
            { name: "Words Before \"SHOT\"", words: ["MOON", "LONG", "GUN", "BUCK"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Stretch", words: ["RUBBER", "TRUTH", "BUDGET", "YOGA"], difficulty: 0 },
            { name: "Classical Composers", words: ["BACH", "MOZART", "CHOPIN", "VIVALDI"], difficulty: 1 },
            { name: "Types of Pressure", words: ["PEER", "BLOOD", "AIR", "HIGH"], difficulty: 2 },
            { name: "___ House", words: ["WARE", "DOG", "LIGHT", "WHITE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Sink", words: ["SHIP", "HEART", "SUN", "FEELING"], difficulty: 0 },
            { name: "Martial Arts", words: ["JUDO", "KARATE", "AIKIDO", "KUNG FU"], difficulty: 1 },
            { name: "Types of Plant", words: ["POWER", "FACTORY", "RUBBER", "HOUSE"], difficulty: 2 },
            { name: "Words After \"CROSS\"", words: ["WORD", "FIT", "BOW", "ROAD"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Crack", words: ["EGG", "JOKE", "CODE", "KNUCKLE"], difficulty: 0 },
            { name: "Mythology Figures", words: ["ZEUS", "THOR", "ATHENA", "ANUBIS"], difficulty: 1 },
            { name: "Types of Charge", words: ["BATTERY", "COVER", "DEPTH", "SERVICE"], difficulty: 2 },
            { name: "Words Before \"BERRY\"", words: ["STRAW", "BLUE", "BLACK", "GOOSE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things in a Pocket", words: ["WALLET", "LINT", "CHANGE", "RECEIPT"], difficulty: 0 },
            { name: "Words That Mean Steal", words: ["SWIPE", "PINCH", "NICK", "LIFT"], difficulty: 1 },
            { name: "Types of Bridge", words: ["DENTAL", "DRAW", "LONDON", "CARD"], difficulty: 2 },
            { name: "___ Fly", words: ["BAR", "BUTTER", "MAY", "FIRE"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Bloom Late", words: ["ORCHID", "TALENT", "CAREER", "ROMANCE"], difficulty: 0 },
            { name: "Mythical Creatures", words: ["GRIFFIN", "PHOENIX", "KRAKEN", "CENTAUR"], difficulty: 1 },
            { name: "Types of Spring", words: ["COIL", "WATER", "SEASON", "MATTRESS"], difficulty: 2 },
            { name: "Words After \"NIGHT\"", words: ["MARE", "CLUB", "SHIFT", "FALL"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Spark", words: ["PLUG", "DEBATE", "INTEREST", "FLINT"], difficulty: 0 },
            { name: "Cocktail Ingredients", words: ["BITTERS", "VERMOUTH", "TONIC", "GRENADINE"], difficulty: 1 },
            { name: "Types of Current", words: ["ELECTRIC", "OCEAN", "AIR", "ACCOUNT"], difficulty: 2 },
            { name: "___ Spot", words: ["BLIND", "HOT", "SWEET", "PARKING"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Echo", words: ["CAVE", "CANYON", "HALLWAY", "SENTIMENT"], difficulty: 0 },
            { name: "Famous Duos (One Half)", words: ["THELMA", "BATMAN", "SONNY", "ABBOTT"], difficulty: 1 },
            { name: "Types of Cap", words: ["BOTTLE", "KNEE", "BASE", "ICE"], difficulty: 2 },
            { name: "Words Before \"BREAK\"", words: ["DAY", "JAIL", "ICE", "HEART"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Rust", words: ["IRON", "NAIL", "CHAIN", "TALENT"], difficulty: 0 },
            { name: "Horror Icons", words: ["DRACULA", "FREDDY", "CHUCKY", "PENNYWISE"], difficulty: 1 },
            { name: "Types of Check", words: ["RAIN", "SPELL", "REALITY", "BACKGROUND"], difficulty: 2 },
            { name: "___ Side", words: ["RING", "BED", "DARK", "OUT"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Spread", words: ["BUTTER", "RUMOR", "FIRE", "JAM"], difficulty: 0 },
            { name: "Jazz Legends", words: ["COLTRANE", "ELLINGTON", "DAVIS", "MONK"], difficulty: 1 },
            { name: "Types of Base", words: ["HOME", "DATA", "MILITARY", "ACID"], difficulty: 2 },
            { name: "Words After \"GROUND\"", words: ["WORK", "HOG", "WATER", "BREAKING"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Hang", words: ["CURTAIN", "JURY", "DOUBT", "BAT"], difficulty: 0 },
            { name: "Poker Hands", words: ["FLUSH", "STRAIGHT", "FULL HOUSE", "PAIR"], difficulty: 1 },
            { name: "Types of Field", words: ["MINE", "CORN", "MAGNETIC", "LEFT"], difficulty: 2 },
            { name: "Words Before \"BLOCK\"", words: ["ROAD", "WRITER", "SUN", "CELL"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Swirl", words: ["TORNADO", "CREAM", "CAPE", "DRAIN"], difficulty: 0 },
            { name: "Famous Trios (One Third)", words: ["LARRY", "ATHOS", "SNAP", "ALVIN"], difficulty: 1 },
            { name: "Types of Frame", words: ["PICTURE", "TIME", "DOOR", "BOWLING"], difficulty: 2 },
            { name: "___ Kick", words: ["DROP", "SIDE", "FREE", "PENALTY"], difficulty: 3 }
        ]
    },
    {
        tier: 3,
        groups: [
            { name: "Things That Bloom in Dark", words: ["MUSHROOM", "MOLD", "IDEA", "NIGHTSHADE"], difficulty: 0 },
            { name: "Paradoxes", words: ["CATCH 22", "BOOTSTRAP", "SHIP OF THESEUS", "LIAR"], difficulty: 1 },
            { name: "Types of Bar", words: ["CROW", "MINI", "HANDLE", "CANDY"], difficulty: 2 },
            { name: "Words After \"BLACK\"", words: ["OUT", "MAIL", "LIST", "JACK"], difficulty: 3 }
        ]
    }
];

// ---- Difficulty by day of week ----
// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const DAY_TIER_MAP = {
    1: 1,  // Monday    -> Easy
    2: 1,  // Tuesday   -> Easy
    3: 2,  // Wednesday -> Medium
    4: 2,  // Thursday  -> Medium
    5: 3,  // Friday    -> Hard
    6: 3,  // Saturday  -> Hard
    0: 3   // Sunday    -> Hard
};

const DAY_LABELS = {
    1: "Easy Monday",
    2: "Easy Tuesday",
    3: "Medium Wednesday",
    4: "Medium Thursday",
    5: "Hard Friday",
    6: "Hard Saturday",
    0: "Hard Sunday"
};

// Helper: get puzzles filtered by tier
function getPuzzlesByTier(tier) {
    return PUZZLES.filter(p => p.tier === tier);
}
