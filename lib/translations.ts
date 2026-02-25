export type Language = "en" | "si" | "ta"

export type TranslationKeys =
    | "nav_doctors"
    | "nav_signin"
    | "nav_get_started"
    | "hero_badge"
    | "hero_title"
    | "hero_description"
    | "hero_cta_trial"
    | "hero_cta_video"
    | "features_title"
    | "features_desc"
    | "testimonials_title"
    | "testimonials_desc"
    | "roles_title"
    | "roles_desc"
    | "cta_title"
    | "cta_desc"
    | "cta_button"
    | "footer_rights"
    // Auth
    | "auth_login_title"
    | "auth_login_desc"
    | "auth_email"
    | "auth_password"
    | "auth_signin_button"
    | "auth_signin_loading"
    | "auth_no_account"
    | "auth_signup_link"
    | "auth_create_account_title"
    | "auth_create_account_desc"
    | "auth_i_am_a"
    | "auth_fullname"
    | "auth_signup_button"
    | "auth_signup_loading"
    | "auth_already_account"
    | "auth_signin_link"
    | "role_student"
    | "role_parent"
    | "role_teacher"
    | "label_grade"
    | "label_age"
    | "label_subject"
    | "label_class_name"
    | "placeholder_select_grade"
    | "placeholder_select_subject"
    | "placeholder_select_class"
    // Navigation / Sidebar
    | "nav_dashboard"
    | "nav_children"
    | "nav_reports"
    | "nav_progress"
    | "nav_settings"
    | "nav_students"
    | "nav_analytics"
    | "nav_schedule"
    | "nav_logout"
    | "portal_parent"
    | "portal_teacher"
    // Landing - Benefits
    | "benefits_section_title"
    | "benefits_section_desc"
    | "benefit_title_0"
    | "benefit_desc_0"
    | "benefit_title_1"
    | "benefit_desc_1"
    | "benefit_title_2"
    | "benefit_desc_2"
    | "benefit_title_3"
    | "benefit_desc_3"
    // Landing - FAQ
    | "faq_section_title"
    | "faq_section_desc"
    | "faq_q_0"
    | "faq_a_0"
    | "faq_q_1"
    | "faq_a_1"
    | "faq_q_2"
    | "faq_a_2"
    | "faq_q_3"
    | "faq_a_3"
    | "faq_q_4"
    | "faq_a_4"
    | "faq_q_5"
    | "faq_a_5"
    // Dashboard - Common
    | "dash_overview"
    | "dash_total_students"
    | "dash_avg_score"
    | "dash_tests_week"
    | "dash_need_support"
    | "dash_class_performance"
    | "dash_performance_summary"
    | "dash_featured_students"
    | "dash_view_all"
    | "dash_student_details"
    | "dash_generate_report"
    | "dash_schedule_assessment"
    | "dash_generating"
    // Parent Dashboard
    | "parent_dash_title"
    | "parent_dash_desc"
    | "parent_total_children"
    | "parent_active_learners"
    | "parent_assessments_completed"
    | "parent_avg_progress"
    | "parent_across_children"
    | "parent_your_children"
    | "parent_add_child"
    | "parent_progress_time"
    | "parent_progress_desc"
    | "parent_strengths"
    | "parent_areas_focus"
    // Teacher Dashboard
    | "teacher_dash_title"
    | "teacher_dash_desc"
    | "teacher_class_avg"
    | "teacher_in_class"
    | "teacher_completed"
    | "teacher_students"
    // Assessment
    | "assess_title_suffix"
    | "assess_select_msg"
    | "assess_no_materials"
    | "assess_contact_teacher"
    | "assess_back_dashboard"
    | "assess_read_aloud"
    | "assess_mic_alert"
    | "assess_instructions"
    | "assess_step_1"
    | "assess_step_2"
    | "assess_step_3"
    | "assess_step_4"
    | "assess_start_recording"
    | "assess_recording"
    | "assess_recording_desc"
    | "assess_not_supported"
    | "assess_keep_reading"
    | "assess_connecting"
    | "assess_confidence"
    | "assess_transcript"
    | "assess_read_this"
    | "assess_stop_recording"
    | "assess_cancel"
    | "assess_analyzing"
    | "assess_processing_1"
    | "assess_processing_2"
    | "assess_processing_3"
    | "assess_complete"
    | "assess_analyzed"
    | "assess_overall_score"
    | "assess_what_you_read"
    | "assess_no_text"
    | "assess_word_accuracy"
    | "assess_pronunciation"
    | "assess_reading_speed"
    | "assess_fluency"
    | "assess_comprehension"
    | "assess_feedback"
    | "assess_your_score"
    | "assess_class_avg"
    | "assess_try_again"
    | "assess_return_dashboard"
    | "assess_saving"
    | "assess_loading"
    | "assess_grade"
    | "assess_min"
    | "assess_type_phoneme"
    | "assess_type_word"
    | "assess_type_passage"
    | "assess_type_comprehension"
    | "assess_save_exit"
    | "assess_tips_title"
    | "assess_tip_1"
    | "assess_tip_2"
    | "assess_tip_3"
    | "assess_suggestions_title"
    | "parent_this_month"
    | "label_class_prefix"
    | "label_subject_prefix"
    | "dash_scores_distribution"
    | "dash_individual_scores"

