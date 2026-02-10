// NV AI (Northern Valley) - Interactive Mockup
document.addEventListener('DOMContentLoaded', () => {
    // ==================== DOM ELEMENTS ====================
    const nvToggle = document.getElementById('nvToggle');
    const nvPanel = document.getElementById('nvPanel');
    const closePanel = document.getElementById('closePanel');
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    const outputScreen = document.getElementById('outputScreen');
    const outputTitle = document.getElementById('outputTitle');
    const outputBody = document.getElementById('outputBody');
    const closeOutput = document.getElementById('closeOutput');
    const generationOverlay = document.getElementById('generationOverlay');
    const generationText = document.getElementById('generationText');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    const toolSearch = document.getElementById('toolSearch');
    const toolCategories = document.getElementById('toolCategories');
    const feedbackBanner = document.getElementById('feedbackBanner');
    const commentsSidebar = document.getElementById('commentsSidebar');
    const commentsList = document.getElementById('commentsList');
    const feedbackList = document.getElementById('feedbackList');
    const docContent = document.getElementById('docContent');

    // ==================== TOOL CATEGORIES DATA ====================
    const categories = [
        {
            id: 'create',
            name: 'Create',
            icon: 'fa-plus-circle',
            iconClass: 'create',
            tools: [
                { id: 'create-anything', name: 'Create Anything', icon: 'fa-wand-magic-sparkles' },
                { id: 'google-forms-quiz', name: 'Google Forms Quiz', icon: 'fa-wpforms', featured: true },
                { id: 'quiz-maker', name: 'Quiz Maker (Docs)', icon: 'fa-question-circle' },
                { id: 'lesson-plan', name: 'Lesson Plan Generator', icon: 'fa-book-open' },
                { id: 'presentation', name: 'Presentation Maker', icon: 'fa-desktop' },
                { id: 'rubric', name: 'Rubric Maker', icon: 'fa-list-check' },
                { id: 'dok', name: 'DOK Questions', icon: 'fa-brain' },
                { id: 'guided-notes', name: 'Guided Notes', icon: 'fa-sticky-note' },
                { id: 'unit-plan', name: 'Unit Plan Generator', icon: 'fa-calendar-alt' }
            ]
        },
        {
            id: 'feedback',
            name: 'Give Feedback',
            icon: 'fa-comment-alt',
            iconClass: 'feedback',
            tools: [
                { id: 'targeted-feedback', name: 'Targeted Feedback', icon: 'fa-bullseye' },
                { id: 'glow-grow', name: 'Glow & Grow', icon: 'fa-seedling' },
                { id: 'rubric-feedback', name: 'Rubric Feedback', icon: 'fa-clipboard-check' },
                { id: 'batch-feedback', name: 'Batch Feedback', icon: 'fa-layer-group' }
            ]
        },
        {
            id: 'levels',
            name: 'Change Levels',
            icon: 'fa-sliders-h',
            iconClass: 'levels',
            tools: [
                { id: 'reading-level', name: 'Change Reading Level', icon: 'fa-book-reader' },
                { id: 'translate', name: 'Translate Text', icon: 'fa-language' }
            ]
        },
        {
            id: 'inspect',
            name: 'Inspect Writing',
            icon: 'fa-search-plus',
            iconClass: 'inspect',
            tools: [
                { id: 'writing-replay', name: 'Writing Replay', icon: 'fa-play-circle' },
                { id: 'ai-detection', name: 'AI Detection', icon: 'fa-robot' }
            ]
        },
        {
            id: 'interventions',
            name: 'Student Interventions',
            icon: 'fa-hands-helping',
            iconClass: 'interventions',
            tools: [
                { id: 'iep', name: 'IEP Goal Generator', icon: 'fa-file-medical' },
                { id: '504', name: '504 Plan Template', icon: 'fa-file-contract' },
                { id: 'mtss', name: 'MTSS Intervention Menu', icon: 'fa-sitemap' }
            ]
        },
        {
            id: 'admin',
            name: 'Admin Tools',
            icon: 'fa-cog',
            iconClass: 'admin',
            tools: [
                { id: 'email', name: 'Email Generator', icon: 'fa-envelope' },
                { id: 'newsletter', name: 'Newsletter Generator', icon: 'fa-newspaper' },
                { id: 'recommendation', name: 'Recommendation Letter', icon: 'fa-award' }
            ]
        }
    ];

    // ==================== TOOL TEMPLATES ====================
    const toolTemplates = {
        'google-forms-quiz': {
            title: 'Google Forms Quiz Generator',
            icon: 'fa-wpforms',
            description: 'Create auto-graded quizzes directly in Google Forms',
            fields: [
                { type: 'info', text: '📝 Generate a complete Google Forms quiz with auto-grading, answer keys, and point values. Perfect for assessments!' },
                { type: 'text', name: 'title', label: 'Quiz Title', placeholder: 'E.g., Chapter 5 Assessment: Photosynthesis' },
                { type: 'textarea', name: 'topic', label: 'Topic / Content to Cover', placeholder: 'Describe what the quiz should cover. You can paste text, standards, or learning objectives here...' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade', 'College'] },
                    { type: 'select', name: 'subject', label: 'Subject', options: ['Math', 'Science', 'English/ELA', 'History', 'Social Studies', 'Foreign Language', 'Health', 'Art', 'Music', 'Computer Science', 'Other'] }
                ]},
                { type: 'row', fields: [
                    { type: 'number', name: 'questions', label: 'Number of Questions', placeholder: '10', value: '10' },
                    { type: 'select', name: 'difficulty', label: 'Difficulty', options: ['Easy', 'Medium', 'Hard', 'Mixed'] }
                ]},
                { type: 'select', name: 'questionTypes', label: 'Question Types', options: ['Multiple Choice Only', 'True/False Only', 'Short Answer Only', 'Multiple Choice + True/False', 'Mixed (All Types)', 'Multiple Choice + Short Answer'] },
                { type: 'row', fields: [
                    { type: 'number', name: 'pointsPerQuestion', label: 'Points per Question', placeholder: '1', value: '1' },
                    { type: 'select', name: 'timeLimit', label: 'Time Limit', options: ['No Limit', '15 minutes', '30 minutes', '45 minutes', '60 minutes', '90 minutes'] }
                ]},
                { type: 'checkbox', name: 'shuffleQuestions', label: 'Shuffle question order for each student', checked: true },
                { type: 'checkbox', name: 'shuffleOptions', label: 'Shuffle answer options', checked: true },
                { type: 'checkbox', name: 'showResults', label: 'Show results immediately after submission', checked: true },
                { type: 'checkbox', name: 'collectEmail', label: 'Collect student email addresses', checked: true }
            ]
        },
        'create-anything': {
            title: 'Create Anything',
            icon: 'fa-wand-magic-sparkles',
            description: 'Generate any teaching material you need',
            fields: [
                { type: 'textarea', name: 'prompt', label: 'What would you like to create?', placeholder: 'E.g., A vocabulary worksheet for 5th grade about the water cycle with 15 words and definitions...' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'select', name: 'subject', label: 'Subject', options: ['Math', 'Science', 'English/ELA', 'History', 'Social Studies', 'Art', 'Music', 'PE', 'Foreign Language', 'Other'] }
                ]}
            ]
        },
        'quiz-maker': {
            title: 'Quiz Maker',
            icon: 'fa-question-circle',
            description: 'Create quizzes with answer keys',
            fields: [
                { type: 'text', name: 'topic', label: 'Quiz Topic', placeholder: 'E.g., Photosynthesis, American Revolution, Fractions' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'number', name: 'questions', label: 'Number of Questions', placeholder: '10', value: '10' }
                ]},
                { type: 'select', name: 'type', label: 'Question Type', options: ['Multiple Choice', 'True/False', 'Short Answer', 'Fill in the Blank', 'Mixed'] },
                { type: 'row', fields: [
                    { type: 'checkbox', name: 'answerKey', label: 'Include Answer Key', checked: true },
                    { type: 'checkbox', name: 'exportForms', label: 'Export to Google Forms' }
                ]}
            ]
        },
        'lesson-plan': {
            title: 'Lesson Plan Generator',
            icon: 'fa-book-open',
            description: 'Generate complete lesson plans',
            fields: [
                { type: 'text', name: 'topic', label: 'Lesson Topic', placeholder: 'E.g., Introduction to Fractions' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'select', name: 'duration', label: 'Duration', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours'] }
                ]},
                { type: 'textarea', name: 'objectives', label: 'Learning Objectives (optional)', placeholder: 'What should students learn by the end of this lesson?' },
                { type: 'textarea', name: 'standards', label: 'Standards Alignment (optional)', placeholder: 'E.g., CCSS.MATH.CONTENT.3.NF.A.1' }
            ]
        },
        'presentation': {
            title: 'Presentation Maker',
            icon: 'fa-desktop',
            description: 'Create slide presentations',
            fields: [
                { type: 'text', name: 'topic', label: 'Presentation Topic', placeholder: 'E.g., The Solar System' },
                { type: 'row', fields: [
                    { type: 'number', name: 'slides', label: 'Number of Slides', placeholder: '10', value: '10' },
                    { type: 'select', name: 'theme', label: 'Theme', options: ['Modern', 'Classic', 'Colorful', 'Minimal', 'Professional', 'Fun/Playful'] }
                ]},
                { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                { type: 'checkbox', name: 'speakerNotes', label: 'Include speaker notes' }
            ]
        },
        'rubric': {
            title: 'Rubric Maker',
            icon: 'fa-list-check',
            description: 'Create assessment rubrics',
            fields: [
                { type: 'text', name: 'assignment', label: 'Assignment Name', placeholder: 'E.g., Persuasive Essay, Science Project' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'select', name: 'scale', label: 'Points Scale', options: ['4 points (1-4)', '5 points (1-5)', '10 points (1-10)', '100 points'] }
                ]},
                { type: 'textarea', name: 'criteria', label: 'Criteria to Assess', placeholder: 'E.g., Organization, Evidence, Grammar, Creativity...' }
            ]
        },
        'dok': {
            title: 'DOK Questions',
            icon: 'fa-brain',
            description: 'Generate Depth of Knowledge questions',
            fields: [
                { type: 'text', name: 'topic', label: 'Topic', placeholder: 'E.g., Civil War Causes, Photosynthesis' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'select', name: 'level', label: 'DOK Level', options: ['Level 1 - Recall', 'Level 2 - Skill/Concept', 'Level 3 - Strategic Thinking', 'Level 4 - Extended Thinking', 'All Levels'] }
                ]},
                { type: 'number', name: 'questions', label: 'Questions per Level', placeholder: '3', value: '3' }
            ]
        },
        'targeted-feedback': {
            title: 'Targeted Feedback',
            icon: 'fa-bullseye',
            description: 'Generate inline feedback comments',
            fields: [
                { type: 'info', text: 'Brisk will analyze the current document and generate targeted feedback as inline comments directly in the document.' },
                { type: 'select', name: 'focus', label: 'Feedback Focus', options: ['Overall Quality', 'Grammar & Mechanics', 'Organization & Structure', 'Evidence & Support', 'Voice & Style', 'Argument Strength'] },
                { type: 'select', name: 'tone', label: 'Feedback Tone', options: ['Encouraging & Supportive', 'Direct & Constructive', 'Detailed & Thorough', 'Brief & Focused'] },
                { type: 'checkbox', name: 'suggestions', label: 'Include specific revision suggestions', checked: true }
            ]
        },
        'glow-grow': {
            title: 'Glow & Grow Feedback',
            icon: 'fa-seedling',
            description: 'Balanced strengths and growth areas',
            fields: [
                { type: 'info', text: 'Generate balanced feedback highlighting strengths (Glows ⭐) and areas for improvement (Grows 🌱).' },
                { type: 'row', fields: [
                    { type: 'number', name: 'glows', label: 'Number of Glows', placeholder: '3', value: '3' },
                    { type: 'number', name: 'grows', label: 'Number of Grows', placeholder: '2', value: '2' }
                ]},
                { type: 'checkbox', name: 'wonderings', label: 'Include Wonderings (questions for reflection)', checked: true },
                { type: 'checkbox', name: 'nextSteps', label: 'Include Next Steps for improvement' }
            ]
        },
        'rubric-feedback': {
            title: 'Rubric-Based Feedback',
            icon: 'fa-clipboard-check',
            description: 'Feedback aligned to rubric criteria',
            fields: [
                { type: 'info', text: 'Upload or paste a rubric to generate feedback aligned with specific criteria.' },
                { type: 'textarea', name: 'rubric', label: 'Paste Rubric Criteria', placeholder: 'Paste your rubric criteria here, or describe the assessment criteria...' },
                { type: 'checkbox', name: 'scores', label: 'Include scores for each criterion', checked: true },
                { type: 'checkbox', name: 'comments', label: 'Include detailed comments per criterion' }
            ]
        },
        'batch-feedback': {
            title: 'Batch Feedback',
            icon: 'fa-layer-group',
            description: 'Feedback for multiple submissions',
            fields: [
                { type: 'info', text: 'Generate personalized feedback for an entire class folder of student work at once.' },
                { type: 'folder', name: 'folder', label: 'Select Folder from Google Drive' },
                { type: 'select', name: 'feedbackType', label: 'Feedback Type', options: ['Targeted Feedback', 'Glow & Grow', 'Rubric-Based', 'Quick Comments'] },
                { type: 'checkbox', name: 'insights', label: 'Generate class-wide insights after completion', checked: true }
            ]
        },
        'reading-level': {
            title: 'Change Reading Level',
            icon: 'fa-book-reader',
            description: 'Adjust text complexity',
            fields: [
                { type: 'info', text: 'Adjust the reading level of the selected text or entire document while preserving meaning.' },
                { type: 'range', name: 'level', label: 'Target Grade Level', min: 1, max: 12, value: 5 },
                { type: 'checkbox', name: 'preserve', label: 'Preserve key vocabulary terms', checked: true },
                { type: 'checkbox', name: 'sideBySide', label: 'Show side-by-side comparison' }
            ]
        },
        'translate': {
            title: 'Translate Text',
            icon: 'fa-language',
            description: 'Translate to 48+ languages',
            fields: [
                { type: 'select', name: 'language', label: 'Target Language', options: ['Spanish', 'French', 'German', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Japanese', 'Korean', 'Arabic', 'Portuguese', 'Russian', 'Vietnamese', 'Tagalog', 'Hindi', 'Italian', 'Polish', 'Ukrainian'] },
                { type: 'checkbox', name: 'sideBySide', label: 'Show side-by-side comparison', checked: true },
                { type: 'checkbox', name: 'preserveFormat', label: 'Preserve original formatting' }
            ]
        },
        'writing-replay': {
            title: 'Writing Replay',
            icon: 'fa-play-circle',
            description: 'Watch the writing process',
            fields: [
                { type: 'info', text: 'Watch a video playback of the student\'s writing process to understand their thought journey and identify potential issues.' },
                { type: 'checkbox', name: 'copyPaste', label: 'Highlight copy/paste actions', checked: true },
                { type: 'checkbox', name: 'pauses', label: 'Show significant pauses (>30 seconds)' },
                { type: 'checkbox', name: 'deletions', label: 'Show major deletions' }
            ]
        },
        'ai-detection': {
            title: 'AI Detection',
            icon: 'fa-robot',
            description: 'Check for AI-generated content',
            fields: [
                { type: 'info', text: 'Analyze the document for potential AI-generated content. Results should be used as one data point among many.' },
                { type: 'checkbox', name: 'detailed', label: 'Show detailed analysis by paragraph', checked: true },
                { type: 'checkbox', name: 'suggestions', label: 'Include teaching suggestions' }
            ]
        },
        'iep': {
            title: 'IEP Goal Generator',
            icon: 'fa-file-medical',
            description: 'Generate IEP goals',
            fields: [
                { type: 'text', name: 'student', label: 'Student Name (optional)', placeholder: 'Student' },
                { type: 'select', name: 'area', label: 'Goal Area', options: ['Reading Comprehension', 'Reading Fluency', 'Written Expression', 'Math Calculation', 'Math Problem Solving', 'Behavior', 'Social Skills', 'Communication', 'Motor Skills', 'Executive Function'] },
                { type: 'textarea', name: 'current', label: 'Current Performance Level', placeholder: 'Describe current abilities and baseline data...' },
                { type: 'number', name: 'goals', label: 'Number of Goals', placeholder: '3', value: '3' }
            ]
        },
        '504': {
            title: '504 Plan Template',
            icon: 'fa-file-contract',
            description: 'Create 504 accommodation plans',
            fields: [
                { type: 'text', name: 'student', label: 'Student Name (optional)', placeholder: 'Student' },
                { type: 'select', name: 'disability', label: 'Primary Condition', options: ['ADHD', 'Anxiety Disorder', 'Depression', 'Dyslexia', 'Dysgraphia', 'Dyscalculia', 'Physical Disability', 'Chronic Health Condition', 'Hearing Impairment', 'Visual Impairment', 'Other'] },
                { type: 'textarea', name: 'needs', label: 'Specific Needs & Challenges', placeholder: 'Describe the student\'s specific challenges and accommodation needs...' }
            ]
        },
        'mtss': {
            title: 'MTSS Intervention Menu',
            icon: 'fa-sitemap',
            description: 'Multi-tiered intervention strategies',
            fields: [
                { type: 'select', name: 'tier', label: 'Intervention Tier', options: ['Tier 1 - Universal (All Students)', 'Tier 2 - Targeted (Small Group)', 'Tier 3 - Intensive (Individual)'] },
                { type: 'select', name: 'area', label: 'Focus Area', options: ['Reading', 'Math', 'Writing', 'Behavior', 'Social-Emotional'] },
                { type: 'select', name: 'grade', label: 'Grade Band', options: ['K-2', '3-5', '6-8', '9-12'] }
            ]
        },
        'email': {
            title: 'Email Generator',
            icon: 'fa-envelope',
            description: 'Draft professional emails',
            fields: [
                { type: 'select', name: 'audience', label: 'Recipient', options: ['Parents/Guardians', 'Students', 'Colleagues', 'Administration', 'Other'] },
                { type: 'text', name: 'subject', label: 'Email Subject', placeholder: 'E.g., Upcoming Field Trip, Progress Update' },
                { type: 'textarea', name: 'content', label: 'Key Points to Include', placeholder: 'What information needs to be communicated?' },
                { type: 'select', name: 'tone', label: 'Tone', options: ['Professional', 'Friendly', 'Formal', 'Urgent'] }
            ]
        },
        'newsletter': {
            title: 'Newsletter Generator',
            icon: 'fa-newspaper',
            description: 'Create class newsletters',
            fields: [
                { type: 'text', name: 'title', label: 'Newsletter Title', placeholder: 'E.g., Weekly Update, Monthly Highlights' },
                { type: 'textarea', name: 'topics', label: 'Topics to Include', placeholder: 'List the topics, events, and announcements to include...' },
                { type: 'select', name: 'audience', label: 'Audience', options: ['Parents/Guardians', 'Students', 'School Community'] }
            ]
        },
        'recommendation': {
            title: 'Recommendation Letter',
            icon: 'fa-award',
            description: 'Write recommendation letters',
            fields: [
                { type: 'text', name: 'student', label: 'Student Name', placeholder: 'Student\'s full name' },
                { type: 'select', name: 'purpose', label: 'Purpose', options: ['College Application', 'Scholarship', 'Job/Internship', 'Award Nomination', 'Program Application'] },
                { type: 'textarea', name: 'achievements', label: 'Key Achievements & Qualities', placeholder: 'List notable achievements, strengths, and qualities...' },
                { type: 'text', name: 'relationship', label: 'Your Relationship', placeholder: 'E.g., English Teacher for 2 years' }
            ]
        },
        'guided-notes': {
            title: 'Guided Notes',
            icon: 'fa-sticky-note',
            description: 'Create structured note templates',
            fields: [
                { type: 'text', name: 'topic', label: 'Topic', placeholder: 'E.g., Cell Division, World War II' },
                { type: 'select', name: 'grade', label: 'Grade Level', options: ['3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                { type: 'select', name: 'format', label: 'Format', options: ['Fill-in-the-blank', 'Cornell Notes', 'Outline', 'Graphic Organizer'] }
            ]
        },
        'unit-plan': {
            title: 'Unit Plan Generator',
            icon: 'fa-calendar-alt',
            description: 'Create comprehensive unit plans',
            fields: [
                { type: 'text', name: 'unit', label: 'Unit Topic', placeholder: 'E.g., The American Revolution' },
                { type: 'row', fields: [
                    { type: 'select', name: 'grade', label: 'Grade Level', options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
                    { type: 'select', name: 'duration', label: 'Duration', options: ['1 week', '2 weeks', '3 weeks', '4 weeks', '6 weeks'] }
                ]},
                { type: 'textarea', name: 'standards', label: 'Standards to Address', placeholder: 'List the standards this unit should cover...' }
            ]
        }
    };


    // ==================== GENERATED OUTPUT TEMPLATES ====================
    const outputTemplates = {
        'google-forms-quiz': (data) => `
            <div class="output-content" style="padding: 0; background: transparent; box-shadow: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 18px; color: var(--gray-800);">
                        <i class="fab fa-google" style="color: #4285f4; margin-right: 8px;"></i>
                        Google Forms Quiz Preview
                    </h2>
                    <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                        ✓ Auto-grading enabled
                    </span>
                </div>
                
                <div class="gforms-preview">
                    <div class="gforms-header">
                        <h2>${data.title || 'Chapter 5 Assessment: Photosynthesis'}</h2>
                        <p>${data.subject || 'Science'} • ${data.grade || '7th Grade'} • ${data.questions || '10'} Questions • ${(data.questions || 10) * (data.pointsPerQuestion || 1)} Points Total</p>
                        <div class="gforms-progress">
                            <div class="gforms-progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="gforms-body">
                        <div class="gforms-question required">
                            <div class="gforms-q-number">Question 1 of ${data.questions || '10'} • 1 point</div>
                            <div class="gforms-q-title">What is the primary function of photosynthesis in plants?</div>
                            <div class="gforms-options">
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">A) To release oxygen into the atmosphere</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">B) To convert light energy into chemical energy (glucose)</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">C) To absorb water from the soil</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">D) To transport nutrients throughout the plant</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="gforms-question required">
                            <div class="gforms-q-number">Question 2 of ${data.questions || '10'} • 1 point</div>
                            <div class="gforms-q-title">Which organelle is responsible for carrying out photosynthesis?</div>
                            <div class="gforms-options">
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">A) Mitochondria</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">B) Chloroplast</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">C) Nucleus</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">D) Ribosome</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="gforms-question required">
                            <div class="gforms-q-number">Question 3 of ${data.questions || '10'} • 1 point</div>
                            <div class="gforms-q-title">True or False: Photosynthesis can occur without sunlight.</div>
                            <div class="gforms-options">
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">True</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected'); this.parentElement.querySelectorAll('.gforms-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                    <div class="gforms-radio"></div>
                                    <span class="gforms-option-text">False</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="gforms-question required">
                            <div class="gforms-q-number">Question 4 of ${data.questions || '10'} • 1 point</div>
                            <div class="gforms-q-title">What are the products of photosynthesis? (Select all that apply)</div>
                            <div class="gforms-options">
                                <label class="gforms-option" onclick="this.classList.toggle('selected')">
                                    <div class="gforms-checkbox"></div>
                                    <span class="gforms-option-text">Glucose (C₆H₁₂O₆)</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected')">
                                    <div class="gforms-checkbox"></div>
                                    <span class="gforms-option-text">Oxygen (O₂)</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected')">
                                    <div class="gforms-checkbox"></div>
                                    <span class="gforms-option-text">Carbon Dioxide (CO₂)</span>
                                </label>
                                <label class="gforms-option" onclick="this.classList.toggle('selected')">
                                    <div class="gforms-checkbox"></div>
                                    <span class="gforms-option-text">Water (H₂O)</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="gforms-question">
                            <div class="gforms-q-number">Question 5 of ${data.questions || '10'} • 1 point</div>
                            <div class="gforms-q-title">In your own words, explain why photosynthesis is important for life on Earth.</div>
                            <textarea class="gforms-paragraph" placeholder="Your answer"></textarea>
                        </div>
                        
                        <div style="text-align: center; padding: 20px; color: var(--gray-500); font-size: 14px;">
                            <i class="fas fa-ellipsis-h" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                            + ${Math.max(0, (data.questions || 10) - 5)} more questions
                        </div>
                    </div>
                    
                    <div class="gforms-footer">
                        <button class="gforms-clear">Clear form</button>
                        <button class="gforms-submit">Submit</button>
                    </div>
                </div>
                
                <div class="answer-key">
                    <h3><i class="fas fa-key"></i> Answer Key (Teacher View)</h3>
                    <div class="answer-key-item">
                        <div class="answer-key-num">1</div>
                        <div class="answer-key-content">
                            <strong>B) To convert light energy into chemical energy (glucose)</strong>
                            <p>Photosynthesis converts light energy into glucose, which plants use for energy and growth.</p>
                        </div>
                    </div>
                    <div class="answer-key-item">
                        <div class="answer-key-num">2</div>
                        <div class="answer-key-content">
                            <strong>B) Chloroplast</strong>
                            <p>Chloroplasts contain chlorophyll, the green pigment that captures light energy.</p>
                        </div>
                    </div>
                    <div class="answer-key-item">
                        <div class="answer-key-num">3</div>
                        <div class="answer-key-content">
                            <strong>False</strong>
                            <p>Light is essential for the light-dependent reactions of photosynthesis.</p>
                        </div>
                    </div>
                    <div class="answer-key-item">
                        <div class="answer-key-num">4</div>
                        <div class="answer-key-content">
                            <strong>Glucose (C₆H₁₂O₆) AND Oxygen (O₂)</strong>
                            <p>The equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
                        </div>
                    </div>
                    <div class="answer-key-item">
                        <div class="answer-key-num">5</div>
                        <div class="answer-key-content">
                            <strong>Short Answer - Sample Response</strong>
                            <p>Look for: produces oxygen, creates food/energy, base of food chain, removes CO₂</p>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <h3 style="font-size: 14px; color: var(--gray-700); margin-bottom: 12px;">
                        <i class="fas fa-cog" style="margin-right: 8px;"></i>Quiz Settings
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
                        <div style="background: var(--gray-50); padding: 10px; border-radius: 6px;">
                            <i class="fas fa-check" style="color: var(--success); margin-right: 6px;"></i>
                            Auto-grading enabled
                        </div>
                        <div style="background: var(--gray-50); padding: 10px; border-radius: 6px;">
                            <i class="fas fa-check" style="color: var(--success); margin-right: 6px;"></i>
                            ${data.shuffleQuestions ? 'Questions shuffled' : 'Fixed question order'}
                        </div>
                        <div style="background: var(--gray-50); padding: 10px; border-radius: 6px;">
                            <i class="fas fa-check" style="color: var(--success); margin-right: 6px;"></i>
                            ${data.showResults ? 'Immediate results' : 'Results after review'}
                        </div>
                        <div style="background: var(--gray-50); padding: 10px; border-radius: 6px;">
                            <i class="fas fa-clock" style="color: var(--primary); margin-right: 6px;"></i>
                            ${data.timeLimit || 'No time limit'}
                        </div>
                    </div>
                </div>
                
                <div class="export-options">
                    <div class="export-option selected" onclick="document.querySelectorAll('.export-option').forEach(e=>e.classList.remove('selected')); this.classList.add('selected')">
                        <i class="fab fa-google"></i>
                        <span>Google Forms</span>
                    </div>
                    <div class="export-option" onclick="document.querySelectorAll('.export-option').forEach(e=>e.classList.remove('selected')); this.classList.add('selected')">
                        <i class="fas fa-file-word"></i>
                        <span>Google Docs</span>
                    </div>
                    <div class="export-option" onclick="document.querySelectorAll('.export-option').forEach(e=>e.classList.remove('selected')); this.classList.add('selected')">
                        <i class="fas fa-file-pdf"></i>
                        <span>PDF</span>
                    </div>
                </div>
            </div>
        `,
        
        'quiz-maker': (data) => `
            <div class="output-content">
                <h1>📝 Quiz: ${data.topic || 'Photosynthesis'}</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Grade: ${data.grade || '7th Grade'} | ${data.questions || '10'} Questions | ${data.type || 'Multiple Choice'}</p>
                
                <div class="quiz-question">
                    <strong>1. What is the primary purpose of photosynthesis?</strong>
                    <label class="quiz-option"><input type="radio" name="q1"> A) To produce oxygen for animals</label>
                    <label class="quiz-option correct"><input type="radio" name="q1"> B) To convert light energy into chemical energy</label>
                    <label class="quiz-option"><input type="radio" name="q1"> C) To absorb water from the soil</label>
                    <label class="quiz-option"><input type="radio" name="q1"> D) To release carbon dioxide</label>
                </div>
                
                <div class="quiz-question">
                    <strong>2. Where does photosynthesis primarily occur in plants?</strong>
                    <label class="quiz-option"><input type="radio" name="q2"> A) Roots</label>
                    <label class="quiz-option"><input type="radio" name="q2"> B) Stems</label>
                    <label class="quiz-option correct"><input type="radio" name="q2"> C) Leaves (chloroplasts)</label>
                    <label class="quiz-option"><input type="radio" name="q2"> D) Flowers</label>
                </div>
                
                <div class="quiz-question">
                    <strong>3. What are the two main stages of photosynthesis?</strong>
                    <label class="quiz-option"><input type="radio" name="q3"> A) Absorption and reflection</label>
                    <label class="quiz-option correct"><input type="radio" name="q3"> B) Light-dependent and light-independent reactions</label>
                    <label class="quiz-option"><input type="radio" name="q3"> C) Respiration and transpiration</label>
                    <label class="quiz-option"><input type="radio" name="q3"> D) Mitosis and meiosis</label>
                </div>
                
                <div class="quiz-question">
                    <strong>4. Which molecule captures light energy during photosynthesis?</strong>
                    <label class="quiz-option"><input type="radio" name="q4"> A) Glucose</label>
                    <label class="quiz-option"><input type="radio" name="q4"> B) ATP</label>
                    <label class="quiz-option correct"><input type="radio" name="q4"> C) Chlorophyll</label>
                    <label class="quiz-option"><input type="radio" name="q4"> D) Oxygen</label>
                </div>
                
                <div style="background: #d1fae5; padding: 16px; border-radius: 8px; margin-top: 20px;">
                    <strong style="color: #059669;">📋 Answer Key</strong>
                    <p style="margin: 8px 0 0; color: #065f46;">1. B | 2. C | 3. B | 4. C | 5. A | 6. D | 7. B | 8. C | 9. A | 10. B</p>
                </div>
            </div>
        `,
        
        'lesson-plan': (data) => `
            <div class="output-content">
                <h1>📚 Lesson Plan: ${data.topic || 'Introduction to Fractions'}</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Grade: ${data.grade || '3rd Grade'} | Duration: ${data.duration || '45 minutes'}</p>
                
                <div class="lesson-section">
                    <h4>🎯 Learning Objectives</h4>
                    <ul>
                        <li>Students will understand fractions as parts of a whole</li>
                        <li>Students will identify numerators and denominators</li>
                        <li>Students will represent fractions using visual models</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h4>📦 Materials Needed</h4>
                    <ul>
                        <li>Fraction circles manipulatives</li>
                        <li>Whiteboard and markers</li>
                        <li>Student worksheets</li>
                        <li>Construction paper for activities</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h4>📋 Lesson Procedure</h4>
                    
                    <h3>Warm-Up <span class="time-badge">5 min</span></h3>
                    <p>Begin with a pizza sharing scenario: "If we have one pizza and need to share it equally among 4 friends, how would we divide it?"</p>
                    
                    <h3>Direct Instruction <span class="time-badge">15 min</span></h3>
                    <p>Introduce fraction vocabulary (numerator, denominator, whole). Use visual models to demonstrate 1/2, 1/3, 1/4. Show how the denominator tells us how many equal parts, and the numerator tells us how many parts we have.</p>
                    
                    <h3>Guided Practice <span class="time-badge">15 min</span></h3>
                    <p>Students work with fraction circles to create and identify fractions. Teacher circulates to provide support and check understanding.</p>
                    
                    <h3>Independent Practice <span class="time-badge">10 min</span></h3>
                    <p>Students complete worksheet identifying and drawing fractions. Early finishers can work on extension problems.</p>
                </div>
                
                <div class="lesson-section">
                    <h4>✅ Assessment</h4>
                    <p>Exit ticket: Students draw and label 3 different fractions. Check for correct numerator/denominator placement and accurate visual representation.</p>
                </div>
            </div>
        `,
        
        'rubric': (data) => `
            <div class="output-content">
                <h1>📊 Rubric: ${data.assignment || 'Persuasive Essay'}</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Grade: ${data.grade || '8th Grade'} | Scale: ${data.scale || '4 points (1-4)'}</p>
                
                <table class="rubric-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>4 - Exceeds</th>
                            <th>3 - Meets</th>
                            <th>2 - Approaching</th>
                            <th>1 - Beginning</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Thesis & Argument</strong></td>
                            <td>Clear, compelling thesis with sophisticated argument</td>
                            <td>Clear thesis with well-developed argument</td>
                            <td>Thesis present but argument needs development</td>
                            <td>Thesis unclear or missing</td>
                        </tr>
                        <tr>
                            <td><strong>Evidence & Support</strong></td>
                            <td>Multiple strong, relevant sources expertly integrated</td>
                            <td>Good evidence that supports claims effectively</td>
                            <td>Some evidence but not always relevant</td>
                            <td>Little or no supporting evidence</td>
                        </tr>
                        <tr>
                            <td><strong>Organization</strong></td>
                            <td>Exceptional flow with seamless transitions</td>
                            <td>Logical organization with clear transitions</td>
                            <td>Some organization but transitions weak</td>
                            <td>Disorganized, hard to follow</td>
                        </tr>
                        <tr>
                            <td><strong>Grammar & Mechanics</strong></td>
                            <td>Error-free with sophisticated sentence variety</td>
                            <td>Few errors, good sentence variety</td>
                            <td>Several errors that distract reader</td>
                            <td>Many errors impede understanding</td>
                        </tr>
                    </tbody>
                </table>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-top: 20px;">
                    <strong>Total Points: ___ / 16</strong>
                    <p style="margin: 8px 0 0; font-size: 13px; color: var(--gray-600);">A: 14-16 | B: 12-13 | C: 10-11 | D: 8-9 | F: Below 8</p>
                </div>
            </div>
        `,
        
        'glow-grow': (data) => `
            <div class="output-content">
                <h1>✨ Feedback: Glow & Grow</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Student Essay: "The Impact of Climate Change on Ocean Ecosystems"</p>
                
                <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #10b981;">
                    <h3 style="color: #059669; margin-bottom: 12px;">⭐ Glows (Strengths)</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;"><strong>Strong thesis statement</strong> - Your introduction clearly states your argument about climate change impacts on oceans. This gives readers a clear roadmap.</li>
                        <li style="margin-bottom: 8px;"><strong>Excellent use of scientific evidence</strong> - The statistics about ocean acidification (30% increase) and specific examples like the Great Barrier Reef strengthen your argument significantly.</li>
                        <li style="margin-bottom: 8px;"><strong>Good paragraph structure</strong> - Each body paragraph focuses on one main idea with clear topic sentences.</li>
                    </ul>
                </div>
                
                <div style="background: #fff7ed; padding: 20px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #f97316;">
                    <h3 style="color: #ea580c; margin-bottom: 12px;">🌱 Grows (Areas for Improvement)</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;"><strong>Add transition words</strong> - Consider using transitions like "Furthermore," "Additionally," or "As a result" between paragraphs to improve flow.</li>
                        <li style="margin-bottom: 8px;"><strong>Expand your conclusion</strong> - Your conclusion restates the main points but could be stronger with a call to action or discussion of future implications.</li>
                    </ul>
                </div>
                
                <div style="background: #ede9fe; padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                    <h3 style="color: #7c3aed; margin-bottom: 12px;">🤔 Wonderings</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">What solutions do you think would be most effective in addressing ocean acidification?</li>
                        <li style="margin-bottom: 8px;">How might the migration of fish species affect human communities that depend on fishing?</li>
                    </ul>
                </div>
            </div>
        `,
        
        'targeted-feedback': (data) => `
            <div class="output-content">
                <h1>🎯 Targeted Feedback Generated</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">5 comments added to document | Focus: ${data.focus || 'Overall Quality'}</p>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #10b981;">
                    <strong style="color: #059669;">Paragraph 1 - Strength</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">"Excellent hook! Your opening sentence immediately engages the reader and establishes the importance of your topic."</p>
                </div>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #f97316;">
                    <strong style="color: #ea580c;">Paragraph 2 - Suggestion</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">"Consider adding a transition sentence here to connect this paragraph to your introduction. Try: 'One of the most significant impacts is...'"</p>
                </div>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #10b981;">
                    <strong style="color: #059669;">Paragraph 3 - Strength</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">"Great use of specific evidence! The Great Barrier Reef example makes your argument concrete and relatable."</p>
                </div>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #f97316;">
                    <strong style="color: #ea580c;">Paragraph 4 - Suggestion</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">"This paragraph could be strengthened with a specific statistic about fish migration patterns. Consider researching recent studies."</p>
                </div>
                
                <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; border-left: 3px solid #f97316;">
                    <strong style="color: #ea580c;">Conclusion - Suggestion</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">"Your conclusion summarizes well, but consider ending with a thought-provoking question or call to action to leave a lasting impression."</p>
                </div>
            </div>
        `,
        
        'reading-level': (data) => `
            <div class="output-content">
                <h1>📖 Reading Level Adjusted</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Original: Grade 9 → Target: Grade ${data.level || 5}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h3 style="color: var(--gray-500); font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">Original Text</h3>
                        <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
                            <p>Ocean acidification, caused by the absorption of CO2, is making it harder for shellfish and coral to build their calcium carbonate shells and skeletons. This has cascading effects throughout the food chain.</p>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: var(--primary); font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">Simplified Text</h3>
                        <div style="background: #ede9fe; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
                            <p>The ocean is becoming more acidic because it absorbs a gas called CO2. This makes it hard for sea animals like clams and coral to build their shells. When this happens, it affects many other animals in the ocean too.</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: #dbeafe; padding: 16px; border-radius: 8px; margin-top: 20px;">
                    <strong style="color: #1d4ed8;">📊 Readability Analysis</strong>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 12px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #1d4ed8;">5.2</div>
                            <div style="font-size: 12px; color: var(--gray-600);">New Grade Level</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #1d4ed8;">12</div>
                            <div style="font-size: 12px; color: var(--gray-600);">Avg Words/Sentence</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #1d4ed8;">95%</div>
                            <div style="font-size: 12px; color: var(--gray-600);">Common Words</div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'translate': (data) => `
            <div class="output-content">
                <h1>🌍 Translation Complete</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">English → ${data.language || 'Spanish'}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h3 style="color: var(--gray-500); font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">🇺🇸 English (Original)</h3>
                        <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.7;">
                            <p>Climate change is one of the most pressing issues facing our planet today. The effects of rising temperatures are particularly evident in our oceans, where marine ecosystems are experiencing unprecedented changes.</p>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: var(--primary); font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">🇪🇸 Spanish (Translated)</h3>
                        <div style="background: #ede9fe; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.7;">
                            <p>El cambio climático es uno de los problemas más urgentes que enfrenta nuestro planeta hoy en día. Los efectos del aumento de las temperaturas son particularmente evidentes en nuestros océanos, donde los ecosistemas marinos están experimentando cambios sin precedentes.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'iep': (data) => `
            <div class="output-content">
                <h1>📋 IEP Goals: ${data.area || 'Reading Comprehension'}</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Student: ${data.student || 'Student'} | Generated: ${new Date().toLocaleDateString()}</p>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="margin-bottom: 12px;">Goal 1: Reading Fluency</h3>
                    <p style="margin-bottom: 12px;">By the end of the IEP period, <strong>${data.student || 'the student'}</strong> will improve oral reading fluency from the current baseline of 65 words correct per minute (WCPM) to 90 WCPM on grade-level passages, as measured by curriculum-based measurement probes, with 95% accuracy in 4 out of 5 trials.</p>
                    <div style="background: white; padding: 12px; border-radius: 6px;">
                        <strong style="font-size: 12px; color: var(--gray-500);">BENCHMARKS:</strong>
                        <ul style="margin: 8px 0 0; padding-left: 20px; font-size: 13px;">
                            <li>Q1: 72 WCPM</li>
                            <li>Q2: 78 WCPM</li>
                            <li>Q3: 84 WCPM</li>
                            <li>Q4: 90 WCPM</li>
                        </ul>
                    </div>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="margin-bottom: 12px;">Goal 2: Reading Comprehension</h3>
                    <p style="margin-bottom: 12px;">By the end of the IEP period, <strong>${data.student || 'the student'}</strong> will answer comprehension questions about grade-level text with 80% accuracy, improving from the current baseline of 55%, as measured by teacher-created assessments and standardized reading comprehension measures.</p>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <h3 style="margin-bottom: 12px;">Goal 3: Vocabulary Development</h3>
                    <p>By the end of the IEP period, <strong>${data.student || 'the student'}</strong> will demonstrate understanding of 15 new grade-level vocabulary words per month by correctly using them in written sentences with 85% accuracy.</p>
                </div>
            </div>
        `,
        
        'create-anything': (data) => `
            <div class="output-content">
                <h1>✨ Custom Content Generated</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Grade: ${data.grade || '5th Grade'} | Subject: ${data.subject || 'Science'}</p>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <p style="font-size: 14px; line-height: 1.7;">Your custom teaching material has been generated based on your specifications. The content is tailored to your grade level and subject area, ready for classroom use.</p>
                    
                    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--gray-200);">
                        <p style="font-style: italic; color: var(--gray-600);">"${data.prompt || 'A vocabulary worksheet for 5th grade about the water cycle with 15 words and definitions'}"</p>
                    </div>
                </div>
            </div>
        `,
        
        'default': (data, toolId) => `
            <div class="output-content">
                <h1>✅ Content Generated Successfully</h1>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Tool: ${toolTemplates[toolId]?.title || 'Brisk Tool'}</p>
                
                <div style="background: #d1fae5; padding: 20px; border-radius: 8px; text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: #059669; margin-bottom: 12px;"></i>
                    <p style="font-size: 16px; color: #065f46;">Your content has been generated and is ready to use!</p>
                </div>
            </div>
        `
    };


    // ==================== FEEDBACK DATA ====================
    const feedbackData = [
        { type: 'glow', title: 'Strong thesis statement', text: 'Clear introduction of the main argument about climate change impacts.' },
        { type: 'glow', title: 'Excellent use of evidence', text: 'Scientific examples and statistics support claims effectively.' },
        { type: 'glow', title: 'Good paragraph structure', text: 'Each paragraph focuses on one main idea with clear topic sentences.' },
        { type: 'grow', title: 'Add transition words', text: 'Consider using transitions between paragraphs for better flow.' },
        { type: 'grow', title: 'Expand conclusion', text: 'Include a call to action or discuss future implications.' }
    ];

    // ==================== INITIALIZE UI ====================
    function initializeUI() {
        renderToolCategories();
        renderFeedbackList();
        setupEventListeners();
    }

    function renderToolCategories() {
        toolCategories.innerHTML = categories.map((cat, index) => `
            <div class="category ${index === 0 ? 'open' : ''}" data-category="${cat.id}">
                <div class="category-header">
                    <div class="category-title">
                        <div class="category-icon ${cat.iconClass}">
                            <i class="fas ${cat.icon}"></i>
                        </div>
                        <span>${cat.name}</span>
                    </div>
                    <i class="fas fa-chevron-down category-arrow"></i>
                </div>
                <div class="category-tools ${index === 0 ? 'expanded' : ''}">
                    ${cat.tools.map(tool => `
                        <button class="tool-btn ${tool.featured ? 'featured' : ''}" data-tool="${tool.id}">
                            <i class="fas ${tool.icon}"></i>
                            <span>${tool.name}</span>
                            ${tool.featured ? '<span class="featured-badge">NEW</span>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderFeedbackList() {
        feedbackList.innerHTML = feedbackData.map(item => `
            <div class="feedback-item ${item.type}">
                <div class="feedback-icon">
                    <i class="fas ${item.type === 'glow' ? 'fa-star' : 'fa-seedling'}"></i>
                </div>
                <div class="feedback-content">
                    <strong>${item.title}</strong>
                    <p>${item.text}</p>
                </div>
            </div>
        `).join('');
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Toggle Panel
        nvToggle.addEventListener('click', () => {
            nvPanel.classList.add('active');
            nvToggle.classList.add('hidden');
        });

        closePanel.addEventListener('click', () => {
            nvPanel.classList.remove('active');
            nvToggle.classList.remove('hidden');
        });

        // Tab Navigation
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${targetTab}-tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });

        // Category Accordion
        toolCategories.addEventListener('click', (e) => {
            const header = e.target.closest('.category-header');
            if (header) {
                const category = header.parentElement;
                const tools = category.querySelector('.category-tools');
                
                document.querySelectorAll('.category').forEach(cat => {
                    if (cat !== category) {
                        cat.classList.remove('open');
                        cat.querySelector('.category-tools').classList.remove('expanded');
                    }
                });
                
                category.classList.toggle('open');
                tools.classList.toggle('expanded');
            }
        });

        // Tool Buttons
        toolCategories.addEventListener('click', (e) => {
            const toolBtn = e.target.closest('.tool-btn');
            if (toolBtn) {
                openToolModal(toolBtn.dataset.tool);
            }
        });

        // Recent Tools
        document.querySelectorAll('.recent-tool').forEach(btn => {
            btn.addEventListener('click', () => openToolModal(btn.dataset.tool));
        });

        // Tool Search
        toolSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.tool-btn').forEach(btn => {
                const toolName = btn.querySelector('span').textContent.toLowerCase();
                const category = btn.closest('.category');
                const categoryTools = btn.closest('.category-tools');
                
                if (toolName.includes(searchTerm)) {
                    btn.style.display = 'flex';
                    if (searchTerm) {
                        category.classList.add('open');
                        categoryTools.classList.add('expanded');
                    }
                } else {
                    btn.style.display = searchTerm ? 'none' : 'flex';
                }
            });
        });

        // Close Modal
        closeModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });

        // Close Output
        closeOutput.addEventListener('click', () => outputScreen.classList.remove('active'));
        document.getElementById('regenerateBtn').addEventListener('click', () => {
            outputScreen.classList.remove('active');
            setTimeout(() => simulateGeneration(currentToolId), 300);
        });
        document.getElementById('copyOutputBtn').addEventListener('click', () => {
            showToast('Copied to clipboard!', 'success');
        });
        document.getElementById('exportOutputBtn').addEventListener('click', () => {
            if (currentToolId === 'google-forms-quiz') {
                showToast('Opening Google Forms...', 'info');
                setTimeout(() => {
                    showToast('Quiz created in Google Forms!', 'success');
                    outputScreen.classList.remove('active');
                }, 1500);
            } else {
                showToast('Exported to Google Docs!', 'success');
                setTimeout(() => outputScreen.classList.remove('active'), 1000);
            }
        });

        // Feedback Actions
        document.getElementById('shareFeedbackBtn')?.addEventListener('click', () => {
            showToast('Feedback shared with student!', 'success');
        });
        document.getElementById('editFeedbackBtn')?.addEventListener('click', () => {
            showToast('Opening feedback editor...', 'info');
        });
        document.getElementById('generateResourcesBtn')?.addEventListener('click', () => {
            simulateGeneration('resources');
        });

        // Boost Activities
        document.querySelectorAll('.boost-activity').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast(`Starting ${btn.querySelector('strong').textContent}...`, 'info');
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (outputScreen.classList.contains('active')) {
                    outputScreen.classList.remove('active');
                } else if (modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                } else if (nvPanel.classList.contains('active')) {
                    nvPanel.classList.remove('active');
                    nvToggle.classList.remove('hidden');
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                nvPanel.classList.toggle('active');
                nvToggle.classList.toggle('hidden');
            }
        });
    }

    // ==================== MODAL FUNCTIONS ====================
    let currentToolId = null;

    function openToolModal(toolId) {
        currentToolId = toolId;
        const template = toolTemplates[toolId];
        if (!template) return;

        modalTitle.textContent = template.title;
        modalIcon.className = `fas ${template.icon}`;
        modalBody.innerHTML = generateModalContent(template);
        modalOverlay.classList.add('active');

        // Add generate button listener
        const generateBtn = modalBody.querySelector('.generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
                simulateGeneration(toolId);
            });
        }
    }

    function generateModalContent(template) {
        let html = '';
        
        if (template.description) {
            html += `<p style="color: var(--gray-500); margin-bottom: 16px; font-size: 14px;">${template.description}</p>`;
        }
        
        template.fields.forEach(field => {
            if (field.type === 'row') {
                html += '<div class="form-row">';
                field.fields.forEach(subField => {
                    html += generateField(subField);
                });
                html += '</div>';
            } else {
                html += generateField(field);
            }
        });

        html += `
            <button class="action-btn primary generate-btn">
                <i class="fas fa-magic"></i> Generate
            </button>
        `;

        return html;
    }

    function generateField(field) {
        let html = '<div class="form-group">';
        
        switch (field.type) {
            case 'text':
                html += `
                    <label for="${field.name}">${field.label}</label>
                    <input type="text" id="${field.name}" name="${field.name}" placeholder="${field.placeholder || ''}" value="${field.value || ''}">
                `;
                break;
            case 'number':
                html += `
                    <label for="${field.name}">${field.label}</label>
                    <input type="number" id="${field.name}" name="${field.name}" placeholder="${field.placeholder || ''}" value="${field.value || ''}" min="1">
                `;
                break;
            case 'textarea':
                html += `
                    <label for="${field.name}">${field.label}</label>
                    <textarea id="${field.name}" name="${field.name}" placeholder="${field.placeholder || ''}">${field.value || ''}</textarea>
                `;
                break;
            case 'select':
                html += `
                    <label for="${field.name}">${field.label}</label>
                    <select id="${field.name}" name="${field.name}">
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                `;
                break;
            case 'checkbox':
                html += `
                    <label class="checkbox-group">
                        <input type="checkbox" id="${field.name}" name="${field.name}" ${field.checked ? 'checked' : ''}>
                        ${field.label}
                    </label>
                `;
                break;
            case 'range':
                html += `
                    <label for="${field.name}">${field.label}: <strong id="${field.name}Value">${field.value}</strong></label>
                    <input type="range" id="${field.name}" name="${field.name}" min="${field.min}" max="${field.max}" value="${field.value}" 
                        style="width: 100%; margin-top: 8px;" oninput="document.getElementById('${field.name}Value').textContent = this.value">
                `;
                break;
            case 'folder':
                html += `
                    <label>${field.label}</label>
                    <button type="button" class="action-btn secondary" style="margin-top: 4px;" onclick="showToast('Google Drive picker would open here', 'info')">
                        <i class="fas fa-folder-open"></i> Browse Google Drive
                    </button>
                `;
                break;
            case 'info':
                html += `
                    <div class="form-info">
                        <i class="fas fa-info-circle"></i>
                        <span>${field.text}</span>
                    </div>
                `;
                break;
        }
        
        html += '</div>';
        return html;
    }

    // ==================== GENERATION SIMULATION ====================
    function simulateGeneration(toolId) {
        generationOverlay.classList.add('active');
        
        const steps = ['step1', 'step2', 'step3'];
        const texts = ['Reading content...', 'Processing with AI...', 'Generating output...'];
        let currentStep = 0;

        // Reset steps
        steps.forEach((step, i) => {
            const el = document.getElementById(step);
            el.classList.remove('active', 'complete');
            el.innerHTML = `<i class="fas fa-circle"></i> ${texts[i].replace('...', '')}`;
        });

        // Animate steps
        function nextStep() {
            if (currentStep > 0) {
                const prevEl = document.getElementById(steps[currentStep - 1]);
                prevEl.classList.remove('active');
                prevEl.classList.add('complete');
                prevEl.innerHTML = `<i class="fas fa-check"></i> ${texts[currentStep - 1].replace('...', '')}`;
            }

            if (currentStep < steps.length) {
                const el = document.getElementById(steps[currentStep]);
                el.classList.add('active');
                el.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${texts[currentStep]}`;
                generationText.textContent = texts[currentStep];
                currentStep++;
                setTimeout(nextStep, 800 + Math.random() * 400);
            } else {
                setTimeout(() => {
                    generationOverlay.classList.remove('active');
                    showOutput(toolId);
                }, 500);
            }
        }

        setTimeout(nextStep, 300);
    }

    function showOutput(toolId) {
        const template = toolTemplates[toolId];
        const formData = getFormData();
        
        outputTitle.textContent = template?.title || 'Generated Content';
        
        const outputGenerator = outputTemplates[toolId] || outputTemplates['default'];
        outputBody.innerHTML = outputGenerator(formData, toolId);
        
        // Update export button text based on tool
        const exportBtn = document.getElementById('exportOutputBtn');
        if (toolId === 'google-forms-quiz') {
            exportBtn.innerHTML = '<i class="fab fa-google"></i> Create in Google Forms';
        } else {
            exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Export to Docs';
        }
        
        outputScreen.classList.add('active');

        // Show feedback in document if it's a feedback tool
        if (['targeted-feedback', 'glow-grow', 'rubric-feedback'].includes(toolId)) {
            showDocumentFeedback(toolId);
        }
    }

    function getFormData() {
        const data = {};
        modalBody.querySelectorAll('input, textarea, select').forEach(el => {
            if (el.type === 'checkbox') {
                data[el.name] = el.checked;
            } else {
                data[el.name] = el.value;
            }
        });
        return data;
    }

    function showDocumentFeedback(toolId) {
        // Show feedback banner
        feedbackBanner.style.display = 'flex';
        
        // Add comments to sidebar
        commentsList.innerHTML = `
            <div class="comment-card glow">
                <div class="comment-header">
                    <div class="comment-avatar nv-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <rect width="24" height="24" rx="4" fill="#0f172a"/>
                            <text x="12" y="16" text-anchor="middle" fill="white" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="9">NV</text>
                        </svg>
                    </div>
                    <span class="comment-author">NV AI</span>
                    <span class="comment-time">Just now</span>
                </div>
                <div class="comment-text">
                    <strong>⭐ Strength:</strong> Excellent hook! Your opening sentence immediately engages the reader.
                </div>
                <div class="comment-actions">
                    <button class="comment-action-btn">Reply</button>
                    <button class="comment-action-btn">Resolve</button>
                </div>
            </div>
            <div class="comment-card grow">
                <div class="comment-header">
                    <div class="comment-avatar nv-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <rect width="24" height="24" rx="4" fill="#0f172a"/>
                            <text x="12" y="16" text-anchor="middle" fill="white" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="9">NV</text>
                        </svg>
                    </div>
                    <span class="comment-author">NV AI</span>
                    <span class="comment-time">Just now</span>
                </div>
                <div class="comment-text">
                    <strong>🌱 Suggestion:</strong> Consider adding a transition sentence here to improve flow between paragraphs.
                </div>
                <div class="comment-actions">
                    <button class="comment-action-btn">Reply</button>
                    <button class="comment-action-btn">Resolve</button>
                </div>
            </div>
            <div class="comment-card glow">
                <div class="comment-header">
                    <div class="comment-avatar nv-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <rect width="24" height="24" rx="4" fill="#0f172a"/>
                            <text x="12" y="16" text-anchor="middle" fill="white" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="9">NV</text>
                        </svg>
                    </div>
                    <span class="comment-author">NV AI</span>
                    <span class="comment-time">Just now</span>
                </div>
                <div class="comment-text">
                    <strong>⭐ Strength:</strong> Great use of specific evidence! The Great Barrier Reef example makes your argument concrete.
                </div>
                <div class="comment-actions">
                    <button class="comment-action-btn">Reply</button>
                    <button class="comment-action-btn">Resolve</button>
                </div>
            </div>
        `;

        // Highlight text in document
        const para2 = document.getElementById('para2');
        if (para2 && !para2.classList.contains('has-comment')) {
            para2.classList.add('has-comment');
        }
    }

    // ==================== TOAST NOTIFICATION ====================
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toastIcon.className = `fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Make showToast globally available
    window.showToast = showToast;

    // ==================== INITIALIZE ====================
    initializeUI();

    // Auto-open panel after a short delay for demo
    setTimeout(() => {
        nvPanel.classList.add('active');
        nvToggle.classList.add('hidden');
    }, 800);
});
