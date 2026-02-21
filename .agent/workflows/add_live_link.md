---
description: Add Live Link Support
---

1.  **Instruction to User**:
    -   Go to your Supabase Dashboard -> Table Editor -> `news` table.
    -   Click "New Column" (or "Add Column").
    -   Name: `live_link`
    -   Type: `text`
    -   Save.

2.  **Update Web Admin (`src/`)**:
    -   In `src/types.ts`: Add `liveLink?: string;` to `NewsItem` interface.
    -   In `src/services/api.ts`:
        -   Update `getNews` to map `live_link: item.live_link`.
        -   Update `createNews` to include `live_link: news.liveLink`.
        -   Update `updateNews` to include `live_link: news.liveLink`.
    -   In `src/App.tsx` (NewsForm):
        -   Add input field for "Live/External Link" in the `NewsForm` component.
        -   Update `handleSubmit` to include `liveLink` in `formData`.
    -   In `src/App.tsx` (NewsDetail/Preview):
        -   Add a button "Watch Live" if `liveLink` is present.

3.  **Update Mobile App (`Mobile_App/Samanyudu-News_App/`)**:
    -   Import `url_launcher` in `lib/widgets/news_detail_modal.dart`.
    -   In `lib/widgets/news_detail_modal.dart`:
        -   Add logic to check if `item['live_link']` exists.
        -   Add a "Live" button (e.g., Red button with specialized icon) next to Like/Share.
        -   On click, launch the URL.

// turbo
4.  Apply changes to `src/types.ts`.
// turbo
5.  Apply changes to `src/services/api.ts`.
// turbo
6.  Apply changes to `src/App.tsx`.
// turbo
7.  Apply changes to `Mobile_App/Samanyudu-News_App/lib/widgets/news_detail_modal.dart`.
