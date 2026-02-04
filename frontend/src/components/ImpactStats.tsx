import { Users, Heart, Clock, Building2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    icon: Users,
    number: 125000,
    suffix: '+',
    label: 'Donors Registered',
  },
  {
    icon: Heart,
    number: 450000,
    suffix: '+',
    label: 'Lives Saved',
  },
  {
    icon: Clock,
    number: 24,
    suffix: '/7',
    label: 'Emergency Support',
  },
  {
    icon: Building2,
    number: 350,
    suffix: '+',
    label: 'Partner Hospitals',
  },
];

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);

  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = stat.icon;
  const count = useCountUp(stat.number, 3000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
        <Icon className="w-8 h-8 text-red-600" />
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
}

export function ImpactStats() {
  return (
    <section className="bg-gradient-to-br from-red-50 to-red-100/50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we're making a difference in communities across the nation
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
