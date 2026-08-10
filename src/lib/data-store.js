// Centralized Data Store for Apex Medical Center (مركز القمة الطبي)
// Mirrored with FULL text content and sub-procedure pages from original apexmedicaloman.com HTML pages

export const initialBranches = [
  {
    id: "azaiba",
    nameAr: "فرع العذيبة",
    nameEn: "Al Azaiba Branch",
    cityAr: "مسقط",
    areaAr: "العذيبة",
    addressAr: "مسقط - العذيبة - شارع السلطان قابوس",
    addressEn: "Muscat - Al Azaiba - Sultan Qaboos Street",
    phone: "+968 97031500",
    email: "info@apexmedicaloman.com",
    mapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",
    workingHoursAr: "السبت - الخميس: 09:00 ص - 09:00 م",
    workingHoursEn: "Sat - Thu: 09:00 AM - 09:00 PM",
  },
  {
    id: "amerat",
    nameAr: "فرع العامرات",
    nameEn: "Al Amerat Branch",
    cityAr: "مسقط",
    areaAr: "العامرات",
    addressAr: "مسقط - العامرات - الشارع العام",
    addressEn: "Muscat - Al Amerat - Main Street",
    phone: "+968 97031500",
    email: "amerat@apexmedicaloman.com",
    mapUrl: "https://maps.google.com/?q=Apex+Medical+Center+Amerat+Muscat",
    workingHoursAr: "السبت - الخميس: 09:00 ص - 09:00 م",
    workingHoursEn: "Sat - Thu: 09:00 AM - 09:00 PM",
  },
];

