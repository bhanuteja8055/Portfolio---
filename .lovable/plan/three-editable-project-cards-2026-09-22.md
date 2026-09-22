# Three Editable Project Cards

## What will change
- Keep the existing Projects section and expand it from two cards to three.
- Preserve the two résumé-backed projects as the initial content.
- Add a third polished card with clearly marked placeholder content for a future project.
- Add an edit action to every card that opens a focused editor for its title, date, description, skills, and project link.
- Provide Save and Cancel actions, clear field labels, validation for links, and a reset option to restore the original card content.
- Save edits in the visitor’s browser so they remain after refreshing, without requiring an account or online storage.

## Presentation and behaviour
- Keep the existing navy and warm-grey palette, typography, spacing, card imagery, and entrance animations.
- Arrange three balanced cards across larger screens and stack them cleanly on mobile.
- Clearly distinguish editing controls from the public project links and show placeholder links as inactive until a valid URL is entered.
- Ensure the editor is keyboard-accessible, mobile-friendly, and does not disrupt smooth navigation.

## Technical details
- Move project content into a typed three-item data model and render the cards from it.
- Hydrate browser-saved edits only after the page loads to avoid visual mismatches.
- Build the editor with existing design-system controls and semantic colour tokens.
- Verify editing, saving, cancelling, resetting, refresh persistence, project-link behaviour, and desktop/mobile layouts.
