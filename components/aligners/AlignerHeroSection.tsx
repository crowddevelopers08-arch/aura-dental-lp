import Image from 'next/image';

export function AlignerHeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20">
      <div className="relative h-[900px] w-full md:hidden">
        <Image
          src="/ef119c3b-273c-4436-ae49-7984516f7e38.png"
          alt="Aura Dental Invisible Aligners"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="relative hidden h-[660px] w-full md:block">
        <Image
          src="/e5d792c1-da1c-45ab-a516-bf13dd39fa21.png"
          alt="Aura Dental Invisible Aligners"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
