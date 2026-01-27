/* JESKO QUESTIONNAIRE LOGIC */

/* JESKO QUESTIONNAIRE LOGIC */

let quizData = {
    step: 0,
    flow: 'qualify', // 'qualify' or 'scale'
    answers: {}
};

// Define the steps for each flow
const qualifySteps = [
    { type: 'input', key: 'name', question: "What should we call you?" },
    { type: 'input', key: 'email', question: "Where should we send the audit?" },
    {
        type: 'select',
        key: 'revenue',
        question: "Current Revenue Range",
        options: ["Pre-Revenue", "$10k - $50k/mo", "$50k - $200k/mo", "$200k+/mo"]
    },
    {
        type: 'select',
        key: 'goal',
        question: "Primary Scaling Goal",
        options: ["Volume (More Leads)", "Efficiency (Less Chaos)", "Authority (Brand)", "Exit (Valuation)"]
    },
    {
        type: 'select',
        key: 'investment',
        question: "Are you able to invest into your business?",
        options: ["Yes", "No"]
    }
];

const scaleSteps = [
    { type: 'input', key: 'company_name', question: "What's your company name?" },
    { type: 'input', key: 'bottleneck', question: "What's the most significant bottleneck slowing down your business?" },
    {
        type: 'select',
        key: 'ai_adapted',
        question: "Have you tried adapting AI into your business?",
        options: ["Yes", "No"]
    }
];

const videoSteps = [
    { type: 'input', key: 'excitement', question: "What excites you about AI content growth?" },
    {
        type: 'select',
        key: 'leads_tried',
        question: "Have you tried getting leads with AI content?",
        options: ["Yes", "No"]
    }
];

