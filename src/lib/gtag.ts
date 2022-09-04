import { ClickEvent } from "../interfaces/ga-event";

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== "";

// PVを測定する
// export const pageview = (page_path: string) => {
//   if (GA_ID == undefined) {
//     return;
//   }
//   const pagePath: PagePath = { page_path };
//   window.gtag("config", GA_ID, pagePath);
// };

// GAイベントを発火させる
// export const event = ({ action, category, label, value = "" }: ClickEvent) => {
//   if (!existsGaId) {
//     return;
//   }

//   window.gtag("event", action, {
//     event_category: category,
//     event_label: JSON.stringify(label),
//     value,
//   });
// };
