import React from 'react';
import { 
  Laptop, 
  Palette, 
  Sparkles, 
  CheckCircle, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Terminal, 
  Layers,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  const coreFocusAreas = [
    {
      icon: Laptop,
      title: 'Full-Stack Web Development',
      description: 'Crafting responsive, secure web platforms using modern architectures (React, Next.js, Node.js, Express) with structured database back-ends.'
    },
    {
      icon: Palette,
      title: 'Graphic & Brand Identity Design',
      description: 'Developing high-impact visual identities: memorable logos, marketing posters, promotional flyers, high-CTR YouTube thumbnails, and social media sets.'
    },
    {
      icon: Compass,
      title: 'Visual Creativity & Technical Logic',
      description: 'Bridging the gap between software engineering precision and creative design intuition to produce cohesive, delightful digital products.'
    },
    {
      icon: GraduationCap,
      title: 'Computer Science Foundation',
      description: 'Strengthening problem-solving, algorithms, and web architecture as an active BSCS student based in Sindh, Pakistan.'
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Professional Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3 text-balance">
            About Santosh Kumar <span className="text-teal-700">Bheel</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Full-Stack Developer, Graphic Designer, and BSCS student from Sindh, Pakistan dedicated to engineering purposeful web solutions and striking graphic design.
          </p>
          <AjrakDivider />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Narrative & Bio: 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              {profile?.bioParagraphs && profile.bioParagraphs.length > 0 ? (
                profile.bioParagraphs.map((para, idx) => (
                  <p key={idx} className="font-normal">
                    {para}
                  </p>
                ))
              ) : (
                <>
                  <p>
                    I am a Pakistani Full-Stack Developer, Graphic Designer, and BSCS student passionate about building modern, responsive websites and crafting visually compelling branding materials.
                  </p>
                  <p>
                    My work spans front-end and back-end web development—from responsive single-page applications built with React and Tailwind CSS to scalable Node.js services and SQL databases.
                  </p>
                  <p>
                    In parallel with coding, I design corporate logos, marketing posters, event flyers, YouTube thumbnails, and social media graphics using industry-standard tools like Adobe Photoshop, Illustrator, CorelDRAW, and PixelLab.
                  </p>
                </>
              )}
            </div>

            {/* Quick Contact & Verified Identity strip */}
            <div className="mt-3 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={15} className="text-teal-600" />
                <span className="font-medium">{profile?.location || 'Sindh, Pakistan'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={15} className="text-amber-600" />
                <span className="font-mono font-medium">{profile?.phone || '03313101886'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={15} className="text-teal-600" />
                <span className="font-medium">{profile?.email || 'rahisantoshkumar843@gmail.com'}</span>
              </div>
            </div>
          </div>

          {/* Core Focus Cards: 5 cols */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
            {coreFocusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500/60 hover:bg-white transition-all duration-200 group shadow-xs hover:shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-heading mb-1">
                        {area.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
