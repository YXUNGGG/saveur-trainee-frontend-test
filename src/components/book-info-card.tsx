import { clsx } from "cn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldContent, FieldGroup, FieldLabel } from "./ui/field";
import { BookFormType } from "@/lib/dto";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type BookInfoCardProps = {
  className?: string;
  onSubmit: () => void;
  bookData: BookFormType;
};

export function BookInfoCard({ bookData, className, onSubmit }: BookInfoCardProps) {
  return (
    <Card className={clsx("w-132", className)}>
      <CardHeader>
        <CardTitle>Book info</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="flex gap-6 justify-between">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>{bookData.name}</FieldContent>
            </Field>

            <Separator orientation="vertical" className="mr-2" />

            <Field>
              <FieldLabel>Number of guests</FieldLabel>
              <FieldContent>{bookData.guestsCount}</FieldContent>
            </Field>
          </div>

          <Separator orientation="horizontal" />

          <div className="flex gap-6 justify-between">
            <Field>
              <FieldLabel>Date</FieldLabel>
              <FieldContent>{bookData.date.toDateString()}</FieldContent>
            </Field>

            <Separator orientation="vertical" className="mr-2" />

            <Field>
              <FieldLabel>Time</FieldLabel>
              <FieldContent>{bookData.time}</FieldContent>
            </Field>
          </div>
        </FieldGroup>

        <Button className="w-full mt-6" onClick={onSubmit}>
          Book another one
        </Button>
      </CardContent>
    </Card>
  );
}
