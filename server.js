const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: ['http://localhost:3000',
        'https://mental-health-journal-vercel.vercel.app/',
        'https://mental-health-journal-vercel-l7amcyu57-longs-projects-7bd12887.vercel.app'
    ]
}));

app.use(express.json());

// Initialize Anthropic client (for future use if you add real API)
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Backend is running!' });
});

// AI insights endpoint - SMART MOCK VERSION
app.post('/api/ai-insights', async (req, res) => {
    try {
        const { mood, activities, journalText, recentEntries } = req.body;

        console.log('📝 Received request for AI insights');
        console.log('Mood:', mood);
        console.log('Activities:', activities);
        console.log('Journal:', journalText.substring(0, 100) + '...');

        // Analyze journal text for keywords and themes
        const lowerText = journalText.toLowerCase();

        // EXPANDED THEME DETECTION

        // Work & Career
        const isWorkStress = /work|job|boss|manager|supervisor|deadline|meeting|project|presentation|office|colleague|coworker|corporate|career|promotion|fired|quit|resignation|unemployment|interview|performance review/i.test(journalText);
        const isWorkBurnout = /burnout|burnt out|overworked|exhausted from work|too many hours|no work.life balance|can't keep up|drowning in work/i.test(journalText);
        const isJobSearch = /job search|job hunting|applying|resume|cv|interview|rejected|no offers|unemployment|can't find work/i.test(journalText);

        // School & Education
        const isSchool = /school|class|classes|exam|test|quiz|homework|assignment|study|studying|grade|grades|gpa|professor|teacher|college|university|semester|finals|midterm/i.test(journalText);
        const isProcrastination = /procrastinat|putting off|avoid|avoiding|can't start|don't want to start|distracted|wasting time/i.test(journalText);
        const isAcademicPressure = /straight a|perfect gpa|valedictorian|top of class|competitive|admission|acceptance|ivy league|prestigious|scholarship/i.test(journalText);

        // Relationships
        const isRelationship = /friend|friends|friendship|family|parent|mom|dad|mother|father|sibling|brother|sister|partner|relationship|boyfriend|girlfriend|spouse|husband|wife|marriage/i.test(journalText);
        const isLoneliness = /lonely|alone|isolated|no friends|nobody|no one understands|by myself|solitude|disconnected/i.test(journalText);
        const isBreakup = /break up|broke up|breakup|ex|divorce|separation|ended things|dumped|left me|broke my heart/i.test(journalText);
        const isFamilyConflict = /parents|family drama|family fight|argument with|fought with mom|fought with dad|toxic family|family issues/i.test(journalText);
        const isSocialAnxiety = /social anxiety|afraid of people|scared to talk|awkward|uncomfortable around|don't know what to say|avoid social|fear of judgment/i.test(journalText);

        // Health & Physical
        const isHealth = /tired|sick|sickness|ill|illness|pain|ache|health|medical|doctor|hospital|injury|chronic|disease/i.test(journalText);
        const isSleepIssues = /can't sleep|insomnia|restless|toss and turn|3am|wide awake|sleep deprived|exhausted|fatigue|no energy/i.test(journalText);
        const isEatingIssues = /eating disorder|anorexia|bulimia|binge|restrict|food anxiety|body image|weight|fat|skinny|diet|calories/i.test(journalText);
        const isChronicPain = /chronic pain|fibromyalgia|arthritis|migraine|headache|back pain|constant pain|hurts all the time/i.test(journalText);

        // Mental Health
        const isAnxiety = /anxious|anxiety|worry|worried|worrying|nervous|stress|stressed|overwhelm|overwhelmed|panic|panicking|racing thoughts|can't calm down|on edge/i.test(journalText);
        const isDepression = /sad|sadness|hopeless|hopelessness|empty|emptiness|numb|numbness|depressed|depression|worthless|meaningless|can't feel|don't care|given up/i.test(journalText);
        const isSuicidalThoughts = /suicidal|suicide|kill myself|end it all|better off dead|don't want to live|no point in living|self harm|cutting/i.test(journalText);
        const isImposterSyndrome = /imposter|fraud|fake|don't deserve|not good enough|everyone will find out|just lucky|fooling everyone/i.test(journalText);
        const isPerfectionism = /perfect|perfectionist|never good enough|have to be the best|can't make mistakes|failure is not an option|all or nothing/i.test(journalText);
        const isOCD = /ocd|obsess|obsessive|compulsive|checking|ritual|intrusive thought|can't stop thinking|contamination/i.test(journalText);

        // Positive Emotions
        const isPositive = /happy|happiness|grateful|gratitude|thankful|blessed|joy|joyful|excited|excitement|amazing|wonderful|great day|fantastic|proud|accomplished|achievement/i.test(journalText);
        const isProgress = /progress|improving|getting better|milestone|breakthrough|finally|overcame|succeeded|victory|win/i.test(journalText);
        const isGratitude = /grateful|gratitude|appreciate|appreciation|thankful|blessed|lucky|fortunate/i.test(journalText);

        // Life Circumstances
        const isMoney = /money|financial|finances|bills|rent|mortgage|debt|loan|broke|can't afford|expensive|budget|poverty|poor|struggling financially/i.test(journalText);
        const isMoving = /moving|moved|new city|new place|relocate|relocated|leaving home|far from home|homesick/i.test(journalText);
        const isLifeTransition = /transition|change|changing|uncertain|unknown|new chapter|crossroads|don't know what to do|lost|direction/i.test(journalText);
        const isTrauma = /trauma|traumatic|ptsd|flashback|triggered|abuse|assault|violence|attacked/i.test(journalText);

        // Specific Situations
        const isWeather = /weather|rain|raining|cloudy|gloomy|gray|seasonal|winter|dark|cold/i.test(journalText);
        const isHolidays = /holiday|holidays|christmas|thanksgiving|birthday|anniversary|alone on|family gathering/i.test(journalText);
        const isPandemic = /covid|pandemic|quarantine|lockdown|isolation|social distancing|mask|vaccine/i.test(journalText);
        const isAddiction = /addiction|addicted|alcoholic|drinking too much|substance|drugs|can't stop|dependent|relapse/i.test(journalText);

        // Coping & Self-Care
        const isTherapy = /therapy|therapist|counseling|counselor|psychologist|psychiatrist|mental health professional|treatment/i.test(journalText);
        const isMedication = /medication|meds|pills|antidepressant|anti.anxiety|prescription|dosage|side effect/i.test(journalText);
        const isExercise = /exercise|exercised|workout|worked out|gym|run|running|ran|walk|walking|yoga|fitness/i.test(journalText);
        const isMindfulness = /meditat|mindful|breathing|breath|grounding|present moment|awareness/i.test(journalText);

        // Build personalized response
        let insight = '';

        // CRITICAL: Check for crisis situations FIRST
        if (isSuicidalThoughts) {
            insight = `I'm very concerned about what you've shared. These thoughts sound serious and painful. Please reach out for immediate support:

🆘 **National Suicide Prevention Lifeline: 988**
📱 **Crisis Text Line: Text HOME to 741741**
🚨 **Emergency: Call 911**

You don't have to face this alone. These feelings can improve with professional help. Please contact one of these resources right now - they're available 24/7 and want to help you. 💜`;

            // Send immediately, don't continue with normal flow
            await new Promise(resolve => setTimeout(resolve, 500));
            return res.json({ insight });
        }

        // Start with validation based on mood
        if (mood === 'Terrible') {
            insight += `I can sense you're in a really dark place right now, and I want you to know that what you're feeling is valid and real. `;
        } else if (mood === 'Bad') {
            insight += `I hear that you're struggling right now. It takes courage to acknowledge when things are hard. `;
        } else if (mood === 'Okay') {
            insight += `Thank you for checking in. I hear that you're in a middle space - not terrible, but not great either. `;
        } else if (mood === 'Good') {
            insight += `I'm glad to hear you're feeling good! `;
        } else if (mood === 'Amazing') {
            insight += `This is wonderful! I love seeing you experience joy and positivity. `;
        }

        // Address PRIMARY theme (most specific first)

        // Work-related themes
        if (isWorkBurnout) {
            insight += `I'm hearing burnout in your words - that complete physical, emotional, and mental exhaustion from work. Burnout is serious and can't be fixed with just a weekend off. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When we're burnt out, we often feel guilty for not being able to "push through," but burnout means your body and mind are telling you they need rest. `;
            }

            insight += `This isn't a personal failure - it's a sign that your workload or environment is unsustainable. What's one boundary you could set at work to protect your energy? `;

        } else if (isJobSearch) {
            insight += `Job searching is emotionally exhausting - the constant rejection and uncertainty can really wear you down. It's not a reflection of your worth. `;

            if (lowerText.includes('reject') || lowerText.includes('no offer')) {
                insight += `Rejection in job hunting is incredibly common and doesn't mean you're not qualified. The market can be brutal, and timing matters as much as skills. `;
            }

            insight += `Remember that you only need ONE yes. What's one thing you can control in this process? `;

        } else if (isWorkStress) {
            insight += `I can hear that work is weighing heavily on you. Work stress can feel all-consuming, especially when there are high expectations and tight deadlines. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When we're overwhelmed at work, our minds can catastrophize - turning one stressful situation into "my whole career is falling apart." That's a cognitive distortion called catastrophizing. `;
            }

            if (lowerText.includes('boss') || lowerText.includes('manager')) {
                insight += `Difficult dynamics with your boss can make every workday feel like a battle. `;
            }

            insight += `You can only do one thing at a time, and you're allowed to have limits. What's ONE small task you could complete today to ease some pressure? `;
        }

        // School-related themes
        else if (isAcademicPressure) {
            insight += `I can feel the weight of academic pressure in your words - the need to be perfect, to achieve at the highest level. That constant pressure to excel can be exhausting. `;

            insight += `Remember, even straight-A students are whole people with worth beyond their grades. Your value isn't determined by academic performance. What would it feel like to lower your standards by just 5%? `;

        } else if (isProcrastination) {
            insight += `Procrastination is often misunderstood - it's not laziness. It's usually anxiety, perfectionism, or overwhelm in disguise. We avoid tasks that make us feel incompetent or anxious. `;

            if (mood === 'Bad') {
                insight += `And then we feel guilty about procrastinating, which makes us feel worse, which makes it even harder to start. It's a vicious cycle. `;
            }

            insight += `What if you worked on this task for just 5 minutes - not to finish it, just to break the seal? `;

        } else if (isSchool) {
            insight += `School stress is real, and the pressure to perform academically can feel overwhelming. Academic challenges can feel like they define our entire future. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When stressed about grades or exams, we can fall into all-or-nothing thinking - "If I don't do perfectly, I'm a failure." That's black-and-white thinking, and it's not true. `;
            }

            if (lowerText.includes('exam') || lowerText.includes('test')) {
                insight += `Test anxiety is common and can make it hard to show what we actually know. `;
            }

            insight += `Your worth as a person isn't determined by your GPA. What would self-compassion as a student look like right now? `;
        }

        // Relationship themes
        else if (isBreakup) {
            insight += `Breakups are one of the most painful human experiences - the loss of intimacy, shared future, and daily presence of someone you cared about. Your grief is valid. `;

            if (mood === 'Terrible') {
                insight += `Right now it might feel like this pain will never end, but heartbreak does heal with time, even when it doesn't feel that way. `;
            }

            insight += `Allow yourself to grieve. What do you need right now - distraction, space to feel, or connection with others? `;

        } else if (isFamilyConflict) {
            insight += `Family conflict hits differently because these are people who shaped us - the relationships are complex and loaded with history. `;

            if (lowerText.includes('toxic')) {
                insight += `Recognizing toxic family patterns is hard but important. You're allowed to set boundaries, even with family. `;
            }

            insight += `You can't control how your family acts, but you can control how you respond and what boundaries you set. What boundary would feel most protective right now? `;

        } else if (isSocialAnxiety) {
            insight += `Social anxiety can make even simple interactions feel like high-stakes performances where we're being judged. That constant self-monitoring is exhausting. `;

            insight += `Most people are too worried about themselves to judge you as harshly as you fear. What's one small social situation you could practice in this week? `;

        } else if (isLoneliness) {
            insight += `Loneliness is one of the most painful human emotions - that deep ache of disconnection and feeling unseen. You're not alone in feeling alone. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When we're lonely, we can spiral into thinking "nobody cares about me" or "I'll always be alone." Those are thoughts, not facts. `;
            }

            insight += `Connection takes vulnerability and effort, but it's possible. What's one small step toward connection you could take? `;

        } else if (isRelationship) {
            insight += `Relationships can bring up complex emotions, and it sounds like your connections with others are on your mind right now. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When relationships are struggling, it can feel very isolating - like no one understands us or cares. `;
            }

            insight += `Healthy relationships require both give and take, communication and boundaries. What do you need from your relationships right now? `;
        }

        // Health themes
        else if (isEatingIssues) {
            insight += `I hear you're struggling with food and body image. Eating disorders are serious mental health conditions that deserve professional support - this isn't something you should face alone. `;

            insight += `Please consider reaching out to a therapist who specializes in eating disorders, or contact the National Eating Disorders Association Helpline: 1-800-931-2237. Your relationship with food and your body can improve with help. 💜`;

        } else if (isChronicPain) {
            insight += `Living with chronic pain is incredibly difficult - it affects everything from mood to sleep to relationships. Pain that never stops is exhausting in every way. `;

            insight += `The intersection of chronic pain and mental health is real - they feed into each other. Are you getting support for both the physical and emotional impacts? `;

        } else if (isSleepIssues) {
            insight += `Sleep problems are both a symptom and a cause of mental health struggles - they create a vicious cycle. When we can't sleep, everything feels harder. `;

            if (lowerText.includes('3am') || lowerText.includes('wide awake')) {
                insight += `Those 3am wake-ups where your mind races are particularly brutal. `;
            }

            insight += `Sleep hygiene matters: consistent schedule, limiting screens, cool dark room. Have you tried any sleep hygiene techniques? `;

        } else if (isHealth) {
            insight += `Physical and mental wellbeing are deeply connected. When our bodies don't feel right, our minds struggle too, and vice versa. `;

            insight += `You're being wise by paying attention to how your body feels. What's one small act of physical self-care you could do today? `;
        }

        // Mental health themes
        else if (isImposterSyndrome) {
            insight += `Imposter syndrome is that persistent feeling of being a fraud despite evidence of competence. Even very successful people experience this. `;

            insight += `The feeling of "I'm fooling everyone" and "they'll find out I don't belong" is a cognitive distortion - your brain is lying to you. What evidence do you have that you DO deserve to be where you are? `;

        } else if (isPerfectionism) {
            insight += `Perfectionism isn't really about high standards - it's about fear. Fear of judgment, fear of failure, fear of not being enough. And it's exhausting. `;

            insight += `"Perfect" doesn't exist, and chasing it steals joy from your accomplishments. What would happen if you aimed for "good enough" instead of perfect? `;

        } else if (isOCD) {
            insight += `OCD is much more than just being organized or neat - it's intrusive thoughts and compulsive behaviors that can take over your life. It's a real disorder that deserves professional treatment. `;

            insight += `If you're not already working with a therapist trained in ERP (Exposure and Response Prevention), I'd encourage you to seek that out. OCD is very treatable. `;

        } else if (isDepression) {
            insight += `I hear that you're in a dark place right now. Depression can make everything feel heavy, meaningless, and exhausting - like you're moving through thick fog. `;

            if (lowerText.includes('numb') || lowerText.includes('empty')) {
                insight += `That numbness and emptiness you're feeling is a common symptom of depression - when you can't feel anything at all. `;
            }

            insight += `The fact that you're here, writing this down, shows strength even if you can't feel it. Depression lies to us - it tells us things will never get better, but that's the illness talking, not reality. What's one tiny thing that brought even a flicker of relief today? `;

        } else if (isAnxiety) {
            insight += `I can sense the anxiety in your words. Anxiety is your brain's alarm system going off - trying to protect you from perceived threats, but often overreacting. `;

            if (lowerText.includes('racing') || lowerText.includes('can\'t calm')) {
                insight += `Those racing thoughts and inability to calm down are your nervous system in overdrive. `;
            }

            insight += `When we're anxious, we tend to catastrophize - imagining worst-case scenarios. What if this situation turned out better than your anxiety is predicting? What's a more balanced, realistic outcome? `;
        }

        // Life circumstances
        else if (isAddiction) {
            insight += `Addiction is a disease, not a moral failing or lack of willpower. It deserves compassion and professional help. `;

            if (lowerText.includes('relapse')) {
                insight += `Relapse is often part of the recovery process - it doesn't erase your progress or mean you've failed. `;
            }

            insight += `Please consider reaching out to support: AA/NA meetings, addiction counselor, or SAMHSA National Helpline: 1-800-662-4357. Recovery is possible. 💜`;

        } else if (isTrauma) {
            insight += `Trauma isn't just the event that happened - it's the lasting impact on how you feel and relate to the world. Trauma deserves specialized therapeutic support. `;

            insight += `If you're not already working with a trauma-informed therapist (EMDR or trauma-focused CBT), I'd strongly encourage you to seek that out. Healing is possible. 💜`;

        } else if (isMoney) {
            insight += `Financial stress is one of the most common sources of anxiety, and it's completely valid to feel worried about money. Financial pressure can make us feel trapped and hopeless. `;

            if (lowerText.includes('debt') || lowerText.includes('bills')) {
                insight += `Being in debt or struggling with bills creates constant background stress that affects everything. `;
            }

            insight += `Remember that your worth isn't tied to your bank account or financial status. What's one small step toward financial stability, even if it's just making a plan? `;

        } else if (isMoving) {
            insight += `Moving to a new place is one of life's major stressors - you're leaving behind the familiar and starting over. That's hard, even when it's the right choice. `;

            if (lowerText.includes('homesick')) {
                insight += `Homesickness is real grief - you're mourning the loss of your old life, routines, and people. `;
            }

            insight += `Give yourself time to adjust - it usually takes 3-6 months to feel settled somewhere new. What's one thing you could do to create a sense of home where you are? `;

        } else if (isLifeTransition) {
            insight += `Life transitions - even positive ones - are inherently stressful because they involve uncertainty and change. Not knowing what comes next can be anxiety-inducing. `;

            insight += `It's okay to not have it all figured out. What's one small step you could take toward clarity? `;
        }

        // Positive themes
        else if (isProgress) {
            insight += `I love hearing about your progress! Growth isn't always linear, but recognizing these victories - big or small - matters so much. `;

            insight += `You did this through your own effort and resilience. What helped you get here? `;

        } else if (isGratitude) {
            insight += `Gratitude is such a powerful practice for mental health - it literally rewires our brains to notice the good alongside the hard. `;

            insight += `The fact that you're cultivating gratitude even when things are tough shows wisdom. Keep nurturing this practice. `;

        } else if (isPositive) {
            insight += `I love the positive energy in your words! It's wonderful to see you experiencing joy and happiness. `;

            insight += `Taking time to savor these good feelings strengthens your resilience for harder days - this is called "banking positive emotions." What specifically contributed to feeling ${mood.toLowerCase()} today? `;
        }

        // If no specific theme detected, give general response
        else {
            insight += `I appreciate you taking the time to express what's on your mind. The act of writing about our experiences helps us process and understand them better. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `Even though you're struggling, you showed up here - that's a form of self-care and self-awareness. `;
            }

            insight += `As you reflect on what you've written, what emotions are you noticing right now? `;
        }

        // Add therapy/medication context if mentioned
        if (isTherapy && !insight.includes('therapist')) {
            insight += `\n\nI'm glad you're working with a therapist - that takes courage and shows you're taking your mental health seriously. `;
        }

        if (isMedication && !insight.includes('medication')) {
            insight += `\n\nMedication can be a helpful tool for mental health when combined with therapy and self-care. How is it working for you? `;
        }

        // Add activity-based insights
        if (!activities || activities === 'None' || activities === '') {
            insight += `\n\nI notice you haven't logged any self-care activities today. `;

            if (mood === 'Terrible' || mood === 'Bad') {
                insight += `When we're struggling, these are often the first things we skip - but they're also what we need most. Even tiny actions count. `;
            }

            insight += `Could you do just one small thing for yourself today? Even a 5-minute walk or reaching out to one person counts. `;

        } else {
            const activitiesLower = activities.toLowerCase();

            if (activitiesLower.includes('exercise') && !isExercise) {
                insight += `\n\nI'm glad to see you moved your body today. Exercise releases endorphins, reduces cortisol, and helps regulate mood naturally. You're actively supporting your mental health. `;
            }

            if (activitiesLower.includes('sleep') && !isSleepIssues) {
                insight += `\n\nGood sleep is foundational for emotional regulation and resilience. You're taking care of yourself by prioritizing rest. `;
            }

            if (activitiesLower.includes('social')) {
                insight += `\n\nConnection with others is healing and protective for mental health, even when it's hard to reach out. I'm glad you made that happen. `;
            }

            if (activitiesLower.includes('creative')) {
                insight += `\n\nCreative expression is a powerful form of emotional processing and healing. That's wonderful self-care. `;
            }

            if (activitiesLower.includes('relax')) {
                insight += `\n\nMaking time to relax and recharge is productive, not lazy. Rest is necessary. `;
            }
        }

        // Add mindfulness context if mentioned
        if (isMindfulness) {
            insight += `\n\nMindfulness practices like meditation and breathing exercises are evidence-based tools for managing anxiety and stress. Keep practicing - the benefits build over time. `;
        }

        // Weather acknowledgment (brief)
        if (isWeather && mood === 'Bad') {
            insight += `\n\n(And yes, gloomy weather can definitely affect mood - seasonal patterns are real.) `;
        }

        // End with encouragement appropriate to mood
        if (mood === 'Terrible' || mood === 'Bad') {
            insight += `\n\nRemember: feelings are temporary, even when they feel permanent. You're doing the work by showing up here. That takes courage. 💜`;
        } else if (mood === 'Okay') {
            insight += `\n\n"Okay" is valid, and sometimes it's all we can manage - and that's enough. Keep checking in with yourself. 💜`;
        } else if (mood === 'Good' || mood === 'Amazing') {
            insight += `\n\nKeep nurturing what's working for you. You deserve these good feelings. 💜`;
        }

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.json({ insight });

        console.log('✅ Sent comprehensive personalized AI insight');

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Failed to get AI insights',
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`✅ CORS enabled for http://localhost:3000`);
    console.log(`🤖 Using SMART Mock AI (keyword-based personalization)`);
});