export const initialServices = [
  // 1. Dermatology & Cosmetology
  {
    id: "dermatology-cosmetology",
    branchIds: ["azaiba"],
    titleAr: "طب الأمراض الجلدية والتجميل",
    titleEn: "Dermatology & Cosmetology",
    slug: "dermatology-cosmetology",
    categoryAr: "التجميل والجلدية",
    iconName: "Sparkles",
    image: "/wp-content/uploads/2026/04/laser_New.jpg",
    shortDescriptionAr: "نقدم في مركز القمة الطبي علاجات متطورة للجلدية والتجميل لمساعدتك على تحقيق بشرة صحية ومشرقة.",
    shortDescriptionEn: "Advanced skin and cosmetology treatments to help you achieve healthy, glowing skin.",
    fullParagraphsAr: [
      "في مركز القمة الطبي (Apex Medical Center)، نقدم علاجات متطورة للجلدية والتجميل لمساعدتك على تحقيق بشرة صحية ومشرقة. من علاج حب الشباب والتصبغات إلى حلول مكافحة الشيخوخة والتجاعيد، يقدم خبراؤنا رعاية مخصصة ومصممة خصيصاً لنوع بشرتك وااحتياجاتك الفردية.",
      "سواء كنت تعاني من حب الشباب، التصبغات، الندبات، الشيخوخة المبكرة، أو عدم توحد لون البشرة، يبتكر أخصائيونا خطط علاجية مخصصة لتقديم نتائج آمنة وفعالة، مع التركيز على فهم الاحتياجات الفريدة لبشرتك وتحسين صحتها ومظهرها الجمالي.",
      "تتضمن باقة خدماتنا: علاج حب الشباب وآثاره، علاجات تجديد الشباب ومكافحة الشيخوخة، التقشير الكيميائي، تفتيح النضارة، علاج الندبات، إجراءات الليزر، وبرامج العناية بالبشرة المخصصة. يتم تنفيذ كل إجراء بدقة وعناية فائقة لضمان أعلى درجات الراحة والنتائج الملحوظة."
    ],
    fullParagraphsEn: [
      "We offer advanced skin and cosmetology treatments to help you achieve healthy, glowing skin. From acne and pigmentation to anti-aging solutions, our experts provide personalized care tailored to your skin type and concerns.",
      "Whether you are dealing with acne, pigmentation, scars, premature aging, or uneven skin tone, our specialists create personalized treatment plans to deliver safe and effective results."
    ],
    featuresAr: ["حقن الفيلر والبوتوكس دقيقة النتائج", "جلسات النضارة الهيدرافيدر العميق", "علاج التصبغات والنمش وآثار حب الشباب", "جلسات التقشير الكيميائي ومحفزات الكولاجين"],
    featuresEn: ["Fillers & Botox", "HydraFacial Skin Rejuvenation", "Pigmentation & Acne Scar Treatment", "Chemical Peels & Collagen Boosters"],
  },

  // 2. Plastic Surgery
  {
    id: "plastic-surgery",
    branchIds: ["azaiba"],
    titleAr: "جراحة تجميلية",
    titleEn: "Plastic Surgery",
    slug: "plastic-surgery",
    categoryAr: "الجراحة التجميلية",
    iconName: "UserCheck",
    image: "/wp-content/uploads/2026/04/plastic-surgery.jpg",
    shortDescriptionAr: "يتخصص جراحونا ذوو الخبرة في الإجراءات التجميلية والترميمية، حيث يقدمون نتائج آمنة ودقيقة وطبيعية.",
    shortDescriptionEn: "Our experienced surgeons specialize in both reconstructive and cosmetic procedures, delivering safe and natural-looking results.",
    fullParagraphsAr: [
      "يتخصص جراحونا ذوو الخبرة في مركز القمة الطبي (Apex Medical Center) في الإجراءات الجراحية التجميلية والترميمية، حيث يقدمون نتائج آمنة ودقيقة ذات مظهر طبيعي تعزز الثقة بالنفس والمظهر العام.",
      "نقدم مجموعة واسعة من علاجات الجراحة التجميلية المصممة لتحسين الشكل والوظيفة والجماليات. بدءاً من تحسين الوجه وتنسيق القوام إلى العمليات الترميمية بعد الإصابات أو الحالات الطبية، يتم تخصيص كل خطة علاجية بعناية لتلبية الاحتياجات الفريدة لكل مريض.",
      "تعتبر سلامة المريض وراحته ورضاه في قلب منهجيتنا العلاجية. باستخدام التقنيات الجراحية المتقدمة والتكنولوجيا الطبية الحديثة، يضمن فريقنا إجراء كل عملية بأعلى معايير الرعاية والدقة والاحترافية."
    ],
    fullParagraphsEn: [
      "Our experienced surgeons specialize in both reconstructive and cosmetic procedures, delivering safe, precise, and natural-looking results that enhance confidence and overall appearance.",
      "We offer a wide range of plastic surgery treatments designed to improve form, function, and aesthetics."
    ],
    featuresAr: ["شفط الدهون بالفيزر وتنسيق القوام", "شد البطن والجسم (Tummy Tuck)", "تجميل ونحت الأنف والجفون", "عمليات إعادة تناسق وشد الثدي"],
    featuresEn: ["Vaser Liposuction & Body Contouring", "Tummy Tuck & Body Lift", "Rhinoplasty & Blepharoplasty", "Breast Reshaping & Reconstruction"],
  },

  // 3. Weight Management Main & Sub-procedures
  {
    id: "weight-management",
    branchIds: ["azaiba", "amerat"],
    titleAr: "إدارة الوزن (سمنة)",
    titleEn: "Weight Management",
    slug: "weight-management",
    categoryAr: "جراحات السمنة",
    iconName: "Activity",
    image: "/wp-content/uploads/2026/04/Weight.jpg",
    shortDescriptionAr: "حلول شاملة لحياة أكثر صحة في مركز القمة الطبي لمساعدة المرضى على تحقيق فقدان وزن مستدام.",
    shortDescriptionEn: "Comprehensive solutions for a healthier you at Apex Medical Center for sustainable weight loss.",
    fullParagraphsAr: [
      "في مركز القمة الطبي (Apex Medical Center)، نقدم حلولاً متقدمة ومخصصة لإدارة السمنة والوزن لمساعدة المرضى على تحقيق فقدان وزن مستدام وتحسين صحتهم العامة. يقدم فريقنا متعدد التخصصات علاجات طبية وجراحية مصممة خصيصاً لجسمك ونمط حياتك وأهدافك الصحية.",
      "نركز على إدارة الوزن بشكل آمن وفعال وطويل الأجل تحت إشراف طبي متخصص. وتشمل حلولنا برامج متعددة تناسب مختلف الحالات والدرجات من زيادة الوزن."
    ],
    fullParagraphsEn: [
      "At Apex Medical Center, we provide advanced and personalized weight management solutions to help patients achieve sustainable weight loss and improve their overall health."
    ],
    subProcedures: [
      { slug: "medical-weight-loss-injections", titleAr: "حقن إنقاص الوزن الطبية", titleEn: "Medical Weight Loss Injections" },
      { slug: "gastric-balloon", titleAr: "بالون المعدة", titleEn: "Gastric Balloon" },
      { slug: "gastric-sleeve-surgery", titleAr: "جراحة تكميم المعدة", titleEn: "Gastric Sleeve Surgery" },
      { slug: "gastric-bypass-surgery", titleAr: "جراحة تحويل مسار المعدة", titleEn: "Gastric Bypass Surgery" },
    ],
    featuresAr: ["عمليات تكميم المعدة بالمنظار الدقيق", "تحويل المسار بالمناظير المتطورة", "بالون المعدة بدون جراحة وبدون ألم", "حقن وإبر التخسيس الطبية المعتمدة (مونجارو وأوزمبيك)"],
    featuresEn: ["Laparoscopic Gastric Sleeve", "Laparoscopic Gastric Bypass", "Non-Surgical Gastric Balloon", "Medical Weight Loss Injections"],
  },

  // 3a. Sub: Medical Weight Loss Injections
  {
    id: "medical-weight-loss-injections",
    titleAr: "حقن إنقاص الوزن الطبية",
    titleEn: "Medical Weight Loss Injections",
    slug: "medical-weight-loss-injections",
    categoryAr: "إدارة الوزن",
    iconName: "Activity",
    image: "/wp-content/uploads/2026/06/Weight_Injections.jpg",
    shortDescriptionAr: "دعم متقدم لإنقاص الوزن الفعال تحت إشراف طبي باستخدام أحدث الحقن المعتمدة عالمياً.",
    shortDescriptionEn: "Advanced support for effective weight reduction under expert medical supervision.",
    fullParagraphsAr: [
      "تساعد حقن إنقاص الوزن الطبية الموصوفة طبياً على إدارة الشهية، تقليل الرغبة الشديدة في تناول الطعام، ودعم فقدان الوزن الصحي عند دمجها مع التغذية المناسبة وتغيير نمط الحياة.",
      "تتضمن خيارات إنقاص الوزن الطبية لدينا: Mounjaro® (Tirzepatide) و Ozempic® و Saxenda®، والتي تساعد على تنظيم الشهية ودعم تخفيض الوزن بشكل ملحوظ تحت الإشراف الطبي المباشر واستشارات أخصائي التغذية."
    ],
    fullParagraphsEn: [
      "Prescription weight loss injections can help manage appetite, reduce cravings, and support healthy weight loss when combined with proper nutrition and lifestyle changes.",
      "Our options include Mounjaro® (Tirzepatide), Ozempic®, and Saxenda® to help regulate appetite under direct medical supervision."
    ],
    featuresAr: ["حقن مونجارو المعتمدة (Mounjaro®)", "حقن أوزمبيك وساكسيندا الطبية", "استشارة وتقييم طبي كامل قبل البدء", "برنامج متابعة غذائية دوري مع أخصائي التغذية"],
    featuresEn: ["Mounjaro® Approved Injections", "Ozempic® & Saxenda® Treatments", "Full Medical Evaluation Before Treatment", "Regular Dietary Follow-up"],
  },

  // 3b. Sub: Gastric Balloon
  {
    id: "gastric-balloon",
    titleAr: "بالون المعدة",
    titleEn: "Gastric Balloon",
    slug: "gastric-balloon",
    categoryAr: "إدارة الوزن",
    iconName: "Activity",
    image: "/wp-content/uploads/2026/04/Weight.jpg",
    shortDescriptionAr: "إجراء غير جراحي ومؤقت لتخفيف الوزن ومساعدة المرضى على التحكم في حجم الوجبات.",
    shortDescriptionEn: "A non-surgical, temporary weight loss procedure helping patients control portion sizes.",
    fullParagraphsAr: [
      "بالون المعدة هو خيار غير جراحي مخصص لمساعدة الأشخاص الذين يعانون من زيادة الوزن على إنقاص الوزن دون الحاجة لعمليات جراحية طويلة.",
      "يتم وضع بالون ناعم ومملوء بمحلول معقم داخل المعدة ليشغل مساحة منها، مما يشعر المريض بالشبع السريع ويتيح له اتباع نظام غذائي صحي وتعديل سلوكيات الأكل بسهولة."
    ],
    fullParagraphsEn: [
      "Gastric balloon is a non-surgical option designed to help individuals lose weight without undergoing invasive surgery.",
      "A soft balloon filled with saline solution is placed in the stomach to create a feeling of fullness, allowing easier portion control."
    ],
    featuresAr: ["إجراء غير جراحي بدون فتحات أو جروح", "شعور سريع بالشبع وتصغير الوجبة", "إزالة سهلة بعد انتهاء الفترة العلاجية", "دعم ومتابعة غذائية مستمرة"],
    featuresEn: ["Non-Surgical Procedure", "Rapid Satiety Feeling", "Easy Removal After Treatment", "Continuous Nutrition Support"],
  },

  // 3c. Sub: Gastric Sleeve Surgery
  {
    id: "gastric-sleeve-surgery",
    titleAr: "جراحة تكميم المعدة",
    titleEn: "Gastric Sleeve Surgery",
    slug: "gastric-sleeve-surgery",
    categoryAr: "إدارة الوزن",
    iconName: "Activity",
    image: "/wp-content/uploads/2026/04/Weight.jpg",
    shortDescriptionAr: "جراحة المناظير المتقدمة لتكميم المعدة وتقليل حجمها لتحقيق فقدان وزن دائم.",
    shortDescriptionEn: "Laparoscopic bariatric surgery reducing stomach size for long-term weight loss.",
    fullParagraphsAr: [
      "تعتبر جراحة تكميم المعدة بالمنظار (Gastric Sleeve) من أكثر جراحات السمنة كفاءة ونجاحاً لعلاج السمنة المفرطة.",
      "يتم خلال الجراحة استئصال جزء من المعدة بنسبة 75-80% وتحويلها إلى شكل أنبوبي، مما يقلل بشكل ملحوظ هرمون الجوع (الغريلين) ويساعد على إنقاص الوزن الدائم والصحي."
    ],
    fullParagraphsEn: [
      "Gastric Sleeve Surgery is a laparoscopic procedure that reduces the stomach volume by approximately 75-80%, leading to significant long-term weight reduction."
    ],
    featuresAr: ["تقنية المناظير الدقيقة تقليل الجروح", "انخفاض ملحوظ في هرمون الجوع", "تحسن المشاكل الصحية المرتبطة بالسمنة", "إشراف استشاري جراحة سمنة خبير"],
    featuresEn: ["Minimally Invasive Laparoscopy", "Reduced Hunger Hormone", "Improvement of Obesity Related Conditions", "Expert Bariatric Surgery Team"],
  },

  // 3d. Sub: Gastric Bypass Surgery
  {
    id: "gastric-bypass-surgery",
    titleAr: "جراحة تحويل مسار المعدة",
    titleEn: "Gastric Bypass Surgery",
    slug: "gastric-bypass-surgery",
    categoryAr: "إدارة الوزن",
    iconName: "Activity",
    image: "/wp-content/uploads/2026/06/Gastric-Bypass-Surgery.jpg",
    shortDescriptionAr: "حل جراحي متقدم بالسمنة المفرطة ومرض السكري للحصول على نتائج دائمة.",
    shortDescriptionEn: "Advanced surgical solution for severe obesity and type-2 diabetes management.",
    fullParagraphsAr: [
      "جراحة تحويل مسار المعدة (Gastric Bypass) هي إجراء جراحي مزدوج بالمنظار يقلل من حجم المعدة ويعيد توجيه جزء من الأمعاء الدقيقة لتقليل امتصاص السعرات الحرارية.",
      "تعد هذه الجراحة خياراً رائعاً للمرضى الذين يعانون من السمنة المفرطة المصحوبة بمرض السكري أو ارتداد المريء، حيث تحقق نتائج مذهلة في السيطرة على السكر وفقدان الوزن."
    ],
    fullParagraphsEn: [
      "Gastric Bypass combines reducing stomach size with bypassing a portion of the small intestine to limit calorie absorption.",
      "Highly effective for patients with severe obesity and type-2 diabetes or acid reflux."
    ],
    featuresAr: ["تقليل امتصاص السعرات والسكريات", "نتائج قوية في علاج السكري من النوع الثاني", "جراحة مناظير متقدمة عالية الأمان", "متابعة دورية للفيتامينات والتغذية"],
    featuresEn: ["Reduced Calorie Absorption", "High Success in Type-2 Diabetes Control", "Advanced Laparoscopic Surgery", "Comprehensive Vitamin & Nutrition Follow-up"],
  },

  // 4. Skin Care & Laser Treatments
  {
    id: "skin-care-laser-treatments",
    branchIds: ["azaiba", "amerat"],
    titleAr: "العناية بالبشرة وعلاجات الليزر",
    titleEn: "Skin Care & Laser Treatments",
    slug: "skin-care-laser-treatments",
    categoryAr: "الليزر والبشرة",
    iconName: "Sparkles",
    image: "/wp-content/uploads/2026/04/laser_New.jpg",
    shortDescriptionAr: "باستخدام تكنولوجيا الليزر الحديثة، نوفر علاجات لإزالة الشعر والتصبغات والندبات وتجديد حيوية البشرة.",
    shortDescriptionEn: "Using modern laser technology, we provide treatments for hair removal, pigmentation, scars, and skin rejuvenation.",
    fullParagraphsAr: [
      "باستخدام تكنولوجيا الليزر الحديثة في مركز القمة الطبي (Apex Medical Center)، نوفر علاجات متقدمة لإزالة الشعر، التصبغات، الندبات، وتجديد شباب وحيوية البشرة لضمان نتائج ملحوظة وطويلة الأمد.",
      "تم تصميم حلول العناية بالبشرة المتقدمة لدينا لمعالجة مجموعة متنوعة من المشاكل مثل آثار حب الشباب، الأضرار الناجمة عن الشمس، عدم توحد لون البشرة، الخطوط الدقيقة، والبشرة المجهدة."
    ],
    fullParagraphsEn: [
      "Using modern laser technology, we provide treatments for hair removal, pigmentation, scars, and skin rejuvenation, ensuring visible and long-lasting results."
    ],
    featuresAr: ["إزالة الشعر بالليزر المزدوج لجميع أنواع البشرة", "ليزر الفراكشنال CO2 لعلاج الندبات وآثار الجروح", "تجديد ونضارة الوجه العميقة", "علاج الكلف والتصبغات والنمش"],
    featuresEn: ["Dual Laser Hair Removal for All Skin Types", "Fractional CO2 Laser for Scar Repair", "Deep Facial Rejuvenation", "Pigmentation & Melasma Treatment"],
  },

  // 5. Aesthetic Gynecology
  {
    id: "aesthetic-gynecology",
    branchIds: ["azaiba"],
    titleAr: "طب النساء التجميلي",
    titleEn: "Aesthetic Gynecology",
    slug: "aesthetic-gynecology",
    categoryAr: "التجميل النسائي",
    iconName: "HeartPulse",
    image: "/wp-content/uploads/2026/04/gynec.jpg",
    shortDescriptionAr: "علاجات تخصصية في التجميل النسائي مصممة لتحسين صحة المرأة وراحتها وثقتها بالنفس.",
    shortDescriptionEn: "Specialized aesthetic gynecology treatments designed to improve feminine wellness, comfort, and confidence.",
    fullParagraphsAr: [
      "في مركز القمة الطبي (Apex Medical Center)، نقدم علاجات تخصصية في التجميل النسائي مصممة لتحسين صحة المرأة وراحتها وثقتها بالنفس. تركز خدماتنا على معالجة المخاوف الوظيفية والتجميلية من خلال إجراءات حديثة وآمنة وغير جراحية تقريباً.",
      "نفهم أهمية الخصوصية والحساسية والرعاية المخصصة، مما يضمن شعور كل مريضة بالراحة طوال رحلة العلاج."
    ],
    fullParagraphsEn: [
      "At Apex Medical Center, we provide specialized aesthetic gynecology treatments designed to improve feminine wellness, comfort, and confidence."
    ],
    featuresAr: ["تجديد وشد المنطقة بأحدث أجهزة الليزر النسائي", "علاج سلس البول اللاإرادي البسيط", "جلسات حقن البلازما للتجديد والحيوية", "رعاية وتجميل صحة المرأة بأعلى درجات الخصوصية"],
    featuresEn: ["Laser Feminine Tightening & Rejuvenation", "Urinary Incontinence Non-Surgical Treatment", "PRP Rejuvenation Sessions", "Female Wellness with Total Privacy"],
  },

  // 6. Dentistry Main & Sub-procedures
  {
    id: "cosmetic-dentistry",
    branchIds: ["azaiba"],
    titleAr: "طب الأسنان",
    titleEn: "Dentistry",
    slug: "cosmetic-dentistry-2",
    categoryAr: "طب الأسنان",
    iconName: "Smile",
    image: "/wp-content/uploads/2026/04/Our-Cosmetic-Dentistry-Services.jpg",
    shortDescriptionAr: "ابتسامة هوليود، زراعة الأسنان، تقويم الأسنان الشفاف، وعلاج الجذور الدقيق بأحدث التقنيات الرقمية.",
    shortDescriptionEn: "Hollywood Smile, Cosmetic Dentistry, Orthodontics, Endodontics, and Dental Implants with digital precision.",
    fullParagraphsAr: [
      "يقدم قسم طب وتجميل الأسنان في مركز القمة الطبي (Apex Medical Center) رعاية شاملة للأسنان تجمع بين العلم والجمال والتكنولوجيا الحديثة لضمان حصولك على ابتسامة صحية وجذابة.",
      "فريقنا من أطباء الأسنان المؤهلين تأهيلاً عالياً يمتلك خبرة سريرية واسعة في تصميم الابتسامة الرقمية (Digital Smile Design)، الفينير، تبييض الأسنان بالليزر، تقويم الأسنان الشفاف، علاج العصب تحت المجهر، وزراعة الأسنان بدون ألم."
    ],
    fullParagraphsEn: [
      "Our dental department at Apex Medical Center provides comprehensive dental care combining science, aesthetics, and modern digital technology."
    ],
    subProcedures: [
      { slug: "cosmetic-dentistry-3", titleAr: "طب الأسنان التجميلي", titleEn: "Cosmetic Dentistry" },
      { slug: "elementor-page-5401", titleAr: "تقويم الأسنان", titleEn: "Orthodontics" },
      { slug: "endodontics", titleAr: "علاج عصب وجذور الأسنان", titleEn: "Endodontics" },
      { slug: "dental-implants", titleAr: "زراعة الأسنان", titleEn: "Dental Implants" },
    ],
    featuresAr: ["ابتسامة هوليود وتركيبات الزيركون والفينير", "تقويم الأسنان الشفاف (Clear Aligners)", "سحب وعلاج العصب في جلسة واحدة بدون ألم", "زراعة الأسنان بأحدث التقنيات الرقمية"],
    featuresEn: ["Hollywood Smile, Veneers & Zirconia Crowns", "Clear Aligners & Orthodontics", "Single-Session Microscopic Root Canal", "Painless Advanced Dental Implants"],
  },

  // 6a. Sub: Cosmetic Dentistry
  {
    id: "cosmetic-dentistry-3",
    titleAr: "طب الأسنان التجميلي",
    titleEn: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry-3",
    categoryAr: "طب الأسنان",
    iconName: "Smile",
    image: "/wp-content/uploads/2026/04/COSMETIC.jpg",
    shortDescriptionAr: "علاجات تجميلية متطورة تمنحك ابتسامة طبيعية وجذابة باستخدام الفينير وتبييض الليزر.",
    shortDescriptionEn: "Advanced cosmetic treatments to give you a naturally beautiful smile using veneers and laser whitening.",
    fullParagraphsAr: [
      "تم تصميم علاجات طب الأسنان التجميلي في مركز القمة الطبي لتحسين مظهر أسنانك وإعطائك ابتسامة طبيعية وجذابة تعزز ثقتك بالنفس.",
      "نستخدم أفضل خامات عدسات الأسنان (الفينير واللومينير) وتركيبات الزيركون الرقمية عالية الشفافية، بالإضافة لجلسات تبييض الأسنان بالليزر السريعة والآمنة على اللثة والطبقات السطحية للسن."
    ],
    fullParagraphsEn: [
      "Our cosmetic dentistry treatments are designed to improve the appearance of your teeth and give you a naturally beautiful smile.",
      "We use premium veneers, Digital Smile Design, and safe laser whitening sessions."
    ],
    featuresAr: ["ابتسامة هوليود الرقمية (Digital Smile Design)", "قشور الفينير واللومينير الإيماكس الفاخرة", "تبييض الأسنان بالليزر في 45 دقيقة", "تركيبات الزيركون والبورسلين العالية الصلابة"],
    featuresEn: ["Digital Smile Design (DSD)", "E-max Veneers & Lumineers", "Laser Teeth Whitening in 45 Mins", "High-Durability Zirconia Crowns"],
  },

  // 6b. Sub: Orthodontics
  {
    id: "elementor-page-5401",
    titleAr: "تقويم الأسنان",
    titleEn: "Orthodontics",
    slug: "elementor-page-5401",
    categoryAr: "طب الأسنان",
    iconName: "Smile",
    image: "/wp-content/uploads/2026/06/Orthodontics.jpg",
    shortDescriptionAr: "تصحيح ازدحام الأسنان ومشاكل الإطباق باستخدام التقويم الشفاف الحديث والتقويم المعدني.",
    shortDescriptionEn: "Correcting misaligned teeth and bite issues using clear aligners and modern braces.",
    fullParagraphsAr: [
      "ساعد تقويم الأسنان على تصحيح الأسنان غير المنتظمة، مشاكل الإطباق، والفكين لتحسين وظيفة الفم ومظهره الجمالي.",
      "يقدم أخصائيونا حلولاً حديثة تشمل التقويم الشفاف (Clear Aligners) غير المرئي والتقويم المعدني والكريستالي المناسب لجميع الأعمار من الأطفال والبالغين."
    ],
    fullParagraphsEn: [
      "Orthodontic treatment helps correct misaligned teeth, bite problems, and jaw irregularities.",
      "Our specialists provide modern solutions including clear aligners and aesthetic braces for all ages."
    ],
    featuresAr: ["التقويم الشفاف غير المرئي (Clear Aligners)", "التقويم التجميلي السيراميكي والكريستالي", "تصحيح بروز الفكين ومشاكل العضة", "علاجات تقويمية مخصصة للأطفال والبالغين"],
    featuresEn: ["Clear Invisible Aligners", "Ceramic & Crystal Braces", "Bite Alignment & Jaw Correction", "Pediatric & Adult Orthodontics"],
  },

  // 6c. Sub: Endodontics
  {
    id: "endodontics",
    titleAr: "علاج عصب وجذور الأسنان",
    titleEn: "Endodontics",
    slug: "endodontics",
    categoryAr: "طب الأسنان",
    iconName: "Smile",
    image: "/wp-content/uploads/2026/06/Endodontics.jpg",
    shortDescriptionAr: "علاج التهابات العصب داخل السن وحفظ السن الطبيعي في جلسة واحدة تحت المجهر.",
    shortDescriptionEn: "Single-session root canal treatment under digital microscope preserving your natural tooth.",
    fullParagraphsAr: [
      "يركز قسم علاج عصب وجذور الأسنان على معالجة التهابات العصب والآلام داخل السن مع الحفاظ التام على سنك الطبيعي دون الحاجة للخلع.",
      "باستخدام المجهر الإلكتروني وأجهزة تنظيف القنوات اللبية الحديثة، ينفذ أخصائيونا علاج العصب في جلسة واحدة مريحة وبدون أي ألم."
    ],
    fullParagraphsEn: [
      "Endodontics focuses on treating infections inside the tooth while preserving your natural tooth structure.",
      "Using modern microscopic equipment, we provide gentle, painless, single-session root canal therapy."
    ],
    featuresAr: ["سحب وعلاج العصب في جلسة واحدة", "استخدام المجهر الإلكتروني لدقة التنظيف", "معالجة القنوات اللبية المعقدة والإنحناءات", "حشوات جذور تجميلية ثابتة ودائمة"],
    featuresEn: ["Single-Session Root Canal", "Microscopic Endodontics", "Complex Root Canal Treatment", "Permanent Aesthetic Fillings"],
  },

  // 6d. Sub: Dental Implants
  {
    id: "dental-implants",
    titleAr: "زراعة الأسنان",
    titleEn: "Dental Implants",
    slug: "dental-implants",
    categoryAr: "طب الأسنان",
    iconName: "Smile",
    image: "/wp-content/uploads/2026/06/Dental-Implants.jpg",
    shortDescriptionAr: "أحدث وأفضل حل دائم لاستبدال الأسنان المفقودة واستعادة القدرة على المضغ والابتسام الطبيعي.",
    shortDescriptionEn: "The most advanced permanent solution for replacing missing teeth and restoring natural bite.",
    fullParagraphsAr: [
      "تعتبر زراعة الأسنان الحل الأحدث والأكثر ديمومة لاستبدال الأسنان المفقودة دون التأثير على الأسنان المجاورة.",
      "تعيد الزراعة مظهر الابتسامة الطبيعي، تحسن القدرة على المضغ، وتحافظ على قوة وعظام الفك. يتم إجراء الزراعة بتقنيات موجهة رقمياً لضمان التعافي السريع والأمان العالي."
    ],
    fullParagraphsEn: [
      "Dental implants are the most advanced and natural-looking solution for replacing missing teeth.",
      "They restore your smile, improve chewing ability, and preserve jawbone density with digital accuracy."
    ],
    featuresAr: ["زرعات أسنان سويسرية وألمانية عالية الجودة", "زراعة الأسنان الفورية بدون جراحة مؤلمة", "استبدال سن واحد أو كامل الفك (All-on-4 / All-on-6)", "ضمان المظهر الطبيعي وقوة التثبيت"],
    featuresEn: ["Premium Swiss & German Implants", "Immediate Painless Dental Implants", "Single Tooth or Full Arch Implants", "Natural Aesthetic & Maximum Stability"],
  },

  // 7. Orthopedic Surgery
  {
    id: "orthopedic-surgery",
    branchIds: ["azaiba"],
    titleAr: "جراحة العظام",
    titleEn: "Orthopedic Surgery",
    slug: "orthopedic-surgery",
    categoryAr: "العظام والمفاصل",
    iconName: "Bone",
    image: "/wp-content/uploads/2026/04/orthopedic.jpg",
    shortDescriptionAr: "علاج متقدم لجراحة العظام لتشخيص وعلاج الحالات التي تؤثر على العظام والمفاصل والعضلات والعمود الفقري.",
    shortDescriptionEn: "Advanced orthopedic surgery to diagnose and treat conditions affecting bones, joints, muscles, and spine.",
    fullParagraphsAr: [
      "في مركز القمة الطبي (Apex Medical Center)، نقدم خدمات جراحة العظام المتقدمة لتشخيص وعلاج الحالات التي تؤثر على العظام والمفاصل والعضلات والأربطة والعمود الفقري.",
      "يركز أخصائيو العظام الماهرون لدينا على تخفيف الألم واستعادة الحركة وتحسين جودة الحياة العامة من خلال الرعاية الجراحية الآمنة والفعالة."
    ],
    fullParagraphsEn: [
      "At Apex Medical Center, we offer advanced orthopedic surgery services to diagnose and treat conditions affecting bones, joints, muscles, ligaments, and the spine."
    ],
    featuresAr: ["علاج خشونة واحتكاك المفاصل والركبة", "مناظير الركبة والكتف المتقدمة", "حقن البلازما والخلايا لترميم الغضاريف", "علاج إصابات الملاعب والعمود الفقري"],
    featuresEn: ["Joint Osteoarthritis Treatment", "Knee & Shoulder Arthroscopy", "PRP Joint Cartilage Repair", "Sports Injury & Spine Rehabilitation"],
  },

  // 8. General Medicine (Specialty for Al Amerat Branch)
  {
    id: "general-medicine",
    branchIds: ["amerat"],
    titleAr: "طب عام",
    titleEn: "General Medicine",
    slug: "general-medicine",
    categoryAr: "الطب العام",
    iconName: "HeartPulse",
    image: "/wp-content/uploads/2026/04/orthopedic.jpg",
    shortDescriptionAr: "تقديم الرعاية الصحية الأولية، التشخيص الدقيق، ومتابعة الأمراض العامة بأعلى مستويات الجودة في فرع العامرات.",
    shortDescriptionEn: "Primary healthcare, accurate diagnosis, and general medical care at Al Amerat Branch.",
    fullParagraphsAr: [
      "في فرع العامرات لمركز القمة الطبي (Apex Medical Center)، يوفر قسم الطب العام رعاية صحية أولية متكاملة لجميع الفئات العمرية.",
      "يقدم خبراؤنا الفحوصات الطبية الدورية، تشخيص وعلاج الأمراض الحادة والمزمنة، واستشارات التغذية والوقاية الصحية لمساعدتك على الحفاظ على صحتك وصحة عائلتك.",
      "تم تجهيز عيادة الطب العام بفرع العامرات بأحدث أجهزة الفحص والتشخيص لضمان تقديم خدمة علاجية سريعة ودقيقة وموثوقة."
    ],
    fullParagraphsEn: [
      "At Al Amerat Branch of Apex Medical Center, our General Medicine department provides comprehensive primary care for all age groups.",
      "We offer routine medical checkups, diagnosis and management of acute and chronic conditions, and preventive health consultations."
    ],
    featuresAr: ["استشارات وطب عام لجميع الفئات العمرية", "فحوصات طبية شاملة وتشخيص مبكر", "متابعة الضغط والسكري والأمراض المزمنة", "إرشادات الوقاية والتغذية الطبية"],
    featuresEn: ["General Consultations for All Ages", "Comprehensive Health Checkups", "Chronic Disease Management (Hypertension & Diabetes)", "Preventive Healthcare & Medical Advice"],
  },
];

