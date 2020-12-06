/// <reference types="next" />
/// <reference types="next/types/global" />

type PagePath = {
  page_path: string;
};

interface Window {
  // pageviewのため
  gtag(type: "config", googleAnalyticsId: string, { page_path }: PagePath);
  // eventのため
  gtag(
    type: "event",
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    }
  );
}
