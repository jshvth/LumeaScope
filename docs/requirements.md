# Requirements

## Functional

- Users can upload PDFs
- The system extracts text and creates embeddings
- Users can ask questions in chat
- Answers include citations (page or text excerpt)
- A table of contents is generated after upload

## Non-Functional

- Privacy: documents visible only to the owner
- Scalable for parallel uploads
- API latency low enough for chat UX
- Errors are clear and user friendly

## Roles

- Guest: can test demo documents
- User: can upload and chat with own documents
- Admin: can configure models and limits
