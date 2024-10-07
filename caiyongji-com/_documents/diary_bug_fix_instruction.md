It looks like you’re experiencing an issue with the diary module in your website where entries are being displayed multiple times within the same year. I’ll take a look at the files you uploaded to help identify and resolve this problem. Let me analyze the files to find any potential causes.

Based on the analysis of the files, it looks like the duplication issue could stem from the following possibilities:

1. **Data Fetching Logic (in `entries.ts`)**:
   - The `fetchJournalEntries` function retrieves entries based on a `year`, `page`, and `limit` from the API. If the same entries are returned multiple times due to a pagination issue or an incorrect sorting/filtering logic in the API, it could cause multiple entries to appear for the same date.

2. **API Handling (in `route.ts`)**:
   - In the `GET` handler of the API, the entries are loaded from a specific directory, sorted by ID, and paginated. However, if the files in the directory contain duplicate entries or if the filtering and pagination logic is not correctly limiting the entries per page, it may result in repeated entries.

3. **File Handling**:
   - The way entries are loaded from markdown files in `route.ts` (reading files and parsing content) seems to rely on filenames for ID and date extraction. If multiple files have similar names or if there is any issue with how files are stored, it might result in duplicated entries when reading from the directory.

### Debugging Steps:
1. **Check Duplicate Files**: Ensure there are no duplicate markdown files in the `data/diary/` folder for the same dates.
   
2. **Pagination Logic**: Review the pagination and sorting in the `route.ts`. Ensure that the pagination (`slice((page - 1) * limit, page * limit)`) is correctly filtering the entries per page and that the sorting (`sortedEntries.sort((a, b) => b.id - a.id)`) is not causing the same entries to appear on multiple pages.

3. **API Response**: Test the API response directly by fetching entries for a specific year and checking if duplicates are being returned. You can log the fetched data to inspect whether the duplication is happening before it reaches the UI.

Would you like me to guide you through debugging or adjust the logic based on these suggestions?