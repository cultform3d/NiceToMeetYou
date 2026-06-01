"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ArrowRight, Glasses, Square, Ghost, Lightbulb, Gift, Calendar, FileSignature, Wallet, PieChart, TrendingUp, Clock, AlertTriangle, Box, Undo2, ExternalLink } from "lucide-react"

export default function CULTFORMPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]))
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  // Calculator state
  const [printers, setPrinters] = useState(1)
  const [investmentInput, setInvestmentInput] = useState("500")
  const [reinvest, setReinvest] = useState(false)
  const [term, setTerm] = useState(3)

  const handlePrintersChange = (newCount: number) => {
    const count = Math.max(1, newCount)
    setPrinters(count)
    setInvestmentInput((count * 500).toString())
  }

  const handleInvestmentChange = (val: string) => {
    setInvestmentInput(val)
    const num = parseInt(val)
    if (!isNaN(num) && num > 0) {
      if (num % 500 === 0) {
        setPrinters(num / 500)
      }
    }
  }

  const handleInvestmentBlur = () => {
    let num = parseInt(investmentInput) || 500
    num = Math.max(500, Math.round(num / 500) * 500)
    setInvestmentInput(num.toString())
    setPrinters(num / 500)
  }

  let monthlyIncome = printers * 500 * (6 / 100)
  let annualIncome = monthlyIncome * 12
  
  const calculateRefund = (printerCount: number) => {
    return printerCount * 500;
  }

  let totalReturn = (annualIncome * term) + calculateRefund(printers);

  if (reinvest) {
    let simPrinters = printers;
    let simCash = 0;
    let totalGenerated = 0;
    
    for (let month = 1; month <= term * 12; month++) {
      const monthProfit = simPrinters * 500 * (6 / 100);
      totalGenerated += monthProfit;
      simCash += monthProfit;
      
      if (month < term * 12) {
        const newPrinters = Math.floor(simCash / 500);
        simPrinters += newPrinters;
        simCash -= newPrinters * 500;
      }
    }
    
    monthlyIncome = totalGenerated / (term * 12);
    annualIncome = totalGenerated / term;
    totalReturn = simCash + calculateRefund(simPrinters);
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    slideRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSlide(index)
                setVisibleSections((prev) => new Set([...prev, index]))
              }
            })
          },
          { threshold: 0.2 }
        )
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const slides = [
    { num: "01", label: "ГЛАВНАЯ" },
    { num: "02", label: "СУТЬ" },
    { num: "03", label: "ФОРМАТ" },
    { num: "04", label: "УСЛОВИЯ" },
    { num: "05", label: "БИЗНЕС" },
    { num: "06", label: "НАДЕЖНОСТЬ" },
    { num: "07", label: "КАЛЬКУЛЯТОР" },
    { num: "08", label: "МИССИЯ" },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-accent/20 selection:text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-6">
          <button 
            onClick={() => slideRefs.current[0]?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm md:text-base font-medium tracking-[0.3em] text-foreground hover:text-foreground/80 transition-colors"
          >
            CULTFORM
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {slides.map((slide, index) => (
              index !== 0 && (
                <button
                  key={slide.label}
                  onClick={() => slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
                  className={`px-3 py-2 text-[10px] tracking-[0.15em] transition-all duration-500 ${
                    activeSlide === index 
                      ? "text-accent" 
                      : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  {slide.label}
                </button>
              )
            ))}
          </div>
          <div className="lg:hidden flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] text-foreground/50">
              {slides[activeSlide]?.label}
            </span>
            <span className="text-sm font-light tabular-nums text-foreground">
              {String(activeSlide + 1).padStart(2, "0")}
              <span className="text-foreground/30">/08</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Slide Progress Indicator */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
            className={`w-[2px] transition-all duration-500 ${
              activeSlide === index 
                ? "h-8 bg-accent" 
                : "h-4 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Slide 1 - Hero */}
      <section
        ref={(el) => { slideRefs.current[0] = el }}
        className="min-h-screen flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-32 pb-12 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[60%] h-[1px] bg-gradient-to-l from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div
          className={`flex-1 flex flex-col justify-center items-center text-center w-full max-w-screen-2xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[11vw] font-semibold tracking-[-0.03em] leading-none mb-8 md:mb-12">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70" style="letter-spacing: .97rem;font-size: 10vw;">CULTFORM</span>
            </h1>
          </div>
          <div className="max-w-3xl lg:max-w-4xl flex flex-col items-center">
            <div className="h-[1px] w-24 bg-accent mb-8" />
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.5rem] font-light leading-[1.3] text-foreground/90">
              Как проживать прекрасное настоящее, позаботившись о будущем?
            </p>
          </div>
          
          {/* 3D Printed Figures */}
          <div className={`flex flex-wrap justify-center gap-6 md:gap-12 w-full mt-16 md:mt-24 transition-all duration-1000 delay-300 ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="w-20 h-20 md:w-28 md:h-28 bg-neon-purple rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(115,109,245,0.3)]">
              <Gift className="w-10 h-10 md:w-14 md:h-14 fill-current stroke-[1.5]" />
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 bg-neon-green rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(15,187,66,0.3)]">
              <Square className="w-10 h-10 md:w-14 md:h-14 fill-current stroke-[1.5]" />
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 bg-neon-orange rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(246,96,35,0.3)]">
              <Ghost className="w-10 h-10 md:w-14 md:h-14 fill-current stroke-[1.5]" />
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 bg-neon-yellow rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(255,194,0,0.3)]">
              <Lightbulb className="w-10 h-10 md:w-14 md:h-14 fill-current stroke-[1.5]" />
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 bg-neon-blue rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-14 md:h-14">
                <circle cx="6" cy="12" r="4" />
                <circle cx="18" cy="12" r="4" />
                <path d="M10 12a2 2 0 0 0 2-2 2 2 0 0 0 2 2" fill="none" />
              </svg>
            </div>
          </div>
        </div>


      </section>

      {/* Slide 2 - Income */}
      <section
        ref={(el) => { slideRefs.current[1] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-semibold tracking-[-0.02em] leading-none mb-16 lg:mb-24">
              Начать просто:
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="group relative p-8 md:p-12 lg:p-16 border border-neon-purple/20 hover:border-neon-purple/50 bg-neon-purple/5 hover:bg-neon-purple/10 transition-colors duration-500 rounded-2xl">
                <div className="absolute top-0 left-0 w-16 h-1 bg-neon-purple rounded-tl-2xl" />
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                  Приобретенный вами 3D-принтер за{" "}
                  <span className="text-neon-purple font-semibold">500 долларов</span>{" "}
                  обеспечивает доход{" "}
                  <span className="text-neon-purple font-semibold">6% в месяц</span>
                </p>
              </div>
              <div className="group relative p-8 md:p-12 lg:p-16 border border-neon-green/20 hover:border-neon-green/50 bg-neon-green/5 hover:bg-neon-green/10 transition-colors duration-500 rounded-2xl">
                <div className="absolute top-0 left-0 w-16 h-1 bg-neon-green rounded-tl-2xl" />
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                  Планируемая плавающая доходность{" "}
                  <span className="text-neon-green font-semibold">4 - 8% в месяц</span>{" "}
                  (зависит от продаж), средняя —{" "}
                  <span className="text-neon-green font-semibold">72% годовых</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3 - Format */}
      <section
        ref={(el) => { slideRefs.current[2] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-24">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-[-0.02em] leading-tight sticky top-32">
                  Формат<br />взаимодействия:
                </h2>
              </div>
              
              <div className="space-y-0">
                {[
                  "Покупка 3D-принтера для клиента",
                  "Передача 3D-принтера в управление компании CULTFORM",
                  "Осуществление управления принтером компанией CULTFORM - хранение, производство продукции, обслуживание, реализация продукции",
                  "Получение клиентом ежемесячной арендной платы за работу оборудования",
                  "При желании клиента - приобретение дополнительных принтеров, или реинвестирование в дополнительные мощности",
                ].map((item, index) => {
                  const colors = ["text-neon-purple", "text-neon-green", "text-neon-orange", "text-neon-yellow", "text-neon-blue"];
                  const colorClass = colors[index % colors.length];
                  return (
                  <div
                    key={index}
                    className="group flex gap-6 md:gap-8 items-start py-6 md:py-8 border-b border-border/50 last:border-b-0 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <span className={`text-3xl md:text-4xl lg:text-5xl font-light opacity-60 group-hover:opacity-100 transition-colors min-w-[60px] md:min-w-[80px] ${colorClass} group-hover:drop-shadow-[0_0_10px_currentColor]`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed pt-2 md:pt-3">{item}</p>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4 - Conditions */}
      <section
        ref={(el) => { slideRefs.current[3] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.02em] leading-none mb-12 lg:mb-20">
              Условия:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 pb-8 lg:pb-16">
              {[
                {
                  text: "Прием в управление новых принтеров осуществляется 1-го и 15-го числа каждого месяца",
                  Icon: Calendar,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Оформляется официальный договор доверительного управления оборудованием, предусматривающий выплату арендной платы",
                  Icon: FileSignature,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Выплата арендной платы происходит каждый месяц, и осуществляется в зависимости от даты передачи принтера в управление - 1-го или 15-го числа",
                  Icon: Wallet,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Расчет арендной платы осуществляется ежемесячно и составляет 50% от прибыли, вырученной от продажи продукции с одного принтера",
                  Icon: PieChart,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Прогнозируемая доходность составляет от 4% до 8% в месяц, в среднем 72% годовых",
                  Icon: TrendingUp,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Минимальный срок контракта - 12 месяцев",
                  Icon: Clock,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Максимальный срок контракта - 5 лет после чего может наступить риск износа принтера, если клиент не докупает дополнительные мощности и не реинвестирует",
                  Icon: AlertTriangle,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "297 долларов - стоимость принтера, 203 доллара - стоимость сырьевого материала",
                  Icon: Box,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
                {
                  text: "Возврат вклада может быть осуществлен в размере 100% за стоимость материала и 50% за стоимость принтера в течение первых 3-х лет. По истечении данного срока возвращается только 100% затрат на материал, так как с реализацией принтера на вторичном рынке могут быть сложности.",
                  Icon: Undo2,
                  hoverClass: "hover:border-accent/50 hover:bg-accent/5",
                  textClass: "text-accent",
                  bgClass: "bg-accent/10"
                },
              ].map((item, index) => {
                const Icon = item.Icon;
                const colors = [
                  { text: "text-neon-purple", bg: "bg-neon-purple/10", border: "hover:border-neon-purple/50" },
                  { text: "text-neon-green", bg: "bg-neon-green/10", border: "hover:border-neon-green/50" },
                  { text: "text-neon-orange", bg: "bg-neon-orange/10", border: "hover:border-neon-orange/50" },
                  { text: "text-neon-yellow", bg: "bg-neon-yellow/10", border: "hover:border-neon-yellow/50" },
                  { text: "text-neon-blue", bg: "bg-neon-blue/10", border: "hover:border-neon-blue/50" }
                ];
                const colorSet = colors[index % colors.length];

                return (
                <div
                  key={index}
                  className={`group relative px-6 py-10 md:px-8 md:py-12 border border-dashed border-foreground/20 transition-all duration-500 flex flex-col items-center text-center gap-6 overflow-hidden ${colorSet.border} hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-foreground/[0.02] ${
                    index % 3 === 1 ? "lg:translate-y-12" : ""
                  } ${
                    index === 8 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  style={{ borderRadius: '3rem' }}
                >
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black opacity-5 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 z-0 ${colorSet.text}`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  
                  <div className={`p-4 rounded-full ${colorSet.bg} ${colorSet.text} group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_currentColor] transition-all duration-500 z-10`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                  </div>
                  
                  <p className="text-sm md:text-base leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors z-10">
                    {item.text}
                  </p>
                </div>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5 - Business Model */}
      <section
        ref={(el) => { slideRefs.current[4] = el }}
        className="min-h-screen px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.02em] leading-none mb-16 lg:mb-24">
              Бизнес-модель:
            </h2>

            {/* B2B Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:pr-16 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-semibold text-neon-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">B2B</span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
                  Производство комплектующих для бизнеса: мы поставляем детали, необходимые для создания конечного продукта. Первый пример — 3D-печатные оправы для очков.
                </p>
                <div className="p-6 md:p-8 bg-surface rounded-2xl border border-neon-blue/20 border-l-4 border-l-neon-blue">
                  <p className="text-muted text-[10px] tracking-[0.2em] mb-4">СЕБЕСТОИМОСТЬ — РЕАЛИЗАЦИЯ</p>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg">
                      себес оправы: <span className="text-neon-blue font-semibold">0.5-1$</span>
                    </p>
                    <p className="text-base md:text-lg">
                      цена продажи оправы салону оптики: <span className="text-neon-blue font-semibold">10-30$</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-neon-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <img
                    src="/b2b_glasses.png"
                    alt="3D-печатные оправы для очков"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-neon-blue rounded-full opacity-50 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
            </div>

            {/* B2C Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-neon-purple/30 shadow-[0_0_30px_rgba(115,109,245,0.15)]">
                  <img
                    src="/b2c_ghosts.png"
                    alt="Набор из 3 привидений"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-neon-purple rounded-full opacity-50 drop-shadow-[0_0_10px_rgba(115,109,245,0.5)]" />
              </div>
              <div className="lg:pl-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-semibold text-neon-purple drop-shadow-[0_0_15px_rgba(115,109,245,0.3)]">B2C</span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
                  Производство дизайнерских изделий для повседневной жизни и эстетического оформления пространства
                </p>
                <div className="p-6 md:p-8 bg-surface rounded-2xl border border-neon-purple/20 border-l-4 border-l-neon-purple">
                  <p className="text-muted text-[10px] tracking-[0.2em] mb-4">СЕБЕСТОИМОСТЬ — РЕАЛИЗАЦИЯ</p>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg">
                      себестоимость одного набора из 3 привидений - <span className="text-neon-purple font-semibold">1.9$</span>
                    </p>
                    <p className="text-base md:text-lg">
                      цена продажи набора - <span className="text-neon-purple font-semibold">3.5$</span>
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex">
                  <a 
                    href="https://www.trendyol.com/genel-markalar/hayalet-figur-seti-kalpli-kitap-okuyan-ve-balonlu-modeller-ev-dekorasyonu-hediye-alternatifi-dekor-p-1048878601?boutiqueId=61&merchantId=1094335"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-neon-purple/20 bg-neon-purple/5 hover:bg-neon-purple/10 text-foreground transition-all duration-300"
                  >
                    <span className="text-sm md:text-base font-medium">Посмотреть аналог на Trendyol</span>
                    <ExternalLink className="w-4 h-4 text-neon-purple group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6 - Risks */}
      <section
        ref={(el) => { slideRefs.current[5] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.02em] leading-none mb-12 lg:mb-20">
              Предусмотрены<br />важные детали:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  title: "Соблюдение авторских прав",
                  solution: "Используем исключительно Open Source (CC BY) материалы и приобретаем расширенные коммерческие лицензии.",
                },
                {
                  title: "Сохранность при доставке",
                  solution: "Применяем многослойную защитную упаковку и работаем с пулом проверенных логистических партнеров.",
                },
                {
                  title: "Бесперебойная поставка сырья",
                  solution: "Основной материал (PLA+) всегда доступен на рынке, а стратегические закупки исключают любые задержки.",
                },

                {
                  title: "Стабильность бизнеса",
                  solution: "Широкий ассортимент товаров под разные сезоны и аудитории, минимизация накладных расходов и надежная финансовая подушка.",
                },
                {
                  title: "Безотказная работа оборудования",
                  solution: "Обеспечение еженедельного ТО и формирование фонда оперативной замены комплектующих (сопла и экструдеры всегда в наличии).",
                },
                {
                  title: "Энергонезависимость производства",
                  solution: "Всё оборудование защищено и подключено к резервным генераторам на случай любых перебоев с электричеством.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative p-6 md:p-8 lg:p-10 border border-foreground/10 hover:border-neon-orange/40 hover:shadow-[0_0_20px_rgba(246,96,35,0.15)] hover:bg-foreground/[0.02] transition-all duration-500 ${
                    index === 6 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-neon-orange shadow-[0_0_10px_rgba(246,96,35,0.8)] transition-all duration-500" />
                  <h4 className="text-lg md:text-xl lg:text-2xl font-medium mb-4 flex items-start gap-4">
                    <span className="w-2 h-2 bg-neon-orange mt-2 flex-shrink-0 drop-shadow-[0_0_5px_rgba(246,96,35,0.8)]" />
                    <span className="group-hover:text-neon-orange transition-colors duration-500">{item.title}</span>
                  </h4>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed pl-6">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7 - Calculator */}
      <section
        ref={(el) => { slideRefs.current[6] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(6) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-none mb-12 lg:mb-20">
              Калькулятор дохода:
            </h2>

            <div className="border border-foreground/10 p-8 md:p-12 lg:p-16">
              <div className="space-y-12">
                {/* Printers */}
                <div className="space-y-4">
                  <label className="text-muted text-[10px] tracking-[0.2em] block">
                    КОЛИЧЕСТВО ПРИНТЕРОВ
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePrintersChange(printers - 1)}
                      className="w-14 h-14 border border-foreground/20 text-2xl hover:bg-surface hover:border-foreground/40 transition-all flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={printers}
                      onChange={(e) => handlePrintersChange(parseInt(e.target.value) || 1)}
                      className="w-32 h-14 bg-transparent border border-foreground/20 text-center text-2xl font-semibold focus:outline-none focus:border-neon-purple focus:shadow-[0_0_15px_rgba(115,109,245,0.3)] tabular-nums"
                    />
                    <button
                      onClick={() => handlePrintersChange(printers + 1)}
                      className="w-14 h-14 border border-foreground/20 text-2xl hover:bg-surface hover:border-foreground/40 transition-all flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Printer Cost */}
                <div className="space-y-4">
                  <label className="text-muted text-[10px] tracking-[0.2em] block">
                    ОБЪЕМ ВКЛАДА ($) <span className="text-neon-purple ml-2 text-[9px] drop-shadow-[0_0_5px_rgba(115,109,245,0.5)]">*ТОЛЬКО КРАТНО 500</span>
                  </label>
                  <input
                    type="number"
                    step="500"
                    min="500"
                    value={investmentInput}
                    onChange={(e) => handleInvestmentChange(e.target.value)}
                    onBlur={handleInvestmentBlur}
                    className="w-full h-14 bg-transparent border border-foreground/20 px-6 text-xl font-semibold focus:outline-none focus:border-neon-purple focus:shadow-[0_0_15px_rgba(115,109,245,0.3)] tabular-nums"
                  />
                </div>

                {/* Monthly Rate Info */}
                <div className="space-y-4">
                  <div className="p-4 md:p-6 bg-surface border-l-2 border-neon-purple rounded-xl">
                    <p className="text-muted text-[10px] tracking-[0.2em] mb-2">
                      ДОХОДНОСТЬ
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                      Из расчета в среднем <span className="text-neon-purple font-semibold drop-shadow-[0_0_10px_rgba(115,109,245,0.5)]">6% в месяц</span> доходность начисляется в виде выплат.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-muted text-[10px] tracking-[0.2em] block">
                    СРОК КОНТРАКТА (ЛЕТ)
                  </label>
                  <div className="flex items-center gap-8">
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={term}
                        onChange={(e) => setTerm(parseInt(e.target.value))}
                        className="w-full accent-neon-purple"
                        style={{ backgroundSize: `${((term - 1) * 100) / 4}% 100%` }}
                      />
                      <div className="flex justify-between text-[10px] text-muted mt-2">
                        <span>1</span>
                        <span>5</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right w-24 text-neon-purple drop-shadow-[0_0_10px_rgba(115,109,245,0.3)]">
                      <span className="text-5xl font-semibold leading-none tabular-nums">{term}</span>
                      <span className="text-2xl font-medium mt-1">{term === 1 ? 'год' : term > 4 ? 'лет' : 'года'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-6">
                  <span className="text-sm md:text-base font-medium">Расчет с учетом реинвестирования по мере накопления на каждый новый принтер</span>
                  <button
                    onClick={() => setReinvest(!reinvest)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all flex-shrink-0 ${reinvest ? 'bg-neon-purple shadow-[0_0_10px_rgba(115,109,245,0.5)]' : 'bg-foreground/20'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${reinvest ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="h-[1px] bg-border" />

                {/* Results */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 md:p-8 bg-surface border-l-2 border-neon-purple rounded-2xl">
                    <p className="text-muted text-[10px] tracking-[0.2em] mb-4">{reinvest ? 'СРЕДНИЙ ДОХОД В МЕСЯЦ' : 'ДОХОД В МЕСЯЦ'}</p>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold tabular-nums text-neon-purple drop-shadow-[0_0_10px_rgba(115,109,245,0.3)]" style="font-size: 3rem;">
                      ${monthlyIncome.toFixed(0)}
                    </p>
                  </div>
                  <div className="p-6 md:p-8 bg-surface border-l-2 border-neon-purple rounded-2xl">
                    <p className="text-muted text-[10px] tracking-[0.2em] mb-4">{reinvest ? 'СРЕДНИЙ ДОХОД В ГОД' : 'ДОХОД В ГОД'}</p>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-semibold tabular-nums text-neon-purple drop-shadow-[0_0_10px_rgba(115,109,245,0.3)]">
                      ${annualIncome.toFixed(0)}
                    </p>
                  </div>
                </div>

                <div className="text-center pt-8 md:pt-12 mt-4 border-t border-border/10">
                  <p className="text-muted text-lg md:text-xl lg:text-2xl mb-4">
                    Итого на руках через {term} {term === 1 ? 'год' : term > 4 ? 'лет' : 'года'} (с учетом возврата вклада):
                  </p>
                  <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tabular-nums text-neon-green drop-shadow-[0_0_15px_rgba(115,109,245,0.4)]">
                    ${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8 - Mission */}
      <section
        ref={(el) => { slideRefs.current[7] = el }}
        className="min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-border" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-0">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleSections.has(7) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-[-0.02em] leading-none mb-16 lg:mb-24 text-center">
              Миссия:
            </h2>
            
            <div className="mb-20 lg:mb-28 flex justify-center">
              <div className="group relative py-6 flex flex-col items-center text-center">
                <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 leading-[1.1] text-neon-yellow drop-shadow-[0_0_20px_rgba(255,194,0,0.4)]">
                  Гедонизм
                </p>
                <div className="w-16 h-[2px] bg-neon-yellow mb-6 shadow-[0_0_10px_rgba(255,194,0,0.8)]" />
                <p className="text-lg md:text-xl lg:text-2xl text-muted uppercase tracking-[0.2em] font-light">
                  в каждый дом
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 lg:gap-16 mb-24 lg:mb-32 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-foreground/10 hidden sm:block" />
              {[
                { highlight: "Пассивный доход", text: "арендодателям" },
                { highlight: "Мощности для творчества", text: "передовым дизайнерам и инженерам" },
                { highlight: "Полезная и приятная продукция", text: "пользователям" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative pt-8 md:pt-12 flex flex-col items-center text-center hover:bg-foreground/[0.02] transition-colors duration-500 rounded-xl p-4"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-[2px] bg-neon-yellow shadow-[0_0_10px_rgba(255,194,0,0.8)] group-hover:w-full transition-all duration-700 hidden sm:block" />
                  <div className="w-12 h-[1px] bg-neon-yellow mb-6 sm:hidden shadow-[0_0_10px_rgba(255,194,0,0.8)]" />
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 leading-[1.1] group-hover:text-neon-yellow transition-colors duration-500">
                    {item.highlight}
                  </p>
                  <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-16 border-t border-dashed border-border">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-[1px] bg-neon-yellow mb-12 shadow-[0_0_10px_rgba(255,194,0,0.8)]" />
                <p className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-[0.1em] mb-8">
                  CULTFORM
                </p>
                <p className="text-muted text-[10px] tracking-[0.4em]">
                  ИНВЕСТИЦИИ В БУДУЩЕЕ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
