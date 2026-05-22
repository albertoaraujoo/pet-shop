'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, startOfToday } from 'date-fns';
import {
  CalendarIcon,
  ChevronDownIcon,
  Clock,
  Dog,
  Loader2,
  Phone,
  User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import {
  appointmentFormSchema,
  type AppointmentFormValues,
} from '@/components/appointment-form/appointment-form.schema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { generateTimeOptions } from '@/utils/generate-time-options';

const TIME_OPTIONS = generateTimeOptions();

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      tutorName: '',
      petName: '',
      description: '',
      phone: '',
      scheduleAt: undefined,
      time: '',
    },
    resolver: zodResolver(appointmentFormSchema),
  });

  const { isSubmitting } = form.formState;

  function onSubmit(data: AppointmentFormValues) {
    console.log('agendamento', data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>
          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tutorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Nome do tutor
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-content-brand"
                      />
                      <Input
                        placeholder="Nome do tutor"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="petName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Nome do pet
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Dog
                        size={20}
                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-content-brand"
                      />
                      <Input
                        placeholder="Nome do pet"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Telefone
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone
                        size={20}
                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-content-brand"
                      />
                      <IMaskInput
                        placeholder="(99) 99999-9999"
                        mask="(00) 00000-0000"
                        className="ring-offset-background aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 pl-10 text-sm text-content-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Descrição do serviço
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do serviço"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <FormField
                control={form.control}
                name="scheduleAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Data
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-between border-border-primary bg-background-tertiary text-left font-normal text-content-primary hover:border-border-secondary hover:bg-background-tertiary hover:text-content-primary focus:border-border-brand focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                              !field.value && 'text-content-secondary'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                className="text-content-brand"
                                size={20}
                              />
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy')
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                            </div>
                            <ChevronDownIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Hora
                    </FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            'h-12 w-full border-border-primary bg-background-tertiary text-content-primary hover:border-border-secondary hover:bg-background-tertiary focus:border-border-brand focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                            !field.value && 'text-content-secondary'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-content-brand" />
                            <SelectValue placeholder="--:--" />
                          </div>
                        </SelectTrigger>

                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="brand" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Agendar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
