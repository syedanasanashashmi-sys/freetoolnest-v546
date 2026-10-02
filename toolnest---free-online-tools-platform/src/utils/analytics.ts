import { siteConfig } from '../config/siteConfig';

export type AnalyticsEventType =
  | 'tool_opened'
  | 'tool_completed'
  | 'download_clicked'
  | 'copy_clicked'
  | 'search_performed'
  | 'favorite_toggled'
  | 'theme_changed'
  | 'pwa_installed';

export function trackEvent(eventType: AnalyticsEventType, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Development logger (does not collect sensitive data)
  if (process.env.NODE_ENV !== 'production') {
    // Event tracked quietly
  }

  // Future Google Analytics 4 integration (if configured)
  if (siteConfig.analyticsSettings.enabled && (window as any).gtag) {
    (window as any).gtag('event', eventType, properties);
  }

  // Future custom analytics or dataLayer queue
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventType,
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}
