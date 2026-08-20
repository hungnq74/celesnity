import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('renders the full flagship experience without overflow', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Industrial intelligence for the physical world.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How Minder is built.' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'One governed loop.' })).toBeAttached()
  await expect(page.locator('.system-map-node')).toHaveCount(3)
  await expect(page.getByRole('heading', { name: 'Minder Platform' })).toBeAttached()
  await expect(page.locator('.capability-rail')).toContainText('Optimize')
  await expect(page.getByRole('heading', { name: 'Minder Hardware' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Minder Research' })).toBeAttached()
  await expect(page.locator('.partner-mark')).toHaveCount(6)
  await expect(page.locator('a[href^="mailto:start@celesnity.com"]')).toHaveCount(3)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)

  if (testInfo.project.name === 'mobile') {
    await expect(page.getByRole('link', { name: /See Minder/ }).first()).toBeVisible()
  }

  await page.screenshot({ path: testInfo.outputPath('celesnity-full.png'), fullPage: true })
})

test('keeps the complete Minder overview readable at the end of the hero', async ({ page }, testInfo) => {
  await page.goto('/')
  const hero = page.locator('.hero-sequence')
  const heroTravel = await hero.evaluate((section) => (section as HTMLElement).offsetHeight - window.innerHeight - 4)
  if (testInfo.project.name === 'mobile') {
    await page.evaluate((distance) => window.scrollTo(0, distance), heroTravel)
  } else {
    await page.mouse.wheel(0, heroTravel)
  }
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(heroTravel * 0.9)
  const overview = page.locator('.hero-beat--alignment .hero-beat-copy')
  await expect.poll(async () => Number(await overview.evaluate((node) => getComputedStyle(node).opacity))).toBeGreaterThan(0.95)
  await expect(overview).toContainText('Minder Platform')
  await expect(overview).toContainText('Minder Hardware')
  await expect(overview).toContainText('Minder Research')
})

test('has no critical accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((violation) => violation.impact === 'critical')).toEqual([])
})

test('respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const beats = page.locator('[data-hero-beat]')
  await expect(beats).toHaveCount(3)
  await expect(beats.nth(1)).toBeVisible()
  await expect(beats.nth(2)).toBeVisible()
})

test('keeps the core story usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Industrial intelligence for the physical world.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'One governed loop.' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Minder Platform' })).toBeAttached()
  await expect(page.locator('a[href^="mailto:start@celesnity.com"]')).toHaveCount(3)
  await context.close()
})
