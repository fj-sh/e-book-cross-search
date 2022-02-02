import { Page } from 'playwright-core'

export const scroll = async (page: Page, repeat: number, waitTimeMs: number) => {
  for (let step = 0; step < repeat; step++) {
    await page.mouse.wheel(0, 300)
    await page.waitForTimeout(waitTimeMs)
  }
}
