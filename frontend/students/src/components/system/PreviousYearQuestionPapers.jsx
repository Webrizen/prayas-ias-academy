"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Toggle } from "@/components/ui/toggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const exams = ['UPSC', 'BPSC']
const years = [2023, 2022, 2021, 2020, 2019]

export default function PreviousYearQuestionPapers() {
    const [selectedExam, setSelectedExam] = useState('UPSC')

    return (
      <div className="w-full p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Previous Year Question Papers</h1>
        
        <div className="flex justify-center space-x-4 mb-8">
          {exams.map((exam) => (
            <Toggle
              key={exam}
              pressed={selectedExam === exam}
              onPressedChange={() => setSelectedExam(exam)}
            >
              {exam}
            </Toggle>
          ))}
        </div>
  
        <motion.div
          key={selectedExam}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {years.map((year) => (
            <Card key={year} className="overflow-hidden">
              <CardHeader className="bg-primary/10 pb-4">
                <CardTitle>{year} Question Paper</CardTitle>
                <CardDescription>{selectedExam} Examination</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
  
        <p className="text-center text-sm text-muted-foreground mt-8">
          Access our free {selectedExam} resources anytime, anywhere. 
          Available for both offline and mobile app users.
        </p>
      </div>
  )
}
