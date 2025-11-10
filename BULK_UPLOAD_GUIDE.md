# Bulk Upload Feature Guide

## Overview

The bulk upload feature allows you to upload multiple features/stories at once via a CSV file, then score them one by one in a streamlined batch mode.

## How to Use

### 1. Prepare Your CSV File

Create a CSV file with the following format:

```csv
name,description
"Feature Name 1","Optional description of the feature"
"Feature Name 2","Another description"
```

**Required columns:**
- `name` - The feature or story name (required)

**Optional columns:**
- `description` - Additional context about the feature (optional)

**Example CSV:**
See `sample-features.csv` in the project root for a complete example with 10 features.

### 2. Start Bulk Upload

1. From the landing page, click **"Bulk Upload Features"** button
2. Enter your name or team name in the "Who's scoring?" field
3. Either:
   - **Drag and drop** your CSV file onto the upload zone, OR
   - **Click** the upload zone to browse and select your CSV file

### 3. Batch Scoring Flow

Once uploaded, you'll see:

- **Batch List View**: Shows all features from your CSV
  - Progress bar showing completion status
  - Each feature shows: name, description (if provided), and status icon
  - Current feature is highlighted in blue
  - Completed features are marked with ✅

### 4. Score Each Feature

1. Click **"Score Current Feature"** or **"Score"** button next to the highlighted feature
2. Go through the normal ICE scoring flow:
   - Impact questions
   - Confidence questions
   - Effort questions
   - Justification (if needed)
3. On the results screen, click **"Save & Continue to Next"**
4. Automatically returns to batch list with next feature highlighted

### 5. Complete the Batch

- After scoring all features, click **"View All Results"** to see the export view
- All scored features are saved to the export list
- You can edit, delete, or export them as CSV

### 6. Cancel Batch (Optional)

- At any time, click **"Cancel Batch"** to abandon the batch scoring session
- Any already-scored features remain in the export list

## Tips

- **Save frequently**: Each feature is saved when you click "Save & Continue to Next"
- **Pause anytime**: You can cancel and return later (already scored features are saved)
- **Edit later**: All scored features can be edited from the Export view
- **Large batches**: Works with any number of features (practical limit ~100 per session)

## CSV Format Examples

### Minimal (name only):
```csv
name
"Dark Mode Toggle"
"Export to PDF"
"Social Login"
```

### With descriptions:
```csv
name,description
"Dark Mode Toggle","Add dark theme for better UX at night"
"Export to PDF","Allow users to export reports as PDF"
"Social Login","Enable login via Google/Facebook/Apple"
```

### With commas in text (use quotes):
```csv
name,description
"Multi-tenancy Support","Isolate data, configs, and branding per customer"
"Advanced Analytics","Track user behavior, engagement, and conversions"
```

## Workflow Comparison

### Single Feature Mode (Original)
1. Landing → Enter feature name → Score → Save → Repeat

### Batch Upload Mode (New)
1. Landing → Upload CSV → Pick from list → Score → Auto-advance → Repeat
2. All features tracked in one session
3. Progress bar shows completion
4. Can pause/resume batch

## Technical Details

- **CSV parsing**: Uses PapaParse library
- **Max file size**: Browser dependent (typically 5-10MB is fine)
- **Storage**: Features stored in app state during batch session
- **Persistence**: Scored features saved to localStorage (same as single mode)
- **Encoding**: UTF-8 (handles international characters)

## Troubleshooting

**"CSV must have a 'name' column"**
- Ensure first row has a header with "name" column
- Check for typos in the header row

**"No valid features found in CSV"**
- CSV may be empty or all rows have empty names
- Check for hidden characters or encoding issues

**Features not loading**
- Refresh the page and try again
- Check browser console for errors
- Verify CSV format matches examples above

## Future Enhancements

Potential additions to the bulk upload feature:

- **Multi-user collaboration**: Multiple people score the same batch, see consensus
- **Pre-filled scores**: Import existing scores to edit in batch
- **Templates**: Save common feature lists as templates
- **Progress save**: Resume partially completed batch after page refresh
- **Batch analytics**: View statistics across all features in the batch

## Sample CSV

A sample CSV file with 10 features is included: `sample-features.csv`

Use this to test the bulk upload feature without creating your own CSV file.
