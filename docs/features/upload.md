# Feature: Upload

## Goal

Users upload PDF files that are securely stored and processed.

## Flow

- validate file (type, size)
- upload to Supabase Storage
- create document record

## Edge Cases

- very large files
- password protected PDFs
- PDFs without a text layer
