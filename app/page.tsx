"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"
import BeamsBackground from "@/components/landing/beams-background"
import { FeatureCard } from "@/components/ui/feature-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { WorkflowSteps } from "@/components/landing/workflow-steps"
import { BenefitsGrid } from "@/components/landing/benefits-grid"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQSection } from "@/components/landing/faq-section"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/providers/language-provider"

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">LearnDetect</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/doctors">
              <Button variant="ghost" className="text-sm">
                {t("nav_doctors")}
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                {t("nav_signin")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">{t("nav_get_started")}</Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section with Beams Background */}
      <section className="relative overflow-hidden">
        <BeamsBackground intensity="strong" className="min-h-screen" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm text-black"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>{t("hero_badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground text-balance"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            {t("hero_description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/signup">
              <GradientButton size="lg" className="gap-2 text-base">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
            <Link href="#workflow">
              <Button size="lg" variant="outline" className="text-base bg-white/10 border-white/20 hover:bg-white/20">
                Learn How It Works
              </Button>
            </Link>
          </motion.div>

          
        </div>
      </section>

      <div id="workflow">
        <WorkflowSteps />
      </div>

      <BenefitsGrid />

      {/* Features Section with Enhanced Cards */}
      <section id="features" className="py-20 sm:py-32 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("features_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("features_desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Speech Recognition",
                desc: "Advanced audio processing captures precise pronunciation, rhythm, and fluency patterns from natural reading.",
                icon: "🎤",
              },
              {
                title: "AI-Powered Analysis",
                desc: "Machine learning algorithms identify patterns and provide actionable insights into reading development.",
                icon: "🧠",
              },
              {
                title: "Collaborative Dashboards",
                desc: "Separate interfaces for students, parents, teachers, and administrators enable seamless communication.",
                icon: "📊",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard title={feature.title} description={feature.desc} icon={feature.icon} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <FAQSection />

      {/* User Roles Section */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("roles_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("roles_desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                role: "Students",
                desc: "Take engaging reading assessments",
                path: "/student-dashboard",
                icon: "📚",
              },
              {
                role: "Parents",
                desc: "Track progress and get insights",
                path: "/parent-dashboard",
                icon: "👨‍👩‍👧",
              },
              {
                role: "Teachers",
                desc: "Analyze class performance data",
                path: "/teacher-dashboard",
                icon: "👨‍🏫",
              },
              {
                role: "Doctors",
                desc: "Browse and consult medical experts",
                path: "/doctors",
                icon: "🩺",
              },
              {
                role: "Administrators",
                desc: "Manage users and system settings",
                path: "/admin-dashboard",
                icon: "⚙️",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={item.path}>
                  <FeatureCard title={item.role} description={item.desc} icon={item.icon} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">{t("cta_title")}</h2>
          <p className="text-lg opacity-90 mb-10 text-balance max-w-2xl mx-auto">
            {t("cta_desc")}
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              {t("cta_button")} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{t("footer_rights")}</span>
            </div>
            <div className="flex gap-6">
              <Link href="/doctors" className="hover:text-foreground transition-colors">
                Doctors
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
