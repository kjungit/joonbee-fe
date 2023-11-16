'use client';

import QuestionForm from '@/components/common/QuestionForm';
import React, { useState } from 'react';

export default function QuestionChoice() {
  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px]">
      <QuestionForm />
    </section>
  );
}
