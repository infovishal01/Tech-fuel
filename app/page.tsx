'use client';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import TrustedTools from '@/components/home/TrustedTools';
import FeaturedTutorials from '@/components/home/FeaturedTutorials';
import AIUpdates from '@/components/home/AIUpdates';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <TrustedTools />
      <FeaturedTutorials />
      <AIUpdates />
      <Testimonials />
      <Newsletter />
    </MainLayout>
  );
}
