import type { Localized } from "./i18n/language-context";

export interface Project {
  id: string;
  title: string;
  shortDescription: Localized;
  fullDescription: Localized;
  technologies: string[];
  videoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  githubMobileUrl?: string;
  liveUrl?: string;
  images?: string[];
  year: string;
  // Documentation download files
  docs?: {
    label: Localized;
    filename: string; // relative to /documentations/ in public/
    icon?: "pdf" | "docx" | "zip" | "apk";
  }[];
}

export const projects: Project[] = [
  {
    id: "mobilis",
    title: "Mobilis",
    shortDescription: {
      en: "Personalized fitness & nutrition platform that analyzes body composition and personal metrics using scientific algorithms to deliver workout recommendations, meal plans, and real-time 3D posture correction via depth camera",
      bg: "Персонализирана платформа, която анализира телесния състав и личните показатели чрез различни научно обосновани алгоритми, за да предложи тренировъчни препоръки, хранителни режими и корекция на стойката в реално време с 3D камера"
    },
    fullDescription: {
      en: `**Mobilis** is a comprehensive health platform that analyzes **characteristics of the users' body condition** - **BMI** (Body Mass Index), **body composition** (ratio of body fat to muscle mass via the U.S. Navy method), **BMR** (Basal Metabolic Rate, calculated using the Mifflin-St Jeor formula separately for each gender), and **TDEE** (Total Daily Energy Expenditure, derived by multiplying BMR by the user's activity level multiplier) - combined with **personal metrics** (height, gender, age, weight, activity level, neck/waist/hip measurements) to determine **optimal daily calorie and macronutrient targets**. These feed into a **goal selection algorithm** that assigns the most appropriate fitness goal based on whether the user requires a calorie deficit or a calorie surplus - ranging across **Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Aesthetic, Strength, and Maintenance** - each paired with a caloric adjustment relative to TDEE. A distinctive feature of the platform is the **corrective exercise program aimed at improving postural health**, which uses the **Orbbec Astra+ 3D camera** and specialized algorithms for real-time tracking and analysis of body movements and poses.

**Core features:**
- **Goal selection algorithm:** Critical health states always take highest priority - critically low BMI (moderate/severe undernutrition) or dangerously low body fat (below 2% for men, below 10% for women) unconditionally triggers **Dirty Bulk**; Obesity Class II/III triggers **Aggressive Cut**; Obesity Class I BMI or obese BF% triggers **Cut**. Outside critical cases, the recommendation is determined by the interaction of BMI and BF% categories - mildly underweight BMI maps to **Lean Bulk**, normal BMI with elevated or average BF% maps to **Recomposition**, while normal BMI with fitness or athlete-level BF% maps to **Maintenance**. For pre-obese BMI, athlete or fitness-level BF% (where body weight is elevated due to muscle mass rather than excess fat) maps to **Maintenance**
>**Note:** Users retain full freedom **not to follow the recommended goal** and **adjust macronutrient ratios** based on individual needs, preferences, and health conditions, with medical or nutritional consultation advised for cases involving illness, pregnancy, or other health-related factors
- **Macronutrient distribution:** the daily calorie target is broken down into **carbohydrates**, **protein** (1g = 4 kcal each) and **fat** (1g = 9 kcal) according to a macro ratio assigned to each goal (e.g. calories for **Cut - 40% protein / 25% fat / 35% carbs**). The protein range sometimes deliberately exceeds the base recommendations of **WHO/EFSA** to **support muscle synthesis, satiety, immune function, and recovery**, which is especially important for active individuals. Each goal also applies a **specific caloric offset (deficit or surplus) from TDEE**. **CDC** and **NHS** guidance support safe rates of **~0.5–1 kg/week loss** or **~0.25–0.5 kg/week gain**
- **Weight prognosis:** Estimates when the user will reach their target weight via **\`Weekly change = caloric offset × 7 ÷ 7700 kcal/kg\`** and **\`Weeks needed = |target weight − current weight| ÷ weekly change\`**. The prognosis also considers the **user-specified training days** (minimum 2/week) as an additional factor, making projections closer to real-world outcomes. Expected and actual progress are displayed side by side - a prognosis panel showing weekly milestones, and a live weight/BMI diagram updated from daily measurements. Remaining weeks update dynamically
- **3D real-time posture correction** using the **Orbbec Astra+ depth camera** with **Nuitrack SDK** and **PyNuitrack** (initialized via \`py_nuitrack.Nuitrack()\` in nuitrack_runner.py, connected over USB 3.0 with a licensed Nuitrack Runtime). A **voice assistant** (OpenAI TTS, gpt-4o-mini-tts) dictates exercise instructions step by step. The 7-exercise corrective program was developed **in consultation with kinesiotherapy specialists** to address contemporary postural issues - forward head posture is addressed via **Chin Tucks** and **Neck Side Tilts**; rounded shoulders via **Shoulder Blade Squeezes**, **Wall Angels**, and **Standing T Stretch**; pelvic and lumbar instability via **Standing Pelvic Tilts** and **Standing Lumbar Extensions**. All exercises are equipment-free and performed standing
- **Calibration and posture/angle checking algorithm:** Before starting the posture correction exercises, the system performs a 5-second scan (\`calibration.py\`) while the user stands still, computing height, arm length, shoulder/hip width, and leg length, then determining **body-proportional tolerances** (\`calculate_tolerances()\`) as percentages of the relevant body segment rather than fixed millimeter values. All pose checks are then performed relative to the **torso as origin** (0, 0, 0) via \`normalize_skeleton()\`, using the torso as the reference point for all joint coordinates. **This normalization keeps tracking consistent** even when the user shifts left or right or changes distance from the camera. \`check_relative_pose()\` handles two check types: **pose checks** (arm/leg/shoulder/spine/pelvis/head positions via joint coordinates) and **angle checks** using **vector algebra** (e.g. arm elevation via wrist-to-shoulder vector relative to the downward Y axis; knee angle via the angle between the thigh–knee and knee–ankle vectors; elbow angles via the angle between the shoulder–elbow and wrist–elbow vectors). **Angle checks also apply tolerances** (±degree tolerance bands), since requiring exact angles would make exercises impractical due to small movements, tremor or tracking noise
>After all of the checks are applied, **\`Overall accuracy\`** is calculated as **\`total points (points from poses + points from angles) ÷ total checks\`**, where pose checks award 100 pts each and angle checks award 0-100 pts: **\`max(0, 100 × (1 – diff / (2 × angle_tolerance)))\`**, where **diff** is the absolute deviation from the target angle; the smaller the deviation, the higher the score. A step completes only when **accuracy exceeds 80%** and is **held for the full required duration** without interruption - the timer resets on any violation
>The system simultaneously works in two coordinate systems: **Nuitrack's 3D space (X/Y/Z)** and **OpenCV's 2D screen space**, converted via perspective projection (\`project_world_to_screen()\`), where larger Z values reduce X and Y scaling and shift the projection of the skeletal joints toward the center. This conversion is required to map 3D skeletal data onto a flat camera image so joints, angles, and visual guides **remain correctly aligned** with the user's body **at different distances**. The transformation follows **\`screen_x = world_x × fx / world_z + cx\`** and **\`screen_y = –world_y × fy / world_z + cy\`**, with fx and fy defining scale and cx and cy centering the image. There is a distance positioning bar guiding users to **the optimal 2.5–3.0 m range** from the camera

**Development notes:**
- **The body-proportional calibration tolerance system** was a critical aspect of the system design. Using **fixed distance thresholds** for all users would produce **inconsistent results** because body dimensions vary significantly between individuals (for example, a **20 cm pose deviation, using the wrist-to-shoulder distance** may be acceptable for a **190 cm person** but indicate incorrect execution for a **160 cm person**). To address this, the system converts **absolute joint distances (in mm)** into **percentages relative to each user's body segment lengths**, allowing posture assessment to remain **accurate across users with different body proportions**
- **JWT + HMAC/SHA-256 authentication** via **Supabase Auth**, with three distinct client types across the Next.js architecture: **Browser Client** (client-side actions, annon key, auto-attaches JWT), **Server Client** (server-side actions, reads JWT from cookies), and **Service Role Client** (admin operations, service role key, server-side only)
- **Nearly 180 unit tests** (made with Vitest) across health, measurements, nutritional profiling, recommended goal, cookies, and save functions
- **Trello**-managed task distribution and **GitHub branching strategy** (main, dev, per-feature branches) throughout development`,
      bg: `**Mobilis** е интегрирана здравна платформа, която анализира **характеристиките на телесното състояние на потребителите** - **BMI** (индекс на телесна маса), **телесен състав** (съотношение между телесни мазнини и мускулна маса по U.S. Navy метода), **BMR** (базов метаболизъм, изчислен по формулата на Mifflin-St Jeor поотделно за всеки пол) и **TDEE** (общ дневен енергиен разход, получен чрез умножаване на BMR по коефициент за нивото на активност на потребителя) - съчетани с **лични показатели** (височина, пол, възраст, тегло, ниво на активност, обиколка на врат/талия/таз) за определяне на **оптимални дневни цели за калории и макронутриенти**. Тези данни захранват **алгоритъм за избор на цел**, който определя най-подходящата фитнес цел в зависимост от това дали потребителят се нуждае от калориен дефицит или излишък - **Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Aesthetic, Strength и Maintenance** - всяка с калорийно отклонение спрямо TDEE. Отличителна черта на платформата е **програмата от упражнения за подобряване на стойката**, която използва **3D камерата Orbbec Astra+** и специализирани алгоритми за следене и анализ на движенията и позите на тялото в реално време.

**Основни функции:**
- **Алгоритъм за избор на цел:** Критичните здравословни състояния винаги имат най-висок приоритет - критично нисък BMI (умерено/тежко недохранване) или опасно нисък процент телесни мазнини (под 2% за мъже, под 10% за жени) безусловно задават **Dirty Bulk**; Затлъстяване Клас II/III задава **Aggressive Cut**; Затлъстяване Клас I (BMI) или висок процент телесни мазнини задават **Cut**. Извън критичните случаи препоръката се определя от съчетанието между категориите на BMI и процент телесни мазнини - леко поднормено тегло води до **Lean Bulk**, нормален BMI с повишен или среден процент телесни мазнини води до **Recomposition**, докато нормален BMI с процент телесни мазнини в категориите \`атлетичен\` или \`фитнес\` води до **Maintenance**. При BMI категорията \`предзатлъстяване\`, както и категориите \`атлетичен\` или \`фитнес\` процент телесни мазнини (където повишеното тегло идва от мускулна маса, а не от излишни мазнини) също води до **Maintenance**
>**Забележка:** Потребителите имат пълна свобода да **не следват препоръчаната цел** и да **коригират съотношението на макронутриентите** според индивидуалните си нужди, предпочитания и здравословно състояние, като се препоръчва медицинска или диетологична консултация при заболяване, бременност или други здравословни фактори
- **Разпределение на макронутриентите:** дневната калорийна цел се разделя на **въглехидрати**, **протеин** (1 г = 4 kcal) и **мазнини** (1 г = 9 kcal) според съотношение, зададено за всяка цел (напр. при **Cut - 40% протеин / 25% мазнини / 35% въглехидрати**). Диапазонът за протеин понякога умишлено надхвърля базовите препоръки на **СЗО/EFSA** с цел **подпомагане на мускулния синтез, ситостта, имунната функция и възстановяването**, което е особено важно за активните хора. Всяка цел прилага и **конкретно калорийно отклонение (дефицит или излишък) спрямо TDEE**. Указанията на **CDC** и **NHS** подкрепят безопасни темпове от **~0,5–1 кг/седмица отслабване** или **~0,25–0,5 кг/седмица покачване**
- **Прогноза за тегло:** Изчислява кога потребителят ще достигне целевото си тегло чрез **\`Седмична промяна = калорийно отклонение × 7 ÷ 7700 kcal/кг\`** и **\`Необходими седмици = |целево тегло − текущо тегло| ÷ седмична промяна\`**. Прогнозата отчита и **зададените от потребителя тренировъчни дни** (минимум 2/седмица) като допълнителен фактор, доближавайки прогнозите до реалните резултати. Очакваният и реалният прогрес се показват едновременно - панел с прогноза, показващ седмични етапи, и диаграма на тегло/BMI, обновявана от дневните измервания. Оставащите седмици се обновяват динамично
- **3D корекция на стойката в реално време** чрез камерата **Orbbec Astra+**, както и **Nuitrack SDK** и **PyNuitrack** (инициализирани чрез \`py_nuitrack.Nuitrack()\` в nuitrack_runner.py, свързани през USB 3.0 с лицензиран Nuitrack Runtime). **Гласов асистент** (OpenAI TTS, gpt-4o-mini-tts) озвучава инструкциите за всяко упражнение поетапно. Корективната програма от 7 упражнения е разработена като са направени **консултации със специалисти в областта на кинезитерапията**. Тя е насочена към съвременни проблеми със стойката - изнесената напред глава се коригира чрез **Chin Tucks** и **Neck Side Tilts**; заоблените рамене - чрез **Shoulder Blade Squeezes**, **Wall Angels** и **Standing T Stretch**; нестабилността на таза и кръста - чрез **Standing Pelvic Tilts** и **Standing Lumbar Extensions**. Всички упражнения се изпълняват в изправено положение и без оборудване
- **Алгоритъм за калибриране и проверка на позата/ъглите:** Преди да започнат упражненията за корекция на стойката, системата извършва 5-секундно сканиране (\`calibration.py\`), докато потребителят стои неподвижно, изчислявайки височина, дължина на ръката, ширина на рамене/таз и дължина на крака, след което определя **пропорционални на тялото толеранси** (\`calculate_tolerances()\`) като процент от съответния телесен сегмент, вместо фиксирани стойности в милиметри. Всички проверки на позата след това се извършват спрямо **торса като начална точка** (0, 0, 0) чрез \`normalize_skeleton()\`, използвайки го също и като референтна точка за координатите на всички стави. **Тази нормализация запазва точността на следенето**, дори когато потребителят се отмести встрани или промени разстоянието си от камерата. \`check_relative_pose()\` обработва два вида проверки: **проверки на позата** (позиции на ръце/крака/рамене/гръбнак/таз/глава чрез координатите на ставите) и **проверки на ъгли** чрез **векторна алгебра** (напр. повдигане на ръката чрез вектора китка-рамо спрямо насочената надолу Y ос; ъгъл на коляното чрез ъгъла между векторите бедро-колянo и коляно-глезен; ъгли на лакътя чрез ъгъла между векторите рамо-лакът и китка-лакът). **Проверките на ъгли също прилагат толеранси** (±градусови граници), тъй като изискването на точни ъгли би направило упражненията непрактични поради дребни движения, треперене или шум при следенето
>След прилагане на всички проверки, **\`Общата точност\`** се изчислява като **\`общ брой точки (точки от позите + точки от ъглите) ÷ общ брой проверки\`**, където успешните проверки на позата дават по 100 точки, а проверките на ъгли - 0-100 точки: **\`max(0, 100 × (1 – разлика / (2 × ъглов_толеранс)))\`**, където **разлика** е абсолютното отклонение от целевия ъгъл; колкото по-малко е отклонението, толкова по-висок е резултатът. Една стъпка се счита за завършена само когато **точността надхвърля 80%** и се **задържи за цялата изисквана продължителност** без прекъсване - таймерът се нулира при всяко нарушение
>Системата работи едновременно в две координатни системи: **3D пространството на Nuitrack (X/Y/Z)** и **2D екранното пространство на OpenCV**, преобразувани чрез перспективна проекция (\`project_world_to_screen()\`), при която по-големите стойности на Z намаляват мащабирането по X и Y и изместват проекцията на скелетните стави към центъра. Това преобразуване е необходимо, за да се отразяват 3D данните на скелета върху плоско изображение от камерата, така че ставите, ъглите и визуалните насоки да **останат правилно подравнени** с тялото на потребителя **на различни разстояния**. Трансформацията следва **\`screen_x = world_x × fx / world_z + cx\`** и **\`screen_y = –world_y × fy / world_z + cy\`**, където fx и fy задават мащаба, а cx и cy центрират изображението. Съществува лента за позициониране на правилното разстояние от камерата, която насочва потребителите към **оптималния обхват от 2,5–3,0 м**

**Бележки от разработката:**
- **Системата за толеранси, пропорционални на тялото при калибриране**, беше критичен аспект на дизайна на цялостната система. Използването на **фиксирани прагове на разстояние** за всички потребители би довело до **противоречиви резултати**, защото телесните размери варират значително между отделните хора (например **20 см отклонение от поза, използваща разстоянието китка-рамо** може да е приемливо за човек с ръст **190 см**, но да се свързва с неправилно изпълнение при човек с ръст **160 см**). За да се реши това, системата преобразува **абсолютните разстояния между стави (в мм)** в **процент спрямо дължините на телесните сегменти на конкретния потребител**, което позволява оценката на стойката да остане **точна при потребители с различни телесни пропорции**
- **JWT + HMAC/SHA-256 автентикация** чрез **Supabase Auth**, с три отделни типа клиенти в архитектурата на Next.js: **Browser Client** (клиентски действия, anon key, автоматично прикача JWT), **Server Client** (сървърни действия, чете JWT от бисквитки) и **Service Role Client** (административни операции, service role key, само на сървъра)
- **Близо 180 unit теста** (направени с Vitest), обхващащи функции за здравословни показатели, измервания, хранителен профил, препоръчителна цел, бисквитки и запазване на данни
- Разпределение на задачите чрез **Trello** и **GitHub branching стратегия** (main, dev, клонове по функционалност) през целия процес на разработка`
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Supabase",
      "PostgreSQL",
      "OpenAI API",
      "YouTube API",
      "Nuitrack SDK",
      "OpenCV",
      "Tkinter",
      "PyNuitrack",
      "Tailwind CSS",
      "shadcn/ui",
      "Vitest"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/Mobilis",
    liveUrl: "https://mobilis.noit.eu/",
    docs: [
      {
        label: { en: "Documentation", bg: "Документация" },
        filename: "mobilis_documentation.docx",
        icon: "docx"
      }
    ],
    year: "2026"
  },
  {
    id: "mindreel",
    title: "MindReel",
    shortDescription: {
      en: "Recommendation platform that analyzes live EEG brainwave signals and user preferences in order to understand psycho-emotional state, stress levels and cognitive performance, then suggests the most suitable movies, TV series, books, and songs",
      bg: "Платформа за препоръки, която анализира мозъчни вълни, както и предпочитанията на потребителя, за да определи психо-емоционалното му състояние, нивото на стрес и когнитивните показатели, на база на които да предлага най-подходящите филми, сериали, книги и песни"
    },
    fullDescription: {
      en: `**MindReel** is a comprehensive platform that integrates **live EEG bioelectric brain activity analysis** (via **NeuroSky MindWave Mobile 2** headset) with **AI-suggested content recommendations** tailored to the user's real-time emotional and cognitive state, as well as their personal preferences - where the AI itself is continuously subjected to accuracy and reliability evaluation through Machine Learning metrics adapted to the specific needs and logic of the platform, measuring **Precision, Recall, F1 Score, Accuracy, Specificity, FPR, and FNR** with a relevance algorithm, using the user's own preferences. The project was developed in consultation with **qualified neurologists and specialists in that field** to validate its **science-based approach** to brainwave interpretation.
 
**Core features:**
- **Real-time EEG analysis:** Live brainwave data streamed via **Bluetooth → ThinkGear Connector → PyMindWave2 → Socket.IO → Node.js API → React app**, classified into five frequency bands using **Power Spectral Density (PSD)**. Detailed explanations for each frequency band are available in the image gallery for this project. The system also captures **Attention** and **Meditation** scores (0–100) extracted by NeuroSky's proprietary algorithms. After the 1-minute session, all data is passed to the AI to determine **recommendations that help correct the current state**
- **AI recommendations** for movies, TV series, books, and songs, generated via **OpenAI API** (and **Gemini API** in earlier versions) using heavily engineered prompts. Model access is managed through **LangChain**, which provides a unified way to interact with different LLMs and enables structured, comparable testing across models. After extensive benchmarking - testing **Claude 3 Opus**, **Gemini 1.5 Pro**, and the OpenAI family - **GPT-4o** proved to be the most reliable for movies and series, **GPT-4-Turbo** for books, **GPT-4.1** for songs, and **GPT-5-mini** for brain analysis
- **Custom relevance algorithm** that determines whether a recommendation is relevant to certain user preferences across six criteria: **preferred genres, content type, user's mood, available time, release year range, and target audience**. A score above **5 points** is deemed relevant
- **ML evaluation metrics** that determine recommendation quality: **Precision**, **Recall / TPR**, **F1 Score**, **Accuracy**, **Specificity / TNR**, **FPR**, and **FNR**. A separate **per-generation Precision** is also calculated for the last 5 registered recommendations for the user
- **VR cinema experience** built with **A-Frame** (Three.js + WebGL) and tested with **Oculus / Meta Quest 2** headset. The scene recreates a real cinema hall with projectors, a popcorn machine, and a large screen, where users can watch movie or TV series trailers in order to decide whether the content interests them before committing to watch it
- **Content data pipelines:** a **custom Python + BeautifulSoup scraper** targeting **Goodreads** with **Google Books API** for the books; songs merging **Spotify API** (rich metadata) with **YouTube API** (view counts, likes, comments, direct video links); for the movies and series, the data is drawn from **OMDb API**
 
**Development notes:**
- Parts of the functions in the **PyMindWave2** library, related to the NeuroSky device for retrieving EEG data, were incompatible with the project's requirements and had to be rewritten from scratch
- The VR cinema faced a core blocker: **A-Frame cannot render \`<iframe>\` elements**, making **YouTube embeds impossible**. An attempt was made to work around this by creating an \`<iframe>\` dynamically in the DOM outside the A-Frame scene and positioning it to visually overlap with the 3D environment - but this also failed. Since the **YouTube API only provides video IDs for use in a link** (rather than a direct streaming option), downloading the trailers as MP4s was the only applicable path. The first attempt was via the **yt-dlp-wrap** wrapper and the Python version of **yt-dlp** - but running it on shared hosting was not possible (no sudo access, Python v3.6.8 only - which **does not support the library**). The final solution was making **yt-dlp run inside a containerized service on Google Cloud Run**, downloading trailers and storing them in **Google Cloud Storage (GCS)**, accessed via public GCS URLs (e.g. \`<video src="https://storage.googleapis.com/BUCKET/video.mp4" />\`). The other major problem with the VR scene was that A-Frame's built-in hand controllers weren't appearing in the scene, so they required a separate **custom fix**, since the described solution for this situation in the official documentation did not produce the expected result. Not only that, but the example that was visualized in the embed box, intended to demonstrate a working implementation, also did not work
- **Goodreads** - the most comprehensive book database - **shut down its public API in 2020**. After trying every available alternative, the scraper approach was selected due to the rich and comprehensive data for the books, including **Bulgarian books, even older titles**. It extracts a large hidden JSON object embedded in a \`<script>\` tag on Goodreads pages, containing complete book metadata, including fields not visible on the page itself
- The **Spotify API** frequently lacked data for older or less-popular tracks, which is why **YouTube API** was added as a complementary source. Early on, the AI regularly **hallucinated fictional songs** that existed on neither platform. Мaking extensive prompt modifications and testing across different preference combinations solved the problem
- **JWT + HMAC/SHA-256 authentication**, **Trello**-managed task distribution throughout the development period, as well as **86 unit tests** across user, recommendation, preference, statistics, and metrics functions`,
      bg: `**MindReel** е интегрирана платформа, която съчетава **ЕЕГ анализ на биоелектрическата активност на мозъка в реално време** (чрез устройството **NeuroSky MindWave Mobile 2**) с **препоръки за съдържание, генерирани от изкуствен интелект**, съобразени с текущото емоционално и когнитивно състояние на потребителя, както и с личните му предпочитания. Самият модел на ИИ се подлага на постоянна оценка на точността и надеждността чрез Machine Learning метрики, адаптирани към специфичните нужди и логика на платформата, измервайки **Precision, Recall, F1 Score, Accuracy, Specificity, FPR и FNR** с помощта на алгоритъм за релевантност, използващ собствените предпочитания на потребителя. Проектът е разработен като са направени консултации с **квалифицирани невролози и специалисти в тази област**, за да се потвърди **научната обоснованост** на подхода с мозъчните вълни.
 
**Основни функции:**
- **ЕЕГ анализ в реално време:** Мозъчните вълни се предават чрез **Bluetooth → ThinkGear Connector → PyMindWave2 → Socket.IO → Node.js API → React приложение**, класифицирани в пет честотни диапазона чрез **спектрална плътност на мощността (PSD)**. Подробни обяснения за всеки честотен диапазон са достъпни в галерията с изображения за този проект. Системата също измерва и стойностите на **Attention** и **Meditation** (0–100), извлечени чрез патентованите алгоритми на NeuroSky. След 1-минутната сесия всички данни се подават на изкуствения интелект за определяне на **препоръки за коригиране на състоянието**
- **AI препоръки** за филми, сериали, книги и песни, генерирани чрез **OpenAI API** (и **Gemini API** в по-ранни версии), използващи прецизно формулирани промптове. Достъпът до моделите се управлява чрез **LangChain**, който осигурява унифициран начин за работа с различни езикови модели и позволява структурирано, сравнимо тестване между моделите. След задълбочено тестване на **Claude 3 Opus**, **Gemini 1.5 Pro** и моделите на OpenAI - **GPT-4o** се оказа най-надежден за филми и сериали, **GPT-4-Turbo** за книги, **GPT-4.1** за песни, а **GPT-5-mini** за анализа на мозъчната активност
- **Алгоритъм за релевантност**, който определя дали дадена препоръка отговаря на определени предпочитания на потребителя по шест критерия: **предпочитани жанрове, тип съдържание (филм или сериал), настроение на потребителя, налично време за гледане, година на издаване и целева аудитория**. Резултат над **5 точки** се счита за релевантен
- **ML метрики за оценка**, които определят качеството на препоръките: **Precision**, **Recall / TPR**, **F1 Score**, **Accuracy**, **Specificity / TNR**, **FPR** и **FNR**. Изчислява се и **Precision за последното генериране** на последните 5 регистрирани препоръки за потребителя
- **VR кино изживяване**, изградено с **A-Frame** (Three.js + WebGL) и тествано с **Oculus / Meta Quest 2**. Сцената пресъздава истинска кино зала с прожектори, машина за пуканки и голям екран, където потребителите могат да гледат трейлъри на филми или сериали, за да преценят дали съдържанието им допада, преди да се ангажират да го гледат
- **Обработка на данни:** **Python + BeautifulSoup scraper**, насочен към **Goodreads**, заедно с **Google Books API** за книгите; за песните се комбинират **Spotify API** (богати метаданни) с **YouTube API** (брой гледания, харесвания, коментари, директни линкове към видео); за филмите и сериалите данните се извличат от **OMDb API**
 
**Бележки от разработката:**
- Части от функциите в библиотеката **PyMindWave2**, свързани с устройството NeuroSky за извличане на ЕЕГ данни, бяха несъвместими с нуждите на проекта и трябваше да бъдат пренаписани от нулата
- VR кино залата се сблъска със сериозна пречка: **A-Frame не може да визуализира \`<iframe>\` елементи**, което прави **вграждането на YouTube видеа невъзможно**. Беше направен опит за заобикаляне на проблема чрез динамично създаване на \`<iframe>\` в DOM-а извън A-Frame сцената и позиционирането му така, че визуално да се припокрива с 3D средата - но и това не сработи. Тъй като **YouTube API предоставя само ID-та на видea, които да се използват в линк** (а не опция за директен стрийминг), изтеглянето на трейлърите като MP4 файлове беше единственият приложим вариант. Първият опит беше чрез **yt-dlp-wrap** и Python версията на **yt-dlp** - но изпълнението на кода на shared хостинг не беше възможно (няма sudo достъп, поддръжка само на Python v3.6.8, който **не поддържа библиотеката**). Крайното решение беше **yt-dlp да се изпълнява в контейнеризирана услуга в Google Cloud Run**, изтегляйки трейлърите и съхранявайки ги в **Google Cloud Storage (GCS)**, достъпни чрез публични GCS URL-и (напр. \`<video src="https://storage.googleapis.com/BUCKET/video.mp4" />\`). Другият основен проблем с VR сцената беше, че вградените контролери за ръце на A-Frame не се появяваха в сцената. Това наложи съставянето на **персонализирано решение**, тъй като описаното решение в официалната документация на този проблем не даде очакваните резултати. Освен това, примерът, визуализиран във вградения демонстрационен прозорец, който трябваше да показва работещо изпълнение, също не работеше
- Достъпът до API-то на **Goodreads** - най-богатата база данни за книги - **е спрян през 2020 г.** След опити да се намери подходяща алтернатива, беше избран подходът със scraper заради богатите и подробни данни за книгите, включително **по-стари български произведения**. Той извлича голям скрит JSON обект, вграден в \`<script>\` таг на страниците на Goodreads, съдържащ пълни метаданни за книгата, както и полета, които не се виждат на самата страница
- **Spotify API** често нямаше данни за по-стари или по-малко популярни песни, заради което беше добавен **YouTube API** като допълнителен източник. В началото изкуственият интелект редовно **измисляше несъществуващи песни**, които не съществуваха в нито една от двете платформи. Този проблем беше решен чрез обширни промени на промптовете и тестване с различни комбинации от предпочитания
- **JWT + HMAC/SHA-256 автентикация**, разпределение на задачите чрез **Trello** през целия период на разработка, както и **86 unit теста**, обхващащи функции за потребители, препоръки, предпочитания, статистики и метрики`
    },
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "Vite",
      "Node.js",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "shadcn/ui",
      "Docker",
      "Jest",
      "Socket.IO",
      "ThinkGear Connector",
      "PyMindWave2",
      "Beautiful Soup",
      "LangChain",
      "OpenAI API",
      "Gemini API",
      "OMDb API",
      "Goodreads",
      "Google Books API",
      "YouTube API",
      "Spotify API",
      "Google Custom Search JSON API",
      "A-Frame",
      "Three.js",
      "ApexCharts"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/MindReel",
    liveUrl: "https://mindreel.noit.eu",
    docs: [
      {
        label: { en: "Documentation", bg: "Документация" },
        filename: "mindreel_documentation.docx",
        icon: "docx"
      },
      {
        label: { en: "All Schemes & Photos", bg: "Всички схеми и снимки" },
        filename: "schemes_and_photos.zip",
        icon: "zip"
      }
    ],
    year: "2025"
  },
  {
    id: "nutrifit",
    title: "NutriFit",
    shortDescription: {
      en: "A modern platform that takes advantage of the capabilities of GPT & Gemini to actively support users in maintaining their optimal weight and healthy lifestyle",
      bg: "Модерна платформа, която използва възможностите на GPT и Gemini, за да подпомага активно потребителите в поддържането на оптималното им тегло и здравословен начин на живот"
    },
    fullDescription: {
      en: `**NutriFit** is an integrated web and mobile nutrition platform focused entirely on **AI-driven meal planning**. This is the project that later led to the idea for **Mobilis**, where the concept expanded to include physical activity. NutriFit's core idea is to make **two AI models generate a truly personalized, nutritionally accurate meal plan**, measure how far they deviate from the user's defined limits, and compare their performance against each other.
 
**Note:** Ongoing **model upgrades** (due to **deprecation of older models**) have introduced occasional **inconsistencies** in meal naming and food image matching

**Core features:**
- **Meal generation:** full daily menus with breakfast, lunch (starter + main + dessert), and dinner - each with exact macros, ingredients, and recipes. Food images are fetched via **Google Custom Search JSON API** with custom-configured Search Engines
- **AI deviation algorithm:** measures how closely **OpenAI** and **Gemini** adhere to user-defined nutritional limits - tracking average deviation %, max deviation per category (calories, protein, fat, carbs), and overall AI deviation score
- **Weight regulation algorithm:** compares current vs ideal weight for the user's height and recommends whether to reduce, maintain, or gain weight, with guidance on diet and activity adjustments
- **Nearly 40 interactive statistics** and Chart.js diagrams: BMI, body fat %, lean body mass, fat body mass, daily macro intake over time, platform-wide aggregated user data, and a **head-to-head AI comparison panel** on the home page
- **Weight Calculator page:** shows BMI range, ideal vs current weight, body fat %, lean mass, fat mass - all with day-over-day progress tracking
- **User measurement flow:** height, weight, age, waist/hip/neck are entered once per 24h. The data is persisted via cookie if the user opts in, and the values from the previous log-in are pre-filled via localStorage
- **NutriFit API** (Node.js/Express + Firebase Admin SDK): requests are proxied through the server, reducing per-page-load traffic to a single daily batch, regardless of whether the user stays on the page. Data remains safely stored in Firestore in all cases
- **Food ranking system** across 4 dedicated pages: sorted by calories, fat, carbs, and protein per 100g, with recipes, preparation steps, and nutritional values
- **React Native mobile app** (separate codebase) mirroring core web features
 
**Development notes:**
- One of the hardest problems was **prompt engineering:** early project builds that used GPT-3.5 were giving recommendations of objects and activities instead of food in the meal plans. Upgrading to **GPT-4 Turbo** and rewriting the entire prompt from scratch was the breakthrough. Currently, the project uses **GPT 5.2** and **Gemini 3.5 Flash**
- Gemini is accessed via **Vertex AI (Google Cloud)** because the Gemini API was unavailable in Bulgaria during project development
- After a month of debugging, the **Firebase client SDK** was found to be failing to reliably deliver data at scale; switching to the **Firebase Admin SDK** via the Node.js backend resolved it entirely
- Meal generation went through **two rejected APIs** (Spoonacular, then Edamam) before landing on AI - limited recipe variety and inability to represent Bulgarian cuisine were the dealbreakers
- **Unit tests included** and **GitHub branching strategy** (main, dev, per-feature branches)`,
      bg: `**NutriFit** е интегрирана уеб и мобилна платформа, изцяло фокусирана върху **планиране на храненията чрез изкуствен интелект**. Това е проектът, който по-късно даде началото на идеята за **Mobilis**, където концепцията се разширява, като се включва физическа активност. Основната идея на NutriFit е да накара **два AI модела да генерират наистина персонализиран и точен хранителен план, от гледна точка на хранителната стойност**, да измерва доколко се отклоняват от зададените от потребителя граници и да сравнява тяхното представяне.
 
**Забележка:** Текущите **актуализации на моделите** (поради **прекратяване на поддръжката на по-стари версии**) понякога водят до **несъответствия** в наименованията на ястията и представящите ги изображения

**Основни функции:**
- **Генериране на хранения:** пълни дневни менюта със закуска, обяд (предястие + основно + десерт) и вечеря - всяко с точни макроси, съставки и рецепти. Изображенията на храните се извличат чрез **Google Custom Search JSON API** с персонализирани търсещи машини
- **Алгоритъм за AI отклонение:** измерва доколко точно **OpenAI** и **Gemini** се придържат към зададените от потребителя хранителни лимити - следи средно отклонение в %, максимално отклонение по категория (калории, протеин, мазнини, въглехидрати) и обща оценка за отклонение на изкуствения интелект
- **Алгоритъм за регулиране на тегло:** сравнява текущото с идеалното тегло за височината на потребителя и препоръчва дали да намали, запази или увеличи теглото си, с насоки за хранителен режим и активност
- **Близо 40 интерактивни статистики** и диаграми с Chart.js: BMI, процент телесни мазнини, чиста телесна маса, мастна телесна маса, дневен прием на макроси във времето, обобщени данни за цялата платформа и **панел за пряко сравнение между AI моделите** на началната страница
- **Страница „Калкулатор на тегло“:** показва диапазон на BMI, идеално спрямо текущо тегло, процент телесни мазнини, чиста маса, мастна маса - всичко това със следене на прогреса ден за ден
- **Процес на въвеждане на измерванията на потребителя:** височина, тегло, възраст, обиколка на талия/таз/врат се въвеждат веднъж на 24 часа. Запазват се чрез бисквитка при съгласие на потребителя, а стойностите от последното влизане в платформата се попълват автоматично чрез localStorage
- **NutriFit API** (Node.js/Express + Firebase Admin SDK): заявките се пренасочват през сървъра, като потокът от заявки при всяко зареждане на страница се свежда до едно групирано извикване на ден, независимо дали потребителят остава на страницата. Данните се съхраняват сигурно във Firestore във всички случаи
- **Система за класифициране на храни** в 4 отделни страници: сортирани по калории, мазнини, въглехидрати и протеин на 100 г, с рецепти, начин на приготвяне и хранителни стойности
- **Мобилно приложение с React Native** (отделен код), отразяващо основните уеб функции
 
**Бележки от разработката:**
- Един от най-трудните проблеми беше **съставянето на промптовете:** ранните версии на проекта, използващи GPT-3.5, даваха препоръки за предмети и дейности, вместо храна в хранителните режими. Преходът към **GPT-4 Turbo** и пренаписването на целия промпт от нулата бяха решаващата стъпка. В момента проектът използва **GPT 5.2** и **Gemini 3.5 Flash**
- Достъпът до Gemini се осъществява чрез **Vertex AI (Google Cloud)**, защото Gemini API не беше достъпен в България по времето на разработката на проекта
- След месец отстраняване на грешки се установи, че **Firebase client SDK** не успява надеждно да доставя данни в по-голям мащаб - преминаването към **Firebase Admin SDK** през Node.js бекенда напълно реши проблема
- Концепцията около генерирането на хранения премина през **два отхвърлени API достъпа** (първо Spoonacular, после Edamam), преди да се стигне до изкуствен интелект - ограниченото разнообразие от рецепти и невъзможността да представят българската кухня бяха решаващите причини
- **Включени unit тестове** и **GitHub branching стратегия** (main, dev, клонове по функционалност)`
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Firebase",
      "React Native",
      "Android Studio",
      "Chart.js",
      "OpenAI API",
      "Vertex AI (Gemini)",
      "Google Custom Search JSON API",
      "Fitness Calculator API",
      "Chakra UI",
      "react-spring",
      "Galio"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/NutriFit",
    githubMobileUrl: "https://github.com/LackOfUsernameIdeas/NutriFitMobile",
    liveUrl: "https://nutri.noit.eu",
    docs: [
      {
        label: { en: "Documentation", bg: "Документация" },
        filename: "nutrifit_documentation.docx",
        icon: "docx"
      },
      {
        label: { en: "NutriFit Mobile (.apk)", bg: "Мобилна версия (.apk)" },
        filename: "../NutriFitMobile.apk",
        icon: "apk"
      }
    ],
    year: "2024"
  },
  {
    id: "tikfluence",
    title: "TikFluence",
    shortDescription: {
      en: "Data analytics platform that proves TikTok's influence on songs' popularity, with different stats and real-time personal profile information",
      bg: "Платформа за анализ на данни, която доказва влиянието на TikTok върху популярността на песните, с различни статистически данни и информация от персоналните профили на потребителите в реално време"
    },
    fullDescription: {
      en: `**TikFluence** was my **first serious project**, built primarily as a **learning exercise** to get comfortable working with the technologies involved. The core idea explores a real phenomenon: when a song gets used repeatedly across TikTok videos, the platform's exposure gradually pushes up that song's popularity on **Spotify and YouTube** over time - TikTok influences a track's trajectory across other music platforms.

**Note:** the live demo is visitable but **some features may not function** as the project is **no longer actively maintained** due to changes in Spotify API policies and access restrictions, which **removed access to the track popularity score (0–100)** used in core functionality and made long-term maintenance **impractical**

**Core features:**
- **Influence Algorithm:** identifies songs whose **TikTok popularity** peak predates their **Spotify peak** - proving cross-platform influence. One noticeable constraint is that Spotify doesn't expose raw play counts, only a **proprietary 0-100 popularity score** - understanding and working around this was essential to making the algorithm applicable
- **Growth Algorithm:** flags songs that are currently surging (last 2 days' popularity > all-time average)
- **Charts & leaderboards** for: Top 200 Global TikTok songs, Top 200 TikTok songs in Bulgaria, Top 200 most-followed TikTokers, Top 200 most-viewed videos - all updated daily via **Cronjob + Chartex API** scraping
- **Per-song stats pages:** TikTok videos count, YouTube views, Spotify popularity, chronological popularity change charts
- **Nearly 60 interactive statistics** and diagrams across the platform
- **"My TikTok Statistics" page:** live personal TikTok profile stats (followers, likes, following, videos) updated every minute via **Socket.IO / HTTP Long Polling + proxy server** (CORS mechanism did not allow requests to be sent directly from a browser to a different domain). This is the only page requiring TikTok OAuth login - session key is stored in a cookie valid for 1 hour. All other pages are publicly accessible
- All rankings are rendered with **jQuery Datatables**, while the diagrams are rendered with **Chart.js**
 
**Development notes:**
- **14 API access approval attempts** with the TikTok Developer team before succeeding. Images from the email correspondence are included in the documentation`,
      bg: `**TikFluence** беше моят **първи сериозен проект**, създаден предимно като **упражнение**, за да се запозная с използваните технологии. Основната идея изследва реален феномен: когато песен се използва многократно в TikTok видеа, широката достъпност в платформата постепенно повишава популярността на тази песен в **Spotify и YouTube** с времето - TikTok оказва влияние върху развитието на дадена песен в други музикални платформи.

**Забележка:** онлайн демото е достъпно, но **някои функции може да не работят**, тъй като проектът **вече не се поддържа активно** поради промени в политиките на Spotify API и ограниченията за достъп, които **премахнаха достъпа до показателя за популярност на песните (0–100)**, използван в основната функционалност, и направиха дългосрочната поддръжка **непрактична**

**Основни функции:**
- **Алгоритъм за влияние:** идентифицира песни, чийто пик на **популярност в TikTok** предхожда пика в **Spotify** - доказвайки влияние между платформите. Едно забележимо ограничение е, че Spotify не разкрива реалния брой пускания, а само **собствен индекс за популярност от 0 до 100** - разбирането и заобикалянето на това ограничение беше от съществено значение, за да бъде алгоритъмът приложим
- **Алгоритъм за растеж:** отбелязва песните, чиято популярност в момента нараства (популярността през последните 2 дни > средната стойност за целия период)
- **Диаграми и класирания**: Топ 200 най-популярни TikTok песни в света, Топ 200 TikTok песни в България, Топ 200 TikTok потребители с най-много последователи, Топ 200 най-гледани видеа - всички обновявани ежедневно чрез scraping с **Cronjob + Chartex API**
- **Страници със статистики за всяка песен:** брой TikTok видеа, гледания в YouTube, популярност в Spotify, диаграми за хронологичната промяна на популярността
- **Близо 60 интерактивни статистики** и диаграми в цялата платформа
- **Страница „Моите статистики в TikTok“:** статистики в реално време за личния TikTok профил (последователи, харесвания, брой видеа), актуализирани всяка минута чрез **Socket.IO / HTTP Long Polling + прокси сървър** (CORS механизмът не позволяваше заявки да се изпращат директно от браузъра към друг домейн). Това е единствената страница, изискваща вход чрез TikTok OAuth - ключът за сесията се съхранява в бисквитка, валидна 1 час. Всички останали страници са публично достъпни
- Всички класации се изобразяват с **jQuery Datatables**, а диаграмите с **Chart.js**
 
**Бележки от разработката:**
- **14 опита за одобрение на API достъп** от екипа на TikTok, преди разрешението да бъде получено. В документацията са включени изображения от кореспонденцията по имейл`
    },
    technologies: [
      "PHP",
      "PDO",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Chart.js",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "TikTok API",
      "Spotify API",
      "YouTube API",
      "Chartex API",
      "Bootstrap",
      "Apache",
      "Cronjob"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/TikFluence",
    liveUrl: "https://fluence.noit.eu/",
    docs: [
      {
        label: { en: "Documentation", bg: "Документация" },
        filename: "tikfluence_documentation.docx",
        icon: "docx"
      }
    ],
    year: "2023"
  }
];

export interface Achievement {
  year: string;
  title: string;
  competition: Localized;
  category: Localized;
  place?: string;
  score?: string;
  points?: Localized;
  extra?: Localized;
  // "competition" (default) = coding competition/olympiad result, shown as "Project: <title>" with a rank
  // "honor" = general recognition/award (no project, no rank)
  kind?: "competition" | "honor";
  docs?: { label: Localized; path: string; type?: "pdf" | "image" }[];
  links?: { label: Localized; url: string }[];
  fallbackImage?: string;
  fallbackImageCaption?: Localized;
}

export const achievements: Achievement[] = [
  {
    year: "2023",
    title: "TikFluence",
    competition: { en: 'NATIT "John Atanasov"', bg: "НЕТИТ „Джон Атанасов“" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "2nd",
    extra: { en: "First НЕТИТ participation", bg: "Първо участие в НЕТИТ" },
    fallbackImage: "/achievements/netit-2023-newspaper.png",
    fallbackImageCaption: {
      en: "Newspaper clipping from “Glashatai” covering the awards ceremony at the National Autumn Tournament in Information Technologies “John Atanasov”, held December 1–3 (2023) in Sofia. I won 2nd place in the “Software Applications” category with the “TikFluence” project",
      bg: "Извадка от „Глашатай“, показваща церемонията по връчването на наградите на Националния есенен турнир по информационни технологии „Джон Атанасов“, проведен от 1 до 3 декември (2023) в София. Спечелих 2-ро място в категорията „Софтуерни приложения“ с проекта „TikFluence“"
    },
    docs: [
      {
        label: {
          en: "Certificate of Participation",
          bg: "Сертификат за участие"
        },
        path: "/achievements/certificates/2023_NATIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Newspaper Article", bg: "Новинарска статия" },
        url: "https://glashatai.com/article/24722-golqm-yspeh-na-ychenicite-ot-pgi-na-nacionalnoto-s"
      },
      {
        label: { en: "School News", bg: "Училищни новини" },
        url: "https://pgi-pernik.bg-schools.com/novini.php?id=823"
      }
    ]
  },
  {
    year: "2023",
    title: "TikFluence",
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "4th",
    score: "6.00",
    points: {
      en: "88 project · 86 individual",
      bg: "88 на проект · 86 индивидуално"
    },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2023-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2023-individual.pdf"
      },
      {
        label: {
          en: "Certificate of Participation",
          bg: "Сертификат за участие"
        },
        path: "/achievements/certificates/2023_NOIT_certificate.png",
        type: "image"
      },
      {
        label: {
          en: "School Certificate of Excellence",
          bg: "Училищна грамота за отличие"
        },
        path: "/achievements/certificates/2023_NOIT_certificate_of_excellence.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/171"
      }
    ]
  },
  {
    year: "2024",
    title: "NutriFit",
    competition: { en: 'NATIT "John Atanasov"', bg: "НЕТИТ „Джон Атанасов“" },
    category: {
      en: "Software Applications",
      bg: "Софтуерни приложения"
    },
    place: "1st",
    points: { en: "96 project", bg: "96 на проект" },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/netit-2024.pdf"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://122ou.com/wp-content/uploads/2024/12/softuerni-prilozhenia.pdf"
      }
    ]
  },
  {
    year: "2024",
    title: "NutriFit",
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "4th",
    score: "5.75",
    points: {
      en: "85 project · 77 individual",
      bg: "85 на проект · 77 индивидуално"
    },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2024-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2024-individual.pdf"
      },
      {
        label: {
          en: "Certificate of Participation",
          bg: "Сертификат за участие"
        },
        path: "/achievements/certificates/2024_NOIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/182"
      }
    ]
  },
  {
    year: "2025",
    title: "MindReel",
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Big Data · 11–12 grade",
      bg: "Големи обеми от данни · 11–12 клас"
    },
    place: "5th",
    score: "5.75",
    points: {
      en: "78 project · 83 individual",
      bg: "78 на проект · 83 индивидуално"
    },
    extra: {
      en: "known in its early stage as ArtCompass",
      bg: "познат в ранния си етап като ArtCompass"
    },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2025-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2025-individual.pdf"
      },
      {
        label: { en: "Ministry Attestation", bg: "Министерско удостоверение" },
        path: "/achievements/certificates/2025_Ministry_of_education_official_confirmation_of_excellent_performance.png",
        type: "image"
      },
      {
        label: {
          en: "Certificate of Participation",
          bg: "Сертификат за участие"
        },
        path: "/achievements/certificates/2025_NOIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/193"
      },
      {
        label: {
          en: "Individual ranking (official)",
          bg: "Индивидуално класиране (официално)"
        },
        url: "https://edusoft.fmi.uni-sofia.bg/archive/it2025/protocols/noit_group_3.pdf"
      },
      {
        label: {
          en: "Project ranking (official)",
          bg: "Класиране на проект (официално)"
        },
        url: "https://edusoft.fmi.uni-sofia.bg/archive/it2025/protocols/noit_cat_5.pdf"
      }
    ]
  },
  {
    year: "2026",
    title: "Academic Excellence & Graduation with Distinction",
    kind: "honor",
    competition: { en: "Municipality of Pernik", bg: "Община Перник" },
    category: {
      en: "Recognized by the Mayor of Pernik for academic excellence and graduating with distinction",
      bg: "Отличен от кмета на Перник за академични постижения и завършване с отличие"
    },
    extra: {
      en: "Профилирана гимназия по икономика – гр. Перник",
      bg: "Профилирана гимназия по икономика – гр. Перник"
    },
    docs: [
      {
        label: { en: "Certificate from the Mayor", bg: "Грамота от кмета" },
        path: "/achievements/certificates/2026_certificate_of_academic_excellence_mayor.png",
        type: "image"
      },
      {
        label: { en: "School Certificate", bg: "Училищна грамота" },
        path: "/achievements/certificates/2026_certificate_of_academic_excellence_school.png",
        type: "image"
      }
    ]
  }
];
