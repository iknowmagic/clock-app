import bgDaytimeDesktop from '@/assets/images/desktop/bg-image-daytime.jpg'
import bgNighttimeDesktop from '@/assets/images/desktop/bg-image-nighttime.jpg'
import bgDaytimeTablet from '@/assets/images/tablet/bg-image-daytime.jpg'
import bgNighttimeTablet from '@/assets/images/tablet/bg-image-nighttime.jpg'
import bgDaytimeMobile from '@/assets/images/mobile/bg-image-daytime.jpg'
import bgNighttimeMobile from '@/assets/images/mobile/bg-image-nighttime.jpg'

/**
 * Select the appropriate background image based on time of day and screen size
 */
export function getResponsiveBackground(isEvening: boolean): string {
  // Get window width for responsive images
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      return isEvening ? bgNighttimeMobile : bgDaytimeMobile
    } else if (window.innerWidth < 1024) {
      return isEvening ? bgNighttimeTablet : bgDaytimeTablet
    }
  }
  return isEvening ? bgNighttimeDesktop : bgDaytimeDesktop
}
