import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface Reference {
  text: string;
}

interface ReferencesSectionProps {
  references: Reference[];
}

export function ReferencesSection({ references }: ReferencesSectionProps) {
  return (
    <section className="mt-16 border-t border-border pt-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="references" className="border-none">
          <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline py-4">
            References ({references.length})
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ol className="text-sm leading-relaxed space-y-3 list-decimal pl-6">
              {references.map((reference, index) => (
                <li
                  key={index}
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: reference.text }}
                />
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}