"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


import { useLanguage } from "@/components/providers/language-provider"
import { TranslationKeys } from "@/lib/translations"

export function FAQSection() {
  const { t } = useLanguage()
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("faq_section_title")}</h2>
          <p className="text-lg text-muted-foreground">{t("faq_section_desc")}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {[...Array(6)].map((_, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border/50">
              <AccordionTrigger className="text-left hover:text-primary transition-colors py-4">
                <span className="font-semibold text-foreground">{t(`faq_q_${idx}` as TranslationKeys)}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">{t(`faq_a_${idx}` as TranslationKeys)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
