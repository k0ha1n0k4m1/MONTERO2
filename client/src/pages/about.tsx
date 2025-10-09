import { useLanguage } from "@/hooks/useLanguage"

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen pt-20">
      {}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center bg-black/20 backdrop-blur rounded-[2rem] p-12 lg:p-16 border border-white/10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: 'IFC LOS BANDITOS, serif' }}>
              About MonTero
            </h1>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
              <span className="text-white/60 text-sm font-light tracking-[0.3em] uppercase">Our Story</span>
              <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
              Born from the passion for racing and the pursuit of exceptional style, MonTero represents the fusion of speed, precision, and fashion.
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-black/20 backdrop-blur rounded-[2rem] p-8 border border-white/10">
              <h2 className="text-3xl font-light text-white mb-6">The Racing Heritage</h2>
              <p className="text-white/70 font-light leading-relaxed mb-6">
                Every piece in our collection tells a story of adrenaline, precision, and the relentless pursuit of perfection.
                Inspired by the legendary racing circuits and the fearless drivers who conquer them.
              </p>
              <p className="text-white/70 font-light leading-relaxed">
                From the checkered flag to the podium celebration, MonTero captures the essence of victory
                and translates it into wearable art that speaks to the champion within you.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur rounded-[2rem] p-8 border border-white/10">
              <h2 className="text-3xl font-light text-white mb-6">Crafted for Champions</h2>
              <p className="text-white/70 font-light leading-relaxed mb-6">
                Our rare racing collection features meticulously crafted pieces that embody the spirit of motorsport.
                Each garment is designed with the same attention to detail found in championship-winning race cars.
              </p>
              <p className="text-white/70 font-light leading-relaxed">
                Premium materials, cutting-edge design, and limited edition releases ensure that wearing MonTero
                is not just a fashion statement—it's a declaration of your racing soul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-8">Our Values</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-48 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-black/20 backdrop-blur rounded-[2rem] p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Speed</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Lightning-fast innovation and delivery, just like our racing inspiration.
              </p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur rounded-[2rem] p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Precision</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Every detail matters, from design to delivery, engineered for perfection.
              </p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur rounded-[2rem] p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Excellence</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Championship quality in every thread, designed for those who demand the best.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}