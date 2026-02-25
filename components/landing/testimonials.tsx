import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent",
    content:
      "LearnDetect identified my son's reading challenges early. The targeted interventions made all the difference in his confidence and performance.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "3rd Grade Teacher",
    content:
      "Finally, a tool that saves time while providing accurate assessments. My students love the interactive nature of the tests.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "School Administrator",
    content:
      "The analytics dashboard gives us unprecedented insight into student performance across the entire school. Invaluable for planning support.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "David Williams",
    role: "Literacy Specialist",
    content:
      "The speech analysis capabilities are sophisticated. It catches nuances that manual observation would miss. Highly recommend for any reading program.",
    rating: 5,
    avatar: "DW",
  },
]

export function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("testimonials_title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="border border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-sm text-primary">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