export const initialDoctors = [
  {
    id: "dr-belal-haj-hamed",
    branchIds: ["azaiba"],
    nameAr: "الدكتور بلال حاج حامد",
    nameEn: "Dr. Belal Haj-Hamed",
    titleAr: "طبيب أسنان تجميلي (حاصل على شهادة دكتوراه في الطب)",
    titleEn: "General & Cosmetic Dentist",
    specialtyId: "cosmetic-dentistry-3",
    specialtyAr: "طب وتجميل الأسنان",
    specialtyEn: "Cosmetic Dentistry",
    image: "/wp-content/uploads/2026/07/Belal-Haj-Hamed-apexmedicaloman.jpg",
    experienceAr: "الدكتور بلال حاج حامد طبيب أسنان ذو خبرة تزيد عن ست سنوات في طب الأسنان العام والتجميلي. وهو حاصل على بكالوريوس جراحة الأسنان (BDS)، ومعتمد من المجلس الأمريكي لطب الأسنان (INBDE)، وأكمل زمالة في ساو باولو، البرازيل. ينصب تركيزه المهني على طب الأسنان التجميلي، مدعوماً بتدريب متقدم وتعليم مستمر. وهو عضو في الجمعية الأمريكية لطب الأسنان، ويتقن الإنجليزية والعربية والإسبانية.",
    experienceEn: "Dr. Belal Haj-Hamed is an experienced dentist with over six years in general and cosmetic dentistry. He holds a Bachelor of Dental Surgery (BDS), is certified by the American Board INBDE, and completed a fellowship in São Paulo, Brazil. His professional focus is cosmetic dentistry, supported by advanced training and continuous education. He is a member of the American Dental Association and is fluent in English, Arabic, and Spanish.",
  },
  {
    id: "dr-hosam",
    branchIds: ["azaiba"],
    nameAr: "الدكتور حسام الدين هابيل",
    nameEn: "Dr. Hosam Al-Din Habel",
    titleAr: "أخصائي طب باطني",
    titleEn: "Internal Medicine Specialist",
    specialtyId: "general-medicine",
    specialtyAr: "الأمراض الباطنية",
    specialtyEn: "Internal Medicine",
    image: "/wp-content/uploads/2026/07/Hosam-Al-Din-Habel-apexmedicaloman.jpg",
    experienceAr: "الدكتور حسام الدين هابيل أخصائي أمراض باطنية بخبرة سريرية تقارب 15 عاماً (10 سنوات بالعمل في المستشفيات الجامعية السورية وآخر 5 سنوات في عيادات مرموقة بسلطنة عمان). قام بإدارة مجموعة واسعة من الأمراض المزمنة تشمل السكري، ضغط الدم، الربو، التهاب القصبات المزمن، والأمراض المفصلية الروماتيزمية. كما عمل لمدة 5 سنوات في وحدات العناية المركزة بمستشفيات دمشق. حاصل على البورد السوري في الطب الباطني كطبيب أخصائي منذ عام 2011. يتقن العربية والإنجليزية ولديه مستوى متوسط في الألمانية.",
    experienceEn: "Dr. Hosam Al-Din Habel is an internal medicine specialist with nearly 15 years of clinical experience (10 years working in Syrian university hospitals and last 5 years in reputable clinics in the Sultanate of Oman). Managed a wide range of chronic conditions including diabetes, hypertension, asthma, chronic bronchitis, and rheumatic joint diseases. Served 5 years in ICU units. Syrian Board certified since 2011.",
  },
  {
    id: "dr-bharti-khanna",
    branchIds: ["azaiba"],
    nameAr: "الدكتورة بهارتي خانا",
    nameEn: "Dr. Bharti Khanna",
    titleAr: "تقويم الأسنان التجميلي",
    titleEn: "Specialist Orthodontist",
    specialtyId: "elementor-page-5401",
    specialtyAr: "تقويم الأسنان",
    specialtyEn: "Orthodontics",
    image: "/wp-content/uploads/2026/07/Dr-Bharti-Khanna_apexmedicaloman.jpg",
    experienceAr: "الدكتورة بهارتي خانا (الحاصلة على الميدالية الذهبية) تمتلك خبرة تزيد عن 13 عاماً كأخصائية تقويم الأسنان. حاصلة على درجة الماجستير في تقويم الأسنان والوجه والفكين من الهند وممارسة معتمدة لتقويم إنفيزالاين (Invisalign) منذ عام 2017. تتخصص في تقويم الأسنان التجميلي باستخدام أحدث التقنيات مع التركيز على الجوانب الهيكلية والوظيفية للعلاج.",
    experienceEn: "Dr. Bharti Khanna (Gold Medalist) comes in with an experience of over 13 years as an orthodontist. She holds a master's degree in Orthodontics and Dentofacial Orthopedics from India and is a certified Invisalign practitioner since 2017. Dr. Bharti specializes in esthetic orthodontics using latest technology in the field with emphasis on structural and functional aspects of treatment.",
  },
  {
    id: "dr-marwa-jbara",
    branchIds: ["azaiba"],
    nameAr: "د. مروة جبارة",
    nameEn: "Dr. Marwa Jbara",
    titleAr: "طبيب أمراض جلدية وأخصائي تجميل",
    titleEn: "Dermatologist & Aesthetic Medicine Practitioner",
    specialtyId: "dermatology-cosmetology",
    specialtyAr: "الجلدية والتجميل",
    specialtyEn: "Dermatology & Cosmetology",
    image: "/wp-content/uploads/2026/07/Marwa-jbara-apexmedicaloman.jpg",
    experienceAr: "ممارسة في الأمراض الجلدية والطب التجميلي بخبرة سريرية تزيد عن 10 سنوات، تقدم إجراءات تجميلية متقدمة تشمل البوتوكس، الفيلر الجلدي، تجديد البشرة وتحفيز الكولاجين، خيوط شد الوجه، الإدارة الشاملة لتساقط الشعر، والأمراض الجلدية الطبية. حاصلة على درجة دكتور في الطب (MD) من جامعة دمشق والبورد السوري في الأمراض الجلدية والطب التجميلي. تتحدث العربية والإنجليزية.",
    experienceEn: "A Dermatology and Aesthetic Medicine practitioner with more than 10 years of clinical experience, offering advanced aesthetic procedures including Botox, dermal fillers, skin rejuvenation and collagen biostimulation treatments, facial thread lifting, comprehensive hair loss management, and medical dermatology. MD degree from Damascus University & Syrian Board Certified.",
  },
  {
    id: "dr-anil-dalal",
    branchIds: ["azaiba"],
    nameAr: "الدكتور أنيل دلال",
    nameEn: "Dr. Anil Dalal",
    titleAr: "أخصائي علاج جذور الأسنان",
    titleEn: "Specialist Endodontist",
    specialtyId: "endodontics",
    specialtyAr: "علاج عصب الأسنان",
    specialtyEn: "Endodontics",
    image: "/wp-content/uploads/2026/07/Specialist-Endodontist-Anil-Dalal-apexmedicaloman.jpg",
    experienceAr: "الدكتور أنيل دلال أخصائي علاج عصب وجذور الأسنان (مرخص من وزارة الصحة العمانية MOH Oman) بخبرة 13 عاماً في المستشفيات المرموقة في عمان. حاصل على الماجستير في علاج العصب وطب الأسنان الترميمي. متميز في علاج عصب الأسنان بدون ألم لجميع الأسنان بالحالات البسيطة والمعقدة. يمتلك خبرة في التاج والجسور وخلع الأسنان. يتقن الإنجليزية والهندية ولديه معرفة باللغة العربية. عضو الجمعية الهندية لعلاج الجذور.",
    experienceEn: "Dr. Anil Dalal is an experienced specialist Endodontist (MOH Oman) with 13 years of experience in reputed hospitals in Oman. He holds Masters in Endodontics and Restorative dentistry. He is skilled in pain free root canals of all the teeth both simple as well as complex ones. Experienced in crowns, bridges and extractions. Member of Indian Endodontic Society.",
  },
  {
    id: "dr-zainab-al-mamari",
    branchIds: ["azaiba"],
    nameAr: "الدكتورة زينب المعمرية",
    nameEn: "Dr. Zainab Al Mamari",
    titleAr: "طبيبة أسنان عامة",
    titleEn: "General Dentist",
    specialtyId: "cosmetic-dentistry-3",
    specialtyAr: "طب الأسنان العام",
    specialtyEn: "General Dentistry",
    image: "/wp-content/uploads/2026/07/NO-IMAGE.jpg",
    experienceAr: "الدكتورة زينب المعمرية طبيبة أسنان عامة تمتلك ست سنوات من الخبرة في تقديم العلاجات السنية الشاملة. تتضمن خبرتها السريرية العناية الروتينية بالأسنان وطب أسنان الأطفال، مع تركيز قوي على راحة المريض والرعاية الوقائية. حاصلة على بكالوريوس جراحة الأسنان (BDS) وتتحدث العربية والإنجليزية بطلاقة.",
    experienceEn: "Dr. Zainab Al Mamari is a general dentist with six years of experience in providing comprehensive dental treatments. Her clinical expertise includes routine dental care and pediatric dentistry, with a strong emphasis on patient comfort and preventive care. Holds a BDS degree and speaks Arabic and English fluently.",
  },
  {
    id: "dr-thura-hatem",
    branchIds: ["azaiba"],
    nameAr: "د. ثريا حاتم محمود القيزي",
    nameEn: "Dr. Thura Hatem Mahmood Alquaizi",
    titleAr: "طب الأسنان التجميلي والتحفظي",
    titleEn: "Dentist – Specialist Esthetic & Conservative Dentistry MSc",
    specialtyId: "cosmetic-dentistry-3",
    specialtyAr: "تجميل وترميم الأسنان",
    specialtyEn: "Esthetic Dentistry",
    image: "/wp-content/uploads/2026/07/Thura-Hatem-Mahmood-Alquaizi-apexmedicaloman.jpg",
    experienceAr: "طبيبة أسنان حاصلة على درجة الماجستير في تجميل وترميم الأسنان من جامعة سابينزا في روما إيطاليا ودبلوم علاج العصب من الأكاديمية البريطانية. تمارس حالياً في مسقط مع التركيز على الترميم، الفينير التجميلي، وعلاج قنوات الجذور. شغوفة بطب الأسنان التدخلي الأدنى وخلق ابتسامات طبيعية وواثقة. الخبرة السريرية: 17 عاماً. المؤهلات: ماجستير تجميل وترميم الأسنان (جامعة سابينزا روما إيطاليا)، دبلوم علاج الجذور (أكاديمية بيرد البريطانية UK)، بكالوريوس جراحة الأسنان (جامعة بغداد العراق). عضو نقابة أطباء الأسنان العراقيين وطبيبة مرخصة من وزارة الصحة العمانية.",
    experienceEn: "Dentist with a Master's degree in Esthetic and Conservative Dentistry from Sapienza University of Rome Italy and a Diploma in Endodontics from the British Academy. 17 years of clinical experience. BDS from University of Baghdad. Licensed by MOH Oman. Member of Iraqi Dental Association.",
  },
  {
    id: "alaa-laser-tech",
    branchIds: ["azaiba"],
    nameAr: "آلاء",
    nameEn: "Alaa",
    titleAr: "فني ليزر",
    titleEn: "Licensed Laser Technician",
    specialtyId: "skin-care-laser-treatments",
    specialtyAr: "الليزر والعناية بالبشرة",
    specialtyEn: "Laser & Skincare",
    image: "/wp-content/uploads/2026/07/Alaa-apexmedicaloman.jpg",
    experienceAr: "فنية ليزر مرخصة تمتلك خبرة واسعة في العناية بالبشرة والعلاجات الطبية بالليزر. تمتلك مهارات متقدمة في تقييم الحالات وتقديم العلاجات التجميلية غير الجراحية وتشغيل أجهزة الليزر وفق أعلى معايير الأمان والجودة. الخبرة السريرية: 8 سنوات. المؤهلات العلمية: دبلوم التمريض (أكاديمية أوكسفورد للاستشارات والدراسات التخصصية)، شهادة تقنية (أكاديمية فاي - النمسا Phi Academy)، فنية ليزر (مستشفى العيون وجراحة التجميل، مرخصة من وزارة الصحة العمانية).",
    experienceEn: "Licensed laser technician with 8 years of extensive experience in skincare and medical laser treatments. Advanced skills in case assessment, non-surgical cosmetic treatments, and operating laser devices according to highest safety standards. Diploma of Nursing (Oxford Academy), Technical Certificate (Phi Academy, Austria), MOH Oman Licensed.",
  },
  {
    id: "aliaa-aldara-facial-tech",
    branchIds: ["azaiba"],
    nameAr: "علياء الدار",
    nameEn: "Aliaa Aldara",
    titleAr: "فني فيشل وعناية بالبشرة",
    titleEn: "Facial Technician",
    specialtyId: "skin-care-laser-treatments",
    specialtyAr: "الفيشل والعناية بالبشرة والوجه",
    specialtyEn: "Facial & Skincare",
    image: "/wp-content/uploads/2026/07/Aliaa-Aldara-apexmedicaloman.jpg",
    experienceAr: "أخصائية وفنية الفيشل والعناية بالبشرة والوجه بمركز القمة الطبي (Facial Technician). متخصصة في العناية بالبشرة وتنظيف الوجه وجلسات الفيشل المتطورة.",
    experienceEn: "Facial Technician at Apex Medical Center. Specialized in advanced facial skincare treatments and deep skin cleansing.",
  },
  {
    id: "arij-laser-tech",
    branchIds: ["azaiba"],
    nameAr: "أريج",
    nameEn: "Arij",
    titleAr: "فني ليزر",
    titleEn: "Laser Technician",
    specialtyId: "skin-care-laser-treatments",
    specialtyAr: "الليزر والعناية بالبشرة",
    specialtyEn: "Laser & Skincare",
    image: "/wp-content/uploads/2026/07/Laser-Technician-apexmedicaloman.jpg",
    experienceAr: "أخصائية وفنية ليزر مرخصة بمركز القمة الطبي (Laser Technician). متخصصة في تقديم جلسات إزالة الشعر بالليزر والعناية بالبشرة.",
    experienceEn: "Licensed Laser Technician at Apex Medical Center specializing in medical laser hair removal and skincare treatments.",
  },
];

export const initialAppointments = [
  {
    id: "APT-1001",
    patientName: "أحمد بن سالم المعمري",
    phone: "+968 97031500",
    email: "ahmed.m@gmail.com",
    doctorName: "د. حسام الدين هابيل",
    specialty: "طب وتجميل الأسنان",
    date: "2026-08-10",
    time: "10:30 AM",
    status: "مؤكد",
    notes: "استشارة لابتسامة هوليود والتركيبات",
    createdAt: "2026-08-07T14:20:00Z",
  },
];
