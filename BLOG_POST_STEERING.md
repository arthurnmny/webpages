# Steering: Add a New Blog Post

Use this steering file when helping someone add a new reunion update/blog post to this repo.

## Goal

Create a new Markdown post in `_posts/` and register it in `updates.html` so it appears on the Updates page.

## How Blog Posts Work Here

Posts live in `_posts/` as Markdown files with YAML front matter:

```md
---
layout: post
title: "Weekend Survey!"
subtitle: "We're collecting feedback for the reunion week, let us know when you're available and what you prefer"
date: 2026-02-07
categories: general
---

Here's the post content.
```

The Updates page does not automatically discover posts. It fetches a hard-coded list in `updates.html`:

```js
const postFiles = [
    '_posts/02-07-2026-postfour.md',
    '_posts/01-03-2026-postthree.md',
    '_posts/01-02-2026-posttwo.md',
    '_posts/01-01-2026-postone.md'
];
```

New posts must be added to the top of this list so they render newest-first.

## First, Interview the User

Ask the user these questions before editing files:

1. What is the blog post title?
2. What is the tagline/subtitle? If they do not want one, use a blank `subtitle:`.
3. What date should the post show? Use `YYYY-MM-DD`.
4. What category should it use? Existing examples include `general` and `reunion`.
5. What should the full post content say?
6. Should the tone be casual, polished, funny, informational, urgent, or something else?
7. Do you want the content cleaned up lightly for grammar and flow, or preserved almost exactly?

If the user already provided some of this, ask only for the missing pieces.

## Filename Rules

Create the new file inside `_posts/`.

Use the existing filename pattern:

```text
MM-DD-YYYY-shortslug.md
```

Examples:

```text
_posts/02-07-2026-postfour.md
_posts/01-03-2026-postthree.md
```

For the slug:

- Use a short lowercase phrase based on the title.
- Replace spaces with hyphens.
- Remove punctuation.
- Keep it concise, for example `reunion-weekend-details` or `ticket-update`.

Example:

```text
_posts/06-21-2026-reunion-weekend-details.md
```

## Post Template

Use this exact structure:

```md
---
layout: post
title: "POST TITLE"
subtitle: "POST SUBTITLE"
date: YYYY-MM-DD
categories: CATEGORY
---

POST CONTENT
```

If there is no subtitle, use:

```md
subtitle:
```

## Content Guidance

Keep the post body simple. The renderer strips many Markdown characters and converts newlines to `<br>`, so avoid relying on advanced Markdown formatting.

Good content choices:

- Short paragraphs
- Plain URLs on their own line
- Simple bullets only if they still read well after Markdown symbols are stripped

Avoid:

- Tables
- Images
- Footnotes
- Complex links like `[text](url)`, because the renderer strips brackets and parentheses
- HTML unless specifically requested and tested

## Implementation Steps

1. Inspect the existing `_posts/` files and `updates.html` before editing.
2. Create the new `_posts/MM-DD-YYYY-slug.md` file.
3. Add the new post path as the first entry in the `postFiles` array in `updates.html`.
4. Preserve the existing indentation and style.
5. Do not reorder or rewrite older posts unless the user specifically asks.
6. Do not change unrelated files.

## Verification

After editing:

1. Confirm the new file exists in `_posts/`.
2. Confirm `updates.html` includes the new file path at the top of `postFiles`.
3. Confirm the front matter has `layout`, `title`, `subtitle`, `date`, and `categories`.
4. If practical, open or serve `updates.html` and verify the new post appears.

## Response Back to the User

When finished, summarize:

- The new post file created.
- The title/date/category used.
- That `updates.html` was updated to include it.
- Any verification performed or anything not tested.
