import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker?url'

GlobalWorkerOptions.workerSrc = workerSrc

export async function extractPdfPages(file, maxPages = 50) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await getDocument({ data: arrayBuffer }).promise
  const totalPages = Math.min(pdf.numPages, maxPages)
  const pages = []

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const textContent = await page.getTextContent()
    const text = textContent.items.map((item) => item.str).join(' ')
    pages.push({ page_number: pageNumber, text })
  }

  return pages
}
