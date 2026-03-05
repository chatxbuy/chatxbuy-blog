import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.resolve('content/blog')
const MAX_DESC_LENGTH = 155

function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '')
}

function stripMarkdown(text) {
  // Remove markdown links [text](url)
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  // Remove bold/italic **text** or *text* or __text__ or _text_
  text = text.replace(/(\*{1,2}|_{1,2})([^*_]+)\1/g, '$2')
  return text
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-zA-Z0-9#]+;/g, '')
}

function cleanText(text) {
  text = stripHtml(text)
  text = stripMarkdown(text)
  text = decodeEntities(text)
  text = text.replace(/\s+/g, ' ').trim()
  return text
}

function isSkippableLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return true
  // Markdown image
  if (/^!\[.*\]\(.*\)/.test(trimmed)) return true
  // Markdown heading
  if (/^#{1,6}\s/.test(trimmed)) return true
  // HTML image tag
  if (/^<img\b/i.test(trimmed)) return true
  // <hr> or --- separator
  if (/^<hr\s*\/?>$/i.test(trimmed) || /^-\s*-\s*-\s*$/.test(trimmed)) return true
  // Empty HTML elements
  if (/^<p>\s*(&nbsp;|\s)*<\/p>$/i.test(trimmed)) return true
  // Standalone &nbsp;
  if (/^(&nbsp;|\s)*$/.test(trimmed)) return true
  // HTML-only line with just image inside (e.g. <p><img ...></p>)
  const withoutTags = stripHtml(trimmed).trim()
  if (!withoutTags || /^(&nbsp;|\s)*$/.test(withoutTags)) return true
  return false
}

function truncateDescription(text, maxLen) {
  if (text.length <= maxLen) return text
  // Try to cut at sentence boundary
  const truncated = text.slice(0, maxLen)
  const lastPeriod = Math.max(
    truncated.lastIndexOf('。'),
    truncated.lastIndexOf('！'),
    truncated.lastIndexOf('？'),
    truncated.lastIndexOf('. '),
  )
  if (lastPeriod > maxLen * 0.5) {
    return truncated.slice(0, lastPeriod + 1).trim()
  }
  // Fall back to comma or space
  const lastComma = Math.max(
    truncated.lastIndexOf('，'),
    truncated.lastIndexOf('、'),
    truncated.lastIndexOf(', '),
  )
  if (lastComma > maxLen * 0.5) {
    return truncated.slice(0, lastComma + 1).trim()
  }
  return truncated.trim()
}

function extractDescription(body) {
  const lines = body.split('\n').slice(0, 50)
  for (const line of lines) {
    if (isSkippableLine(line)) continue
    const cleaned = cleanText(line)
    if (cleaned.length < 10) continue
    return truncateDescription(cleaned, MAX_DESC_LENGTH)
  }
  return ''
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
let updated = 0
let skipped = 0

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (data.description) {
    skipped++
    continue
  }

  const description = extractDescription(content)
  if (!description) {
    console.log(`[WARN] No description extracted: ${file}`)
    continue
  }

  data.description = description
  const output = matter.stringify(content, data)
  fs.writeFileSync(filePath, output, 'utf-8')
  updated++
  console.log(`[OK] ${file}`)
  console.log(`     ${description.slice(0, 80)}...`)
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped (already had description)`)