export const translations: Record<Language, Record<TranslationKeys, string>> = {
    en: {
        nav_doctors: "Doctors",
        nav_signin: "Sign In",
        nav_get_started: "Get Started",
        hero_badge: "AI-Powered Learning Detection",
        hero_title: "Detect Learning Difficulties Early",
        hero_description:
            "AI-powered speech analysis helps identify learning challenges in children before they fall behind, enabling targeted support when it matters most.",
        hero_cta_trial: "Start Free Trial",
        hero_cta_video: "Learn How It Works",
        features_title: "Comprehensive Learning Analysis",
        features_desc:
            "Our platform combines advanced speech recognition with AI analysis to provide detailed insights into each child's reading development.",
        testimonials_title: "Loved by Educators & Parents",
        testimonials_desc: "Real feedback from people transforming how we detect and support learning",
        roles_title: "Built for Everyone",
        roles_desc:
            "Tailored experiences for different users, all working toward the same goal: supporting every child's learning journey.",
        cta_title: "Ready to Make a Difference?",
        cta_desc:
            "Join educators and parents using LearnDetect to support every child's learning potential.",
        cta_button: "Start Your Free Trial",
        footer_rights: "© 2025 LearnDetect. All rights reserved.",
        // Auth
        auth_login_title: "Sign In",
        auth_login_desc: "Enter your credentials to access your account",
        auth_email: "Email",
        auth_password: "Password",
        auth_signin_button: "Sign In",
        auth_signin_loading: "Signing in...",
        auth_no_account: "Don't have an account?",
        auth_signup_link: "Sign up",
        auth_create_account_title: "Create Account",
        auth_create_account_desc: "Join LearnDetect to start supporting learning",
        auth_i_am_a: "I am a",
        auth_fullname: "Full Name",
        auth_signup_button: "Create Account",
        auth_signup_loading: "Creating account...",
        auth_already_account: "Already have an account?",
        auth_signin_link: "Sign in",
        role_student: "Student",
        role_parent: "Parent",
        role_teacher: "Teacher",
        label_grade: "Grade Level",
        label_age: "Age",
        label_subject: "Subject",
        label_class_name: "Class Name",
        placeholder_select_grade: "Select your grade",
        placeholder_select_subject: "Select your subject",
        placeholder_select_class: "Select your class",
        // Navigation
        nav_dashboard: "Dashboard",
        nav_children: "Children",
        nav_reports: "Reports",
        nav_progress: "Progress",
        nav_settings: "Settings",
        nav_students: "Students",
        nav_analytics: "Analytics",
        nav_schedule: "Schedule Assessment",
        nav_logout: "Logout",
        portal_parent: "Parent Portal",
        portal_teacher: "Teacher Portal",
        // Landing - Benefits
        benefits_section_title: "Proven Impact",
        benefits_section_desc: "See how LearnDetect transforms learning outcomes and reduces educator workload",
        benefit_title_0: "Early Detection",
        benefit_desc_0: "Identify learning difficulties before they impact academic performance",
        benefit_title_1: "Time Saved",
        benefit_desc_1: "Automated assessments replace time-consuming manual evaluations",
        benefit_title_2: "Improvement Rate",
        benefit_desc_2: "Targeted interventions increase reading improvement rates significantly",
        benefit_title_3: "Efficiency Boost",
        benefit_desc_3: "Consolidate assessment, tracking, and reporting into one solution",
        // Landing - FAQ
        faq_section_title: "Frequently Asked Questions",
        faq_section_desc: "Find answers to common questions about LearnDetect",
        faq_q_0: "How accurate is the speech recognition?",
        faq_a_0: "Our system uses Google Web Speech API with AI post-processing to achieve 95%+ accuracy for typical reading passages.",
        faq_q_1: "What age groups can use LearnDetect?",
        faq_a_1: "LearnDetect is designed for children ages 5-12, covering early elementary through middle school.",
        faq_q_2: "Is my data secure and private?",
        faq_a_2: "Yes, we are fully HIPAA compliant and FERPA certified. All data is encrypted in transit and at rest.",
        faq_q_3: "How often should assessments be taken?",
        faq_a_3: "We recommend monthly assessments to track progress and identify trends.",
        faq_q_4: "Can parents access their child's results?",
        faq_a_4: "Absolutely. Parents have a dedicated dashboard showing their child's performance and progress.",
        faq_q_5: "What support do educators get?",
        faq_a_5: "Educators receive comprehensive training, ongoing support, and access to best practices.",
        // Dashboard
        dash_overview: "Overview",
        dash_total_students: "Total Students",
        dash_avg_score: "Avg. Score",
        dash_tests_week: "Tests This Week",
        dash_need_support: "Need Support",
        dash_class_performance: "Class Performance",
        dash_performance_summary: "Performance Summary",
        dash_featured_students: "Featured Students",
        dash_view_all: "View All",
        dash_student_details: "Student Performance Details",
        dash_generate_report: "Generate Class Report",
        dash_schedule_assessment: "Schedule Assessment",
        dash_generating: "Generating...",
        // Parent Dashboard
        parent_dash_title: "Parent Dashboard",
        parent_dash_desc: "Monitor your children's reading progress and development",
        parent_total_children: "Total Children",
        parent_active_learners: "Active learners",
        parent_assessments_completed: "Assessments completed",
        parent_avg_progress: "Average Progress",
        parent_across_children: "Across all children",
        parent_your_children: "Your Children",
        parent_add_child: "Add Child",
        parent_progress_time: "Progress Over Time",
        parent_progress_desc: "Reading assessment scores for the last 4 months",
        parent_strengths: "Strengths",
        parent_areas_focus: "Areas of Focus",
        // Teacher Dashboard
        teacher_dash_title: "Teacher Dashboard",
        teacher_dash_desc: "Manage and track your class reading assessments",
        teacher_class_avg: "Class average",
        teacher_in_class: "In your class",
        teacher_completed: "Completed",
        teacher_students: "Students",
        // Assessment
        assess_title_suffix: "Assessments",
        assess_select_msg: "Select an assessment to begin",
        assess_no_materials: "No assessment materials available for this type.",
        assess_contact_teacher: "Please contact your teacher to add assessment materials.",
        assess_back_dashboard: "Back to Dashboard",
        assess_read_aloud: "Read the text below aloud",
        assess_mic_alert: "Make sure your microphone is working and you're in a quiet environment.",
        assess_instructions: "Instructions:",
        assess_step_1: "1. Click 'Start Recording' when ready",
        assess_step_2: "2. Read the text aloud clearly and naturally",
        assess_step_3: "3. Click 'Stop Recording' when finished",
        assess_step_4: "4. We'll analyze your reading performance",
        assess_start_recording: "Start Recording",
        assess_recording: "Recording...",
        assess_recording_desc: "Read the text aloud clearly",
        assess_not_supported: "Speech Recognition is not supported in your browser. Please use Chrome, Firefox, Safari, or Edge.",
        assess_keep_reading: "Keep reading...",
        assess_connecting: "Connecting...",
        assess_confidence: "Confidence",
        assess_transcript: "Real-time transcription:",
        assess_read_this: "Read this aloud:",
        assess_stop_recording: "Stop Recording",
        assess_cancel: "Cancel",
        assess_analyzing: "Analyzing Your Reading...",
        assess_processing_1: "Converting speech to text",
        assess_processing_2: "Analyzing reading patterns",
        assess_processing_3: "Generating scores & feedback",
        assess_complete: "Assessment Complete!",
        assess_analyzed: "Your reading has been analyzed",
        assess_overall_score: "Overall Score",
        assess_what_you_read: "What you read:",
        assess_no_text: "No text captured",
        assess_word_accuracy: "Word Accuracy",
        assess_pronunciation: "Pronunciation",
        assess_reading_speed: "Reading Speed",
        assess_fluency: "Fluency",
        assess_comprehension: "Comprehension",
        assess_feedback: "Feedback",
        assess_your_score: "Your Score",
        assess_class_avg: "Class Average",
        assess_try_again: "Try Again",
        assess_return_dashboard: "Return to Dashboard",
        assess_saving: "Saving...",
        assess_loading: "Loading Assessment...",
        assess_grade: "Grade",
        assess_min: "min",
        assess_type_phoneme: "Phoneme Recognition",
        assess_type_word: "Word Reading",
        assess_type_passage: "Passage Reading",
        assess_type_comprehension: "Reading Comprehension",
        assess_save_exit: "Save & Exit",
        assess_tips_title: "Tips for Improvement",
        assess_tip_1: "Read slowly and clearly. Speed doesn't matter - accuracy does.",
        assess_tip_2: "Practice complex words separately before taking another test.",
        assess_tip_3: "Try reading aloud daily. It improves fluency and confidence.",
        assess_suggestions_title: "Suggestions for Improvement",
        parent_this_month: "This Month",
        label_class_prefix: "Class: ",
        label_subject_prefix: "Subject: ",
        dash_scores_distribution: "Reading scores distribution",
        dash_individual_scores: "Individual scores and status",
    },
    si: {
        nav_doctors: "වෛද්‍යවරුන්",
        nav_signin: "ඇතුල් වන්න",
        nav_get_started: "ආරම්භ කරන්න",
        hero_badge: "AI බලයෙන් ක්‍රියාත්මක වන ඉගෙනුම් හඳුනාගැනීම",
        hero_title: "ඉගෙනීමේ දුෂ්කරතා කල්තියා හඳුනාගන්න",
        hero_description:
            "AI බලයෙන් ක්‍රියාත්මක වන කථන විශ්ලේෂණය දරුවන්ගේ ඉගෙනීමේ අභියෝග කල්තියා හඳුනා ගැනීමට උපකාරී වේ, එමඟින් අවශ්ය සහාය ලබා දිය හැකිය.",
        hero_cta_trial: "නොමිලේ අත්හදා බලන්න",
        hero_cta_video: "ක්‍රියා කරන ආකාරය",
        features_title: "පරිපූර්ණ ඉගෙනුම් විශ්ලේෂණය",
        features_desc:
            "අපගේ වේදිකාව උසස් කථන හඳුනාගැනීම සහ AI විශ්ලේෂණය ඒකාබද්ධ කර දරුවාගේ කියවීමේ කුසලතා පිළිබඳ සවිස්තරාත්මක අවබෝධයක් ලබා දෙයි.",
        testimonials_title: "ගුරුවරුන් සහ දෙමාපියන්ගේ ඇගයීමට ලක්වූ",
        testimonials_desc: "ඉගෙනුම් හඳුනාගැනීම සහ සහාය ලබා දීම වෙනස් කරන පුද්ගලයින්ගෙන් සැබෑ ප්‍රතිචාර",
        roles_title: "සැමට ගැලපෙන ලෙස නිර්මාණය කර ඇත",
        roles_desc:
            "විවිධ පරිශීලකයින් සඳහා සකස් කරන ලද අත්දැකීම්, සියල්ල එකම අරමුණක් වෙනුවෙන්: සෑම දරුවෙකුගේම ඉගෙනුම් ගමනට සහාය වීම.",
        cta_title: "වෙනසක් කිරීමට සූදානම්ද?",
        cta_desc:
            "සෑම දරුවෙකුගේම ඉගෙනුම් විභවයට සහාය වීම සඳහා LearnDetect භාවිතා කරන ගුරුවරුන් සහ දෙමාපියන් සමඟ එක්වන්න.",
        cta_button: "ඔබේ නොමිලේ අත්හදා බැලීම ආරම්භ කරන්න",
        footer_rights: "© 2025 LearnDetect. සියලුම හිමිකම් ඇවිරිණි.",
        // Auth
        auth_login_title: "ඇතුල් වන්න",
        auth_login_desc: "ඔබගේ ගිණුමට පිවිසීමට ඔබගේ තොරතුරු ඇතුළත් කරන්න",
        auth_email: "විද්‍යුත් තැපෑල",
        auth_password: "මුරපදය",
        auth_signin_button: "ඇතුල් වන්න",
        auth_signin_loading: "ඇතුල් වෙමින්...",
        auth_no_account: "ගිණුමක් නැද්ද?",
        auth_signup_link: "ලියාපදිංචි වන්න",
        auth_create_account_title: "ගිණුමක් සාදන්න",
        auth_create_account_desc: "ඉගෙනීමට සහාය වීම සඳහා LearnDetect හා එක්වන්න",
        auth_i_am_a: "මම",
        auth_fullname: "සම්පූර්ණ නම",
        auth_signup_button: "ගිණුමක් සාදන්න",
        auth_signup_loading: "ගිණුමක් සාදමින්...",
        auth_already_account: "දැනටමත් ගිණුමක් තිබේද?",
        auth_signin_link: "ඇතුල් වන්න",
        role_student: "ශිෂ්‍යයා",
        role_parent: "දෙමාපියන්",
        role_teacher: "ගුරුවරයා",
        label_grade: "ශ්‍රේණිය",
        label_age: "වයස",
        label_subject: "විෂය",
        label_class_name: "පන්තියේ නම",
        placeholder_select_grade: "ඔබේ ශ්‍රේණිය තෝරන්න",
        placeholder_select_subject: "ඔබේ විෂය තෝරන්න",
        placeholder_select_class: "ඔබේ පන්තිය තෝරන්න",
        // Navigation
        nav_dashboard: "උ시ඛක පුවරුව",
        nav_children: "දරුවන්",
        nav_reports: "වාර්තා",
        nav_progress: "ප්‍රගතිය",
        nav_settings: "සැකසුම්",
        nav_students: "සිසුන්",
        nav_analytics: "විශ්ලේෂණ",
        nav_schedule: "ඇගයීම් කාලසටහන",
        nav_logout: "ඉවත් වන්න",
        portal_parent: "දෙමාපිය ද්වාරය",
        portal_teacher: "ගුරු ද්වාරය",
        // Landing - Benefits
        benefits_section_title: "තහවුරු කළ බලපෑම",
        benefits_section_desc: "LearnDetect ඉගෙනුම් ප්‍රතිඵල පරිවර්තනය කරන ආකාරය සහ අධ්‍යාපනඥයින්ගේ කාර්යभारය අඩු කරන ආකාරය බලන්න",
        benefit_title_0: "කල්තියා හඳුනාගැනීම",
        benefit_desc_0: "අධ්‍යාපනික ක්‍රියාකාරීත්වයට බලපෑම් කිරීමට පෙර ඉගෙනීමේ දුෂ්කරතා හඳුනාගන්න",
        benefit_title_1: "කාලය ඉතිරි කිරීම",
        benefit_desc_1: "ස්වයංක්‍රීය ඇගයීම් කාලය ගතවන අතින් කරන ඇගයීම් ප්‍රතිස්ථාපනය කරයි",
        benefit_title_2: "වැඩිදියුණු කිරීමේ අනුපාතය",
        benefit_desc_2: "ඉලක්කගත මැදිහත්වීම් කියවීමේ වැඩිදියුණු කිරීමේ අනුපාත සැලකිය යුතු ලෙස වැඩි කරයි",
        benefit_title_3: "කාර්යක්ෂමතාව වැඩි කිරීම",
        benefit_desc_3: "ඇගයීම, ලුහුබැඳීම සහ වාර්තා කිරීම එක් විසඳුමකට ඒකාබද්ධ කරන්න",
        // Landing - FAQ
        faq_section_title: "නිතර අසන ප්‍රශ්න",
        faq_section_desc: "LearnDetect ගැන නිතර අසන ප්‍රශ්නවලට පිළිතුරු සොයන්න",
        faq_q_0: "කථන හඳුනාගැනීම කොතරම් නිවැරදිද?",
        faq_a_0: "සාමාන්‍ය කියවීමේ කොටස් සඳහා 95%+ නිරවද්‍යතාවයක් ලබා ගැනීමට අපගේ පද්ධතිය AI පසු සැකසුම් සහිත Google Web Speech API භාවිතා කරයි.",
        faq_q_1: "LearnDetect භාවිතා කළ හැක්කේ කුමන වයස් කාණ්ඩවලටද?",
        faq_a_1: "LearnDetect වයස අවුරුදු 5-12 ළමයින් සඳහා නිර්මාණය කර ඇති අතර, මුල් ප්‍රාථමික සිට මධ්‍යම පාසල දක්වා ආවරණය කරයි.",
        faq_q_2: "මගේ දත්ත ආරක්ෂිතද?",
        faq_a_2: "ඔව්, අපි සම්පූර්ණයෙන්ම HIPAA අනුකූල සහ FERPA සහතික කර ඇත. සියලුම දත්ත සම්ප්‍රේෂණයේදී සහ ගබඩා කිරීමේදී සංකේතනය කර ඇත.",
        faq_q_3: "ඇගයීම් කොපමණ වාරයක් ගත යුතුද?",
        faq_a_3: "ප්‍රගතිය නිරීක්ෂණය කිරීමට සහ ප්‍රවණතා හඳුනා ගැනීමට මාසික ඇගයීම් අපි නිර්දේශ කරමු.",
        faq_q_4: "දෙමාපියන්ට තම දරුවාගේ ප්‍රතිඵල වෙත ප්‍රවේශ විය හැකිද?",
        faq_a_4: "අනිවාර්යයෙන්ම. දෙමාපියන්ට තම දරුවාගේ ක්‍රියාකාරීත්වය සහ ප්‍රගතිය පෙන්වන විශේෂ උපකරණ පුවරුවක් ඇත.",
        faq_q_5: "අධ්‍යාපනඥයින්ට ලැබෙන සහාය කුමක්ද?",
        faq_a_5: "අධ්‍යාපනඥයින්ට පුළුල් පුහුණුවක්, අඛණ්ඩ සහායක් සහ හොඳම භාවිතයන් වෙත ප්‍රවේශය ලැබේ.",
        // Dashboard
        dash_overview: "දළ විශ්ලේෂණය",
        dash_total_students: "මුළු සිසුන්",
        dash_avg_score: "සාමාන්‍ය ලකුණු",
        dash_tests_week: "මේ සතියේ පරීක්ෂණ",
        dash_need_support: "සහාය අවශ්‍යයි",
        dash_class_performance: "පන්ති කාර්ය සාධනය",
        dash_performance_summary: "කාර්ය සාධන සාරාංශය",
        dash_featured_students: "විශේෂාංගගත සිසුන්",
        dash_view_all: "සියල්ල බලන්න",
        dash_student_details: "ශිෂ්‍ය කාර්ය සාධන විස්තර",
        dash_generate_report: "පන්ති වාර්තාව උත්පාදනය කරන්න",
        dash_schedule_assessment: "ඇගයීමක් උපලේඛනගත කරන්න",
        dash_generating: "උත්පාදනය වෙමින් පවතී...",
        // Parent Dashboard
        parent_dash_title: "දෙමාපිය උපකරණ පුවරුව",
        parent_dash_desc: "ඔබේ දරුවන්ගේ කියවීමේ ප්‍රගතිය සහ සංවර්ධනය නිරීක්ෂණය කරන්න",
        parent_total_children: "මුළු ළමුන්",
        parent_active_learners: "ක්‍රියාකාරී ඉගෙන ගන්නන්",
        parent_assessments_completed: "සම්පූර්ණ කරන ලද ඇගයීම්",
        parent_avg_progress: "සාමාන්‍ය ප්‍රගතිය",
        parent_across_children: "සියලුම ළමුන් හරහා",
        parent_your_children: "ඔබේ දරුවන්",
        parent_add_child: "දරුවෙකු එකතු කරන්න",
        parent_progress_time: "කාලයත් සමඟ ප්‍රගතිය",
        parent_progress_desc: "පසුගිය මාස 4 සඳහා කියවීමේ ඇගයීම් ලකුණු",
        parent_strengths: "ශක්තීන්",
        parent_areas_focus: "අවධානය යොමු කළ යුතු අංශ",
        // Teacher Dashboard
        teacher_dash_title: "ගුරු උපකරණ පුවරුව",
        teacher_dash_desc: "ඔබේ පන්තියේ කියවීමේ ඇගයීම් කළමනාකරණය සහ ලුහුබැඳීම",
        teacher_class_avg: "පන්ති සාමාන්‍යය",
        teacher_in_class: "ඔබේ පන්තියේ",
        teacher_completed: "සම්පූර්ණ කරන ලදී",
        teacher_students: "සිසුන්",
        // Assessment
        assess_title_suffix: "ඇගයීම්",
        assess_select_msg: "ආරම්භ කිරීමට ඇගයීමක් තෝරන්න",
        assess_no_materials: "මෙම වර්ගය සඳහා ඇගයීම් ද්‍රව්‍ය නොමැත.",
        assess_contact_teacher: "ඇගයීම් ද්‍රව්‍ය එක් කිරීමට කරුණාකර ඔබේ ගුරුවරයා අමතන්න.",
        assess_back_dashboard: "උපකරණ පුවරුව වෙත ආපසු",
        assess_read_aloud: "පහත පෙළ හයියෙන් කියවන්න",
        assess_mic_alert: "ඔබේ මයික්‍රොෆෝනය ක්‍රියා කරන බවට සහ ඔබ නිහඬ පරිසරයක සිටින බවට වග බලා ගන්න.",
        assess_instructions: "උපදෙස්:",
        assess_step_1: "1. සූදානම් වූ විට 'Start Recording' ක්ලික් කරන්න",
        assess_step_2: "2. පෙළ පැහැදිලිව සහ ස්වභාවිකව හයියෙන් කියවන්න",
        assess_step_3: "3. අවසන් වූ පසු 'Stop Recording' ක්ලික් කරන්න",
        assess_step_4: "4. අපි ඔබේ කියවීමේ කාර්ය සාධනය විශ්ලේෂණය කරන්නෙමු",
        assess_start_recording: "පටිගත කිරීම අරඹන්න",
        assess_recording: "පටිගත වෙමින්...",
        assess_recording_desc: "පෙළ හයියෙන් පැහැදිලිව කියවන්න",
        assess_not_supported: "ඔබගේ බ්‍රව්සරයේ හඬ හඳුනාගැනීම සඳහා සහය නොදක්වයි. කරුණාකර Chrome, Firefox, Safari හෝ Edge භාවිතා කරන්න.",
        assess_keep_reading: "දිගටම කියවන්න...",
        assess_connecting: "සම්බන්ධ වෙමින්...",
        assess_confidence: "විශ්වාසය",
        assess_transcript: "තත්‍ය කාලීන පිටපත:",
        assess_read_this: "මෙය හයියෙන් කියවන්න:",
        assess_stop_recording: "පටිගත කිරීම නවත්වන්න",
        assess_cancel: "අවලංගු කරන්න",
        assess_analyzing: "ඔබගේ කියවීම විශ්ලේෂණය කරමින්...",
        assess_processing_1: "කථනය පෙළට පරිවර්තනය කිරීම",
        assess_processing_2: "කියවීමේ රටා විශ්ලේෂණය කිරීම",
        assess_processing_3: "ලකුණු සහ ප්‍රතිචාර ජනනය කිරීම",
        assess_complete: "ඇගයීම සම්පූර්ණයි!",
        assess_analyzed: "ඔබගේ කියවීම විශ්ලේෂණය කර ඇත",
        assess_overall_score: "මුළු ලකුණු",
        assess_what_you_read: "ඔබ කියවූ දේ:",
        assess_no_text: "පෙළ ග්‍රහණය කර නැත",
        assess_word_accuracy: "වචන නිරවද්‍යතාවය",
        assess_pronunciation: "උච්චාරණය",
        assess_reading_speed: "කියවීමේ වේගය",
        assess_fluency: "චතුරතාව",
        assess_comprehension: "අවබෝධය",
        assess_feedback: "ප්‍රතිචාර",
        assess_your_score: "ඔබේ ලකුණු",
        assess_class_avg: "පන්ති සාමාන්‍යය",
        assess_try_again: "නැවත උත්සාහ කරන්න",
        assess_return_dashboard: "උපකරණ පුවරුව වෙත ආපසු යන්න",
        assess_saving: "සුරැකෙමින්...",
        assess_loading: "ඇගයීම පූරණය වෙමින්...",
        assess_grade: "ශ්‍රේණිය",
        assess_min: "විනාඩි",
        assess_type_phoneme: "ශබ්ද හඳුනාගැනීම",
        assess_type_word: "වචන කියවීම",
        assess_type_passage: "ඡේද කියවීම",
        assess_type_comprehension: "කියවීමේ අවබෝධය",
        assess_save_exit: "සුරකින්න සහ ඉවත් වන්න",
        assess_tips_title: "වැඩිදියුණු කිරීම සඳහා උපදෙස්",
        assess_tip_1: "සෙමින් සහ පැහැදිලිව කියවන්න. වේගය වැදගත් නොවේ - නිරවද්‍යතාවය වැදගත් වේ.",
        assess_tip_2: "තවත් පරීක්ෂණයක් කිරීමට පෙර සංකීර්ණ වචන වෙන වෙනම පුහුණු වන්න.",
        assess_tip_3: "දිනපතා හයියෙන් කියවීමට උත්සාහ කරන්න. එය චතුරතාව සහ විශ්වාසය වැඩි දියුණු කරයි.",
        assess_suggestions_title: "වැඩිදියුණු කිරීම සඳහා යෝජනා",
        parent_this_month: "මේ මාසය",
        label_class_prefix: "පන්තිය: ",
        label_subject_prefix: "විෂය: ",
        dash_scores_distribution: "කියවීමේ ලකුණු බෙදා හැරීම",
        dash_individual_scores: "තනි ලකුණු සහ තත්ත්වය",
    },
    ta: {
        nav_doctors: "மருத்துவர்கள்",
        nav_signin: "உள்நுழைக",
        nav_get_started: "தொடங்குங்கள்",
        hero_badge: "AI-இயங்கும் கற்றல் கண்டறிதல்",
        hero_title: "கற்றல் குறைபாடுகளை முன்கூட்டியே கண்டறியுங்கள்",
        hero_description:
            "AI-இயங்கும் பேச்சு பகுப்பாய்வு குழந்தைகள் பின் தங்குவதற்கு முன்பே கற்றல் சவால்களை கண்டறிய உதவுகிறது, இது தேவையான ஆதரவை வழங்க உதவுகிறது.",
        hero_cta_trial: "இலவசமாக முயற்சிக்கவும்",
        hero_cta_video: "எப்படி வேலை செய்கிறது",
        features_title: "விரிவான கற்றல் பகுப்பாய்வு",
        features_desc:
            "எங்கள் தளம் மேம்பட்ட பேச்சு அங்கீகாரம் மற்றும் AI பகுப்பாய்வை இணைத்து ஒவ்வொரு குழந்தையின் வாசிப்பு வளர்ச்சி குறித்த விரிவான நுண்ணறிவுகளை வழங்குகிறது.",
        testimonials_title: "கல்வியாளர்கள் மற்றும் பெற்றோர்களால் விரும்பப்படுகிறது",
        testimonials_desc: "கற்றல் கண்டறிதல் மற்றும் ஆதரவு வழங்குவதை மாற்றியமைக்கும் மக்களிடமிருந்து உண்மையான கருத்துக்கள்",
        roles_title: "அனைவருக்குமாக உருவாக்கப்பட்டது",
        roles_desc:
            "வெவ்வேறு பயனர்களுக்கன அனுபவங்கள், அனைத்தும் ஒரே குறிக்கோளை நோக்கி செயல்படுகின்றன: ஒவ்வொரு குழந்தையின் கற்றல் பயணத்திற்கும் ஆதரவளித்தல்.",
        cta_title: "மாற்றத்தை ஏற்படுத்தத் தயாரா?",
        cta_desc:
            "ஒவ்வொரு குழந்தையின் கற்றல் திறனுக்கும் ஆதரவளிக்க LearnDetect ஐப் பயன்படுத்தும் கல்வியாளர்கள் மற்றும் பெற்றோர்களுடன் இணையுங்கள்.",
        cta_button: "உங்கள் இலவச முயற்சியைத் தொடங்குங்கள்",
        footer_rights: "© 2025 LearnDetect. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        // Auth
        auth_login_title: "உள்நுழைக",
        auth_login_desc: "உங்கள் கணக்கை அணுக உங்கள் சான்றுகளை உள்ளிடவும்",
        auth_email: "மின்னஞ்சல்",
        auth_password: "கடவுச்சொல்",
        auth_signin_button: "உள்நுழைக",
        auth_signin_loading: "உள்நுழைகிறது...",
        auth_no_account: "கணக்கு இல்லையா?",
        auth_signup_link: "பதிவு செய்க",
        auth_create_account_title: "கணக்கை உருவாக்கவும்",
        auth_create_account_desc: "கற்றலை ஆதரிக்க LearnDetect இல் ர இணையவும்",
        auth_i_am_a: "நான் ஒரு",
        auth_fullname: "முழு பெயர்",
        auth_signup_button: "கணக்கை உருவாக்கவும்",
        auth_signup_loading: "கணக்கை உருவாக்குகிறது...",
        auth_already_account: "ஏற்கனவே கணக்கு உள்ளதா?",
        auth_signin_link: "உள்நுழைக",
        role_student: "மாணவர்",
        role_parent: "பெற்றோர்",
        role_teacher: "ஆசிரியர்",
        label_grade: "வகுப்பு நிலை",
        label_age: "வயது",
        label_subject: "பாடம்",
        label_class_name: "வகுப்பு பெயர்",
        placeholder_select_grade: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்",
        placeholder_select_subject: "உங்கள் பாடத்தைத் தேர்ந்தெடுக்கவும்",
        placeholder_select_class: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்",
        // Navigation
        nav_dashboard: "முகப்பு",
        nav_children: "குழந்தைகள்",
        nav_reports: "அறிக்கைகள்",
        nav_progress: "முன்னேற்றம்",
        nav_settings: "அமைப்புகள்",
        nav_students: "மாணவர்கள்",
        nav_analytics: "பகுப்பாய்வு",
        nav_schedule: "மதிப்பீடு அட்டவணை",
        nav_logout: "வெளியேறு",
        portal_parent: "பெற்றோர் தளம்",
        portal_teacher: "ஆசிரியர் தளம்",
        // Landing - Benefits
        benefits_section_title: "நிரூபிக்கப்பட்ட தாக்கம்",
        benefits_section_desc: "LearnDetect எவ்வாறு கற்றல் விளைவுகளை மாற்றியமைக்கிறது மற்றும் கல்வியாளர்களின் பணிச்சுமையைக் குறைக்கிறது என்பதைப் பாருங்கள்",
        benefit_title_0: "முன்கூட்டியே கண்டறிதல்",
        benefit_desc_0: "கல்வி செயல்திறனைப் பாதிக்கும் முன் கற்றல் குறைபாடுகளைக் கண்டறியவும்",
        benefit_title_1: "நேரம் சேமிக்கப்பட்டது",
        benefit_desc_1: "தானியங்கு மதிப்பீடுகள் நேரத்தைச் செலவழிக்கும் கைமுறை மதிப்பீடுகளை மாற்றுகின்றன",
        benefit_title_2: "மேம்பாட்டு விகிதம்",
        benefit_desc_2: "இலக்கு வைக்கப்பட்ட தலையீடுகள் வாசிப்பு மேம்பாட்டு விகிதங்களை கணிசமாக அதிகரிக்கின்றன",
        benefit_title_3: "செயல்திறன் அதிகரிப்பு",
        benefit_desc_3: "மதிப்பீடு, கண்காணிப்பு மற்றும் அறிக்கையிடலை ஒரே தீர்வாக ஒருங்கிணைக்கவும்",
        // Landing - FAQ
        faq_section_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        faq_section_desc: "LearnDetect பற்றிய பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்",
        faq_q_0: "பேச்சு அங்கீகாரத்தின் துல்லியம் எவ்வளவு?",
        faq_a_0: "எங்கள் அமைப்பு Google Web Speech API ஐ AI பிந்தைய செயலாக்கத்துடன் பயன்படுத்தி வழக்கமான வாசிப்புப் பகுதிகளுக்கு 95%+ துல்லியத்தை அடைகிறது.",
        faq_q_1: "LearnDetect ஐ எந்த வயதுக் குழுக்கள் பயன்படுத்தலாம்?",
        faq_a_1: "LearnDetect 5-12 வயதுடைய குழந்தைகளுக்காக வடிவமைக்கப்பட்டுள்ளது, இது ஆரம்ப தொடக்கப் பள்ளி முதல் நடுநிலைப் பள்ளி வரை உள்ளடக்கியது.",
        faq_q_2: "எனது தரவு பாதுகாப்பானது மற்றும் தனிப்பட்டதா?",
        faq_a_2: "ஆம், நாங்கள் முழுமையாக HIPAA இணக்கமானவர்கள் மற்றும் FERPA சான்றளிக்கப்பட்டவர்கள். அனைத்து தரவுகளும் போக்குவரத்திலும் ஓய்விலும் குறியாக்கம் செய்யப்படுகின்றன.",
        faq_q_3: "மதிப்பீடுகள் எவ்வளவு அடிக்கடி எடுக்கப்பட வேண்டும்?",
        faq_a_3: "முன்னேற்றத்தைக் கண்காணிக்கவும் போக்குகளைக் கண்டறியவும் மாதாந்திர மதிப்பீடுகளை நாங்கள் பரிந்துரைக்கிறோம்.",
        faq_q_4: "பெற்றோர்கள் தங்கள் குழந்தையின் முடிவுகளை அணுக முடியுமா?",
        faq_a_4: "நிச்சயமாக. பெற்றோர்களுக்கு தங்கள் குழந்தையின் செயல்திறன் மற்றும் முன்னேற்றத்தைக் காட்டும் ஒரு பிரத்யேக டாஷ்போர்டு உள்ளது.",
        faq_q_5: "கல்வியாளர்களுக்கு என்ன ஆதரவு கிடைக்கும்?",
        faq_a_5: "கல்வியாளர்களுக்கு விரிவான பயிற்சி, தொடர்ச்சியான ஆதரவு மற்றும் சிறந்த நடைமுறைகளுக்கான அணுகல் கிடைக்கும்.",
        // Dashboard
        dash_overview: "மேலோட்டம்",
        dash_total_students: "மொத்த மாணவர்கள்",
        dash_avg_score: "சராசரி மதிப்பெண்",
        dash_tests_week: "இந்த வார தேர்வுகள்",
        dash_need_support: "ஆதரவு தேவை",
        dash_class_performance: "வகுப்பு செயல்திறன்",
        dash_performance_summary: "செயல்திறன் சுருக்கம்",
        dash_featured_students: "சிறப்பு மாணவர்கள்",
        dash_view_all: "அனைத்தையும் காண்க",
        dash_student_details: "மாணவர் செயல்திறன் விவரங்கள்",
        dash_generate_report: "வகுப்பு அறிக்கையை உருவாக்கு",
        dash_schedule_assessment: "மதிப்பீட்டைத் திட்டமிடு",
        dash_generating: "உருவாக்குகிறது...",
        // Parent Dashboard
        parent_dash_title: "பெற்றோர் டாஷ்போர்டு",
        parent_dash_desc: "உங்கள் குழந்தைகளின் வாசிப்பு முன்னேற்றத்தைக் கண்காணிக்கவும்",
        parent_total_children: "மொத்த குழந்தைகள்",
        parent_active_learners: "செயலில் உள்ள கற்பவர்கள்",
        parent_assessments_completed: "முடிக்கப்பட்ட மதிப்பீடுகள்",
        parent_avg_progress: "சராசரி முன்னேற்றம்",
        parent_across_children: "அனைத்து குழந்தைகளிடையேயும்",
        parent_your_children: "உங்கள் குழந்தைகள்",
        parent_add_child: "குழந்தையைச் சேர்",
        parent_progress_time: "காலப்போக்கில் முன்னேற்றம்",
        parent_progress_desc: "கடந்த 4 மாதங்களுக்கான வாசிப்பு மதிப்பீட்டு மதிப்பெண்கள்",
        parent_strengths: "பலங்கள்",
        parent_areas_focus: "கவனிக்க வேண்டிய பகுதிகள்",
        // Teacher Dashboard
        teacher_dash_title: "ஆசிரியர் டாஷ்போர்டு",
        teacher_dash_desc: "உங்கள் வகுப்பு வாசிப்பு மதிப்பீடுகளை நிர்வகிக்கவும்",
        teacher_class_avg: "வகுப்பு சராசரி",
        teacher_in_class: "உங்கள் வகுப்பில்",
        teacher_completed: "முடிந்தது",
        teacher_students: "மாணவர்கள்",
        // Assessment
        assess_title_suffix: "மதிப்பீடுகள்",
        assess_select_msg: "தொடங்க ஒரு மதிப்பீட்டைத் தேர்ந்தெடுக்கவும்",
        assess_no_materials: "இந்த வகைக்கான மதிப்பீட்டுப் பொருட்கள் எதுவும் இல்லை.",
        assess_contact_teacher: "மதிப்பீட்டுப் பொருட்களைச் சேர்க்க தயவுசெய்து உங்கள் ஆசிரியரைத் தொடர்பு கொள்ளவும்.",
        assess_back_dashboard: "முகப்பிற்குத் திரும்பு",
        assess_read_aloud: "கீழே உள்ள உரையை சத்தமாக வாசிக்கவும்",
        assess_mic_alert: "உங்கள் மைக்ரோஃபோன் வேலை செய்கிறதா என்பதையும் நீங்கள் அமைதியான சூழலில் இருக்கிறீர்களா என்பதையும் உறுதிப்படுத்திக் கொள்ளுங்கள்.",
        assess_instructions: "வழிமுறைகள்:",
        assess_step_1: "1. தயாரானதும் 'Start Recording' என்பதைக் கிளிக் செய்யவும்",
        assess_step_2: "2. உரையைத் தெளிவாகவும் இயற்கையாகவும் சத்தமாக வாசிக்கவும்",
        assess_step_3: "3. முடிந்ததும் 'Stop Recording' என்பதைக் கிளிக் செய்யவும்",
        assess_step_4: "4. உங்கள் வாசிப்பு செயல்திறனை நாங்கள் பகுப்பாய்வு செய்வோம்",
        assess_start_recording: "பதிவைத் தொடங்கவும்",
        assess_recording: "பதிவாகிறது...",
        assess_recording_desc: "உரையைத் தெளிவாக சத்தமாக வாசிக்கவும்",
        assess_not_supported: "உங்கள் உலாவியில் பேச்சு அங்கீகாரம் ஆதரிக்கப்படவில்லை. தயவுசெய்து Chrome, Firefox, Safari அல்லது Edge ஐப் பயன்படுத்தவும்.",
        assess_keep_reading: "தொடர்ந்து வாசிக்கவும்...",
        assess_connecting: "இணைக்கிறது...",
        assess_confidence: "நம்பிக்கை",
        assess_transcript: "நிகழ்நேர படியெடுத்தல்:",
        assess_read_this: "இதை சத்தமாக வாசிக்கவும்:",
        assess_stop_recording: "பதிவை நிறுத்து",
        assess_cancel: "ரத்துசெய்",
        assess_analyzing: "உங்கள் வாசிப்பை பகுப்பாய்வு செய்கிறது...",
        assess_processing_1: "பேச்சை உரையாக மாற்றுதல்",
        assess_processing_2: "வாசிப்பு முறைகளை பகுப்பாய்வு செய்தல்",
        assess_processing_3: "மதிப்பெண்கள் மற்றும் கருத்துக்களை உருவாக்குதல்",
        assess_complete: "மதிப்பீடு முடிந்தது!",
        assess_analyzed: "உங்கள் வாசிப்பு பகுப்பாய்வு செய்யப்பட்டது",
        assess_overall_score: "மொத்த மதிப்பெண்",
        assess_what_you_read: "நீங்கள் வாசித்தது:",
        assess_no_text: "உரை எதுவும் பிடிக்கப்படவில்லை",
        assess_word_accuracy: "சொல் துல்லியம்",
        assess_pronunciation: "உச்சரிப்பு",
        assess_reading_speed: "வாசிப்பு வேகம்",
        assess_fluency: "சரம்",
        assess_comprehension: "புரிதல்",
        assess_feedback: "கருத்து",
        assess_your_score: "உங்கள் மதிப்பெண்",
        assess_class_avg: "வகுப்பு சராசரி",
        assess_try_again: "மீண்டும் முயற்சிக்கவும்",
        assess_return_dashboard: "முகப்பிற்குத் திரும்பு",
        assess_saving: "சேமிக்கிறது...",
        assess_loading: "மதிப்பீடு ஏற்றுகிறது...",
        assess_grade: "வகுப்பு",
        assess_min: "நிமி",
        assess_type_phoneme: "ஒலிப்பு அங்கீகாரம்",
        assess_type_word: "வார்த்தை வாசிப்பு",
        assess_type_passage: "பத்தி வாசிப்பு",
        assess_type_comprehension: "வாசிப்பு புரிதல்",
        assess_save_exit: "சேமித்து வெளியேறு",
        assess_tips_title: "மேம்பாட்டிற்கான உதவிக்குறிப்புகள்",
        assess_tip_1: "மெதுவாகவும் தெளிவாகவும் படிக்கவும். வேகம் முக்கியமல்ல - துல்லியம் முக்கியம்.",
        assess_tip_2: "மற்றொரு தேர்வை எடுப்பதற்கு முன் சிக்கலான வார்த்தைகளைத் தனியாகப் பயிற்சி செய்யுங்கள்.",
        assess_tip_3: "தினமும் சத்தமாகப் படிக்க முயற்சிக்கவும். இது சரளத்தையும் நம்பிக்கையையும் மேம்படுத்துகிறது.",
        assess_suggestions_title: "மேம்பாட்டிற்கான பரிந்துரைகள்",
        parent_this_month: "இந்த மாதம்",
        label_class_prefix: "வகுப்பு: ",
        label_subject_prefix: "பாடம்: ",
        dash_scores_distribution: "வாசிப்பு மதிப்பெண்கள் விநியோகம்",
        dash_individual_scores: "தனிப்பட்ட மதிப்பெண்கள் மற்றும் நிலை",
    },
}
