import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, Target, Clock } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { TranslationKeys } from "@/lib/translations"

// Keep array for structure/icons but remove strings
const benefits = [
  {
    icon: Target,
    color: "primary",
  },
  {
    icon: Clock,
    color: "accent",
  },
  {
    icon: TrendingUp,
    color: "secondary",
  },
  {
    icon: Zap,
    color: "primary",
  },
]

export function BenefitsGrid() {
  const { t } = useLanguage()
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("benefits_section_title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("benefits_section_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card key={idx} className="border border-border/50 hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-xl">{t(`benefit_title_${idx}` as TranslationKeys)}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-${benefit.color}/10 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${benefit.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <div className="text-xs font-semibold text-destructive mb-1">BEFORE</div>
                      <div className="font-semibold text-sm text-foreground">{["Missed signs", "Manual evaluation", "Generic support", "Multiple tools"][idx]}</div>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <div className="text-xs font-semibold text-accent mb-1">AFTER</div>
                      <div className="font-semibold text-sm text-foreground">{["Caught early", "Automated analysis", "Targeted intervention", "One platform"][idx]}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    {/* Note: Metadata like BEFORE/AFTER and metrics are kept static or need separate keys if desired */}
                    <div className="text-3xl font-bold text-primary mb-1">{["90%", "6 hours", "45%", "4x"][idx]}</div>
                    <div className="text-sm text-muted-foreground">{t(`benefit_desc_${idx}` as TranslationKeys)}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
