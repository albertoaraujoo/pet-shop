import { cn } from '@/lib/utils';
import type { Appointment } from '@/types/appointment';

export type AppointmentCardProps = {
  appointment: Appointment;
  isFirstInSection: boolean;
};

export function AppointmentCard({
  appointment,
  isFirstInSection = false,
}: AppointmentCardProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 items-center py-3 md:grid-cols-[15%_35%_30%_20%]',
        !isFirstInSection && 'border-t border-[#2E2C30]'
      )}
    >
      <div className="pr-4 text-left md:pr-0">
        <span className="text-label-small font-semibold text-content-primary">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:pr-4 md:text-left">
        <div className="flex items-center justify-end gap-1 md:justify-start">
          <span className="text-label-small-size font-semibold text-content-primary">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            |
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>
      </div>

      <div className="col-span-2 mt-1 hidden pr-4 text-left md:col-span-1 md:mt-0 md:block">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>
    </div>
  );
}