// Current active steps
let steps = [];

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('quiz-modal');

    // Buttons
    const qualifyBtns = document.querySelectorAll('.pill-cta');
    const scaleBtn = document.getElementById('scale-btn');
    const videosBtn = document.getElementById('videos-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Open Modal - Qualify Flow
    if (qualifyBtns) {
        qualifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                startQuiz('qualify');
            });
        });
    }

    // Scale and Videos buttons now use default href navigation
    // Event listeners for them have been removed to prevent modal opening

    // Close Modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    function startQuiz(flowType) {
        quizData = {
            step: 0,
            flow: flowType,
            answers: {}
        };

        if (flowType === 'qualify') {
            // Clone to avoid permanent mutations from previous runs
            steps = JSON.parse(JSON.stringify(qualifySteps));
        } else if (flowType === 'scale') {
            steps = JSON.parse(JSON.stringify(scaleSteps));
        } else {
            steps = JSON.parse(JSON.stringify(videoSteps));
        }

        if (modal) {
            modal.classList.add('active');
            renderStep();
        }
    }

    // Render Logic
    function renderStep() {
        const container = document.getElementById('quiz-content');
        const progress = document.querySelector('.quiz-progress');

        // Progress Bar
        const percent = ((quizData.step) / steps.length) * 100;
        if (progress) progress.style.width = percent + '%';

        // Check if done
        if (quizData.step >= steps.length) {
            submitLead();
            renderCompletion(container);
            return;
        }

        const currentStep = steps[quizData.step];
        let inputHTML = '';

        if (currentStep.type === 'input') {
            inputHTML = `<input type="text" class="jesko-input" id="q-input" placeholder="Type here..." autofocus value="${quizData.answers[currentStep.key] || ''}">`;
        } else if (currentStep.type === 'select') {
            inputHTML = `<div class="option-grid">
                ${currentStep.options.map(opt => `
                    <div class="jesko-option" onclick="selectOption('${opt}')">${opt}</div>
                `).join('')}
            </div>`;
        }

        container.innerHTML = `
            <div class="quiz-step active">
                <h2 class="quiz-title">${currentStep.question}</h2>
                <div class="input-group">${inputHTML}</div>
                <div class="nav-buttons">
                    ${quizData.step > 0 ? '<button class="btn-back" onclick="prevStep()">BACK</button>' : '<div></div>'}
                    ${currentStep.type === 'input' ? '<button class="btn-next" onclick="nextStep()">NEXT</button>' : ''}
                </div>
            </div>
        `;

        // Auto-focus input
        if (currentStep.type === 'input') {
            setTimeout(() => {
                const inp = document.getElementById('q-input');
                if (inp) inp.focus();
            }, 100);
        }
    }

    function renderCompletion(container) {
        if (quizData.flow === 'scale') {
            container.innerHTML = `
                <div class="quiz-step active" style="text-align: center;">
                    <h2 class="quiz-title">LET'S SCALE.</h2>
                    <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">Book a 1-1 growth scaling call to discuss your roadmap.</p>
                    <a href="https://calendly.com/contact-mynewstaff/mynewstaff-ai-meeting-clone" target="_blank" class="btn-next" style="display: inline-block; text-decoration: none;">BOOK SCALE CALL</a>
                </div>
            `;
            return;
        }

        if (quizData.flow === 'videos') {
            container.innerHTML = `
               <div class="quiz-step active" style="text-align: center;">
                   <h2 class="quiz-title">AI CONTENT GROWTH.</h2>
                   <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">Book an AI content growth call to dominate your niche.</p>
                   <a href="https://calendly.com/contact-mynewstaff/mynewstaff-ai-scaling-clone" target="_blank" class="btn-next" style="display: inline-block; text-decoration: none;">BOOK CONTENT CALL</a>
               </div>
           `;
            return;
        }

        // Default 'qualify' flow completion
        if (quizData.answers['investment'] === 'No') {
            container.innerHTML = `
            <div class="quiz-step active" style="text-align: center;">
                <h2 class="quiz-title">YOU DO NOT QUALIFY YET.</h2>
                <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">Apply again when you are ready to grow your business in this modern age of AI.</p>
            </div>
        `;
        } else {
            container.innerHTML = `
            <div class="quiz-step active" style="text-align: center;">
                <h2 class="quiz-title">YOU QUALIFY.</h2>
                <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">Based on your inputs, you are a prime candidate for the Engine package.</p>
                <a href="https://calendly.com/contact-mynewstaff/30min" target="_blank" class="btn-next" style="display: inline-block; text-decoration: none;">BOOK AUDIT CALL</a>
            </div>
        `;
        }
    }

    // Global Functions for HTML onClick
    window.nextStep = () => {
        const input = document.getElementById('q-input');
        if (!input) return;

        const val = input.value.trim();
        const currentKey = steps[quizData.step].key;

        // Validation for Empty
        if (val === '') {
            input.style.border = '1px solid red';
            return;
        }

        // Specific Validation for Email
        if (currentKey === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
                alert("Please enter a valid email address.");
                input.style.border = '1px solid red';
                return;
            }
        }

        // Reset style if valid
        input.style.border = '';

        quizData.answers[currentKey] = val;
        quizData.step++;
        renderStep();
    };

    window.prevStep = () => {
        if (quizData.step > 0) {
            quizData.step--;
            renderStep();
        }
    };

    window.selectOption = (val) => {
        const currentKey = steps[quizData.step].key;
        quizData.answers[currentKey] = val;

        // Logic for 'Qualify' Flow
        if (quizData.flow === 'qualify' && currentKey === 'investment') {
            const followUpIndex = steps.findIndex(s => s.key === 'investment_amount');
            if (val === 'Yes') {
                if (followUpIndex === -1) {
                    steps.push({
                        type: 'select',
                        key: 'investment_amount',
                        question: "How much are you ready to invest into your business?",
                        options: ["$1k-$5k", "$5k-$15k", "$15k-$25k", "$25k+"]
                    });
                }
            } else {
                if (followUpIndex !== -1) {
                    steps.splice(followUpIndex, 1);
                }
            }
        }

        // Logic for 'Scale' Flow
        if (quizData.flow === 'scale' && currentKey === 'ai_adapted') {
            // Clean up old follow-ups if re-answering
            steps = steps.filter(s => s.key !== 'ai_how' && s.key !== 'ai_why_not');

            if (val === 'Yes') {
                steps.push({ type: 'input', key: 'ai_how', question: "How have you adapted AI?" });
            } else {
                steps.push({ type: 'input', key: 'ai_why_not', question: "Why haven't you adapted AI yet?" });
            }
        }

        // Logic for 'Videos' Flow
        if (quizData.flow === 'videos' && currentKey === 'leads_tried') {
            // Clean up
            steps = steps.filter(s => s.key !== 'leads_how' && s.key !== 'leads_why_not');

            if (val === 'Yes') {
                steps.push({ type: 'input', key: 'leads_how', question: "How?" });
            } else {
                steps.push({ type: 'input', key: 'leads_why_not', question: "Why not?" });
            }
        }

        quizData.step++;
        renderStep();
    };

    function submitLead() {
        // Save to LocalStorage (Simulated Backend)
        const leads = JSON.parse(localStorage.getItem('jesko_leads') || '[]');
        leads.push({
            ...quizData.answers,
            flow: quizData.flow,
            date: new Date().toISOString()
        });
        localStorage.setItem('jesko_leads', JSON.stringify(leads));
        console.log('Lead Captured:', quizData.answers);
    }

});
