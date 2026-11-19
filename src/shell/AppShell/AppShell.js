import { useRef } from 'react';
import { Link, Outlet } from 'react-router';
import { focusRingClass } from '../../ui/focusRing';
import { PageContainer } from '../../ui/PageContainer/PageContainer';
import { TripNotice } from '../../trip/TripNotice/TripNotice';
import { TripProvider } from '../../trip/TripProvider/TripProvider';
import { SectionMenu } from '../SectionMenu/SectionMenu';

const brandClass = `inline-flex min-h-11 items-center rounded font-serif text-lg font-bold text-accent lg:text-xl transition-colors duration-200 hover:text-accent-strong ${focusRingClass}`;

export function AppShell() {
  const mainRef = useRef(null);

  return (
    <TripProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-20 bg-surface shadow-header">
          <PageContainer className="flex min-h-16 items-center justify-between gap-4 md:flex-wrap">
            <Link className={brandClass} to="/">
              Agencia de viajes
            </Link>
            <SectionMenu />
          </PageContainer>
        </header>
        <PageContainer>
          <TripNotice onClosed={() => mainRef.current.focus()} />
        </PageContainer>
        <main ref={mainRef} className="flex-1 py-6 pb-24 outline-none md:py-10" tabIndex={-1}>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </TripProvider>
  );
}
