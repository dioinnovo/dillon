# Tailwind Configuration Migration Guide

## Removed Stellar Classes → SCC Equivalents

### Color Classes Mapping

| Old Class | New Class | Notes |
|-----------|-----------|-------|
| `bg-stellar-orange` | `bg-scc-red` | Primary brand color |
| `bg-stellar-dark` | `bg-scc-gray-dark` | Dark text/background color |
| `text-stellar-orange` | `text-scc-red` | Primary text color |
| `text-stellar-dark` | `text-scc-gray-dark` | Dark text color |
| `border-stellar-orange` | `border-scc-red` | Primary border color |
| `border-stellar-dark` | `border-scc-gray-dark` | Dark border color |
| `hover:bg-stellar-orange` | `hover:bg-scc-red-dark` | Hover state uses darker red |
| `hover:text-stellar-orange` | `hover:text-scc-red` | Hover text color |
| `focus:ring-stellar-orange` | `focus:ring-scc-red` | Focus ring color |
| `divide-stellar-orange` | `divide-scc-red` | Divider color |

### New Available Colors

- `scc-red`: #C8102E (Primary SCC Red)
- `scc-red-dark`: #A00D25 (Darker Red for hover states)
- `scc-gray`: #707070 (Professional Gray)
- `scc-gray-dark`: #2B2B2B (Dark Gray for text)
- `scc-success`: #00A651 (Green for success states)

### Files Requiring Updates

The following 34 files contain references to stellar colors and need to be updated:

1. app/dashboard/inspection/page.tsx
2. app/page.tsx
3. components/mobile-chat-interface.tsx
4. app/dashboard/claims/[id]/page.tsx
5. components/ui/file-upload-modal.tsx
6. app/globals.css
7. components/ui/sources-section.tsx
8. components/ui/sources-modal.tsx
9. app/dashboard/inspection/[id]/start/page.tsx
10. app/dashboard/inspection/[id]/review/page.tsx
11. app/dashboard/inspection/[id]/report/page.tsx
12. app/dashboard/inspection/[id]/continue/page.tsx
13. app/dashboard/inspection/[id]/areas/page.tsx
14. app/dashboard/inspection/[id]/area/[areaId]/page.tsx
15. app/dashboard/reports/page.tsx
16. app/dashboard/claims/page.tsx
17. app/dashboard/page.tsx
18. app/dashboard/reports/[id]/review/page.tsx
19. components/ui/ai-processing-overlay.tsx
20. components/ui/inspection-area-carousel.tsx
21. components/ui/property-area-swipe-enhanced.tsx
22. components/ui/property-area-swipe.tsx
23. components/AddressAutocomplete.tsx
24. components/roi-calculator.tsx
25. app/admin/claims-center/page.tsx
26. app/admin/page.tsx
27. app/claim-assessment/page.tsx
28. app/claims/[id]/page.tsx
29. app/demo/page.tsx
30. app/inspection/page.tsx
31. app/landing/page.tsx
32. components/Sidebar.tsx
33. components/virtual-assistant.tsx
34. components/ui/chatgpt-prompt-input.tsx

### Font Configuration

- **Added**: Montserrat as primary sans-serif font
- **Fallback**: System default fonts remain as fallback

### Breaking Changes

⚠️ **All components using `stellar-orange` and `stellar-dark` classes will need to be updated to use the new SCC color classes.**

### Next Steps

Run Story 2.2 (Update Color Class Names) to automatically update all files with the new color classes.