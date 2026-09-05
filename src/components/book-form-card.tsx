"use client";

import { ChevronDownIcon, Loader2, UserIcon, Users2Icon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { useActionState, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { bookTable } from "@/lib/actions";
import { BookFormType } from "@/lib/dto";

type BookCardProps = {
  onBook: (state: BookFormType) => void;
  className?: string;
};

export function BookFormCard({ onBook, className }: BookCardProps) {
  const [bookState, action, isPending] = useActionState(bookTable, undefined);
  const [formState, setFormState] = useState<BookFormType>({
    name: "",
    phone: "",
    date: new Date(),
    time: "",
    guestsCount: 0
  });

  const parseValue = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const formatPhone = (digits: string) => {
    return digits.replace(/(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, g1, g2, g3, g4) => {
      let res = g1;

      if (g2) res += ` ${g2}`;
      if (g3) res += `-${g3}`;
      if (g4) res += `-${g4}`;

      return res;
    });
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState(prev => ({ ...prev, phone: parseValue(value).slice(0, 10) }));
  };

  useEffect(() => {
    if (bookState?.success) onBook(formState);
  }, [bookState]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Book a table</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <FieldGroup className="gap-y-2.5">
            <Field data-invalid={Boolean(bookState?.name)}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="name"
                  name="name"
                  placeholder="Your name..."
                  required
                  aria-invalid={Boolean(bookState?.name)}
                  value={formState.name}
                  onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                />
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-xs h-4 text-destructive">{bookState?.name}</FieldDescription>
            </Field>

            <Field data-invalid={Boolean(bookState?.phone)}>
              <input type="hidden" name="phone" value={formState.phone} />
              <FieldLabel htmlFor="phone">Phone number</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="phone"
                  placeholder="000 000-00-00"
                  type="tel"
                  required
                  maxLength={13} // " " & "-" are included
                  onChange={handlePhoneInputChange}
                  value={formatPhone(formState.phone)}
                  aria-invalid={Boolean(bookState?.phone)}
                />
                <InputGroupAddon>+7</InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-xs h-4 text-destructive">{bookState?.phone}</FieldDescription>
            </Field>

            <div className="w-full flex justify-between gap-6">
              <Field data-invalid={Boolean(bookState?.date)}>
                <input type="hidden" name="date" value={formState.date.toISOString()} />

                <FieldLabel htmlFor="date" className="pointer-events-none">
                  Date
                </FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        id="date"
                        variant="outline"
                        data-empty={!formState.date}
                        aria-invalid={Boolean(bookState?.date)}
                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {formState.date ? formState.date.toDateString() : <span>Pick a date</span>}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formState.date}
                      onSelect={selectedDate =>
                        setFormState(prev => ({ ...prev, date: selectedDate ?? prev.date }))
                      }
                      defaultMonth={formState.date}
                      disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
                <FieldDescription className="text-xs h-4 text-destructive">
                  {bookState?.date}
                </FieldDescription>
              </Field>

              <Field data-invalid={Boolean(bookState?.time)}>
                <input type="hidden" name="time" value={formState.time} />

                <FieldLabel htmlFor="time" className="pointer-events-none">
                  Time
                </FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        id="time"
                        variant="outline"
                        data-empty={!formState.time}
                        aria-invalid={Boolean(bookState?.time)}
                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {formState.time ? formState.time : <span>Pick a time</span>}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-2 grid gap-2 grid-cols-3" align="start">
                    {Array.from({ length: 11 }, (_, i) => i + 12).map(hour => (
                      <Button
                        key={hour}
                        size="sm"
                        variant="secondary"
                        className="rounded-md!"
                        onClick={() => setFormState(prev => ({ ...prev, time: `${hour}:00` }))}
                      >{`${hour}:00`}</Button>
                    ))}
                  </PopoverContent>
                </Popover>
                <FieldDescription className="text-xs h-4 text-destructive">
                  {bookState?.time}
                </FieldDescription>
              </Field>
            </div>

            <Field data-invalid={Boolean(bookState?.guestsCount)}>
              <FieldLabel htmlFor="guestsCount">Number of guests</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  id="guestsCount"
                  name="guestsCount"
                  maxLength={2}
                  type="number"
                  placeholder="Type a number..."
                  aria-invalid={Boolean(bookState?.guestsCount)}
                  value={formState.guestsCount || ""}
                  onChange={e =>
                    setFormState(prev => ({
                      ...prev,
                      guestsCount: Number(parseValue(e.target.value).slice(0, 2))
                    }))
                  }
                />
                <InputGroupAddon>
                  <Users2Icon />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-xs h-4 text-destructive">
                {bookState?.guestsCount}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Book a table"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
