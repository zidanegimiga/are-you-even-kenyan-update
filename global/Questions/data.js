const data = [
    {
      title: "Our Roads",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
      qnA: [
        {
            question: "You are driving a BMW X5 2022 edition. A Chapchap passes you fast. What do you do?",
            answer: "Shake your head and continue listening to your music",
            options: ["Accelerate and show them who is the king of the road", "Shake your head and continue listening to your music"],
            tip: "In Kenya, negligence accounted for the highest number of reported crashes at 33%"
        },
        {
            question: "A nduthi cuts you on the road. What will you do?",
            answer: "Quietly be disgruntled by the Nduthi guy's lack of road safety and etiquette",
            options: ["Let the road rage burn. Chase him, Open your window and shout at him", "Quietly be disgruntled by the Nduthi guy's lack of road safety and etiquette"],
            tip: "In Kenya, negligence accounted for the highest number of reported crashes at 33%"
        },
        {
            question: "You are a pedestrian, You need to catch a matatu on the other side of the road before it leaves you because if it does you will have to wait for a while to get the next one. What do you do",
            answer: "Wait for oncoming traffic to ease after all the matatus are plenty ",
            options: ["Run to the other side of the road as fast as you can. After all you are a Kenyan and Kenyans are known to be runners plus you've made your calculations and know that you will make it before oncoming traffic gets to you.", "Wait for oncoming traffic to ease after all the matatus are plenty "],
            tip: "Weekly statistics indicate that four fatalities occurred as a result of pedestrians stepping, walking, or running off a footpath into the road. In addition, three fatalities were caused by pedestrians who crossed without due diligence at road junctions.",
        },
        {
            question: "You are in CBD, You want to cross the road but that story with your BFF has shikad. You look left and right, there is no car coming. What do you do?",
            answer: "Hang up and call when you cross the road",
            options: ["Hang up and call when you cross the road", "Continue with that juicy story"],
            tip: "If you are caught by the police, you may face a penalty of Ksh. 2,000. Additionally, the police may charge you with attempted suicide charges."
        },
        {
            question: "You just came from the salon, You need to get to your date as fast as possible so you take a nduthi. The guy gives you a helmet, what do you do?",
            answer: "Begrugingly take that helmet and hope that you can restore your hair to its glory once you remove the helmet",
            options: ["Geez! First of all that helmet stinks, secondly I don't know how many people have been in it. Thirdly, I didn't spend all that money to make my hair to mess my look with a helmet so no thank you I will pass on the helmet", "Begrugingly take that helmet and hope that you can restore your hair to its glory once you remove the helmet"],
            tip: "It's important for both bodaboda passengers and riders to wear protective gear and reflectors at all times. If you're caught without these items, you may face a fine of Ksh. 1,000.",
        },
        {
            question: "You didn't carry your driving licence (bummer) a cop stops you. He is rather annoying seems like he just wants to frustrate you into bribing him. What do you do?",
            answer: `"Sawa, tuende!" You decide to follow the rules and follow him to the station.`,
            options: ["Aaaargh! These Kenyan cops. Just give him that 1k in your pocket and ask him to let go of you. After all who wants to spend a whole day at the courts waiting to be fined?", `"Sawa, tuende!" You decide to follow the rules and follow him to the station.`],
            tip: "It's important to always have your driving license with you. Failure to produce it when demanded may result in a crime punishable by a fine of Ksh. 1,000.",
        },
        {
            question: "That person you met at the club jana is calling you. You were attracted to them and your extremely happy that they called you. However you are driving. What do you do?",
            answer: "Hold your excitement until you safely park your car.",
            options: ["I am careful always, I will pick up the all and keep it short anyway. After all there is traffic and we are going at 20KPH, what could possibly go wrong?", "Hold your excitement until you safely park your car."],
            tip: "It's illegal to text or talk with anyone while driving, as it can cause distraction and lead to accidents. If caught by the police, you may face a penalty of Ksh. 2,000."
        },
        {
            question: "Kama kupanda ni popote then why is kushuka ni stage? Hoenestly I am too tired and this mat is insisting on dropping me at the stage. As a true Kenyan what should you do?",
            answer: "Sit and wait to get to the designated bus stop",
            options: ["Sit and wait to get to the designated bus stop", "Cause chaos in the Matatu and demand that they drop you at your convinience after all kuna jam"],
            tip: "Commuters who enter or exit a vehicle from unauthorized bus stops and terminals may face consequences. While motorists may face more severe penalties for traffic offenses, commuters may be required to pay an instant fine of Ksh. 1,000."
        },
        {
            question: "Traffic lights are suggestions in Kenya. The guy behind you is hooting at you to skip the lights and keep it moving. What do you do?",
            answer: "Sit there and ignore the guy until the lights turn green.",
            options: ["Keep it moving, driving is an extreme sport in Kenya so where's the excitement if I can't jump the lights", "Sit there and ignore the guy until the lights turn green."],
            tip: "If you disobey traffic signs, you may face an instant charge of Ksh. 3,000. Driving on pedestrian pavements may result in a levy of Ksh. 5,000. Ignoring traffic police verbal or signal communication may also result in a penalty of Ksh. 3,000. If you fail to stop when instructed to do so, you may face a fine of Ksh. 5,000."
        },
        {
            question: "Your friends are waiting for you in Vasha. They wekelead some nyama on the grill and it would be a pity if the meat got cold because you couldn't reach there on time. The roads are clear and your German machine can rocket you to Vasha in less than an hour. So, what would you do?",
            answer: "I can microwave the meat when I get there.",
            options: ["I can weave in and out of traffic plus I have a pretty fast car.", "I can microwave the meat when I get there."],
            tip: "Overspeeding is the leading cause of accidents in Kenya. The penalties for overspeeding are as follows: exceeding the speed limit by 1 to 5km/hr will result in a warning, while exceeding by 6 to 10 km/hr may result in a fine of Ksh. 500. If you exceed the limit by 11 to 15 km/hr, you may be fined Ksh. 10,000"
        },
        {
            question: "Atleast at this time of the month the do not have alcoblow on our roads so if I leave the club a little drunk I should be able to get home soon. So...",
            answer: "Get an uber or have a designated driver to take us home",
            options: ["Get an uber or have a designated driver to take us home", "I get into my car and drive home. After all si gari inajua njia? "],
            tip: "Drunken driving is the second leading cause of accidents in Kenya. If caught driving while under the influence of alcohol, you may face a penalty of a fine not exceeding Ksh. 100,000 or imprisonment for a term not exceeding two years, or both."
        },
        {
            question: "Today is one of those days you are terribly late for your team meeting, adding salt to the wound you are responsible for the presentations today. And now your boss is calling and you are driving, what would you do?",
            answer: "park by the roadside, pickup and inform her I'll be there in 10",
            options: ["park by the roadside, pickup and inform her I'll be there in 10", "Aaai kwani how long does it take to let her know I'm 10 minutes away, I'll pick while driving."],
            tip: "Distracted driving is a significant safety risk and leads to accidents. If caught using a cell phone while the vehivle is in motion, you may face a penalty of ksh.2000 immediately"
        },
        {
            question: "You just noticed your drivers license expired last week.For some reason it had skipped your mind, but you still have to go to work today, what will you do?",
            answer: "leave my car at home and uber or hop on a matatu to work, as I work on renewing my license.",
            options: ["Drive the car kwani? Si the knowledge is in my head, plus for a week I havent been stopped, leo ndio kutachemka? I'll renew kwa ofisi.", "leave my car at home and uber or hop on a matatu to work, as I work on renewing my license."],
            tip: "Failure to renew you license upon expiry attracts ksh. 1000 levy"
        },
        {
            question: `You’ve just concluded your driving classes and your friends are against you having the "L"sign on your car because "you need to be hardy" they said. What will you do?`,
            answer: "Have the sign up anyway until I'm cormfotable driving without it",
            options: [`Have the sign up anyway until I'm cormfotable driving without it`, `wueh! Kuweka 'L" Kenya nikujitesa. How will I learn the ropes on how to deal with these crude matatu drivers if I put the "L"`],
            tip: `If you are fresh from the driving school and fail to exhibit the required "L" sign on the rear and front sides of your vehicle, then you will be eligible for a Ksh. 1,000 fine. According to section 12(1) (b) of the traffic act Kenya, this signage is crucial and helpful to other road users.`,
        },
        {
            question: "It takes 3 minutes to cross the road and 7 minutes while using the flyover and time is not on your side  what do you do?",
            answer: "just run through the flyover for my own safety as well",
            options: ["Look right, look left and cross quickly. Time is money and those stairs are not for me, not today.", "just run through the flyover for my own safety as well"],
            tip: "Crossing the road where theres no zebra crossing and clear visibility of a fly over is considered obstruction of the free movement of vehicle and you are eligible for ksh. 500 fine",
        },
        {
            question: "Your friend just joined the subaru boys club, and he's offered to let you have a taste of his new whip. The problem is his vehicle doesn’t fall in the class of the vehicles you learnt to drive. What will you do?",
            answer: "Politely decline and have him drive me around insead",
            options: ["Drive the car for a short distance, and avoid the police. These things are just the same", "Politely decline and have him drive me around insead"],
            tip: "If you are caught driving a vehicle whose class you did not study attracts a penalty of ksh. 7000"
        },
        {
            question: "Desperate times call for desperate measures. You really want to drive your van to shags, but with the rising economy and the high cost of fuel it seems impossible; your friend offers to give you passengers to travel with to the farm to reduce cost as you travel home for easter. What do you do?",
            answer: "politely decline, and use public means to cab cost",
            options: ["Accept the offer and leave early in the morning to avoid police", "politely decline, and use public means to cab cost"],
            tip: "If you are caught driving a vehicle that is not properly distinguished as a PSV in accordance with its route can have you charged ksh. 5000 fine"
        },
        {
            question: "You hate traveling because of how nauseated it makes you feel; this time its even worse because you’ve found yourself in a bus that smells like raw fish, burning bush and sweat. What do you do?",
            answer: "Alight and wait for another bus",
            options: ["Open the window and stick your head out for fresh air", "Alight and wait for another bus"],
            tip: "If you are caught sticking any part of your body out of a moving vehicle while traveling; you are liable to a fine of ksh. 1000"
        },
        {
            question: "Seatbelts make you uncormfotable. They restrict your movement and are tight, but there's a nation wide inspection. What will you do?",
            answer: "Have the seat belt on for my safety",
            options: ["Have the seat belt on for my safety", "Put the seat belt on every time we near an inspection"],
            tip: "If you are caught in transit without wearing a seat belt, then you must pay a fine of Ksh. 500 instantly before you are allowed to continue with the journey. "
        },
        {
            question: "You are moving out and happen to have underestimated your belongings. Now the pickup is full and might have to do two trips which means more money and time than you had anticipated, what will you do?",
            answer: "Negotiate a mid price for the two trips and just wait for the moving process. Sina choice",
            options: ["Negotiate a mid price for the two trips and just wait for the moving process. Sina choice", "Pile everything on the pick up and avoid police checkpoint."],
            tip: "If you are caught overloading a vehicle or loading a vehicle in a manner that you may cause harm to other road users, according to the traffic act of kenya you may be fined not more than ksh.400,00 or risk facing a jail term of not less than 2 years",
        },
        {
            question: "You didn't carry your insuarance certificate a cop stops you. He is rather annoying and pushing for you to bribe him/her. What do you do",
            answer: "Twende mbele, you agree to follow the law",
            options: ["Give him 1k and ask him to let you go", "Twende mbele, you agree to follow the law"],
            tip: "Failure to carry your insurance certificates with you could result to a fine of up to 100,00 or sevral months jail term."
        },
        {
            question: "Chrisi Imeshika! Ni masaa yakuenda ushago sasa.  You have already made a trip to and from Nakuru; your friend tells you he has passengers who want to go to Kisumu. You have already surpassed the maximum driving hours, what will you do.",
            answer: "Politely decline, and let him know you are fatigued",
            options: ["Politely decline, and let him know you are fatigued", "Take up the offer and drive to Kisumu, you'll open the window to keep sleep away and have an extra stop to rest"],
            tip: "Driving for more than 8 hours within 24 hours will make you eligible to a fine not exceeding fifty thousand shillings, or to imprisonment for a term not exceeding twelve months"
        },
        {
            question: "ugh! I hate that parking spot. My car will be under the sun the entire time I'm at the mall; sasa who's coming back to an over heated car.  Oh wait is that a sweet spot on the parking for people with disabilities? So…",
            answer: "Just park under the sun, and leave my windows slightly open",
            options: ["Just park under the sun, and leave my windows slightly open", "Park on the persons with disability spot and rush into the mall before the guard sees me."],
            tip: "Failure to adhere to the parking rules of a particular parking bay could result to a fine of up to ksh10,00 or imprisonment for a term not exceeding 3 months."
        },
        {
            question: "You don’t really remember what happened, all you know is there was a big thud and that it was a human being you knocked down. They aren't dead you can see them moving.People are starting to approach, you are afraid, your passenger princess urges to drive off, what will you do?",
            answer: "stop the car, call the police and try help the person you hit",
            options: ["Drive off, I'm not about to have angry people destroy my car and steal from me. I'll go to the nearest police station", "stop the car, call the police and try help the person you hit"],
            tip: "Driving off from an accident scene without reporting could lead to a penalty of 5,000 or jail term of not more than three months."
        },
        {
            question: "Apparently Njeri is tired and wants a lift on my bicycle, but my small brother, Mike and I had plans to ride together. Sasa ni nani nitatoka tu roho safi",
            answer: "Tell Njeri Mike and I had plans already",
            options: ["Have them both ride on my bicycle, ata Mike is Tiny", "Tell Njeri Mike and I had plans already"],
            tip: "As a cyclist carrying more than one person is considered an offence. Failure to adhere to this rule you will be liable for a fine of ksh. 500"
        },
        {
            question: "Aki Imagine I don't have bus fare. And the way nimekopa kilamtu no one will want to loan me cash. But si I can just help these touts call customers once I get 40 bob niko sawa,ama?",
            answer: "Just ask for more money from my friends, hopefully get tomorrows fare as well",
            options: ["Help 5 touts fill the mathree and drop off that way I'll have fare for tomorrow as well, akili mtu wangu", "Just ask for more money from my friends, hopefully get tomorrows fare as well"],
            tip: "Touting when you aren't authorized or lincensed is considered an offence. Failure to adhere to this rule, you will be liable for a fine of ksh.1000"
        }
      ]
    },
  ];
  
  export default data;
