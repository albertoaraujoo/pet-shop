import { Cloud, Moon, Sun } from 'lucide-react';

import { AppointmentCard } from '@/components';
import type { AppointmentPeriod } from '@/types/appointment';

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloud className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section className="mb-8 rounded-xl bg-background-tertiary">
      <div className="flex items-center justify-between border-b border-[#2E2C30] px-5 py-3">
        <div className="flex items-center gap-2">
          {periodIcons[period.type]}
          <h2 className="text-label-large-size text-content-primary">
            {period.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary">
          {period.timeRange}
        </span>
      </div>

      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Nenhum agendamento para este período.</p>
      )}
    </section>
  );
};
